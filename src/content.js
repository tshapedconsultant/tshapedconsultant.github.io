import { pulseInsights } from "./data/pulseLibrary.ts";

export const COVER = "/cover.png";
export const COVER_WEBP = "/cover.webp";
export const COVER_AVIF = "/cover.avif";
export const WHITEPAPER_PDF = "/Probabilistic-Models-Require-Deterministic-Governance.pdf";
export const WHITEPAPER_PDF_ES = "/Gobernanza-Determinista-IA.pdf";
export const EXECUTIVE_BRIEF_PDF = "/Dedalo-Executive-Brief.pdf";
export const CASE_STUDY_PDF = "/bbva-platform-ai-strategy-case-study.pdf";
export const RESUME_MATCHING_PDF = "/responsible-ai-resume-job-matching.pdf";

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
  "Responsible AI Architect. Independent Strategic AI Consultant since June 2021. Previously Cloud Implementation Specialist (Avaya Cloud Office at Concentrix). I work at the intersection of engineering, AI systems, governance and regulation — from architecture through deployment: rather than stopping at policy slideware, I build deterministic control planes and runnable demonstrations that translate OWASP LLM Top 10 v2025, OWASP Agentic Top 10 2026, the EU AI Act and ISO/IEC 42001 into auditable code.";

export const ABOUT_SITE =
  "This site was designed and built by me with AI-assisted coding, treating accessibility, privacy, performance and auditability as first-class constraints.";

export const HERO = {
  kicker: "Andrés Lage Freire · TShaped Consultant · AI Governance Engineering",
  headline: "Executable governance for AI systems that can access, decide and act.",
  tagline: "Move your AI systems to production with verifiable controls",
  value:
    "I design technical controls, runtime limits and verifiable evidence for RAG, copilots, agents and high-impact workflows.",
  assets:
    "I help AI, engineering and risk teams turn regulatory obligations and AI runtime risk into runtime AI governance through independent access, authority and evidence controls.",
  pills: ["EU AI Act", "Agentic AI Governance", "Runtime Assurance"],
  qualify:
    "For CISOs, CTOs, risk leaders and teams moving AI from pilot to production.",
  scope:
    "90-second runtime risk check, bounded technical review and runtime control architecture.",
  principle: "Governance is not documented. It is executed. Probabilistic models require deterministic governance.",
  executiveSummary: [
    {
      question: "1. What concrete problem do I solve?",
      answer:
        "I prevent RAG systems, copilots and agents from reaching production with excessive data access, unchecked tool execution or missing audit trails.",
    },
    {
      question: "2. What will you receive and how long does it take?",
      answer:
        "In 90 seconds you get a preliminary diagnostic (AI Runtime Risk Check). In 1 week you receive the AI Governance Snapshot (From €2,495): a technical gap map and 3 to 5 priority controls.",
    },
    {
      question: "3. How do we start?",
      answer:
        "Complete the 6-question AI Runtime Risk Check or request a 30-minute scoping call for your system.",
    },
  ],
};

export const PATH_SELECTOR = {
  title: "What brings you here?",
  subtitle:
    "Who detects the problem → who validates the technical solution → who approves the budget → who refers or co-delivers the engagement.",
  threeEntries: [
    {
      id: "direct",
      title: "Direct buyer route",
      role: "For CTOs, CISOs, Heads of AI, Risk & technology leaders",
      cta: "Check my system's risk",
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
      title: "Internal technical route",
      role: "For architects, engineers & Red Team Leads",
      cta: "Watch the technical demo",
      steps: [
        "HR Copilot",
        "Runtime control demo",
        "Technical validation",
        "Internal recommendation to decision-maker",
      ],
      target: "hr-copilot-case",
    },
    {
      id: "partner",
      title: "Partner route",
      role: "For law firms, Big Four & consultancies",
      cta: "Explore co-delivery",
      steps: [
        "From Legal PDF to Code",
        "Workshop or Hackathon",
        "Co-delivery",
        "Client engagement",
      ],
      target: "partners",
    },
  ],
  options: [
    {
      id: "evaluate",
      label: "Check my system's risk",
      sub: "AI Runtime Risk Check → AI Governance Snapshot",
      target: "risk-check",
      intent: "snapshot",
    },
    {
      id: "train",
      label: "I want to train my engineering team",
      sub: "From Legal PDF to Code → In-Company Workshop or Hackathon",
      target: "enablement",
      intent: "workshop",
    },
    {
      id: "partner",
      label: "I am looking for a technical partner",
      sub: "HR Copilot → Runtime control demo → Technical validation",
      target: "hr-copilot-case",
      intent: "snapshot",
    },
    {
      id: "codelivery",
      label: "I want to explore co-delivery",
      sub: "Referral, co-delivery or white-label for your client project",
      target: "partners",
      intent: "partners",
    },
  ],
};

