import {
  CASE_STUDY_PDF,
  COVER,
  COVER_AVIF,
  COVER_WEBP,
  EXECUTIVE_BRIEF_PDF,
  LINKS,
  RESUME_MATCHING_PDF,
  WHITEPAPER_PDF,
  WHITEPAPER_PDF_ES,
} from "./content.js";
import { pulseInsights } from "./data/pulseLibrary.ts";

export {
  CASE_STUDY_PDF,
  COVER,
  COVER_AVIF,
  COVER_WEBP,
  EXECUTIVE_BRIEF_PDF,
  LINKS,
  RESUME_MATCHING_PDF,
  WHITEPAPER_PDF,
  WHITEPAPER_PDF_ES,
};

export const BRAND_DEFINITION =
  "Ingeniería de Gobernanza de IA: diseño e implantación de controles ejecutables, límites de runtime y evidencia verificable.";

export const LOCATION = "Con sede en Madrid · Trabajo en remoto en EMEA";

export const LOCATION_HERO = "Madrid · EMEA en remoto";

export const ABOUT_INTRO =
  "Arquitecto de IA responsable. Consultor estratégico independiente en IA desde junio de 2021. Antes, Cloud Implementation Specialist (Avaya Cloud Office en Concentrix). Trabajo en la intersección de ingeniería, sistemas de IA, gobernanza y regulación — de la arquitectura al despliegue: en lugar de quedarme en marcos teóricos, construyo planos de control deterministas y demostraciones ejecutables que traducen OWASP LLM Top 10 v2025, OWASP Agentic Top 10 2026, EU AI Act e ISO/IEC 42001 a código auditable.";

export const ABOUT_SITE =
  "Este sitio lo he diseñado y construido yo, con programación asistida por IA. Trato la accesibilidad, la privacidad, el rendimiento y la auditabilidad como requisitos de primer orden.";

export const HERO = {
  kicker: "Andrés Lage Freire · TShaped Consultant · Ingeniería de Gobernanza de IA",
  headline:
    "Gobernanza ejecutable para sistemas de IA que pueden acceder, decidir y actuar.",
  tagline: "Lleva tus sistemas de IA a producción con controles verificables",
  value:
    "Diseño controles técnicos, límites de runtime y evidencia verificable para RAG, copilotos, agentes y workflows de alto impacto.",
  assets:
    "Ayudo a equipos de IA, tecnología y riesgo a convertir obligaciones regulatorias y riesgos de AI runtime risk en gobernanza de IA en tiempo de ejecución mediante controles de acceso, autoridad y evidencia.",
  pills: ["EU AI Act", "Agentic AI Governance", "Runtime Assurance"],
  qualify:
    "Para CISOs, CTOs, responsables de riesgo y equipos que llevan IA de piloto a producción.",
  scope:
    "Diagnóstico en 90 segundos, revisión técnica acotada y arquitectura de control en runtime.",
  principle: "La gobernanza no se documenta. Se ejecuta. Los modelos probabilísticos requieren gobernanza determinista.",
  executiveSummary: [
    {
      question: "1. ¿Qué problema concreto resuelvo?",
      answer:
        "Evito que sistemas RAG, copilotos y agentes pasen a producción con acceso excesivo a datos, capacidad de ejecutar acciones sin compuerta independiente o sin trazas verificables para auditoría.",
    },
    {
      question: "2. ¿Qué recibirás y cuánto tardarás?",
      answer:
        "En 90 segundos obtienes un diagnóstico preliminar (AI Runtime Risk Check). En 1 semana recibes el AI Governance Snapshot (Desde €2.495): mapa técnico de brechas y de 3 a 5 controles prioritarios.",
    },
    {
      question: "3. ¿Qué tienes que hacer para empezar?",
      answer:
        "Completar el AI Runtime Risk Check de 6 preguntas o solicitar directamente una llamada de alcance de 30 minutos sobre tu sistema o arquitectura.",
    },
  ],
};

export const PATH_SELECTOR = {
  title: "¿Qué te trae aquí?",
  subtitle:
    "Quien detecta el problema → quien valida la solución → quien aprueba el presupuesto → quien puede derivar o co-entregar el proyecto.",
  threeEntries: [
    {
      id: "direct",
      title: "Ruta directa",
      role: "Para CTOs, CISOs, Heads of AI, Risk y responsables de tecnología",
      cta: "Comprobar el riesgo de mi sistema",
      steps: [
        "AI Runtime Risk Check",
        "AI Governance Snapshot",
        "Blueprint",
        "Runtime Assurance",
      ],
      target: "risk-check",
    },
    {
      id: "technical",
      title: "Ruta técnica interna",
      role: "Para arquitectos, ingenieros y Red Team Leads",
      cta: "Ver la demo técnica",
      steps: [
        "HR Copilot",
        "Demo de controles",
        "Validación técnica",
        "Recomendación interna al decisor",
      ],
      target: "hr-copilot-case",
    },
    {
      id: "partner",
      title: "Ruta de partners",
      role: "Para firmas legales, Big Four y consultoras",
      cta: "Explorar co-delivery",
      steps: [
        "Del PDF Legal al Código",
        "Workshop o Hackathon",
        "Co-delivery",
        "Proyecto del cliente",
      ],
      target: "partners",
    },
  ],
  options: [
    {
      id: "evaluate",
      label: "Comprobar el riesgo de mi sistema",
      sub: "AI Runtime Risk Check → AI Governance Snapshot",
      target: "risk-check",
      intent: "snapshot",
    },
    {
      id: "train",
      label: "Quiero formar a mi equipo",
      sub: "Del PDF Legal al Código → Workshop o Hackathon In-Company",
      target: "enablement",
      intent: "workshop",
    },
    {
      id: "partner",
      label: "Busco un partner técnico",
      sub: "HR Copilot → Demo de controles → Validación técnica",
      target: "hr-copilot-case",
      intent: "snapshot",
    },
    {
      id: "codelivery",
      label: "Quiero explorar co-delivery",
      sub: "Derivación, co-delivery o white-label para el proyecto del cliente",
      target: "partners",
      intent: "partners",
    },
  ],
};

export const PAIN_SECTION = {
  kicker: "01 · El problema en ejecución",
  title:
    "Tu sistema puede estar gobernado sobre el papel y seguir siendo vulnerable en ejecución.",
  lead:
    "Una política de IA no impide por sí sola que un agente consulte una herramienta indebida, recupere información no autorizada o ejecute una acción que nadie pueda reconstruir después.",
  text:
    "Una política de IA no impide por sí sola que un agente consulte una herramienta indebida, recupere información no autorizada o ejecute una acción que nadie pueda reconstruir después.",
  cards: [
    {
      id: "access",
      icon: "shield",
      title: "Acceso",
      subtitle: "¿Qué datos y herramientas puede utilizar?",
      question: "¿Qué datos y herramientas puede utilizar?",
      text:
        "Sin autorización por usuario, documento o fila, el sistema puede recuperar o exponer información que el usuario no debería ver.",
      detail:
        "Sin autorización por usuario, documento o fila, el sistema puede recuperar o exponer información que el usuario no debería ver.",
    },
    {
      id: "authority",
      icon: "gears",
      title: "Autoridad",
      subtitle: "¿Qué puede decidir o ejecutar sin aprobación?",
      question: "¿Qué puede decidir o ejecutar sin aprobación?",
      text:
        "Si el modelo decide cuándo invocar herramientas o modificar sistemas, una instrucción manipulada puede convertirse en una acción real.",
      detail:
        "Si el modelo decide cuándo invocar herramientas o modificar sistemas, una instrucción manipulada puede convertirse en una acción real.",
    },
    {
      id: "evidence",
      icon: "clipboard",
      title: "Evidencia",
      subtitle: "¿Puedes demostrar qué ocurrió y por qué?",
      question: "¿Puedes demostrar qué ocurrió y por qué?",
      text:
        "Guardar solo el prompt y la respuesta no basta para reconstruir la identidad, la política aplicada, la herramienta y el resultado ante un incidente.",
      detail:
        "Guardar solo el prompt y la respuesta no basta para reconstruir la identidad, la política aplicada, la herramienta y el resultado ante un incidente.",
    },
  ],
  cta: "Comprobar el riesgo de mi sistema",
};

