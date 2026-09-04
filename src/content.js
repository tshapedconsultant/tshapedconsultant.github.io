export const COVER = "/cover.png";
export const WHITEPAPER_PDF = "/Probabilistic-Models-Require-Deterministic-Governance.pdf";
export const CV_PDF = "/Andres-Lage-Freire-CV.pdf";

export const LINKS = {
  linkedin: "https://www.linkedin.com/in/andres-lage-freire-4562a91b1/",
  github: "https://github.com/tshapedconsultant",
  githubRepos: "https://github.com/tshapedconsultant?tab=repositories",
  medium: "https://medium.com/@andresl",
  pressRepsol:
    "https://www.lavozdegalicia.es/noticia/educacion/2018/03/15/alumnos-fp-unen-empresas-estudiantes-resolver-retos/0003_201803H15C6991.htm",
};

export const BRAND_DEFINITION =
  "AI Governance Engineering: the design and implementation of controls, accountability and evidence across the AI lifecycle.";

export const BEST_FIT =
  "Best fit: regulated and high-accountability AI use cases in financial services, insurance, critical operations, enterprise knowledge systems and agentic workflows.";

export const CTA = {
  primary: "Discuss an AI Governance Diagnostic",
  note: "30-minute introductory call · Explore fit and next steps",
};

export const DIAGNOSTIC_FORM = {
  kicker: "Or send context first",
  submit: "Send enquiry",
  sending: "Sending…",
  success: "Thank you. Your enquiry has been sent. I will reply to the work email you provided.",
  error: "The enquiry could not be sent. Please try again in a moment.",
  privacy:
    "No mailing list. No automated follow-up. Your details are used only to respond to this enquiry.",
  governPlaceholder:
    "For example: an internal RAG system, a customer-facing assistant, vendor AI, or an agentic workflow.",
  governHint: "A short description is enough.",
  stageLabel: "Current stage and likely scope",
  stages: [
    { value: "", label: "Select stage and scope" },
    { value: "Exploring AI governance needs.", label: "Exploring AI governance needs." },
    { value: "One AI use case.", label: "One AI use case." },
    { value: "Multiple use cases / programme.", label: "Multiple use cases / programme." },
    { value: "Enterprise-wide operating model.", label: "Enterprise-wide operating model." },
  ],
};

export const ENGAGEMENT = {
  title: "Engagement model",
  lines: [
    {
      label: "Diagnose",
      text: "establish risk, ownership, obligations and priority gaps.",
    },
    {
      label: "Architect",
      text: "turn findings into governance design, control requirements and an implementation backlog.",
    },
    {
      label: "Implement or assure",
      text: "build controls directly or govern delivery with your internal team or implementation partner.",
    },
  ],
};

export const AUDIENCE = [
  { id: "enterprise", label: "Enterprise leader", action: "Explore AI Governance", target: "why" },
  { id: "technical", label: "Technical leader", action: "Explore Runtime Architecture", target: "approach" },
  { id: "recruiter", label: "Recruiter", action: "View background and CV", target: "about" },
];

export const PROBLEMS = [
  {
    title: "Unmanaged risk",
    text: "Ownership, authority and residual risk sit nowhere — until an incident or a regulator asks.",
    icon: "shield",
  },
  {
    title: "Ungoverned agents",
    text: "Systems can retrieve, recommend and act without independent limits on access, decision or execution.",
    icon: "gears",
  },
  {
    title: "Missing audit evidence",
    text: "Proof is reconstructed after the fact instead of being generated continuously at the control boundary.",
    icon: "clipboard",
  },
];

export const APPROACH = [
  {
    id: "regulation",
    title: "Regulation",
    text: "Translate laws and standards into risk-based requirements.",
    icon: "scales",
  },
  {
    id: "governance",
    title: "Governance",
    text: "Assign ownership, authority, conditions and stop-rights.",
    icon: "doc",
  },
  {
    id: "engineering",
    title: "Engineering",
    text: "Design controls, policies and workflows as code.",
    icon: "gears",
  },
  {
    id: "runtime",
    title: "Runtime",
    text: "Enforce limits independently while the system operates.",
    icon: "shield",
  },
  {
    id: "evidence",
    title: "Evidence",
    text: "Produce an audit trail that can survive scrutiny.",
    icon: "clipboard",
  },
];

