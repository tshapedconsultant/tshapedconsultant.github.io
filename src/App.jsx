import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Whitepaper from "./Whitepaper.jsx";
import Article from "./Article.jsx";
import HybridProfiles from "./HybridProfiles.jsx";
import EuAiActMapping from "./pages/EuAiActMapping";
import { Icon } from "./Icons.jsx";
import { FormNotConfiguredError, contactEmail, submitEnquiry } from "./contact.js";
import {
  EU_AI_ACT_MAPPING_PATH,
  WHITEPAPER_PATH,
  hashToPathRoute,
  isEuAiActMappingHash,
  isEuAiActMappingPath,
  isHybridProfilesPath,
  isMontesquieuPath,
  isWhitepaperPath,
} from "./routes";
import { pageSeoFor } from "./seo.js";
import {
  ABOUT_BLOCKS,
  APPROACH,
  ARTICLE,
  HYBRID_ARTICLE,
  AUDIENCE,
  BEST_FIT,
  BRAND_DEFINITION,
  HERO_FOR,
  CAPABILITIES,
  CASE_STUDIES,
  COVER,
  CREDENTIAL_GROUPS,
  CTA,
  CV_PDF,
  DELIVER,
  DGOM,
  DIAGNOSTIC,
  DIAGNOSTIC_FORM,
  ENGAGEMENT,
  FRAMEWORKS,
  INSIGHTS,
  LINKS,
  MAPPING_TEASER,
  PROBLEMS,
  PROJECTS,
  WHITEPAPER_PDF,
} from "./content.js";

