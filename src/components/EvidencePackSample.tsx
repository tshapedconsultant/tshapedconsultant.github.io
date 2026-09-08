import { useEffect, useMemo, useState } from "react";
import { canonicalStringify, hashEvidencePayload } from "../lib/canonicalHash";

export type EvidenceDecision = "ALLOW" | "BLOCK" | "HUMAN_REVIEW";

export type EvidencePack = {
  decision_id: string;
  control_id: string;
  policy_version: string;
  model_version: string;
  actor: string;
  data_source: string;
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
    decision_id: `DEC-${String(1000000 + seed).slice(-6)}`,
    control_id: "CTRL-DRIFT-CLAIM-PRED",
    policy_version: "drift-gate-v1.4",
    model_version: "claim-prediction-ebm-1.0.0",
    actor: "underwriting.lead@example.com",
    data_source: "train.csv · Porto Seguro Safe Driver Prediction",
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
        Hypothetical sample — not production evidence. A drift gate for a claim-prediction model.
        The SHA-256 hash is computed in the browser over canonical JSON (sorted keys, hash field
        omitted).
      </p>
      {error ? (
        <p className="field-error" role="alert">
          {error}
        </p>
      ) : null}
      {pack ? (
        <dl className="evidence-pack-meta">
          <div>
            <dt>decision_id</dt>
            <dd>
              <code>{pack.decision_id}</code>
            </dd>
          </div>
          <div>
            <dt>control_id</dt>
            <dd>
              <code>{pack.control_id}</code>
            </dd>
          </div>
          <div>
            <dt>model_version</dt>
            <dd>
              <code>{pack.model_version}</code>
            </dd>
          </div>
          <div>
            <dt>actor</dt>
            <dd>
              <code>{pack.actor}</code>
            </dd>
          </div>
          <div>
            <dt>data_source</dt>
            <dd>{pack.data_source}</dd>
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
        In CI, each control decision appends a canonical payload and the previous event hash. Unique
        decision IDs attribute the event to a user, model version and data source. The chain is
        tamper-evident locally. Automatically generated logs under the deployer's control are generally retained for at least six months, subject to the applicable system category and other legal retention duties (Art. 19 / Art. 26(6)). Optional external anchors (Jira,
        Rekor, object-lock storage) exist in Enterprise AI Risk and are off by default — this sample
        does not write to them. Canonical form used for the digest: {pretty ? "sorted-key JSON." : "—"}
      </p>
    </section>
  );
}
