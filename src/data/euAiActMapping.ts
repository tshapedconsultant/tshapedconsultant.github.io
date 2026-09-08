export type MappingStatus = "Implemented" | "Reference" | "Planned";

export type SystemRole = "provider" | "deployer" | "high-risk";

export type ControlKind =
  | "policy-as-code"
  | "SDLC gate"
  | "runtime kill switch"
  | "human approval"
  | "drift gate"
  | "explainability"
  | "data governance"
  | "audit ledger";

export type MappingRow = {
  id: string;
  articleKey: string;
  article: string;
  roles: SystemRole[];
  systemType: string;
  controlKind: ControlKind;
  control: string;
  evidence: string;
  status: MappingStatus;
  requirement: string;
  controlExample: string;
  evidenceExample: Record<string, unknown>;
};

export const MAPPING_SOURCE_NOTE =
  "Rows follow the Porto Seguro conformity pack (model card, drift, fairness, robustness, Annex-style documentation) and the Enterprise AI Risk evidence model (hash-chained ledger, unique decision IDs, Jira human gates). External anchors such as Rekor or S3 are optional in that repository and off by default. Copy is original.";

export const MAPPING_SUBTITLE =
  "Selected EU AI Act duties mapped to executable controls that emit a hashed evidence pack — for CTOs, Heads of AI and Risk leaders.";

export const MAPPING_INTRO =
  "This page shows which obligations apply to a given role and system, the executable controls that implement them, and the minimal evidence pack an auditor would inspect.";

export const MAPPING_SUBSET_NOTE =
  "This is an engineering and audit-evidence subset of the Act. It is not exhaustive, and it is not a full legal interpretation.";

export const MAPPING_DATES_NOTE =
  "Application dates vary by category and role; this mapping is the control and evidence design expected when those obligations apply.";

export const MAPPING_ROLE_BULLETS = [
  "Role is classified per system and use case — provider or deployer — and that role sets the obligation set. It is not a permanent company label.",
  "High-risk systems (Annex III examples: creditworthiness of natural persons, life and health insurance risk assessment and pricing, critical-infrastructure safety components) need the deeper Chapter III controls.",
  "Non-high-risk systems still need proportionate controls, aligned to ISO/IEC 42001 and risk appetite — not a full high-risk stack by default.",
];

export const MAPPING_ROLE_FOOTNOTE =
  "Provider and deployer follow the AI Act definitions. A single organisation can be both, depending on how the system is placed on the market or put into service.";

export const MAPPING_FILTER_HELP =
  "Filter by system type to see the obligations that typically apply to that role.";

export const MAPPING_STATUS_NOTE =
  "Status = implementation in reference projects, not regulatory applicability.";

export const MAPPING_ART12_RETENTION =
  "Art. 12 requires automatic, traceable event logs so the system's behaviour can be reconstructed. Logs are retained per applicable category — for example at least six months for many high-risk systems under Art. 19 (providers) and Art. 26(6) (deployers), unless other Union or national law requires more. The reference controls use unique decision IDs and attribute events to the user, model version and data sources.";

export const MAPPING_ISO_NOTE =
  "ISO/IEC 42001 is an AI management system (AIMS). It structures governance; it does not by itself confer presumption of conformity under the AI Act. Where a high-risk quality-management system is required, align with applicable European standards as they become applicable (for example prEN 18286). The reference repositories do not implement prEN 18286.";

export const MAPPING_ISO_NOTE_SHORT =
  "ISO/IEC 42001 is an AIMS: it structures governance; it does not by itself confer presumption of conformity under the AI Act.";

export const MAPPING_OUT_OF_SCOPE =
  "Not legal advice. Not a notified body. This work does not certify AI systems. It prepares control design, engineering and evidence for assessments and audits.";

export const MAPPING_OUT_OF_SCOPE_SHORT =
  "Not legal advice and not a certification — control design and evidence for assessments.";

export const EXEMPLAR_IDS = ["art-9-risk", "art-12-logs", "art-14-oversight"] as const;