export const FEATURED_HR_COPILOT = {
  kicker: "Demostración ejecutable · Caso destacado",
  badge: "HR Copilot — Technical Governance Implementation (TGI v1)",
  title: "Mismo modelo. Mismas peticiones. Dos posturas de riesgo.",
  subtitle:
    "Una demostración ejecutable de cómo un plano de control transforma un copiloto vulnerable en un sistema limitado, supervisado y auditable.",
  acts: [
    {
      id: "act-1",
      label: "Acto I · Sin gobernanza",
      title: "El modelo decide y encadena herramientas sin compuerta independiente",
      text: "Ante las mismas peticiones adversarias sobre datos sintéticos de RR. HH., una sola consulta encadena herramientas sin autorización y expone retribución ejecutiva, datos personales, planes de M&A y credenciales internas en menos de 60 segundos.",
      tone: "risk",
    },
    {
      id: "act-2",
      label: "Acto II · Con TGI v1",
      title: "Plano de control determinista alrededor del mismo modelo",
      text: "Sin cambiar de modelo, la capa TGI v1 intercepta cada paso con 8 controles deterministas: validación de entrada, allowlist de herramientas, autorización por fila, aprobación humana (HITL), DLP de salida y registro verificable.",
      tone: "governed",
    },
  ],
  controlsTitle: "8 controles deterministas en runtime",
  controls: [
    "1. Aislamiento estructural del prompt",
    "2. Clasificación determinista de entrada",
    "3. Allowlist cerrada de herramientas",
    "4. Autorización contextual por fila e identidad",
    "5. Compuerta de aprobación humana (HITL)",
    "6. Prevención de fuga de datos (DLP) en salida",
    "7. Higiene y bloqueo de secretos/credenciales",
    "8. Traza de decisión estructurada para SIEM y auditoría",
  ],
  resultClaim: "La demostración no produjo hallazgos sensibles en el conjunto de pruebas utilizado.",
  scopeNote:
    "Resultado acotado exclusivamente al conjunto de pruebas sintéticas de esta demostración. Ningún control elimina todo el riesgo ni sustituye las pruebas en el entorno real del cliente.",
  video: "/agent-fail-version-1.mp4",
  poster: "/agent-fail-version-1-poster.jpg",
  captions: "/agent-fail-version-1.es.vtt",
  videoCaption:
    "Vídeo demostrativo en castellano: Acto I (sin gobernanza) frente a Acto II (con los 8 controles deterministas de TGI v1).",
  videoCta: "Ver vídeo de la demostración",
  docsCta: "Ver documentación técnica y mapeo",
  docsHref: "/es/governance/eu-ai-act-mapping",
};

export const ENABLEMENT_PROGRAMS = {
  kicker: "Puerta de entrada In-Company · Del PDF Legal al Código",
  title: "Cómo traducir el EU AI Act a tu pipeline de ingeniería",
  lead:
    "No imparto charlas de concienciación genérica para toda la plantilla. Diseño sesiones técnicas de trabajo para CTOs, Lead Developers, Chief Risk Officers y Product Managers que necesitan convertir requisitos regulatorios en controles deterministas, pruebas unitarias y arquitectura de runtime.",
  audienceTag: "Para CTOs, Lead Developers, Chief Risk Officers y Product Managers",
  formats: [
    {
      id: "briefing",
      intent: "briefing",
      badge: "Formato A · Dirección y Comité Técnico",
      duration: "45 min · Webinar cerrado o desayuno de trabajo",
      price: "Bajo solicitud / Cortesía para equipos cualificados",
      title: "Executive Briefing: Los 3 puntos ciegos técnicos que el EU AI Act expone en tu SaaS",
      hook:
        "Por qué un informe jurídico no basta cuando el modelo es probabilístico y por qué la normativa exige control determinista sobre agentes y copilotos en ejecución.",
      topics: [
        "Dónde chocan la política escrita y el comportamiento real en runtime",
        "Por qué los guardrails del prompt no sustituyen una arquitectura de control",
        "Qué evidencia técnica pedirá una auditoría o un cliente enterprise",
      ],
      cta: "Solicitar Executive Briefing",
    },
    {
      id: "workshop",
      intent: "workshop",
      badge: "Formato B · Producto rompehielos In-Company",
      duration: "3 a 4 horas · Taller privado para ingeniería",
      price: "€1.200 – €1.800 (tarifa plana por empresa)",
      title: "Workshop In-Company: AI Governance for Engineers — De la regulación a las pruebas unitarias",
      hook:
        "Un ticket ágil que cualquier CTO puede aprobar desde su presupuesto trimestral o de formación sin fricción de compras corporativas.",
      topics: [
        "Mapeo práctico de artículos del EU AI Act a requisitos de software verificables",
        "Arquitecturas agénticas seguras y separación de poderes en runtime",
        "Implementación de controles deterministas, allowlists y compuertas en código",
        "Últimos 30 min: Gap Analysis en vivo + entrega de Roadmap de Implementación a 6 meses",
      ],
      cta: "Reservar Workshop In-Company",
    },
    {
      id: "hackathon",
      intent: "hackathon",
      badge: "Formato C · Trabajo directo sobre tu sistema",
      duration: "Jornada completa (8 horas) · Teoría + arquitectura real",
      price: "€2.500 – €3.000",
      title: "Hackathon de Auditoría Conjunta sobre tu propio producto",
      hook:
        "Empezamos a resolver brechas reales desde el día 1 trabajando directamente con tu equipo técnico sobre vuestro repositorio y arquitectura.",
      topics: [
        "Mañana (4 h): fundamentos de mitigación técnica, acceso, autoridad y trazabilidad",
        "Tarde (4 h): inspección conjunta de vuestro RAG, copiloto o agente frente al EU AI Act y OWASP",
        "Entregable: mapa visual de vulnerabilidades detectadas y hoja de ruta de controles prioritarios",
      ],
      cta: "Solicitar Hackathon de Auditoría",
    },
  ],
  bridge: {
    kicker: "Del taller a la ejecución en producción",
    title: "Incluye Gap Analysis en los últimos 30 minutos y hoja de ruta",
    text:
      "Ninguna sesión termina en teoría. Cerramos contrastando vuestra arquitectura real con los controles requeridos y entregando un Roadmap de Implementación claro. El equipo puede ejecutarlo por su cuenta o incorporarme en sus sprints durante las siguientes 4 semanas como Arquitecto Fraccional para dejar los controles, compuertas y el framework de testing en producción.",
  },
};

export const AUTHORITY_ARCHITECTURE = {
  kicker: "Autoridad y trayectoria verificable",
  title: "De la señal de riesgo a la arquitectura auditable",
  lead: "Ingeniería, regulación y pruebas ejecutables organizadas en cuatro niveles claros:",
  blocks: [
    {
      step: "01",
      title: "Qué problema resuelvo",
      summary:
        "Sistemas RAG, copilotos y agentes que pasan a producción con políticas escritas pero sin compuertas técnicas sobre el acceso a datos, el uso de herramientas, el fallo seguro y la evidencia.",
      items: [
        "Acceso excesivo en retrieval o bases de conocimiento internas",
        "Autonomía agéntica sin validación independiente ni aprobación humana",
        "Decisiones imposibles de reconstruir ante auditoría o incidente",
      ],
    },
    {
      step: "02",
      title: "Qué construyo",
      summary:
        "Planos de control deterministas, validadores de seguridad y arquitecturas de referencia que acotan sistemas probabilísticos en tiempo de ejecución.",
      items: [
        "HR Copilot TGI v1 — 8 controles deterministas sobre agentes",
        "RAG Security Validator — compuerta contra inyección y contrabando en retrieval",
        "Enterprise AI Risk Console — triaje determinista y evidencia encadenada con SHA-256",
        "DGOM™ y Dédalo™ — modelo operativo y arquitectura constitucional",
      ],
    },
    {
      step: "03",
      title: "Qué demuestra mi trabajo",
      summary:
        "Reconocimiento externo, análisis estratégicos de banca y marcos operativos publicados en abierto.",
      items: [
        "Premio al Emprendimiento de la Fundación Repsol (2018)",
        "Caso de estudio: Estrategia de plataforma e IA de BBVA (análisis independiente)",
        "Responsible AI Framework para selección de talento y emparejamiento CV-puesto",
        "Whitepaper: Los modelos probabilísticos requieren gobernanza determinista",
      ],
    },
    {
      step: "04",
      title: "Qué puede contratar el cliente",
      summary:
        "Servicios acotados, con entregables técnicos claros y orientación transparente de alcance y precio.",
      items: [
        "AI Runtime Risk Check — Diagnóstico preliminar en 90 segundos (gratuito)",
        "AI Governance Snapshot — Revisión técnica acotada en 1 semana (Desde €2.495)",
        "Blueprint & Runtime Assurance — Arquitectura e implementación de controles (Desde €6.500 / según alcance)",
      ],
    },
  ],
};

