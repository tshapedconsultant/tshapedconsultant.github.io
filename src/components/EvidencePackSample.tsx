import { useEffect, useMemo, useState } from "react";
import { canonicalStringify, hashEvidencePayload } from "../lib/canonicalHash";

export type EvidenceDecision = "ALLOW" | "BLOCK" | "HUMAN_REVIEW";

export type EvidencePack = {
  control_id: string;
  policy_version: string;
  timestamp: string;
  input_summary: string;
  decision: EvidenceDecision;
  metrics: {
    drift_score: number;
    fairness_metrics: {
      demographic_parity_delta: number;
      equalized_odds_tpr_delta: number;
    };
  };
  evidence_hash: string;
  anchoring: {
    jira_key: string;
    s3_object: string;
    rekor_log_index: number;
    rekor_uuid: string;
  };
};

function roundMetric(value: number, digits = 4): number {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function buildUnsignedPack(seed: number): Omit<EvidencePack, "evidence_hash"> {
  const drift = roundMetric(0.041 + (seed % 97) / 1000);
  const decision: EvidenceDecision = drift >= 0.09 ? "BLOCK" : drift >= 0.06 ? "HUMAN_REVIEW" : "ALLOW";
  const stamp = new Date(Date.now() - (seed % 7) * 1000).toISOString();
  return {
    control_id: "CTRL-DRIFT-CLAIM-PRED",
    policy_version: "drift-gate-v1.4",
    timestamp: stamp,
    input_summary:
      "Batch of 10,000 anonymised policy features for the claim-prediction model. No names, IDs or contact data.",
    decision,
    metrics: {
      drift_score: drift,
      fairness_metrics: {
        demographic_parity_delta: roundMetric(0.0011 + (seed % 13) / 10000),
        equalized_odds_tpr_delta: roundMetric(0.0075 + (seed % 11) / 10000),
      },
    },
    anchoring: {
      jira_key: "AIGOV-1842",
      s3_object: `s3://ai-gov-evidence/packs/CTRL-DRIFT-CLAIM-PRED/${stamp.slice(0, 10)}/pack.json`,
      rekor_log_index: 912384 + (seed % 50),
      rekor_uuid: `a7c2e91d-4b18-5e60-9f3a-${(0x100000000000 + seed).toString(16).slice(-12)}`,
    },
  };
}

async function signPack(unsigned: Omit<EvidencePack, "evidence_hash">): Promise<EvidencePack> {
  const evidence_hash = await hashEvidencePayload({ ...unsigned, evidence_hash: "" });
  return { ...unsigned, evidence_hash };
}

export default function EvidencePackSample() {
  const [pack, setPack] = useState<EvidencePack | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [generation, setGeneration] = useState(1);

  useEffect(() => {
    let cancelled = false;
    setBusy(true);
    setError("");
    void signPack(buildUnsignedPack(generation))
      .then((next) => {
        if (!cancelled) setPack(next);
      })
      .catch(() => {
        if (!cancelled) setError("The evidence hash could not be computed in this browser.");
      })
      .finally(() => {
        if (!cancelled) setBusy(false);
      });
    return () => {
      cancelled = true;
    };
  }, [generation]);

  const pretty = useMemo(() => (pack ? `${canonicalStringify(pack)}` : ""), [pack]);
  const formatted = useMemo(() => (pack ? JSON.stringify(pack, null, 2) : ""), [pack]);

  function download() {
    if (!pack) return;
    const blob = new Blob([JSON.stringify(pack, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${pack.control_id}-${pack.timestamp.replace(/[:.]/g, "-")}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <section className="evidence-pack" aria-labelledby="evidence-pack-title">
      <h2 id="evidence-pack-title">Sample evidence pack</h2>
      <p>
        Hypothetical drift gate for a claim-prediction model. The SHA-256 hash is computed in the
        browser over canonical JSON (sorted keys, hash field omitted). Nothing here is production
        evidence.
      </p>
      {error ? (
        <p className="field-error" role="alert">
          {error}
        </p>
      ) : null}
      {pack ? (
        <dl className="evidence-pack-meta">
          <div>
            <dt>control_id</dt>
            <dd>
              <code>{pack.control_id}</code>
            </dd>
          </div>
          <div>
            <dt>policy_version</dt>
            <dd>
              <code>{pack.policy_version}</code>
            </dd>
          </div>
          <div>
            <dt>timestamp</dt>
            <dd>
              <time dateTime={pack.timestamp}>{pack.timestamp}</time>
            </dd>
          </div>
          <div>
            <dt>decision</dt>
            <dd>
              <span className={`status-pill status-${pack.decision.toLowerCase()}`}>{pack.decision}</span>
            </dd>
          </div>
          <div>
            <dt>input_summary</dt>
            <dd>{pack.input_summary}</dd>
          </div>
          <div>
            <dt>metrics</dt>
            <dd>
              drift_score {pack.metrics.drift_score} · demographic_parity_delta{" "}
              {pack.metrics.fairness_metrics.demographic_parity_delta} · equalized_odds_tpr_delta{" "}
              {pack.metrics.fairness_metrics.equalized_odds_tpr_delta}
            </dd>
          </div>
          <div>
            <dt>evidence_hash</dt>
            <dd>
              <code className="hash-value">{pack.evidence_hash}</code>
            </dd>
          </div>
          <div>
            <dt>anchoring</dt>
            <dd>
              {pack.anchoring.jira_key} · {pack.anchoring.s3_object} · Rekor index{" "}
              {pack.anchoring.rekor_log_index} ({pack.anchoring.rekor_uuid})
            </dd>
          </div>
        </dl>
      ) : (
        <p role="status">Computing evidence hash…</p>
      )}
      <div className="evidence-pack-actions">
        <button
          className="btn btn-solid"
          type="button"
          disabled={busy}
          onClick={() => setGeneration((n) => n + 1)}
        >
          {busy ? "Hashing…" : "Generate new evidence pack"}
        </button>
        <button className="btn btn-ghost" type="button" disabled={!pack} onClick={download}>
          Download JSON
        </button>
      </div>
      {formatted ? (
        <pre className="rego evidence-json" tabIndex={0}>
          {formatted}
        </pre>
      ) : null}
      <p className="evidence-pack-note">
        In CI, each control decision appends a canonical payload and the previous event hash. The
        resulting chain is tamper-evident locally; Jira, Rekor or object-lock storage can attest the
        head. Auditors verify the chain and the external root — they do not take a dashboard
        screenshot as proof. Canonical form used for the digest: {pretty ? "sorted-key JSON." : "—"}
      </p>
    </section>
  );
}
