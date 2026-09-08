import {
  CASE_STUDY_PDF,
  COVER,
  COVER_AVIF,
  COVER_WEBP,
  CV_PDF,
  LINKS,
  WHITEPAPER_PDF,
  WHITEPAPER_PDF_ES,
} from "./content.js";

export {
  CASE_STUDY_PDF,
  COVER,
  COVER_AVIF,
  COVER_WEBP,
  CV_PDF,
  LINKS,
  WHITEPAPER_PDF,
  WHITEPAPER_PDF_ES,
};

export const BRAND_DEFINITION =
  "Ingeniería de Gobernanza de IA: el diseño e implantación de controles, rendición de cuentas y evidencia a lo largo del ciclo de vida de la IA.";

export const LOCATION = "Con sede en Madrid · Trabajo en remoto en EMEA";

export const LOCATION_HERO = "Con sede en Madrid · EMEA en remoto";

export const ABOUT_INTRO =
  "Arquitecto de IA responsable. Consultor estratégico independiente en IA desde junio de 2021. Antes, Cloud Implementation Specialist (Avaya Cloud Office en Concentrix). Trabajo en la intersección de ingeniería, sistemas de IA, gobernanza y regulación — de la arquitectura al despliegue.";

export const ABOUT_SITE =
  "Este sitio lo he diseñado y construido yo, con programación asistida por IA. Trato la accesibilidad, la privacidad, el rendimiento y la auditabilidad como requisitos de primer orden.";

export const HERO = {
  tagline: "Arquitecto de IA responsable · De la regulación a la garantía en runtime",
  value:
    "Convierto las obligaciones del EU AI Act y el riesgo de IA en controles ejecutables, compuertas de ciclo de vida y evidencia verificable — de la política al runtime.",
  principle: "Los modelos probabilísticos requieren gobernanza determinista.",
};

export const BEST_FIT =
  "Mejor encaje: casos de IA regulados y de alta responsabilidad en servicios financieros, seguros, operaciones críticas, sistemas de conocimiento empresarial y flujos agénticos.";

export const HERO_FOR = {
  audience: "Para CTOs, responsables de IA y líderes de Riesgo/Cumplimiento en banca, seguros y energía.",
  problems:
    "Trabajo típico: preparación para el EU AI Act, ISO/IEC 42001 y gobernanza de sistemas RAG y agentes.",
};

export const CTA = {
  primary: "Consultar un Diagnóstico de Gobernanza de IA",
  note: "Llamada introductoria de 30 minutos · Valorar encaje y siguientes pasos",
};

export const DIAGNOSTIC_FORM = {
  kicker: "O envíe primero el contexto",
  submit: "Enviar consulta",
  sending: "Enviando…",
  success: "Gracias. Su consulta se ha enviado. Responderé al correo profesional que ha indicado.",
  error: "No se ha podido enviar la consulta. Inténtelo de nuevo en un momento o use el botón de correo.",
  errorFallback: "Abrir correo con estos datos",
  notConfigured:
    "El formulario de consulta aún no está disponible. Mientras tanto, contacte conmigo por LinkedIn.",
  privacy:
    "Sin lista de correo. Sin seguimiento automatizado. Sus datos se usan solo para responder a esta consulta.",
  governPlaceholder:
    "Por ejemplo: un sistema RAG interno, un asistente de cara al cliente, IA de un proveedor, o un flujo agéntico.",
  governHint: "Basta una descripción breve.",
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
  title: "Modelo de colaboración",
  lines: [
    {
      label: "Diagnosticar",
      text: "establecer riesgo, titularidad, obligaciones y lagunas prioritarias.",
      icon: "clipboard",
    },
    {
      label: "Arquitectar",
      text: "convertir los hallazgos en diseño de gobernanza, requisitos de control y un backlog de implantación.",
      icon: "doc",
    },
    {
      label: "Implantar o asegurar",
      text: "construir controles directamente o gobernar la entrega con su equipo interno o socio de implantación.",
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
  lede: "Una lectura de banca regulada sobre arquitectura de plataforma, IA aplicada y supervisión de modelos — escrita para CTOs y líderes de Riesgo que necesitan ver cómo encaja la gobernanza en un modelo operativo de producción.",
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
        "Conservar el IP nuclear en una AI Factory interna para personalización y riesgo, y asociarse para infraestructura y herramientas de frontera — AWS, OpenAI ChatGPT Enterprise y Google Cloud Gemini.",
        "Pasar de pantallas de producto genéricas a un AI Financial Coach: categorizar transacciones, prever saldos y recomendar acciones concretas en lugar de consejos genéricos.",
        "Incorporar la IA generativa a los flujos de los empleados para acelerar trabajo jurídico, redacción y consultas complejas, y reasignar el tiempo humano al asesoramiento de alto contacto y a la gobernanza de modelos.",
      ],
      outcomes: [
        "78,1 millones de clientes activos, un 79 % de penetración móvil y un 61 % de las ventas unitarias por canales digitales (marzo de 2025).",
        "Más de 11.000 empleados en ChatGPT Enterprise, con un ahorro medio de dos horas a la semana.",
        "Ingresos de Corporate & Investment Banking al alza un 36 % en el 1T 2025; 1,8 millones de cuentas 100 % digitales en México; tiempo de respuesta móvil reducido por un factor de seis.",
      ],
      governance:
        "La gobernanza se trata como ventaja competitiva: un inventario centralizado de modelos de IA, trabajo continuo de reducción de sesgo y alineación proactiva con el EU AI Act — de modo que la innovación solo acelere si la supervisión mantiene el ritmo.",
      note: "Análisis estratégico independiente de Andrés Lage Freire; no está redactado ni avalado por BBVA. Cifras según el análisis (marzo de 2025 y 1T 2025).",
      pdf: CASE_STUDY_PDF,
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
    id: "whitepaper",
    text: "Whitepaper: Modelos probabilísticos requieren gobernanza determinista",
    href: WHITEPAPER_PDF_ES,
    download: true,
  },
];