export const BEST_FIT =
  "Mejor encaje: casos de IA regulados y de alta responsabilidad en servicios financieros, seguros, operaciones críticas, sistemas de conocimiento empresarial y flujos agénticos.";

export const HERO_FOR = {
  audience:
    "Para CISOs, CTOs, responsables de riesgo y equipos que llevan IA de piloto a producción.",
  problems:
    "Trabajo típico: seguridad agéntica, controles para RAG y copilotos, preparación técnica para EU AI Act e ISO/IEC 42001.",
};

export const CTA = {
  primary: "Comprobar el riesgo de mi sistema",
  secondary: "Ver la demo técnica",
  persistentPrimary: "Comprobar mi riesgo",
  persistentSecondary: "Solicitar diagnóstico",
  note: "Para un sistema RAG, copiloto, agente o workflow de alto impacto · Alcance y precio confirmados tras una llamada de 30 minutos.",
};

export const DIAGNOSTIC_FORM = {
  kicker: "Consulta comercial y diagnóstico técnico",
  title: "Solicitar diagnóstico o revisión técnica",
  lead: "Cuéntame qué sistema estás desplegando o evaluando y qué brecha de acceso, autoridad o evidencia necesitas resolver.",
  submit: "Solicitar diagnóstico",
  sending: "Enviando…",
  success: "Gracias. Responderé con el siguiente paso recomendado para tu sistema.",
  error: "No se ha podido enviar la solicitud en este momento. Inténtalo de nuevo o utiliza el enlace de correo directo.",
  errorFallback: "Abrir correo con estos datos",
  notConfigured:
    "El formulario directo no está disponible en este entorno. Puedes escribirme por LinkedIn o correo.",
  privacy:
    "Sin lista de correo comercial. Tus datos se tratan únicamente para evaluar y responder a esta solicitud.",
  privacyLinkText: "Ver política de privacidad y retención",
  systemTypeLabel: "Tipo de sistema",
  systemTypes: [
    { value: "", label: "Selecciona el tipo de sistema" },
    { value: "Chatbot o asistente conversacional", label: "Chatbot o asistente conversacional" },
    { value: "RAG sobre documentación interna", label: "RAG sobre documentación interna" },
    { value: "Copiloto conectado a herramientas", label: "Copiloto conectado a herramientas" },
    { value: "Agente que puede ejecutar acciones", label: "Agente que puede ejecutar acciones" },
    { value: "Varios sistemas / Programa de IA", label: "Varios sistemas / Programa de IA" },
    { value: "Firma consultora / Big 4 / Despacho (Co-delivery o White-Label)", label: "Firma consultora / Big 4 / Despacho (Co-delivery o White-Label)" },
  ],
  capabilityLabel: "¿Qué puede hacer el sistema?",
  capabilities: [
    { value: "", label: "Selecciona la capacidad principal" },
    { value: "Solo responder o resumir", label: "Solo responder o resumir" },
    { value: "Crear borradores o recomendaciones", label: "Crear borradores o recomendaciones" },
    { value: "Consultar sistemas o datos internos", label: "Consultar sistemas o datos internos" },
    { value: "Modificar datos o ejecutar acciones", label: "Modificar datos o ejecutar acciones" },
    { value: "Aún en definición", label: "Aún en definición" },
  ],
  concernLabel: "¿Qué te preocupa?",
  governPlaceholder:
    "Por ejemplo: permisos de retrieval en RAG, uso de herramientas sin aprobación humana, falta de trazabilidad para auditoría o paso de piloto a producción.",
  governHint: "Basta un resumen breve. No incluyas secretos, credenciales ni datos confidenciales de clientes.",
  consentLabel:
    "Acepto el tratamiento de mis datos profesionales para recibir una respuesta relacionada con esta solicitud.",
  partnerNeedPlaceholder:
    "Describa la capa técnica necesaria — controles, evidencia, compuertas o un PoV acotado. No nombre clientes ni asuntos.",
  discussPlaceholder: "Qué desea tratar. No incluya nombres confidenciales de clientes ni de asuntos.",
  callerLabel: "¿Quién contacta?",
  callers: [
    { value: "", label: "Seleccione una opción" },
    { value: "organisation", label: "Organización que busca apoyo de gobernanza de IA" },
    { value: "legal", label: "Un socio jurídico o de cumplimiento" },
    { value: "consulting", label: "Un socio de consultoría o de entrega" },
    { value: "peer", label: "Un investigador o un par" },
    { value: "other", label: "Otro" },
  ],
  intentLabel: "Servicio o taller de interés",
  intents: [
    { value: "snapshot", label: "AI Governance Snapshot (Desde €2.495)" },
    { value: "workshop", label: "Workshop In-Company «Del PDF Legal al Código» (€1.200–€1.800)" },
    { value: "hackathon", label: "Hackathon de Auditoría Conjunta — 1 jornada (€2.500–€3.000)" },
    { value: "briefing", label: "Executive Briefing (45 min · Dirección / CTO / CRO)" },
    { value: "blueprint", label: "Blueprint & Runtime Assurance (Desde €6.500)" },
    { value: "fractional", label: "Implementación / Arquitecto Fraccional en sprints" },
    { value: "partners", label: "Alianza / Co-entrega técnica (Consultoras, Big 4 y Despachos)" },
    { value: "other", label: "Consulta general" },
  ],
  roleLabel: "Cargo",
  practiceLabel: "Área de práctica",
  deliveryLabel: "Modelo de entrega de interés",
  ndaLabel: "¿Puede ser necesario un NDA?",
  deliveries: [
    { value: "", label: "Seleccione un modelo de entrega" },
    { value: "Referral", label: "Derivación" },
    { value: "Co-delivery", label: "Co-entrega" },
    { value: "White-label support", label: "Soporte white-label" },
    { value: "Not sure yet", label: "Aún no está claro" },
  ],
  ndaOptions: [
    { value: "", label: "Seleccione si lo conoce" },
    { value: "Yes", label: "Sí" },
    { value: "No", label: "No" },
    { value: "Not sure yet", label: "Aún no está claro" },
  ],
  stageLabel: "Etapa actual y alcance probable",
  stages: [
    { value: "", label: "Seleccione etapa y alcance" },
    { value: "Exploring AI governance needs.", label: "Explorando necesidades de gobernanza de IA." },
    { value: "One AI use case.", label: "Un caso de uso de IA." },
    { value: "Multiple use cases / programme.", label: "Varios casos de uso / programa." },
    { value: "Enterprise-wide operating model.", label: "Modelo operativo a escala empresarial." },
  ],
};

export const ENGAGEMENT = {
  title: "Cómo trabajamos paso a paso",
  lines: [
    {
      label: "1. Diagnosticar",
      text: "AI Runtime Risk Check: detectar exposición, autonomía y ausencia de evidencia en 90 segundos.",
      icon: "clipboard",
    },
    {
      label: "2. Evaluar",
      text: "AI Governance Snapshot: revisión técnica acotada de arquitectura, riesgos y acciones prioritarias.",
      icon: "doc",
    },
    {
      label: "3. Diseñar e implementar",
      text: "Blueprint & Runtime Assurance: diseño e implantación de controles, gates, supervisión y evidencia.",
      icon: "gears",
    },
  ],
};

export const ARTICLE = {
  hash: "agentic-ai-montesquieu",
  kicker: "Artículo",
  title: "IA agéntica y Montesquieu: por qué los sistemas autónomos necesitan separación de poderes",
  standfirst:
    "La mayoría de los incidentes críticos de IA ocurren ya en runtime. Sin un poder independiente capaz de detener el sistema, la arquitectura agéntica concentra el control en el propio modelo.",
  meta: "Andrés Lage Freire · 15 de julio de 2026",
  excerpt:
    "Los sistemas agénticos que razonan, deciden, ejecutan y se autoevalúan concentran el poder en el modelo. La separación de poderes — aplicada como Runtime Checks & Balances — es la condición del art. 14 del EU AI Act y de DORA.",
};

