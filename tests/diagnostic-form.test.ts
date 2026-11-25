import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";
import test from "node:test";
import { Window } from "happy-dom";
import { clearTrackedEvents, getTrackedEvents } from "../src/lib/analytics.ts";

const window = new Window({ url: "http://localhost:5174/?source=dual-key#diagnostic" });
const globals = {
  window,
  document: window.document,
  HTMLElement: window.HTMLElement,
  Element: window.Element,
  Node: window.Node,
  MutationObserver: window.MutationObserver,
  DocumentFragment: window.DocumentFragment,
  Event: window.Event,
  FocusEvent: window.FocusEvent,
  InputEvent: window.InputEvent,
  KeyboardEvent: window.KeyboardEvent,
  MouseEvent: window.MouseEvent,
  getComputedStyle: window.getComputedStyle.bind(window),
  requestAnimationFrame: window.requestAnimationFrame.bind(window),
  cancelAnimationFrame: window.cancelAnimationFrame.bind(window),
  IS_REACT_ACT_ENVIRONMENT: true,
};
for (const [key, value] of Object.entries(globals)) {
  Object.defineProperty(globalThis, key, { configurable: true, writable: true, value });
}

const calls = [];
const fetchMock = async (url) => {
  calls.push(String(url));
  return new window.Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
};
window.fetch = fetchMock;
globalThis.fetch = fetchMock;

const outfile = path.resolve("tests/.diagnostic-form-bundle.mjs");
const analyticsUrl = pathToFileURL(path.resolve("src/lib/analytics.ts")).href;
const built = spawnSync(
  process.execPath,
  [
    "--input-type=module",
    "-e",
    `
      import * as esbuild from "esbuild";
      await esbuild.build({
        entryPoints: ["tests/diagnostic-form-entry.jsx"],
        bundle: true,
        format: "esm",
        platform: "node",
        outfile: ${JSON.stringify(outfile)},
        jsx: "automatic",
        define: {
          "import.meta.env": JSON.stringify({ VITE_FORM_ENDPOINT: "http://127.0.0.1:9/mock-enquiry" }),
        },
        external: ["react", "react-dom", "react-dom/client", "react-router-dom"],
        plugins: [{
          name: "external-analytics",
          setup(build) {
            build.onResolve({ filter: /analytics$/ }, () => ({ path: ${JSON.stringify(analyticsUrl)}, external: true }));
          },
        }],
      });
    `,
  ],
  { encoding: "utf8" },
);

test("diagnostic form tracks one start and one primary conversion", async () => {
  assert.equal(built.status, 0, built.stderr || built.stdout);
  const { act } = await import("react");
  const { renderDiagnosticForm } = await import(pathToFileURL(outfile).href);
  const container = document.createElement("div");
  document.body.appendChild(container);
  clearTrackedEvents();
  await renderDiagnosticForm(container);

  const form = document.getElementById("diagnostic-form");
  const button = form.querySelector("button[type='submit']");
  const name = document.getElementById("diag-name");
  assert.ok(form && button && name);

  await act(async () => {
    button.focus();
  });
  assert.equal(getTrackedEvents().some((event) => event.event === "diagnostic_form_start"), false);

  await act(async () => {
    name.focus();
    name.focus();
  });
  const starts = getTrackedEvents().filter((event) => event.event === "diagnostic_form_start");
  assert.equal(starts.length, 1);
  assert.equal(starts[0].props.source, "dual-key");
  assert.equal(starts[0].props.intent, "snapshot");

  await act(async () => {
    form.requestSubmit();
  });
  assert.equal(getTrackedEvents().some((event) => event.event === "diagnostic_form_submit_success"), false);
  assert.ok(document.querySelector(".field-error"));

  const setValue = (element, value) => {
    const prototype = element instanceof window.HTMLTextAreaElement
      ? window.HTMLTextAreaElement.prototype
      : element instanceof window.HTMLSelectElement
        ? window.HTMLSelectElement.prototype
        : window.HTMLInputElement.prototype;
    const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
    setter?.call(element, value);
    element.dispatchEvent(new window.Event("input", { bubbles: true }));
    element.dispatchEvent(new window.Event("change", { bubbles: true }));
  };

  await act(async () => {
    setValue(name, "Ana Example");
    setValue(document.getElementById("diag-email"), "ana@example.com");
    setValue(document.getElementById("diag-company"), "Example Org");
    setValue(document.getElementById("diag-system-type"), "Copilot connected to tools");
    setValue(document.getElementById("diag-capability"), "Create drafts or recommendations");
    setValue(document.getElementById("diag-govern"), "An agent can write without an authorization gate.");
    document.getElementById("diag-consent").click();
    form.requestSubmit();
  });

  const events = getTrackedEvents();
  const primary = events.filter((event) => event.event === "diagnostic_form_submit_success");
  assert.equal(primary.length, 1);
  assert.equal(primary[0].props.source, "dual-key");
  assert.equal(primary[0].props.intent, "snapshot");
  assert.equal(events.filter((event) => event.event === "contact_submitted").length, 1);
  assert.ok(calls.length > 0);
  assert.ok(calls.every((url) => url.startsWith("http://127.0.0.1:9/") || url.startsWith("https://formsubmit.co/")));
});
