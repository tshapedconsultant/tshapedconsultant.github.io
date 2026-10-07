import {
  CASE_STUDY_PDF,
  COVER,
  COVER_AVIF,
  COVER_WEBP,
  EXECUTIVE_BRIEF_PDF,
  LINKS,
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
  WHITEPAPER_PDF,
  WHITEPAPER_PDF_ES,
};

export const BRAND_DEFINITION =
  "Ingeniería de Gobernanza de IA: el diseño e implantación de controles, rendición de cuentas y evidencia a lo largo del ciclo de vida de la IA.";

export const LOCATION = "Con sede en Madrid · Trabajo en remoto en EMEA";

export const LOCATION_HERO = "Madrid · EMEA en remoto";

export const ABOUT_INTRO =
  "Arquitecto de IA responsable. Consultor estratégico independiente en IA desde junio de 2021. Antes, Cloud Implementation Specialist (Avaya Cloud Office en Concentrix). Trabajo en la intersección de ingeniería, sistemas de IA, gobernanza y regulación — de la arquitectura al despliegue.";

export const ABOUT_SITE =
  "Este sitio lo he diseñado y construido yo, con programación asistida por IA. Trato la accesibilidad, la privacidad, el rendimiento y la auditabilidad como requisitos de primer orden.";

export const HERO = {
  kicker: "Andrés Lage Freire · Madrid · EMEA en remoto",
  headline: "Gobernanza de IA ejecutable para sistemas regulados y agénticos",
  tagline: "Arquitecto de IA responsable · De la regulación a la garantía en runtime",
  value:
    "Convertimos las obligaciones regulatorias, las decisiones del consejo y los controles de riesgo de IA en salvaguardas ejecutables, compuertas de ciclo de vida y evidencia verificable — de la política al runtime.",
  assets: "DGOM™ · Dédalo™ · Ingeniería de Gobernanza de IA",
  qualify: "Para organizaciones que despliegan RAG, agentes y otros sistemas de IA de alta consecuencia.",
  scope:
    "Del inventario de IA y la preparación para el EU AI Act a agentes gobernados, seguridad de RAG y garantía en runtime.",
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
  primary: "Solicitar un Diagnóstico de Gobernanza de IA",
  secondary: "Explorar el modelo operativo DGOM",
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
  governHint: "Basta una descripción breve. No incluya nombres confidenciales de clientes ni de asuntos.",
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
  intentLabel: "¿Qué necesita?",
  intents: [
    { value: "snapshot", label: "AI Governance Snapshot" },
    { value: "blueprint", label: "AI Governance Blueprint" },
    { value: "fractional", label: "Fractional governance support" },
    { value: "other", label: "Other" },
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
  {
    id: "executive-brief",
    text: "Dédalo™ Executive Brief — Deterministic Cage en dos páginas",
    href: EXECUTIVE_BRIEF_PDF,
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
  ...pulseInsights("es"),
];

export const AUDIENCE = [
  { id: "enterprise", label: "Líder empresarial", action: "Explorar gobernanza de IA", target: "why" },
  { id: "technical", label: "Líder técnico", action: "Explorar arquitectura de runtime", target: "approach" },
  { id: "recruiter", label: "Reclutador", action: "Ver trayectoria", target: "about" },
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
  { id: "plan", title: "PLAN", text: "Definir obligaciones, riesgo, rendición de cuentas y criterios de éxito antes de construir." },
  { id: "build", title: "BUILD", text: "Implantar desarrollo gobernado, validación, seguridad y evidencia." },
  { id: "deploy", title: "DEPLOY", text: "Aplicar compuertas de runtime, supervisión humana, trazabilidad y autoridad de reversión." },
  { id: "monitor", title: "MONITOR", text: "Monitorizar de forma continua riesgo, rendimiento, seguridad, cumplimiento y coste." },
];

export const DGOM_MODEL = {
  kicker: "Modelo operativo",
  title: "DGOM™: gobernanza del consejo al runtime",
  lead:
    "DGOM™ es un modelo operativo de gobernanza ejecutable que conecta regulación, política, riesgo, control, código, operaciones, evidencia y supervisión a lo largo del ciclo de vida de la IA y el software.",
  designed: "Diseñado y gobernado por Andrés Lage Freire.",
  disclaimer:
    "DGOM™ orquesta y operacionaliza marcos de gobernanza. No sustituye el asesoramiento jurídico, la certificación formal ni a los responsables de la organización. Los mapeos de referencia son ilustrativos — no son una evaluación de conformidad ni un alineamiento garantizado con el EU AI Act.",
  cta: "Ver el modelo operativo DGOM",
  briefCta: "Descargar el Dédalo™ Executive Brief",
  diagramLabel: "Cómo DGOM™ conecta la rendición de cuentas del consejo con la garantía en runtime",
  layers: {
    top: "Consejo / Regulación / Riesgo",
    model: "DGOM™",
    outputs: "Controles · Compuertas · Evidencia · Supervisión",
    runtime: "Garantía en runtime",
  },
};

export const SERVICE_LADDER = {
  kicker: "Servicios",
  title: "De la señal de riesgo a la garantía en runtime",
  lead: "Empiece por un Snapshot de una semana para un sistema. El Blueprint es un paso distinto: diagnóstico más diseño de arquitectura y controles.",
  expand: "Empiece en pequeño, establezca evidencia y amplíe la cobertura de gobernanza a medida que crecen el sistema y la superficie de riesgo.",
  problem: "Problema",
  outcome: "Resultado",
  deliverables: "Entregables",
  audience: "Audiencia típica",
  items: [
    {
      id: "snapshot",
      intent: "snapshot",
      stage: "1. Snapshot — una semana",
      name: "AI Governance Snapshot",
      problem: "Un sistema de IA ya está en uso y el equipo necesita una vista acotada del riesgo y de qué hacer después.",
      description:
        "Precio de lanzamiento para los dos primeros proyectos contratados. Evaluación técnica acotada de una organización y un sistema o caso de uso de IA, con entrega en una semana.",
      outcome: "Un memo ejecutivo, una matriz breve de riesgos y de tres a cinco acciones priorizadas — no una arquitectura.",
      deliverables: [
        "Reunión inicial, revisión de documentación existente y hasta dos entrevistas",
        "Memo ejecutivo",
        "Matriz breve de riesgos",
        "De tres a cinco acciones priorizadas y sesión de devolución",
      ],
      audience: "Organizaciones que quieren un punto de partida de una semana para un solo sistema.",
      cta: "Empezar por el Snapshot",
    },
    {
      id: "blueprint",
      intent: "blueprint",
      stage: "2. Blueprint — diagnóstico + arquitectura",
      name: "AI Governance Blueprint",
      problem: "El problema ya es claro, pero no hay un diseño accionable de controles, compuertas, roles y evidencia.",
      description: "Diagnóstico más arquitectura y diseño de controles para el siguiente paso de implementación.",
      outcome: "Un diseño accionable para la siguiente etapa de implantación — sin reivindicar implantarlo en esta oferta.",
      deliverables: [
        "Arquitectura de gobernanza objetivo",
        "Diseño de controles y compuertas de ciclo de vida",
        "Estructura del paquete de evidencia",
        "Secuencia de implantación",
      ],
      audience: "Organizaciones listas para diseñar controles después del diagnóstico.",
      cta: "Solicitar el Blueprint",
    },
    {
      id: "fractional",
      intent: "fractional",
      stage: "3. Recurrencia",
      name: "Fractional governance support",
      problem: "Los pilotos pasan a operaciones, pero no hay un titular permanente para la revisión de controles y el aseguramiento.",
      description: "Ingeniería de gobernanza, aseguramiento, revisión de controles y apoyo a la decisión de forma continua, sin un equipo interno completo.",
      outcome: "Una cadencia retenida de aseguramiento a medida que crece el parque.",
      deliverables: ["Revisión periódica de controles", "Soporte de garantía en runtime", "Apoyo a la decisión de los responsables"],
      audience: "Organizaciones que pasan de pilotos a operaciones gobernadas.",
      cta: "Hablar de soporte recurrente",
    },
  ],
};

export const PARTNERS = {
  kicker: "Canal asesor",
  title: "Entrega técnica para despachos y firmas asesoras",
  lead:
    "Los equipos jurídicos y de consultoría pueden definir requisitos regulatorios y posiciones de gobernanza mientras sus clientes siguen necesitando una capa de entrega técnica. La Ingeniería de Gobernanza de IA cubre esa capa con controles, validación, documentación técnica, evidencia y garantía en runtime.",
  highlight: "Su firma aporta interpretación jurídica y la confianza del cliente. Nosotros aportamos la capa de ejecución técnica.",
  modelsLead: "Los modelos de entrega posibles incluyen derivación, co-entrega y soporte white-label.",
  boundary:
    "No prestamos asesoramiento jurídico ni sustituimos al letrado. Prestamos ingeniería de gobernanza técnica y soporte de aseguramiento.",
  cta: "Hablar de capacidad de entrega técnica",
  partnerProvidesTitle: "La firma asesora aporta",
  partnerProvides: [
    "Interpretación jurídica",
    "Asesoramiento regulatorio",
    "Relación con el cliente",
    "Titularidad del asunto",
    "Producto de trabajo jurídico",
  ],
  practiceProvidesTitle: "La Ingeniería de Gobernanza de IA aporta",
  practiceProvides: [
    "Implantación técnica",
    "Mapeo de controles",
    "Compuertas de ciclo de vida",
    "Validación",
    "Documentación técnica",
    "Paquetes de evidencia",
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
      text: "Ambos equipos aportan expertise distinto bajo un modelo de entrega acordado.",
    },
    {
      name: "Soporte white-label",
      text: "El trabajo técnico se entrega detrás de la relación de cliente de la firma, con alcance, confidencialidad y límites de responsabilidad claros.",
    },
  ],
};

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
  title: "AI Governance Diagnostic",
  duration: "1 semana o según diseño",
  lead:
    "El Snapshot es una evaluación de una semana de un sistema. El Blueprint es un paso distinto: diagnóstico más diseño de arquitectura y controles.",
  position:
    "Trabajo directamente con quien diseña y construye los controles, sin separar estrategia, implantación y evidencia en varias capas.",
  negatives: [
    "No es un memo de despacho.",
    "No es un deck de diapositivas de las Big Four.",
    "No es otra capa de retraso por comité.",
  ],
  hybrid:
    "Un profesional senior convierte decisiones de IA en controles ejecutables, compuertas de ciclo de vida y evidencia — sin los traspasos.",
  limitsTitle: "Qué aporta usted",
  nature:
    "Esto es apoyo técnico de gobernanza de IA. No es asesoramiento jurídico, no es una auditoría formal, no es una evaluación de conformidad y no es una certificación. El mapeo al EU AI Act en el Blueprint es ilustrativo, no una determinación jurídica.",
  clientLabel: "Qué aporta usted",
  clientProvides: [
    "Un titular interno nombrado para el encargo",
    "El sistema o familia de casos de uso en alcance y su uso previsto",
    "Políticas existentes, notas de arquitectura e incidentes o hallazgos de auditoría conocidos, si los hay",
    "Acceso a Ingeniería y Riesgo para entrevistas o una sesión de trabajo",
  ],
  includesLabel: "Incluye",
  limitsLabel: "Límites explícitos",
  forLabel: "Mejor para",
  bands: [
    {
      id: "snapshot",
      intent: "snapshot",
      step: "1. Snapshot",
      kind: "Una semana · precio de lanzamiento",
      name: "AI Governance Snapshot",
      price: "2.495 €",
      vat: "+ impuestos aplicables",
      subtitle:
        "Precio de lanzamiento para los dos primeros proyectos contratados. Evaluación técnica acotada de una organización y un sistema o caso de uso de IA, con entrega en una semana.",
      includes: [
        "Reunión inicial.",
        "Revisión de documentación existente.",
        "Hasta dos entrevistas.",
        "Memo ejecutivo.",
        "Matriz breve de riesgos.",
        "De tres a cinco acciones priorizadas.",
        "Sesión de devolución.",
      ],
      limits: [
        "Una organización y un sistema o caso de uso.",
        "No es un inventario corporativo de IA.",
        "No incluye implementación.",
        "No es una auditoría formal.",
        "No es una certificación.",
        "No es una evaluación de conformidad.",
        "No es asesoramiento jurídico.",
      ],
      for: "Equipos que necesitan saber qué decidir y qué hacer después antes de encargar arquitectura o implementación.",
      cta: "Empezar por el Snapshot",
    },
    {
      id: "blueprint",
      intent: "blueprint",
      step: "2. Blueprint",
      kind: "Diagnóstico + diseño",
      name: "AI Governance Blueprint",
      price: "6.500 €",
      vat: "+ impuestos aplicables",
      subtitle:
        "Un paso distinto del Snapshot: diagnóstico más diseño de arquitectura y controles para una organización y un sistema o caso de uso de IA.",
      includes: [
        "Diagnóstico del sistema en alcance.",
        "Arquitectura de gobernanza objetivo.",
        "Diseño de controles y compuertas de ciclo de vida.",
        "Roles, derechos de decisión y vías de escalado.",
        "Estructura del paquete de evidencia.",
        "Secuencia de implantación.",
        "Cierre con un profesional senior.",
      ],
      limits: [
        "La implantación no está incluida salvo que se acote aparte.",
        "No es asesoramiento jurídico.",
        "No es una evaluación de conformidad.",
        "No es una certificación ISO/IEC 42001.",
        "El mapeo del EU AI Act es ilustrativo, no una determinación jurídica.",
      ],
      for: "Organizaciones que ya saben que el problema es real y necesitan un diseño accionable para la siguiente etapa de implantación.",
      cta: "Solicitar el Blueprint",
    },
  ],
  priceNote:
    "El precio de lanzamiento del Snapshot aplica a los dos primeros proyectos contratados. La llamada introductoria no tiene coste. El alcance se confirma por escrito antes de empezar. Una referencia del cliente no es condición del precio.",
  bandsLabel: "Ofertas de AI Governance Diagnostic",
};

export const PROJECTS = [
  {
    num: "01",
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
    num: "02",
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
    num: "03",
    name: "Enterprise Data Analyst Agent",
    category: "IA agéntica / controles de runtime",
    href: "https://github.com/tshapedconsultant/Enterprise-Data-Analyst-Agent",
    stack: "LangGraph · FastAPI · OpenAI · AST guards",
    summary:
      "Agentes más gobernanza sobre la ejecución. El grafo posee el flujo; el modelo propone; reglas deterministas enrutan, reintentan y acotan el SQL de solo lectura.",
    video: "/demo-multiagent.mp4",
    poster: "/demo-multiagent-poster.jpg",
    captions: "/demo-multiagent.es.vtt",
    videoCaption:
      "Demo del analista multiagente: una pregunta en lenguaje natural, SQL de solo lectura gobernado y un resultado trazable.",
    outcome:
      "Rendición de cuentas y trazabilidad en un sistema de reporting agéntico — la Jaula Determinista aplicada a la ejecución de consultas.",
  },
  {
    num: "04",
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
        title: "Modelos probabilísticos requieren gobernanza determinista",
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