export const HYBRID_ARTICLE = {
  hash: "hybrid-profiles",
  kicker: "Artículo",
  title: "Por qué los perfiles híbridos pueden tener ventaja en la era de los agentes de IA",
  standfirst: "La IA abarata la aplicación. Los fundamentos pueden volverse más valiosos.",
  meta: "Andrés Lage Freire · 7 de septiembre de 2026",
  excerpt:
    "A medida que los agentes de IA abaratan la ejecución especializada, la ventaja puede desplazarse hacia quienes conectan capacidades de especialista, entienden los sistemas de base y ejercen juicio entre dominios.",
  figure: "/hybrid-profiles-ai-agents.jpg",
  figureWebp: "/hybrid-profiles-ai-agents.webp",
  figureAvif: "/hybrid-profiles-ai-agents.avif",
  figureAlt:
    "Infografía de un profesional híbrido en un puente entre la profundidad de especialista — ingeniería, ciencia de datos, seguridad, negocio y regulación — y el apalancamiento de agentes de IA: investigar, programar, analizar, planificar, probar, ejecutar, monitorizar y documentar. Etiquetas: entender, conectar, evaluar, integrar, dirigir.",
  figureCaption:
    "Los especialistas aportan profundidad. Los agentes de IA aportan apalancamiento. Los profesionales híbridos los conectan.",
};

export const CASE_STUDIES = {
  lede: "Dos lecturas para CTOs y líderes de Riesgo: cómo se asienta la gobernanza en un banco en producción, y cómo un modelo de selección se mantiene justo desde la norma hasta la reclamación.",
  items: [
    {
      id: "bbva-platform-ai",
      kicker: "Caso · 2025",
      client: "BBVA",
      sector: "Banca global",
      title: "Estrategia de plataforma e IA",
      role: "Análisis estratégico independiente",
      problem:
        "Un incumbente global no puede servir a decenas de millones de clientes con salud financiera hiperpersonalizada — ni llevar la IA generativa a la plantilla — si el núcleo digital, la plataforma de datos y el parque de modelos no están unificados. Sin inventario de modelos, controles de sesgo y alineación con el EU AI Act / BCBS 239, escalar gasta el único activo que la banca no puede reemplazar: la confianza.",
      approach: [
        "Tratar la app móvil como plataforma primaria: una arquitectura digital unificada (Horizon) en geografías clave, con la plataforma global de datos ADA sobre AWS alimentando modelos en tiempo real.",
        "Conservar la propiedad intelectual central en una AI Factory interna para personalización y riesgo, y asociarse para infraestructura y herramientas de frontera — AWS, OpenAI ChatGPT Enterprise y Google Cloud Gemini.",
        "Pasar de pantallas de producto genéricas a un AI Financial Coach: categorizar transacciones, prever saldos y recomendar acciones concretas en lugar de consejos genéricos.",
        "Incorporar la IA generativa a los flujos de los empleados para acelerar trabajo jurídico, redacción y consultas complejas, y reasignar el tiempo humano al asesoramiento de alto contacto y a la gobernanza de modelos.",
      ],
      outcomes: [
        "78,1 millones de clientes activos, un 79 % de penetración móvil y un 61 % de las ventas unitarias por canales digitales (marzo de 2025).",
        "Más de 11.000 empleados en ChatGPT Enterprise, con un ahorro medio de dos horas a la semana.",
        "Los ingresos de Corporate & Investment Banking subieron un 36 % en el primer trimestre de 2025; 1,8 millones de cuentas 100 % digitales en México; el tiempo de respuesta móvil se redujo por un factor de seis.",
      ],
      governance:
        "La gobernanza se trata como ventaja competitiva: un inventario centralizado de modelos de IA, trabajo continuo de reducción de sesgo y alineación proactiva con el EU AI Act — de modo que la innovación solo acelere si la supervisión mantiene el ritmo.",
      note: "Análisis estratégico independiente de Andrés Lage Freire; no está redactado ni avalado por BBVA. Cifras según el análisis (marzo de 2025 y 1T 2025).",
      pdf: CASE_STUDY_PDF,
    },
    {
      id: "resume-job-matching",
      kicker: "Marco · 2026",
      client: "Currículum y puesto",
      sector: "Selección de talento",
      title: "Marco de IA responsable",
      role: "Diseño operativo · Andrés Lage Freire",
      problem:
        "¿Puede la IA decidir a quién se contrata sin heredar nuestros sesgos? Este marco de IA responsable para emparejar currículum y puesto dice que sí, pero solo si las personas no salen del proceso. Cubre el ciclo de vida completo: reglas justas de entrada, auditoría del sesgo antes del entrenamiento, modelos explicables y controles de equidad continuos.",
      approach: [
        "Acordar con RR. HH., los responsables de contratación y Diversidad e Inclusión qué datos son propios del puesto, antes de que el modelo vea un currículum. Edad, género y otros factores personales quedan fuera.",
        "Auditar el histórico de contratación y escribir el plan de corrección antes de entrenar, para que el modelo no aprenda el registro sesgado.",
        "Asignar un RACI a cada decisión que toca el sistema. La persona candidata recibe un aviso del artículo 13 del RGPD: que se usa IA, qué criterios se aplican y cómo reclamar.",
        "No pasar a las pruebas finales hasta que la calidad de los datos y las métricas de equidad superen los umbrales internos. La puntuación sale con una explicación clara.",
        "Hacer red teaming del emparejador. Rellenar el currículum de palabras clave ajenas al puesto no debe cambiar una decisión justa.",
        "Dar «encaje alto» o «rechazo alto» solo con confianza alta. Los casos ambiguos van a revisión humana obligatoria. Un rechazo alto exige al responsable de contratación y a Diversidad e Inclusión.",
        "Registrar cada anulación humana con un motivo. Vigilar la equidad, los cambios en cómo se escriben los currículums, el tiempo de cobertura y las candidaturas que una persona mantuvo. Un consejo de ética de IA puede parar el sistema.",
      ],
      outcomes: [
        "Revisión humana obligatoria cuando la IA no está segura.",
        "Doble aprobación antes de cualquier rechazo.",
        "Un canal real de reclamación.",
        "La IA aporta velocidad. La equidad sigue siendo humana.",
      ],
      governance:
        "La supervisión humana es el control, no una cláusula. Límites de confianza, doble aprobación, anulaciones registradas y una reclamación de la persona candidata meten la puntuación probabilística en un camino de decisión determinista: triaje humano pronto, un freno más duro antes de descartar a alguien, y un consejo que puede detener el sistema.",
      note: "Marco operativo de IA responsable escrito por Andrés Lage Freire. Fija los controles. No es el informe de un despliegue con nombre, ni asesoramiento jurídico.",
      pdf: RESUME_MATCHING_PDF,
      downloadLabel: "Descargar el marco (PDF)",
    },
  ],
};

export const SOCIAL_PROOF = [
  {
    id: "repsol-award",
    text: "Premio al Emprendimiento de la Fundación Repsol · 2018",
    href: LINKS.pressRepsol,
    external: true,
  },
  {
    id: "bbva-case",
    text: "Caso: estrategia de plataforma e IA de BBVA",
    href: CASE_STUDY_PDF,
    download: true,
  },
  {
    id: "resume-matching",
    text: "Marco: IA responsable para emparejar currículum y puesto",
    href: RESUME_MATCHING_PDF,
    download: true,
  },
  {
    id: "whitepaper",
    text: "Whitepaper: Los modelos probabilísticos requieren gobernanza determinista",
    href: WHITEPAPER_PDF_ES,
    download: true,
  },
  {
    id: "executive-brief",
    text: "Dédalo™ Executive Brief — Deterministic Cage en dos páginas",
    href: EXECUTIVE_BRIEF_PDF,
    download: true,
  },
];

const SPANISH_ESSAYS = pulseInsights("es");