export const PAIN_SECTION = {
  kicker: "01 · The runtime problem",
  title:
    "Your system can be governed on paper and still be vulnerable at runtime.",
  lead:
    "An AI policy alone does not stop an agent from calling an unauthorised tool, retrieving restricted data or executing an action nobody can reconstruct afterwards.",
  text:
    "An AI policy alone does not stop an agent from calling an unauthorised tool, retrieving restricted data or executing an action nobody can reconstruct afterwards.",
  cards: [
    {
      id: "access",
      icon: "shield",
      title: "Access",
      subtitle: "What data and tools can it use?",
      question: "What data and tools can it use?",
      text:
        "Without per-user, document or row-level authorisation, the system can retrieve or expose information the user should not see.",
      detail:
        "Without per-user, document or row-level authorisation, the system can retrieve or expose information the user should not see.",
    },
    {
      id: "authority",
      icon: "gears",
      title: "Authority",
      subtitle: "What can it decide or execute without approval?",
      question: "What can it decide or execute without approval?",
      text:
        "If the model decides when to invoke tools or modify systems, a manipulated instruction can become a real-world action.",
      detail:
        "If the model decide when to invoke tools or modify systems, a manipulated instruction can become a real-world action.",
    },
    {
      id: "evidence",
      icon: "clipboard",
      title: "Evidence",
      subtitle: "Can you prove what happened and why?",
      question: "Can you prove what happened and why?",
      text:
        "Storing only prompt and response is insufficient to reconstruct identity, applied policy, tool parameters and outcome after an incident.",
      detail:
        "Storing only prompt and response is insufficient to reconstruct identity, applied policy, tool parameters and outcome after an incident.",
    },
  ],
  cta: "Check my system's risk",
};

export const FEATURED_HR_COPILOT = {
  kicker: "Runnable demonstration · Featured case",
  badge: "HR Copilot — Technical Governance Implementation (TGI v1)",
  title: "Same model. Same prompts. Two risk postures.",
  subtitle:
    "A runnable demonstration of how a deterministic control plane turns a vulnerable copilot into a bounded, supervised and auditable system.",
  acts: [
    {
      id: "act-1",
      label: "Act I · Without governance",
      title: "The model decides and chains tools without an independent gate",
      text: "Against the same adversarial prompts over synthetic HR data, a single query chains unauthorised tools and exposes executive compensation, personal data, M&A plans and internal credentials in under 60 seconds.",
      tone: "risk",
    },
    {
      id: "act-2",
      label: "Act II · With TGI v1",
      title: "Deterministic control plane wrapping the exact same model",
      text: "Without changing the model, the TGI v1 layer intercepts every step with 8 deterministic controls: input classification, tool allowlist, row-level authorisation, human approval (HITL), output DLP and SIEM-ready logging.",
      tone: "governed",
    },
  ],
  controlsTitle: "8 deterministic runtime controls",
  controls: [
    "1. Structural prompt isolation",
    "2. Deterministic input classification",
    "3. Closed tool allowlist",
    "4. Contextual row-level & identity authorisation",
    "5. Human-in-the-loop (HITL) approval gate",
    "6. Output Data Loss Prevention (DLP)",
    "7. Secret & credential hygiene blocking",
    "8. Structured decision trace for SIEM & audit",
  ],
  resultClaim: "The demonstration produced no sensitive findings across the test suite used.",
  scopeNote:
    "Outcome strictly bounded to the synthetic test suite of this demonstration. No control eliminates all risk or replaces testing in the client's production environment.",
  video: "/agent-fail-version-1.mp4",
  poster: "/agent-fail-version-1-poster.jpg",
  captions: "/agent-fail-version-1.es.vtt",
  videoCaption:
    "Two-act walkthrough (Spanish audio, subtitles included): Act I (ungoverned) versus Act II (with the 8 deterministic controls of TGI v1).",
  videoCta: "Watch demonstration video",
  docsCta: "View technical documentation & mapping",
  docsHref: "/governance/eu-ai-act-mapping",
};

export const ENABLEMENT_PROGRAMS = {
  kicker: "In-Company Entry Formats · From Legal PDF to Code",
  title: "How to translate the EU AI Act into your engineering pipeline",
  lead:
    "I do not sell generic AI awareness training. I run hands-on technical working sessions for CTOs, Lead Developers, Chief Risk Officers and Product Managers who need to translate regulatory duties into deterministic controls, unit tests and runtime architecture.",
  audienceTag: "For CTOs, Lead Developers, Chief Risk Officers and Product Managers",
  formats: [
    {
      id: "briefing",
      intent: "briefing",
      badge: "Format A · Executive & Technical Leadership",
      duration: "45 min · Closed briefing or working breakfast",
      price: "On request / Complimentary for qualified teams",
      title: "Executive Briefing: The 3 technical blind spots the EU AI Act exposes in your SaaS",
      hook:
        "Why a legal memo alone cannot govern a probabilistic model, and how regulation requires independent deterministic controls over copilots and agents at runtime.",
      topics: [
        "Where written policy breaks down during real runtime execution",
        "Why prompt guardrails do not replace an independent control architecture",
        "What verifiable technical evidence an enterprise buyer or auditor will inspect",
      ],
      cta: "Request Executive Briefing",
    },
    {
      id: "workshop",
      intent: "workshop",
      badge: "Format B · In-Company Icebreaker",
      duration: "3 to 4 hours · Private session for engineering teams",
      price: "€1,200 – €1,800 (flat fee per company)",
      title: "In-Company Workshop: AI Governance for Engineers — From regulation to unit tests",
      hook:
        "A frictionless budget ticket that a CTO or VP of Engineering can approve directly from quarterly engineering or training budgets without heavy procurement.",
      topics: [
        "Practical mapping from EU AI Act articles to testable software requirements",
        "Safe agentic architectures and runtime separation of powers",
        "Implementing deterministic controls, tool allowlists and CI/CD gates in code",
        "Final 30 mins: live Gap Analysis + 6-month Implementation Roadmap deliverable",
      ],
      cta: "Book In-Company Workshop",
    },
    {
      id: "hackathon",
      intent: "hackathon",
      badge: "Format C · Hands-on Architecture Lab",
      duration: "Full day (8 hours) · Theory + your live architecture",
      price: "€2,500 – €3,000",
      title: "Joint Audit Hackathon on your own product",
      hook:
        "Start closing real architecture gaps from day one by working side-by-side with your engineers on your actual RAG, copilot or agent stack.",
      topics: [
        "Morning (4 h): technical risk mitigation across access, authority, fail-safe and evidence",
        "Afternoon (4 h): joint inspection of your architecture and code against EU AI Act & OWASP",
        "Deliverable: visual vulnerability gap map and prioritised control roadmap",
      ],
      cta: "Request Joint Audit Hackathon",
    },
  ],
  bridge: {
    kicker: "From workshop to production sprints",
    title: "Every session closes with a 30-minute Gap Analysis and Implementation Roadmap",
    text:
      "Workshops never end as a disconnected lecture. In the final 30 minutes we contrast your current architecture against required runtime controls and deliver a visual Implementation Roadmap. Your engineers can implement it themselves, or bring me into your sprints over the next 4 weeks as a Fractional Architect to leave the guardrails, gates and testing framework running in production.",
  },
};