export const FRAMEWORKS = [
  { name: "EU AI Act", caption: "Risk-based obligations", icon: "stars" },
  { name: "ISO/IEC 42001", caption: "AI management system", icon: "globe" },
  { name: "NIST AI RMF", caption: "Risk management", icon: "shield" },
  { name: "DORA + NIS2", caption: "Operational resilience", icon: "building" },
];

export const DGOM = [
  { id: "plan", title: "PLAN", text: "Scope, ownership and risk appetite before build." },
  { id: "build", title: "BUILD", text: "Encode controls into design, SDLC and system boundaries." },
  { id: "deploy", title: "DEPLOY", text: "Independent gates, human approval and runtime enforcement." },
  { id: "monitor", title: "MONITOR", text: "Drift, evidence, residual risk and recalibration." },
];

export const CAPABILITIES = [
  {
    title: "Policy and governance",
    text: "Frameworks aligned with EU AI Act, ISO/IEC 42001 and your operating model.",
    icon: "doc",
  },
  {
    title: "AI risk assessment",
    text: "Identify, classify and prioritise AI risks across the lifecycle.",
    icon: "chart",
  },
  {
    title: "Controls as code",
    text: "Versioned, testable controls integrated into workflows and the stack.",
    icon: "code",
  },
  {
    title: "Runtime assurance",
    text: "Independent enforcement, kill switches and monitoring designed into the control architecture.",
    icon: "monitor",
  },
  {
    title: "Audit and evidence",
    text: "Audit trails, evidence packs and control testing.",
    icon: "clipboard",
  },
];

export const DELIVER = [
  {
    title: "Governance architecture",
    items: ["AI inventory", "Risk classification", "Control framework", "Governance operating model"],
  },
  {
    title: "Engineering",
    items: ["Policy-as-code", "SDLC gates", "Runtime controls", "Kill switches", "Human approval gates"],
  },
  {
    title: "Evidence",
    items: ["Audit trails", "Evidence packs", "Control testing", "Continuous monitoring"],
  },
  {
    title: "Executive output",
    items: ["Maturity assessment", "Risk register", "Board reporting", "90-day implementation roadmap"],
  },
];

export const DIAGNOSTIC = {
  title: "AI Governance Diagnostic",
  duration: "2–3 weeks",
  lead: "A 2–3 week engagement to identify AI risk, control gaps and a practical path to governed deployment.",
  outcome: "A board-ready risk view and an engineering-ready control plan.",
  steps: ["Assess", "Prioritise", "Architect", "Roadmap"],
  items: [
    "AI inventory and use-case triage",
    "Risk and regulatory applicability assessment",
    "Governance, security and lifecycle control-gap analysis",
    "DGOM maturity assessment",
    "Prioritised 90-day roadmap",
    "Executive readout and implementation backlog",
  ],
};

export const PROJECTS = [
  {
    num: "01",
    name: "Enterprise AI Risk Console",
    category: "Governance / ISO/IEC 42001",
    href: "https://github.com/tshapedconsultant/enterprise-ai-risk",
    stack: "FastAPI · YAML profiles · Jira gates · hash-chained audit",
    summary:
      "Vendor risk, controls as code, human gates, auditability and evidence. Deterministic triage from validated YAML profiles — missing evidence never reduces residual risk.",
    outcome: "Executable vendor governance: rules engine, HMAC-validated Jira gates, CI-deployed evidence packs.",
  },
  {
    num: "02",
    name: "Enterprise Data Analyst Agent",
    category: "Agentic AI / runtime controls",
    href: "https://github.com/tshapedconsultant/Enterprise-Data-Analyst-Agent",
    stack: "LangGraph · FastAPI · OpenAI · AST guards",
    summary:
      "Agents plus governance on execution. The graph owns flow; the model proposes; deterministic rules route, retry and constrain read-only SQL.",
    outcome: "Accountability and traceability in an agentic reporting system — the Deterministic Cage applied to query execution.",
  },
  {
    num: "03",
    name: "Porto Seguro Compliance Hub",
    category: "Regulated AI / evidence",
    href: "https://github.com/tshapedconsultant/porto-seguro-compliance-hub",
    stack: "EBM · Polars · Streamlit · SHA-256 evidence packs",
    summary:
      "EU AI Act, fairness, drift, explainability and evidence packs. Glass-box insurance-claim prediction with KS drift gates and JSON evidence artefacts.",
    outcome: "Reference architecture mapping EU AI Act Articles 9–15 to executable controls.",
  },
];

