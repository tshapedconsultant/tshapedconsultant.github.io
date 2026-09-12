import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Whitepaper from "./Whitepaper.jsx";
import Article from "./Article.jsx";
import HybridProfiles from "./HybridProfiles.jsx";
import EuAiActMapping from "./pages/EuAiActMapping";
import WhitepaperEs from "./pages/WhitepaperEs.jsx";
import ArticleEs from "./pages/ArticleEs.jsx";
import HybridProfilesEs from "./pages/HybridProfilesEs.jsx";
import { Icon } from "./Icons.jsx";
import Picture from "./components/Picture.jsx";
import { FormNotConfiguredError, contactEmail, submitEnquiry } from "./contact.js";
import { useI18n } from "./i18n/LocaleContext";
import { applyDocumentHead } from "./i18n/documentHead.js";
import {
  ARTICLE,
  HYBRID_ARTICLE,
} from "./content.js";
import {
  EU_AI_ACT_MAPPING_PATH,
  WHITEPAPER_PATH,
  hashToPathRoute,
  isAppPath,
  isEuAiActMappingHash,
  isEuAiActMappingPath,
  isHybridProfilesPath,
  isMontesquieuPath,
  isWhitepaperPath,
  localeFromPath,
  withLocale,
} from "./routes";

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
  if (!isAppPath(pathname)) return "notfound";
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

function enquiryMailtoHref({ name, company, email, govern, stageLabel, copy }) {
  const subject = encodeURIComponent(copy.mailtoSubject);
  const body = encodeURIComponent(
    [
      copy.mailtoIntro,
      copy.mailtoSource,
      "",
      `${copy.name}: ${mailtoSafeLine(name)}`,
      `${copy.company}: ${mailtoSafeLine(company) || copy.mailtoNotSpecified}`,
      `${copy.email}: ${mailtoSafeLine(email, 254)}`,
      "",
      copy.mailtoGovern,
      mailtoSafeBody(govern),
      "",
      `${copy.mailtoStage} ${stageLabel || copy.mailtoNotSpecified}`,
      "",
      "—",
      copy.mailtoFooter,
    ].join("\n")
  );
  return `mailto:${contactEmail()}?subject=${subject}&body=${body}`;
}

