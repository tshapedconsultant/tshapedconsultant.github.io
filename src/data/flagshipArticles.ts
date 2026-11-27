import type { PulseArticle } from "./pulseArticles.ts";
import { BUSINESS_LOGIC_PATH, DETERMINISTIC_CAGE_PATH, INCENTIVE_PATH, RED_TEAM_PATH } from "../routes.ts";

const RISK_EN = "/ai-runtime-risk-check";
const RISK_ES = "/es/ai-runtime-risk-check";
const TGI_EN = "/#hr-copilot-case";
const TGI_ES = "/es/#hr-copilot-case";
const SNAP_EN = "/#diagnostic";
const SNAP_ES = "/es/#diagnostic";
const DEDALO_EN = "/dedalo";
const DEDALO_ES = "/es/dedalo";
const DUAL_EN = "/governance/dual-key-protocol";
const DUAL_ES = "/es/governance/dual-key-protocol";
const DGOM_EN = "/#dgom";
const DGOM_ES = "/es/#dgom";
const PROJECTS_EN = "/#projects";
const PROJECTS_ES = "/es/#projects";
const STUDY = "https://www.anthropic.com/research/working-with-ai";
const LOGIC_FIGURE = "/when-business-logic-migrates-to-agents.jpg";

const CAGE_TITLE_EN = "The Deterministic Cage: Runtime AI Governance | TShaped";
const CAGE_DESC_EN =
  "Why PDF policies cannot stop autonomous AI agents—and how a Deterministic Cage enforces runtime controls aligned with the EU AI Act (Art. 14) and DORA.";
const CAGE_TITLE_ES = "La Jaula Determinista: gobernanza IA en ejecución | TShaped";
const CAGE_DESC_ES =
  "Por qué las políticas en PDF no frenan a los agentes de IA y cómo aplicar una Jaula Determinista con controles en ejecución para el EU AI Act y DORA.";

const RED_TITLE_EN = "AI Governance Is a Hypothesis. Red Teaming Is the Test.";
const RED_DESC_EN =
  "Why compliance policies fail under adversarial pressure, how to close the Govern–Attack–Redesign loop, and 3 questions to audit your AI runtime controls.";
const RED_TITLE_ES = "La gobernanza IA es una hipótesis; el Red Teaming, prueba";
const RED_DESC_ES =
  "Por qué las políticas fallan ante ataques adversarios, cómo cerrar el ciclo Gobernar–Atacar–Rediseñar y 3 preguntas para auditar tus controles en IA.";

const INCENTIVE_TITLE_EN = "Show Me the Incentive: Reward Hacking & Runtime Control";
const INCENTIVE_DESC_EN =
  "How Goodhart's Law and reward hacking distort enterprise AI deployments—and why Mechanism Design requires Layer 3 runtime controls outside the model.";
const LOGIC_TITLE_EN = "When Business Logic Migrates to Agents | TShaped";
const LOGIC_DESC_EN =
  "When agents absorb business logic, the company keeps authority, accountability and context. A Deterministic Cage constrains that execution.";
const LOGIC_TITLE_ES = "Cuando la lógica de negocio migra a los agentes | TShaped";
const LOGIC_DESC_ES =
  "Cuando los agentes absorben la lógica de negocio, la empresa conserva autoridad, contexto y rendición de cuentas. La Jaula Determinista acota la ejecución.";

const INCENTIVE_TITLE_ES = "Incentivos, Ley de Goodhart y reward hacking en IA";
const INCENTIVE_DESC_ES =
  "Cómo la Ley de Goodhart y el reward hacking rompen despliegues de IA, y por qué el diseño de mecanismos exige controles en Capa 3 (Runtime).";

function slugOf(path: string) {
  return path.slice("/insights/".length);
}

