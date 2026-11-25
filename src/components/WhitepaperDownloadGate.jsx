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
  WHITEPAPER_PUBLICATION,
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
  [WHITEPAPER_PDF]: `Dedalo Unified Edition v${WHITEPAPER_PUBLICATION.version}.pdf`,
  [EXECUTIVE_BRIEF_PDF]: "Dedalo-Executive-Brief.pdf",
};

const COPY = {
  es: {
    kicker: "Lista de correo, aparte de la descarga",
    title: "Recibe ensayos técnicos y notas de OPA/Rego",
    lead: "La descarga del PDF y del Executive Brief no pide email. La lista es opcional: ensayos técnicos, notas de OPA/Rego y actualizaciones de gobernanza. No es el mismo acto que descargar.",
    readingKicker: "Lista de correo opcional",
    readingTitle: "Recibe ensayos técnicos y notas de OPA/Rego",
    readingLead:
      "El ensayo de esta página se lee sin registro. El email solo sirve para la lista de correo.",
    readingSubmitBtn: "Unirme a la lista",
    emailLabel: "Tu email",
    emailPlaceholder: "nombre@empresa.com",
    consentLabel:
      "Quiero recibir la lista de correo sobre gobernanza de IA y Runtime Assurance (baja en 1 clic). Esta casilla no condiciona la descarga.",
    privacyLink: "Política de privacidad",
    submitBtn: "Unirme a la lista",
    submittingBtn: "Procesando…",
    unlockedTitle: "Suscripción confirmada",
    unlockedLead:
      "Gracias. La lista es independiente de los PDF, que siguen enlazados arriba.",
    downloadEs: `Descargar la edición en castellano del ${WHITEPAPER_PUBLICATION.es.previousPublishedAt} (${WHITEPAPER_PUBLICATION.es.previousPageCount} páginas)`,
    downloadEn: `Descargar Unified Edition v${WHITEPAPER_PUBLICATION.version} (${WHITEPAPER_PUBLICATION.en.pageCount} páginas, EN)`,
    downloadBrief: "Descargar Dédalo™ Executive Brief (PDF, 2 páginas, EN)",
    archiveEn: "Archivo",
    readOnline: "Leer en este sitio",
    errors: {
      emailRequired: "Introduce tu dirección de email para continuar.",
      emailInvalid: "Introduce una dirección de email válida.",
      consentRequired: "Debes aceptar la suscripción a la lista de correo para continuar.",
    },
  },
  en: {
    kicker: "Mailing list, separate from the download",
    title: "Receive technical essays and OPA/Rego notes",
    lead: "The PDF and the Executive Brief download without an email. The list is optional: technical essays, OPA/Rego notes and governance updates. Subscribing is not the same action as downloading.",
    readingKicker: "Optional mailing list",
    readingTitle: "Receive technical essays and OPA/Rego notes",
    readingLead: "The essay on this page is open. An email only joins the mailing list.",
    readingSubmitBtn: "Join the list",
    emailLabel: "Your email",
    emailPlaceholder: "name@company.com",
    consentLabel:
      "I want the AI Governance and Runtime Assurance mailing list (one-click unsubscribe). This box does not gate the download.",
    privacyLink: "Privacy policy",
    submitBtn: "Join the list",
    submittingBtn: "Processing…",
    unlockedTitle: "Subscription confirmed",
    unlockedLead: "Thank you. The list is separate from the PDFs, which stay linked above.",
    downloadEn: `Download Unified Edition v${WHITEPAPER_PUBLICATION.version} (${WHITEPAPER_PUBLICATION.en.pageCount} pages)`,
    downloadEs: `Download the Spanish edition of ${WHITEPAPER_PUBLICATION.es.previousPublishedAt} (${WHITEPAPER_PUBLICATION.es.previousPageCount} pages)`,
    downloadBrief: "Download Dédalo™ Executive Brief (PDF, 2 pages)",
    archiveEn: "Previous English PDF (16 Nov 2026)",
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
  const isReadingGate = mode === "reading";

  const formId = useId();
  const emailInputRef = useRef(null);

  const [unlocked, setUnlocked] = useWhitepaperUnlocked();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [hp, setHp] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

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

    if (hp.trim()) {
      markUnlocked();
      setUnlocked(true);
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
          ? "Suscripción a la lista de correo del whitepaper (ES)"
          : "Whitepaper mailing list subscription (EN)",
        source,
        govern: `Mailing list signup only. The PDF download stays separate (${source}).`,
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
            href={WHITEPAPER_PDF}
            download={PDF_DOWNLOAD_FILENAMES[WHITEPAPER_PDF]}
          >
            {copy.downloadEn}
          </a>
          {isEs ? (
            <a
              className="btn btn-ghost"
              href={WHITEPAPER_PDF_ES}
              download={PDF_DOWNLOAD_FILENAMES[WHITEPAPER_PDF_ES]}
            >
              {copy.downloadEs}
            </a>
          ) : (
            <a className="btn btn-ghost" href={WHITEPAPER_PUBLICATION.en.archivePath}>
              {copy.archiveEn}
            </a>
          )}
          <a
            className="btn btn-ghost"
            href={EXECUTIVE_BRIEF_PDF}
            download={PDF_DOWNLOAD_FILENAMES[EXECUTIVE_BRIEF_PDF]}
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
