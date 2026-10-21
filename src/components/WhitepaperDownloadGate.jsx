import { useEffect, useId, useRef, useState } from "react";
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

export const UNLOCK_STORAGE_KEY = "tshaped_wp_mailing_unlocked_v1";
const UNLOCK_EVENT_NAME = "tshaped:wp-unlocked";

export function isAlreadyUnlocked() {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(UNLOCK_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function markUnlocked() {
  if (typeof window === "undefined") return;
  try {
    window.sessionStorage.setItem(UNLOCK_STORAGE_KEY, "1");
    window.dispatchEvent(new CustomEvent(UNLOCK_EVENT_NAME));
  } catch {
    // ignore storage quota errors
  }
}

export function useWhitepaperUnlocked() {
  const [unlocked, setUnlocked] = useState(() => isAlreadyUnlocked());

  useEffect(() => {
    const sync = () => setUnlocked(isAlreadyUnlocked());
    window.addEventListener(UNLOCK_EVENT_NAME, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(UNLOCK_EVENT_NAME, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return [unlocked, setUnlocked];
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
    kicker: "Lista de correo y acceso completo (Web + PDF)",
    title: "Desbloquea la lectura completa y descarga el Whitepaper en PDF",
    lead: "Deja tu email para leer las 28 páginas completas en la web, descargar el PDF (ES · 28 págs. / EN · 25 págs.) y recibir nuevos análisis técnicos, plantillas OPA/Rego y actualizaciones de gobernanza de IA.",
    readingKicker: "Vista previa hasta la página 3 · Secciones 02 a 26 bloqueadas",
    readingTitle: "Introduce tu email para seguir leyendo el Whitepaper completo",
    readingLead:
      "Has llegado al final de las 3 primeras páginas de vista previa (Portada, Índice, Sección 00 y Sección 01). Deja tu email para desbloquear al instante las secciones 02 a 26 en esta página y acceder también al PDF completo.",
    readingSubmitBtn: "Seguir leyendo y unirme",
    emailLabel: "Tu email",
    emailPlaceholder: "nombre@empresa.com",
    consentLabel:
      "Acepto desbloquear el whitepaper (web y PDF) y suscribirme a la lista de correo sobre gobernanza de IA y Runtime Assurance (baja en 1 clic en cualquier momento).",
    privacyLink: "Política de privacidad",
    submitBtn: "Unirme y descargar PDF",
    submittingBtn: "Procesando…",
    unlockedTitle: "Suscripción confirmada · Lectura completa y descargas desbloqueadas",
    unlockedLead:
      "Gracias por unirte a la lista de correo. Ya tienes acceso completo a las 26 secciones en esta página y puedes descargar cualquiera de las ediciones en PDF:",
    downloadEs: "Descargar Whitepaper en Español (PDF)",
    downloadEn: "Descargar Whitepaper en Inglés (PDF)",
    downloadBrief: "Descargar Dédalo™ Executive Brief (PDF)",
    readOnline: "Leer en este sitio",
    errors: {
      emailRequired: "Introduce tu dirección de email para continuar.",
      emailInvalid: "Introduce una dirección de email válida.",
      consentRequired: "Debes aceptar la suscripción a la lista de correo para continuar.",
    },
  },
  en: {
    kicker: "Mailing list & full access (Web + PDF)",
    title: "Unlock full online reading & download the Whitepaper PDF",
    lead: "Leave your email to read the full whitepaper online, download the complete PDF edition (EN · 25 pp. / ES · 28 pp.), and receive new technical essays, OPA/Rego templates, and AI governance updates.",
    readingKicker: "Preview ends at page 3 · Sections 02 to 26 locked",
    readingTitle: "Enter your email to continue reading the full Whitepaper",
    readingLead:
      "You have reached the end of the 3-page preview (Cover, Contents, Section 00, and Section 01). Leave your email to immediately unlock Sections 02 to 26 on this page and access the full PDF downloads.",
    readingSubmitBtn: "Continue reading & join",
    emailLabel: "Your email",
    emailPlaceholder: "name@company.com",
    consentLabel:
      "I agree to unlock the whitepaper (online & PDF) and subscribe to the AI Governance & Runtime Assurance mailing list (one-click unsubscribe anytime).",
    privacyLink: "Privacy policy",
    submitBtn: "Join mailing list & download PDF",
    submittingBtn: "Processing…",
    unlockedTitle: "Subscription confirmed · Full reading & downloads unlocked",
    unlockedLead:
      "Thank you for joining the mailing list. All 26 sections are now unlocked on this page, and you can download any PDF edition below:",
    downloadEn: "Download English Whitepaper (PDF)",
    downloadEs: "Download Spanish Whitepaper (PDF)",
    downloadBrief: "Download Dédalo™ Executive Brief (PDF)",
    readOnline: "Read on this site",
    errors: {
      emailRequired: "Enter your email address to continue.",
      emailInvalid: "Enter a valid email address.",
      consentRequired: "Please accept the mailing list consent to continue.",
    },
  },
};

export default function WhitepaperDownloadGate({
  source = "whitepaper_page",
  showReadOnlineButton = false,
  mode = "download",
}) {
  const { locale, localizedPath } = useI18n();
  const isEs = locale === "es";
  const copy = isEs ? COPY.es : COPY.en;
  const primaryPdf = isEs ? WHITEPAPER_PDF_ES : WHITEPAPER_PDF;
  const isReadingGate = mode === "reading";

  const formId = useId();
  const emailInputRef = useRef(null);

  const [unlocked, setUnlocked] = useWhitepaperUnlocked();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [targetPdf, setTargetPdf] = useState(isReadingGate ? null : primaryPdf);

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

    const pdfToDownload = isReadingGate ? targetPdf : targetPdf || primaryPdf;

    if (hp.trim()) {
      markUnlocked();
      setUnlocked(true);
      if (pdfToDownload) triggerBrowserDownload(pdfToDownload);
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
        intent: isReadingGate
          ? isEs
            ? "Suscripción a Mailing List + Desbloqueo Lectura Web Whitepaper (ES)"
            : "Mailing List Subscription + Web Whitepaper Reading Unlock (EN)"
          : isEs
            ? "Suscripción a Mailing List + Descarga Whitepaper PDF (ES)"
            : "Mailing List Subscription + Whitepaper PDF Download (EN)",
        source,
        govern: isReadingGate
          ? `Mailing list signup & web reading unlock after page 3 (${source})`
          : `Mailing list signup & whitepaper download (${pdfToDownload})`,
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
      if (pdfToDownload) triggerBrowserDownload(pdfToDownload);
    }
  }

  return (
    <div
      className={`wp-mailing-gate${isReadingGate ? " wp-reading-gate" : ""}`}
      id={isReadingGate ? "whitepaper-reading-gate" : "whitepaper-download"}
    >
      {!isReadingGate ? (
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
      ) : null}

      {unlocked ? (
        isReadingGate ? null : (
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
        )
      ) : (
        <form className="wp-mailing-card" onSubmit={handleSubmit} noValidate>
          <p className="wp-mailing-kicker">{isReadingGate ? copy.readingKicker : copy.kicker}</p>
          <h3 className="wp-mailing-title">{isReadingGate ? copy.readingTitle : copy.title}</h3>
          <p className="wp-mailing-lead">{isReadingGate ? copy.readingLead : copy.lead}</p>

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
              {submitting
                ? copy.submittingBtn
                : isReadingGate
                  ? copy.readingSubmitBtn
                  : copy.submitBtn}
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
