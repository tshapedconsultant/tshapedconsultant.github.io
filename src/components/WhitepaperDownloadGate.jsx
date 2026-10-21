import { useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FormNotConfiguredError,
  RateLimitError,
  isValidWorkEmail,
  submitEnquiry,
} from "../contact.js";
import {
  EXECUTIVE_BRIEF_PDF,
  WHITEPAPER_PDF,
  WHITEPAPER_PDF_ES,
} from "../content.js";
import { useI18n } from "../i18n/LocaleContext";
import { trackEvent } from "../lib/analytics";
import { PRIVACY_PATH, WHITEPAPER_PATH } from "../routes";

const UNLOCK_STORAGE_KEY = "tshaped_wp_mailing_unlocked_v1";

function isAlreadyUnlocked() {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(UNLOCK_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function markUnlocked() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(UNLOCK_STORAGE_KEY, "1");
  } catch {
    // ignore storage quota errors
  }
}

const PDF_DOWNLOAD_FILENAMES = {
  [WHITEPAPER_PDF_ES]: "Los modelos probabilísticos requieren gobernanza determinista.pdf",
  [WHITEPAPER_PDF]: "Probabilistic Models Require Deterministic Governance.pdf",
  [EXECUTIVE_BRIEF_PDF]: "Dedalo-Executive-Brief.pdf",
};

