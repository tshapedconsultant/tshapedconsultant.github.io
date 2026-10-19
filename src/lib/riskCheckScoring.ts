/**
 * AI Runtime Risk Check — Transparent Scoring Engine & Question Bank
 *
 * Designed for TShaped Consultant (AI Governance Engineering).
 * Notice: This engine produces a preliminary technical signal for architecture and
 * runtime control discussions. It is NOT a formal certification, legal opinion,
 * or regulatory conformity assessment.
 */

export type Locale = "en" | "es";

export type QuestionId = "q1" | "q2" | "q3" | "q4" | "q5" | "q6";

export type AnswerMap = Partial<Record<QuestionId, string>>;

export type ExposureTierId =
  | "informational"
  | "operational"
  | "sensitive"
  | "critical_agentic";

export type ResultProfileId = "result_a" | "result_b" | "result_c" | "result_d";

export interface QuestionOption {
  value: string;
  label: {
    es: string;
    en: string;
  };
}

export interface RiskQuestion {
  id: QuestionId;
  step: number;
  prompt: {
    es: string;
    en: string;
  };
  options: QuestionOption[];
}

export interface DimensionScore {
  score: number;
  max: number;
  percentage: number;
  level: "low" | "moderate" | "high" | "critical";
  label: string;
  signals: string[];
}

export interface RiskProfileContent {
  id: ResultProfileId;
  title: string;
  text: string;
  recommendedControl: string;
}

export interface RiskAssessmentResult {
  tier: {
    id: ExposureTierId;
    title: string;
    explanation: string;
    severity: "low" | "moderate" | "high" | "critical";
  };
  dimensions: {
    exposure: DimensionScore;
    autonomy: DimensionScore;
    controlAndEvidence: DimensionScore;
  };
  primaryFinding: RiskProfileContent;
  secondaryFindings: RiskProfileContent[];
  systemTypeLabel: string;
}

