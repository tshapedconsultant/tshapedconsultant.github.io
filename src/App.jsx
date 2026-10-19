import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Whitepaper from "./Whitepaper.jsx";
import Article from "./Article.jsx";
import HybridProfiles from "./HybridProfiles.jsx";
import EuAiActMapping from "./pages/EuAiActMapping";
import WhitepaperEs from "./pages/WhitepaperEs.jsx";
import ArticleEs from "./pages/ArticleEs.jsx";
import HybridProfilesEs from "./pages/HybridProfilesEs.jsx";
import InsightArticle from "./pages/InsightArticle.jsx";
import AiRuntimeRiskCheckPage from "./pages/AiRuntimeRiskCheckPage";
import PrivacyPage from "./pages/PrivacyPage";
import AiRuntimeRiskCheck from "./components/AiRuntimeRiskCheck";
import { pulseByPath } from "./data/pulseLibrary.ts";
import { Icon } from "./Icons.jsx";
import Picture from "./components/Picture.jsx";
import { FormNotConfiguredError, RateLimitError, contactEmail, isValidWorkEmail, submitEnquiry } from "./contact.js";
import { trackEvent } from "./lib/analytics";
import { useI18n } from "./i18n/LocaleContext";
import { applyDocumentHead } from "./i18n/documentHead.js";
import {
  ARTICLE,
  HYBRID_ARTICLE,
} from "./content.js";
import {
  EU_AI_ACT_MAPPING_PATH,
  PRIVACY_PATH,
  RISK_CHECK_PATH,
  WHITEPAPER_PATH,
  hashToPathRoute,
  isAppPath,
  isEuAiActMappingHash,
  isEuAiActMappingPath,
  isHybridProfilesPath,
  isMontesquieuPath,
  isPrivacyPath,
  isRiskCheckPath,
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
  if (isRiskCheckPath(pathname)) return "riskcheck";
  if (isPrivacyPath(pathname)) return "privacy";
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
  if (pulseByPath(pathname, localeFromPath(pathname))) return "insight";
  if (!isAppPath(pathname)) return "notfound";
  return "home";
}

