export const COVER = "/cover.png";
export const COVER_WEBP = "/cover.webp";
export const COVER_AVIF = "/cover.avif";
export const WHITEPAPER_PDF = "/Probabilistic-Models-Require-Deterministic-Governance.pdf";
export const WHITEPAPER_PDF_ES = "/Gobernanza-Determinista-IA.pdf";
export const CASE_STUDY_PDF = "/bbva-platform-ai-strategy-case-study.pdf";
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

export const LOCATION =
  "Based in Madrid · Working remotely across EMEA";

export const LOCATION_HERO = "Madrid · EMEA remote";

export const ABOUT_INTRO =
  "Responsible AI Architect. Independent Strategic AI Consultant since June 2021. Previously Cloud Implementation Specialist (Avaya Cloud Office at Concentrix). I work at the intersection of engineering, AI systems, governance and regulation — from architecture through deployment.";

export const ABOUT_SITE =
  "This site was designed and built by me with AI-assisted coding, treating accessibility, privacy, performance and auditability as first-class constraints.";

export const HERO = {
  tagline: "Responsible AI Architect · From regulation to runtime assurance",
  value:
    "I help CTOs, Heads of AI and Risk leaders turn AI obligations into controls that engineering can implement, test and evidence.",
  scope:
    "From AI inventory and EU AI Act readiness to governed agents, RAG security and runtime assurance.",
  principle: "Probabilistic models require deterministic governance.",
};

export const BEST_FIT =
  "Best fit: regulated and high-accountability AI use cases in financial services, insurance, critical operations, enterprise knowledge systems and agentic workflows.";

export const HERO_FOR = {
  audience:
    "For CTOs, Heads of AI and Risk/Compliance leaders in banking, insurance and energy.",
  problems:
    "Typical work: EU AI Act readiness, ISO/IEC 42001, and governance of RAG systems and agents.",
};

export const CTA = {
  primary: "Discuss an AI Governance Diagnostic",
  note: "30-minute introductory call · Explore fit and next steps",
};

export const DIAGNOSTIC_FORM = {
  kicker: "Or send context first",
  submit: "Send enquiry",
  sending: "Sending…",
  success: "Thank you. Your enquiry has been sent. I will reply to the work email you provided.",
  error: "The enquiry could not be sent. Please try again in a moment, or use the email button below.",
  errorFallback: "Open email with these details",
  notConfigured:
    "The enquiry form is not available yet. Please contact me via LinkedIn in the meantime.",
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
      icon: "clipboard",
    },
    {
      label: "Architect",
      text: "turn findings into governance design, control requirements and an implementation backlog.",
      icon: "doc",
    },
    {
      label: "Implement or assure",
      text: "build controls directly or govern delivery with your internal team or implementation partner.",
      icon: "gears",
    },
  ],
};

export const ARTICLE = {
  hash: "agentic-ai-montesquieu",
  kicker: "Article",
  title: "Agentic AI and Montesquieu: Why Autonomous Systems Need Separation of Powers",
  standfirst:
    "Most critical AI incidents now happen at runtime. Without an independent power that can stop the system, agentic architecture concentrates control in the model itself.",
  meta: "Andrés Lage Freire · 15 July 2026",
  excerpt:
    "Agentic systems that reason, decide, execute and self-evaluate concentrate power in the model. Separation of powers — applied as Runtime Checks & Balances — is the condition for EU AI Act Art. 14 and DORA.",
};

export const HYBRID_ARTICLE = {
  hash: "hybrid-profiles",
  kicker: "Article",
  title: "Why Hybrid Profiles May Have an Advantage in the Age of AI Agents",
  standfirst: "AI makes application cheaper. Fundamentals may become more valuable.",
  meta: "Andrés Lage Freire · 7 September 2026",
  excerpt:
    "As AI agents make specialised execution cheaper, the advantage may shift toward people who can connect specialist capabilities, understand the underlying systems and exercise judgment across domains.",
  figure: "/hybrid-profiles-ai-agents.jpg",
  figureWebp: "/hybrid-profiles-ai-agents.webp",
  figureAvif: "/hybrid-profiles-ai-agents.avif",
  figureAlt:
    "Infographic of a hybrid professional on a bridge between specialist depth — engineering, data science, security, business and regulation — and AI-agent leverage: research, code, analyse, plan, test, execute, monitor and document. Labels: understand, connect, evaluate, integrate, direct.",
  figureCaption:
    "Specialists provide depth. AI agents provide leverage. Hybrid professionals connect them.",
};