const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "approach", label: "Approach" },
  { id: "case-studies", label: "Case studies" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollBehavior() {
  return prefersReducedMotion() ? "auto" : "smooth";
}

const ARTICLE_PAGES = {
  [ARTICLE.hash]: "article",
  [HYBRID_ARTICLE.hash]: "hybrid",
};

function viewFromLocation(pathname, hash) {
  if (isEuAiActMappingPath(pathname) || isEuAiActMappingHash(hash)) return "mapping";
  if (isWhitepaperPath(pathname)) return "whitepaper";
  if (isHybridProfilesPath(pathname)) return "hybrid";
  if (isMontesquieuPath(pathname)) return "article";
  const raw = hash.replace(/^#/, "");
  if (raw === "whitepaper" || /^s\d{2}$/.test(raw)) {
    return "whitepaper";
  }
  if (ARTICLE_PAGES[raw]) {
    return ARTICLE_PAGES[raw];
  }
  return "home";
}

function scrollToHash() {
  const pathname = window.location.pathname;
  if (
    isEuAiActMappingPath(pathname) ||
    isWhitepaperPath(pathname) ||
    isHybridProfilesPath(pathname) ||
    isMontesquieuPath(pathname)
  ) {
    const section = window.location.hash.replace(/^#/, "");
    requestAnimationFrame(() => {
      if (section && document.getElementById(section)) {
        document.getElementById(section).scrollIntoView({ behavior: scrollBehavior(), block: "start" });
        return;
      }
      window.scrollTo({ top: 0, behavior: scrollBehavior() });
    });
    return;
  }
  const id = window.location.hash.replace(/^#/, "");
  requestAnimationFrame(() => {
    if (!id || id === "whitepaper" || ARTICLE_PAGES[id] || id === "top" || isEuAiActMappingHash(`#${id}`)) {
      if (id === "whitepaper" || ARTICLE_PAGES[id] || !id) {
        window.scrollTo({ top: 0, behavior: scrollBehavior() });
      }
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
  });
}

function isInternalHref(href) {
  return typeof href === "string" && (href.startsWith("#") || (href.startsWith("/") && !href.startsWith("//")));
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function mailtoSafeLine(value, max = 120) {
  return String(value)
    .replace(/[\r\n\0\u2028\u2029]/g, " ")
    .replace(/%0[da]/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function mailtoSafeBody(value, max = 2000) {
  return String(value)
    .replace(/\0/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/[\r\u2028\u2029]/g, "\n")
    .split("\n")
    .map((line) => line.replace(/^\s*(bcc|cc|to|from|content-type|mime-version)\s*:/i, "$1 -"))
    .join("\n")
    .trim()
    .slice(0, max);
}

function enquiryMailtoHref({ name, company, email, govern, stageLabel }) {
  const subject = encodeURIComponent("AI Governance Diagnostic enquiry");
  const body = encodeURIComponent(
    [
      "AI Governance Diagnostic enquiry",
      "Source: tshapedconsultant.com",
      "",
      `Name: ${mailtoSafeLine(name)}`,
      `Company: ${mailtoSafeLine(company) || "Not specified"}`,
      `Email: ${mailtoSafeLine(email, 254)}`,
      "",
      "What they are trying to govern:",
      mailtoSafeBody(govern),
      "",
      `Current stage and likely scope: ${stageLabel || "Not specified"}`,
      "",
      "—",
      "Prepared from the site enquiry form. No mailing list; used only to respond.",
    ].join("\n")
  );
  return `mailto:${contactEmail()}?subject=${subject}&body=${body}`;
}

function GovernanceDiagram() {
  const primary = ["Regulation", "Engineering", "Runtime Assurance"];
  const pipeline = [
    "Policy / risk",
    "Control requirements",
    "System boundaries",
    "Runtime enforcement",
    "Evidence trail",
  ];

  return (
    <figure className="arch-diagram">
      <figcaption>
        <span className="arch-kicker">Control path</span>
        From regulation to runtime assurance
      </figcaption>
      <ol className="arch-primary">
        {primary.map((label, index) => (
          <li key={label}>
            <span className="arch-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="arch-label">{label}</span>
          </li>
        ))}
      </ol>
      <ol className="arch-pipeline">
        {pipeline.map((label) => (
          <li key={label}>{label}</li>
        ))}
      </ol>
    </figure>
  );
}

function DiagnosticForm() {
  const summaryRef = useRef(null);
  const [values, setValues] = useState({
    name: "",
    company: "",
    email: "",
    govern: "",
    stage: "",
    hp: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");
  const [mailtoFallback, setMailtoFallback] = useState("");

  function update(field) {
    return (event) => {
      const value = event.target.value;
      setValues((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const next = { ...prev };
          delete next[field];
          return next;
        });
      }
    };
  }

  function validate(data) {
    const next = {};
    if (!data.name.trim()) next.name = "Enter your name.";
    if (!data.email.trim()) next.email = "Enter your work email address.";
    else if (!isValidEmail(data.email.trim())) next.email = "Enter a valid work email address.";
    if (!data.govern.trim()) next.govern = "Describe what you are trying to govern.";
    return next;
  }

  async function onSubmit(event) {
    event.preventDefault();
    setSubmitError("");
    setMailtoFallback("");
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      requestAnimationFrame(() => summaryRef.current?.focus());
      return;
    }
    if (values.hp.trim()) {
      setStatus("sent");
      return;
    }

    const stageLabel =
      DIAGNOSTIC_FORM.stages.find((option) => option.value === values.stage)?.label || "";
    setStatus("sending");
    try {
      await submitEnquiry({
        name: values.name,
        company: values.company,
        email: values.email,
        govern: values.govern,
        stage: stageLabel,
      });
      setStatus("sent");
      setValues({ name: "", company: "", email: "", govern: "", stage: "", hp: "" });
    } catch (err) {
      setStatus("idle");
      if (err instanceof FormNotConfiguredError) {
        setSubmitError(DIAGNOSTIC_FORM.notConfigured);
      } else {
        setSubmitError(DIAGNOSTIC_FORM.error);
        setMailtoFallback(
          enquiryMailtoHref({
            name: values.name,
            company: values.company,
            email: values.email,
            govern: values.govern,
            stageLabel,
          })
        );
      }
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  const errorEntries = [
    ["name", "Name", errors.name, "#diag-name"],
    ["email", "Work email", errors.email, "#diag-email"],
    ["govern", "What are you trying to govern?", errors.govern, "#diag-govern"],
  ].filter(([, , message]) => message);

  return (
    <form className="diag-form" id="diagnostic-form" onSubmit={onSubmit} noValidate>
      <p className="diag-form-kicker">{DIAGNOSTIC_FORM.kicker}</p>
      {status === "sent" ? (
        <p className="form-success" role="status">
          {DIAGNOSTIC_FORM.success}
        </p>
      ) : null}
      {submitError || errorEntries.length ? (
        <div className="form-summary" ref={summaryRef} tabIndex={-1} role="alert">
          {submitError ? <p>{submitError}</p> : null}
          {mailtoFallback ? (
            <p className="form-fallback">
              <a className="btn btn-solid" href={mailtoFallback}>
                {DIAGNOSTIC_FORM.errorFallback}
              </a>
            </p>
          ) : null}
          {errorEntries.length ? (
            <>
              <p>Please correct the following:</p>
              <ul>
                {errorEntries.map(([key, label, message, href]) => (
                  <li key={key}>
                    <a
                      href={href}
                      onClick={(event) => {
                        event.preventDefault();
                        document.getElementById(href.slice(1))?.focus();
                      }}
                    >
                      {label}: {message}
                    </a>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
        </div>
      ) : null}
      <div className="hp" aria-hidden="true">
        <label htmlFor="diag-hp">Company confirmation</label>
        <input
          id="diag-hp"
          name="diag_hp"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          data-lpignore="true"
          data-1p-ignore="true"
          data-form-type="other"
          value={values.hp}
          onChange={update("hp")}
        />
      </div>
      <div className="diag-form-grid">
        <div>
          <label htmlFor="diag-name">
            Name <span className="req">required</span>
          </label>
          <input
            id="diag-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={120}
            value={values.name}
            onChange={update("name")}
            aria-invalid={errors.name ? "true" : "false"}
            aria-describedby={errors.name ? "diag-name-error" : undefined}
            required
          />
          {errors.name ? (
            <p className="field-error" id="diag-name-error">
              {errors.name}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="diag-company">
            Company <span className="opt">optional</span>
          </label>
          <input
            id="diag-company"
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={120}
            value={values.company}
            onChange={update("company")}
          />
        </div>
        <div>
          <label htmlFor="diag-email">
            Work email <span className="req">required</span>
          </label>
          <input
            id="diag-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={254}
            value={values.email}
            onChange={update("email")}
            aria-invalid={errors.email ? "true" : "false"}
            aria-describedby={errors.email ? "diag-email-error" : undefined}
            required
          />
          {errors.email ? (
            <p className="field-error" id="diag-email-error">
              {errors.email}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="diag-stage">
            {DIAGNOSTIC_FORM.stageLabel} <span className="opt">optional</span>
          </label>
          <select id="diag-stage" name="stage" value={values.stage} onChange={update("stage")}>
            {DIAGNOSTIC_FORM.stages.map((option) => (
              <option key={option.label} value={option.value} disabled={option.value === ""}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="diag-form-wide">
          <label htmlFor="diag-govern">
            What are you trying to govern? <span className="req">required</span>
          </label>
          <textarea
            id="diag-govern"
            name="govern"
            rows={3}
            maxLength={2000}
            value={values.govern}
            onChange={update("govern")}
            placeholder={DIAGNOSTIC_FORM.governPlaceholder}
            aria-invalid={errors.govern ? "true" : "false"}
            aria-describedby={errors.govern ? "diag-govern-error diag-govern-hint" : "diag-govern-hint"}
            required
          />
          <p className="field-hint" id="diag-govern-hint">
            {DIAGNOSTIC_FORM.governHint}
          </p>
          {errors.govern ? (
            <p className="field-error" id="diag-govern-error">
              {errors.govern}
            </p>
          ) : null}
        </div>
      </div>
      <button className="btn btn-solid" type="submit" disabled={status === "sending"}>
        {status === "sending" ? DIAGNOSTIC_FORM.sending : DIAGNOSTIC_FORM.submit}
      </button>
      <p className="diag-form-privacy">{DIAGNOSTIC_FORM.privacy}</p>
    </form>
  );
}

function ExternalLink({ href, children, className }) {
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <Icon name="external" />
      <span className="visually-hidden"> (opens in a new tab)</span>
    </a>
  );
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const [view, setView] = useState(() => viewFromLocation(location.pathname, location.hash));
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuBtnRef = useRef(null);
  const moreBtnRef = useRef(null);
  const moreWrapRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    document.title = pageSeoFor(location.pathname).title;
  }, [view, location.pathname]);

  useEffect(() => {
    if (location.pathname === "/") {
      const routed = hashToPathRoute(location.hash);
      if (routed) {
        navigate({ pathname: routed.pathname, hash: routed.hash }, { replace: true });
        return;
      }
    }
    const next = viewFromLocation(location.pathname, location.hash);
    setView((prev) => {
      if (prev === next) scrollToHash();
      return next;
    });
    setMenuOpen(false);
    setMoreOpen(false);
  }, [location.hash, location.pathname, navigate]);

  useEffect(() => {
    scrollToHash();
  }, [view]);

  useEffect(() => {
    function onKey(event) {
      if (event.key !== "Escape") return;
      if (moreOpen) {
        setMoreOpen(false);
        moreBtnRef.current?.focus();
        return;
      }
      if (menuOpen) {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen, moreOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;
    const root = headerRef.current;
    if (!root) return undefined;

    function focusables() {
      return [...root.querySelectorAll("a[href], button:not([disabled])")].filter((el) => {
        if (el.hasAttribute("hidden") || el.closest("[hidden]")) return false;
        return el.getClientRects().length > 0;
      });
    }

    const first = focusables()[0];
    if (first && !root.contains(document.activeElement)) first.focus();

    function onTab(event) {
      if (event.key !== "Tab") return;
      const items = focusables();
      if (!items.length) return;
      const start = items[0];
      const end = items[items.length - 1];
      if (event.shiftKey && document.activeElement === start) {
        event.preventDefault();
        end.focus();
      } else if (!event.shiftKey && document.activeElement === end) {
        event.preventDefault();
        start.focus();
      }
    }

    root.addEventListener("keydown", onTab);
    return () => root.removeEventListener("keydown", onTab);
  }, [menuOpen]);

  useEffect(() => {
    function onPointer(event) {
      if (!moreOpen) return;
      if (!moreWrapRef.current?.contains(event.target)) setMoreOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, [moreOpen]);

  useEffect(() => {
    if (view !== "home") return undefined;
    const ids = NAV_SECTIONS.map((item) => item.id);
    const elements = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!elements.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -50% 0px", threshold: [0, 0.2, 0.45] }
    );
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [view]);

  function goHomeSection(id) {
    setMenuOpen(false);
    setMoreOpen(false);
    const hash = id || "top";
    if (location.pathname !== "/") {
      navigate(`/#${hash}`);
      return;
    }
    if (view !== "home") {
      navigate(`/#${hash}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  }

  const secondaryLinks = (
    <>
      <a href={CV_PDF} download>
        CV
      </a>
      <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
        LinkedIn<span className="visually-hidden"> (opens in a new tab)</span>
      </a>
      <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
        GitHub<span className="visually-hidden"> (opens in a new tab)</span>
      </a>
      <a href={LINKS.medium} target="_blank" rel="noopener noreferrer">
        Medium<span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    </>
  );

  return (
    <div className={view === "home" ? "site" : "site site-paper"}>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="top" ref={headerRef}>
        <Link
          className="mark"
          to="/#top"
          onClick={() => {
            setMenuOpen(false);
            setMoreOpen(false);
          }}
        >
          <Icon name="shield" className="icon mark-icon" />
          <span>
            tshapedconsultant
            <small>AI Governance Engineering</small>
          </span>
        </Link>
        <button
          className="menu-toggle"
          type="button"
          ref={menuBtnRef}
          aria-expanded={menuOpen}
          aria-controls="site-nav"
          onClick={() => {
            setMenuOpen((open) => !open);
            setMoreOpen(false);
          }}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
        <nav id="site-nav" className={menuOpen ? "open" : undefined} aria-label="Primary">
          {NAV_SECTIONS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={activeSection === item.id && view === "home" ? "is-active" : undefined}
              aria-current={activeSection === item.id && view === "home" ? "location" : undefined}
              onClick={(event) => {
                event.preventDefault();
                goHomeSection(item.id);
              }}
            >
              {item.label}
            </a>
          ))}
          <Link
            to={EU_AI_ACT_MAPPING_PATH}
            className={view === "mapping" ? "is-active" : undefined}
            aria-current={view === "mapping" ? "page" : undefined}
            onClick={() => {
              setMenuOpen(false);
              setMoreOpen(false);
            }}
          >
            EU AI Act
          </Link>
          <Link
            to={WHITEPAPER_PATH}
            className={view === "whitepaper" ? "is-active" : undefined}
            aria-current={view === "whitepaper" ? "page" : undefined}
            onClick={() => {
              setMenuOpen(false);
              setMoreOpen(false);
            }}
          >
            Whitepaper
          </Link>
          <a
            className="nav-cta"
            href="#diagnostic"
            onClick={(event) => {
              event.preventDefault();
              goHomeSection("diagnostic");
            }}
          >
            Discuss
          </a>
          <div className="more-wrap" ref={moreWrapRef}>
            <button
              className="more-toggle"
              type="button"
              ref={moreBtnRef}
              aria-expanded={moreOpen}
              aria-haspopup="true"
              aria-controls="more-menu"
              onClick={() => setMoreOpen((open) => !open)}
              onKeyDown={(event) => {
                if (event.key !== "ArrowDown") return;
                event.preventDefault();
                setMoreOpen(true);
                requestAnimationFrame(() => moreWrapRef.current?.querySelector("a")?.focus());
              }}
            >
              Resources
            </button>
            <div id="more-menu" className={moreOpen ? "more-menu open" : "more-menu"} hidden={!moreOpen}>
              {secondaryLinks}
            </div>
          </div>
          <div className="nav-secondary">{secondaryLinks}</div>
        </nav>
      </header>

      <main id="main" tabIndex={-1} inert={menuOpen ? true : undefined}>
        {view === "mapping" ? (
          <EuAiActMapping />
        ) : view === "whitepaper" ? (
          <Whitepaper />
        ) : view === "article" ? (
          <Article />
        ) : view === "hybrid" ? (
          <HybridProfiles />
        ) : (
          <>
            <section className="hero region-dark" id="top">
              <div className="hero-grid">
                <div className="hero-copy">
                  <p className="eyebrow">Madrid / EMEA remote</p>
                  <h1>
                    Andrés Lage Freire
                    <span className="h1-specialty">AI Governance Engineering</span>
                  </h1>
                  <p className="tagline">Responsible AI Architect · From regulation to runtime assurance</p>
                  <p className="brand-def">{BRAND_DEFINITION}</p>
                  <p className="value-prop">
                    I help organisations turn <strong>AI risk</strong>,{" "}
                    <strong>regulatory obligations</strong> and <strong>accountability requirements</strong>{" "}
                    into executable controls, lifecycle gates and verifiable evidence.
                  </p>
                  <div className="hero-for">
                    <p>{HERO_FOR.audience}</p>
                    <p>{HERO_FOR.problems}</p>
                  </div>
                  <div className="hero-actions">
                    <div className="hero-cta-row">
                      <a
                        className="btn btn-solid"
                        href="#diagnostic"
                        onClick={(event) => {
                          event.preventDefault();
                          goHomeSection("diagnostic");
                        }}
                      >
                        {CTA.primary}
                      </a>
                      <a className="btn btn-ghost" href={WHITEPAPER_PATH}>
                        Read the whitepaper
                      </a>
                    </div>
                    <p className="cta-note">{CTA.note}</p>
                    <a
                      className="text-link"
                      href="#case-studies"
                      onClick={(event) => {
                        event.preventDefault();
                        goHomeSection("case-studies");
                      }}
                    >
                      Read the BBVA case study
                    </a>
                    <a
                      className="text-link"
                      href="#projects"
                      onClick={(event) => {
                        event.preventDefault();
                        goHomeSection("projects");
                      }}
                    >
                      View reference implementations
                    </a>
                    <ul className="audience" aria-label="Choose your path">
                      {AUDIENCE.map((item) => (
                        <li key={item.id}>
                          <button
                            type="button"
                            onClick={() => goHomeSection(item.target)}
                            aria-label={`${item.label}: ${item.action}`}
                          >
                            {item.label}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <GovernanceDiagram />
              </div>
            </section>

            <section id="why" className="region region-light">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    01
                  </p>
                  <h2>Why this matters</h2>
                </div>
                <p className="why-lead">AI governance is moving from documentation to enforcement.</p>
                <p className="why-brutal">
                  Enterprises don&apos;t need another policy document. They need controls that survive
                  deployment, runtime, audit and regulatory scrutiny.
                </p>
                <p className="why-close">I design the architecture that connects all four.</p>
                <div className="problem-grid">
                  {PROBLEMS.map((item) => (
                    <article className="risk-panel" key={item.title}>
                      <Icon name={item.icon} />
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </article>
                  ))}
                </div>
                <aside className="callout-pair">
                  <p className="best-fit">
                    <span className="callout-label">Best fit</span>
                    {BEST_FIT.replace(/^Best fit:\s*/i, "")}
                  </p>
                  <p className="principle-callout">
                    <span className="callout-label">
                      <span className="principle-mark" aria-hidden="true">
                        ∴
                      </span>
                      Principle
                    </span>
                    Probabilistic models require deterministic governance.
                  </p>
                </aside>
                <article className="mapping-teaser">
                  <p className="callout-label">{MAPPING_TEASER.kicker}</p>
                  <h3>{MAPPING_TEASER.title}</h3>
                  <p>{MAPPING_TEASER.text}</p>
                  <div className="mapping-teaser-actions">
                    <Link className="btn btn-solid" to={EU_AI_ACT_MAPPING_PATH}>
                      {MAPPING_TEASER.cta}
                    </Link>
                    <a className="btn btn-ghost" href={WHITEPAPER_PATH}>
                      Whitepaper
                    </a>
                  </div>
                  <p className="mapping-teaser-refs">
                    Reference implementations:{" "}
                    <ExternalLink href={PROJECTS[2].href}>{PROJECTS[2].name}</ExternalLink>
                    {" · "}
                    <ExternalLink href={PROJECTS[0].href}>{PROJECTS[0].name}</ExternalLink>
                  </p>
                </article>
              </div>
            </section>

            <section id="diagnostic" className="region region-dark diagnostic-band">
              <div className="region-inner diagnostic-layout">
                <div className="diag-offer">
                  <p className="eyebrow">Productised entry point</p>
                  <div className="diag-title-row">
                    <h2>{DIAGNOSTIC.title}</h2>
                    <p className="meta-badge">{DIAGNOSTIC.duration}</p>
                  </div>
                  <p className="diag-lead">{DIAGNOSTIC.lead}</p>
                  <ol className="diag-steps" aria-label="Diagnostic process">
                    {DIAGNOSTIC.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                  <ul className="diag-list">
                    {DIAGNOSTIC.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="diag-outcome">
                    <strong>Outcome.</strong> {DIAGNOSTIC.outcome}
                  </p>
                  <p className="cta-note">{CTA.note}</p>
                </div>
                <DiagnosticForm />
              </div>
            </section>

            <section id="approach" className="region region-light">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    02
                  </p>
                  <h2>The approach</h2>
                </div>
                <div className="two-level">
                  <article>
                    <p className="level-kicker">Business problem</p>
                    <p>
                      AI programmes often fail not because the model is weak, but because ownership,
                      authority, evidence, controls and operational accountability are unclear.
                    </p>
                  </article>
                  <article>
                    <p className="level-kicker">Technical approach</p>
                    <p>
                      Foundation models are probabilistic. Governance must therefore determine what they
                      may access, decide, trigger and change—and enforce those limits independently at
                      runtime.
                    </p>
                  </article>
                </div>

                <ol className="arch-flow" aria-label="Regulation to evidence">
                  {APPROACH.map((step) => (
                    <li key={step.id}>
                      <Icon name={step.icon} />
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </li>
                  ))}
                </ol>

                <div className="frameworks">
                  {FRAMEWORKS.map((item) => (
                    <article key={item.name}>
                      <Icon name={item.icon} />
                      <h3>{item.name}</h3>
                      <p>{item.caption}</p>
                    </article>
                  ))}
                </div>
                <p className="reg-line">
                  AI Act readiness and governance controls proportionate to your role, use case and risk
                  profile — not a claim that every system carries the same obligations.
                </p>

                <div className="dgom-block">
                  <p className="level-kicker">Operating model</p>
                  <h3>DGOM™</h3>
                  <p className="dgom-sub">
                    Dual Governance Operating Model — from board-level accountability to executable
                    controls. PLAN → BUILD → DEPLOY → MONITOR.
                  </p>
                  <ol className="dgom-timeline">
                    {DGOM.map((phase) => (
                      <li key={phase.id}>
                        <h4>{phase.title}</h4>
                        <p>{phase.text}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="term-grid">
                  <article>
                    <h3>The Deterministic Cage</h3>
                    <p>
                      Independent controls that limit what a probabilistic system can access, decide and
                      execute.
                    </p>
                  </article>
                  <article>
                    <h3>Constitutional architecture</h3>
                    <p>
                      A separation of policy, execution and independent oversight across the AI
                      lifecycle.
                    </p>
                  </article>
                </div>
              </div>
            </section>

            <section id="guardrails" className="region region-dark guard-band">
              <div className="region-inner guard-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    03
                  </p>
                  <h2>Guardrails are not governance</h2>
                </div>
                <p className="guard-lead">Guardrails constrain model behaviour.</p>
                <p className="guard-determines">Governance determines:</p>
                <ol className="guard-chain">
                  <li>who can act</li>
                  <li>what they can do</li>
                  <li>under which conditions</li>
                  <li>who can stop them</li>
                  <li>what evidence remains</li>
                </ol>
                <p className="principle-line">
                  Model safety is a component. Control architecture is the system.
                </p>
              </div>
            </section>

            <section id="deliver" className="region region-light">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    04
                  </p>
                  <h2>What you get</h2>
                </div>
                <p className="section-lede">
                  Capabilities you can buy — architecture, engineering, evidence and executive output —
                  not a policy workshop that ends in a slide deck.
                </p>
                <ul className="capability-strip">
                  {CAPABILITIES.map((item) => (
                    <li key={item.title}>
                      <Icon name={item.icon} />
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="deliver-grid">
                  {DELIVER.map((group) => (
                    <article key={group.title}>
                      <h3>{group.title}</h3>
                      <ul>
                        {group.items.map((item) => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section id="engagement" className="region region-light engagement-band">
              <div className="region-inner">
                <h2 id="engagement-heading" className="engagement-title">
                  {ENGAGEMENT.title}
                </h2>
                <ol className="engagement-lines">
                  {ENGAGEMENT.lines.map((line) => (
                    <li key={line.label}>
                      <Icon name={line.icon} />
                      <strong>{line.label}</strong>
                      <span>{line.text}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </section>

            <section id="case-studies" className="region region-light">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    05
                  </p>
                  <h2>Case studies</h2>
                </div>
                <p className="section-lede">{CASE_STUDIES.lede}</p>
                {CASE_STUDIES.items.map((study) => (
                  <article className="case-study" key={study.id} aria-labelledby={`${study.id}-title`}>
                    <header className="case-head">
                      <p className="case-kicker">{study.kicker}</p>
                      <p className="case-client">
                        {study.client} · {study.sector}
                      </p>
                      <h3 id={`${study.id}-title`}>{study.title}</h3>
                      <p className="case-role">{study.role}</p>
                    </header>
                    <div className="case-grid">
                      <div>
                        <h4>Problem</h4>
                        <p>{study.problem}</p>
                      </div>
                      <div>
                        <h4>What was done</h4>
                        <ul>
                          {study.approach.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4>Outcome</h4>
                        <p>{study.outcome}</p>
                      </div>
                    </div>
                    <aside className="case-gov">
                      <h4>Governance</h4>
                      <p>{study.governance}</p>
                    </aside>
                    <ul className="case-metrics">
                      {study.metrics.map((metric) => (
                        <li key={metric.label}>
                          <strong>{metric.value}</strong>
                          <span>{metric.label}</span>
                        </li>
                      ))}
                    </ul>
                    <p className="case-note">{study.note}</p>
                    <a className="btn btn-ghost" href={study.pdf} download>
                      Download case study (PDF)
                    </a>
                  </article>
                ))}
              </div>
            </section>

            <section id="projects" className="region region-light">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    06
                  </p>
                  <h2>Selected reference implementations</h2>
                </div>
                <p className="section-lede">
                  Three flagship systems that show vendor risk, agentic runtime controls, and regulated
                  evidence — not a catalogue of every repository.
                </p>
                <div className="project-grid">
                  {PROJECTS.map((project) => (
                    <article className="project" key={project.href}>
                      <header>
                        <p className="flag">{project.num}</p>
                        <p className="ver">{project.category}</p>
                        <h3>{project.name}</h3>
                      </header>
                      <p>{project.summary}</p>
                      <ul className="stack-tags">
                        {project.stack.split(" · ").map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                      <p className="outcome">
                        <strong>Outcome.</strong> {project.outcome}
                      </p>
                      <ExternalLink className="project-link" href={project.href}>
                        View implementation
                      </ExternalLink>
                    </article>
                  ))}
                </div>
                <p className="more-repos">
                  <ExternalLink className="btn btn-ghost" href={LINKS.githubRepos}>
                    View all reference implementations on GitHub
                  </ExternalLink>
                </p>
              </div>
            </section>

            <section id="whitepaper-teaser" className="region region-dark paper-band">
              <div className="region-inner paper-teaser">
                <div>
                  <div className="section-head">
                    <p className="num" aria-hidden="true">
                      07
                    </p>
                    <h2>Whitepaper</h2>
                  </div>
                  <p className="paper-title-line">Probabilistic Models Require Deterministic Governance</p>
                  <p className="paper-sub-line">
                    Why enterprise and agentic AI needs a constitutional architecture — a separation of
                    policy, execution and independent oversight.
                  </p>
                  <div className="prose">
                    <p>
                      Deterministic software aims for the same output for the same input. Foundation
                      models do not. We cannot make probabilistic systems deterministic. We can constrain
                      their authority and bound their consequences with independent runtime controls — the
                      Deterministic Cage.
                    </p>
                  </div>
                  <div className="hero-actions">
                    <a className="btn btn-solid" href={WHITEPAPER_PATH}>
                      Read on this site
                    </a>
                    <a className="btn btn-ghost" href={WHITEPAPER_PDF} download>
                      Download PDF
                    </a>
                  </div>
                  <p className="paper-also">
                    Further reading:{" "}
                    <a href={LINKS.medium} target="_blank" rel="noopener noreferrer">
                      articles on Medium
                      <span className="visually-hidden"> (opens in a new tab)</span>
                    </a>
                  </p>
                </div>
                <img
                  className="paper-cover-quiet"
                  src={COVER}
                  alt=""
                  width="960"
                  height="540"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </section>

            <section id="insights" className="region region-light">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    08
                  </p>
                  <h2>Insights</h2>
                </div>
                <p className="section-lede">
                  Essays on responsible AI, operating models and runtime governance — on this site
                  and on Medium.
                </p>
                <ul className="insight-grid">
                  {INSIGHTS.map((item) => (
                    <li className={item.featured ? "featured" : undefined} key={item.href}>
                      <Icon name={item.icon} />
                      <h3>
                        {item.internal ? (
                          <a href={item.href}>{item.title}</a>
                        ) : (
                          <ExternalLink href={item.href}>{item.title}</ExternalLink>
                        )}
                      </h3>
                      <p>{item.text}</p>
                      {item.internal ? (
                        <p className="insight-read">
                          <a href={item.href}>Read article</a>
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
                <p className="more-repos">
                  <ExternalLink className="btn btn-ghost" href={LINKS.medium}>
                    All articles on Medium
                  </ExternalLink>
                </p>
              </div>
            </section>

            <section id="validation" className="region region-light">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    09
                  </p>
                  <h2>Credentials, publications and open work</h2>
                </div>
                {CREDENTIAL_GROUPS.map((group) => (
                  <div className="cred-group" key={group.label}>
                    <p className="cred-label">{group.label}</p>
                    <ul className="validation-grid">
                      {group.items.map((item) => (
                        <li className={item.featured ? "featured" : undefined} key={item.title}>
                          <p className="val-kind">
                            {item.kind}
                            {item.inProgress ? <span className="in-progress">In progress</span> : null}
                          </p>
                          <h3>
                            {item.href ? (
                              isInternalHref(item.href) ? (
                                <a href={item.href}>{item.title}</a>
                              ) : (
                                <ExternalLink href={item.href}>{item.title}</ExternalLink>
                              )
                            ) : (
                              item.title
                            )}
                          </h3>
                          <p>{item.detail}</p>
                          {item.note ? <p className="val-note">{item.note}</p> : null}
                          {item.skills ? (
                            <ul className="val-skills">
                              {item.skills.map((skill) => (
                                <li key={skill}>{skill}</li>
                              ))}
                            </ul>
                          ) : null}
                          {item.sourceHref ? (
                            <p className="val-source">
                              Press:{" "}
                              <a href={item.sourceHref} target="_blank" rel="noopener noreferrer">
                                {item.sourceLabel}
                                <span className="visually-hidden"> (opens in a new tab)</span>
                              </a>
                            </p>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            <section id="about" className="region region-light">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    10
                  </p>
                  <h2>About Andrés</h2>
                </div>
                <p className="why-lead about-unusual">Why my background is unusual</p>
                <p className="about-combo">Engineering + AI + Governance + Regulation</p>
                <div className="about-blocks">
                  {ABOUT_BLOCKS.map((item) => (
                    <article key={item.title}>
                      <Icon name={item.icon} />
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </article>
                  ))}
                </div>
                <div className="prose about-bio">
                  <p>
                    Responsible AI Architect based in Madrid, open to EMEA / remote. Independent
                    Strategic AI Consultant since June 2021. Previously Cloud Implementation Specialist
                    (Avaya Cloud Office at Concentrix). I work at the intersection of engineering, AI
                    systems, governance and regulation — from architecture through runtime evidence.
                  </p>
                </div>
                <a className="btn btn-ghost" href={CV_PDF} download>
                  Download CV (PDF)
                </a>
              </div>
            </section>

            <section id="contact" className="region region-dark contact-band">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    11
                  </p>
                  <h2>Contact</h2>
                </div>
                <p className="closing">
                  Your AI system becomes governed when policy is enforced in design, deployment and
                  runtime—and when evidence proves that it happened.
                </p>
                <div className="cta-primary">
                  <a
                    className="btn btn-solid"
                    href="#diagnostic"
                    onClick={(event) => {
                      event.preventDefault();
                      goHomeSection("diagnostic");
                    }}
                  >
                    {CTA.primary}
                  </a>
                  <p className="cta-note">{CTA.note}</p>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="foot" inert={menuOpen ? true : undefined}>
        <div className="foot-main">
          <a
            className="btn btn-solid"
            href="#diagnostic"
            onClick={(event) => {
              event.preventDefault();
              goHomeSection("diagnostic");
            }}
          >
            Discuss
          </a>
          <a
            className="foot-email"
            href="#diagnostic"
            onClick={(event) => {
              event.preventDefault();
              goHomeSection("diagnostic");
            }}
          >
            Email
          </a>
        </div>
        <p className="foot-links">
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn<span className="visually-hidden"> (opens in a new tab)</span>
          </a>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
            GitHub<span className="visually-hidden"> (opens in a new tab)</span>
          </a>
          <a href={LINKS.medium} target="_blank" rel="noopener noreferrer">
            Articles on Medium<span className="visually-hidden"> (opens in a new tab)</span>
          </a>
          <a href={CV_PDF} download>
            CV
          </a>
          <a href="/#case-studies">Case studies</a>
          <Link to={EU_AI_ACT_MAPPING_PATH}>EU AI Act mapping</Link>
          <Link to={WHITEPAPER_PATH}>Whitepaper</Link>
        </p>
        <p>© {new Date().getFullYear()} Andrés Lage Freire · tshapedconsultant.com</p>
        <p>AI Governance Engineering · From regulation to runtime assurance</p>
      </footer>
    </div>
  );
}
