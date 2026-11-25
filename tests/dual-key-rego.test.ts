import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

/**
 * Snippet-content checks only.
 * OPA is not installed in this environment, so these assertions do not compile
 * or execute the policy. They are not an allow/deny matrix.
 */
const copy = readFileSync(new URL("../src/data/dualKeyCopy.ts", import.meta.url), "utf8");
const regoStart = copy.indexOf("export const DUAL_KEY_REGO");
const rego = copy.slice(regoStart);

test("illustrative Rego text encodes the conservative contract and was not run with OPA", () => {
  assert.ok(regoStart > 0);
  assert.match(rego, /Not compiled or tested with OPA/);
  assert.equal(rego.split("time.now_ns()").length - 1, 1);
  assert.match(rego, /now := time\.now_ns\(\)/);
  assert.doesNotMatch(rego, /time\.now_ns\(\) -/);
  assert.doesNotMatch(rego, /nonce_unused/);
  assert.match(rego, /data\.clock_skew_ns >= 0/);
  assert.match(rego, /data\.max_ttl_ns > 0/);
  assert.match(rego, /issued_at <= now \+ data\.clock_skew_ns/);
  assert.match(rego, /expires_at > issued_at/);
  assert.match(rego, /expires_at > now \+ data\.clock_skew_ns/);
  assert.match(rego, /expires_at - issued_at <= data\.max_ttl_ns/);
  assert.match(rego, /deadline > now \+ data\.clock_skew_ns/);
  assert.match(rego, /count\(input\.approvals\) == 2/);
  assert.match(rego, /roles == \{"technical_owner", "business_owner"\}/);
  assert.match(rego, /count\(approver_ids\) == 2/);
  assert.match(rego, /a\.approver_id != ""/);
  assert.match(rego, /a\.nonce != ""/);
  assert.match(rego, /a\.role in data\.role_registry\[a\.approver_id\]/);
  assert.match(rego, /a\.payload_hash == input\.action\.payload_hash/);
  assert.match(rego, /a\.model_version == input\.action\.model_version/);
  assert.match(rego, /a\.policy_version == input\.policy\.version/);
  assert.match(rego, /a\.signature_verified == true/);
  assert.match(rego, /default dual_key_ok := false/);
  assert.match(rego, /does not perform cryptography/);
});

test("EN and ES landing copy keeps the offer, sample and gateway sentences", () => {
  assert.match(copy, /One system · One-week review · \$\{PRICE_EN\}/);
  assert.match(copy, /Un sistema · Revisión de una semana · \$\{PRICE_ES\}/);
  assert.match(
    copy,
    /The authenticated gateway supplies only signature-verified approvals and the hash of the canonical execution payload\. The agent cannot construct or override these inputs\./,
  );
  assert.match(copy, /Example Snapshot output — illustrative/);
  assert.match(copy, /Ejemplo de resultado del Snapshot — ilustrativo/);
  assert.match(copy, /decisiones de alto impacto/);
  assert.match(copy, /Responsabilidad de aprobación/);
  assert.match(copy, /Sesión de presentación de resultados/);
  assert.doesNotMatch(copy, /decisiones de consecuencia/);
  assert.doesNotMatch(copy, /Titularidad de la aprobación/);
});
