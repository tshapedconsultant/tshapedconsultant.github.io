import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { SERVICE_LADDER as LADDER_EN } from "../src/content.js";
import { SERVICE_LADDER as LADDER_ES } from "../src/content.es.js";
import { DUAL_KEY_REGO, dualKeyCopy } from "../src/data/dualKeyCopy.ts";

const OPA_VERSION = "1.22.4";
const INSTALL = "node scripts/install-opa.mjs";

const policyFile = readFileSync(new URL("../policies/dualkey_illustrative.rego", import.meta.url), "utf8")
  .replace(/\r\n/g, "\n")
  .trim();

function opaBin() {
  const name = process.platform === "win32" ? "opa.exe" : "opa";
  return fileURLToPath(new URL(`../tools/${name}`, import.meta.url));
}

test("displayed Rego is the policy file OPA executes", () => {
  assert.equal(DUAL_KEY_REGO.trim(), policyFile);
  const deadlineAt = policyFile.indexOf("deadline := time.parse_rfc3339_ns");
  const everyAt = policyFile.indexOf("every a in input.approvals");
  assert.ok(deadlineAt > 0 && deadlineAt < everyAt);
  assert.equal(policyFile.split("time.now_ns()").length - 1, 1);
  assert.match(policyFile, /RFC3339 strings/);
});

test("both catalogues publish a Snapshot price and a Blueprint amount", () => {
  for (const ladder of [LADDER_EN, LADDER_ES]) {
    const snapshot = ladder.items.find((item) => item.id === "snapshot");
    const blueprint = ladder.items.find((item) => item.id === "blueprint");
    assert.ok(snapshot?.price);
    assert.match(blueprint?.price || "", /€[\d.,]+/);
  }
  const en = dualKeyCopy("en");
  const es = dualKeyCopy("es");
  assert.match(en.microcopy, /From €2,495/);
  assert.match(es.microcopy, /Desde €2\.495/);
  assert.match(en.offerNext, /from €6,500/);
  assert.match(es.offerNext, /desde €6\.500/);
  assert.match(en.trust.join(" "), /Approval timestamps are supplied as RFC3339 strings/);
  assert.match(es.trust.join(" "), /cadenas RFC3339/);
  assert.equal(
    en.archDetail.find((item) => item.title === "PEP")?.text,
    "The PEP rechecks the actual action and execution deadline before dispatch.",
  );
  assert.equal(en.evidenceItems[0].linkLabel, "Explore the documented HR Copilot demo");
  assert.equal(es.evidenceItems[0].linkLabel, "Explorar la demostración documentada de HR Copilot");
});

test("OPA 1.22.4 executes the strict check and the frozen-clock matrix", () => {
  const bin = opaBin();
  assert.equal(existsSync(bin), true, `OPA ${OPA_VERSION} is required. Run: ${INSTALL}`);
  const version = spawnSync(bin, ["version"], { encoding: "utf8" });
  assert.equal(version.status, 0, version.stderr || version.error?.message || `OPA ${OPA_VERSION} is required. Run: ${INSTALL}`);
  assert.match(
    version.stdout,
    /Version: 1\.22\.4/,
    `OPA ${OPA_VERSION} is required. Run: ${INSTALL}\n${version.stdout}`,
  );
  const check = spawnSync(bin, ["check", "--strict", "policies"], { encoding: "utf8" });
  assert.equal(check.status, 0, `${check.stdout}\n${check.stderr}`);
  const result = spawnSync(
    bin,
    ["test", "policies/dualkey_illustrative.rego", "policies/dualkey_illustrative_test.rego", "-v"],
    { encoding: "utf8" },
  );
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`);
  assert.match(result.stdout, /PASS: \d+\/\d+/);
});
