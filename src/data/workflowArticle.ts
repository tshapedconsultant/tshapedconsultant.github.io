import type { PulseArticle } from "./pulseArticles.ts";
import { WORKING_WITH_AI, WORKFLOW_ARTICLE_SLUG } from "./workingWithAi.ts";

const study = WORKING_WITH_AI.url;
const paper = WORKING_WITH_AI.paperUrl;

export const WORKFLOW_ARTICLES: PulseArticle[] = [
  {
    slug: WORKFLOW_ARTICLE_SLUG,
    lang: "en",
    published: "2026-11-25",
    title: "Beyond task automation: governing AI-enabled workflow redesign",
    excerpt:
      "Anthropic’s Working with AI study links higher reported value with changes to roles and workflows. The interviews are directional. This essay keeps that finding separate from a governance reading.",
    blocks: [
      {
        type: "p",
        html: `<strong>Research finding.</strong> <a href="${study}" data-bridge="study">Working with AI</a> was published by Anthropic on 23 November 2026. Nathan Wilmers, Maxim Massenkoff and Peter McCrory report 66 interviews with people at 58 enterprise customers in the United States. The companies were chosen for range, not as a random or representative sample. Names in the report are pseudonyms. Value is what interviewees described. It is not an experimental return.`,
      },
      {
        type: "p",
        html: `The public essay says nearly 300 applications were coded for reported value and for how much the organisation had to change. Higher-value uses tended to involve changes to processes or roles. Many simpler uses were described as lower value. The same pages also show that a light-touch use can still fit an existing structure, so a simple automation is not worthless. A larger reorganisation does not, by itself, guarantee more value. The technical appendix is in the <a href="${paper}">report PDF</a>. This page does not quote a correlation coefficient from that PDF.`,
      },
      {
        type: "h2",
        html: "What the correlation would mean, and what it would not",
      },
      {
        type: "p",
        html: "A positive association in that sample would mean that, among the applications discussed, reported value and reported organisational change moved together. It would not mean that change caused the value, that every firm should reorganise, or that the result is a percentage return.",
      },
      {
        type: "h2",
        html: "Speed moves the bottleneck",
      },
      {
        type: "p",
        html: "Interviewees said that when coding got faster, review, sales and strategic decisions had to keep up. The volume of AI output swamped scarce human attention. In one approval workflow, reviewers were expected to handle twice the cases and some did not. An API typo from an agent broke a planned release. Accelerating one task can move the constraint to review and coordination.",
      },
      {
        type: "h2",
        html: "Roles, authority, review and maintenance",
      },
      {
        type: "p",
        html: "A production-planning manager said the functions involved had done a poor job of defining who had accountability and authority. A hotel-services director said an individual can apply AI in their own area but does not have authority to change the work. Firms that broadened roles still needed someone to maintain prompts, integrations and the new internal apps. Review and maintenance became part of the job, not a leftover.",
      },
      {
        type: "h2",
        html: "Our governance interpretation",
      },
      {
        type: "p",
        html: "The paragraphs above are the study. What follows is not. Dédalo™ is the control architecture. DGOM™ is how those controls are planned, built, deployed and monitored. Dual-Key is the stricter pattern for a consequential action, not the default for every step. The study does not recommend these controls.",
      },
      {
        type: "p",
        html: "Enterprise AI value often extends beyond task automation. When the workflow changes, decision rights, review capacity and escalation paths have to change with it. Not every action needs two human approvals. A reliable policy decides when Dual-Key applies. Lower-consequence actions can run inside limits that are already authorized. The agent does not grant authority to itself. An authorization does not make the action reversible. Human review needs time and context, not only a checkbox.",
      },
      {
        type: "h2",
        html: "Evidence, and its limits",
      },
      {
        type: "ul",
        items: [
          "HR Copilot is a documented demonstration on synthetic data. The recorded tests did not show sensitive findings. It does not demonstrate Dual-Key end to end.",
          "The illustrative Rego file is checked with OPA 1.22.4. The verifier, the authorization coordinator and the PEP are described. They are not demonstrated end to end.",
          "Enterprise AI Risk is a demo. Its ledger is a tamper-evident hash chain, not immutable storage. HMAC covers the Jira webhook. It does not establish DORA conformity.",
          "Porto Seguro Compliance Hub is a reference architecture for explainable predictive models, drift monitoring, fairness assessment and governance evidence. The evidence consulted does not demonstrate RAG isolation or prompt-injection neutralisation.",
        ],
      },
      {
        type: "h2",
        html: "Next step",
      },
      {
        type: "p",
        html: 'The entry offer remains the one-week AI Governance Snapshot: one organisation and one system. It asks what workflow or decision changes, who holds authority, where review moves, who maintains the policies, what happens if that person is unavailable, and what evidence already exists. It is not a full organisational redesign. <a href="/#diagnostic" data-bridge="snapshot">Request an AI Governance Snapshot</a>. The frame is on <a href="/dedalo/" data-bridge="dedalo">Dédalo</a>.',
      },
    ],
  },
  {
    slug: WORKFLOW_ARTICLE_SLUG,
    lang: "es",
    published: "2026-11-25",
    title: "Más allá de automatizar tareas: gobernar el rediseño del trabajo con IA",
    excerpt:
      "El estudio Working with AI, de Anthropic, relaciona el valor declarado con cambios de roles y de procesos. Las entrevistas son orientativas. Este ensayo separa ese hallazgo de una lectura de gobernanza.",
    blocks: [
      {
        type: "p",
        html: `<strong>Hallazgo del estudio.</strong> <a href="${study}" data-bridge="study">Working with AI</a> lo publicó Anthropic el 23 de noviembre de 2026. Nathan Wilmers, Maxim Massenkoff y Peter McCrory recogen 66 entrevistas en 58 empresas clientes de Estados Unidos. La selección busca variedad, no una muestra aleatoria ni representativa. Los nombres del informe son seudónimos. El valor es el que declaran las personas entrevistadas. No es un retorno medido en un experimento.`,
      },
      {
        type: "p",
        html: `El ensayo público dice que se codificaron casi 300 aplicaciones según el valor declarado y el cambio organizativo necesario. Los usos de mayor valor tendían a cambiar procesos o roles. Muchos usos sencillos se describieron con menos valor. Esas mismas páginas muestran que un uso ligero puede encajar en la estructura actual, así que una automatización simple no es inútil. Un cambio organizativo mayor no garantiza, por sí solo, más valor. El apéndice técnico está en el <a href="${paper}">PDF del informe</a>. Esta página no cita un coeficiente de correlación de ese PDF.`,
      },
      {
        type: "h2",
        html: "Qué significaría la correlación, y qué no",
      },
      {
        type: "p",
        html: "Una asociación positiva en esa muestra querría decir que, entre las aplicaciones comentadas, el valor declarado y el cambio organizativo declarado iban juntos. No querría decir que el cambio causó el valor, que toda empresa deba reorganizarse, ni que el resultado sea un porcentaje de retorno.",
      },
      {
        type: "h2",
        html: "La velocidad mueve el cuello de botella",
      },
      {
        type: "p",
        html: "Las personas entrevistadas contaron que, al acelerarse el código, la revisión, las ventas y las decisiones estratégicas tenían que seguir el ritmo. El volumen de salida de la IA saturó la atención humana. En un flujo de aprobación se esperaba el doble de casos y parte del equipo no lo asumió. Una errata de un agente en un endpoint rompió una publicación prevista. Acelerar una tarea puede trasladar el límite a la revisión y a la coordinación.",
      },
      {
        type: "h2",
        html: "Roles, autoridad, revisión y mantenimiento",
      },
      {
        type: "p",
        html: "Un responsable de planificación de la producción dijo que las funciones implicadas no habían definido bien quién tenía la responsabilidad y la autoridad. Una directora de operaciones hoteleras dijo que una persona puede aplicar la IA en su propio ámbito, pero no tiene autoridad para cambiar el trabajo. Las empresas que ampliaron roles siguieron necesitando a alguien que mantuviera prompts, integraciones y las nuevas aplicaciones internas. La revisión y el mantenimiento pasaron a formar parte del trabajo.",
      },
      {
        type: "h2",
        html: "Interpretación de gobernanza",
      },
      {
        type: "p",
        html: "Los párrafos anteriores son el estudio. Lo que sigue no lo es. Dédalo™ es la arquitectura de control. DGOM™ es cómo se planifican, construyen, despliegan y vigilan esos controles. Dual-Key es el patrón más estricto para una acción de alto impacto, no el valor por defecto de cada paso. El estudio no recomienda estos controles.",
      },
      {
        type: "p",
        html: "El valor de la IA en la empresa a menudo va más allá de automatizar una tarea. Cuando cambia el trabajo, tienen que cambiar quién decide, quién revisa y cómo se escala un caso. No toda acción pide dos aprobaciones humanas. Una política fiable decide cuándo aplica Dual-Key. Las acciones de menor impacto pueden ejecutarse dentro de límites ya autorizados. El agente no se asigna autoridad a sí mismo. Autorizar no hace reversible la acción. La revisión humana necesita tiempo y contexto, no solo una casilla.",
      },
      {
        type: "h2",
        html: "Evidencia, y sus límites",
      },
      {
        type: "ul",
        items: [
          "HR Copilot es una demostración documentada con datos sintéticos. Las pruebas registradas no mostraron hallazgos sensibles. No demuestra Dual-Key de extremo a extremo.",
          "El archivo Rego ilustrativo se comprueba con OPA 1.22.4. El verificador, el coordinador de autorización y el PEP se describen. No se demuestran de extremo a extremo.",
          "Enterprise AI Risk es una demo. Su registro es una cadena hash que evidencia manipulación, no un almacén inmutable. El HMAC cubre el webhook de Jira. No acredita conformidad con DORA.",
          "Porto Seguro Compliance Hub es una arquitectura de referencia para modelos predictivos explicables, vigilancia de deriva, evaluación de equidad y evidencia de gobernanza. La evidencia consultada no demuestra aislamiento de RAG ni neutralización de prompt injection.",
        ],
      },
      {
        type: "h2",
        html: "Siguiente paso",
      },
      {
        type: "p",
        html: 'La oferta de entrada sigue siendo el AI Governance Snapshot de una semana: una organización y un sistema. Pregunta qué flujo o decisión cambia, quién tiene la autoridad, adónde se desplaza la revisión, quién mantiene las políticas, qué ocurre si esa persona no está y qué evidencia existe ya. No es un rediseño organizativo completo. <a href="/es/#diagnostic" data-bridge="snapshot">Solicitar AI Governance Snapshot</a>. El marco está en <a href="/es/dedalo/" data-bridge="dedalo">Dédalo</a>.',
      },
    ],
  },
];