export const RISK_QUESTIONS: RiskQuestion[] = [
  {
    id: "q1",
    step: 1,
    prompt: {
      es: "¿Qué estás evaluando?",
      en: "What are you evaluating?",
    },
    options: [
      {
        value: "chatbot",
        label: {
          es: "Chatbot o asistente conversacional",
          en: "Chatbot or conversational assistant",
        },
      },
      {
        value: "rag_internal",
        label: {
          es: "RAG sobre documentación interna",
          en: "RAG over internal documentation",
        },
      },
      {
        value: "copilot_tools",
        label: {
          es: "Copiloto conectado a herramientas",
          en: "Copilot connected to tools",
        },
      },
      {
        value: "agent_actions",
        label: {
          es: "Agente que puede ejecutar acciones",
          en: "Agent that can execute actions",
        },
      },
      {
        value: "unsure",
        label: {
          es: "No estoy seguro",
          en: "Not sure",
        },
      },
    ],
  },
  {
    id: "q2",
    step: 2,
    prompt: {
      es: "¿Qué puede hacer el sistema?",
      en: "What can the system do?",
    },
    options: [
      {
        value: "respond_only",
        label: {
          es: "Solo responder",
          en: "Only respond",
        },
      },
      {
        value: "draft_recommend",
        label: {
          es: "Crear borradores o recomendaciones",
          en: "Create drafts or recommendations",
        },
      },
      {
        value: "query_internal",
        label: {
          es: "Consultar sistemas internos",
          en: "Query internal systems",
        },
      },
      {
        value: "modify_execute",
        label: {
          es: "Modificar datos o lanzar acciones",
          en: "Modify data or trigger actions",
        },
      },
      {
        value: "unidentified",
        label: {
          es: "No lo tenemos completamente identificado",
          en: "Not fully identified yet",
        },
      },
    ],
  },
  {
    id: "q3",
    step: 3,
    prompt: {
      es: "¿Qué tipo de información puede consultar?",
      en: "What kind of information can it access?",
    },
    options: [
      {
        value: "public",
        label: {
          es: "Información pública",
          en: "Public information",
        },
      },
      {
        value: "internal_nonsensitive",
        label: {
          es: "Información interna no sensible",
          en: "Non-sensitive internal information",
        },
      },
      {
        value: "personal_financial",
        label: {
          es: "Datos personales o financieros",
          en: "Personal or financial data",
        },
      },
      {
        value: "credentials_strategic",
        label: {
          es: "Credenciales, secretos o información estratégica",
          en: "Credentials, secrets or strategic information",
        },
      },
      {
        value: "unsure",
        label: {
          es: "No estoy seguro",
          en: "Not sure",
        },
      },
    ],
  },
  {
    id: "q4",
    step: 4,
    prompt: {
      es: "¿Cómo se autorizan las herramientas?",
      en: "How are tools authorised?",
    },
    options: [
      {
        value: "model_decides",
        label: {
          es: "El modelo decide cuándo utilizarlas",
          en: "The model decides when to use them",
        },
      },
      {
        value: "allowlist",
        label: {
          es: "Existe una lista permitida",
          en: "An allowlist is in place",
        },
      },
      {
        value: "param_validation",
        label: {
          es: "Hay validación de parámetros y permisos",
          en: "Parameter and permission validation exists",
        },
      },
      {
        value: "hitl_sensitive",
        label: {
          es: "Se requiere aprobación humana para acciones sensibles",
          en: "Human approval is required for sensitive actions",
        },
      },
      {
        value: "no_clear_control",
        label: {
          es: "No existe un control claro",
          en: "No clear control exists",
        },
      },
    ],
  },
  {
    id: "q5",
    step: 5,
    prompt: {
      es: "¿Qué sucede si el sistema tiene dudas o falla?",
      en: "What happens when the system is uncertain or fails?",
    },
    options: [
      {
        value: "block_review",
        label: {
          es: "Se bloquea y pide revisión",
          en: "It blocks and requests human review",
        },
      },
      {
        value: "low_confidence",
        label: {
          es: "Devuelve una respuesta de baja confianza",
          en: "It returns a low-confidence response",
        },
      },
      {
        value: "log_continue",
        label: {
          es: "Se registra y continúa automáticamente",
          en: "It logs and continues automatically",
        },
      },
      {
        value: "undefined",
        label: {
          es: "No lo hemos definido",
          en: "We have not defined it",
        },
      },
      {
        value: "unknown",
        label: {
          es: "No lo sabemos",
          en: "We do not know",
        },
      },
    ],
  },
  {
    id: "q6",
    step: 6,
    prompt: {
      es: "¿Qué queda registrado?",
      en: "What is logged as evidence?",
    },
    options: [
      {
        value: "final_response",
        label: {
          es: "Solo la respuesta final",
          en: "Only the final response",
        },
      },
      {
        value: "prompt_response",
        label: {
          es: "Prompt y respuesta",
          en: "Prompt and response",
        },
      },
      {
        value: "tools_identity_result",
        label: {
          es: "Herramientas, identidad y resultado",
          en: "Tools, identity and outcome",
        },
      },
      {
        value: "full_decision_trace",
        label: {
          es: "Decisión completa con política, autorización y evidencia",
          en: "Full decision trace with policy, authorisation and evidence",
        },
      },
      {
        value: "unknown",
        label: {
          es: "No lo sabemos",
          en: "We do not know",
        },
      },
    ],
  },
];

const TIER_CONTENT: Record<
  Locale,
  Record<
    ExposureTierId,
    {
      title: string;
      explanation: string;
      severity: "low" | "moderate" | "high" | "critical";
    }
  >