export const CASE_STUDIES = {
  lede: "A regulated-bank view of platform architecture, applied AI and model oversight — written for CTOs and Risk leaders who need to see how governance sits inside a production operating model.",
  items: [
    {
      id: "bbva-platform-ai",
      kicker: "Case study · 2025",
      client: "BBVA",
      sector: "Global banking",
      title: "Platform and AI strategy",
      role: "Independent strategic analysis",
      problem:
        "A global incumbent cannot serve tens of millions of clients with hyper-personalised financial health — or put generative AI into the workforce — unless the digital core, data platform and model estate are unified. Without a model inventory, bias controls and EU AI Act / BCBS 239 alignment, scale spends the one asset banking cannot replace: trust.",
      approach: [
        "Treat the mobile app as the primary platform: a unified digital architecture (Horizon) across key geographies, with the ADA global data platform on AWS feeding models in real time.",
        "Keep core IP in an in-house AI Factory for personalisation and risk, and partner for infrastructure and frontier tools — AWS, OpenAI ChatGPT Enterprise and Google Cloud Gemini.",
        "Move from generic product screens to an AI Financial Coach: categorise transactions, predict balances and recommend specific actions rather than generic tips.",
        "Put generative AI into employee workflows so legal, drafting and complex query work is accelerated, and human time is reallocated to high-touch advice and model governance.",
      ],
      outcomes: [
        "78.1 million active clients, 79% mobile penetration and 61% of unit sales through digital channels (March 2025).",
        "More than 11,000 employees on ChatGPT Enterprise, saving on average two hours a week.",
        "Corporate and Investment Banking revenue up 36% in Q1 2025; 1.8 million fully digital accounts in Mexico; mobile response time cut by a factor of six.",
      ],
      governance:
        "Governance is treated as a competitive edge: a centralised AI model inventory, ongoing bias-reduction work, and proactive alignment with the EU AI Act — so innovation can accelerate only if oversight keeps pace.",
      note: "Independent strategic analysis by Andrés Lage Freire; not authored or endorsed by BBVA. Figures as reported in the analysis (March 2025 and Q1 2025).",
      pdf: CASE_STUDY_PDF,
    },
  ],
};

export const SOCIAL_PROOF = [
  {
    id: "repsol-award",
    text: "Repsol Foundation Entrepreneurship Award · 2018",
    href: LINKS.pressRepsol,
    external: true,
  },
  {
    id: "bbva-case",
    text: "Case study: BBVA platform and AI strategy",
    href: CASE_STUDY_PDF,
    download: true,
  },
  {
    id: "whitepaper",
    text: "Whitepaper: Probabilistic Models Require Deterministic Governance",
    href: WHITEPAPER_PDF,
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
    text: "Fairness, accountability, transparency and privacy as operational requirements — especially under EU rules.",
    href: "https://medium.com/@andresl/ethical-principles-of-artificial-intelligence-the-imperative-for-compliance-684e9a975a29",
    icon: "scales",
  },
  {
    title: "AI’s Coding Fluency: The Strategic Imperative for a New Human-Machine Operating Model",
    text: "Why fluency in code still requires human governance, strategy and ethical guardrails.",
    href: "https://medium.com/@andresl/ais-coding-fluency-the-strategic-imperative-for-a-new-human-machine-operating-model-deec01a25fc2",
    icon: "code",
  },
  {
    title: "Why Working with AI is Like Horsemanship",
    text: "Human judgment steers capability. The operating model — not the model — decides outcomes.",
    href: "https://medium.com/@andresl/why-working-with-ai-is-like-horsemanship-8a0e06b7da2b",
    icon: "people",
  },
  {
    title: "Agile in the Age of AI: Why the Practices Are Disrupting But the Principles Endure",
    text: "AI changes delivery rituals. Accountability and human interaction still govern the work.",
    href: "https://medium.com/@andresl/agile-in-the-age-of-ai-why-the-practices-are-disrupting-but-the-principles-endure-cde7194a3ddd",
    icon: "gears",
  },
];