export const INSIGHTS = [
  {
    title: HYBRID_ARTICLE.title,
    text: HYBRID_ARTICLE.excerpt,
    href: "/hybrid-profiles",
    icon: "people",
    internal: true,
    featured: true,
  },
  {
    title: ARTICLE.title,
    text: ARTICLE.excerpt,
    href: "/agentic-ai-montesquieu",
    icon: "scales",
    internal: true,
  },
  {
    title: "Ethical Principles of Artificial Intelligence: The Imperative for Compliance",
    text: "Equidad, rendición de cuentas, transparencia y privacidad como requisitos operativos — especialmente bajo normas de la UE.",
    href: "https://medium.com/@andresl/ethical-principles-of-artificial-intelligence-the-imperative-for-compliance-684e9a975a29",
    icon: "scales",
  },
  {
    title: "AI’s Coding Fluency: The Strategic Imperative for a New Human-Machine Operating Model",
    text: "Por qué la fluidez en código sigue exigiendo gobernanza humana, estrategia y guardrails éticos.",
    href: "https://medium.com/@andresl/ais-coding-fluency-the-strategic-imperative-for-a-new-human-machine-operating-model-deec01a25fc2",
    icon: "code",
  },
  {
    title: "Why Working with AI is Like Horsemanship",
    text: "El juicio humano dirige la capacidad. El modelo operativo — no el modelo — decide los resultados.",
    href: "https://medium.com/@andresl/why-working-with-ai-is-like-horsemanship-8a0e06b7da2b",
    icon: "people",
  },
  {
    title: "Agile in the Age of AI: Why the Practices Are Disrupting But the Principles Endure",
    text: "La IA cambia los ritos de entrega. La rendición de cuentas y la interacción humana siguen gobernando el trabajo.",
    href: "https://medium.com/@andresl/agile-in-the-age-of-ai-why-the-practices-are-disrupting-but-the-principles-endure-cde7194a3ddd",
    icon: "gears",
  },
];

export const AUDIENCE = [
  { id: "enterprise", label: "Líder empresarial", action: "Explorar gobernanza de IA", target: "why" },
  { id: "technical", label: "Líder técnico", action: "Explorar arquitectura de runtime", target: "approach" },
  { id: "recruiter", label: "Reclutador", action: "Ver trayectoria y CV", target: "about" },
];

