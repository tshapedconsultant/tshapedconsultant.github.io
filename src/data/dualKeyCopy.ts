export type DualKeyRow = {
  runtime: string;
  specialization: string;
  why: string;
};

export type DualKeyCard = {
  domain: string;
  text: string;
};

export type DualKeyCopy = {
  kicker: string;
  title: string;
  intro: string;
  anchor: string;
  flowTitle: string;
  flowLabel: string;
  steps: { title: string; text: string }[];
  keysLabel: string;
  keyTechnical: { title: string; text: string };
  keyBusiness: { title: string; text: string };
  notParallelTitle: string;
  tableCaption: string;
  colRuntime: string;
  colDualKey: string;
  colWhy: string;
  rows: DualKeyRow[];
  trustTitle: string;
  trust: string[];
  refTitle: string;
  refLabel: string;
  refs: DualKeyCard[];
  policyTitle: string;
  policyLabel: string;
  ctaBefore: string;
  ctaLink: string;
  ctaAfter: string;
};

const REF_LABEL =
  "REFERENCE ARCHITECTURE — design to be validated per deployment, not a verified production deployment";

const REF_LABEL_ES =
  "ARQUITECTURA DE REFERENCIA — diseño que debe validarse en cada despliegue, no un despliegue de producción verificado";

const EN: DualKeyCopy = {
  kicker: "Dédalo™ · DGOM™ · Dual-Key",
  title:
    "The Dual-Key Protocol — Independent Execution Authority for High-Consequence AI Decisions",
  intro:
    "High-consequence actions need an execution authority that does not sit inside the model.",
  anchor: "AI assists and drafts; deterministic governance executes. The agent remains autonomous — but never sovereign.",
  flowTitle: "The pattern end-to-end",
  flowLabel: "Dual-Key execution flow, from analysis to fail-closed execution",
  steps: [
    {
      title: "Analytical Engine",
      text: "Local EBM. No PII leaves the perimeter.",
    },
    {
      title: "Auditor Agent",
      text: "Claude via MCP. Drafts review requests. No write permissions.",
    },
  ],
  keysLabel: "Two parallel approval keys",
  keyTechnical: {
    title: "KEY 1 · Technical",
    text: "Data Science. Model integrity.",
  },
  keyBusiness: {
    title: "KEY 2 · Business",
    text: "Operations, Risk or Legal. Domain coherence.",
  },
  notParallelTitle: "Not a parallel architecture",
  tableCaption: "How Dual-Key specialises Runtime Assurance, rather than replacing it",
  colRuntime: "Runtime Assurance",
  colDualKey: "Dual-Key specialisation",
  colWhy: "Why",
  rows: [
    {
      runtime: "Pre-inference inspection",
      specialization: "Analytical Engine — a local EBM. No PII leaves the perimeter.",
      why: "The score is produced inside the boundary. The agent does not become the source of the decision input.",
    },
    {
      runtime: "Agent reasoning",
      specialization: "Auditor Agent — drafts review requests over MCP, with no write permissions.",
      why: "The agent can assist and draft. It cannot execute.",
    },
    {
      runtime: "Inline veto and threshold gates",
      specialization: "Two parallel approval keys: technical integrity, and business or legal coherence.",
      why: "One role cannot authorise a high-consequence action alone.",
    },
    {
      runtime: "PDP → PEP",
      specialization:
        "Independent Authorization Service. Both keys are bound to the action-payload hash, the model version and the policy version.",
      why: "Without two valid keys, the PEP fails closed and nothing executes.",
    },
  ],
  trustTitle: "Trust contract",
  trust: [
    "Only an authenticated gateway constructs PDP input. The agent cannot set policy decisions, identity, signature status, time or hashes.",
    "A verifier validates signatures against identity-bound public keys and an authoritative role registry.",
    "The PEP hashes the actual canonical execution payload. It never trusts an agent-supplied hash.",
    "Approvals expire (maximum TTL, with a clock-skew margin). The payload has its own execution deadline, re-checked by the PEP immediately before dispatch.",
    "After a PDP allow, an authorization coordinator atomically reserves both approval nonces and issues a one-time execution capability.",
  ],
  refTitle: "Reference architectures",
  refLabel: REF_LABEL,
  refs: [
    {
      domain: "Operational Technology · IEC 61511 + NIS2",
      text: "A proposed setpoint change, bypass or remote command waits for a technical key and an operations key. The pattern generates evidence supporting human oversight and operational control. It does not demonstrate conformity with IEC 61511 or NIS2.",
    },
    {
      domain: "Creditworthiness governance · EU AI Act + DORA",
      text: "A credit recommendation stays a draft until a model-integrity key and a risk or legal key bind the same payload. The pattern generates evidence supporting Article 14 oversight and DORA ICT control. It does not guarantee compliance.",
    },
    {
      domain: "Insurance underwriting",
      text: "An underwriting recommendation is not committed until a technical key and an underwriting key bind the same payload. Execution stays fail-closed. This is a design to validate per deployment.",
    },
  ],
  policyTitle: "Illustrative PDP policy",
  policyLabel:
    "Illustrative PDP policy — requires opa check and an authorization/denial test matrix before production use.",
  ctaBefore: "Map your execution authority in 2–3 weeks. Start with an",
  ctaLink: "AI Governance Snapshot",
  ctaAfter: ".",
};