export const AUDIENCE = [
  { id: "enterprise", label: "Enterprise leader", action: "Explore AI Governance", target: "why" },
  { id: "technical", label: "Technical leader", action: "Explore Runtime Architecture", target: "approach" },
  { id: "recruiter", label: "Recruiter", action: "View background and CV", target: "about" },
];

export const PROBLEMS = [
  {
    title: "Unmanaged AI risk",
    subtitle: "No owner, no residual-risk view — until an incident.",
    text: "Ownership, authority and residual risk sit nowhere — until an incident or a regulator asks.",
    icon: "shield",
  },
  {
    title: "Ungoverned agents",
    subtitle: "They retrieve, decide and act with no independent stop.",
    text: "Systems can retrieve, recommend and act without independent limits on access, decision or execution.",
    icon: "gears",
  },
  {
    title: "No audit evidence",
    subtitle: "Proof is rebuilt after the fact, not generated at runtime.",
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
    text: "Independent limits on access, decision and execution while the system operates.",
    icon: "shield",
  },
  {
    id: "evidence",
    title: "Evidence",
    text: "Produce an audit trail that can survive scrutiny.",
    icon: "clipboard",
  },
];

export const MAPPING_TEASER = {
  kicker: "EU AI Act",
  title: "From article to evidence pack",
  text: "See which obligations apply, the independent runtime controls that implement them, and the artefacts an auditor would inspect.",
  cta: "Open the mapping",
};

export const FRAMEWORKS = [
  { name: "EU AI Act", caption: "Risk-based obligations", icon: "stars" },
  { name: "ISO/IEC 42001", caption: "AI management system", icon: "globe" },
  { name: "NIST AI RMF", caption: "Risk management", icon: "shield" },
  { name: "DORA + NIS2", caption: "Operational resilience", icon: "building" },
];