> = {
  es: {
    informational: {
      title: "Exposición informativa",
      explanation:
        "El sistema opera principalmente como capa de respuesta o asistencia sobre información de bajo impacto, con capacidad limitada para alterar sistemas externos. Aun así, conviene fijar límites de recuperación, validación de salida y registro básico antes de ampliar su alcance.",
      severity: "low",
    },
    operational: {
      title: "Exposición operativa",
      explanation:
        "El sistema interactúa con documentación interna, recomendaciones operativas o herramientas conectadas. Un error de recuperación, una instrucción ambigua o la falta de definición del fallo seguro pueden trasladarse a procesos internos sin detección temprana.",
      severity: "moderate",
    },
    sensitive: {
      title: "Exposición sensible",
      explanation:
        "El sistema puede consultar datos personales, financieros o estratégicos, o bien invocar herramientas sin una cadena completa de autorización y trazabilidad. El riesgo principal es la recuperación no autorizada o la imposibilidad de reconstruir una decisión ante un incidente.",
      severity: "high",
    },
    critical_agentic: {
      title: "Exposición agéntica crítica",
      explanation:
        "El sistema combina capacidad de acción o acceso a información crítica con controles insuficientes de autorización independiente, fallo seguro o evidencia verificable. En este estado, una instrucción manipulada o un exceso de permisos puede convertirse directamente en una acción real no auditada.",
      severity: "critical",
    },
  },
  en: {
    informational: {
      title: "Informational exposure",
      explanation:
        "The system operates primarily as a conversational or drafting layer over lower-impact data, with bounded ability to alter external systems. Establishing retrieval boundaries, output validation and basic logging now prevents scope creep later.",
      severity: "low",
    },
    operational: {
      title: "Operational exposure",
      explanation:
        "The system interacts with internal knowledge, operational recommendations or connected tools. Retrieval gaps, ambiguous fallback behaviour or weak parameter checks can propagate into internal workflows without early detection.",
      severity: "moderate",
    },
    sensitive: {
      title: "Sensitive exposure",
      explanation:
        "The system can access personal, financial or strategic data, or invoke tools without a complete authorisation and evidence chain. The primary risk is unauthorised retrieval or the inability to reconstruct a decision after an incident.",
      severity: "high",
    },
    critical_agentic: {
      title: "Critical agentic exposure",
      explanation:
        "The system combines action capability or high-sensitivity access with insufficient independent authorisation, fail-safe stops or verifiable evidence. A manipulated prompt or excessive permission can translate directly into an unaudited real-world action.",
      severity: "critical",
    },
  },
};

export const RESULT_PROFILES: Record<Locale, Record<ResultProfileId, RiskProfileContent>> = {
  es: {
    result_a: {
      id: "result_a",
      title: "Riesgo detectado: autonomía sin compuerta independiente",
      text: "Tu sistema puede consultar o modificar sistemas externos, pero no has indicado una autorización humana o un control independiente antes de ejecutar acciones sensibles. Una instrucción manipulada, un error del modelo o un permiso excesivo podría convertirse en una acción real.",
      recommendedControl:
        "Allowlist de herramientas + autorización contextual + registro de identidad, política, decisión y resultado.",
    },
    result_b: {
      id: "result_b",
      title: "Riesgo detectado: datos internos sin control de retrieval",
      text: "Tu sistema utiliza información interna, pero no has confirmado autorización por usuario, documento o fila. El riesgo no está solo en el modelo: está en que el sistema pueda recuperar información que el usuario no debería ver.",
      recommendedControl:
        "Autorización de retrieval + clasificación de documentos + provenance + DLP de salida.",
    },
    result_c: {
      id: "result_c",
      title: "Riesgo detectado: decisiones no reconstruibles",
      text: "El sistema puede responder o actuar, pero no queda registrada la combinación completa de identidad, contexto, política, herramienta, autorización y resultado. Si ocurre un incidente, será difícil saber qué pasó y por qué.",
      recommendedControl:
        "Traza de decisión verificable y evidencia preparada para revisión técnica, riesgo y auditoría.",
    },
    result_d: {
      id: "result_d",
      title: "Riesgo preliminar: falta de definición del fallo seguro",
      text: "No está claro qué hace el sistema cuando no tiene suficiente información, detecta una instrucción sospechosa o no puede validar una acción. Esa ambigüedad puede convertir una incertidumbre técnica en una consecuencia operativa.",
      recommendedControl:
        "Fail-safe explícito: bloquear, escalar, registrar contexto y requerir revisión para acciones sensibles.",
    },
  },
  en: {
    result_a: {
      id: "result_a",
      title: "Detected risk: autonomy without an independent gate",
      text: "Your system can query or modify external systems, yet no human authorisation or independent runtime gate is enforced before sensitive actions execute. A manipulated instruction, model error or excessive permission could become a real-world action.",
      recommendedControl:
        "Tool allowlist + contextual authorisation + logging of identity, policy, decision and outcome.",
    },
    result_b: {
      id: "result_b",
      title: "Detected risk: internal data without retrieval control",
      text: "Your system accesses internal information, but per-user, per-document or row-level authorisation is not confirmed. The risk is not just in the model: it is that the system can retrieve information the user should not see.",
      recommendedControl:
        "Retrieval authorisation + document classification + provenance + output DLP.",
    },
    result_c: {
      id: "result_c",
      title: "Detected risk: non-reconstructible decisions",
      text: "The system can respond or act, but the complete combination of identity, context, policy, tool, authorisation and outcome is not recorded. If an incident occurs, reconstructing what happened and why will be difficult.",
      recommendedControl:
        "Verifiable decision trace and evidence prepared for technical review, risk and audit.",
    },
    result_d: {
      id: "result_d",
      title: "Preliminary risk: undefined fail-safe behaviour",
      text: "It is unclear what the system does when it lacks sufficient context, detects a suspicious instruction or cannot validate an action. That ambiguity can turn technical uncertainty into an operational consequence.",
      recommendedControl:
        "Explicit fail-safe: block, escalate, log context and require human review for sensitive actions.",
    },
  },
};

