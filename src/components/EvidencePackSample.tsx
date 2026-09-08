import { useEffect, useMemo, useRef, useState } from "react";
import { canonicalStringify, hashEvidencePayload } from "../lib/canonicalHash";
import { useI18n } from "../i18n/LocaleContext";

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
  const { t } = useI18n();
  const ui = t.evidence;
  const [pack, setPack] = useState<EvidencePack | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [generation, setGeneration] = useState(1);
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);
  const jsonRef = useRef<HTMLDetailsElement>(null);
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    let cancelled = false;
    setBusy(true);
    setError("");
    void signPack(buildUnsignedPack(generation))
      .then((next) => {
        if (!cancelled) setPack(next);
      })
      .catch(() => {
        if (!cancelled) setError(ui.hashError);
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
  const shortHash = pack?.evidence_hash
    ? pack.evidence_hash.length > 20
      ? `${pack.evidence_hash.slice(0, 10)}…${pack.evidence_hash.slice(-8)}`
      : pack.evidence_hash
    : "";

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

  async function copyHash() {
    if (!pack?.evidence_hash) return;
    try {
      await navigator.clipboard.writeText(pack.evidence_hash);
      setCopied(true);
      setCopyFailed(false);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyFailed(true);
      if (jsonRef.current) jsonRef.current.open = true;
      requestAnimationFrame(() => preRef.current?.focus());
    }
  }

  return (
    <section className="evidence-pack" aria-labelledby="evidence-pack-title">
      <h2 id="evidence-pack-title">{ui.title}</h2>
      <p>{ui.intro}</p>
      {error ? (
        <p className="field-error" role="alert">
          {error}
        </p>
      ) : null}
      {pack ? (
        <dl className="evidence-pack-meta">
          <div className="evidence-field evidence-field-extra">
            <dt>decision_id</dt>
            <dd>
              <code>{pack.decision_id}</code>
            </dd>
          </div>
          <div className="evidence-field evidence-field-primary ev-control">
            <dt>control_id</dt>
            <dd>
              <code>{pack.control_id}</code>
            </dd>
          </div>
          <div className="evidence-field evidence-field-extra">
            <dt>model_version</dt>
            <dd>
              <code>{pack.model_version}</code>
            </dd>
          </div>
          <div className="evidence-field evidence-field-extra">
            <dt>actor</dt>
            <dd>
              <code>{pack.actor}</code>
            </dd>
          </div>
          <div className="evidence-field evidence-field-extra">
            <dt>data_source</dt>
            <dd>{pack.data_source}</dd>
          </div>
          <div className="evidence-field evidence-field-primary ev-policy">
            <dt>policy_version</dt>
            <dd>
              <code>{pack.policy_version}</code>
            </dd>
          </div>
          <div className="evidence-field evidence-field-extra ev-timestamp">
            <dt>timestamp</dt>
            <dd>
              <time dateTime={pack.timestamp}>{pack.timestamp}</time>
            </dd>
          </div>
          <div className="evidence-field evidence-field-primary ev-decision">
            <dt>decision</dt>
            <dd>
              <span className={`status-pill status-${pack.decision.toLowerCase()}`}>{pack.decision}</span>
            </dd>
          </div>
          <div className="evidence-field evidence-field-extra">
            <dt>input_summary</dt>
            <dd>{pack.input_summary}</dd>
          </div>
          <div className="evidence-field evidence-field-extra">
            <dt>metrics</dt>
            <dd>
              drift_score {pack.metrics.drift_score} · demographic_parity_delta{" "}
              {pack.metrics.fairness_metrics.demographic_parity_delta} · equalized_odds_tpr_delta{" "}
              {pack.metrics.fairness_metrics.equalized_odds_tpr_delta}
            </dd>
          </div>
          <div className="evidence-field evidence-field-primary ev-hash">
            <dt>evidence_hash</dt>
            <dd>
              <code className="hash-value hash-full">{pack.evidence_hash}</code>
              <span className="hash-abbr">{shortHash}</span>
            </dd>
          </div>
        </dl>
      ) : (
        <p role="status">{ui.hashing}</p>
      )}
      <div className="evidence-pack-actions">
        <button
          className="btn btn-solid"
          type="button"
          disabled={busy}
          onClick={() => setGeneration((n) => n + 1)}
        >
          {busy ? ui.generateBusy : ui.generate}
        </button>
        <button className="btn btn-ghost" type="button" disabled={!pack} onClick={download}>
          {ui.download}
        </button>
        <button className="btn btn-ghost" type="button" disabled={!pack} onClick={() => void copyHash()}>
          {copied ? ui.copied : ui.copy}
        </button>
      </div>
      {copyFailed ? (
        <p className="evidence-copy-fallback" role="status">
          {ui.copyFail}
        </p>
      ) : null}
      {formatted ? (
        <details className="evidence-json-disclose" ref={jsonRef}>
          <summary>{ui.viewJson}</summary>
          <pre className="rego evidence-json" tabIndex={0} ref={preRef}>
            {formatted}
          </pre>
        </details>
      ) : null}
      <p className="evidence-pack-note">
        {ui.note} {pretty ? ui.sorted : "—"}
      </p>
    </section>
  );
}
