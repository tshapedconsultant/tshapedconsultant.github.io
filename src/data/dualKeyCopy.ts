export type DualKeyRow = {
  runtime: string;
  specialization: string;
  why: string;
};

export type DualKeyCard = {
  domain: string;
  text: string;
};

export type DualKeyFaq = {
  q: string;
  a: string;
};

export type DualKeyCopy = {
  kicker: string;
  title: string;
  subhead: string;
  primaryCta: string;
  secondaryCta: string;
  microcopy: string;
  priceLine: string;
  fitTitle: string;
  fitLead: string;
  fit: string[];
  offerTitle: string;
  offerName: string;
  offerBoundary: string;
  offerItems: string[];
  offerNext: string;
  middleCta: string;
  evidenceTitle: string;
  evidenceLead: string;
  evidenceItems: { title: string; text: string }[];
  archTitle: string;
  archLabel: string;
  archSteps: { title: string; text: string }[];
  archDetailTitle: string;
  archDetail: { title: string; text: string }[];
  archNote: string;
  refTitle: string;
  refBadge: string;
  refNote: string;
  refs: DualKeyCard[];
  techTitle: string;
  techLead: string;
  tableSummary: string;
  tableCaption: string;
  colRuntime: string;
  colDualKey: string;
  colWhy: string;
  rows: DualKeyRow[];
  trustSummary: string;
  trust: string[];
  policySummary: string;
  policyLabel: string;
  policyExternal: string;
  copyPolicy: string;
  copiedPolicy: string;
  copyFailed: string;
  faqTitle: string;
  faq: DualKeyFaq[];
  finalLead: string;
  finalCta: string;
};

