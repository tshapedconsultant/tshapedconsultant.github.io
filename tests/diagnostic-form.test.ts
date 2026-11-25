import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { pathToFileURL } from "node:url";
import test, { beforeEach } from "node:test";
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
function okResponse() {
  return new window.Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "content-type": "application/json" },
  });
}
let fetchImpl = async (url, init) => {
  calls.push({ url: String(url), body: init?.body || "" });
  return okResponse();
};
window.fetch = (url, init) => fetchImpl(url, init);
globalThis.fetch = window.fetch;

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

beforeEach(() => {
  clearTrackedEvents();
  calls.length = 0;
  window.sessionStorage.clear();
  fetchImpl = async (url, init) => {
    calls.push({ url: String(url), body: init?.body || "" });
    return okResponse();
  };
});

function setValue(element, value) {
  const prototype = element instanceof window.HTMLTextAreaElement
    ? window.HTMLTextAreaElement.prototype
    : element instanceof window.HTMLSelectElement
      ? window.HTMLSelectElement.prototype
      : window.HTMLInputElement.prototype;
  const setter = Object.getOwnPropertyDescriptor(prototype, "value")?.set;
  setter?.call(element, value);
  element.dispatchEvent(new window.Event("input", { bubbles: true }));
  element.dispatchEvent(new window.Event("change", { bubbles: true }));
}

function primaryEvents() {
  return getTrackedEvents().filter((event) => event.event === "diagnostic_form_submit_success");
}

function attemptIds() {
  return calls
    .filter((call) => call.url.startsWith("http://127.0.0.1:9/"))
    .map((call) => JSON.parse(call.body)["Attempt id"]);
}

async function mountedForm() {
  assert.equal(built.status, 0, built.stderr || built.stdout);
  const { act } = await import("react");
  const { renderDiagnosticForm } = await import(pathToFileURL(outfile).href);
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = await renderDiagnosticForm(container);
  return {
    act,
    root,
    container,
    form: document.getElementById("diagnostic-form"),
  };
}

async function unmount(mounted) {
  await mounted.act(async () => {
    mounted.root.unmount();
  });
  mounted.container.remove();
}

async function fill(mounted) {
  const form = mounted.form;
  await mounted.act(async () => {
    setValue(document.getElementById("diag-name"), "Ana Example");
    setValue(document.getElementById("diag-email"), "ana@example.com");
    setValue(document.getElementById("diag-company"), "Example Org");
    setValue(document.getElementById("diag-system-type"), "Copilot connected to tools");
    setValue(document.getElementById("diag-capability"), "Create drafts or recommendations");
    setValue(document.getElementById("diag-govern"), "An agent can write without an authorization gate.");
    document.getElementById("diag-consent").click();
  });
  return form;
}

test("diagnostic form starts once per mount and records one submitted request", async () => {
  const mounted = await mountedForm();
  try {
    const button = mounted.form.querySelector("button[type='submit']");
    const name = document.getElementById("diag-name");
    await mounted.act(async () => {
      button.focus();
    });
    assert.equal(getTrackedEvents().some((event) => event.event === "diagnostic_form_start"), false);

    await mounted.act(async () => {
      name.focus();
      name.focus();
    });
    assert.equal(getTrackedEvents().filter((event) => event.event === "diagnostic_form_start").length, 1);
    clearTrackedEvents();
    await mounted.act(async () => {
      name.focus();
    });
    assert.equal(getTrackedEvents().filter((event) => event.event === "diagnostic_form_start").length, 0);

    await mounted.act(async () => {
      mounted.form.requestSubmit();
    });
    assert.equal(primaryEvents().length, 0);
    assert.ok(document.querySelector(".field-error"));

    await fill(mounted);
    await mounted.act(async () => {
      mounted.form.requestSubmit();
    });
    const primary = primaryEvents();
    assert.equal(primary.length, 1);
    assert.equal(primary[0].props.source, "dual-key");
    assert.equal(primary[0].props.intent, "snapshot");
    assert.equal(getTrackedEvents().filter((event) => event.event === "contact_submitted").length, 1);
    assert.equal(attemptIds().length, 1);
    assert.ok(calls.every((call) => call.url.startsWith("http://127.0.0.1:9/") || call.url.startsWith("https://formsubmit.co/")));
  } finally {
    await unmount(mounted);
  }

  clearTrackedEvents();
  const returned = await mountedForm();
  try {
    await returned.act(async () => {
      document.getElementById("diag-name").focus();
    });
    assert.equal(getTrackedEvents().filter((event) => event.event === "diagnostic_form_start").length, 1);
  } finally {
    await unmount(returned);
  }
});

test("network and HTTP failures emit no conversion and a retry emits one", async () => {
  const mounted = await mountedForm();
  try {
    await fill(mounted);
    fetchImpl = async (url, init) => {
      calls.push({ url: String(url), body: init?.body || "" });
      throw new TypeError("network down");
    };
    await mounted.act(async () => {
      mounted.form.requestSubmit();
    });
    assert.equal(primaryEvents().length, 0);
    assert.equal(getTrackedEvents().filter((event) => event.event === "contact_submitted").length, 0);

    calls.length = 0;
    fetchImpl = async () => new window.Response("no", { status: 500 });
    await mounted.act(async () => {
      mounted.form.requestSubmit();
    });
    assert.equal(primaryEvents().length, 0);

    fetchImpl = async (url, init) => {
      calls.push({ url: String(url), body: init?.body || "" });
      return okResponse();
    };
    await mounted.act(async () => {
      mounted.form.requestSubmit();
    });
    assert.equal(primaryEvents().length, 1);
    assert.equal(new Set(attemptIds()).size, 1);
  } finally {
    await unmount(mounted);
  }
});

test("a second submit while the first is in flight does not send twice", async () => {
  const mounted = await mountedForm();
  let release;
  const gate = new Promise((resolve) => {
    release = resolve;
  });
  try {
    await fill(mounted);
    fetchImpl = async (url, init) => {
      calls.push({ url: String(url), body: init?.body || "" });
      await gate;
      return okResponse();
    };
    await mounted.act(async () => {
      mounted.form.requestSubmit();
      mounted.form.requestSubmit();
      release();
    });
    assert.equal(attemptIds().length, 1);
    assert.equal(primaryEvents().length, 1);
  } finally {
    release();
    await unmount(mounted);
  }
});

test("honeypot submission does not send or convert", async () => {
  const mounted = await mountedForm();
  try {
    await fill(mounted);
    await mounted.act(async () => {
      setValue(document.getElementById("diag-hp"), "bot");
    });
    await mounted.act(async () => {
      mounted.form.requestSubmit();
    });
    assert.equal(calls.length, 0);
    assert.equal(primaryEvents().length, 0);
    assert.equal(getTrackedEvents().filter((event) => event.event === "contact_submitted").length, 0);
  } finally {
    await unmount(mounted);
  }
});