function GovernanceDiagram() {
  const { t } = useI18n();
  const primary = t.diagram.primary;
  const pipeline = t.diagram.pipeline;

  return (
    <figure className="arch-diagram">
      <figcaption>
        <span className="arch-kicker">{t.diagram.kicker}</span>
        {t.diagram.caption}
      </figcaption>
      <ol className="arch-primary">
        {primary.map((step, index) => (
          <li key={step.label}>
            <span className="arch-index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="arch-label">{step.label}</span>
            <span className="arch-sentence">{step.text}</span>
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
  const { t, content } = useI18n();
  const { DIAGNOSTIC_FORM } = content;
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
    if (!data.name.trim()) next.name = t.form.errors.name;
    if (!data.email.trim()) next.email = t.form.errors.email;
    else if (!isValidEmail(data.email.trim())) next.email = t.form.errors.emailInvalid;
    if (!data.govern.trim()) next.govern = t.form.errors.govern;
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
            copy: t.form,
          })
        );
      }
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  const errorEntries = [
    ["name", t.form.name, errors.name, "#diag-name"],
    ["email", t.form.email, errors.email, "#diag-email"],
    ["govern", t.form.govern, errors.govern, "#diag-govern"],
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
              <p>{t.form.correct}</p>
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
        <label htmlFor="diag-hp">{t.form.hp}</label>
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
            {t.form.name} <span className="req">{t.required}</span>
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
            {t.form.company} <span className="opt">{t.optional}</span>
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
            {t.form.email} <span className="req">{t.required}</span>
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
            {DIAGNOSTIC_FORM.stageLabel} <span className="opt">{t.optional}</span>
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
            {t.form.govern} <span className="req">{t.required}</span>
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
  const { t } = useI18n();
  return (
    <a className={className} href={href} target="_blank" rel="noopener noreferrer">
      {children}
      <Icon name="external" />
      <span className="visually-hidden">{t.opensNewTab}</span>
    </a>
  );
}

function NotFound() {
  const { t, home, localizedPath } = useI18n();
  return (
    <article className="paper">
      <h1>{t.notFound.title}</h1>
      <p>{t.notFound.body}</p>
      <p className="paper-also">
        <a href={`${home}#top`}>{t.notFound.home}</a>
        {" · "}
        <Link to={localizedPath(EU_AI_ACT_MAPPING_PATH)}>{t.hero.mapping}</Link>
      </p>
    </article>
  );
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const { locale, t, content, home, localize, localizedPath, switchTo } = useI18n();
  const {
    ABOUT_BLOCKS,
    ABOUT_INTRO,
    ABOUT_SITE,
    APPROACH,
    BEST_FIT,
    HERO,
    CAPABILITIES,
    CASE_STUDIES,
    COVER,
    COVER_AVIF,
    COVER_WEBP,
    CREDENTIAL_GROUPS,
    CTA,
    CV_PDF,
    DELIVER,
    DGOM,
    DIAGNOSTIC,
    ENGAGEMENT,
    FRAMEWORKS,
    INSIGHTS,
    LINKS,
    LOCATION,
    LOCATION_HERO,
    MAPPING_TEASER,
    PROBLEMS,
    PROJECTS,
    SOCIAL_PROOF,
    WHITEPAPER_PDF,
    WHITEPAPER_PDF_ES,
  } = content;
  const paperPdf = locale === "es" ? WHITEPAPER_PDF_ES : WHITEPAPER_PDF;
  const otherLocale = locale === "es" ? "en" : "es";
  const navSections = [
    { id: "approach", label: t.nav.approach },
    { id: "case-studies", label: t.nav.caseStudies },
    { id: "projects", label: t.nav.projects },
    { id: "contact", label: t.nav.contact },
  ];
  const mobileNav = [
    { id: "diagnostic", label: t.mobile.diagnostic },
    { id: "approach", label: t.mobile.approach },
    { id: "case-studies", label: t.mobile.caseStudy },
    { id: "projects", label: t.mobile.projects },
    { id: "contact", label: t.mobile.contact },
    { to: localizedPath(EU_AI_ACT_MAPPING_PATH), label: t.mobile.mapping, view: "mapping" },
    { to: localizedPath(WHITEPAPER_PATH), label: t.mobile.whitepaper, view: "whitepaper" },
    { id: "about", label: t.mobile.about },
  ];
  const [view, setView] = useState(() => viewFromLocation(location.pathname, location.hash));
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const menuBtnRef = useRef(null);
  const moreBtnRef = useRef(null);
  const moreWrapRef = useRef(null);
  const headerRef = useRef(null);

  useEffect(() => {
    applyDocumentHead(location.pathname);
  }, [view, location.pathname]);

  useEffect(() => {
    const path = location.pathname.replace(/\/+$/, "") || "/";
    if (path === "/" || path === "/es") {
      const routed = hashToPathRoute(location.hash);
      if (routed) {
        navigate(
          { pathname: withLocale(routed.pathname, localeFromPath(location.pathname)), hash: routed.hash },
          { replace: true }
        );
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
    const ids = navSections.map((item) => item.id);
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

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    function apply() {
      document
        .querySelectorAll("details.mobile-disclose:not(.insights-toggle):not(.cred-toggle)")
        .forEach((el) => {
          el.open = mq.matches;
        });
    }
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [view]);

  function goHomeSection(id) {
    setMenuOpen(false);
    setMoreOpen(false);
    const hash = id || "top";
    if (location.pathname !== home) {
      navigate(`${home}#${hash}`);
      return;
    }
    if (view !== "home") {
      navigate(`${home}#${hash}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  }

  const identityLinks = (
    <>
      <a href={CV_PDF} download>
        {t.cv}
      </a>
      <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
        LinkedIn<span className="visually-hidden">{t.opensNewTab}</span>
      </a>
      <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
        GitHub<span className="visually-hidden">{t.opensNewTab}</span>
      </a>
      <a href={LINKS.medium} target="_blank" rel="noopener noreferrer">
        Medium<span className="visually-hidden">{t.opensNewTab}</span>
      </a>
    </>
  );
  const resourceLinks = (
    <>
      <a
        href="#about"
        onClick={(event) => {
          event.preventDefault();
          goHomeSection("about");
        }}
      >
        {t.nav.about}
      </a>
      {identityLinks}
    </>
  );

  return (
    <div className={view === "home" ? "site" : "site site-paper"}>
      <a className="skip" href="#main">
        {t.skip}
      </a>
      <header className="top" ref={headerRef}>
        <Link
          className="mark"
          to={`${home}#top`}
          aria-label={
            locale === "es"
              ? "tshapedconsultant, Ingeniería de Gobernanza de IA"
              : "tshapedconsultant, AI Governance Engineering"
          }
          onClick={() => {
            setMenuOpen(false);
            setMoreOpen(false);
          }}
        >
          <Icon name="shield" className="icon mark-icon" />
          <span className="mark-text">
            <span className="mark-name">
              <span className="mark-name-full">tshapedconsultant</span>
              <span className="mark-name-short">tshaped</span>
            </span>
            <small className="mark-sub-full">
              {locale === "es" ? "Ingeniería de Gobernanza de IA" : "AI Governance Engineering"}
            </small>
            <small className="mark-sub-short">{locale === "es" ? "Ing. gob. IA" : "AI Gov Eng."}</small>
          </span>
        </Link>
        <a
          className="nav-cta nav-cta-bar"
          href="#diagnostic"
          onClick={(event) => {
            event.preventDefault();
            goHomeSection("diagnostic");
          }}
        >
          {t.discuss}
        </a>
        <nav className="lang-switch" aria-label={t.language}>
          <Link
            className="lang-btn"
            to={switchTo(otherLocale)}
            hrefLang={otherLocale === "es" ? "es" : "en-GB"}
            lang={otherLocale === "es" ? "es" : "en-GB"}
            aria-label={otherLocale === "es" ? t.switchToEs : t.switchToEn}
            onClick={() => {
              setMenuOpen(false);
              setMoreOpen(false);
            }}
          >
            {otherLocale === "es" ? t.langEs : t.langEn}
          </Link>
        </nav>
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
          {menuOpen ? t.close : t.menu}
        </button>
        <nav id="site-nav" className={menuOpen ? "open" : undefined} aria-label={t.nav.primary}>
          <div className="nav-desktop">
            {navSections.map((item) => (
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
              to={localizedPath(EU_AI_ACT_MAPPING_PATH)}
              className={view === "mapping" ? "is-active" : undefined}
              aria-current={view === "mapping" ? "page" : undefined}
              onClick={() => {
                setMenuOpen(false);
                setMoreOpen(false);
              }}
            >
              {t.nav.euAiAct}
            </Link>
            <Link
              to={localizedPath(WHITEPAPER_PATH)}
              className={view === "whitepaper" ? "is-active" : undefined}
              aria-current={view === "whitepaper" ? "page" : undefined}
              onClick={() => {
                setMenuOpen(false);
                setMoreOpen(false);
              }}
            >
              {t.nav.whitepaper}
            </Link>
            <a
              className="nav-cta"
              href="#diagnostic"
              onClick={(event) => {
                event.preventDefault();
                goHomeSection("diagnostic");
              }}
            >
              {t.discuss}
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
                {t.resources}
              </button>
              <div id="more-menu" className={moreOpen ? "more-menu open" : "more-menu"} hidden={!moreOpen}>
                {resourceLinks}
              </div>
            </div>
          </div>
          <div className="nav-mobile">
            {mobileNav.map((item) =>
              item.to ? (
                <Link
                  key={item.to}
                  to={item.to}
                  className={view === item.view ? "is-active" : undefined}
                  aria-current={view === item.view ? "page" : undefined}
                  onClick={() => {
                    setMenuOpen(false);
                    setMoreOpen(false);
                  }}
                >
                  {item.label}
                </Link>
              ) : (
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
              )
            )}
            <a
              className="nav-cta"
              href="#diagnostic"
              onClick={(event) => {
                event.preventDefault();
                goHomeSection("diagnostic");
              }}
            >
              {t.discuss}
            </a>
            <div className="nav-secondary">{identityLinks}</div>
            <Link
              className="lang-menu-btn"
              to={switchTo(otherLocale)}
              hrefLang={otherLocale === "es" ? "es" : "en-GB"}
              lang={otherLocale === "es" ? "es" : "en-GB"}
              onClick={() => {
                setMenuOpen(false);
                setMoreOpen(false);
              }}
            >
              {otherLocale === "es" ? t.switchToEs : t.switchToEn}
            </Link>
          </div>
        </nav>
      </header>

      <main id="main" tabIndex={-1} inert={menuOpen ? true : undefined}>
        {view === "mapping" ? (
          <EuAiActMapping />
        ) : view === "whitepaper" ? (
          locale === "es" ? <WhitepaperEs /> : <Whitepaper />
        ) : view === "article" ? (
          locale === "es" ? <ArticleEs /> : <Article />
        ) : view === "hybrid" ? (
          locale === "es" ? <HybridProfilesEs /> : <HybridProfiles />
        ) : view === "notfound" ? (
          <NotFound />
        ) : (
          <>
            <section className="hero region-dark" id="top">
              <div className="hero-grid">
                <div className="hero-copy">
                  <p className="eyebrow loc-line">{LOCATION_HERO}</p>
                  <h1>
                    Andrés Lage Freire
                    <span className="h1-specialty">
                      {locale === "es" ? "Ingeniería de Gobernanza de IA" : "AI Governance Engineering"}
                    </span>
                  </h1>
                  <p className="tagline">{HERO.tagline}</p>
                  <p className="value-prop">{HERO.value}</p>
                  <p className="value-scope">{HERO.scope}</p>
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
                    </div>
                    <p className="cta-note">{CTA.note}</p>
                    <a
                      className="text-link hero-recruiter"
                      href="#about"
                      onClick={(event) => {
                        event.preventDefault();
                        goHomeSection("about");
                      }}
                    >
                      {t.hero.recruiter}
                    </a>
                  </div>
                </div>
                <details className="mobile-disclose hero-diagram">
                  <summary>{t.diagram.how}</summary>
                  <GovernanceDiagram />
                </details>
              </div>
            </section>

            <section id="why" className="region region-light region-mid">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    {t.why.num}
                  </p>
                  <h2>{t.why.title}</h2>
                </div>
                <p className="why-lead">{t.why.lead}</p>
                <details className="mobile-disclose why-more">
                  <summary>{t.why.readMore}</summary>
                  <div>
                    <p className="why-brutal">{t.why.brutal}</p>
                    <p className="why-close">{t.why.close}</p>
                  </div>
                </details>
                <div className="problem-grid">
                  {PROBLEMS.map((item) => (
                    <article className="risk-panel" key={item.title}>
                      <Icon name={item.icon} />
                      <h3>{item.title}</h3>
                      <p className="risk-sub">{item.subtitle}</p>
                      <details className="mobile-disclose risk-body">
                        <summary>{t.why.readMore}</summary>
                        <p>{item.text}</p>
                      </details>
                    </article>
                  ))}
                </div>
                <aside className="callout-pair">
                  <p className="best-fit">
                    <span className="callout-label">{t.why.bestFit}</span>
                    {BEST_FIT.replace(/^(Best fit|Mejor encaje):\s*/i, "")}
                  </p>
                </aside>
              </div>
            </section>

            <section id="diagnostic" className="region region-dark diagnostic-band region-major">
              <div className="region-inner diagnostic-layout">
                <article className="diag-panel">
                  <p className="eyebrow">{t.diagnostic.kicker}</p>
                  <div className="diag-title-row">
                    <h2>{DIAGNOSTIC.title}</h2>
                    <p className="meta-badge">{DIAGNOSTIC.duration}</p>
                  </div>
                  <p className="diag-lead">{DIAGNOSTIC.lead}</p>
                  <div className="diag-position-block">
                    <ul className="diag-nots">
                      {DIAGNOSTIC.negatives.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                    <p className="diag-hybrid">{DIAGNOSTIC.hybrid}</p>
                    <p className="diag-position">{DIAGNOSTIC.position}</p>
                  </div>
                  <ul className="diag-bands" aria-label={DIAGNOSTIC.bandsLabel}>
                    {DIAGNOSTIC.bands.map((band) => (
                      <li key={band.id}>
                        <p className="diag-band-name">{band.name}</p>
                        <p className="diag-band-price">
                          {band.price}{" "}
                          <span className="diag-band-vat">{band.vat}</span>
                        </p>
                        <p className="diag-band-for">{band.for}</p>
                        <p className="diag-band-includes-label">{band.includesLabel}</p>
                        <ul>
                          {band.includes.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <p className="diag-band-delivery">{band.delivery}</p>
                      </li>
                    ))}
                  </ul>
                  <p className="diag-price-note">{DIAGNOSTIC.priceNote}</p>
                  <a
                    className="btn btn-solid"
                    href="#diagnostic-form"
                    onClick={(event) => {
                      event.preventDefault();
                      document.getElementById("diagnostic-form")?.scrollIntoView({
                        behavior: scrollBehavior(),
                        block: "start",
                      });
                      document.getElementById("diag-name")?.focus();
                    }}
                  >
                    {CTA.primary}
                  </a>
                  <p className="cta-note cta-note-repeat">{CTA.note}</p>
                </article>
                <DiagnosticForm />
              </div>
            </section>

            <aside className="proof-strip region-dark" aria-label={t.proof}>
              <ul>
                {SOCIAL_PROOF.map((item) => (
                  <li key={item.id}>
                    {item.external ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer">
                        {item.text}
                        <span className="visually-hidden">{t.opensNewTab}</span>
                      </a>
                    ) : (
                      <a href={item.href} download={item.download ? true : undefined}>
                        {item.text}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </aside>

            <aside className="region region-light region-quiet mapping-teaser-band" aria-labelledby="mapping-teaser-title">
              <div className="region-inner">
                <article className="mapping-teaser">
                  <p className="callout-label">{MAPPING_TEASER.kicker}</p>
                  <h3 id="mapping-teaser-title">{MAPPING_TEASER.title}</h3>
                  <p className="mapping-teaser-text">{MAPPING_TEASER.text}</p>
                  <div className="mapping-teaser-actions">
                    <Link className="btn btn-solid" to={localizedPath(EU_AI_ACT_MAPPING_PATH)}>
                      {MAPPING_TEASER.cta}
                    </Link>
                    <a className="btn btn-ghost mapping-teaser-paper-btn" href={localizedPath(WHITEPAPER_PATH)}>
                      {t.mappingTeaser.whitepaper}
                    </a>
                  </div>
                  <p className="mapping-teaser-refs">
                    <a className="mapping-teaser-paper-inline" href={localizedPath(WHITEPAPER_PATH)}>
                      {t.mappingTeaser.whitepaper}
                    </a>
                    <span className="mapping-teaser-paper-sep"> · </span>
                    {t.mappingTeaser.refs}{" "}
                    <ExternalLink href={PROJECTS[2].href}>{PROJECTS[2].name}</ExternalLink>
                    {" · "}
                    <ExternalLink href={PROJECTS[0].href}>{PROJECTS[0].name}</ExternalLink>
                  </p>
                </article>
              </div>
            </aside>

            <section id="guardrails" className="region region-dark guard-band region-quiet">
              <div className="region-inner guard-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    {t.guard.num}
                  </p>
                  <h2>{t.guard.title}</h2>
                </div>
                <p className="guard-lead">{t.guard.lead}</p>
                <p className="principle-line">{t.guard.principle}</p>
                <details className="mobile-disclose guard-more">
                  <summary>{t.guard.cageSummary}</summary>
                  <div>
                    <p className="guard-determines">{t.guard.determines}</p>
                    <ol className="guard-chain">
                      {t.guard.chain.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                  </div>
                </details>
              </div>
            </section>

            <section id="approach" className="region region-light region-quiet">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    {t.approach.num}
                  </p>
                  <h2>{t.approach.title}</h2>
                </div>
                <div className="two-level">
                  <article>
                    <p className="level-kicker">{t.approach.business}</p>
                    <p>{t.approach.businessText}</p>
                  </article>
                  <article>
                    <p className="level-kicker">{t.approach.technical}</p>
                    <p>{t.approach.technicalText}</p>
                  </article>
                </div>
                <p className="approach-thesis">{HERO.principle}</p>

                <ol className="arch-flow" aria-label={t.pipeline.svgTitle}>
                  {APPROACH.map((step) => (
                    <li key={step.id}>
                      <Icon name={step.icon} />
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </li>
                  ))}
                </ol>

                <details className="mobile-disclose approach-more">
                  <summary>{t.approach.details}</summary>
                  <div className="approach-extra">
                    <div className="frameworks">
                      {FRAMEWORKS.map((item) => (
                        <article key={item.name}>
                          <Icon name={item.icon} />
                          <h3>{item.name}</h3>
                          <p>{item.caption}</p>
                        </article>
                      ))}
                    </div>
                    <p className="reg-line">{t.approach.readiness}</p>

                    <div className="dgom-block">
                      <p className="level-kicker">{t.approach.operating}</p>
                      <h3>{t.approach.dgomTitle}</h3>
                      <p className="dgom-sub">{t.approach.dgomSub}</p>
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
                        <h3>{t.approach.cageTitle}</h3>
                        <p>{t.approach.cageText}</p>
                      </article>
                      <article>
                        <h3>{t.approach.constitutionTitle}</h3>
                        <p>{t.approach.constitutionText}</p>
                      </article>
                    </div>
                  </div>
                </details>
              </div>
            </section>

            <section id="deliver" className="region region-light region-mid">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    {t.deliver.num}
                  </p>
                  <h2>{t.deliver.title}</h2>
                </div>
                <p className="section-lede">{t.deliver.lede}</p>
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
                      <details className="mobile-disclose deliver-body">
                        <summary>{t.deliver.included}</summary>
                        <ul>
                          {group.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </details>
                    </article>
                  ))}
                </div>
                <div className="engagement-block" id="engagement">
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
              </div>
            </section>

            <section id="case-studies" className="region region-light region-mist region-mid">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    {t.cases.num}
                  </p>
                  <h2>{t.cases.title}</h2>
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
                    <div className="case-problem">
                      <h4>{t.cases.problem}</h4>
                      <p>{study.problem}</p>
                    </div>
                    <h4 className="case-outcomes-label">{t.cases.outcomes}</h4>
                    <ol className="case-outcomes">
                      {study.outcomes.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ol>
                    <details className="mobile-disclose case-extra">
                      <summary>{t.cases.more}</summary>
                      <div>
                        <details className="disclose-always case-done">
                          <summary>{t.cases.done}</summary>
                          <ul>
                            {study.approach.map((item) => (
                              <li key={item}>{item}</li>
                            ))}
                          </ul>
                        </details>
                        <aside className="case-gov">
                          <h4>{t.cases.governance}</h4>
                          <p>{study.governance}</p>
                        </aside>
                        <p className="case-note">{study.note}</p>
                      </div>
                    </details>
                    <a className="btn btn-solid" href={study.pdf} download>
                      {t.cases.download}
                    </a>
                  </article>
                ))}
              </div>
            </section>

            <section id="projects" className="region region-light region-quiet">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    {t.projects.num}
                  </p>
                  <h2>{t.projects.title}</h2>
                </div>
                <p className="section-lede">{t.projects.lede}</p>
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
                        <strong>{t.projects.outcome}</strong> {project.outcome}
                      </p>
                      <ExternalLink className="project-link" href={project.href}>
                        {t.projects.view}
                      </ExternalLink>
                    </article>
                  ))}
                </div>
                <p className="more-repos">
                  <ExternalLink className="btn btn-ghost" href={LINKS.githubRepos}>
                    {t.projects.all}
                  </ExternalLink>
                </p>
              </div>
            </section>

            <section id="whitepaper-teaser" className="region region-dark paper-band region-quiet">
              <div className="region-inner paper-teaser">
                <div>
                  <div className="section-head">
                    <p className="num" aria-hidden="true">
                      {t.paper.num}
                    </p>
                    <h2>{t.paper.title}</h2>
                  </div>
                  <p className="paper-title-line">{t.paper.heading}</p>
                  <p className="paper-sub-line">{t.paper.sub}</p>
                  <div className="prose">
                    <p>{t.paper.body}</p>
                  </div>
                  <div className="hero-actions">
                    <a className="btn btn-solid" href={localizedPath(WHITEPAPER_PATH)}>
                      {t.paper.read}
                    </a>
                    <a className="btn btn-ghost" href={paperPdf} download>
                      {t.paper.pdf}
                    </a>
                  </div>
                  <p className="paper-also">
                    {t.paper.also}{" "}
                    <a href={LINKS.medium} target="_blank" rel="noopener noreferrer">
                      {t.paper.medium}
                      <span className="visually-hidden">{t.opensNewTab}</span>
                    </a>
                  </p>
                </div>
                <Picture
                  className="paper-cover-quiet"
                  src={COVER}
                  avif={COVER_AVIF}
                  webp={COVER_WEBP}
                  alt=""
                  width="1024"
                  height="486"
                  lazy
                />
              </div>
            </section>

            <section id="insights" className="region region-light region-quiet">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    {t.insights.num}
                  </p>
                  <h2>{t.insights.title}</h2>
                </div>
                <p className="section-lede">{t.insights.lede}</p>
                <ul className="insight-grid">
                  {INSIGHTS.map((item, index) => (
                    <li
                      className={[item.featured ? "featured" : "", index >= 2 ? "insight-extra" : ""]
                        .filter(Boolean)
                        .join(" ") || undefined}
                      key={item.href}
                    >
                      <Icon name={item.icon} />
                      <h3>
                        {item.internal ? (
                          <a href={localize(item.href)}>{item.title}</a>
                        ) : (
                          <ExternalLink href={item.href}>{item.title}</ExternalLink>
                        )}
                      </h3>
                      <p>{item.text}</p>
                      {item.internal ? (
                        <p className="insight-read">
                          <a href={localize(item.href)}>{t.insights.read}</a>
                        </p>
                      ) : null}
                    </li>
                  ))}
                </ul>
                <details className="mobile-disclose insights-toggle">
                  <summary>
                    <span className="when-closed">{t.insights.more}</span>
                    <span className="when-open">{t.insights.fewer}</span>
                  </summary>
                </details>
                <p className="more-repos">
                  <ExternalLink className="btn btn-ghost" href={LINKS.medium}>
                    {t.insights.allMedium}
                  </ExternalLink>
                </p>
              </div>
            </section>

            <section id="validation" className="region region-light region-quiet">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    {t.creds.num}
                  </p>
                  <h2>{t.creds.title}</h2>
                </div>
                {(() => {
                  let credentialIndex = 0;
                  return CREDENTIAL_GROUPS.map((group) => (
                    <div className="cred-group" key={group.label}>
                      <p className="cred-label">{group.label}</p>
                      {group.intro ? <p className="cred-intro">{group.intro}</p> : null}
                      <ul className="validation-grid">
                        {group.items.map((item) => {
                          const extra = credentialIndex >= 3;
                          credentialIndex += 1;
                          return (
                            <li
                              className={[item.featured ? "featured" : "", extra ? "cred-extra" : ""]
                                .filter(Boolean)
                                .join(" ") || undefined}
                              key={item.title}
                            >
                              <p className="val-kind">
                                {item.kind}
                                {item.inProgress ? <span className="in-progress">{t.creds.inProgress}</span> : null}
                              </p>
                              <h3>
                                {item.href ? (
                                  isInternalHref(item.href) ? (
                                    <a href={localize(item.href)}>{item.title}</a>
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
                                  {t.creds.press}{" "}
                                  <a href={item.sourceHref} target="_blank" rel="noopener noreferrer">
                                    {item.sourceLabel}
                                    <span className="visually-hidden">{t.opensNewTab}</span>
                                  </a>
                                </p>
                              ) : null}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ));
                })()}
                <details className="mobile-disclose cred-toggle">
                  <summary>
                    <span className="when-closed">{t.creds.more}</span>
                    <span className="when-open">{t.creds.fewer}</span>
                  </summary>
                </details>
              </div>
            </section>

            <section id="about" className="region region-light region-quiet">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    {t.about.num}
                  </p>
                  <h2>{t.about.title}</h2>
                </div>
                <p className="why-lead about-unusual">{t.about.unusual}</p>
                <p className="about-combo">{t.about.combo}</p>
                <p className="about-location">{LOCATION}</p>
                <div className="about-blocks">
                  {ABOUT_BLOCKS.map((item) => (
                    <article key={item.title}>
                      <Icon name={item.icon} />
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </article>
                  ))}
                </div>
                <details className="mobile-disclose about-bio-wrap">
                  <summary>{t.about.bio}</summary>
                  <div className="prose about-bio">
                    <p>{ABOUT_INTRO}</p>
                    <p>{ABOUT_SITE}</p>
                  </div>
                </details>
                <a className="btn btn-ghost" href={CV_PDF} download>
                  {t.about.cv}
                </a>
              </div>
            </section>

            <section id="contact" className="region region-dark contact-band region-major">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    {t.contact.num}
                  </p>
                  <h2>{t.contact.title}</h2>
                </div>
                <p className="closing">
                  {HERO.principle} {t.contact.closing}
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
                  <p className="cta-note cta-note-repeat">{CTA.note}</p>
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
            {t.discuss}
          </a>
          <p className="cta-note foot-cta-note">{CTA.note}</p>
          <a
            className="foot-email"
            href="#diagnostic"
            onClick={(event) => {
              event.preventDefault();
              goHomeSection("diagnostic");
            }}
          >
            {t.contact.email}
          </a>
        </div>
        <p className="foot-links">
          <a href={LINKS.linkedin} target="_blank" rel="noopener noreferrer">
            LinkedIn<span className="visually-hidden">{t.opensNewTab}</span>
          </a>
          <a href={LINKS.github} target="_blank" rel="noopener noreferrer">
            GitHub<span className="visually-hidden">{t.opensNewTab}</span>
          </a>
          <a href={LINKS.medium} target="_blank" rel="noopener noreferrer">
            {t.contact.medium}
            <span className="visually-hidden">{t.opensNewTab}</span>
          </a>
          <a href={CV_PDF} download>
            {t.cv}
          </a>
          <a href={`${home}#case-studies`}>{t.nav.caseStudies}</a>
          <Link to={localizedPath(EU_AI_ACT_MAPPING_PATH)}>{t.hero.mapping}</Link>
          <Link to={localizedPath(WHITEPAPER_PATH)}>{t.nav.whitepaper}</Link>
        </p>
        <p>© {new Date().getFullYear()} Andrés Lage Freire · tshapedconsultant.com</p>
        <p>{LOCATION}</p>
        <p>{t.contact.tagline}</p>
      </footer>
    </div>
  );
}