const EN: DualKeyCopy = {
  kicker: "Dual-Key Protocol",
  title: "Keep AI recommendations separate from execution authority.",
  subhead:
    "Identify where your agents can change systems, move money or commit consequential decisions without an independent authorization gate—and define the controls needed before production.",
  primaryCta: "Request an AI Governance Snapshot",
  secondaryCta: "Explore the control architecture",
  microcopy: "Bounded technical review · Scope agreed before engagement · No compliance certification claims",
  priceLine: "From €2,495 · delivered in one week",
  fitTitle: "Where this fits",
  fitLead:
    "Not every action needs two human approvals. An independent, trusted policy decides when Dual-Key is required. Other actions can stay on a simpler gate.",
  fit: [
    "Agents with write access.",
    "Consequential physical, financial or business actions.",
    "Unclear approval ownership, or weak action-level evidence.",
  ],
  offerTitle: "What the entry review delivers",
  offerName: "AI Governance Snapshot",
  offerBoundary:
    "This is a diagnosis of one organisation and one AI system or use case. It is not a full control design, not an implementation, and not a certification.",
  offerItems: [
    "Review of architecture, connected tools, data flows and current logging.",
    "A map of access, authority and evidence gaps, including where an agent can change a system, move money or commit an action.",
    "Executive memo, a short risk matrix and 3 to 5 prioritised technical actions.",
    "A technical readout session.",
  ],
  offerNext:
    "A full control design or runtime implementation is a separate Blueprint & Runtime Assurance engagement, from €6,500 and scoped to requirements.",
  middleCta: "Request an AI Governance Snapshot",
  evidenceTitle: "What is shown, and what is not",
  evidenceLead:
    "A demonstration and a reference design are not the same thing as a production deployment of this protocol.",
  evidenceItems: [
    {
      title: "HR Copilot",
      text: "A documented demonstration on synthetic data. It shows runtime controls on that copilot. It is not evidence of a Dual-Key deployment, and a result from that test suite does not transfer to other systems.",
    },
    {
      title: "Sector patterns below",
      text: "Reference architectures. They describe a design to validate. They are not verified production deployments.",
    },
  ],
  archTitle: "The control architecture",
  archLabel: "Dual-Key path from proposal to controlled execution",
  archSteps: [
    { title: "AI proposes", text: "The model or agent drafts a recommendation. It does not hold execution authority." },
    {
      title: "Independent approvals",
      text: "When policy requires Dual-Key, a technical key and a business key approve the same action.",
    },
    { title: "Authorization gate", text: "An independent service evaluates trusted inputs and fails closed." },
    { title: "Controlled execution", text: "The enforcement point dispatches only a one-time, re-checked capability." },
  ],
  archDetailTitle: "What sits behind the gate",
  archDetail: [
    {
      title: "Verifier",
      text: "Checks signatures, identities and roles against identity-bound keys and an authoritative role registry. Checking a boolean in policy does not perform that cryptography.",
    },
    {
      title: "PDP",
      text: "Evaluates policy on trusted gateway input. It does not consume approval nonces, and it is not an execution point.",
    },
    {
      title: "Authorization coordinator",
      text: "After a PDP allow, it atomically reserves both approval nonces and issues a one-time execution capability. Replay protection lives here, not in a policy flag.",
    },
    {
      title: "PEP",
      text: "Recomputes the hash of the actual canonical payload, re-checks the execution deadline and other conditions, and redeems that one-time capability.",
    },
  ],
  archNote:
    "Rollback and recovery are separate mechanisms. Approving an action does not make it reversible.",
  refTitle: "Reference architectures",
  refBadge: "Reference architecture — implementation and validation are scoped separately.",
  refNote:
    "These cards are designs to validate per deployment. They are not verified production deployments, and they do not certify compliance.",
  refs: [
    {
      domain: "Operational technology · IEC 61511 + NIS2",
      text: "A proposed setpoint change, bypass or remote command waits for a technical key and an operations key. The pattern can support applicable human-oversight and operational-control requirements. It does not demonstrate conformity with IEC 61511 or NIS2.",
    },
    {
      domain: "Creditworthiness · natural persons",
      text: "A recommendation about a natural person's creditworthiness stays a draft until a model-integrity key and a risk or legal key bind the same payload. Decisions about companies are a different case. The pattern can support applicable oversight requirements. DORA addresses ICT resilience; it does not certify credit fairness.",
    },
    {
      domain: "Insurance underwriting",
      text: "An underwriting recommendation is not committed until a technical key and an underwriting key bind the same payload. This does not place motor or other lines into the EU AI Act life-and-health category, and it does not certify compliance.",
    },
  ],
  techTitle: "Technical detail",
  techLead: "The same material as the control design, available here without leaving the page.",
  tableSummary: "How this specialises Runtime Assurance",
  tableCaption: "Dual-Key narrows Runtime Assurance for consequential actions. It does not replace it.",
  colRuntime: "Runtime Assurance",
  colDualKey: "Dual-Key specialisation",
  colWhy: "Why",
  rows: [
    {
      runtime: "Pre-inference inspection",
      specialization:
        "Optional local explainable model. Contributions explain that model's prediction, not a cause. Distillation still needs checks of fidelity, accuracy and calibration. Only approved, minimized evidence is shared onward.",
      why: "Dual-Key does not require replacing every model. The agent does not become the source of the decision input.",
    },
    {
      runtime: "Agent reasoning",
      specialization:
        "An auditor agent can draft a review request, including over MCP, with no write permission. MCP does not guarantee isolation or anonymity.",
      why: "The agent can assist and draft. It cannot execute, and it cannot decide that Dual-Key applies.",
    },
    {
      runtime: "Inline veto and threshold gates",
      specialization: "Two human keys only when an independent policy requires them: technical integrity, and business or legal coherence.",
      why: "One role cannot authorise that action alone. Simpler actions are not forced through both keys.",
    },
    {
      runtime: "PDP → PEP",
      specialization:
        "Verifier, policy decision, atomic nonce reservation, then a PEP bound to the real payload hash, model version and policy version.",
      why: "Without a valid allow and a one-time capability, nothing executes.",
    },
  ],
  trustSummary: "Trust contract",
  trust: [
    "Only an authenticated gateway constructs PDP input. The agent cannot set policy decisions, identity, signature status, time or hashes.",
    "A verifier validates signatures against identity-bound public keys and an authoritative role registry. The policy reads the result; it does not run the cryptography.",
    "The PEP hashes the actual canonical execution payload. It never trusts an agent-supplied hash.",
    "Approvals carry issued_at and expires_at, a maximum TTL and a clock-skew margin, all in the same time unit. The payload has its own execution deadline, re-checked by the PEP immediately before dispatch.",
    "After a PDP allow, an authorization coordinator atomically reserves both approval nonces and issues a one-time execution capability. The policy does not consume nonces.",
    "Whether Dual-Key is required comes from trusted policy data, not from the agent.",
  ],
  policySummary: "Illustrative PDP policy",
  policyLabel:
    "Illustrative Rego v1. Not compiled or tested with OPA. Do not treat it as a production policy until it passes opa check and an authorization/denial test matrix.",
  policyExternal:
    "Outside this snippet: the verifier checks signatures and the role registry; the gateway builds the input, including whether Dual-Key is required; the coordinator atomically reserves both nonces after allow. A true boolean in the input is not cryptographic proof, and a nonce flag inside the policy is not replay protection.",
  copyPolicy: "Copy policy",
  copiedPolicy: "Policy copied",
  copyFailed: "Could not copy. Select the policy text instead.",
  faqTitle: "Questions before a review",
  faq: [
    {
      q: "Does every AI action need two approvals?",
      a: "No. An independent policy decides when Dual-Key applies. Lower-consequence actions can use a simpler gate.",
    },
    {
      q: "Do we need to replace our models?",
      a: "No. An explainable model is optional. Dual-Key separates the recommendation from the authority to execute it.",
    },
    {
      q: "Is this already a production deployment?",
      a: "No. The sector cards are reference architectures. Implementation and validation are scoped separately.",
    },
    {
      q: "Does this certify compliance?",
      a: "No. The Snapshot is technical governance engineering support. It is not legal advice, a notified-body assessment or a certification. The pattern can support applicable oversight requirements.",
    },
    {
      q: "What happens after the initial review?",
      a: "In one week you receive the Snapshot: the gap map, an executive memo, a short risk matrix and 3 to 5 prioritised actions, plus a readout. A Blueprint or an implementation is a later, separate engagement.",
    },
  ],
  finalLead: "Start with the one-week Snapshot. Design and implementation stay out of scope until you ask for them.",
  finalCta: "Request an AI Governance Snapshot",
};