export const EU_AI_ACT_MAPPING_ROWS: MappingRow[] = [
  {
    id: "art-9-risk",
    articleKey: "9",
    article: "Art. 9 – Risk management system",
    roles: ["provider", "high-risk"],
    systemType: "Provider · high-risk",
    controlKind: "drift gate",
    control: "Lifecycle risk process with continuous KS drift gates",
    evidence: "Drift JSON pack + hash-chained audit event",
    status: "Implemented",
    requirement:
      "A continuous, lifecycle risk process for high-risk systems: identify residual risk, set limits, and keep those limits under review while the model is in production.",
    controlExample: `if ks_statistic(feature) > policy.drift_threshold:
    emit_evidence(pack)
    return BLOCK  # or HUMAN_REVIEW`,
    evidenceExample: {
      control_id: "CTRL-DRIFT-GATE",
      article: "9",
      decision: "BLOCK",
      metrics: { drift_score: 0.934, feature: "ps_car_13" },
    },
  },
  {
    id: "art-10-data",
    articleKey: "10",
    article: "Art. 10 – Data and data governance",
    roles: ["provider", "high-risk"],
    systemType: "Provider · high-risk",
    controlKind: "data governance",
    control: "Dataset lineage, representativeness checks, and bias metrics",
    evidence: "Training-data card and fairness tests in the conformity JSON",
    status: "Reference",
    requirement:
      "Training, validation and testing data must be relevant, sufficiently representative, and traceable — including how the split was made, what is out of scope, and bias checks recorded in the conformity pack.",
    controlExample: `assert stratified_split(seed=42, ratio="80/20")
assert lineage.source == "train.csv"
record(data_quality_score, missing_value_columns)
record(fairness.demographic_parity, fairness.equalized_odds)`,
    evidenceExample: {
      dataset: "Porto Seguro Safe Driver Prediction",
      records: 595212,
      train_test_split: "80/20 stratified",
      data_quality_score: 0.7797,
      fairness: {
        demographic_parity_overall: true,
        equalized_odds_tpr_delta: 0.0075,
      },
    },
  },
  {
    id: "art-11-docs",
    articleKey: "11",
    article: "Art. 11 – Technical documentation",
    roles: ["provider", "high-risk"],
    systemType: "Provider · high-risk",
    controlKind: "policy-as-code",
    control: "Versioned model card generated from the same pipeline as the model",
    evidence: "Conformity pack JSON (intended use, metrics, limits)",
    status: "Implemented",
    requirement:
      "Documentation that lets a competent authority understand the system: purpose, architecture, data, performance and residual risk — generated, not reconstructed.",
    controlExample: `pipeline.emit("eu_ai_act_conformity_v1.json")
assert pack.model_details.version == release.git_sha`,
    evidenceExample: {
      document_type: "Unified AI Report",
      model: "claim-prediction-ebm",
      version: "1.0.0",
      intended_use: "claim probability for underwriting support",
    },
  },
  {
    id: "art-12-logs",
    articleKey: "12",
    article: "Art. 12 – Record-keeping",
    roles: ["provider", "high-risk"],
    systemType: "Provider · high-risk",
    controlKind: "audit ledger",
    control: "Tamper-evident hash-chained ledger for reconstructing behaviour",
    evidence: "Chained hashes + DecisionRecord (user, model version, data sources)",
    status: "Implemented",
    requirement:
      "High-risk systems must technically allow automatic event logs so authorities can reconstruct the system's behaviour (Art. 12). Providers and deployers keep the logs under their control for a period appropriate to purpose — at least six months unless other Union or national law requires otherwise (Art. 19 / Art. 26(6)).",
    controlExample: `event = {
  decision_id, actor, model_version, data_source, payload
}
event.hash = sha256(canonical(event) + prev.hash)
store.append(event)  # retain per category; ≥6 months for many high-risk systems (Arts 19/26)`,
    evidenceExample: {
      decision_id: "DEC-001842",
      actor: "underwriting.lead@example.com",
      model_version: "claim-prediction-ebm-1.0.0",
      data_source: "train.csv",
      prev_hash: "9c1f…",
      event_hash: "a3e8…",
    },
  },
  {
    id: "art-13-transparency",
    articleKey: "13",
    article: "Art. 13 – Transparency",
    roles: ["provider", "high-risk"],
    systemType: "Provider · high-risk",
    controlKind: "explainability",
    control: "Technical explanations supporting user transparency and internal oversight",
    evidence: "Explanation artefacts in the evidence pack",
    status: "Implemented",
    requirement:
      "Transparency so deployers can interpret output and use the system appropriately — including what the score is, and is not, authorised to do. Technical explanations (global and local scores) support that duty for users and internal overseers; the Act does not always require technical XAI.",
    controlExample: `explain = ebm.explain_local(row)
pack.explanations = { global: top_features, local: explain }
return score, explain  # never a silent decision`,
    evidenceExample: {
      explainability_method: "native EBM",
      global: "available",
      local: "available",
      out_of_scope: ["direct premium calculation"],
    },
  },
  {
    id: "art-14-oversight",
    articleKey: "14",
    article: "Art. 14 – Human oversight",
    roles: ["provider", "deployer", "high-risk"],
    systemType: "Provider / deployer · high-risk",
    controlKind: "human approval",
    control: "Human gates so operators can monitor, interpret, override and stop",
    evidence: "DecisionRecord + webhook timestamps",
    status: "Implemented",
    requirement:
      "Natural persons must be able to monitor and interpret the system, override its output, and stop it. Closing a department ticket is not a business approval unless a named human says so.",
    controlExample: `if decision in {"BLOCK", "HUMAN_REVIEW"}:
    open_jira_gate(department)
    wait_hmac_webhook()
    # engine never emits APPROVE`,
    evidenceExample: {
      workflow_status: "HUMAN_REVIEW_REQUIRED",
      approver_domain: "example.com",
      human_decision: null,
    },
  },
  {
    id: "art-15-robustness",
    articleKey: "15",
    article: "Art. 15 – Accuracy and robustness",
    roles: ["provider", "high-risk"],
    systemType: "Provider · high-risk",
    controlKind: "SDLC gate",
    control: "Hold-out metrics plus adversarial / perturbation tests in CI",
    evidence: "Robustness test report + threshold artefact",
    status: "Reference",
    requirement:
      "Appropriate accuracy, robustness and consistency against errors, faults and inconsistencies that may occur in the real environment or through interaction with other systems.",
    controlExample: `assert roc_auc >= policy.min_auc
assert max_perturbation_degradation < policy.max_drop
fail_pipeline() if not robustness_passed`,
    evidenceExample: {
      roc_auc: 0.639,
      adversarial: { max_degradation: 0.027, overall_robust: true },
    },
  },
  {
    id: "art-15-cyber",
    articleKey: "15",
    article: "Art. 15 – Cybersecurity",
    roles: ["provider", "high-risk"],
    systemType: "Provider · high-risk",
    controlKind: "runtime kill switch",
    control: "Kill switch plus security monitoring on an independent stop-path",
    evidence: "Kill-switch audit event with actor and reason",
    status: "Reference",
    requirement:
      "Resilience against attempts to alter use or performance — including a stop-path that does not depend on the model agreeing to be stopped, with security monitoring of that path.",
    controlExample: `if not policy.allows(action):
    kill_switch("unauthorised_tool")
    log(actor="runtime_guard", decision="BLOCK")`,
    evidenceExample: {
      control_id: "CTRL-KILL-SWITCH",
      decision: "BLOCK",
      reason: "tool_not_in_allowlist",
    },
  },
  {
    id: "art-16-provider",
    articleKey: "16",
    article: "Art. 16 – Obligations of providers",
    roles: ["provider"],
    systemType: "Provider",
    controlKind: "policy-as-code",
    control: "Versioned YAML / policy-as-code profiles in CI",
    evidence: "Versioned policy + CI evidence-pack artefact",
    status: "Implemented",
    requirement:
      "Providers put the high-risk duties into design, quality management and post-market monitoring — as versioned artefacts, not slideware.",
    controlExample: `policy = load_yaml("rules/gdpr.yaml")  # validated at boot
assert policy.mode == "decision"
ci.upload("evidence-pack.json")`,
    evidenceExample: {
      policy_version: "deterministic-yaml-profiles-v1.4",
      ci_artifact: "evidence-pack.json",
    },
  },
  {
    id: "art-26-deployer",
    articleKey: "26",
    article: "Art. 26 – Obligations of deployers",
    roles: ["deployer"],
    systemType: "Deployer",
    controlKind: "human approval",
    control: "Operating instructions, human stop-rights, and monitoring ownership",
    evidence: "Deployer runbook + named oversight log",
    status: "Planned",
    requirement:
      "Deployers follow the provider’s instructions, keep humans able to stop the system, and own monitoring. They retain automatically generated logs under their control for a period appropriate to purpose — at least six months unless other law requires otherwise (Art. 26(6)).",
    controlExample: `assign(oversight_role="underwriting_lead")
require(human_can_override=True)
monitor(drift_and_incidents)`,
    evidenceExample: {
      role: "deployer",
      oversight: "named underwriting lead",
      stop_rights: true,
    },
  },
  {
    id: "annex-iv",
    articleKey: "IV",
    article: "Annex IV – Technical documentation",
    roles: ["provider", "high-risk"],
    systemType: "Provider · high-risk",
    controlKind: "SDLC gate",
    control: "CI export of SHA-256 packs as an Annex IV–style documentation set",
    evidence: "Annex IV–style set: model, data, tests, hashes",
    status: "Implemented",
    requirement:
      "An Annex IV–style documentation set that can be handed to an auditor: system description, design, data, monitoring and the SHA-256 hashes that bind those artefacts to a release.",
    controlExample: `pack = build_annex_iv(model, data, tests, drift)
pack.evidence_hash = sha256(canonical(pack))
ci.retain(pack, years=10)`,
    evidenceExample: {
      annex: "IV",
      artefacts: ["model.pkl", "threshold.json", "conformity.json"],
      evidence_hash: "sha256:…",
    },
  },
];

export function mappingExemplars(): MappingRow[] {
  return EXEMPLAR_IDS.map((id) => EU_AI_ACT_MAPPING_ROWS.find((row) => row.id === id)).filter(
    (row): row is MappingRow => Boolean(row)
  );
}