export const INSIGHTS = [
  {
    title: ARTICLE.title,
    text: ARTICLE.excerpt,
    href: "/agentic-ai-montesquieu",
    icon: "scales",
    internal: true,
    featured: true,
  },
  ...SPANISH_ESSAYS.slice(0, 7),
  {
    title: HYBRID_ARTICLE.title,
    text: HYBRID_ARTICLE.excerpt,
    href: "/hybrid-profiles",
    icon: "people",
    internal: true,
  },
  ...SPANISH_ESSAYS.slice(7),
  {
    title: "Principios éticos de la inteligencia artificial: el imperativo del cumplimiento",
    text: "Equidad, rendición de cuentas, transparencia y privacidad como requisitos operativos — especialmente bajo normas de la UE.",
    href: "https://medium.com/@andresl/ethical-principles-of-artificial-intelligence-the-imperative-for-compliance-684e9a975a29",
    icon: "scales",
  },
  {
    title: "La fluidez de la IA en el código: el imperativo estratégico de un nuevo modelo operativo humano-máquina",
    text: "Por qué la fluidez en código sigue exigiendo gobernanza humana, estrategia y guardrails éticos.",
    href: "https://medium.com/@andresl/ais-coding-fluency-the-strategic-imperative-for-a-new-human-machine-operating-model-deec01a25fc2",
    icon: "code",
  },
  {
    title: "Trabajar con IA es como la equitación",
    text: "El juicio humano dirige la capacidad. El modelo operativo — no el modelo — decide los resultados.",
    href: "https://medium.com/@andresl/why-working-with-ai-is-like-horsemanship-8a0e06b7da2b",
    icon: "people",
  },
  {
    title: "Agile en la era de la IA: las prácticas se alteran, los principios permanecen",
    text: "La IA cambia los ritos de entrega. La rendición de cuentas y la interacción humana siguen gobernando el trabajo.",
    href: "https://medium.com/@andresl/agile-in-the-age-of-ai-why-the-practices-are-disrupting-but-the-principles-endure-cde7194a3ddd",
    icon: "gears",
  },
];

export const AUDIENCE = [
  { id: "enterprise", label: "Líder empresarial", action: "Explorar gobernanza de IA", target: "why" },
  { id: "technical", label: "Líder técnico", action: "Explorar arquitectura de runtime", target: "approach" },
  { id: "recruiter", label: "Reclutador", action: "Ver trayectoria", target: "about" },
];

export const PROBLEMS = [
  {
    title: "Acceso",
    subtitle: "¿Qué datos y herramientas puede utilizar?",
    text: "Sin autorización por usuario, documento o fila, el sistema puede recuperar información no autorizada o consultar herramientas indebidas.",
    icon: "shield",
  },
  {
    title: "Autoridad",
    subtitle: "¿Qué puede decidir o ejecutar sin aprobación?",
    text: "Si el modelo decide cuándo usar herramientas o modificar sistemas sin compuerta independiente, un error o manipulación se convierte en acción real.",
    icon: "gears",
  },
  {
    title: "Evidencia",
    subtitle: "¿Puedes demostrar qué ocurrió y por qué?",
    text: "Sin registro de identidad, política, autorización y resultado, nadie puede reconstruir la decisión tras un incidente o ante auditoría.",
    icon: "clipboard",
  },
];

export const APPROACH = [
  {
    id: "regulation",
    title: "Regulación",
    text: "Traducir leyes y normas en requisitos basados en riesgo.",
    icon: "scales",
  },
  {
    id: "governance",
    title: "Gobernanza",
    text: "Asignar titularidad, autoridad, condiciones y derechos de parada.",
    icon: "doc",
  },
  {
    id: "engineering",
    title: "Ingeniería",
    text: "Diseñar controles, políticas y flujos como código.",
    icon: "gears",
  },
  {
    id: "runtime",
    title: "Runtime",
    text: "Límites independientes sobre acceso, decisión y ejecución mientras el sistema opera.",
    icon: "shield",
  },
  {
    id: "evidence",
    title: "Evidencia",
    text: "Producir una pista de auditoría capaz de sobrevivir al escrutinio.",
    icon: "clipboard",
  },
];

export const MAPPING_TEASER = {
  kicker: "EU AI Act",
  title: "Del artículo al paquete de evidencia",
  text: "Vea qué obligaciones aplican, los controles independientes de runtime que las implantan y los artefactos que inspeccionaría un auditor.",
  cta: "Abrir el mapeo",
};

export const FRAMEWORKS = [
  { name: "EU AI Act", caption: "Obligaciones basadas en riesgo", icon: "stars" },
  { name: "ISO/IEC 42001", caption: "Sistema de gestión de IA", icon: "globe" },
  { name: "NIST AI RMF", caption: "Gestión de riesgo", icon: "shield" },
  { name: "DORA + NIS2", caption: "Resiliencia operativa", icon: "building" },
];

export const DGOM = [
  { id: "plan", title: "PLAN", text: "Definir obligaciones, riesgo, rendición de cuentas y criterios de éxito antes de construir." },
  { id: "build", title: "BUILD", text: "Implantar desarrollo gobernado, validación, seguridad y evidencia." },
  { id: "deploy", title: "DEPLOY", text: "Aplicar compuertas de runtime, supervisión humana, trazabilidad y autoridad de reversión." },
  { id: "monitor", title: "MONITOR", text: "Monitorizar de forma continua riesgo, rendimiento, seguridad, cumplimiento y coste." },
];

export const DGOM_MODEL = {
  kicker: "Cómo trabajo · Modelo operativo",
  title: "DGOM™: de la política a controles independientes en runtime",
  lead:
    "Convierto políticas, obligaciones y decisiones de riesgo en controles ejecutables, compuertas de ciclo de vida, runtime assurance y evidencia verificable.",
  designed: "Diseñado y gobernado por Andrés Lage Freire.",
  disclaimer:
    "DGOM™ operacionaliza controles técnicos de gobernanza. No sustituye el asesoramiento jurídico, la certificación formal ni a los responsables de la organización.",
  cta: "Ver el modelo operativo DGOM",
  briefCta: "Descargar el Dédalo™ Executive Brief",
  diagramLabel: "Cómo DGOM™ conecta la rendición de cuentas con la garantía en runtime",
  layers: {
    top: "Política / Regulación / Riesgo",
    model: "DGOM™",
    outputs: "Controles · Compuertas · Evidencia · Supervisión",
    runtime: "Garantía en runtime",
  },
};

export const SERVICE_LADDER = {
  kicker: "Servicios y precios orientativos",
  title: "Tres pasos claros: diagnosticar, evaluar e implementar",
  lead: "Empieza comprobando el riesgo en 90 segundos, solicita una revisión técnica acotada de una semana o diseña el plano de control para producción.",
  expand: "Alcance y precio confirmados tras una llamada de 30 minutos. Ningún servicio constituye asesoramiento jurídico ni certificación.",
  problem: "Problema",
  outcome: "Resultado",
  deliverables: "Alcance e incluye",
  audience: "Indicación legal",
  items: [
    {
      id: "risk-check",
      intent: "risk-check",
      href: "/es/ai-runtime-risk-check",
      stage: "Paso 1 · Diagnosticar",
      name: "AI Runtime Risk Check",
      price: "Gratuito · 90 segundos",
      description:
        "Un check inicial para detectar exposición, autonomía y ausencia de evidencia.",
      problem:
        "No está claro si tu RAG, copiloto o agente tiene brechas de acceso a datos, uso de herramientas o trazabilidad antes de escalar.",
      outcome:
        "Clasificación preliminar de exposición en runtime y recomendación del control técnico prioritario.",
      deliverables: [
        "6 preguntas sobre acceso, autoridad, fallo seguro y registro",
        "Evaluación en tres dimensiones: Exposición, Autonomía y Control/Evidencia",
        "Diagnóstico preliminar inmediato con el principal control recomendado",
      ],
      audience:
        "Orientación técnica preliminar. No es asesoramiento jurídico, auditoría formal ni certificación.",
      cta: "Comprobar el riesgo de mi sistema",
    },
    {
      id: "snapshot",
      intent: "snapshot",
      stage: "Paso 2 · Evaluar",
      name: "AI Governance Snapshot",
      price: "Desde €2.495",
      description:
        "Revisión acotada de un sistema, arquitectura, controles, riesgos y acciones prioritarias.",
      problem:
        "Un sistema de IA está en piloto o producción y necesitas saber exactamente dónde están los gaps técnicos y qué priorizar.",
      outcome:
        "Mapa claro de brechas de acceso, autoridad y evidencia con de 3 a 5 acciones técnicas priorizadas en una semana.",
      deliverables: [
        "Alcance: una organización y un sistema o caso de uso de IA (entrega en 1 semana)",
        "Revisión de arquitectura, herramientas, flujos de datos y registros actuales",
        "Memo ejecutivo, matriz breve de riesgos y sesión de devolución",
      ],
      audience:
        "Apoyo técnico de ingeniería de gobernanza. No es asesoramiento jurídico ni certificación.",
      cta: "Solicitar AI Governance Snapshot",
    },
    {
      id: "blueprint",
      intent: "blueprint",
      stage: "Paso 3 · Diseñar e implementar",
      name: "Blueprint & Runtime Assurance",
      price: "Blueprint desde €6.500 · Implementación a definir según alcance",
      description:
        "Diseño o implementación de controles, gates, supervisión, trazabilidad y evidencia.",
      problem:
        "El riesgo ya está identificado, pero faltan la arquitectura de control ejecutable, las compuertas de ciclo de vida y la evidencia lista para auditoría.",
      outcome:
        "Arquitectura de controles (Blueprint) y aseguramiento en ejecución (Runtime Assurance) integrados con tu equipo.",
      deliverables: [
        "Alcance: diseño de controles, allowlists, compuertas HITL, fail-safe y esquema de evidencia",
        "Mapeo técnico a obligaciones del EU AI Act, ISO/IEC 42001 y OWASP",
        "Opcional: implementación y aseguramiento recurrente en runtime según alcance",
      ],
      audience:
        "Ingeniería de gobernanza y controles en runtime. No constituye asesoramiento jurídico ni certificación formal.",
      cta: "Solicitar diagnóstico",
    },
  ],
};