function levelFromPct(pct: number): "low" | "moderate" | "high" | "critical" {
  if (pct >= 75) return "critical";
  if (pct >= 50) return "high";
  if (pct >= 25) return "moderate";
  return "low";
}

function levelLabel(level: "low" | "moderate" | "high" | "critical", locale: Locale): string {
  const table = {
    es: {
      low: "Acotado",
      moderate: "Moderado",
      high: "Alto",
      critical: "Crítico",
    },
    en: {
      low: "Bounded",
      moderate: "Moderate",
      high: "High",
      critical: "Critical",
    },
  };
  return table[locale][level];
}

export function getSystemTypeLabel(answers: AnswerMap, locale: Locale = "es"): string {
  const q1Val = answers.q1;
  const q1 = RISK_QUESTIONS[0];
  const found = q1.options.find((opt) => opt.value === q1Val);
  if (found) return found.label[locale];
  return locale === "es" ? "Sistema de IA en evaluación" : "AI system under evaluation";
}

export function isAssessmentComplete(answers: AnswerMap): boolean {
  return RISK_QUESTIONS.every((q) => Boolean(answers[q.id]));
}

/**
 * Evaluates the 6 answers across three dimensions:
 * A. Exposure (data type, system access, sensitivity) — max 10
 * B. Autonomy (tool usage, data modification, action execution, approval gate) — max 12
 * C. Control & Evidence gap (allowlist, validation, HITL, fail-safe, audit trail) — max 12
 */