const ES: DualKeyCopy = {
  kicker: "Protocolo Dual-Key",
  title: "Separa las recomendaciones de la IA de la autoridad de ejecución.",
  subhead:
    "Identifica dónde tus agentes pueden cambiar sistemas, mover dinero o comprometer decisiones de consecuencia sin una compuerta de autorización independiente, y define los controles necesarios antes de producción.",
  primaryCta: "Solicitar AI Governance Snapshot",
  secondaryCta: "Ver la arquitectura de control",
  microcopy: "Revisión técnica acotada · Alcance acordado antes del encargo · Sin pretensión de certificación",
  priceLine: "Desde €2.495 · entrega en una semana",
  fitTitle: "Cuándo encaja",
  fitLead:
    "No toda acción necesita dos aprobaciones humanas. Una política independiente y de confianza decide cuándo se exige Dual-Key. El resto puede quedar en una compuerta más simple.",
  fit: [
    "Agentes con permiso de escritura.",
    "Acciones físicas, financieras o de negocio de consecuencia.",
    "Titularidad de la aprobación poco clara, o evidencia débil a nivel de acción.",
  ],
  offerTitle: "Qué entrega la revisión de entrada",
  offerName: "AI Governance Snapshot",
  offerBoundary:
    "Es un diagnóstico de una organización y un sistema o caso de uso de IA. No es el diseño completo, ni la implementación, ni una certificación.",
  offerItems: [
    "Revisión de la arquitectura, las herramientas conectadas, los flujos de datos y los registros actuales.",
    "Un mapa de brechas de acceso, autoridad y evidencia, incluido dónde un agente puede cambiar un sistema, mover dinero o comprometer una acción.",
    "Memo ejecutivo, matriz breve de riesgos y de 3 a 5 acciones técnicas priorizadas.",
    "Sesión de devolución técnica.",
  ],
  offerNext:
    "El diseño completo o la implementación en runtime es un encargo aparte de Blueprint & Runtime Assurance, desde €6.500 y con alcance definido.",
  middleCta: "Solicitar AI Governance Snapshot",
  evidenceTitle: "Qué está demostrado y qué no",
  evidenceLead:
    "Una demostración y un diseño de referencia no son un despliegue de producción de este protocolo.",
  evidenceItems: [
    {
      title: "HR Copilot",
      text: "Demostración documentada con datos sintéticos. Muestra controles de runtime sobre ese copiloto. No es evidencia de un despliegue Dual-Key, y el resultado de esa batería de pruebas no se transfiere a otros sistemas.",
    },
    {
      title: "Los patrones sectoriales",
      text: "Arquitecturas de referencia. Describen un diseño que hay que validar. No son despliegues de producción verificados.",
    },
  ],
  archTitle: "La arquitectura de control",
  archLabel: "Recorrido Dual-Key, de la propuesta a la ejecución controlada",
  archSteps: [
    { title: "La IA propone", text: "El modelo o el agente redacta una recomendación. No tiene autoridad de ejecución." },
    {
      title: "Aprobaciones independientes",
      text: "Cuando la política exige Dual-Key, una llave técnica y una llave de negocio aprueban la misma acción.",
    },
    { title: "Compuerta de autorización", text: "Un servicio independiente evalúa entradas de confianza y falla cerrado." },
    { title: "Ejecución controlada", text: "El punto de aplicación solo despacha una capacidad de un solo uso, ya revalidada." },
  ],
  archDetailTitle: "Qué hay detrás de la compuerta",
  archDetail: [
    {
      title: "Verificador",
      text: "Comprueba firmas, identidades y roles contra claves ligadas a la identidad y un registro de roles con autoridad. Comprobar un booleano en la política no ejecuta esa criptografía.",
    },
    {
      title: "PDP",
      text: "Evalúa la política con la entrada de confianza de la pasarela. No consume nonces de aprobación y no es el punto de ejecución.",
    },
    {
      title: "Coordinador de autorización",
      text: "Tras un allow del PDP, reserva ambos nonces de forma atómica y emite una capacidad de ejecución de un solo uso. La protección anti-repetición está aquí, no en una bandera de la política.",
    },
    {
      title: "PEP",
      text: "Recalcula el hash de la carga canónica real, vuelve a comprobar el plazo de ejecución y las demás condiciones, y redime esa capacidad de un solo uso.",
    },
  ],
  archNote:
    "La reversión y la recuperación son mecanismos aparte. Aprobar una acción no la hace reversible.",
  refTitle: "Arquitecturas de referencia",
  refBadge: "Arquitectura de referencia — la implementación y la validación se contratan aparte.",
  refNote:
    "Estas fichas son diseños que deben validarse en cada despliegue. No son despliegues de producción verificados y no certifican el cumplimiento.",
  refs: [
    {
      domain: "Tecnología operativa · IEC 61511 + NIS2",
      text: "Un cambio de consigna, un bypass o un mando remoto propuesto espera una llave técnica y una llave de operaciones. El patrón puede apoyar los requisitos aplicables de supervisión humana y control operativo. No demuestra conformidad con IEC 61511 ni con NIS2.",
    },
    {
      domain: "Solvencia · personas físicas",
      text: "Una recomendación sobre la solvencia de una persona física sigue siendo un borrador hasta que una llave de integridad del modelo y una llave de riesgo o legal ligan la misma carga. Las decisiones sobre empresas son otro caso. El patrón puede apoyar los requisitos aplicables de supervisión. DORA trata la resiliencia TIC; no certifica la equidad del crédito.",
    },
    {
      domain: "Suscripción de seguros",
      text: "Una recomendación de suscripción no se confirma hasta que una llave técnica y una llave de suscripción ligan la misma carga. Esto no sitúa el automóvil u otros ramos en la categoría de vida y salud del Reglamento de IA, y no certifica el cumplimiento.",
    },
  ],
  techTitle: "Detalle técnico",
  techLead: "El mismo material del diseño de control, disponible aquí sin salir de la página.",
  tableSummary: "Cómo especializa Runtime Assurance",
  tableCaption: "Dual-Key concreta Runtime Assurance para acciones de consecuencia. No lo sustituye.",
  colRuntime: "Runtime Assurance",
  colDualKey: "Especialización Dual-Key",
  colWhy: "Por qué",
  rows: [
    {
      runtime: "Inspección previa a la inferencia",
      specialization:
        "Modelo explicable local, opcional. Las contribuciones explican la predicción de ese modelo, no una causa. La destilación sigue exigiendo comprobar fidelidad, precisión y calibración. Hacia el auditor solo sale evidencia aprobada y minimizada.",
      why: "Dual-Key no obliga a sustituir todos los modelos. El agente no se convierte en la fuente de la entrada de la decisión.",
    },
    {
      runtime: "Razonamiento del agente",
      specialization:
        "Un agente auditor puede redactar una solicitud de revisión, también vía MCP, sin permiso de escritura. MCP no garantiza aislamiento ni anonimato.",
      why: "El agente puede asistir y redactar. No puede ejecutar, ni decidir que Dual-Key aplica.",
    },
    {
      runtime: "Vetos en línea y compuertas de umbral",
      specialization:
        "Dos llaves humanas solo cuando una política independiente lo exige: integridad técnica, y coherencia de negocio o legal.",
      why: "Un solo rol no puede autorizar esa acción. Las acciones más simples no pasan por ambas llaves.",
    },
    {
      runtime: "PDP → PEP",
      specialization:
        "Verificador, decisión de política, reserva atómica de nonces y después un PEP ligado al hash real de la carga, a la versión del modelo y a la versión de la política.",
      why: "Sin un allow válido y una capacidad de un solo uso, no se ejecuta nada.",
    },
  ],
  trustSummary: "Contrato de confianza",
  trust: [
    "Solo una pasarela autenticada construye la entrada del PDP. El agente no puede fijar decisiones de política, identidad, estado de la firma, tiempo ni hashes.",
    "Un verificador valida las firmas contra claves públicas ligadas a la identidad y un registro de roles con autoridad. La política lee el resultado; no ejecuta la criptografía.",
    "El PEP calcula el hash de la carga canónica real de ejecución. Nunca confía en un hash aportado por el agente.",
    "Las aprobaciones llevan issued_at y expires_at, un TTL máximo y un margen de desfase de reloj, todos en la misma unidad de tiempo. La carga tiene su propio plazo de ejecución, que el PEP vuelve a comprobar inmediatamente antes del envío.",
    "Tras un allow del PDP, un coordinador de autorización reserva de forma atómica ambos nonces y emite una capacidad de ejecución de un solo uso. La política no consume nonces.",
    "Si Dual-Key es obligatorio lo decide la política de confianza, no el agente.",
  ],
  policySummary: "Política PDP ilustrativa",
  policyLabel:
    "Rego v1 ilustrativo. No compilado ni probado con OPA. No lo uses como política de producción hasta superar opa check y una matriz de pruebas de autorización y denegación.",
  policyExternal:
    "Fuera de este fragmento: el verificador comprueba las firmas y el registro de roles; la pasarela construye la entrada, incluido si Dual-Key es obligatorio; el coordinador reserva ambos nonces de forma atómica tras el allow. Un booleano verdadero en la entrada no es prueba criptográfica, y una bandera de nonce dentro de la política no es protección anti-repetición.",
  copyPolicy: "Copiar política",
  copiedPolicy: "Política copiada",
  copyFailed: "No se ha podido copiar. Selecciona el texto de la política.",
  faqTitle: "Antes de pedir la revisión",
  faq: [
    {
      q: "¿Toda acción de IA necesita dos aprobaciones?",
      a: "No. Una política independiente decide cuándo aplica Dual-Key. Las acciones de menor consecuencia pueden usar una compuerta más simple.",
    },
    {
      q: "¿Hay que sustituir los modelos?",
      a: "No. Un modelo explicable es opcional. Dual-Key separa la recomendación de la autoridad para ejecutarla.",
    },
    {
      q: "¿Esto ya es un despliegue de producción?",
      a: "No. Las fichas sectoriales son arquitecturas de referencia. La implementación y la validación se contratan aparte.",
    },
    {
      q: "¿Esto certifica el cumplimiento?",
      a: "No. El Snapshot es apoyo de ingeniería de gobernanza técnica. No es asesoramiento jurídico, una evaluación de organismo notificado ni una certificación. El patrón puede apoyar los requisitos aplicables de supervisión.",
    },
    {
      q: "¿Qué ocurre después de la revisión inicial?",
      a: "En una semana recibes el Snapshot: el mapa de brechas, un memo ejecutivo, una matriz breve de riesgos y de 3 a 5 acciones priorizadas, más la sesión de devolución. Un Blueprint o una implementación es un encargo posterior y distinto.",
    },
  ],
  finalLead: "Empieza por el Snapshot de una semana. El diseño y la implementación quedan fuera hasta que los pidas.",
  finalCta: "Solicitar AI Governance Snapshot",
};