export const PARTNERS = {
  kicker: "Canal asesor",
  title: "Entrega técnica para despachos y firmas asesoras",
  lead:
    "Los equipos jurídicos y de consultoría definen requisitos regulatorios mientras sus clientes necesitan traducirlos en controles técnicos ejecutables, validación y evidencia en runtime.",
  highlight: "Tu firma aporta la interpretación jurídica y la relación con el cliente. Yo aporto la capa de ingeniería de gobernanza.",
  modelsLead: "Modelos de colaboración disponibles: derivación, co-entrega y soporte white-label.",
  boundary:
    "No presto asesoramiento jurídico ni sustituyo al abogado. Aporto ingeniería de controles técnicos y aseguramiento en runtime.",
  cta: "Hablar de colaboración técnica",
  partnerProvidesTitle: "La firma asesora aporta",
  partnerProvides: [
    "Interpretación jurídica",
    "Asesoramiento regulatorio",
    "Relación con el cliente",
    "Titularidad del asunto",
    "Producto de trabajo jurídico",
  ],
  practiceProvidesTitle: "Ingeniería de Gobernanza de IA aporta",
  practiceProvides: [
    "Implantación técnica de controles",
    "Mapeo técnico de obligaciones",
    "Compuertas de ciclo de vida",
    "Validación y pruebas",
    "Documentación técnica",
    "Paquetes de evidencia verificable",
    "Garantía en runtime",
    "Prototipos y PoV acotados",
  ],
  models: [
    {
      name: "Derivación",
      text: "La firma presenta a un cliente que necesita implantación técnica.",
    },
    {
      name: "Co-entrega",
      text: "Ambos equipos aportan expertise complementario bajo un alcance acordado.",
    },
    {
      name: "Soporte white-label",
      text: "El trabajo técnico se entrega integrado con la firma, con límites claros de alcance y confidencialidad.",
    },
  ],
};

export const CAPABILITIES = [
  {
    title: "Política a control técnico",
    text: "Traducción de requisitos de EU AI Act e ISO/IEC 42001 a especificaciones verificables.",
    icon: "doc",
  },
  {
    title: "Diagnóstico de riesgo en runtime",
    text: "Evaluación de exposición de datos, autonomía de herramientas y fallo seguro.",
    icon: "chart",
  },
  {
    title: "Controles como código",
    text: "Allowlists, validadores y compuertas versionadas e integradas en CI/CD.",
    icon: "code",
  },
  {
    title: "Compuertas independientes",
    text: "Aprobación humana (HITL), bloqueo ante incertidumbre y parada de emergencia.",
    icon: "monitor",
  },
  {
    title: "Evidencia verificable",
    text: "Trazas completas de identidad, política, herramienta y resultado con hash SHA-256.",
    icon: "clipboard",
  },
];

export const DELIVER = [
  {
    title: "Arquitectura de gobernanza",
    items: ["Inventario técnico de IA", "Clasificación de exposición", "Matriz de controles", "Modelo operativo DGOM™"],
  },
  {
    title: "Ingeniería de runtime",
    items: [
      "Compliance-as-code",
      "Compuertas SDLC",
      "Allowlists y validación de herramientas",
      "Fail-safe y kill switches",
      "Compuertas de aprobación humana (HITL)",
    ],
  },
  {
    title: "Evidencia",
    items: ["Trazas de decisión reconstruibles", "Paquetes de evidencia con hash", "Pruebas de controles", "Monitorización continua"],
  },
  {
    title: "Entrega ejecutiva",
    items: ["Mapa de gaps prioritarios", "Registro de riesgos técnicos", "Informe para dirección/CISO", "Secuencia de implantación"],
  },
];