export const CREDENTIAL_GROUPS = [
  {
    label: "Recognition",
    items: [
      {
        kind: "Award",
        title: "Repsol Foundation Entrepreneurship Award",
        detail: "2018 · Innovation Project Lead",
        featured: true,
        note:
          "Co-led the team recognised for a platform connecting companies with students to address operational challenges. Developed through Lean experimentation and business-model validation with participating firms.",
        skills: [
          "Innovation leadership",
          "Corporate-challenge delivery",
          "Business-model validation with companies",
        ],
        sourceLabel: "La Voz de Galicia, 15 Mar 2018",
        sourceHref: LINKS.pressRepsol,
      },
      {
        kind: "Practice",
        title: "Independent Strategic AI Consultant & Responsible AI Architect",
        detail: "June 2021 – present",
      },
    ],
  },
  {
    label: "Education and credentials",
    items: [
      {
        kind: "Education",
        title: "Chemical Engineering (Plan Superior)",
        detail: "IQS School of Engineering – Universitat Ramon Llull · 247.5 ECTS",
      },
      {
        kind: "Programme",
        title: "Harvard SEAS — Agentic AI Foundations",
        detail: "2026",
      },
      {
        kind: "Programme",
        title: "Stanford Online — Cybersecurity and Executive Strategy",
        detail: "2026 · XACS302",
      },
      {
        kind: "Programme",
        title: "Oxford Saïd · UNESCO — AI, Justice, and the Rule of Law",
        detail: "2026",
      },
      {
        kind: "Programme",
        title: "Harvard Online — Innovation Strategy",
        detail: "Private Beta Cohort",
      },
      {
        kind: "Programme",
        title: "Oxford Saïd — AI Governance",
        detail: "Executive programme",
      },
      {
        kind: "Programme",
        title: "Stanford — Advanced Learning Algorithms · AI Awakening",
        detail: "Executive / online",
      },
      {
        kind: "Credential",
        title: "IAPP AIGP",
        detail: "In progress · exam scheduled 30 November 2026",
        inProgress: true,
      },
    ],
  },
  {
    label: "Publications and reference implementations",
    items: [
      {
        kind: "Publication",
        title: "Probabilistic Models Require Deterministic Governance",
        detail: "Whitepaper · tshapedconsultant",
      },
      {
        kind: "Articles",
        title: "On Medium",
        detail: "Essays on AI, ethics and strategy",
        href: LINKS.medium,
      },
      {
        kind: "Implementations",
        title: "Open reference implementations",
        detail: "github.com/tshapedconsultant",
        href: "https://github.com/tshapedconsultant?tab=repositories",
      },
    ],
  },
];

export const ABOUT_BLOCKS = [
  {
    title: "Engineering",
    text: "Python · FastAPI · LangGraph · Docker · APIs",
    icon: "code",
  },
  {
    title: "AI",
    text: "LLMs · RAG · Agents · MLOps · ML",
    icon: "monitor",
  },
  {
    title: "Governance",
    text: "EU AI Act · ISO/IEC 42001 · NIST AI RMF · GDPR",
    icon: "doc",
  },
  {
    title: "Strategy",
    text: "AI operating models · risk · architecture · executive advisory",
    icon: "people",
  },
];