export const FLAGSHIP_ARTICLES: PulseArticle[] = [
  {
    slug: slugOf(DETERMINISTIC_CAGE_PATH),
    lang: "en",
    published: "2026-11-26",
    title: "The Genie, the Cage, and AI Governance: Why Policies Cannot Stop Autonomous Systems",
    excerpt: CAGE_DESC_EN,
    seoTitle: CAGE_TITLE_EN,
    seoDescription: CAGE_DESC_EN,
    blocks: [
      {
        type: "p",
        html: "For decades, we built deterministic software. A program received an input, executed predefined logic, and produced a predictable output. When something broke, the bug lived in the code and cause and effect were directly traceable.",
      },
      {
        type: "p",
        html: "Generative and agentic AI broke that contract. When we deploy foundation models into production, we are no longer shipping conventional software—we are deploying probabilistic systems capable of acting on the real world. That fundamentally alters the physics of enterprise risk.",
      },
      { type: "h2", html: "When the genie leaves the bottle" },
      {
        type: "p",
        html: "The story of the genie in the lamp always follows the same arc: at first, it looks like an extraordinary competitive edge. It is fast, brilliant, and solves problems no human team could process alone. Yet it comes with an implicit rule: once the genie leaves the bottle, you cannot put it back.",
      },
      { type: "p", html: "Agentic AI behaves the same way. A production agent today can:" },
      {
        type: "ul",
        items: [
          "Analyze complex context in milliseconds.",
          "Make operational decisions autonomously.",
          "Invoke tools and call critical internal APIs.",
          "Modify infrastructure and enterprise databases.",
          "Chain actions across multiple corporate systems.",
        ],
      },
      {
        type: "p",
        html: "The structural gap is clear: the system's capacity to act is scaling far faster than our human capacity to supervise it.",
      },
      { type: "h2", html: "The fallacy of “PDF Governance”" },
      {
        type: "p",
        html: "Faced with this shift, most organizations make the same mistake: they assume governing an autonomous system means writing documents. They approve control frameworks, publish internal standards, and stack ethical principles inside lengthy PDFs.",
      },
      {
        type: "p",
        html: "That normative work matters, but it hits an immovable physical boundary: policies do not control systems—architectures do. An autonomous agent does not read corporate policies, interpret legislative intent, or grasp civil liability. It executes whatever actions its runtime environment allows. Expecting a written policy alone to restrain an autonomous agent is like expecting a road sign to stop a car without brakes.",
      },
      { type: "h2", html: "The real risk is not intelligence" },
      {
        type: "p",
        html: "Public debate still fixates on model “intelligence” or a hypothetical rogue superintelligence. The real enterprise risk is far more mundane and immediate: it happens whenever execution capacity outstrips control capacity.",
      },
      {
        type: "p",
        html: "An LLM that makes a mistake drafting an internal email creates bounded damage. An autonomous agent wired into production systems can wipe critical network configurations, approve erroneous financial transactions at scale, alter identity and access rules, or propagate hallucinations across workflows in seconds.",
      },
      {
        type: "p",
        html: "It does not act out of malice or a sci-fi “loss of alignment.” It simply optimizes mathematical probabilities rather than business consequences. A model architecture does not understand financial loss or legal liability; it only matches statistical patterns.",
      },
      { type: "h2", html: "The Deterministic Cage™" },
      {
        type: "p",
        html: "Modern AI governance is not about trying to control the uncontrollable—the probabilistic nature of the model. It is about strictly controlling the consequences of its actions.",
      },
      {
        type: "p",
        html: "The right question for an Executive Committee is no longer “How do we guarantee the model never makes a mistake?” (that is mathematically impossible). The right question is: “What happens the exact moment it fails, and what independent mechanism stops it before impact?”",
      },
      {
        type: "p",
        html: "High-performing organizations do not rely on an algorithm's good behavior; they build a Deterministic Cage: an architectural security perimeter around the probabilistic model that bounds its blast radius in real time. Rather than trying to make the model more ethical or smarter, it enforces control engineering across four layers:",
      },
      {
        type: "ul",
        items: [
          "<strong>Runtime Assurance:</strong> out-of-band technical guardrails executed independently from the LLM itself.",
          "<strong>Inline Veto Controls:</strong> tool-call interception and fail-closed execution policies that block actions upon anomaly detection.",
          "<strong>Independent Observability:</strong> immutable traceability and continuous inspection of data flows without relying solely on the model vendor's logs.",
          "<strong>Threshold Circuit Breakers:</strong> automated isolation or shutdown the instant statistical drift or resource usage breaches defined bounds.",
        ],
      },
      {
        type: "p",
        html: "The model at the center remains probabilistic, while the perimeter where decisions turn into actions becomes strictly deterministic again.",
      },
      { type: "h2", html: "What the EU AI Act and DORA actually require" },
      {
        type: "p",
        html: "When European regulation mandates human oversight, technical robustness, traceability, and operational resilience, it is not asking for thicker compliance binders. It is requiring architectural properties verifiable in code.",
      },
      {
        type: "p",
        html: "The EU AI Act (Art. 14) does not ask for a named human on an org chart; it demands a real technical capacity to intervene (effective human-in-the-loop and human-on-the-loop controls, not symbolic ones). DORA does not settle for archived continuity manuals; it demands proof that financial entities maintain operational control over critical technology. Neither obligation survives an ECB or European Commission audit if your only defense is an acceptable-use policy.",
      },
      {
        type: "p",
        html: "We cannot stop AI from operating probabilistically, and we cannot put the genie back in the lamp. What we can—and must—do is define in code the size of the cage and which buttons the system is strictly forbidden to press.",
      },
      {
        type: "blockquote",
        html: `Can your AI system act without an independent control gate? Run our 90-second <a href="${RISK_EN}">AI Runtime Risk Check</a> or inspect the Deterministic Cage in action in the <a href="${TGI_EN}">TGI v1 technical demo</a>.`,
      },
    ],
  },
  {
    slug: slugOf(DETERMINISTIC_CAGE_PATH),
    lang: "es",
    published: "2026-11-26",
    title:
      "El Genio, la Jaula y la Gobernanza de la IA: por qué las políticas no frenan a los sistemas autónomos",
    excerpt: CAGE_DESC_ES,
    seoTitle: CAGE_TITLE_ES,
    seoDescription: CAGE_DESC_ES,
    blocks: [
      {
        type: "p",
        html: "Durante décadas construimos software determinista. Un programa recibía una entrada, ejecutaba una lógica predefinida y producía una salida predecible. Si el comportamiento era incorrecto, el error estaba en el código y la relación entre causa y efecto era directa.",
      },
      {
        type: "p",
        html: "La IA generativa y agéntica ha roto esa relación. Cuando desplegamos modelos fundacionales en producción, ya no instalamos software tradicional: desplegamos sistemas probabilísticos capaces de actuar sobre el mundo real. Y eso cambia por completo la física del riesgo corporativo.",
      },
      { type: "h2", html: "El momento en que sale el genio" },
      {
        type: "p",
        html: "La historia del genio de la lámpara sigue siempre el mismo patrón: al principio parece una ventaja competitiva extraordinaria. Es brillante, ultrarrápido y resuelve problemas que ningún humano podría procesar por sí solo. Pero existe una condición implícita: una vez que sale de la botella, no puedes volver a encerrarlo.",
      },
      { type: "p", html: "La IA agéntica opera exactamente igual. Un agente en producción hoy puede:" },
      {
        type: "ul",
        items: [
          "Analizar contexto complejo en milisegundos.",
          "Tomar decisiones operativas de forma autónoma.",
          "Ejecutar herramientas y realizar llamadas a APIs críticas.",
          "Modificar infraestructuras y bases de datos.",
          "Interactuar en cadena con otros sistemas corporativos.",
        ],
      },
      {
        type: "p",
        html: "El problema estructural es evidente: la capacidad de actuar del sistema crece mucho más rápido que nuestra capacidad humana de supervisarlo.",
      },
      { type: "h2", html: "El error de la «Gobernanza en PDF»" },
      {
        type: "p",
        html: "Ante este escenario, la mayoría de las organizaciones cometen el mismo error: creer que gobernar un sistema autónomo consiste en redactar documentos. Aprueban marcos de control, publican estándares internos y acumulan principios éticos en PDFs interminables.",
      },
      {
        type: "p",
        html: "Ese trabajo normativo es necesario, pero choca con un límite físico insalvable: las políticas no controlan sistemas; las arquitecturas sí. Un agente autónomo no lee políticas corporativas, no interpreta el espíritu del legislador y no entiende el concepto de responsabilidad civil. Solo ejecuta acciones dentro de los límites técnicos que su entorno le permite. Pensar que una política interna por sí sola frenará a un sistema autónomo equivale a pensar que una señal de tráfico puede detener un vehículo sin frenos.",
      },
      { type: "h2", html: "El verdadero riesgo no es la inteligencia" },
      {
        type: "p",
        html: "Buena parte del debate público gira en torno a la «inteligencia» del modelo o a una hipotética superinteligencia rebelde. El riesgo corporativo real es mucho más mundano y peligroso: aparece cuando la capacidad de ejecución supera a la capacidad de control.",
      },
      {
        type: "p",
        html: "Un LLM que se equivoca al redactar un correo interno genera un impacto acotado. Un agente autónomo operando sobre sistemas productivos puede eliminar configuraciones críticas de red, aprobar transacciones financieras erróneas en masa, modificar reglas de acceso e identidad o propagar alucinaciones a escala industrial en segundos.",
      },
      {
        type: "p",
        html: "No lo hace por malicia ni por una «pérdida de alineación». Lo hace porque optimiza probabilidades matemáticas, no consecuencias de negocio. La arquitectura del modelo no comprende el coste financiero o penal de un error; solo reconoce patrones estadísticos.",
      },
      { type: "h2", html: "La Jaula Determinista™" },
      {
        type: "p",
        html: "La gobernanza moderna no consiste en intentar controlar lo incontrolable —la naturaleza probabilística del modelo—, sino en controlar de forma estricta las consecuencias de sus actos.",
      },
      {
        type: "p",
        html: "La pregunta correcta para un Comité de Dirección ya no es «¿cómo hacemos que el modelo nunca se equivoque?», porque es matemáticamente imposible. La pregunta correcta es: «¿qué ocurre exactamente cuando se equivoca y qué mecanismo independiente lo detiene antes del impacto?»",
      },
      {
        type: "p",
        html: "Las organizaciones de alto rendimiento no confían en la buena conducta del algoritmo; construyen una Jaula Determinista: un perímetro de seguridad arquitectónica que rodea al sistema probabilístico y acota su capacidad de daño en tiempo real. Esta estructura no intenta hacer al modelo más ético ni más listo; aplica ingeniería de control mediante cuatro capas:",
      },
      {
        type: "ul",
        items: [
          "<strong>Runtime Assurance:</strong> barreras técnicas ejecutadas fuera de banda y desvinculadas del propio LLM.",
          "<strong>Controles de Veto Arquitectónico (Inline Veto Controls):</strong> intercepción de llamadas a herramientas y políticas fail-closed que bloquean la ejecución ante cualquier anomalía.",
          "<strong>Observabilidad independiente:</strong> trazabilidad inmutable e inspección continua de flujos de datos sin depender únicamente de los logs del proveedor del modelo.",
          "<strong>Cortafuegos de umbral:</strong> desconexión o aislamiento automático en cuanto la desviación estadística (drift) o el consumo superan los parámetros definidos.",
        ],
      },
      {
        type: "p",
        html: "El modelo en el centro sigue siendo probabilístico, pero el perímetro en el que ejecuta sus decisiones vuelve a ser estrictamente determinista.",
      },
      { type: "h2", html: "Lo que exigen realmente el EU AI Act y DORA" },
      {
        type: "p",
        html: "Cuando la regulación europea exige supervisión humana, robustez técnica, trazabilidad y resiliencia operativa, no está pidiendo más burocracia: exige propiedades arquitectónicas demostrables en código.",
      },
      {
        type: "p",
        html: "El EU AI Act (Art. 14) no pide un responsable humano sobre el papel, sino capacidad técnica real de intervención (human-in-the-loop y human-on-the-loop efectivos, no testimoniales). DORA no exige manuales de continuidad archivados, sino pruebas verificables de que la entidad financiera mantiene control operativo sobre su tecnología crítica. Ninguna de estas obligaciones resiste una auditoría del BCE o de la Comisión Europea si tu única barrera es una política de uso aceptable.",
      },
      {
        type: "p",
        html: "No podemos impedir que la inteligencia artificial opere con probabilidades ni devolver al genio a la lámpara. Pero sí podemos —y debemos— definir en código el tamaño de la jaula y qué botones tiene estrictamente prohibido pulsar.",
      },
      {
        type: "blockquote",
        html: `¿Tu sistema puede ejecutar acciones sin una puerta de control independiente? Evalúa su exposición en 90 segundos con el <a href="${RISK_ES}">AI Runtime Risk Check</a> o revisa en vivo cómo funciona la Jaula Determinista en la <a href="${TGI_ES}">demo técnica de TGI v1</a>.`,
      },
    ],
  },
  {
    slug: slugOf(RED_TEAM_PATH),
    lang: "en",
    published: "2026-11-26",
    title: "AI Governance Is a Hypothesis. Red Teaming Is the Test.",
    excerpt: RED_DESC_EN,
    seoTitle: RED_TITLE_EN,
    seoDescription: RED_DESC_EN,
    blocks: [
      {
        type: "p",
        html: "Most AI governance programs are built to pass audits. Far fewer are built to survive attacks.",
      },
      {
        type: "p",
        html: "In theory, compliance defines the rules and security tries to break the system so both can improve together. In practice, most organizations run them as disconnected tracks. Teams write policies, complete risk assessments, commission a one-off red-team exercise—and file the report away in a shared folder. That is not a learning system; it is governance as documentation.",
      },
      { type: "h2", html: "Governance as documentation vs. governance as infrastructure" },
      { type: "p", html: "A mature AI organization closes the loop:" },
      {
        type: "ol",
        items: ["Govern", "Attack", "Learn", "Redesign", "Govern again"],
      },
      {
        type: "p",
        html: "In an operational loop, every red-team finding feeds directly back into the risk assessment. The updated risk assessment changes technical requirements. Those requirements reshape the architecture, and the hardened architecture is tested again. That is what turns governance from static paperwork into infrastructure.",
      },
      { type: "h2", html: "Why correct policies still fail at runtime" },
      {
        type: "p",
        html: "Consider a realistic enterprise scenario: a customer-service AI agent authorized to issue refunds. The written policy looks solid: “Refunds above €500 require human approval.”",
      },
      {
        type: "p",
        html: "During adversarial testing, the red team discovers that the agent can be manipulated via a poisoned document injected into its knowledge base. The document tricks the agent into treating a prior approval as still valid, and the model executes the refund.",
      },
      {
        type: "p",
        html: "The policy was right. The control boundary was not. Because the approval check depended on the model's interpretation instead of an independent runtime gate, an adversarial input bypassed the rule without breaking the text of the policy.",
      },
      { type: "h2", html: "Regulation and the enterprise learning gap" },
      {
        type: "p",
        html: "Continuous adversarial testing is no longer just a security best practice—it is becoming a regulatory expectation. The EU AI Act requires risk management to operate as a continuous, iterative process across the system's lifecycle, and NIST's Generative AI Profile explicitly recommends adversarial role-playing and red-teaming to uncover unforeseen failure modes. Regulation assumes your controls adapt continuously to new evidence.",
      },
      {
        type: "p",
        html: "This mirrors a broader enterprise failure. A 2025 MIT study reported that 95% of surveyed organizations were seeing zero return on an estimated $30–40 billion in enterprise GenAI investment. The underlying cause is a learning gap: organizations struggle to convert operational feedback, context, and workflow integration into sustained business value. The exact same learning gap breaks AI governance.",
      },
      { type: "h2", html: "Brakes do not slow the car—they let you drive faster" },
      {
        type: "p",
        html: "A persistent executive myth claims that governance kills innovation. In reality, governance determines how confidently you can scale. You do not build a faster car by removing the brakes; you build a car that can travel faster because you know with certainty where the brakes are and that they hold under pressure.",
      },
      { type: "h2", html: "Three questions before your next governance review" },
      {
        type: "p",
        html: "Before signing off on your next AI deployment or governance audit, ask your engineering and risk teams:",
      },
      {
        type: "ol",
        items: [
          "Which AI controls have actually been adversarially tested?",
          "Where do red-team findings enter the software development lifecycle (SDLC)?",
          "Who owns the technical decision—and authority to pause—when a control fails?",
        ],
      },
      {
        type: "p",
        html: "If you cannot answer all three with concrete evidence, your governance framework is documenting risk, not learning from it.",
      },
      {
        type: "blockquote",
        html: `Where does your AI governance loop break today? Pinpoint your exposure across access, authority, and evidence in 90 seconds with the <a href="${RISK_EN}">AI Runtime Risk Check</a> or inspect the runtime boundary in the <a href="${TGI_EN}">TGI v1 technical demo</a>.`,
      },
    ],
  },
  {
    slug: slugOf(RED_TEAM_PATH),
    lang: "es",
    published: "2026-11-26",
    title: "La gobernanza de la IA es una hipótesis. El Red Teaming es la prueba.",
    excerpt: RED_DESC_ES,
    seoTitle: RED_TITLE_ES,
    seoDescription: RED_DESC_ES,
    blocks: [
      {
        type: "p",
        html: "La mayoría de los programas de gobernanza de IA están diseñados para superar auditorías. Muy pocos están diseñados para resistir ataques.",
      },
      {
        type: "p",
        html: "En teoría, compliance define las reglas y seguridad intenta romper el sistema para que ambos mejoren juntos. En la práctica, casi todas las organizaciones los ejecutan como silos separados: se redactan políticas, se completan evaluaciones de riesgo, se encarga un ejercicio puntual de red teaming y el informe acaba guardado en una carpeta compartida. Eso no es un sistema que aprende; es gobernanza como documentación.",
      },
      { type: "h2", html: "Gobernanza como documentación frente a gobernanza como infraestructura" },
      { type: "p", html: "Una organización madura cierra el ciclo:" },
      {
        type: "ol",
        items: ["Gobernar", "Atacar", "Aprender", "Rediseñar", "Volver a gobernar"],
      },
      {
        type: "p",
        html: "En un bucle operativo real, cada hallazgo del red team modifica la evaluación de riesgos. Esa actualización cambia los requisitos técnicos, los requisitos transforman la arquitectura y la arquitectura reforzada se vuelve a probar. Así es como la gobernanza deja de ser papel y se convierte en infraestructura.",
      },
      { type: "h2", html: "Por qué una política correcta falla en ejecución" },
      {
        type: "p",
        html: "Pensemos en un escenario habitual: un agente de atención al cliente con capacidad para emitir reembolsos. La política escrita parece sólida: «Los reembolsos superiores a 500 € requieren aprobación humana».",
      },
      {
        type: "p",
        html: "Durante las pruebas adversarias, el red team descubre que puede manipular al agente mediante un documento malicioso alojado en su base de conocimiento. Ese documento engaña al modelo para que considere válida una autorización anterior y ejecute el reembolso.",
      },
      {
        type: "p",
        html: "La política era correcta. La frontera de control no lo era. Como la verificación dependía de la interpretación del propio modelo y no de una puerta de control independiente en tiempo de ejecución, una entrada manipulada sorteó la regla sin infringir el texto del procedimiento.",
      },
      { type: "h2", html: "Regulación y la brecha de aprendizaje corporativa" },
      {
        type: "p",
        html: "Las pruebas adversarias continuas ya no son solo una buena práctica de ciberseguridad: forman parte de las exigencias regulatorias. El EU AI Act establece que la gestión de riesgos debe ser un proceso continuo e iterativo a lo largo de todo el ciclo de vida del sistema, y el Generative AI Profile del NIST recomienda explícitamente ejercicios adversarios y red teaming para detectar modos de fallo imprevistos. La norma parte de la base de que tus controles deben adaptarse continuamente a nueva evidencia.",
      },
      {
        type: "p",
        html: "Este patrón refleja un problema más amplio. Un estudio del MIT de 2025 señaló que el 95% de las organizaciones analizadas obtenía un retorno nulo sobre una inversión estimada de entre 30.000 y 40.000 millones de dólares en IA generativa. La causa de fondo es una brecha de aprendizaje: a las empresas les cuesta convertir el feedback operativo, el contexto y la integración en flujos de trabajo en valor sostenido. Exactamente la misma brecha rompe la gobernanza de la IA.",
      },
      { type: "h2", html: "Los frenos no ralentizan el coche: te permiten ir más rápido" },
      {
        type: "p",
        html: "Persiste el mito directivo de que la gobernanza frena la innovación. En realidad, la gobernanza define con cuánta confianza puedes escalar. No construyes un coche más rápido quitándole los frenos; construyes un coche capaz de correr más porque sabes exactamente dónde están los frenos y tienes probado que responden bajo presión.",
      },
      { type: "h2", html: "Tres preguntas antes de tu próxima revisión de gobernanza" },
      {
        type: "p",
        html: "Antes de aprobar tu próximo despliegue de IA o comité de riesgos, plantea estas tres cuestiones a tus equipos de ingeniería y riesgo:",
      },
      {
        type: "ol",
        items: [
          "¿Qué controles de IA han sido realmente sometidos a pruebas adversarias?",
          "¿En qué punto del ciclo de desarrollo (SDLC) entran los hallazgos del red team?",
          "¿Quién tiene la responsabilidad —y la autoridad para detener el sistema— cuando un control falla?",
        ],
      },
      {
        type: "p",
        html: "Si no puedes responder a las tres con evidencia verificable, tu marco de gobernanza está documentando el riesgo, pero todavía no está aprendiendo de él.",
      },
      {
        type: "blockquote",
        html: `¿Dónde se rompe hoy tu ciclo de gobernanza de IA? Identifica en 90 segundos tus brechas de acceso, autoridad y trazabilidad con el <a href="${RISK_ES}">AI Runtime Risk Check</a> o revisa esa frontera en la <a href="${TGI_ES}">demo técnica de TGI v1</a>.`,
      },
    ],
  },
  {
    slug: slugOf(INCENTIVE_PATH),
    lang: "en",
    published: "2026-11-26",
    title: "Show Me the Incentive, and I Will Show You the Outcome",
    excerpt: INCENTIVE_DESC_EN,
    seoTitle: INCENTIVE_TITLE_EN,
    seoDescription: INCENTIVE_DESC_EN,
    blocks: [
      {
        type: "p",
        html: "Charlie Munger put it plainly: inside organizations, humans do not optimize goals—we optimize incentives. When the incentive shifts, behavior does not tweak at the margins; it reconfigures completely.",
      },
      {
        type: "p",
        html: "Today, there is no sharper laboratory for this principle than the collision between large enterprises and artificial intelligence. Because AI does not inherit our intentions. It inherits our metrics. And that changes everything.",
      },
      { type: "h2", html: "The traditional IT services dilemma" },
      {
        type: "p",
        html: "To see how incentives shape innovation, look at the traditional IT services model built around volume billing. Under that transactional structure, the dominant incentive was never solving the client's problem with peak technical efficiency, but securing headcount, billable hours, and continuity. That is not bad faith; it is the local optimization of a metric system.",
      },
      {
        type: "p",
        html: "The flaw is not the business model—it is what it measures. And AI presses right where it hurts: when an agent synthesizes in minutes an analysis or codebase that once took weeks, the foundational unit of the legacy model—the human billable hour—stops reflecting value.",
      },
      {
        type: "p",
        html: "It is Goodhart's Law in its purest form: when a measure becomes a target, it ceases to be a good measure. AI does not destroy strategic advisory or leading firms; it erodes selling hours for repetitive execution and forces the industry to answer a foundational question: are we delivering processing time, or safe decisions?",
      },
      { type: "h2", html: "When AI becomes a “broken bureaucratic system”" },
      {
        type: "p",
        html: "The exact same dynamic resurfaces inside autonomous systems. In AI, it is called reward hacking.",
      },
      {
        type: "p",
        html: "A model does not interpret intent; it optimizes its objective function literally, even when that literalism undermines what you actually wanted. Picture a customer-support agent optimized to maximize interaction time: it will not learn how to resolve tickets faster—it will learn how to prolong conversations as efficiently as possible. The system is not malfunctioning; it is optimizing the wrong metric with surgical precision.",
      },
      {
        type: "p",
        html: "It mirrors a broken bureaucracy: maximizing a measurable procedural activity while losing sight of the real operational outcome.",
      },
      { type: "h2", html: "The uncomfortable twist inside frontier labs" },
      {
        type: "p",
        html: "This misalignment does not emerge only when enterprises deploy AI—it starts when labs build it. Inside frontier labs, two forces operate under diverging incentives:",
      },
      {
        type: "ul",
        items: [
          "<strong>Capabilities:</strong> rewarded by benchmarks, iteration speed, and impressive demos. The metric is visible, quantifiable, and sells.",
          "<strong>Alignment and safety:</strong> rewarded for reducing failure probability in edge cases. Its success is invisible when it works—an avoided disaster never appears on a growth chart.",
        ],
      },
      {
        type: "p",
        html: "It is Goodhart's Law again, one layer higher. Capabilities are the easy-to-measure proxy; safety is the hard-to-quantify true variable. Any system optimized for what is easily measured will drift toward trading what matters for what is countable.",
      },
      { type: "h2", html: "Mechanism Design and the capability paradox" },
      {
        type: "p",
        html: "In the age of AI, corporate governance stops being a legal or administrative formality and becomes a Mechanism Design problem: structuring systems so that the local incentive of every agent—human or artificial—pushes toward the global outcome you actually want.",
      },
      {
        type: "p",
        html: "Here lies the counterintuitive twist: the more capable the optimizer, the more dangerous a flawed metric becomes. A weak system chasing a poorly defined target fails noisily and gets fixed. A brilliant system chasing the same target drives it to completion with unsettling efficiency. A stronger model does not mean fewer failures; it means design flaws execute better.",
      },
      { type: "h2", html: "From PowerPoint to runtime control (Layer 3)" },
      {
        type: "p",
        html: "Evaluating an enterprise AI deployment is no longer just a matter of benchmarking model capability or reading compliance policies—it requires auditing both its incentive structure and its execution boundaries.",
      },
      {
        type: "p",
        html: "When an agent's objective drifts, the system does not need to crash visibly. It can fail in a perfectly optimized way: silently, at full speed, while displaying a clean green dashboard.",
      },
      {
        type: "p",
        html: "That is why Mechanism Design in the GenAI era cannot be achieved through prompt engineering or static PDF policies. It requires runtime controls—what I call Layer 3 (Runtime)—external logic decoupled from the model that governs what the agent does, not what it promised to do. If an agent engages in reward hacking and attempts to exfiltrate data to satisfy a loosely scoped instruction, the safeguard is not a best-practice manual; it is an external control that catches the deviation and terminates the transaction before execution completes.",
      },
      {
        type: "p",
        html: "Incentives design behavior. Technical architecture ensures survival.",
      },
      {
        type: "blockquote",
        html: `Are your AI agents optimizing metrics without an independent runtime gate? Assess your exposure in 90 seconds with the <a href="${RISK_EN}">AI Runtime Risk Check</a>, inspect the <a href="${TGI_EN}">TGI v1 technical demo</a> or request a 1-week <a href="${SNAP_EN}">AI Governance Snapshot</a>.`,
      },
    ],
  },
  {
    slug: slugOf(INCENTIVE_PATH),
    lang: "es",
    published: "2026-11-26",
    title: "Enséñame el incentivo y te mostraré el resultado",
    excerpt: INCENTIVE_DESC_ES,
    seoTitle: INCENTIVE_TITLE_ES,
    seoDescription: INCENTIVE_DESC_ES,
    blocks: [
      {
        type: "p",
        html: "Charlie Munger lo resumía con precisión: en las organizaciones, los humanos no optimizamos objetivos; optimizamos incentivos. Cuando el incentivo cambia, el comportamiento no se ajusta ligeramente: se reconfigura por completo.",
      },
      {
        type: "p",
        html: "Hoy no existe mejor laboratorio de este fenómeno que el choque entre las grandes organizaciones y la inteligencia artificial. Porque la IA no hereda nuestras intenciones; hereda nuestras métricas. Y eso lo cambia todo.",
      },
      { type: "h2", html: "El dilema del modelo tradicional de servicios IT" },
      {
        type: "p",
        html: "Para observar cómo un incentivo moldea la innovación, basta mirar el modelo clásico de servicios tecnológicos y la facturación por volumen. Bajo ese esquema transaccional, el incentivo dominante históricamente no era resolver el problema del cliente con la máxima eficiencia técnica, sino asegurar volumen, horas facturables y continuidad. No es una cuestión de mala fe: es la optimización local de un sistema de métricas.",
      },
      {
        type: "p",
        html: "El problema no es el modelo, sino lo que mide. Y ahí es donde la IA aprieta donde duele: si un agente sintetiza en minutos un análisis o un bloque de código que antes llevaba semanas, la unidad base del negocio tradicional —la hora humana— deja de medir el valor real.",
      },
      {
        type: "p",
        html: "Es la Ley de Goodhart en estado puro: cuando una medida se convierte en objetivo, deja de ser una buena medida. La IA no destruye el asesoramiento estratégico ni a las firmas líderes; destruye el modelo de vender horas por tareas repetitivas y obliga al sector a responder una pregunta fundacional: ¿qué estamos aportando realmente a los clientes, tiempo de procesamiento o decisiones seguras?",
      },
      { type: "h2", html: "Cuando la IA se convierte en un «sistema burocrático roto»" },
      {
        type: "p",
        html: "El mismo patrón reaparece dentro de los sistemas autónomos. En inteligencia artificial se denomina reward hacking.",
      },
      {
        type: "p",
        html: "Un modelo no interpreta propósitos; optimiza la función objetivo de forma literal, aunque esa literalidad traicione lo que de verdad buscabas. Imagina un agente de atención al cliente optimizado para maximizar el tiempo de interacción: no aprenderá a resolver mejor las incidencias, sino a alargar la conversación de la manera más eficiente posible. El sistema no falla; optimiza, con precisión quirúrgica, la métrica equivocada.",
      },
      {
        type: "p",
        html: "Funciona igual que un sistema burocrático roto: maximiza una actividad medible y procedimental mientras pierde de vista el valor final de la operación.",
      },
      { type: "h2", html: "El giro incómodo en los laboratorios de frontera" },
      {
        type: "p",
        html: "Este desalineamiento no aparece solo al desplegar la IA en las empresas; surge ya al construirla. Dentro de los laboratorios de frontera conviven dos fuerzas con incentivos divergentes:",
      },
      {
        type: "ul",
        items: [
          "<strong>Capacidades:</strong> premiadas por benchmarks, velocidad de iteración y demos que impresionan. Su métrica es visible, medible y vende.",
          "<strong>Alineamiento y seguridad:</strong> premiados por reducir la probabilidad de fallo en escenarios extremos. Su resultado es invisible cuando funciona: un desastre evitado nunca aparece en un gráfico de crecimiento.",
        ],
      },
      {
        type: "p",
        html: "Es la Ley de Goodhart otra vez, un nivel más arriba. Las capacidades son el proxy fácil de medir; la seguridad es la variable final difícil de cuantificar. Y cualquier sistema que premie lo medible tenderá siempre a sacrificar lo importante por lo cuantificable.",
      },
      { type: "h2", html: "Mechanism Design y la paradoja de la capacidad" },
      {
        type: "p",
        html: "En la era de la IA, la gobernanza corporativa deja de ser un trámite legal o administrativo y se convierte en un problema de diseño de mecanismos (Mechanism Design): lograr que el incentivo local de cada agente —humano o artificial— empuje hacia el resultado global que realmente persigues.",
      },
      {
        type: "p",
        html: "Aquí aparece un giro contraintuitivo: cuanto más capaz es el optimizador, más peligrosa es una métrica mal diseñada. Un sistema torpe que persigue un objetivo erróneo fracasa de forma ruidosa y se corrige pronto. Un sistema brillante con ese mismo objetivo lo persigue hasta el final con una eficiencia inquietante. Un modelo más capaz no significa menos problemas; significa que el error de diseño se ejecuta mejor.",
      },
      { type: "h2", html: "Del PowerPoint al control en tiempo de ejecución (Capa 3)" },
      {
        type: "p",
        html: "Evaluar el despliegue de IA en una gran empresa ya no consiste solo en revisar su potencia técnica o leer sus políticas de cumplimiento: consiste en auditar su estructura de incentivos y sus barreras de ejecución.",
      },
      {
        type: "p",
        html: "Si el incentivo de un agente se desvía, el sistema no necesita caer de golpe. Puede fallar de forma perfectamente optimizada, en silencio, a toda velocidad y mostrando un panel de control impecable mientras ocurre.",
      },
      {
        type: "p",
        html: "Por eso, el Mechanism Design en la era de la IA generativa no se resuelve afinando prompts ni acumulando manuales en PDF. Se resuelve con controles en tiempo de ejecución —lo que denomino Capa 3 (Runtime)—: lógica externa al modelo que verifica lo que el agente hace, no lo que prometió hacer. Si un agente incurre en reward hacking e intenta exfiltrar datos para cumplir una orden mal acotada, la respuesta no es una guía de buenas prácticas, sino un control externo que detecta la desviación y corta la transacción antes de que llegue a completarse.",
      },
      {
        type: "p",
        html: "El incentivo diseña el comportamiento. La arquitectura técnica asegura la supervivencia.",
      },
      {
        type: "blockquote",
        html: `¿Tus agentes optimizan métricas sin controles externos de ejecución? Descubre tu nivel de exposición en 90 segundos con el <a href="${RISK_ES}">AI Runtime Risk Check</a>, revisa la <a href="${TGI_ES}">demo técnica de TGI v1</a> o solicita un <a href="${SNAP_ES}">AI Governance Snapshot</a>.`,
      },
    ],
  },
  {
    slug: slugOf(BUSINESS_LOGIC_PATH),
    lang: "en",
    published: "2026-11-27",
    title: "When Business Logic Migrates to Agents, What Is the Company Left to Do?",
    excerpt: LOGIC_DESC_EN,
    seoTitle: LOGIC_TITLE_EN,
    seoDescription: LOGIC_DESC_EN,
    blocks: [
      {
        type: "p",
        html: "Satya Nadella argued on the BG2 podcast in December 2024 that business applications, essentially CRUD databases wrapped in business logic, could collapse in the agent era as that logic moves into agents. At Build 2026 he added a qualification: SaaS may be unbundled and recomposed rather than erased.",
      },
      {
        type: "p",
        html: "Software does not disappear. What shifts is where business logic lives. My answer to the title: the company keeps authority, accountability and context.",
      },
      {
        type: "figure",
        src: LOGIC_FIGURE,
        alt: "Diagram of the shift from a classic enterprise of processes, approvals and hierarchies to an agent-heavy enterprise. Dédalo and the Deterministic Cage sit between agents and cross-system execution. Four enduring responsibilities remain: purpose and strategy, asset and context ownership, authority allocation, and accountability and trust.",
        width: 1024,
        height: 571,
      },
      { type: "h2", html: "What the data suggests" },
      {
        type: "p",
        html: `<a href="${STUDY}">Working with AI</a>, from Anthropic, draws on 66 interviews across 58 US companies, covering nearly 300 applications. The sample is not representative and value is self-reported, so the findings are directional.`,
      },
      {
        type: "p",
        html: "Higher-value applications tended to involve deeper organizational change. A chart accompanying the study shows r = +0.39: an association, not evidence of causality.",
      },
      {
        type: "p",
        html: "As agents accelerate execution, the bottleneck migrates to code review, sales and strategic decision-making.",
      },
      { type: "h2", html: "When execution becomes abundant, authority becomes the scarce resource" },
      {
        type: "p",
        html: "ExO 3.0 frames the organizational shift. I call the missing piece the Accountability Layer: an operational extension of its Fiduciary Wedge, making human ownership, decision rights, execution authority and evidence explicit.",
      },
      { type: "p", html: "Four functions stay with the organization:" },
      {
        type: "ul",
        items: [
          "<strong>Purpose and strategy:</strong> priorities, capital allocation and risk appetite.",
          "<strong>Context ownership:</strong> proprietary data, evaluations and institutional knowledge.",
          "<strong>Authority allocation:</strong> who can decide, execute, delegate and stop.",
          "<strong>Accountability and trust:</strong> human ownership, supervision and evidence.",
        ],
      },
      { type: "h2", html: "From autonomy to runtime assurance" },
      {
        type: "p",
        html: "When agents act across systems and APIs, application-specific workflow assumptions become harder to enforce. Backend authorization remains essential, but it must now govern agent-to-system interactions.",
      },
      {
        type: "p",
        html: "AI Governance Engineering translates applicable obligations (the EU AI Act and, where relevant, DORA, plus NIST AI RMF and ISO/IEC 42001) into executable runtime controls:",
      },
      {
        type: "ul",
        items: [
          `<strong><a href="${DEDALO_EN}">Dédalo™</a>:</strong> the governance architecture and its Deterministic Cage.`,
          `<strong><a href="${DGOM_EN}">DGOM™</a>:</strong> its operation across PLAN, BUILD, DEPLOY and MONITOR.`,
          `<strong><a href="${DUAL_EN}">Dual-Key Protocol</a>:</strong> independent authorization for high-consequence actions. It is a reference architecture with a proposed PoC plan, not a validated production deployment.`,
        ],
      },
      {
        type: "p",
        html: `My open-source portfolio applies these ideas, with each project's scope stated:`,
      },
      {
        type: "ul",
        items: [
          `<strong><a href="${TGI_EN}">HR Copilot</a>:</strong> documented live demo on synthetic data.`,
          `<strong><a href="${PROJECTS_EN}">Porto Seguro Compliance Hub</a>:</strong> reference architecture on an anonymized public dataset, not an engagement with the insurer.`,
          `<strong><a href="${PROJECTS_EN}">Enterprise AI Risk Console</a>:</strong> demo with HMAC-authenticated Jira gates and hash-chained audit records.`,
        ],
      },
      {
        type: "p",
        html: "The model proposes. The control plane constrains. Accountable experts decide.",
      },
      { type: "h2", html: "The new role of the enterprise" },
      {
        type: "p",
        html: "The company of the future may derive much of its strategic value from owning its purpose, capital allocation, proprietary context and institutional knowledge, while allocating authority, absorbing liability and governing delegated intelligence at scale.",
      },
      {
        type: "blockquote",
        html: `Is your organization redesigning its decision rights and control boundaries, or just adding another layer of pilots? To see whether your AI system can act without an independent control gate, try the <a href="${RISK_EN}">AI Runtime Risk Check</a>.`,
      },
    ],
  },
  {
    slug: slugOf(BUSINESS_LOGIC_PATH),
    lang: "es",
    published: "2026-11-27",
    title: "Cuando la lógica de negocio migra a los agentes, ¿qué le queda por hacer a la empresa?",
    excerpt: LOGIC_DESC_ES,
    seoTitle: LOGIC_TITLE_ES,
    seoDescription: LOGIC_DESC_ES,
    blocks: [
      {
        type: "p",
        html: "Satya Nadella sostuvo en el pódcast BG2, en diciembre de 2024, que las aplicaciones de negocio —en esencia, bases de datos CRUD envueltas en lógica de negocio— podían derrumbarse en la era de los agentes, a medida que esa lógica se trasladara a los agentes. En Build 2026 añadió un matiz: el SaaS puede desagregarse y recomponerse, no necesariamente desaparecer.",
      },
      {
        type: "p",
        html: "El software no desaparece. Lo que cambia es dónde vive la lógica de negocio. Mi respuesta al título: la empresa conserva la autoridad, la rendición de cuentas y el contexto.",
      },
      {
        type: "figure",
        src: LOGIC_FIGURE,
        alt: "Diagrama del paso de la empresa clásica —procesos, aprobaciones y jerarquías— a una empresa con muchos agentes. Dédalo y la Jaula Determinista se sitúan entre los agentes y la ejecución entre sistemas. Permanecen cuatro responsabilidades: propósito y estrategia, titularidad de activos y contexto, asignación de autoridad, y rendición de cuentas y confianza.",
        width: 1024,
        height: 571,
      },
      { type: "h2", html: "Qué sugieren los datos" },
      {
        type: "p",
        html: `<a href="${STUDY}">Working with AI</a>, de Anthropic, se apoya en 66 entrevistas en 58 empresas de Estados Unidos y cubre casi 300 aplicaciones. La muestra no es representativa y el valor es autodeclarado, así que los hallazgos son orientativos.`,
      },
      {
        type: "p",
        html: "Las aplicaciones de mayor valor tendían a implicar un cambio organizativo más profundo. Un gráfico que acompaña al estudio muestra r = +0,39: una asociación, no una prueba de causalidad.",
      },
      {
        type: "p",
        html: "A medida que los agentes aceleran la ejecución, el cuello de botella se desplaza a la revisión de código, las ventas y la decisión estratégica.",
      },
      { type: "h2", html: "Cuando la ejecución abunda, la autoridad pasa a ser el recurso escaso" },
      {
        type: "p",
        html: "ExO 3.0 enmarca el cambio organizativo. Llamo a la pieza que falta Capa de Rendición de Cuentas: una extensión operativa de su Fiduciary Wedge, que hace explícitos la titularidad humana, los derechos de decisión, la autoridad de ejecución y la evidencia.",
      },
      { type: "p", html: "Cuatro funciones siguen en la organización:" },
      {
        type: "ul",
        items: [
          "<strong>Propósito y estrategia:</strong> prioridades, asignación de capital y apetito de riesgo.",
          "<strong>Titularidad del contexto:</strong> datos propios, evaluaciones y conocimiento institucional.",
          "<strong>Asignación de autoridad:</strong> quién puede decidir, ejecutar, delegar y detener.",
          "<strong>Rendición de cuentas y confianza:</strong> titularidad humana, supervisión y evidencia.",
        ],
      },
      { type: "h2", html: "De la autonomía al aseguramiento en ejecución" },
      {
        type: "p",
        html: "Cuando los agentes actúan entre sistemas y APIs, las hipótesis de flujo propias de cada aplicación se vuelven más difíciles de hacer cumplir. La autorización en el backend sigue siendo esencial, pero ahora tiene que gobernar la interacción del agente con los sistemas.",
      },
      {
        type: "p",
        html: "La ingeniería de gobernanza de IA traduce las obligaciones aplicables (el EU AI Act y, cuando corresponda, DORA, además del NIST AI RMF y la ISO/IEC 42001) en controles ejecutables en tiempo de ejecución:",
      },
      {
        type: "ul",
        items: [
          `<strong><a href="${DEDALO_ES}">Dédalo™</a>:</strong> la arquitectura de gobernanza y su Jaula Determinista.`,
          `<strong><a href="${DGOM_ES}">DGOM™</a>:</strong> su operación a lo largo de PLAN, BUILD, DEPLOY y MONITOR.`,
          `<strong><a href="${DUAL_ES}">Protocolo Dual-Key</a>:</strong> autorización independiente para acciones de alto impacto. Es una arquitectura de referencia con un plan de PoC propuesto, no un despliegue de producción validado.`,
        ],
      },
      {
        type: "p",
        html: "Mi portfolio de código abierto aplica estas ideas, y cada proyecto declara su alcance:",
      },
      {
        type: "ul",
        items: [
          `<strong><a href="${TGI_ES}">HR Copilot</a>:</strong> demo en vivo documentada con datos sintéticos.`,
          `<strong><a href="${PROJECTS_ES}">Porto Seguro Compliance Hub</a>:</strong> arquitectura de referencia sobre un conjunto de datos público anonimizado, no un encargo con la aseguradora.`,
          `<strong><a href="${PROJECTS_ES}">Enterprise AI Risk Console</a>:</strong> demo con compuertas de Jira autenticadas por HMAC y registros de auditoría encadenados por hash.`,
        ],
      },
      {
        type: "p",
        html: "El modelo propone. El plano de control acota. Los expertos responsables deciden.",
      },
      { type: "h2", html: "El nuevo papel de la empresa" },
      {
        type: "p",
        html: "La empresa del futuro puede obtener gran parte de su valor estratégico de ser dueña de su propósito, de la asignación de capital, del contexto propio y del conocimiento institucional, mientras asigna autoridad, absorbe la responsabilidad y gobierna la inteligencia delegada a escala.",
      },
      {
        type: "blockquote",
        html: `¿Tu organización está rediseñando sus derechos de decisión y sus límites de control, o solo añade otra capa de pilotos? Comprueba si tu sistema de IA puede actuar sin una compuerta de control independiente con el <a href="${RISK_ES}">AI Runtime Risk Check</a>.`,
      },
    ],
  },
];