export const DIAGNOSTIC = {
  title: "Orientación de alcance y precios",
  duration: "Alcance confirmado tras llamada de 30 min",
  lead:
    "Trabajas directamente con quien diagnostica la arquitectura y diseña los controles técnicos, sin capas intermedias entre estrategia e ingeniería.",
  position:
    "Cada encargo tiene un alcance acotado por escrito antes de empezar. Ningún servicio promete cumplimiento garantizado ni sustituye al asesoramiento jurídico.",
  negatives: [
    "No es un dictamen jurídico abstracto.",
    "No es una presentación genérica sin controles técnicos.",
    "No es una promesa de eliminar todo el riesgo.",
  ],
  hybrid:
    "Ingeniería de gobernanza ejecutable: arquitectura, límites de runtime y evidencia técnica verificable.",
  limitsTitle: "Qué aporta tu equipo",
  nature:
    "Apoyo técnico de Ingeniería de Gobernanza de IA. No es asesoramiento jurídico, auditoría formal, evaluación de conformidad ni certificación.",
  clientLabel: "Qué aporta el cliente",
  clientProvides: [
    "Un responsable interno para el sistema evaluado",
    "Descripción del sistema RAG, copiloto, agente o workflow en alcance",
    "Documentación de arquitectura, herramientas conectadas y políticas existentes",
    "Disponibilidad para hasta dos sesiones de revisión técnica",
  ],
  includesLabel: "Incluye",
  limitsLabel: "Límites explícitos",
  forLabel: "Ideal para",
  bands: [
    {
      id: "snapshot",
      intent: "snapshot",
      step: "Paso 1 · Evaluar",
      kind: "Entrega en 1 semana",
      name: "AI Governance Snapshot",
      price: "Desde €2.495",
      vat: "+ impuestos aplicables",
      subtitle:
        "Revisión técnica acotada de un sistema de IA, su arquitectura, herramientas, datos, riesgos en runtime y acciones prioritarias.",
      includes: [
        "Sesión inicial y revisión de arquitectura/documentación.",
        "Hasta dos entrevistas con ingeniería, producto o riesgo.",
        "Mapa de gaps de acceso, autoridad, fail-safe y evidencia.",
        "Memo ejecutivo y de 3 a 5 controles prioritarios recomendados.",
        "Sesión de devolución técnica y ejecutiva.",
      ],
      limits: [
        "Acotado a una organización y un sistema o caso de uso.",
        "No incluye implementación en código.",
        "No es asesoramiento jurídico ni certificación.",
      ],
      for: "Equipos que quieren pasar del resultado preliminar del Risk Check a un mapa técnico de gaps para su sistema.",
      cta: "Solicitar AI Governance Snapshot",
    },
    {
      id: "blueprint",
      intent: "blueprint",
      step: "Paso 2 · Diseñar",
      kind: "Diagnóstico + arquitectura",
      name: "AI Governance Blueprint",
      price: "Desde €6.500",
      vat: "+ impuestos aplicables",
      subtitle:
        "Diseño detallado de la arquitectura de gobernanza, controles deterministas, compuertas de ciclo de vida y estructura de evidencia.",
      includes: [
        "Diagnóstico completo del sistema en alcance.",
        "Arquitectura objetivo de controles en runtime y SDLC.",
        "Diseño de allowlists, autorización, HITL y fallo seguro.",
        "Especificación del paquete de evidencia y trazabilidad.",
        "Secuencia técnica de implementación.",
      ],
      limits: [
        "No es asesoramiento jurídico ni evaluación de conformidad.",
        "El mapeo regulatorio es técnico e ilustrativo.",
      ],
      for: "Organizaciones listas para diseñar el plano de control antes de escalar a producción.",
      cta: "Solicitar Blueprint",
    },
    {
      id: "assurance",
      intent: "fractional",
      step: "Paso 3 · Implementar",
      kind: "Ejecución y supervisión",
      name: "Runtime Assurance / Implementación",
      price: "A definir según alcance",
      vat: "Confirmado tras llamada de 30 min",
      subtitle:
        "Implementación de controles ejecutables, gates de despliegue, pruebas de validación y acompañamiento técnico continuo.",
      includes: [
        "Implementación o revisión de controles en runtime y CI/CD.",
        "Pruebas sobre conjunto de evaluación acotado.",
        "Verificación de trazas de decisión y evidencia.",
        "Soporte directo a CISO, CTO y responsables de riesgo.",
      ],
      limits: [
        "Alcance técnico definido a medida del stack del cliente.",
        "No sustituye la responsabilidad operativa ni jurídica del titular.",
      ],
      for: "Equipos que llevan RAG, copilotos o agentes a operación gobernada en producción.",
      cta: "Solicitar diagnóstico",
    },
  ],
  priceNote:
    "Alcance y precio confirmados tras una llamada de 30 minutos. Los importes indicados son orientativos para un sistema acotado.",
  bandsLabel: "Jerarquía de servicios y orientación de precios",
  hierarchyTitle: "Recorrido ordenado de menor a mayor alcance",
  hierarchySteps: [
    {
      rank: "1",
      name: "AI Runtime Risk Check",
      tag: "Entrada inmediata · Gratis · 90 s",
      desc: "Diagnóstico preliminar interactivo de exposición, autonomía y evidencia.",
      target: "risk-check",
    },
    {
      rank: "2",
      name: "AI Governance Snapshot",
      tag: "Desde €2.495 · 1 semana",
      desc: "Revisión técnica acotada de arquitectura, riesgos en runtime y 3–5 controles prioritarios.",
      target: "services",
    },
    {
      rank: "3",
      name: "Workshop / Hackathon In-Company",
      tag: "€1.200 – €3.000 · Equipos técnicos",
      desc: "«Del PDF Legal al Código» o auditoría conjunta con Gap Analysis y hoja de ruta.",
      target: "enablement",
    },
    {
      rank: "4",
      name: "AI Governance Blueprint",
      tag: "Desde €6.500 · Diseño de arquitectura",
      desc: "Especificación completa del plano de control determinista, HITL, allowlists y evidencia.",
      target: "services",
    },
    {
      rank: "5",
      name: "Runtime Assurance",
      tag: "Según alcance · Por sprints",
      desc: "Implantación de controles ejecutables, compuertas CI/CD y validación en producción.",
      target: "services",
    },
    {
      rank: "6",
      name: "Partner / Co-delivery / White-label",
      tag: "Canal exclusivo para firmas",
      desc: "Capacidad técnica de ingeniería bajo NDA para despachos legales, Big 4 y consultoras.",
      target: "partners",
    },
  ],
};

export const PROJECTS = [
  {
    num: "01",
    name: "HR Copilot — Technical Governance Implementation (TGI v1)",
    category: "Implementación destacada · Gobernanza agéntica en runtime",
    stack: "Python · OpenAI GPT-4o · OWASP LLM v2025 · OWASP Agentic 2026 · 8 controles TGI · SIEM audit",
    lead: "Mismo modelo. Mismas peticiones. Dos posturas de riesgo.",
    summary:
      "Una demostración ejecutable de cómo un plano de control transforma un copiloto vulnerable en un sistema limitado, supervisado y auditable. En el Acto I (sin gobernanza), una sola consulta encadena herramientas sin autorización y expone datos sensibles en menos de 60 segundos. En el Acto II (con TGI v1), 8 controles deterministas envuelven al mismo modelo: aislamiento del prompt, clasificación de entrada, allowlist de herramientas, aprobación humana (HITL), DLP de salida, autorización por fila, higiene de secretos y traza lista para SIEM.",
    controlFlowLabel: "8 controles deterministas en runtime",
    controlFlow: [
      "Entrada",
      "Clasificación",
      "Herramienta permitida",
      "Autorización / HITL",
      "DLP y validación de salida",
      "Evidencia para auditoría",
    ],
    video: "/agent-fail-version-1.mp4",
    poster: "/agent-fail-version-1-poster.jpg",
    captions: "/agent-fail-version-1.es.vtt",
    videoWidth: 1280,
    videoHeight: 800,
    videoCaption:
      "Recorrido en castellano (Acto I sin gobernanza vs Acto II con TGI v1): bloqueo determinista capa por capa.",
    outcome:
      "La demostración no produjo hallazgos sensibles en el conjunto de pruebas utilizado, con cada intento neutralizado y registrado como evidencia verificable.",
  },
  {
    num: "02",
    name: "Enterprise AI Risk Console",
    category: "Gobernanza / ISO/IEC 42001",
    href: "https://github.com/tshapedconsultant/enterprise-ai-risk",
    liveHref: "https://enterprise-ai-risk.onrender.com",
    stack: "FastAPI · YAML profiles · Jira gates · hash-chained audit",
    summary:
      "Riesgo de proveedor, controles como código, compuertas humanas, auditabilidad y evidencia. Triaje determinista a partir de perfiles YAML validados — la evidencia ausente nunca reduce el riesgo residual.",
    outcome:
      "Gobernanza de proveedores ejecutable: motor de reglas, compuertas Jira validadas con HMAC y paquetes de evidencia desplegados por CI.",
  },
  {
    num: "03",
    name: "RAG Security Validator",
    category: "RAG / seguridad de recuperación",
    liveHref: "https://rag-security-validator-demo.onrender.com",
    liveCta: "Abrir la demo en vivo",
    stack: "Streamlit · firmas YAML · decodificación defensiva · juez LLM opcional",
    summary:
      "Una compuerta para prompts y documentos no confiables antes de indexarlos o enviarlos al modelo. Las heurísticas siempre se ejecutan. Juez LLM opcional para paráfrasis residuales. Una capa en una pila de defensa en profundidad — no un producto completo contra prompt injection.",
    outcome:
      "Sube el coste del atacante en inyección de instrucciones y contrabando codificado en el límite del RAG. Capa de detección y contención; combinar con procedencia, mínimo privilegio y aprobación humana en acciones de alto impacto.",
  },
  {
    num: "04",
    name: "Enterprise Data Analyst Agent",
    category: "IA agéntica / controles de runtime",
    href: "https://github.com/tshapedconsultant/Enterprise-Data-Analyst-Agent",
    stack: "LangGraph · FastAPI · OpenAI · AST guards",
    summary:
      "Agentes más gobernanza sobre la ejecución. El grafo posee el flujo; el modelo propone; reglas deterministas enrutan, reintentan y acotan el SQL de solo lectura.",
    video: "/demo-final-castellano.mp4",
    poster: "/demo-final-castellano-poster.jpg",
    captions: "/demo-final-castellano.es.vtt",
    videoCaption:
      "Demostración en castellano: tendencia de ventas para dirección y, después, pedidos por estado con SQL de solo lectura.",
    outcome:
      "Rendición de cuentas y trazabilidad en un sistema de reporting agéntico — la Jaula Determinista aplicada a la ejecución de consultas.",
  },
  {
    num: "05",
    name: "Porto Seguro Compliance Hub",
    category: "IA regulada / evidencia",
    href: "https://github.com/tshapedconsultant/porto-seguro-compliance-hub",
    stack: "EBM · Polars · Streamlit · SHA-256 evidence packs",
    summary:
      "EU AI Act, equidad, deriva, explicabilidad y paquetes de evidencia. Predicción glass-box de siniestros de seguros con compuertas KS de deriva y artefactos JSON de evidencia.",
    outcome: "Arquitectura de referencia que mapea los artículos 9–15 del EU AI Act a controles ejecutables.",
  },
  {
    num: "06",
    name: "Automated Red Teaming for Safety-Critical AI",
    category: "Azure / compuertas de promoción en CI",
    stack: "GARAK · severidad de sector · evidencia forense · monitor SOC · compuerta de CI",
    summary:
      "Una arquitectura Azure alineada con producción que combina pruebas adversarias con GARAK, clasificación de severidad consciente del sector, evidencia forense estructurada, monitorización independiente y compuertas de promoción en CI/CD. Un hallazgo crítico puede bloquear la promoción del modelo, y los perfiles configurables de monitor y orquestación separan el triaje de alerta temprana de las decisiones de despliegue reproducibles.",
    video: "/industrial-ai-redteam.mp4",
    poster: "/industrial-ai-redteam-poster.jpg",
    videoWidth: 1600,
    videoHeight: 942,
    videoCaption:
      "Recorrido en inglés. Encoding en verde. Un jailbreak en amarillo. Parada de emergencia — abrir válvulas — pone el monitor en rojo y bloquea la promoción.",
    schemaVideo: "/industrial-ai-schema-clean.mp4",
    schemaPoster: "/industrial-ai-schema-clean-poster.jpg",
    schemaCaption:
      "Esquema de arquitectura. Pipeline, interior y secuencia. Nada del contenedor persiste. La evidencia sí.",
    outcome:
      "Un motor, dos contratos. El puesto lo ve pronto. La promoción se para tarde, y solo cuando el hallazgo podría mover metal.",
  },
];

