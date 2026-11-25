import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FormNotConfiguredError,
  RateLimitError,
  contactEmail,
  isValidWorkEmail,
  submitEnquiry,
} from "../contact.js";
import { useI18n } from "../i18n/LocaleContext";
import { trackEvent } from "../lib/analytics";
import { PRIVACY_PATH } from "../routes";

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

export default function DiagnosticForm({ intent, onIntentChange, enquirySource = "" }) {
  const { t, content, localizedPath } = useI18n();
  const { DIAGNOSTIC_FORM } = content;
  const summaryRef = useRef(null);
  const formStarted = useRef(false);
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
        source: enquirySource || "commercial-diagnostic-form",
      });
      // One successful delivery emits both events for compatibility.
      // diagnostic_form_submit_success is the primary conversion.
      // Do not sum it with contact_submitted.
      trackEvent("contact_submitted", {
        source: enquirySource || "commercial_form",
        intent: intent || "snapshot",
      });
      trackEvent("diagnostic_form_submit_success", {
        source: enquirySource || "diagnostic_form",
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
    <form
      className="diag-form"
      id="diagnostic-form"
      onSubmit={onSubmit}
      noValidate
      onFocusCapture={(event) => {
        // One start per mounted attempt. Leaving the page drops the ref, so a
        // return visit can start again. A failed validation, a network error,
        // or another field in the same visit does not emit a second start.
        // Submit buttons and links are not a start.
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const tag = target.tagName;
        if (tag !== "INPUT" && tag !== "SELECT" && tag !== "TEXTAREA") return;
        if (target.id === "diag-hp") return;
        if (formStarted.current) return;
        formStarted.current = true;
        trackEvent("diagnostic_form_start", {
          source: enquirySource || "diagnostic_form",
          intent: intent || "snapshot",
        });
      }}
    >
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