export function calculateRiskAssessment(
  answers: AnswerMap,
  locale: Locale = "es"
): RiskAssessmentResult {
  const q1 = answers.q1 || "unsure";
  const q2 = answers.q2 || "unidentified";
  const q3 = answers.q3 || "unsure";
  const q4 = answers.q4 || "no_clear_control";
  const q5 = answers.q5 || "unknown";
  const q6 = answers.q6 || "unknown";

  // Dimension A: Exposure (0..10)
  const q3Points: Record<string, number> = {
    public: 0,
    internal_nonsensitive: 2,
    personal_financial: 4,
    credentials_strategic: 5,
    unsure: 4,
  };
  const q1ExposurePoints: Record<string, number> = {
    chatbot: 0,
    rag_internal: 2,
    copilot_tools: 2,
    agent_actions: 3,
    unsure: 2,
  };
  const q2ExposurePoints: Record<string, number> = {
    respond_only: 0,
    draft_recommend: 1,
    query_internal: 2,
    modify_execute: 2,
    unidentified: 2,
  };

  const exposureScore = Math.min(
    10,
    (q3Points[q3] ?? 3) + (q1ExposurePoints[q1] ?? 2) + (q2ExposurePoints[q2] ?? 1)
  );
  const exposurePct = Math.round((exposureScore / 10) * 100);
  const exposureLevel = levelFromPct(exposurePct);

  // Dimension B: Autonomy (0..12)
  const q1AutonomyPoints: Record<string, number> = {
    chatbot: 0,
    rag_internal: 1,
    copilot_tools: 3,
    agent_actions: 4,
    unsure: 3,
  };
  const q2AutonomyPoints: Record<string, number> = {
    respond_only: 0,
    draft_recommend: 1,
    query_internal: 2,
    modify_execute: 4,
    unidentified: 3,
  };
  const q4AutonomyPoints: Record<string, number> = {
    hitl_sensitive: 0,
    param_validation: 1,
    allowlist: 2,
    model_decides: 4,
    no_clear_control: 4,
  };

  const autonomyScore = Math.min(
    12,
    (q1AutonomyPoints[q1] ?? 2) + (q2AutonomyPoints[q2] ?? 2) + (q4AutonomyPoints[q4] ?? 3)
  );
  const autonomyPct = Math.round((autonomyScore / 12) * 100);
  const autonomyLevel = levelFromPct(autonomyPct);

  // Dimension C: Control & Evidence Deficit (0..12, higher = greater deficit / risk)
  const q4DeficitPoints: Record<string, number> = {
    hitl_sensitive: 0,
    param_validation: 1,
    allowlist: 2,
    model_decides: 4,
    no_clear_control: 4,
  };
  const q5DeficitPoints: Record<string, number> = {
    block_review: 0,
    low_confidence: 1,
    log_continue: 3,
    undefined: 4,
    unknown: 4,
  };
  const q6DeficitPoints: Record<string, number> = {
    full_decision_trace: 0,
    tools_identity_result: 1,
    prompt_response: 3,
    final_response: 4,
    unknown: 4,
  };

  const controlGapScore = Math.min(
    12,
    (q4DeficitPoints[q4] ?? 3) + (q5DeficitPoints[q5] ?? 3) + (q6DeficitPoints[q6] ?? 3)
  );
  const controlGapPct = Math.round((controlGapScore / 12) * 100);
  const controlGapLevel = levelFromPct(controlGapPct);

  // Signals per dimension
  const exposureSignals: string[] = [];
  if (q3 === "credentials_strategic" || q3 === "personal_financial") {
    exposureSignals.push(
      locale === "es"
        ? "Acceso a datos sensibles, financieros o estratégicos"
        : "Access to sensitive, financial or strategic data"
    );
  } else if (q3 === "internal_nonsensitive" || q1 === "rag_internal") {
    exposureSignals.push(
      locale === "es"
        ? "Consulta de documentación o sistemas internos"
        : "Queries internal documentation or systems"
    );
  }
  if (q3 === "unsure") {
    exposureSignals.push(
      locale === "es"
        ? "Alcance de datos consultables no inventariado"
        : "Accessible data scope not fully inventoried"
    );
  }

  const autonomySignals: string[] = [];
  if (q1 === "agent_actions" || q2 === "modify_execute") {
    autonomySignals.push(
      locale === "es"
        ? "Capacidad de modificar datos o ejecutar acciones"
        : "Ability to modify data or trigger actions"
    );
  } else if (q1 === "copilot_tools" || q2 === "query_internal") {
    autonomySignals.push(
      locale === "es"
        ? "Conexión activa a herramientas o consultas internas"
        : "Active tool connection or internal system queries"
    );
  }
  if (q4 === "model_decides" || q4 === "no_clear_control") {
    autonomySignals.push(
      locale === "es"
        ? "Invocación de herramientas sin compuerta independiente"
        : "Tool invocation without an independent gate"
    );
  }

  const controlSignals: string[] = [];
  if (q5 === "undefined" || q5 === "unknown" || q5 === "log_continue") {
    controlSignals.push(
      locale === "es"
        ? "Sin bloqueo determinista ante duda o fallo"
        : "No deterministic block on uncertainty or failure"
    );
  }
  if (q6 === "final_response" || q6 === "prompt_response" || q6 === "unknown") {
    controlSignals.push(
      locale === "es"
        ? "Trazabilidad incompleta para reconstruir decisiones"
        : "Incomplete decision trace for incident reconstruction"
    );
  }

  // Overall classification into the 4 required tiers
  const totalScore = exposureScore + autonomyScore + controlGapScore; // max 34
  let tierId: ExposureTierId = "informational";

  const hasHighAction =
    q1 === "agent_actions" || q2 === "modify_execute" || q1 === "copilot_tools";
  const hasWeakToolGate =
    q4 === "model_decides" || q4 === "no_clear_control" || q4 === "allowlist";
  const hasSensitiveData =
    q3 === "personal_financial" || q3 === "credentials_strategic" || q3 === "unsure";

  if (
    totalScore >= 23 ||
    ((q1 === "agent_actions" || q2 === "modify_execute") && hasWeakToolGate) ||
    (q3 === "credentials_strategic" && controlGapScore >= 6)
  ) {
    tierId = "critical_agentic";
  } else if (
    totalScore >= 15 ||
    hasSensitiveData ||
    (hasHighAction && controlGapScore >= 5)
  ) {
    tierId = "sensitive";
  } else if (
    totalScore >= 7 ||
    q1 === "rag_internal" ||
    q2 === "query_internal" ||
    q2 === "draft_recommend" ||
    q3 === "internal_nonsensitive"
  ) {
    tierId = "operational";
  } else {
    tierId = "informational";
  }

  // Personalized result ranking (A, B, C, D)
  // Result A: Autonomy without independent gate
  const scoreA =
    (q1 === "agent_actions" || q2 === "modify_execute"
      ? 6
      : q1 === "copilot_tools" || q2 === "query_internal"
        ? 4
        : q1 === "unsure" || q2 === "unidentified"
          ? 3
          : 0) +
    (q4 === "model_decides" || q4 === "no_clear_control"
      ? 6
      : q4 === "allowlist"
        ? 3
        : q4 === "param_validation"
          ? 2
          : 0);

  // Result B: Internal data without retrieval control
  const scoreB =
    (q1 === "rag_internal" ? 5 : 0) +
    (q3 === "credentials_strategic"
      ? 6
      : q3 === "personal_financial"
        ? 5
        : q3 === "internal_nonsensitive"
          ? 4
          : q3 === "unsure"
            ? 3
            : 0) +
    (q2 === "query_internal" ? 2 : 0);

  // Result C: Non-reconstructible decisions
  const scoreC =
    (q6 === "final_response" || q6 === "unknown"
      ? 8
      : q6 === "prompt_response"
        ? 6
        : q6 === "tools_identity_result"
          ? 2
          : 0) +
    (q2 !== "respond_only" ? 2 : 1);

  // Result D: Lack of fail-safe definition
  const scoreD =
    (q5 === "undefined" || q5 === "unknown"
      ? 8
      : q5 === "log_continue"
        ? 6
        : q5 === "low_confidence"
          ? 3
          : 0) +
    (q1 === "unsure" || q2 === "unidentified" ? 2 : 1);

  const candidates: Array<{ id: ResultProfileId; score: number }> = [
    { id: "result_a", score: scoreA },
    { id: "result_b", score: scoreB },
    { id: "result_c", score: scoreC },
    { id: "result_d", score: scoreD },
  ];

  candidates.sort((a, b) => b.score - a.score);

  const profileTable = RESULT_PROFILES[locale];
  const primaryFinding = profileTable[candidates[0].id];
  const secondaryFindings = candidates
    .slice(1)
    .filter((c) => c.score >= 5)
    .slice(0, 2)
    .map((c) => profileTable[c.id]);

  return {
    tier: {
      id: tierId,
      ...TIER_CONTENT[locale][tierId],
    },
    dimensions: {
      exposure: {
        score: exposureScore,
        max: 10,
        percentage: exposurePct,
        level: exposureLevel,
        label: levelLabel(exposureLevel, locale),
        signals: exposureSignals,
      },
      autonomy: {
        score: autonomyScore,
        max: 12,
        percentage: autonomyPct,
        level: autonomyLevel,
        label: levelLabel(autonomyLevel, locale),
        signals: autonomySignals,
      },
      controlAndEvidence: {
        score: controlGapScore,
        max: 12,
        percentage: controlGapPct,
        level: controlGapLevel,
        label: levelLabel(controlGapLevel, locale),
        signals: controlSignals,
      },
    },
    primaryFinding,
    secondaryFindings,
    systemTypeLabel: getSystemTypeLabel(answers, locale),
  };
}