const ES: DualKeyCopy = {
  kicker: "Dédalo™ · DGOM™ · Dual-Key",
  title:
    "El Protocolo Dual-Key — autoridad de ejecución independiente para decisiones de IA de alta consecuencia",
  intro:
    "Las acciones de alta consecuencia necesitan una autoridad de ejecución que no resida dentro del modelo.",
  anchor:
    "La IA asiste y redacta; la gobernanza determinista ejecuta. El agente sigue siendo autónomo, pero nunca soberano.",
  flowTitle: "El patrón de extremo a extremo",
  flowLabel: "Flujo Dual-Key, del análisis a la ejecución en fallo cerrado",
  steps: [
    {
      title: "Motor analítico",
      text: "EBM local. Ningún dato personal sale del perímetro.",
    },
    {
      title: "Agente auditor",
      text: "Claude vía MCP. Redacta solicitudes de revisión. Sin permisos de escritura.",
    },
  ],
  keysLabel: "Dos llaves de aprobación en paralelo",
  keyTechnical: {
    title: "LLAVE 1 · Técnica",
    text: "Ciencia de datos. Integridad del modelo.",
  },
  keyBusiness: {
    title: "LLAVE 2 · Negocio",
    text: "Operaciones, Riesgo o Legal. Coherencia de dominio.",
  },
  notParallelTitle: "No es una arquitectura paralela",
  tableCaption: "Cómo Dual-Key especializa Runtime Assurance, en lugar de sustituirlo",
  colRuntime: "Runtime Assurance",
  colDualKey: "Especialización Dual-Key",
  colWhy: "Por qué",
  rows: [
    {
      runtime: "Inspección previa a la inferencia",
      specialization: "Motor analítico — un EBM local. Ningún dato personal sale del perímetro.",
      why: "La puntuación se produce dentro del límite. El agente no se convierte en la fuente de la entrada de la decisión.",
    },
    {
      runtime: "Razonamiento del agente",
      specialization: "Agente auditor — redacta solicitudes de revisión por MCP, sin permisos de escritura.",
      why: "El agente puede asistir y redactar. No puede ejecutar.",
    },
    {
      runtime: "Vetos en línea y compuertas de umbral",
      specialization: "Dos llaves de aprobación en paralelo: integridad técnica, y coherencia de negocio o legal.",
      why: "Un solo rol no puede autorizar en solitario una acción de alta consecuencia.",
    },
    {
      runtime: "PDP → PEP",
      specialization:
        "Servicio de autorización independiente. Ambas llaves quedan ligadas al hash de la carga de la acción, a la versión del modelo y a la versión de la política.",
      why: "Sin dos llaves válidas, el PEP falla cerrado y no se ejecuta nada.",
    },
  ],
  trustTitle: "Contrato de confianza",
  trust: [
    "Solo una pasarela autenticada construye la entrada del PDP. El agente no puede fijar decisiones de política, identidad, estado de la firma, tiempo ni hashes.",
    "Un verificador valida las firmas contra claves públicas ligadas a la identidad y un registro de roles con autoridad.",
    "El PEP calcula el hash de la carga canónica real de ejecución. Nunca confía en un hash aportado por el agente.",
    "Las aprobaciones caducan (TTL máximo, con margen de desfase de reloj). La carga tiene su propio plazo de ejecución, que el PEP vuelve a comprobar inmediatamente antes del envío.",
    "Tras un allow del PDP, un coordinador de autorización reserva de forma atómica ambos nonces de aprobación y emite una capacidad de ejecución de un solo uso.",
  ],
  refTitle: "Arquitecturas de referencia",
  refLabel: REF_LABEL_ES,
  refs: [
    {
      domain: "Tecnología operativa · IEC 61511 + NIS2",
      text: "Un cambio de consigna, un bypass o un mando remoto propuesto espera una llave técnica y una llave de operaciones. El patrón genera evidencia que apoya la supervisión humana y el control operativo. No demuestra conformidad con IEC 61511 ni con NIS2.",
    },
    {
      domain: "Gobernanza de solvencia · EU AI Act + DORA",
      text: "Una recomendación de crédito sigue siendo un borrador hasta que una llave de integridad del modelo y una llave de riesgo o legal ligan la misma carga. El patrón genera evidencia que apoya la supervisión del artículo 14 y el control TIC de DORA. No garantiza el cumplimiento.",
    },
    {
      domain: "Suscripción de seguros",
      text: "Una recomendación de suscripción no se confirma hasta que una llave técnica y una llave de suscripción ligan la misma carga. La ejecución permanece en fallo cerrado. Es un diseño que hay que validar en cada despliegue.",
    },
  ],
  policyTitle: "Política PDP ilustrativa",
  policyLabel:
    "Política PDP ilustrativa — requiere opa check y una matriz de pruebas de autorización y denegación antes de usarla en producción.",
  ctaBefore: "Mapea tu autoridad de ejecución en 2–3 semanas. Empieza por un",
  ctaLink: "AI Governance Snapshot",
  ctaAfter: ".",
};