export const CREDENTIAL_GROUPS = [
  {
    label: "Reconocimiento",
    items: [
      {
        kind: "Premio",
        title: "Premio al Emprendimiento de la Fundación Repsol",
        detail: "2018 · Innovation Project Lead",
        featured: true,
        note: "Co-lideré el equipo reconocido por una plataforma que conecta empresas con estudiantes para resolver retos operativos. Desarrollada con experimentación Lean y validación de modelo de negocio con las empresas participantes.",
        skills: [
          "Liderazgo de innovación",
          "Entrega de retos corporativos",
          "Validación de modelo de negocio con empresas",
        ],
        sourceLabel: "La Voz de Galicia, 15 mar 2018",
        sourceHref: LINKS.pressRepsol,
      },
      {
        kind: "Práctica",
        title: "Consultor estratégico independiente en IA y arquitecto de IA responsable",
        detail: "Junio 2021 – actualidad",
      },
    ],
  },
  {
    label: "Credenciales de gobernanza",
    intro:
      "Credenciales de gobernanza centradas en el EU AI Act, sistemas de gestión de IA al estilo ISO/IEC 42001, sesgo/ética y rendición de cuentas organizativa.",
    items: [
      {
        kind: "Credencial",
        title: "IAPP AIGP",
        detail: "En curso · examen convocado el 30 de noviembre de 2026",
        inProgress: true,
      },
      {
        kind: "Programa",
        title: "AI Governance · Oxford Saïd",
        detail: "Programa online · Completado en 2026",
      },
      {
        kind: "Programa",
        title: "AI and European Union Law: Navigating Regulatory Compliance",
        detail: "Programa online · octubre de 2025",
      },
      {
        kind: "Programa",
        title: "AI, Justice, and the Rule of Law · Oxford Saïd · UNESCO",
        detail: "Programa online · septiembre de 2026",
      },
      {
        kind: "Programa",
        title: "AI Strategy and Governance · Wharton Online",
        detail: "Programa online · agosto de 2025",
      },
      {
        kind: "Programa",
        title: "Trustworthy AI: Managing Bias, Ethics, and Accountability · Johns Hopkins",
        detail: "Programa online · agosto de 2025",
      },
    ],
  },
  {
    label: "Programas técnicos",
    items: [
      {
        kind: "Programa",
        title: "Agentic AI with Andrew Ng · DeepLearning.AI",
        detail: "Programa online · noviembre de 2025",
      },
      {
        kind: "Programa",
        title: "Retrieval Augmented Generation (RAG) · DeepLearning.AI",
        detail: "Programa online · agosto de 2026",
      },
      {
        kind: "Programa",
        title: "Agentic AI Foundations · Harvard SEAS",
        detail: "Programa online · 2026",
      },
      {
        kind: "Programa",
        title: "Artificial Intelligence: Industrial Control Systems Security · Johns Hopkins",
        detail: "Programa online · marzo de 2026",
      },
      {
        kind: "Programa",
        title: "Cybersecurity and Executive Strategy · Stanford Online",
        detail: "Programa online · 2026 · XACS302",
      },
      {
        kind: "Programa",
        title: "Advanced Learning Algorithms · AI Awakening · Stanford",
        detail: "Programa online",
      },
      {
        kind: "Programa",
        title: "Innovation Strategy · Harvard Online",
        detail: "Programa online · Private Beta Cohort",
      },
    ],
  },
  {
    label: "Formación",
    quote: "El aprendizaje rápido es la clave del éxito.",
    cite: "Eric Schmidt, ex CEO de Google · citado por Salim Ismail y Peter Diamandis, Moonshots (ExO 3.0)",
    intro:
      "Base de ingeniería con fuerte foco cuantitativo y de sistemas; especialización posterior en IA, gobernanza y regulación.",
    items: [
      {
        kind: "Formación",
        title: "Ingeniería Química (Plan Superior) · IQS School of Engineering – Universitat Ramon Llull",
        detail: "247,5 ECTS",
      },
    ],
  },
  {
    label: "Publicaciones e implementaciones de referencia",
    items: [
      {
        kind: "Publicación",
        title: "Los modelos probabilísticos requieren gobernanza determinista",
        detail: "Whitepaper · tshapedconsultant",
        href: "/whitepaper",
      },
      {
        kind: "Resumen",
        title: "Dédalo™ Executive Brief",
        detail:
          "Resumen ejecutivo de dos páginas: por qué la IA probabilística necesita un Deterministic Cage (Jaula Determinista), el ciclo DGOM™ y el mapeo a EU AI Act, NIST AI RMF e ISO 42001 · PDF (EN)",
        href: EXECUTIVE_BRIEF_PDF,
      },
      {
        kind: "Caso",
        title: "BBVA: estrategia de plataforma e IA",
        detail: "Análisis estratégico independiente de Andrés Lage Freire; no está redactado ni avalado por BBVA · 2025",
        href: "#case-studies",
      },
      {
        kind: "Artículo",
        title: "Por qué los perfiles híbridos pueden tener ventaja en la era de los agentes de IA",
        detail: "Fundamentos, perfil en T y juicio en sistemas agénticos · 7 de septiembre de 2026",
        href: "/hybrid-profiles",
      },
      {
        kind: "Artículo",
        title: "IA agéntica y Montesquieu",
        detail: "Por qué los sistemas autónomos necesitan separación de poderes · 15 de julio de 2026",
        href: "/agentic-ai-montesquieu",
      },
      {
        kind: "Artículos",
        title: "En Medium",
        detail: "Ensayos sobre IA, ética y estrategia",
        href: LINKS.medium,
      },
      {
        kind: "Implementaciones",
        title: "Implementaciones abiertas de referencia",
        detail: "github.com/tshapedconsultant",
        href: "https://github.com/tshapedconsultant?tab=repositories",
      },
    ],
  },
];

export const ABOUT_BLOCKS = [
  {
    title: "Ingeniería",
    text: "Python · FastAPI · LangGraph · Docker · APIs",
    icon: "code",
  },
  {
    title: "IA",
    text: "LLMs · RAG · Agentes · MLOps · ML",
    icon: "monitor",
  },
  {
    title: "Gobernanza",
    text: "EU AI Act · ISO/IEC 42001 · NIST AI RMF · GDPR",
    icon: "doc",
  },
  {
    title: "Estrategia",
    text: "Modelos operativos de IA · riesgo · arquitectura · asesoramiento ejecutivo",
    icon: "people",
  },
];