export const AUTHORITY_ARCHITECTURE = {
  kicker: "Verifiable authority & track record",
  title: "From risk signal to auditable architecture",
  lead: "Engineering, regulation and runnable proof structured in four clear steps:",
  blocks: [
    {
      step: "01",
      title: "What problem I solve",
      summary:
        "RAG systems, copilots and agents moving into production with written policies but no technical gates over data access, tool invocation, fail-safe stops and evidence.",
      items: [
        "Excessive retrieval access over internal knowledge bases",
        "Agentic autonomy without independent validation or human approval",
        "Decisions that cannot be reconstructed during an incident or audit",
      ],
    },
    {
      step: "02",
      title: "What I build",
      summary:
        "Deterministic control planes, security validators and reference architectures that bound probabilistic systems at runtime.",
      items: [
        "HR Copilot TGI v1 — 8 deterministic controls over agents",
        "RAG Security Validator — retrieval boundary gate against prompt injection",
        "Enterprise AI Risk Console — deterministic triage and SHA-256 hash-chained evidence",
        "DGOM™ and Dédalo™ — operating model and constitutional architecture",
      ],
    },
    {
      step: "03",
      title: "What proves my work",
      summary:
        "External recognition, banking platform strategy analysis and open operational frameworks.",
      items: [
        "Repsol Foundation Entrepreneurship Award (2018)",
        "Case study: BBVA platform and AI strategy (independent analysis)",
        "Responsible AI Framework for resume–job matching",
        "Whitepaper: Probabilistic Models Require Deterministic Governance",
      ],
    },
    {
      step: "04",
      title: "What the client can buy",
      summary:
        "Bounded engagements with clear technical deliverables and transparent pricing guidance.",
      items: [
        "AI Runtime Risk Check — 90-second preliminary check (free)",
        "AI Governance Snapshot — 1-week bounded technical review (From €2,495)",
        "Blueprint & Runtime Assurance — Control design and implementation (From €6,500 / scoped)",
      ],
    },
  ],
};

export const BEST_FIT =
  "Best fit: regulated and high-accountability AI use cases in financial services, insurance, critical operations, enterprise knowledge systems and agentic workflows.";

export const HERO_FOR = {
  audience:
    "For CISOs, CTOs, risk leaders and product teams moving AI systems from pilot to governed operation.",
  problems:
    "Typical work: EU AI Act readiness, ISO/IEC 42001, and governance of RAG systems, copilots and agents.",
};

export const CTA = {
  primary: "Check my system's risk",
  secondary: "Watch the technical demo",
  persistentPrimary: "Check my risk",
  persistentSecondary: "Request diagnostic",
  note: "For a high-impact RAG system, copilot, agent or workflow · Scope and pricing confirmed after a 30-minute call.",
};