export function dualKeyCopy(locale: string): DualKeyCopy {
  return locale === "es" ? ES : EN;
}

export const DUAL_KEY_REGO = `dual_key_ok if {
  roles := {a.role | a := input.approvals[_]}
  roles == {"technical_owner", "business_owner"}

  approver_ids := {a.approver_id | a := input.approvals[_]}
  count(approver_ids) == 2

  every a in input.approvals {
    a.payload_hash == input.action.payload_hash
    a.model_version == input.action.model_version
    a.policy_version == input.policy.version
    issued_at := time.parse_rfc3339_ns(a.issued_at)
    expiry := time.parse_rfc3339_ns(a.expiry)
    issued_at <= time.now_ns() + data.clock_skew_ns
    expiry >= time.now_ns() - data.clock_skew_ns
    expiry - issued_at <= data.max_ttl_ns
  }
}`;

export function highlightRego(source: string): string {
  const escaped = source
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return escaped
    .replace(/"[^"\n]*"/g, (match) => `<span class="rego-str">${match}</span>`)
    .replace(/\b(time\.parse_rfc3339_ns|time\.now_ns|count)\b/g, '<span class="rego-fn">$1</span>')
    .replace(/\b(if|every|in)\b/g, '<span class="rego-kw">$1</span>');
}