export const PROBLEMS = [
  {
    title: "Riesgo de IA sin gestionar",
    subtitle: "Sin titular, sin visión de riesgo residual — hasta que hay un incidente.",
    text: "La titularidad, la autoridad y el riesgo residual no residen en ningún sitio — hasta que un incidente o un regulador pregunta.",
    icon: "shield",
  },
  {
    title: "Agentes sin gobernar",
    subtitle: "Recuperan, deciden y actúan sin una parada independiente.",
    text: "Los sistemas pueden recuperar, recomendar y actuar sin límites independientes sobre el acceso, la decisión o la ejecución.",
    icon: "gears",
  },
  {
    title: "Sin evidencia de auditoría",
    subtitle: "La prueba se reconstruye a posteriori, no se genera en runtime.",
    text: "La prueba se reconstruye después del hecho en lugar de generarse de forma continua en el límite de control.",
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
  { id: "plan", title: "PLAN", text: "Alcance, titularidad y apetito de riesgo antes de construir." },
  { id: "build", title: "BUILD", text: "Codificar controles en el diseño, el SDLC y los límites del sistema." },
  { id: "deploy", title: "DEPLOY", text: "Compuertas independientes, aprobación humana y controles de runtime." },
  { id: "monitor", title: "MONITOR", text: "Drift, evidencia, riesgo residual y recálculo." },
];

export const CAPABILITIES = [
  {
    title: "Política y gobernanza",
    text: "Marcos alineados con el EU AI Act, ISO/IEC 42001 y su modelo operativo.",
    icon: "doc",
  },
  {
    title: "Evaluación de riesgo de IA",
    text: "Identificar, clasificar y priorizar riesgos de IA a lo largo del ciclo de vida.",
    icon: "chart",
  },
  {
    title: "Controles como código",
    text: "Controles versionados y testeables, integrados en los flujos y en el stack.",
    icon: "code",
  },
  {
    title: "Controles independientes de runtime",
    text: "Kill switches y monitorización diseñados en la arquitectura de control.",
    icon: "monitor",
  },
  {
    title: "Evidencia lista para auditoría",
    text: "Trazas de decisión, artefactos con hash y prueba de controles.",
    icon: "clipboard",
  },
];

export const DELIVER = [
  {
    title: "Arquitectura de gobernanza",
    items: ["Inventario de IA", "Clasificación de riesgo", "Marco de controles", "Modelo operativo de gobernanza"],
  },
  {
    title: "Ingeniería",
    items: [
      "Compliance-as-code (cumplimiento como código)",
      "Compuertas SDLC",
      "Controles de runtime",
      "Kill switches",
      "Compuertas de aprobación humana",
    ],
  },
  {
    title: "Evidencia",
    items: ["Pistas de auditoría", "Paquetes de evidencia", "Prueba de controles", "Monitorización continua"],
  },
  {
    title: "Entrega ejecutiva",
    items: ["Evaluación de madurez", "Registro de riesgos", "Reporting al consejo", "Hoja de ruta de implantación a 90 días"],
  },
];

export const DIAGNOSTIC = {
  title: "Diagnóstico de Gobernanza de IA",
  duration: "2–3 semanas",
  items: [
    "Inventario de IA y triaje",
    "Evaluación de lagunas de control",
    "Backlog de implantación a 90 días",
  ],
  deliverables: "Se entrega como pack ejecutivo y sesión de trabajo.",
};

export const PROJECTS = [
  {
    num: "01",
    name: "Enterprise AI Risk Console",
    category: "Gobernanza / ISO/IEC 42001",
    href: "https://github.com/tshapedconsultant/enterprise-ai-risk",
    stack: "FastAPI · YAML profiles · Jira gates · hash-chained audit",
    summary:
      "Riesgo de proveedor, controles como código, compuertas humanas, auditabilidad y evidencia. Triaje determinista a partir de perfiles YAML validados — la evidencia ausente nunca reduce el riesgo residual.",
    outcome:
      "Gobernanza de proveedores ejecutable: motor de reglas, compuertas Jira validadas con HMAC y paquetes de evidencia desplegados por CI.",
  },
  {
    num: "02",
    name: "Enterprise Data Analyst Agent",
    category: "IA agéntica / controles de runtime",
    href: "https://github.com/tshapedconsultant/Enterprise-Data-Analyst-Agent",
    stack: "LangGraph · FastAPI · OpenAI · AST guards",
    summary:
      "Agentes más gobernanza sobre la ejecución. El grafo posee el flujo; el modelo propone; reglas deterministas enrutan, reintentan y acotan el SQL de solo lectura.",
    outcome:
      "Rendición de cuentas y trazabilidad en un sistema de reporting agéntico — la Jaula Determinista aplicada a la ejecución de consultas.",
  },
  {
    num: "03",
    name: "Porto Seguro Compliance Hub",
    category: "IA regulada / evidencia",
    href: "https://github.com/tshapedconsultant/porto-seguro-compliance-hub",
    stack: "EBM · Polars · Streamlit · SHA-256 evidence packs",
    summary:
      "EU AI Act, equidad, drift, explicabilidad y paquetes de evidencia. Predicción glass-box de siniestros de seguros con compuertas KS de drift y artefactos JSON de evidencia.",
    outcome: "Arquitectura de referencia que mapea los artículos 9–15 del EU AI Act a controles ejecutables.",
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
        title: "Modelos probabilísticos requieren gobernanza determinista",
        detail: "Whitepaper · tshapedconsultant",
        href: "/whitepaper",
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