function scrollToHash() {
  const pathname = window.location.pathname;
  if (
    isRiskCheckPath(pathname) ||
    isPrivacyPath(pathname) ||
    isEuAiActMappingPath(pathname) ||
    isWhitepaperPath(pathname) ||
    isHybridProfilesPath(pathname) ||
    isMontesquieuPath(pathname) ||
    pulseByPath(pathname, localeFromPath(pathname))
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

function enquiryMailtoHref({
  name,
  company,
  email,
  systemType,
  capability,
  govern,
  intentLabel,
  copy,
}) {
  const subject = encodeURIComponent(
    intentLabel ? `Organisation: ${intentLabel}` : "Organisation: site enquiry"
  );
  const body = encodeURIComponent(
    [
      copy.mailtoIntro,
      copy.mailtoSource,
      "",
      `${copy.name}: ${mailtoSafeLine(name)}`,
      `${copy.company}: ${mailtoSafeLine(company) || copy.mailtoNotSpecified}`,
      `${copy.email}: ${mailtoSafeLine(email, 254)}`,
      `${copy.systemType}: ${mailtoSafeLine(systemType) || copy.mailtoNotSpecified}`,
      `${copy.capability}: ${mailtoSafeLine(capability) || copy.mailtoNotSpecified}`,
      intentLabel ? `${copy.mailtoIntent} ${mailtoSafeLine(intentLabel)}` : null,
      "",
      copy.mailtoGovern,
      mailtoSafeBody(govern),
      "",
      "—",
      copy.mailtoFooter,
    ]
      .filter((line) => line !== null)
      .join("\n")
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

function DgomFlow({ model, phases }) {
  return (
    <figure className="dgom-flow" aria-labelledby="dgom-flow-caption">
      <figcaption id="dgom-flow-caption">{model.diagramLabel}</figcaption>
      <ol className="dgom-flow-stack">
        <li>{model.layers.top}</li>
        <li className="dgom-flow-core" aria-current="true">
          {model.layers.model}
        </li>
      </ol>
      <ol className="dgom-flow-phases" aria-label={`${phases[0].title} → ${phases.map((phase) => phase.title).slice(1).join(" → ")}`}>
        {phases.map((phase) => (
          <li key={phase.id}>{phase.title}</li>
        ))}
      </ol>
      <ol className="dgom-flow-stack">
        <li>{model.layers.outputs}</li>
        <li className="dgom-flow-core">{model.layers.runtime}</li>
      </ol>
    </figure>
  );
}

function DiagnosticForm({ intent, onIntentChange }) {
  const { t, content, localizedPath } = useI18n();
  const { DIAGNOSTIC_FORM } = content;
  const summaryRef = useRef(null);
  const [values, setValues] = useState({
    name: "",
    company: "",
    email: "",
    systemType: "",
    capability: "",
    govern: "",
    consent: false,
    hp: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle");
  const [submitError, setSubmitError] = useState("");
  const [mailtoFallback, setMailtoFallback] = useState("");

  function update(field) {
    return (event) => {
      const value = event.target.type === "checkbox" ? event.target.checked : event.target.value;
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
    else if (!isValidWorkEmail(data.email.trim())) next.email = t.form.errors.emailInvalid;
    if (!data.company.trim()) next.company = t.form.errors.company;
    if (!data.systemType.trim()) next.systemType = t.form.errors.systemType;
    if (!data.capability.trim()) next.capability = t.form.errors.capability;
    if (!data.govern.trim()) next.govern = t.form.errors.govern;
    if (!data.consent) next.consent = t.form.errors.consent;
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

    const intentLabel =
      DIAGNOSTIC_FORM.intents.find((option) => option.value === intent)?.label || "";

    setStatus("sending");
    try {
      await submitEnquiry({
        name: values.name,
        company: values.company,
        email: values.email,
        systemType: values.systemType,
        capability: values.capability,
        govern: values.govern,
        intent: intentLabel,
        caller: "Organisation",
        callerKey: "organisation",
        consent: values.consent,
        source: "commercial-diagnostic-form",
      });
      trackEvent("contact_submitted", {
        source: "commercial_form",
        intent: intent || "snapshot",
      });
      setStatus("sent");
      setValues({
        name: "",
        company: "",
        email: "",
        systemType: "",
        capability: "",
        govern: "",
        consent: false,
        hp: "",
      });
    } catch (err) {
      setStatus("idle");
      if (err instanceof RateLimitError) {
        setSubmitError(t.form.errors.rateLimit);
      } else if (err instanceof FormNotConfiguredError) {
        setSubmitError(DIAGNOSTIC_FORM.notConfigured);
      } else {
        setSubmitError(DIAGNOSTIC_FORM.error);
      }
      setMailtoFallback(
        enquiryMailtoHref({
          name: values.name,
          company: values.company,
          email: values.email,
          systemType: values.systemType,
          capability: values.capability,
          govern: values.govern,
          intentLabel,
          copy: t.form,
        })
      );
      requestAnimationFrame(() => summaryRef.current?.focus());
    }
  }

  const errorEntries = [
    ["name", t.form.name, errors.name, "#diag-name"],
    ["email", t.form.email, errors.email, "#diag-email"],
    ["company", t.form.company, errors.company, "#diag-company"],
    ["systemType", t.form.systemType, errors.systemType, "#diag-system-type"],
    ["capability", t.form.capability, errors.capability, "#diag-capability"],
    ["govern", t.form.govern, errors.govern, "#diag-govern"],
    ["consent", DIAGNOSTIC_FORM.consentLabel, errors.consent, "#diag-consent"],
  ].filter(([, , message]) => message);

  return (
    <form className="diag-form" id="diagnostic-form" onSubmit={onSubmit} noValidate>
      <p className="diag-form-kicker">{DIAGNOSTIC_FORM.kicker}</p>
      {DIAGNOSTIC_FORM.title ? <h3 className="diag-form-title">{DIAGNOSTIC_FORM.title}</h3> : null}
      {DIAGNOSTIC_FORM.lead ? <p className="diag-form-lead">{DIAGNOSTIC_FORM.lead}</p> : null}
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
        <div className="diag-form-wide">
          <label htmlFor="diag-intent">{DIAGNOSTIC_FORM.intentLabel}</label>
          <select
            id="diag-intent"
            name="intent"
            value={intent}
            onChange={(event) => onIntentChange(event.target.value)}
          >
            {DIAGNOSTIC_FORM.intents.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
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
        <div className="diag-form-wide">
          <label htmlFor="diag-company">
            {t.form.company} <span className="req">{t.required}</span>
          </label>
          <input
            id="diag-company"
            name="company"
            type="text"
            autoComplete="organization"
            maxLength={120}
            value={values.company}
            onChange={update("company")}
            aria-invalid={errors.company ? "true" : "false"}
            aria-describedby={errors.company ? "diag-company-error" : undefined}
            required
          />
          {errors.company ? (
            <p className="field-error" id="diag-company-error">
              {errors.company}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="diag-system-type">
            {t.form.systemType} <span className="req">{t.required}</span>
          </label>
          <select
            id="diag-system-type"
            name="systemType"
            value={values.systemType}
            onChange={update("systemType")}
            aria-invalid={errors.systemType ? "true" : "false"}
            aria-describedby={errors.systemType ? "diag-system-type-error" : undefined}
            required
          >
            {DIAGNOSTIC_FORM.systemTypes.map((option) => (
              <option key={option.label} value={option.value} disabled={option.value === ""}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.systemType ? (
            <p className="field-error" id="diag-system-type-error">
              {errors.systemType}
            </p>
          ) : null}
        </div>
        <div>
          <label htmlFor="diag-capability">
            {t.form.capability} <span className="req">{t.required}</span>
          </label>
          <select
            id="diag-capability"
            name="capability"
            value={values.capability}
            onChange={update("capability")}
            aria-invalid={errors.capability ? "true" : "false"}
            aria-describedby={errors.capability ? "diag-capability-error" : undefined}
            required
          >
            {DIAGNOSTIC_FORM.capabilities.map((option) => (
              <option key={option.label} value={option.value} disabled={option.value === ""}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.capability ? (
            <p className="field-error" id="diag-capability-error">
              {errors.capability}
            </p>
          ) : null}
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
        <div className="diag-form-wide consent-field">
          <label className="consent-checkbox-label" htmlFor="diag-consent">
            <input
              id="diag-consent"
              name="consent"
              type="checkbox"
              checked={values.consent}
              onChange={update("consent")}
              aria-invalid={errors.consent ? "true" : "false"}
              aria-describedby={errors.consent ? "diag-consent-error" : undefined}
              required
            />
            <span>
              {DIAGNOSTIC_FORM.consentLabel}{" "}
              <Link to={localizedPath(PRIVACY_PATH)} className="text-link">
                {DIAGNOSTIC_FORM.privacyLinkText}
              </Link>
              . <span className="req">{t.required}</span>
            </span>
          </label>
          {errors.consent ? (
            <p className="field-error" id="diag-consent-error">
              {errors.consent}
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
    AUTHORITY_ARCHITECTURE,
    BEST_FIT,
    HERO,
    CAPABILITIES,
    CASE_STUDIES,
    COVER,
    COVER_AVIF,
    COVER_WEBP,
    CREDENTIAL_GROUPS,
    CTA,
    DELIVER,
    DGOM,
    DGOM_MODEL,
    DIAGNOSTIC,
    ENABLEMENT_PROGRAMS,
    ENGAGEMENT,
    EXECUTIVE_BRIEF_PDF,
    FEATURED_HR_COPILOT,
    FRAMEWORKS,
    INSIGHTS,
    LINKS,
    LOCATION,
    LOCATION_HERO,
    MAPPING_TEASER,
    PAIN_SECTION,
    PARTNERS,
    PATH_SELECTOR,
    PROBLEMS,
    PROJECTS,
    SERVICE_LADDER,
    SOCIAL_PROOF,
    WHITEPAPER_PDF,
    WHITEPAPER_PDF_ES,
  } = content;
  const paperPdf = locale === "es" ? WHITEPAPER_PDF_ES : WHITEPAPER_PDF;
  const otherLocale = locale === "es" ? "en" : "es";
  const navSections = [
    { id: "risk-check", label: t.nav.riskCheck },
    { id: "services", label: t.nav.services },
    { id: "hr-copilot-case", label: t.nav.caseStudies },
    { id: "dgom", label: t.nav.dgom },
  ];
  const mobileNav = [
    { to: localizedPath(RISK_CHECK_PATH), label: t.mobile.riskCheck, view: "riskcheck" },
    { id: "diagnostic", label: t.mobile.diagnostic },
    { id: "services", label: t.mobile.services },
    { id: "enablement", label: locale === "es" ? "Talleres In-Company" : "In-Company Workshops" },
    { id: "hr-copilot-case", label: t.mobile.caseStudy },
    { id: "dgom", label: t.mobile.dgom },
    { id: "partners", label: t.mobile.partners },
    { id: "projects", label: t.mobile.projects },
    { to: localizedPath(EU_AI_ACT_MAPPING_PATH), label: t.mobile.mapping, view: "mapping" },
    { to: localizedPath(WHITEPAPER_PATH), label: t.mobile.whitepaper, view: "whitepaper" },
    { to: localizedPath(PRIVACY_PATH), label: t.mobile.privacy, view: "privacy" },
    { id: "about", label: t.mobile.about },
  ];
  const [view, setView] = useState(() => viewFromLocation(location.pathname, location.hash));
  const [menuOpen, setMenuOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [enquiryIntent, setEnquiryIntent] = useState("snapshot");
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
    if (location.pathname !== home || view !== "home") {
      navigate(`${home}#${hash}`);
      return;
    }
    document.getElementById(id)?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
    window.history.replaceState(null, "", `#${id}`);
  }

  function goToRiskCheck() {
    setMenuOpen(false);
    setMoreOpen(false);
    if (view === "home") {
      goHomeSection("risk-check");
      return;
    }
    navigate(localizedPath(RISK_CHECK_PATH));
  }

  function goToEnquiry(intent = "snapshot") {
    const product = intent === "diagnostic" ? "snapshot" : intent || "snapshot";
    setEnquiryIntent(product);
    goHomeSection("diagnostic");
    requestAnimationFrame(() => {
      document.getElementById("diag-name")?.focus();
    });
  }

  const identityLinks = (
    <>
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
      <Link
        to={localizedPath(RISK_CHECK_PATH)}
        onClick={() => {
          setMenuOpen(false);
          setMoreOpen(false);
        }}
      >
        {t.mobile.riskCheck}
      </Link>
      <a
        href="#enablement"
        onClick={(event) => {
          event.preventDefault();
          goHomeSection("enablement");
        }}
      >
        {locale === "es" ? "Talleres In-Company" : "In-Company Workshops"}
      </a>
      <a
        href="#partners"
        onClick={(event) => {
          event.preventDefault();
          goHomeSection("partners");
        }}
      >
        {t.nav.partners}
      </a>
      <a
        href="#about"
        onClick={(event) => {
          event.preventDefault();
          goHomeSection("about");
        }}
      >
        {t.nav.about}
      </a>
      <Link
        to={localizedPath(PRIVACY_PATH)}
        onClick={() => {
          setMenuOpen(false);
          setMoreOpen(false);
        }}
      >
        {t.nav.privacy}
      </Link>
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
          href="#risk-check"
          onClick={(event) => {
            event.preventDefault();
            goToRiskCheck();
          }}
        >
          {CTA.persistentPrimary || t.discuss}
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
              className="nav-cta-secondary"
              href="#diagnostic"
              onClick={(event) => {
                event.preventDefault();
                goToEnquiry("snapshot");
              }}
            >
              {CTA.persistentSecondary || t.discussSecondary}
            </a>
            <a
              className="nav-cta"
              href="#risk-check"
              onClick={(event) => {
                event.preventDefault();
                goToRiskCheck();
              }}
            >
              {CTA.persistentPrimary || t.discuss}
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
              href="#risk-check"
              onClick={(event) => {
                event.preventDefault();
                goToRiskCheck();
              }}
            >
              {CTA.persistentPrimary || t.discuss}
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
        {view === "riskcheck" ? (
          <AiRuntimeRiskCheckPage />
        ) : view === "privacy" ? (
          <PrivacyPage />
        ) : view === "mapping" ? (
          <EuAiActMapping />
        ) : view === "whitepaper" ? (
          locale === "es" ? <WhitepaperEs /> : <Whitepaper />
        ) : view === "article" ? (
          locale === "es" ? <ArticleEs /> : <Article />
        ) : view === "hybrid" ? (
          locale === "es" ? <HybridProfilesEs /> : <HybridProfiles />
        ) : view === "insight" ? (
          <InsightArticle />
        ) : view === "notfound" ? (
          <NotFound />
        ) : (
          <>
            {/* 1. HERO */}
            <section className="hero region-dark" id="top">
              <div className="hero-grid">
                <div className="hero-copy">
                  <p className="eyebrow loc-line">{HERO.kicker || LOCATION_HERO}</p>
                  <h1>
                    {HERO.headline}
                    <span className="h1-specialty">
                      {locale === "es" ? "Ingeniería de Gobernanza de IA" : "AI Governance Engineering"}
                    </span>
                  </h1>
                  <p className="value-prop">{HERO.value}</p>
                  {HERO.assets ? <p className="hero-assets">{HERO.assets}</p> : null}
                  <div className="hero-actions">
                    <div className="hero-cta-row">
                      <a
                        className="btn btn-solid"
                        href="#risk-check"
                        onClick={(event) => {
                          event.preventDefault();
                          goHomeSection("risk-check");
                        }}
                      >
                        {CTA.primary}
                      </a>
                      <a
                        className="btn btn-ghost"
                        href="#hr-copilot-case"
                        onClick={(event) => {
                          event.preventDefault();
                          goHomeSection("hr-copilot-case");
                        }}
                      >
                        {locale === "es" ? "Ver la demo técnica" : "Watch the technical demo"}
                      </a>
                      <a
                        className="btn btn-ghost"
                        href="#partners"
                        onClick={(event) => {
                          event.preventDefault();
                          goHomeSection("partners");
                        }}
                      >
                        {locale === "es" ? "Explorar co-delivery" : "Explore co-delivery"}
                      </a>
                    </div>
                    <p className="hero-qualify">{HERO.qualify}</p>
                    <p className="cta-note">{CTA.note}</p>
                  </div>
                </div>
                <details className="mobile-disclose hero-diagram">
                  <summary>{t.diagram.how}</summary>
                  <GovernanceDiagram />
                </details>
              </div>
            </section>

            {/* 2. SECCIÓN DE DOLOR INMEDIATA */}
            <section id="why" className="region region-light region-mid">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    {t.why.num}
                  </p>
                  <h2>{PAIN_SECTION ? PAIN_SECTION.title : t.why.title}</h2>
                </div>
                <p className="why-lead">{PAIN_SECTION ? PAIN_SECTION.lead : t.why.lead}</p>
                <div className="problem-grid pain-cards-grid">
                  {(PAIN_SECTION ? PAIN_SECTION.cards : PROBLEMS).map((item) => (
                    <article className="risk-panel" key={item.title}>
                      <Icon name={item.icon} />
                      <h3>{item.title}</h3>
                      <p className="risk-sub">{item.subtitle}</p>
                      <p className="risk-text">{item.text}</p>
                    </article>
                  ))}
                </div>
                <div className="pain-cta-bar">
                  <a
                    className="btn btn-solid"
                    href="#risk-check"
                    onClick={(event) => {
                      event.preventDefault();
                      goHomeSection("risk-check");
                    }}
                  >
                    {PAIN_SECTION ? PAIN_SECTION.cta : CTA.primary}
                  </a>
                  <Link className="btn btn-ghost" to={localizedPath(RISK_CHECK_PATH)}>
                    {locale === "es"
                      ? "Abrir en página dedicada (/es/ai-runtime-risk-check)"
                      : "Open dedicated assessment page (/ai-runtime-risk-check)"}
                  </Link>
                </div>
                <aside className="callout-pair">
                  <p className="best-fit">
                    <span className="callout-label">{t.why.bestFit}</span>
                    {BEST_FIT.replace(/^(Best fit|Mejor encaje):\s*/i, "")}
                  </p>
                </aside>

                {PATH_SELECTOR ? (
                  <div className="path-selector-box" aria-labelledby="path-selector-title">
                    <div className="path-selector-head">
                      <h3 id="path-selector-title">{PATH_SELECTOR.title}</h3>
                      <p className="path-selector-sub">{PATH_SELECTOR.subtitle}</p>
                    </div>
                    <div className="path-selector-buttons" role="group" aria-label={PATH_SELECTOR.title}>
                      {PATH_SELECTOR.options.map((opt) => (
                        <button
                          key={opt.id}
                          type="button"
                          className="path-selector-btn"
                          onClick={() => {
                            if (opt.intent) setEnquiryIntent(opt.intent);
                            goHomeSection(opt.target);
                          }}
                        >
                          <span className="path-selector-btn-label">[{opt.label}]</span>
                          <span className="path-selector-btn-sub">{opt.sub}</span>
                        </button>
                      ))}
                    </div>
                    {PATH_SELECTOR.threeEntries ? (
                      <div className="path-three-routes">
                        {PATH_SELECTOR.threeEntries.map((route) => (
                          <article key={route.id} className={`path-route-card path-route-${route.id}`}>
                            <p className="path-route-title">{route.title}</p>
                            <p className="path-route-role">{route.role}</p>
                            <ol className="path-route-steps">
                              {route.steps.map((step, idx) => (
                                <li key={step}>
                                  <span>{step}</span>
                                  {idx < route.steps.length - 1 ? (
                                    <span className="path-step-arrow" aria-hidden="true">
                                      ↓
                                    </span>
                                  ) : null}
                                </li>
                              ))}
                            </ol>
                            <a
                              className="btn btn-ghost path-route-cta"
                              href={`#${route.target}`}
                              onClick={(event) => {
                                event.preventDefault();
                                goHomeSection(route.target);
                              }}
                            >
                              {route.cta}
                            </a>
                          </article>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </section>

            {/* 3. AI RUNTIME RISK CHECK (EMBEBIDO) */}
            <section id="risk-check" className="region region-dark risk-check-band region-major">
              <div className="region-inner">
                <AiRuntimeRiskCheck
                  embedded={true}
                  onRequestSnapshot={() => goToEnquiry("snapshot")}
                  onViewDemo={() => goHomeSection("hr-copilot-case")}
                />
              </div>
            </section>

            {/* 4. CASO DESTACADO HR COPILOT (TGI v1) */}
            {FEATURED_HR_COPILOT ? (
              <section id="hr-copilot-case" className="region region-light region-mid hr-copilot-band">
                <div className="region-inner">
                  <div className="section-head">
                    <p className="num" aria-hidden="true">
                      02
                    </p>
                    <div>
                      <p className="eyebrow">{FEATURED_HR_COPILOT.kicker}</p>
                      <h2>{FEATURED_HR_COPILOT.title}</h2>
                    </div>
                  </div>
                  <p className="section-lede">{FEATURED_HR_COPILOT.subtitle}</p>

                  <div className="hr-acts-grid">
                    {FEATURED_HR_COPILOT.acts.map((act) => (
                      <article
                        key={act.id}
                        className={`hr-act-card hr-act-${act.tone}`}
                      >
                        <p className="hr-act-label">{act.label}</p>
                        <h3>{act.title}</h3>
                        <p>{act.text}</p>
                      </article>
                    ))}
                  </div>

                  <div className="hr-copilot-showcase">
                    <div className="hr-controls-panel">
                      <h3>{FEATURED_HR_COPILOT.controlsTitle}</h3>
                      <ol className="hr-controls-list">
                        {FEATURED_HR_COPILOT.controls.map((ctrl) => (
                          <li key={ctrl}>{ctrl}</li>
                        ))}
                      </ol>
                      <div className="hr-claim-box" role="note">
                        <p className="hr-claim-headline">{FEATURED_HR_COPILOT.resultClaim}</p>
                        <p className="hr-claim-scope">{FEATURED_HR_COPILOT.scopeNote}</p>
                      </div>
                      <div className="hero-cta-row hr-case-actions">
                        <a
                          className="btn btn-solid"
                          href="#risk-check"
                          onClick={(event) => {
                            event.preventDefault();
                            goHomeSection("risk-check");
                          }}
                        >
                          {CTA.primary}
                        </a>
                        <a
                          className="btn btn-ghost"
                          href="#diagnostic"
                          onClick={(event) => {
                            event.preventDefault();
                            goToEnquiry("snapshot");
                          }}
                        >
                          {locale === "es" ? "Solicitar AI Governance Snapshot" : "Request AI Governance Snapshot"}
                        </a>
                        <Link className="btn btn-ghost" to={FEATURED_HR_COPILOT.docsHref}>
                          {FEATURED_HR_COPILOT.docsCta}
                        </Link>
                      </div>
                    </div>

                    <figure className="project-demo hr-video-figure">
                      <video
                        key={`hr-featured-${locale}`}
                        controls
                        playsInline
                        preload="metadata"
                        poster={FEATURED_HR_COPILOT.poster}
                        width={1280}
                        height={800}
                      >
                        <source src={FEATURED_HR_COPILOT.video} type="video/mp4" />
                        {FEATURED_HR_COPILOT.captions ? (
                          <track
                            kind="subtitles"
                            src={FEATURED_HR_COPILOT.captions}
                            srcLang="es"
                            label="Español"
                            default
                          />
                        ) : null}
                      </video>
                      <figcaption>{FEATURED_HR_COPILOT.videoCaption}</figcaption>
                    </figure>
                  </div>
                </div>
              </section>
            ) : null}

            {/* 5. SERVICIOS REPOSICIONADOS EN 3 PASOS + PRECIOS */}
            <section id="services" className="region region-light region-mist region-mid">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    {t.services.num}
                  </p>
                  <div>
                    <p className="eyebrow">{SERVICE_LADDER.kicker}</p>
                    <h2>{SERVICE_LADDER.title}</h2>
                  </div>
                </div>
                <p className="section-lede">{SERVICE_LADDER.lead}</p>
                {DIAGNOSTIC.hierarchySteps ? (
                  <div className="service-hierarchy-strip" aria-label={DIAGNOSTIC.hierarchyTitle}>
                    <p className="service-hierarchy-title">{DIAGNOSTIC.hierarchyTitle}</p>
                    <ol className="service-hierarchy-list">
                      {DIAGNOSTIC.hierarchySteps.map((step) => (
                        <li key={step.rank} className="service-hierarchy-item">
                          <a
                            href={`#${step.target}`}
                            onClick={(event) => {
                              event.preventDefault();
                              goHomeSection(step.target);
                            }}
                          >
                            <span className="service-hierarchy-rank">{step.rank}</span>
                            <div className="service-hierarchy-body">
                              <strong>{step.name}</strong>
                              <span className="service-hierarchy-tag">{step.tag}</span>
                              <p>{step.desc}</p>
                            </div>
                          </a>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : null}
                <ul className="service-ladder">
                  {SERVICE_LADDER.items.map((item) => (
                    <li key={item.id}>
                      <article className="service-card">
                        <div className="service-card-top">
                          <p className="service-stage">{item.stage}</p>
                          {item.price ? <p className="service-price-badge">{item.price}</p> : null}
                        </div>
                        <h3>{item.name}</h3>
                        <p className="service-desc">{item.description}</p>
                        <p>
                          <span className="callout-label">{SERVICE_LADDER.problem}</span>
                          {item.problem}
                        </p>
                        <p>
                          <span className="callout-label">{SERVICE_LADDER.outcome}</span>
                          {item.outcome}
                        </p>
                        <p className="service-delivers-label">{SERVICE_LADDER.deliverables}</p>
                        <ul>
                          {item.deliverables.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                        <p className="service-legal-note">
                          <span className="callout-label">{SERVICE_LADDER.audience}</span>
                          {item.audience}
                        </p>
                        {item.intent === "risk-check" ? (
                          <a
                            className="btn btn-solid"
                            href="#risk-check"
                            onClick={(event) => {
                              event.preventDefault();
                              goHomeSection("risk-check");
                            }}
                          >
                            {item.cta}
                          </a>
                        ) : (
                          <a
                            className="btn btn-solid"
                            href="#diagnostic"
                            onClick={(event) => {
                              event.preventDefault();
                              goToEnquiry(item.intent);
                            }}
                          >
                            {item.cta}
                          </a>
                        )}
                      </article>
                    </li>
                  ))}
                </ul>
                <p className="service-expand">{SERVICE_LADDER.expand}</p>
              </div>
            </section>

            {/* 5B. PUERTA DE ENTRADA IN-COMPANY: DEL PDF LEGAL AL CÓDIGO */}
            {ENABLEMENT_PROGRAMS ? (
              <section id="enablement" className="region region-light region-mid enablement-band">
                <div className="region-inner">
                  <div className="section-head">
                    <p className="num" aria-hidden="true">
                      04
                    </p>
                    <div>
                      <p className="eyebrow">{ENABLEMENT_PROGRAMS.kicker}</p>
                      <h2>{ENABLEMENT_PROGRAMS.title}</h2>
                    </div>
                  </div>
                  <p className="section-lede">{ENABLEMENT_PROGRAMS.lead}</p>
                  <p className="enablement-audience-badge">{ENABLEMENT_PROGRAMS.audienceTag}</p>
                  <ul className="service-ladder enablement-grid">
                    {ENABLEMENT_PROGRAMS.formats
                      .filter((fmt) => fmt.id !== "briefing")
                      .map((fmt) => (
                        <li key={fmt.id}>
                          <article className="service-card enablement-card">
                            <div className="service-card-top">
                              <p className="service-stage">{fmt.badge}</p>
                              <p className="service-price-badge">{fmt.price}</p>
                            </div>
                            <h3>{fmt.title}</h3>
                            <p className="enablement-duration">{fmt.duration}</p>
                            <p className="service-desc">{fmt.hook}</p>
                            <ul className="enablement-topics">
                              {fmt.topics.map((topic) => (
                                <li key={topic}>{topic}</li>
                              ))}
                            </ul>
                            <a
                              className="btn btn-solid"
                              href="#diagnostic"
                              onClick={(event) => {
                                event.preventDefault();
                                goToEnquiry(fmt.intent);
                              }}
                            >
                              {fmt.cta}
                            </a>
                          </article>
                        </li>
                      ))}
                  </ul>
                  {ENABLEMENT_PROGRAMS.formats
                    .filter((fmt) => fmt.id === "briefing")
                    .map((briefing) => (
                      <aside key={briefing.id} className="enablement-briefing-bar">
                        <div className="enablement-briefing-copy">
                          <p className="callout-label">
                            {briefing.badge} · {briefing.duration} · {briefing.price}
                          </p>
                          <h3>{briefing.title}</h3>
                          <p>{briefing.hook}</p>
                        </div>
                        <a
                          className="btn btn-ghost"
                          href="#diagnostic"
                          onClick={(event) => {
                            event.preventDefault();
                            goToEnquiry(briefing.intent);
                          }}
                        >
                          {briefing.cta}
                        </a>
                      </aside>
                    ))}
                  <aside className="enablement-bridge">
                    <p className="callout-label">{ENABLEMENT_PROGRAMS.bridge.kicker}</p>
                    <h3>{ENABLEMENT_PROGRAMS.bridge.title}</h3>
                    <p>{ENABLEMENT_PROGRAMS.bridge.text}</p>
                  </aside>
                </div>
              </section>
            ) : null}

            {/* 6. DGOM OPERATING MODEL */}
            <section id="dgom" className="region region-dark dgom-band region-major">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    05
                  </p>
                  <h2>{DGOM_MODEL.title}</h2>
                </div>
                <p className="dgom-kicker">{DGOM_MODEL.kicker}</p>
                <p className="dgom-lead">{DGOM_MODEL.lead}</p>
                <p className="dgom-designed">{DGOM_MODEL.designed}</p>
                <ol className="dgom-phases" aria-label="PLAN → BUILD → DEPLOY → MONITOR">
                  {DGOM.map((phase) => (
                    <li key={phase.id}>
                      <h3>{phase.title}</h3>
                      <p>{phase.text}</p>
                    </li>
                  ))}
                </ol>
                <DgomFlow model={DGOM_MODEL} phases={DGOM} />
                <p className="dgom-disclaimer">{DGOM_MODEL.disclaimer}</p>
                <div className="hero-cta-row dgom-actions">
                  <a className="btn btn-solid" href={EXECUTIVE_BRIEF_PDF} download>
                    {DGOM_MODEL.briefCta}
                  </a>
                  <a
                    className="btn btn-ghost"
                    href="#diagnostic"
                    onClick={(event) => {
                      event.preventDefault();
                      goToEnquiry("blueprint");
                    }}
                  >
                    {CTA.persistentSecondary || t.discussSecondary}
                  </a>
                </div>
              </div>
            </section>

            {/* 7. ARQUITECTURA DE AUTORIDAD Y PRUEBA SOCIAL (4 BLOQUES) */}
            {AUTHORITY_ARCHITECTURE ? (
              <section id="authority" className="region region-light region-mid authority-band">
                <div className="region-inner">
                  <div className="section-head">
                    <p className="num" aria-hidden="true">
                      06
                    </p>
                    <div>
                      <p className="eyebrow">{AUTHORITY_ARCHITECTURE.kicker}</p>
                      <h2>{AUTHORITY_ARCHITECTURE.title}</h2>
                    </div>
                  </div>
                  <p className="section-lede">{AUTHORITY_ARCHITECTURE.lead}</p>
                  <div className="authority-grid">
                    {AUTHORITY_ARCHITECTURE.blocks.map((block) => (
                      <article className="authority-card" key={block.step}>
                        <p className="authority-step">{block.step}</p>
                        <h3>{block.title}</h3>
                        <p className="authority-summary">{block.summary}</p>
                        <ul>
                          {block.items.map((line) => (
                            <li key={line}>{line}</li>
                          ))}
                        </ul>
                      </article>
                    ))}
                  </div>
                </div>
              </section>
            ) : null}

            {/* 8. FORMULARIO COMERCIAL Y ORIENTACIÓN DE PRECIOS */}
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
                        <p className="diag-band-step">
                          {band.step} — {band.kind}
                        </p>
                        <p className="diag-band-name">{band.name}</p>
                        <p className="diag-band-price">
                          {band.price}{" "}
                          <span className="diag-band-vat">{band.vat}</span>
                        </p>
                        <p className="diag-band-sub">{band.subtitle}</p>
                        <p className="diag-band-includes-label">{DIAGNOSTIC.includesLabel}</p>
                        <ul>
                          {band.includes.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <p className="diag-band-includes-label">{DIAGNOSTIC.limitsLabel}</p>
                        <ul>
                          {band.limits.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                        <p>
                          <span className="callout-label">{DIAGNOSTIC.forLabel}</span>
                          {band.for}
                        </p>
                        <a
                          className="btn btn-solid diag-band-cta"
                          href="#diagnostic-form"
                          onClick={(event) => {
                            event.preventDefault();
                            goToEnquiry(band.intent);
                          }}
                        >
                          {band.cta}
                        </a>
                      </li>
                    ))}
                  </ul>
                  <aside className="diag-limits">
                    <h3>{DIAGNOSTIC.limitsTitle}</h3>
                    <p className="diag-nature">{DIAGNOSTIC.nature}</p>
                    <p className="diag-limits-label">{DIAGNOSTIC.clientLabel}</p>
                    <ul>
                      {DIAGNOSTIC.clientProvides.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </aside>
                  <p className="diag-price-note">{DIAGNOSTIC.priceNote}</p>
                  <p className="cta-note cta-note-repeat">{CTA.note}</p>
                </article>
                <DiagnosticForm
                  intent={enquiryIntent}
                  onIntentChange={setEnquiryIntent}
                />
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

            <section id="partners" className="region region-light region-mid">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    07
                  </p>
                  <h2>{PARTNERS.title}</h2>
                </div>
                <p className="partners-kicker">{PARTNERS.kicker}</p>
                <p className="section-lede">{PARTNERS.lead}</p>
                <p className="partners-highlight">{PARTNERS.highlight}</p>
                <div className="partners-split">
                  <article>
                    <h3>{PARTNERS.partnerProvidesTitle}</h3>
                    <ul>
                      {PARTNERS.partnerProvides.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                  <article>
                    <h3>{PARTNERS.practiceProvidesTitle}</h3>
                    <ul>
                      {PARTNERS.practiceProvides.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </article>
                </div>
                <p className="partners-models-lead">{PARTNERS.modelsLead}</p>
                <ul className="partners-models">
                  {PARTNERS.models.map((model) => (
                    <li key={model.name}>
                      <h3>{model.name}</h3>
                      <p>{model.text}</p>
                    </li>
                  ))}
                </ul>
                <p className="dgom-disclaimer">{PARTNERS.boundary}</p>
                <a
                  className="btn btn-solid"
                  href="#diagnostic"
                  onClick={(event) => {
                    event.preventDefault();
                    goToEnquiry("partners");
                  }}
                >
                  {PARTNERS.cta}
                </a>
              </div>
            </section>

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
                    <ExternalLink href={PROJECTS.find((project) => project.name === "Porto Seguro Compliance Hub").href}>
                      Porto Seguro Compliance Hub
                    </ExternalLink>
                    {" · "}
                    <ExternalLink href={PROJECTS.find((project) => project.name === "Enterprise AI Risk Console").href}>
                      Enterprise AI Risk Console
                    </ExternalLink>
                  </p>
                </article>
              </div>
            </aside>

            <section id="guardrails" className="region region-dark guard-band region-quiet">
              <div className="region-inner guard-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    08
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
                    09
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

                    <p className="dgom-pointer">
                      <a
                        href="#dgom"
                        onClick={(event) => {
                          event.preventDefault();
                          goHomeSection("dgom");
                        }}
                      >
                        {t.approach.seeModel}
                      </a>
                    </p>

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
                    10
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
                    11
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
                      {study.downloadLabel || t.cases.download}
                    </a>
                  </article>
                ))}
              </div>
            </section>

            <section id="projects" className="region region-light region-quiet">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    12
                  </p>
                  <h2>{t.projects.title}</h2>
                </div>
                <p className="section-lede">{t.projects.lede}</p>
                <div className="project-grid">
                  {PROJECTS.map((project) => (
                    <article className="project" key={project.href || project.liveHref || project.name}>
                      <header>
                        <p className="flag">{project.num}</p>
                        <p className="ver">{project.category}</p>
                        <h3>{project.name}</h3>
                      </header>
                      {project.lead ? <p className="project-lead">{project.lead}</p> : null}
                      <p>{project.summary}</p>
                      {project.controlFlow ? (
                        <div className="project-flow-block" role="group" aria-label={project.controlFlowLabel}>
                          <p className="project-flow-label">{project.controlFlowLabel}</p>
                          <ol className="project-flow">
                            {project.controlFlow.map((step) => (
                              <li key={step}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      ) : null}
                      {project.video ? (
                        <figure className="project-demo">
                          <video
                            key={locale}
                            controls
                            playsInline
                            preload="metadata"
                            poster={project.poster}
                            width={project.videoWidth || 1280}
                            height={project.videoHeight || 806}
                          >
                            <source src={project.video} type="video/mp4" />
                            {project.captions ? (
                              <track
                                kind="subtitles"
                                src={project.captions}
                                srcLang="es"
                                label="Español"
                                default
                              />
                            ) : null}
                          </video>
                          <figcaption>{project.videoCaption}</figcaption>
                        </figure>
                      ) : null}
                      {project.schemaVideo ? (
                        <figure className="project-demo">
                          <video
                            controls
                            playsInline
                            preload="metadata"
                            poster={project.schemaPoster}
                            width="1600"
                            height="948"
                          >
                            <source src={project.schemaVideo} type="video/mp4" />
                          </video>
                          <figcaption>{project.schemaCaption}</figcaption>
                        </figure>
                      ) : null}
                      <ul className="stack-tags">
                        {project.stack.split(" · ").map((tag) => (
                          <li key={tag}>{tag}</li>
                        ))}
                      </ul>
                      <p className="outcome">
                        <strong>{t.projects.outcome}</strong> {project.outcome}
                      </p>
                      <div className="project-actions">
                        {project.liveHref ? (
                          <ExternalLink className="btn btn-solid" href={project.liveHref}>
                            {project.liveCta || t.projects.live}
                          </ExternalLink>
                        ) : null}
                        {project.href ? (
                          <ExternalLink className="project-link" href={project.href}>
                            {t.projects.view}
                          </ExternalLink>
                        ) : null}
                      </div>
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
                      13
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
                  <p className="paper-brief-lead">{t.paper.briefLead}</p>
                  <div className="hero-actions">
                    <a className="btn btn-ghost" href={EXECUTIVE_BRIEF_PDF} download>
                      {t.paper.brief}
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
                    14
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
                    15
                  </p>
                  <h2>{t.creds.title}</h2>
                </div>
                {(() => {
                  let credentialIndex = 0;
                  return CREDENTIAL_GROUPS.map((group) => (
                    <div className="cred-group" key={group.label}>
                      <p className="cred-label">{group.label}</p>
                      {group.quote ? (
                        <blockquote className="epigraph cred-epigraph">
                          {locale === "es" ? `«${group.quote}»` : `“${group.quote}”`}
                          {group.cite ? <cite>{group.cite}</cite> : null}
                        </blockquote>
                      ) : null}
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
                                  item.href.endsWith(".pdf") ? (
                                    <a href={item.href} download>
                                      {item.title}
                                    </a>
                                  ) : isInternalHref(item.href) ? (
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
                    16
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
              </div>
            </section>

            <section id="contact" className="region region-dark contact-band region-major">
              <div className="region-inner">
                <div className="section-head">
                  <p className="num" aria-hidden="true">
                    17
                  </p>
                  <h2>{t.contact.title}</h2>
                </div>
                <p className="closing">
                  {HERO.principle} {t.contact.closing}
                </p>
                <div className="cta-primary">
                  <div className="hero-cta-row">
                    <a
                      className="btn btn-solid"
                      href="#risk-check"
                      onClick={(event) => {
                        event.preventDefault();
                        goHomeSection("risk-check");
                      }}
                    >
                      {CTA.primary}
                    </a>
                    <a
                      className="btn btn-ghost"
                      href="#diagnostic"
                      onClick={(event) => {
                        event.preventDefault();
                        goToEnquiry("snapshot");
                      }}
                    >
                      {CTA.persistentSecondary || t.discussSecondary}
                    </a>
                  </div>
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
            href="#risk-check"
            onClick={(event) => {
              event.preventDefault();
              goToRiskCheck();
            }}
          >
            {CTA.persistentPrimary || t.discuss}
          </a>
          <p className="cta-note foot-cta-note">{CTA.note}</p>
          <a
            className="foot-email"
            href="#diagnostic"
            onClick={(event) => {
              event.preventDefault();
              goToEnquiry("snapshot");
            }}
          >
            {CTA.persistentSecondary || t.contact.email}
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
          <Link to={localizedPath(RISK_CHECK_PATH)}>{t.mobile.riskCheck}</Link>
          <a href={`${home}#services`}>{t.nav.services}</a>
          <a href={`${home}#enablement`}>{locale === "es" ? "Talleres In-Company" : "Workshops"}</a>
          <a href={`${home}#hr-copilot-case`}>{t.nav.caseStudies}</a>
          <Link to={localizedPath(EU_AI_ACT_MAPPING_PATH)}>{t.hero.mapping}</Link>
          <Link to={localizedPath(WHITEPAPER_PATH)}>{t.nav.whitepaper}</Link>
          <Link to={localizedPath(PRIVACY_PATH)}>{t.nav.privacy}</Link>
        </p>
        <p className="foot-copyright">
          {t.footer.copyright.replace("{year}", String(new Date().getFullYear()))}
        </p>
        <p className="foot-notice">{t.footer.notice}</p>
        <p>{LOCATION}</p>
        <p>{t.contact.tagline}</p>
      </footer>
    </div>
  );
}