export function dualKeyCopy(locale: string): DualKeyCopy {
  return locale === "es" ? ES : EN;
}

export const DUAL_KEY_REGO = `package dualkey.illustrative

import rego.v1

# Illustrative only. Not compiled or tested with OPA.
# clock_skew_ns and max_ttl_ns are nanoseconds.
# data.role_registry[id] is a set of roles that identity may hold.
# The gateway, not the agent, sets input.policy.require_dual_key.

default dual_key_ok := false

dual_key_ok if {
  input.policy.require_dual_key == true
  count(input.approvals) == 2

  roles := {a.role | some a in input.approvals}
  roles == {"technical_owner", "business_owner"}

  approver_ids := {a.approver_id | some a in input.approvals}
  count(approver_ids) == 2

  every a in input.approvals {
    a.role in data.role_registry[a.approver_id]
    a.payload_hash == input.action.payload_hash
    a.model_version == input.action.model_version
    a.policy_version == input.policy.version

    issued_at := time.parse_rfc3339_ns(a.issued_at)
    expires_at := time.parse_rfc3339_ns(a.expires_at)
    deadline := time.parse_rfc3339_ns(input.action.execution_deadline)

    issued_at <= time.now_ns() + data.clock_skew_ns
    expires_at >= time.now_ns() - data.clock_skew_ns
    expires_at - issued_at <= data.max_ttl_ns
    deadline >= time.now_ns() - data.clock_skew_ns
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
    .replace(/\b(package|import|default|if|every|some|in)\b/g, '<span class="rego-kw">$1</span>');
}