export const DGOM = [
  { id: "plan", title: "PLAN", text: "Scope, ownership and risk appetite before build." },
  { id: "build", title: "BUILD", text: "Encode controls into design, SDLC and system boundaries." },
  { id: "deploy", title: "DEPLOY", text: "Independent gates, human approval and runtime controls." },
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
    title: "Independent runtime controls",
    text: "Kill switches and monitoring designed into the control architecture.",
    icon: "monitor",
  },
  {
    title: "Audit-ready evidence",
    text: "Decision traces, hashed artefacts and control testing.",
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
    items: ["Compliance-as-code", "SDLC gates", "Runtime controls", "Kill switches", "Human approval gates"],
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
  lead:
    "Two ways in: a focused Diagnostic to establish the starting point, or the Diagnostic plus an Assurance Blueprint when you are ready to design the controls.",
  position:
    "I work directly with those who design and build the controls, without splitting strategy, implementation and evidence across several layers.",
  negatives: [
    "Not a law-firm memo.",
    "Not a Big Four slide deck.",
    "Not another layer of committee delay.",
  ],
  hybrid:
    "One senior practitioner turns AI decisions into executable controls, lifecycle gates and evidence — without the hand-offs.",
  bands: [
    {
      id: "diagnostic",
      name: "AI Governance Diagnostic",
      price: "€4,500",
      vat: "excl. VAT",
      for: "For organisations that need a clear starting point.",
      includesLabel: "Includes",
      includes: [
        "AI inventory and use-case triage",
        "Initial risk and obligation view",
        "Priority control-gap assessment",
        "90-day implementation backlog",
        "Executive readout",
      ],
      delivery: "Typical delivery: 2 weeks.",
    },
    {
      id: "blueprint",
      name: "Diagnostic + Assurance Blueprint",
      price: "€6,500",
      vat: "excl. VAT",
      for: "For organisations ready to design the controls.",
      includesLabel: "Includes everything in the Diagnostic, plus",
      includes: [
        "Detailed control architecture",
        "EU AI Act / ISO/IEC 42001 mapping",
        "Evidence design",
        "Agent or RAG assurance review",
        "Engineering and Risk working session",
      ],
      delivery: "Typical delivery: 3 weeks.",
    },
  ],
  priceNote: "€500/day equivalent. The introductory call is unpaid. Scope is confirmed in writing before work starts.",
  bandsLabel: "Diagnostic offers",
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
    label: "Governance credentials",
    intro:
      "Governance credentials focused on EU AI Act, ISO/IEC 42001-style AI management systems, bias/ethics, and organisational accountability.",
    items: [
      {
        kind: "Credential",
        title: "IAPP AIGP",
        detail: "In progress · exam scheduled 30 November 2026",
        inProgress: true,
      },
      {
        kind: "Programme",
        title: "AI Governance · Oxford Saïd",
        detail: "Online programme · Completed 2026",
      },
      {
        kind: "Programme",
        title: "AI and European Union Law: Navigating Regulatory Compliance",
        detail: "Online programme · October 2025",
      },
      {
        kind: "Programme",
        title: "AI, Justice, and the Rule of Law · Oxford Saïd · UNESCO",
        detail: "Online programme · September 2026",
      },
      {
        kind: "Programme",
        title: "AI Strategy and Governance · Wharton Online",
        detail: "Online programme · August 2025",
      },
      {
        kind: "Programme",
        title: "Trustworthy AI: Managing Bias, Ethics, and Accountability · Johns Hopkins",
        detail: "Online programme · August 2025",
      },
    ],
  },
  {
    label: "Technical programmes",
    items: [
      {
        kind: "Programme",
        title: "Agentic AI with Andrew Ng · DeepLearning.AI",
        detail: "Online programme · November 2025",
      },
      {
        kind: "Programme",
        title: "Retrieval Augmented Generation (RAG) · DeepLearning.AI",
        detail: "Online programme · August 2026",
      },
      {
        kind: "Programme",
        title: "Agentic AI Foundations · Harvard SEAS",
        detail: "Online programme · 2026",
      },
      {
        kind: "Programme",
        title: "Artificial Intelligence: Industrial Control Systems Security · Johns Hopkins",
        detail: "Online programme · March 2026",
      },
      {
        kind: "Programme",
        title: "Cybersecurity and Executive Strategy · Stanford Online",
        detail: "Online programme · 2026 · XACS302",
      },
      {
        kind: "Programme",
        title: "Advanced Learning Algorithms · AI Awakening · Stanford",
        detail: "Online programme",
      },
      {
        kind: "Programme",
        title: "Innovation Strategy · Harvard Online",
        detail: "Online programme · Private Beta Cohort",
      },
    ],
  },
  {
    label: "Education",
    intro:
      "Engineering foundation with strong quantitative and systems focus; later specialisation in AI, governance and regulation.",
    items: [
      {
        kind: "Education",
        title: "Chemical Engineering (Plan Superior) · IQS School of Engineering – Universitat Ramon Llull",
        detail: "247.5 ECTS",
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
        href: "/whitepaper",
      },
      {
        kind: "Case study",
        title: "BBVA: Platform and AI Strategy",
        detail: "Independent strategic analysis by Andrés Lage Freire; not authored or endorsed by BBVA · 2025",
        href: "#case-studies",
      },
      {
        kind: "Article",
        title: "Why Hybrid Profiles May Have an Advantage in the Age of AI Agents",
        detail: "Fundamentals, T-shape and judgment in agentic systems · 7 September 2026",
        href: "/hybrid-profiles",
      },
      {
        kind: "Article",
        title: "Agentic AI and Montesquieu",
        detail: "Why autonomous systems need separation of powers · 15 July 2026",
        href: "/agentic-ai-montesquieu",
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