function triggerBrowserDownload(href) {
  if (typeof document === "undefined" || !href) return;
  const link = document.createElement("a");
  link.href = href;
  link.setAttribute("download", PDF_DOWNLOAD_FILENAMES[href] || "");
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const COPY = {
  es: {
    kicker: "Lista de correo y descarga de Whitepaper (PDF)",
    title: "Descarga el Whitepaper en PDF y únete a la lista de correo",
    lead: "Deja tu email para descargar la edición completa en PDF (ES · 28 págs. / EN · 25 págs.) y recibir nuevos análisis técnicos, plantillas OPA/Rego y actualizaciones de gobernanza de IA.",
    emailLabel: "Tu email",
    emailPlaceholder: "nombre@empresa.com",
    consentLabel:
      "Acepto recibir el whitepaper en PDF y suscribirme a la lista de correo sobre gobernanza de IA y Runtime Assurance (baja en 1 clic en cualquier momento).",
    privacyLink: "Política de privacidad",
    submitBtn: "Unirme y descargar PDF",
    submittingBtn: "Procesando…",
    unlockedTitle: "Suscripción confirmada · Descarga desbloqueada",
    unlockedLead:
      "Gracias por unirte a la lista de correo. Tu descarga se ha iniciado automáticamente; también puedes descargar cualquiera de las ediciones aquí:",
    downloadEs: "Descargar Whitepaper en Español (PDF)",
    downloadEn: "Descargar Whitepaper en Inglés (PDF)",
    downloadBrief: "Descargar Dédalo™ Executive Brief (PDF)",
    readOnline: "Leer en este sitio",
    errors: {
      emailRequired: "Introduce tu dirección de email para continuar.",
      emailInvalid: "Introduce una dirección de email válida.",
      consentRequired: "Debes aceptar la suscripción a la lista de correo para descargar el PDF.",
    },
  },
  en: {
    kicker: "Mailing list & Whitepaper download (PDF)",
    title: "Download the Whitepaper PDF & join the mailing list",
    lead: "Leave your email to download the full PDF edition (EN · 25 pp. / ES · 28 pp.) and receive new technical essays, OPA/Rego templates, and AI governance updates.",
    emailLabel: "Your email",
    emailPlaceholder: "name@company.com",
    consentLabel:
      "I agree to receive the whitepaper PDF and subscribe to the AI Governance & Runtime Assurance mailing list (one-click unsubscribe anytime).",
    privacyLink: "Privacy policy",
    submitBtn: "Join mailing list & download PDF",
    submittingBtn: "Processing…",
    unlockedTitle: "Subscription confirmed · Download unlocked",
    unlockedLead:
      "Thank you for joining the mailing list. Your download has started automatically; you can also download any edition directly below:",
    downloadEn: "Download English Whitepaper (PDF)",
    downloadEs: "Download Spanish Whitepaper (PDF)",
    downloadBrief: "Download Dédalo™ Executive Brief (PDF)",
    readOnline: "Read on this site",
    errors: {
      emailRequired: "Enter your email address to continue.",
      emailInvalid: "Enter a valid email address.",
      consentRequired: "Please accept the mailing list consent to download the PDF.",
    },
  },
};

export default function WhitepaperDownloadGate({
  source = "whitepaper_page",
  showReadOnlineButton = false,
}) {
  const { locale, localizedPath } = useI18n();
  const isEs = locale === "es";
  const copy = isEs ? COPY.es : COPY.en;
  const primaryPdf = isEs ? WHITEPAPER_PDF_ES : WHITEPAPER_PDF;

  const formId = useId();
  const emailInputRef = useRef(null);

  const [unlocked, setUnlocked] = useState(() => isAlreadyUnlocked());
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [targetPdf, setTargetPdf] = useState(primaryPdf);

  function handleLockedClick(event, pdfHref) {
    if (unlocked) return;
    event.preventDefault();
    setTargetPdf(pdfHref || primaryPdf);
    emailInputRef.current?.focus();
  }

  function validate() {
    const next = {};
    if (!email.trim()) {
      next.email = copy.errors.emailRequired;
    } else if (!isValidWorkEmail(email.trim())) {
      next.email = copy.errors.emailInvalid;
    }
    if (!consent) {
      next.consent = copy.errors.consentRequired;
    }
    return next;
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      if (nextErrors.email) {
        emailInputRef.current?.focus();
      }
      return;
    }

    const pdfToDownload = targetPdf || primaryPdf;

    if (hp.trim()) {
      markUnlocked();
      setUnlocked(true);
      triggerBrowserDownload(pdfToDownload);
      return;
    }

    setSubmitting(true);
    try {
      await submitEnquiry({
        email: email.trim(),
        consent: true,
        mailingList: true,
        callerKey: "mailing_list",
        caller: "Mailing List Subscriber",
        intent: isEs
          ? "Suscripción a Mailing List + Descarga Whitepaper PDF (ES)"
          : "Mailing List Subscription + Whitepaper PDF Download (EN)",
        source,
        govern: `Mailing list signup & whitepaper download (${pdfToDownload})`,
      });
    } catch (err) {
      if (err instanceof RateLimitError || err instanceof FormNotConfiguredError) {
        // Proceed gracefully so local/preview environments still unlock the download
      }
    } finally {
      setSubmitting(false);
      markUnlocked();
      setUnlocked(true);
      trackEvent("whitepaper_mailing_list_joined", {
        source,
        intent: "mailing_list",
      });
      triggerBrowserDownload(pdfToDownload);
    }
  }

  return (
    <div className="wp-mailing-gate" id="whitepaper-download">
      <div className="paper-download">
        {showReadOnlineButton ? (
          <a className="btn btn-solid" href={localizedPath(WHITEPAPER_PATH)}>
            {copy.readOnline}
          </a>
        ) : null}
        <a
          className={showReadOnlineButton ? "btn btn-ghost" : "btn btn-solid"}
          href={primaryPdf}
          download={unlocked ? PDF_DOWNLOAD_FILENAMES[primaryPdf] : undefined}
          onClick={(e) => handleLockedClick(e, primaryPdf)}
        >
          {isEs ? copy.downloadEs : copy.downloadEn}
        </a>
        <a
          className="btn btn-ghost"
          href={EXECUTIVE_BRIEF_PDF}
          download={unlocked ? PDF_DOWNLOAD_FILENAMES[EXECUTIVE_BRIEF_PDF] : undefined}
          onClick={(e) => handleLockedClick(e, EXECUTIVE_BRIEF_PDF)}
        >
          {copy.downloadBrief}
        </a>
      </div>

      {unlocked ? (
        <div className="wp-mailing-card wp-mailing-unlocked" role="status" aria-live="polite">
          <p className="wp-mailing-kicker">{copy.unlockedTitle}</p>
          <p className="wp-mailing-lead">{copy.unlockedLead}</p>
          <div className="wp-mailing-links">
            <a
              className="btn btn-solid"
              href={WHITEPAPER_PDF_ES}
              download={PDF_DOWNLOAD_FILENAMES[WHITEPAPER_PDF_ES]}
            >
              {copy.downloadEs}
            </a>
            <a
              className="btn btn-ghost"
              href={WHITEPAPER_PDF}
              download={PDF_DOWNLOAD_FILENAMES[WHITEPAPER_PDF]}
            >
              {copy.downloadEn}
            </a>
            <a
              className="btn btn-ghost"
              href={EXECUTIVE_BRIEF_PDF}
              download={PDF_DOWNLOAD_FILENAMES[EXECUTIVE_BRIEF_PDF]}
            >
              {copy.downloadBrief}
            </a>
          </div>
        </div>
      ) : (
        <form className="wp-mailing-card" onSubmit={handleSubmit} noValidate>
          <p className="wp-mailing-kicker">{copy.kicker}</p>
          <h3 className="wp-mailing-title">{copy.title}</h3>
          <p className="wp-mailing-lead">{copy.lead}</p>

          <div className="hp" aria-hidden="true">
            <label htmlFor={`${formId}-hp`}>Company confirmation</label>
            <input
              id={`${formId}-hp`}
              name="wp_hp"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={hp}
              onChange={(e) => setHp(e.target.value)}
            />
          </div>

          <div className="wp-mailing-row">
            <div className="wp-mailing-field">
              <label htmlFor={`${formId}-email`} className="visually-hidden">
                {copy.emailLabel}
              </label>
              <input
                ref={emailInputRef}
                id={`${formId}-email`}
                name="email"
                type="email"
                autoComplete="email"
                placeholder={copy.emailPlaceholder}
                maxLength={254}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                aria-invalid={errors.email ? "true" : "false"}
                aria-describedby={errors.email ? `${formId}-email-error` : undefined}
                required
              />
            </div>
            <button type="submit" className="btn btn-solid wp-mailing-submit" disabled={submitting}>
              {submitting ? copy.submittingBtn : copy.submitBtn}
            </button>
          </div>
          {errors.email ? (
            <p className="field-error" id={`${formId}-email-error`} role="alert">
              {errors.email}
            </p>
          ) : null}

          <div className="wp-mailing-consent">
            <label htmlFor={`${formId}-consent`} className="wp-mailing-consent-label">
              <input
                id={`${formId}-consent`}
                name="consent"
                type="checkbox"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (errors.consent) setErrors((prev) => ({ ...prev, consent: "" }));
                }}
                aria-invalid={errors.consent ? "true" : "false"}
                aria-describedby={errors.consent ? `${formId}-consent-error` : undefined}
                required
              />
              <span>
                {copy.consentLabel}{" "}
                <Link to={localizedPath(PRIVACY_PATH)}>{copy.privacyLink}</Link>.
              </span>
            </label>
            {errors.consent ? (
              <p className="field-error" id={`${formId}-consent-error`} role="alert">
                {errors.consent}
              </p>
            ) : null}
          </div>
        </form>
      )}
    </div>
  );
}