export const DIAGNOSTIC_FORM = {
  kicker: "Commercial enquiry & technical diagnostic",
  title: "Request a diagnostic or technical review",
  lead: "Tell me which system you are deploying or evaluating and what access, authority or evidence gap you need to resolve.",
  submit: "Request diagnostic",
  sending: "Sending…",
  success: "Thank you. I will reply with the recommended next step for your system.",
  error: "The enquiry could not be sent right now. Please try again in a moment, or use the direct email link.",
  errorFallback: "Open email with these details",
  notConfigured:
    "The enquiry form is not available in this environment. Please contact me via LinkedIn or email.",
  privacy:
    "No marketing list. Your details are used solely to review and respond to this request.",
  privacyLinkText: "View privacy & data retention policy",
  systemTypeLabel: "System type",
  systemTypes: [
    { value: "", label: "Select system type" },
    { value: "Chatbot or conversational assistant", label: "Chatbot or conversational assistant" },
    { value: "RAG over internal documentation", label: "RAG over internal documentation" },
    { value: "Copilot connected to tools", label: "Copilot connected to tools" },
    { value: "Agent that can execute actions", label: "Agent that can execute actions" },
    { value: "Multiple systems / AI programme", label: "Multiple systems / AI programme" },
    { value: "Advisory / Big 4 / Law firm (Co-delivery or White-Label)", label: "Advisory / Big 4 / Law firm (Co-delivery or White-Label)" },
  ],
  capabilityLabel: "What can the system do?",
  capabilities: [
    { value: "", label: "Select primary capability" },
    { value: "Only respond or summarise", label: "Only respond or summarise" },
    { value: "Create drafts or recommendations", label: "Create drafts or recommendations" },
    { value: "Query internal systems or data", label: "Query internal systems or data" },
    { value: "Modify data or trigger actions", label: "Modify data or trigger actions" },
    { value: "Still being defined", label: "Still being defined" },
  ],
  concernLabel: "What is your main concern?",
  governPlaceholder:
    "For example: retrieval permissions in RAG, tool calls without human approval, missing audit trail, or moving from pilot to production.",
  governHint: "A short summary is enough. Do not include secrets, credentials or confidential client names.",
  consentLabel:
    "I agree to the processing of my professional contact details to receive a reply related to this request.",
  partnerNeedPlaceholder: "Describe the technical layer needed — controls, evidence, gates or a bounded PoV. Do not name clients or matters.",
  discussPlaceholder: "What you would like to discuss. Do not include confidential client or matter names.",
  callerLabel: "Who is contacting you?",
  callers: [
    { value: "", label: "Select one" },
    { value: "organisation", label: "Organisation looking for AI governance support" },
    { value: "legal", label: "A legal or compliance partner" },
    { value: "consulting", label: "A consulting or delivery partner" },
    { value: "peer", label: "A researcher or peer" },
    { value: "other", label: "Other" },
  ],
  intentLabel: "Service or workshop of interest",
  intents: [
    { value: "snapshot", label: "AI Governance Snapshot (From €2,495)" },
    { value: "workshop", label: "In-Company Workshop 'From Legal PDF to Code' (€1,200–€1,800)" },
    { value: "hackathon", label: "Joint Audit Hackathon — 1 day (€2,500–€3,000)" },
    { value: "briefing", label: "Executive Briefing (45 min · CTO / CRO / leadership)" },
    { value: "blueprint", label: "Blueprint & Runtime Assurance (From €6,500)" },
    { value: "fractional", label: "Implementation / Fractional Architect in sprints" },
    { value: "partners", label: "Partner / Co-delivery (Consultancies, Big 4 & Law Firms)" },
    { value: "other", label: "General enquiry" },
  ],
  roleLabel: "Role",
  practiceLabel: "Practice area",
  deliveryLabel: "Delivery model of interest",
  ndaLabel: "May an NDA be required?",
  deliveries: [
    { value: "", label: "Select a delivery model" },
    { value: "Referral", label: "Referral" },
    { value: "Co-delivery", label: "Co-delivery" },
    { value: "White-label support", label: "White-label support" },
    { value: "Not sure yet", label: "Not sure yet" },
  ],
  ndaOptions: [
    { value: "", label: "Select if known" },
    { value: "Yes", label: "Yes" },
    { value: "No", label: "No" },
    { value: "Not sure yet", label: "Not sure yet" },
  ],
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
  title: "How we work step by step",
  lines: [
    {
      label: "1. Diagnose",
      text: "AI Runtime Risk Check: detect exposure, autonomy and missing evidence in 90 seconds.",
      icon: "clipboard",
    },
    {
      label: "2. Assess",
      text: "AI Governance Snapshot: bounded technical review of architecture, risks and priority actions.",
      icon: "doc",
    },
    {
      label: "3. Design & implement",
      text: "Blueprint & Runtime Assurance: design and implementation of controls, gates, oversight and evidence.",
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
  lede: "Two operating views for CTOs and Risk leaders: how governance sits inside a production bank, and how a hiring model is kept fair from the rulebook to the appeal.",
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
    {
      id: "resume-job-matching",
      kicker: "Framework · 2026",
      client: "Resume–job matching",
      sector: "Talent acquisition",
      title: "Responsible AI framework",
      role: "Operating design · Andrés Lage Freire",
      problem:
        "Can AI decide who gets hired without inheriting our biases? This Responsible AI framework for resume matching says yes, but only if humans never leave the loop. It covers the full lifecycle: fair rules upfront, bias audits before training, explainable models, and ongoing fairness checks.",
      approach: [
        "Agree the job-related features with HR, hiring managers and D&I before the model sees a CV. Age, gender and other personal factors stay out of scope.",
        "Audit historical hiring data and write the correction plan before training, so the model does not learn the biased record.",
        "Assign a RACI for every decision the system touches. Candidates receive a GDPR Article 13 notice: that AI is used, which criteria apply, and how to appeal.",
        "Hold the model out of final testing until data quality and fairness metrics clear internal thresholds. The score ships with a plain explanation, not a black box.",
        "Red-team the matcher. Keyword stuffing and unrelated credentials must not flip a fair decision.",
        "Issue Strong Match or Strong Reject only at high confidence. Ambiguous cases go to mandatory human review. A Strong Reject needs both the hiring manager and the D&I lead.",
        "Log every human override with a reason. Monitor fairness, shifts in how resumes are written, time-to-hire, and the candidates a reviewer kept in the process. An AI Ethics Review Board can pause the system.",
      ],
      outcomes: [
        "Mandatory human review when the AI is unsure.",
        "Dual approval before any rejection.",
        "A real appeals channel.",
        "AI brings speed. Fairness stays human.",
      ],
      governance:
        "Human oversight is the control, not a disclaimer. Confidence limits, dual approval, logged overrides and a candidate appeal keep the probabilistic score inside a deterministic decision path — the same pattern as a lifecycle gate: early human triage, a harder stop before a person is turned away, and a board that can halt the system.",
      note: "Responsible AI operating framework written by Andrés Lage Freire. It specifies the controls. It is not a report of a named deployment, and it is not legal advice.",
      pdf: RESUME_MATCHING_PDF,
      downloadLabel: "Download the framework (PDF)",
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
    id: "resume-matching",
    text: "Framework: Responsible AI for resume–job matching",
    href: RESUME_MATCHING_PDF,
    download: true,
  },
  {
    id: "whitepaper",
    text: "Whitepaper: Probabilistic Models Require Deterministic Governance",
    href: WHITEPAPER_PDF,
    download: true,
  },
  {
    id: "executive-brief",
    text: "Dédalo™ Executive Brief — Deterministic Cage in two pages",
    href: EXECUTIVE_BRIEF_PDF,
    download: true,
  },
];

const ENGLISH_ESSAYS = pulseInsights("en");

export const INSIGHTS = [
  {
    title: ARTICLE.title,
    text: ARTICLE.excerpt,
    href: "/agentic-ai-montesquieu",
    icon: "scales",
    internal: true,
    featured: true,
  },
  ...ENGLISH_ESSAYS.slice(0, 8),
  {
    title: HYBRID_ARTICLE.title,
    text: HYBRID_ARTICLE.excerpt,
    href: "/hybrid-profiles",
    icon: "people",
    internal: true,
  },
  ...ENGLISH_ESSAYS.slice(8),
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
  { id: "recruiter", label: "Recruiter", action: "View background", target: "about" },
];

export const PROBLEMS = [
  {
    title: "Access",
    subtitle: "What data and tools can it use?",
    text: "Without per-user, document or row-level authorisation, the system can retrieve restricted data or call unapproved tools.",
    icon: "shield",
  },
  {
    title: "Authority",
    subtitle: "What can it decide or execute without approval?",
    text: "If the model decides when to use tools or modify systems without an independent gate, an error or injection becomes a real action.",
    icon: "gears",
  },
  {
    title: "Evidence",
    subtitle: "Can you prove what happened and why?",
    text: "Without logging identity, policy, authorisation and outcome, nobody can reconstruct the decision after an incident or audit.",
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
  { id: "plan", title: "PLAN", text: "Define obligations, risk, accountability and success criteria before building." },
  { id: "build", title: "BUILD", text: "Implement governed development, validation, security and evidence." },
  { id: "deploy", title: "DEPLOY", text: "Apply runtime gates, human oversight, traceability and rollback authority." },
  { id: "monitor", title: "MONITOR", text: "Continuously monitor risk, performance, security, compliance and cost." },
];

export const DGOM_MODEL = {
  kicker: "How I work · Operating model",
  title: "DGOM™: from policy to independent runtime controls",
  lead:
    "I turn policies, regulatory obligations and risk decisions into executable controls, lifecycle gates, runtime assurance and verifiable evidence.",
  designed: "Designed and governed by Andrés Lage Freire.",
  disclaimer:
    "DGOM™ operationalises technical governance controls. It does not replace legal advice, formal certification or an organisation’s accountable decision-makers.",
  cta: "View the DGOM Operating Model",
  briefCta: "Download the Dédalo™ Executive Brief",
  diagramLabel: "How DGOM™ connects accountability to runtime assurance",
  layers: {
    top: "Policy / Regulation / Risk",
    model: "DGOM™",
    outputs: "Controls · Gates · Evidence · Oversight",
    runtime: "Runtime Assurance",
  },
};

export const SERVICE_LADDER = {
  kicker: "Services & pricing guidance",
  title: "Three clear steps: diagnose, assess and implement",
  lead: "Start by checking your runtime risk in 90 seconds, request a bounded one-week technical review, or design the control plane for production.",
  expand: "Scope and pricing confirmed after a 30-minute call. None of these services constitute legal advice or formal certification.",
  problem: "Problem",
  outcome: "Outcome",
  deliverables: "Scope & deliverables",
  audience: "Legal & certification notice",
  items: [
    {
      id: "risk-check",
      intent: "risk-check",
      href: "/ai-runtime-risk-check",
      stage: "Step 1 · Diagnose",
      name: "AI Runtime Risk Check",
      price: "Free · 90 seconds",
      description:
        "An initial check to detect exposure, autonomy and missing evidence.",
      problem:
        "It is unclear whether your RAG, copilot or agent has gaps in data access, tool invocation or traceability before scaling.",
      outcome:
        "Preliminary runtime exposure classification and primary recommended technical control.",
      deliverables: [
        "6 questions covering access, authority, fail-safe and logging",
        "Evaluation across Exposure, Autonomy and Control/Evidence",
        "Immediate preliminary finding with primary control recommendation",
      ],
      audience:
        "Preliminary technical orientation. Not legal advice, formal audit or certification.",
      cta: "Check my system's risk",
    },
    {
      id: "snapshot",
      intent: "snapshot",
      stage: "Step 2 · Assess",
      name: "AI Governance Snapshot",
      price: "From €2,495",
      description:
        "Bounded review of one system, architecture, controls, risks and priority actions.",
      problem:
        "An AI system is in pilot or production and you need to know exactly where the technical gaps sit and what to prioritise.",
      outcome:
        "Clear map of access, authority and evidence gaps with 3 to 5 prioritised technical actions delivered in one week.",
      deliverables: [
        "Scope: one organisation and one AI system or use case (1-week delivery)",
        "Review of architecture, connected tools, data flows and current logging",
        "Executive memo, short risk matrix and technical readout session",
      ],
      audience:
        "Technical governance engineering support. Not legal advice or certification.",
      cta: "Request AI Governance Snapshot",
    },
    {
      id: "blueprint",
      intent: "blueprint",
      stage: "Step 3 · Design & implement",
      name: "Blueprint & Runtime Assurance",
      price: "Blueprint from €6,500 · Implementation scoped to requirements",
      description:
        "Design or implementation of controls, gates, oversight, traceability and evidence.",
      problem:
        "The risk is known, but there is no executable control architecture, lifecycle gate design or audit-ready evidence structure.",
      outcome:
        "Target control architecture (Blueprint) and ongoing runtime assurance integrated with your engineering team.",
      deliverables: [
        "Scope: control design, tool allowlists, HITL gates, fail-safe and evidence schema",
        "Technical mapping to EU AI Act, ISO/IEC 42001 and OWASP duties",
        "Optional: runtime implementation and recurring assurance scoped separately",
      ],
      audience:
        "Technical governance and runtime control engineering. Not legal advice or formal certification.",
      cta: "Request diagnostic",
    },
  ],
};

export const PARTNERS = {
  kicker: "Advisory channel",
  title: "Technical Delivery for Law Firms and Advisory Partners",
  lead:
    "Legal and consulting teams can define regulatory requirements and governance positions while their clients still need a technical delivery layer. AI Governance Engineering supports that layer with controls, validation, technical documentation, evidence and runtime assurance.",
  highlight: "Your firm provides legal interpretation and client trust. We provide the technical execution layer.",
  modelsLead: "Potential delivery models include referral, co-delivery and white-label support.",
  boundary:
    "We do not provide legal advice or replace legal counsel. We provide technical governance engineering and assurance support.",
  cta: "Discuss Technical Delivery Capacity",
  partnerProvidesTitle: "The advisory firm provides",
  partnerProvides: [
    "Legal interpretation",
    "Regulatory advice",
    "Client relationship",
    "Matter ownership",
    "Legal work product",
  ],
  practiceProvidesTitle: "AI Governance Engineering provides",
  practiceProvides: [
    "Technical implementation",
    "Control mapping",
    "Lifecycle gates",
    "Validation",
    "Technical documentation",
    "Evidence packs",
    "Runtime assurance",
    "Bounded prototypes and PoVs",
  ],
  models: [
    {
      name: "Referral",
      text: "The firm introduces a client that needs technical implementation.",
    },
    {
      name: "Co-delivery",
      text: "Both teams contribute distinct expertise under an agreed delivery model.",
    },
    {
      name: "White-label support",
      text: "Technical work is delivered behind the firm’s client relationship, subject to clear scope, confidentiality and responsibility boundaries.",
    },
  ],
};

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
  title: "Scope & pricing guidance",
  duration: "Scope confirmed after 30-min call",
  lead:
    "You work directly with the engineer who diagnoses the architecture and designs the technical controls, with no hand-offs between strategy and implementation.",
  position:
    "Every engagement is scoped in writing before work begins. No service promises guaranteed compliance or replaces legal counsel.",
  negatives: [
    "Not an abstract law-firm memo.",
    "Not a generic slide deck without technical controls.",
    "Not a promise to eliminate all risk.",
  ],
  hybrid:
    "Executable governance engineering: architecture, runtime limits and verifiable technical evidence.",
  limitsTitle: "What your team provides",
  nature:
    "Technical AI governance engineering support. Not legal advice, not a formal audit, not a conformity assessment and not certification.",
  clientLabel: "What you provide",
  clientProvides: [
    "A named internal owner for the evaluated system",
    "Overview of the in-scope RAG, copilot, agent or workflow",
    "Existing architecture notes, connected tools and policies",
    "Availability for up to two technical review sessions",
  ],
  includesLabel: "Includes",
  limitsLabel: "Explicit limits",
  forLabel: "Best for",
  bands: [
    {
      id: "snapshot",
      intent: "snapshot",
      step: "Step 1 · Assess",
      kind: "1-week delivery",
      name: "AI Governance Snapshot",
      price: "From €2,495",
      vat: "+ applicable taxes",
      subtitle:
        "Bounded technical review of one AI system, its architecture, tools, data flows, runtime risks and priority actions.",
      includes: [
        "Initial kick-off and architecture/documentation review.",
        "Up to two interviews with engineering, product or risk.",
        "Gap map across access, authority, fail-safe and evidence.",
        "Executive memo and 3 to 5 prioritised control actions.",
        "Technical and executive readout session.",
      ],
      limits: [
        "Bounded to one organisation and one system or use case.",
        "Does not include code implementation.",
        "Not legal advice or certification.",
      ],
      for: "Teams moving from the preliminary Risk Check result to a concrete technical gap map.",
      cta: "Request AI Governance Snapshot",
    },
    {
      id: "blueprint",
      intent: "blueprint",
      step: "Step 2 · Design",
      kind: "Diagnosis + architecture",
      name: "AI Governance Blueprint",
      price: "From €6,500",
      vat: "+ applicable taxes",
      subtitle:
        "Detailed design of the governance architecture, deterministic runtime controls, lifecycle gates and evidence pack structure.",
      includes: [
        "Complete diagnosis of the in-scope system.",
        "Target runtime and SDLC control architecture.",
        "Allowlist, authorisation, HITL and fail-safe specification.",
        "Evidence pack and decision trace schema.",
        "Technical implementation sequence.",
      ],
      limits: [
        "Not legal advice or conformity assessment.",
        "Regulatory mapping is technical and illustrative.",
      ],
      for: "Organisations ready to design the control plane before scaling to production.",
      cta: "Request Blueprint",
    },
    {
      id: "assurance",
      intent: "fractional",
      step: "Step 3 · Implement",
      kind: "Execution & oversight",
      name: "Runtime Assurance / Implementation",
      price: "Scoped to requirements",
      vat: "Confirmed after 30-min call",
      subtitle:
        "Implementation of executable controls, deployment gates, validation suites and ongoing technical assurance.",
      includes: [
        "Implementation or review of runtime and CI/CD controls.",
        "Testing over a bounded evaluation suite.",
        "Verification of decision traces and evidence packs.",
        "Direct support for CISO, CTO and risk owners.",
      ],
      limits: [
        "Technical scope tailored to the client's stack.",
        "Does not replace operational or legal accountability.",
      ],
      for: "Teams moving RAG, copilots or agents into governed production operation.",
      cta: "Request diagnostic",
    },
  ],
  priceNote:
    "Scope and pricing confirmed after a 30-minute call. Listed prices are indicative for a single bounded system.",
  bandsLabel: "Service hierarchy and pricing guidance",
  hierarchyTitle: "Ordered progression from low-friction entry to runtime implementation",
  hierarchySteps: [
    {
      rank: "1",
      name: "AI Runtime Risk Check",
      tag: "Immediate entry · Free · 90 s",
      desc: "Interactive preliminary diagnostic across exposure, autonomy and runtime evidence.",
      target: "risk-check",
    },
    {
      rank: "2",
      name: "AI Governance Snapshot",
      tag: "From €2,495 · 1 week",
      desc: "Bounded technical review of architecture, runtime risks and 3–5 priority controls.",
      target: "services",
    },
    {
      rank: "3",
      name: "In-Company Workshop / Hackathon",
      tag: "€1,200 – €3,000 · Engineering teams",
      desc: "'From Legal PDF to Code' or joint audit hackathon with live Gap Analysis and roadmap.",
      target: "enablement",
    },
    {
      rank: "4",
      name: "AI Governance Blueprint",
      tag: "From €6,500 · Control architecture",
      desc: "Complete specification of the deterministic control plane, HITL, allowlists and evidence.",
      target: "services",
    },
    {
      rank: "5",
      name: "Runtime Assurance",
      tag: "Scoped · Sprint delivery",
      desc: "Implementation of executable controls, CI/CD gates and production validation.",
      target: "services",
    },
    {
      rank: "6",
      name: "Partner / Co-delivery / White-label",
      tag: "Dedicated partner channel",
      desc: "Technical governance engineering under NDA for law firms, Big 4 and consultancies.",
      target: "partners",
    },
  ],
};

export const PROJECTS = [
  {
    num: "01",
    name: "HR Copilot — Technical Governance Implementation (TGI v1)",
    category: "Featured implementation · Agentic runtime governance",
    stack: "Python · OpenAI GPT-4o · OWASP LLM v2025 · OWASP Agentic 2026 · 8 TGI controls · SIEM audit",
    lead: "Same model. Same prompts. Two risk postures.",
    summary:
      "A runnable demonstration of how a control plane turns a vulnerable copilot into a bounded, supervised and auditable system. In Act I (without governance), a single prompt triggers unapproved tool calls and exposes sensitive data in under 60 seconds. In Act II (with TGI v1), 8 deterministic controls wrap the exact same model: prompt isolation, input classification, tool allow-listing, HITL gates, output DLP, row-level authorisation, secret hygiene and a SIEM-ready audit trail.",
    controlFlowLabel: "8 deterministic runtime controls",
    controlFlow: [
      "Input",
      "Classification",
      "Allowed tool",
      "Authorisation / HITL",
      "Output DLP & validation",
      "Audit evidence",
    ],
    video: "/agent-fail-version-1.mp4",
    poster: "/agent-fail-version-1-poster.jpg",
    captions: "/agent-fail-version-1.es.vtt",
    videoWidth: 1280,
    videoHeight: 800,
    videoCaption:
      "Two-act walkthrough (Spanish audio, subtitles included): Act I without governance versus Act II with TGI v1.",
    outcome:
      "The demonstration produced no sensitive findings across the test suite used, with every blocked attempt logged as verifiable evidence.",
  },
  {
    num: "02",
    name: "Enterprise AI Risk Console",
    category: "Governance / ISO/IEC 42001",
    href: "https://github.com/tshapedconsultant/enterprise-ai-risk",
    liveHref: "https://enterprise-ai-risk.onrender.com",
    stack: "FastAPI · YAML profiles · Jira gates · hash-chained audit",
    summary:
      "Vendor risk, controls as code, human gates, auditability and evidence. Deterministic triage from validated YAML profiles — missing evidence never reduces residual risk.",
    outcome: "Executable vendor governance: rules engine, HMAC-validated Jira gates, CI-deployed evidence packs.",
  },
  {
    num: "03",
    name: "RAG Security Validator",
    category: "RAG / retrieval security",
    liveHref: "https://rag-security-validator-demo.onrender.com",
    liveCta: "Open the live demo",
    stack: "Streamlit · YAML signatures · defensive decode · optional LLM judge",
    summary:
      "A gate for untrusted prompts and documents before indexing or generation. Heuristics always run. Optional LLM judge on residual paraphrases. One layer in a defense-in-depth stack — not a complete prompt-injection product.",
    outcome:
      "Raises attacker cost on prompt injection and encoded smuggling at the RAG boundary. Detection and containment layer; combine with provenance, least privilege and human approval for high-impact actions.",
  },
  {
    num: "04",
    name: "Enterprise Data Analyst Agent",
    category: "Agentic AI / runtime controls",
    href: "https://github.com/tshapedconsultant/Enterprise-Data-Analyst-Agent",
    stack: "LangGraph · FastAPI · OpenAI · AST guards",
    summary:
      "Agents plus governance on execution. The graph owns flow; the model proposes; deterministic rules route, retry and constrain read-only SQL.",
    video: "/demo-multiagent.mp4",
    poster: "/demo-multiagent-poster.jpg",
    videoCaption: "Demo of the multi-agent analyst: a plain-language question, governed read-only SQL, and a traceable result.",
    outcome: "Accountability and traceability in an agentic reporting system — the Deterministic Cage applied to query execution.",
  },
  {
    num: "05",
    name: "Porto Seguro Compliance Hub",
    category: "Regulated AI / EIPD evidence",
    href: "https://github.com/tshapedconsultant/porto-seguro-compliance-hub",
    stack: "EBM · Polars · Streamlit · control plane · GDPR EIPD pack",
    lead: "The model proposes. Controls decide. Residual risk stays visible.",
    summary:
      "Reference architecture for insurance-claim scoring — not a live insurance book and not an AEPD filing. The walkthrough follows the EIPD: identify the processing (anonymized Kaggle Porto Seguro, 595,212 rows), a risk to people’s rights, a live control (deny before the model runs, single-use human approval, redaction), then inspect the local hash chain. Residual scores are estimates pending verification. A local hash chain is not WORM storage.",
    controlFlowLabel: "EIPD sequence",
    controlFlow: [
      "Processing purpose",
      "Risk to rights",
      "Control (DENY / HITL / redact)",
      "Audit evidence",
      "Residual risk",
    ],
    video: "/porto-seguro-governed-en.mp4",
    poster: "/porto-seguro-governed-en-poster.jpg",
    videoWidth: 1920,
    videoHeight: 1200,
    videoCaption:
      "English walkthrough: governed decision path — DENY before execution, human approval, redaction, local hash chain. Technical evidence, not certification.",
    outcome:
      "Maps EU AI Act Arts. 9–15 and GDPR Art. 35 to executable controls and an EIPD pack. Demo data is anonymized; controller/DPO sign-off is hypothetical. Not an Article 36 prior consultation.",
  },
  {
    num: "06",
    name: "Automated Red Teaming for Safety-Critical AI",
    category: "Azure / CI promotion gates",
    stack: "GARAK · sector severity · forensic evidence · SOC monitor · CI gate",
    summary:
      "A production-aligned Azure architecture combining GARAK adversarial testing, sector-aware severity classification, structured forensic evidence, independent monitoring and CI/CD promotion gates. Critical findings can block model promotion, while configurable monitor and orchestration profiles separate early-warning triage from reproducible release decisions.",
    video: "/industrial-ai-redteam.mp4",
    poster: "/industrial-ai-redteam-poster.jpg",
    videoWidth: 1600,
    videoHeight: 942,
    videoCaption:
      "English walkthrough. Encoding stays green. A jailbreak turns yellow. Emergency shutdown — open the valves — turns the monitor red and blocks promotion.",
    schemaVideo: "/industrial-ai-schema-clean.mp4",
    schemaPoster: "/industrial-ai-schema-clean-poster.jpg",
    schemaCaption:
      "Architecture schema. Pipeline, internals, then sequence. Nothing of the container persists. The evidence does.",
    outcome:
      "One engine, two contracts. The desk sees it early. Promotion stops late, and only when the finding could move metal.",
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
    quote: "Rapid learning is the key to success.",
    cite: "Eric Schmidt, former CEO of Google · cited by Salim Ismail and Peter Diamandis, Moonshots (ExO 3.0)",
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
        kind: "Brief",
        title: "Dédalo™ Executive Brief",
        detail:
          "Two-page board brief: why probabilistic AI needs a Deterministic Cage, DGOM™ lifecycle, and how the architecture maps to EU AI Act, NIST AI RMF and ISO 42001 · PDF",
        href: EXECUTIVE_BRIEF_PDF,
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
