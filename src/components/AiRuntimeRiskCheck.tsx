import { useEffect, useId, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useI18n } from "../i18n/LocaleContext";
import {
  RISK_QUESTIONS,
  calculateRiskAssessment,
  getSystemTypeLabel,
  isAssessmentComplete,
  type AnswerMap,
  type QuestionId,
  type RiskAssessmentResult,
} from "../lib/riskCheckScoring";
import { trackEvent } from "../lib/analytics";
import {
  FormNotConfiguredError,
  RateLimitError,
  isValidWorkEmail,
  submitEnquiry,
} from "../contact.js";
import { PRIVACY_PATH } from "../routes";

const COPY = {
  es: {
    kicker: "Diagnóstico preliminar · 90 segundos",
    title: "AI Runtime Risk Check",
    claim:
      "Descubre en 90 segundos si tu sistema de IA puede acceder, decidir o actuar sin una compuerta de control suficiente.",
    subtext:
      "6 preguntas · resultado preliminar · para RAG, copilotos, agentes y workflows automatizados.",
    progress: (step: number, total: number) => `Pregunta ${step} de ${total}`,
    back: "← Pregunta anterior",
    next: "Siguiente pregunta →",
    finishQuestions: "Comprobar el riesgo de mi sistema →",
    selectError: "Selecciona una opción para continuar.",
    preview: {
      badge: "Ejemplo de resultado",
      title: "Riesgo detectado: autonomía sin compuerta independiente.",
      controlLabel: "Control prioritario recomendado:",
      controlText:
        "Allowlist de herramientas + autorización contextual + registro verificable de identidad, política y resultado.",
      dimensions: "Dimensiones evaluadas: A. Exposición · B. Autonomía · C. Control y evidencia",
    },
    privacyInline:
      "Tus respuestas se evalúan localmente en tu navegador. No enviamos datos a servidores externos sin tu consentimiento explícito.",
    emailCapture: {
      title: "Tu resultado está listo.",
      text: "Hemos detectado señales de riesgo relacionadas con el acceso, la autoridad o la evidencia de tu sistema. Déjanos tu email profesional para ver el diagnóstico preliminar y recibir un resumen con el principal control recomendado.",
      emailLabel: "Email profesional",
      companyLabel: "Empresa",
      nameLabel: "Nombre",
      systemTypeLabel: "Tipo de sistema",
      consentLabel:
        "Acepto recibir el resultado del assessment y una respuesta relacionada con esta solicitud.",
      privacyLinkLabel: "Política de privacidad y retención",
      noNewsletterNote:
        "Sin suscripción comercial ni listas de correo. Tus datos se usan exclusivamente para entregarte este diagnóstico y responder a tu solicitud.",
      cta: "Ver mi resultado",
      sending: "Procesando resultado…",
      backToQuestions: "← Revisar respuestas",
      errors: {
        email: "Indica tu email profesional.",
        emailInvalid: "Indica un email profesional válido.",
        company: "Indica tu empresa u organización.",
        consent: "Debes aceptar el consentimiento para continuar.",
        rateLimit:
          "Has alcanzado el límite de envíos recientes. Aun así, mostramos tu diagnóstico local a continuación.",
      },
    },
    result: {
      badge: "Resultado preliminar · No constituye certificación ni dictamen jurídico",
      tierHeading: "Clasificación de exposición en runtime",
      dimensionsHeading: "Desglose por dimensión de control",
      dimExposure: "A. Exposición de datos y sistemas",
      dimAutonomy: "B. Autonomía y ejecución",
      dimControl: "C. Brecha de control y evidencia",
      primaryRiskLabel: "Hallazgo prioritario",
      recommendedControlLabel: "Control recomendado",
      secondaryRisksHeading: "Otras señales detectadas en tus respuestas",
      restart: "Repetir el AI Runtime Risk Check",
      ctaTitle: "¿Quieres saber exactamente dónde está el gap?",
      ctaText:
        "Puedo convertir este resultado preliminar en un mapa técnico de controles para tu sistema: arquitectura, herramientas, datos, runtime y evidencia.",
      ctaPrimary: "Solicitar AI Governance Snapshot",
      ctaSecondary: "Ver una demostración de HR Copilot",
    },
  },
  en: {
    kicker: "Preliminary diagnostic · 90 seconds",
    title: "AI Runtime Risk Check",
    claim:
      "Discover in 90 seconds whether your AI system can access, decide or act without a sufficient runtime control gate.",
    subtext:
      "6 questions · preliminary result · for RAG, copilots, agents and automated workflows.",
    progress: (step: number, total: number) => `Question ${step} of ${total}`,
    back: "← Previous question",
    next: "Next question →",
    finishQuestions: "Check my system's risk →",
    selectError: "Select an option to continue.",
    preview: {
      badge: "Sample result preview",
      title: "Detected risk: autonomy without an independent gate.",
      controlLabel: "Recommended priority control:",
      controlText:
        "Tool allowlist + contextual authorisation + verifiable logging of identity, policy and outcome.",
      dimensions: "Evaluated dimensions: A. Exposure · B. Autonomy · C. Control & evidence",
    },
    privacyInline:
      "Your answers are evaluated locally in your browser. Nothing is sent to external servers without your explicit consent.",
    emailCapture: {
      title: "Your result is ready.",
      text: "We detected risk signals related to your system's access, authority or evidence. Enter your work email to view the preliminary diagnosis and receive a summary with the primary recommended control.",
      emailLabel: "Work email",
      companyLabel: "Company",
      nameLabel: "Name",
      systemTypeLabel: "System type",
      consentLabel:
        "I agree to receive the assessment result and a reply related to this request.",
      privacyLinkLabel: "Privacy & data retention policy",
      noNewsletterNote:
        "No newsletter subscription or marketing list. Your details are used solely to deliver this assessment and reply to your request.",
      cta: "View my result",
      sending: "Processing result…",
      backToQuestions: "← Review answers",
      errors: {
        email: "Enter your work email.",
        emailInvalid: "Enter a valid work email.",
        company: "Enter your company or organisation.",
        consent: "You must accept the consent checkbox to continue.",
        rateLimit:
          "Recent submission limit reached. Your local diagnostic is shown below.",
      },
    },
    result: {
      badge: "Preliminary result · Not certification or legal advice",
      tierHeading: "Runtime exposure classification",
      dimensionsHeading: "Control dimension breakdown",
      dimExposure: "A. Data & system exposure",
      dimAutonomy: "B. Autonomy & execution",
      dimControl: "C. Control & evidence gap",
      primaryRiskLabel: "Priority finding",
      recommendedControlLabel: "Recommended control",
      secondaryRisksHeading: "Additional signals detected in your answers",
      restart: "Restart AI Runtime Risk Check",
      ctaTitle: "Want to know exactly where the gap is?",
      ctaText:
        "I can turn this preliminary result into a technical control map for your system: architecture, tools, data, runtime and evidence.",
      ctaPrimary: "Request AI Governance Snapshot",
      ctaSecondary: "Watch the HR Copilot demonstration",
    },
  },
};

export interface AiRuntimeRiskCheckProps {
  embedded?: boolean;
  onRequestSnapshot?: (systemType: string, summary: string) => void;
  onWatchDemo?: () => void;
  onViewDemo?: () => void;
}

export default function AiRuntimeRiskCheck({
  embedded = false,
  onRequestSnapshot,
  onWatchDemo,
  onViewDemo,
}: AiRuntimeRiskCheckProps) {
  const { locale, t, home, localizedPath } = useI18n();
  const navigate = useNavigate();
  const copy = COPY[locale];
  const formIdPrefix = useId();

  const [stepIndex, setStepIndex] = useState(0); // 0..5
  const [stage, setStage] = useState<"questions" | "capture" | "result">("questions");
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [stepError, setStepError] = useState("");
  const [startedTracked, setStartedTracked] = useState(false);

  // Email capture state
  const [leadValues, setLeadValues] = useState({
    email: "",
    company: "",
    name: "",
    consent: false,
    hp: "",
  });
  const [leadErrors, setLeadErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const questionHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const captureHeadingRef = useRef<HTMLHeadingElement | null>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement | null>(null);

  const currentQuestion = RISK_QUESTIONS[stepIndex];
  const totalQuestions = RISK_QUESTIONS.length;
  const selectedValue = currentQuestion ? answers[currentQuestion.id] || "" : "";
  const systemTypeLabel = getSystemTypeLabel(answers, locale);

  const assessment: RiskAssessmentResult | null = isAssessmentComplete(answers)
    ? calculateRiskAssessment(answers, locale)
    : null;

  useEffect(() => {
    if (!embedded) {
      trackEvent("risk_check_started", { source: "dedicated_route" });
      setStartedTracked(true);
    }
  }, [embedded]);

  function selectOption(questionId: QuestionId, value: string) {
    if (!startedTracked) {
      trackEvent("risk_check_started", { source: embedded ? "home_embed" : "dedicated_route" });
      setStartedTracked(true);
    }
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setStepError("");
    trackEvent("risk_check_question_answered", {
      question_step: stepIndex + 1,
      question_id: questionId,
    });
  }

  function handleNextStep() {
    if (!currentQuestion) return;
    const val = answers[currentQuestion.id];
    if (!val) {
      setStepError(copy.selectError);
      return;
    }
    setStepError("");
    if (stepIndex < totalQuestions - 1) {
      setStepIndex((prev) => prev + 1);
      requestAnimationFrame(() => questionHeadingRef.current?.focus());
    } else {
      trackEvent("risk_check_completed", { question_step: totalQuestions });
      trackEvent("risk_check_email_viewed");
      setStage("capture");
      requestAnimationFrame(() => captureHeadingRef.current?.focus());
    }
  }

  function handlePrevStep() {
    setStepError("");
    if (stage === "capture") {
      setStage("questions");
      setStepIndex(totalQuestions - 1);
      requestAnimationFrame(() => questionHeadingRef.current?.focus());
      return;
    }
    if (stepIndex > 0) {
      setStepIndex((prev) => prev - 1);
      requestAnimationFrame(() => questionHeadingRef.current?.focus());
    }
  }

  function validateCapture() {
    const errs: Record<string, string> = {};
    if (!leadValues.email.trim()) {
      errs.email = copy.emailCapture.errors.email;
    } else if (!isValidWorkEmail(leadValues.email.trim())) {
      errs.email = copy.emailCapture.errors.emailInvalid;
    }
    if (!leadValues.company.trim()) {
      errs.company = copy.emailCapture.errors.company;
    }
    if (!leadValues.consent) {
      errs.consent = copy.emailCapture.errors.consent;
    }
    return errs;
  }

  async function handleCaptureSubmit(event: React.FormEvent) {
    event.preventDefault();
    const errs = validateCapture();
    setLeadErrors(errs);
    if (Object.keys(errs).length > 0) {
      return;
    }

    const computed = calculateRiskAssessment(answers, locale);

    // Honeypot check: silently show result without hitting network
    if (leadValues.hp.trim()) {
      setStage("result");
      return;
    }

    setSubmitting(true);
    trackEvent("risk_check_email_submitted", {
      exposure_tier: computed.tier.id,
      primary_finding: computed.primaryFinding.id,
    });

    try {
      await submitEnquiry({
        name: leadValues.name || "Risk Check Lead",
        company: leadValues.company,
        email: leadValues.email,
        systemType: computed.systemTypeLabel,
        intent: "AI Runtime Risk Check",
        caller: "Organisation (AI Runtime Risk Check)",
        callerKey: "risk_check",
        consent: true,
        source: embedded ? "Home Risk Check" : "Dedicated Risk Check Route",
        assessmentSummary: `${computed.tier.title} | ${computed.primaryFinding.title} | Control: ${computed.primaryFinding.recommendedControl}`,
        govern: `AI Runtime Risk Check (${computed.systemTypeLabel})`,
      });
    } catch (err) {
      // Even if Formspree is not configured in local dev/CI or rate-limited,
      // never block the user from viewing their personalized assessment result.
      if (err instanceof RateLimitError || err instanceof FormNotConfiguredError) {
        // Proceed gracefully to local result display
      }
    } finally {
      setSubmitting(false);
      setStage("result");
      trackEvent("risk_check_result_viewed", {
        exposure_tier: computed.tier.id,
        primary_finding: computed.primaryFinding.id,
      });
      requestAnimationFrame(() => resultHeadingRef.current?.focus());
    }
  }

  function handleRestart() {
    setStage("questions");
    setStepIndex(0);
    setStepError("");
    requestAnimationFrame(() => questionHeadingRef.current?.focus());
  }

  function handleSnapshotClick() {
    trackEvent("snapshot_cta_clicked", {
      source: "risk_check_result",
      exposure_tier: assessment?.tier.id || "unknown",
    });
    if (onRequestSnapshot && assessment) {
      onRequestSnapshot(
        assessment.systemTypeLabel,
        `${assessment.tier.title} — ${assessment.primaryFinding.title}`
      );
      return;
    }
    navigate(`${home}#diagnostic`);
  }

  function handleDemoClick() {
    trackEvent("demo_cta_clicked", {
      source: "risk_check_result",
    });
    if (onWatchDemo) {
      onWatchDemo();
      return;
    }
    if (onViewDemo) {
      onViewDemo();
      return;
    }
    navigate(`${home}#hr-copilot-case`);
  }

  const progressPct =
    stage === "questions"
      ? Math.round(((stepIndex + 1) / totalQuestions) * 100)
      : 100;

  return (
    <div className="risk-check-widget" ref={containerRef}>
      <header className="risk-check-header">
        <p className="eyebrow risk-check-kicker">{copy.kicker}</p>
        {embedded ? (
          <h2 id="risk-check-heading">{copy.title}</h2>
        ) : (
          <h1 id="risk-check-heading">{copy.title}</h1>
        )}
        <p className="risk-check-claim">{copy.claim}</p>
        <p className="risk-check-subtext">{copy.subtext}</p>
        {stage !== "result" ? (
          <aside className="risk-sample-preview" aria-label={copy.preview.badge}>
            <div className="risk-sample-top">
              <span className="risk-sample-badge">{copy.preview.badge}</span>
              <span className="risk-sample-dims">{copy.preview.dimensions}</span>
            </div>
            <p className="risk-sample-title">{copy.preview.title}</p>
            <p className="risk-sample-control">
              <strong>{copy.preview.controlLabel}</strong> {copy.preview.controlText}
            </p>
          </aside>
        ) : null}
      </header>

      {stage === "questions" && currentQuestion ? (
        <div className="risk-check-card" role="region" aria-labelledby={`${formIdPrefix}-q-title`}>
          <div className="risk-check-progress-row">
            <span className="risk-check-step-label" aria-live="polite">
              {copy.progress(stepIndex + 1, totalQuestions)}
            </span>
            <div
              className="risk-check-progress-bar"
              role="progressbar"
              aria-valuenow={stepIndex + 1}
              aria-valuemin={1}
              aria-valuemax={totalQuestions}
              aria-label={copy.progress(stepIndex + 1, totalQuestions)}
            >
              <div
                className="risk-check-progress-fill"
                style={{ width: `${progressPct}%` }}
              />
            </div>
          </div>

          <fieldset className="risk-check-fieldset">
            <legend className="visually-hidden">
              {copy.progress(stepIndex + 1, totalQuestions)}: {currentQuestion.prompt[locale]}
            </legend>
            <h3
              id={`${formIdPrefix}-q-title`}
              ref={questionHeadingRef}
              tabIndex={-1}
              className="risk-check-question-title"
            >
              {currentQuestion.prompt[locale]}
            </h3>

            <div className="risk-check-options" role="radiogroup" aria-labelledby={`${formIdPrefix}-q-title`}>
              {currentQuestion.options.map((opt) => {
                const inputId = `${formIdPrefix}-${currentQuestion.id}-${opt.value}`;
                const checked = selectedValue === opt.value;
                return (
                  <label
                    key={opt.value}
                    htmlFor={inputId}
                    className={checked ? "risk-option is-selected" : "risk-option"}
                  >
                    <input
                      id={inputId}
                      type="radio"
                      name={`risk-${currentQuestion.id}`}
                      value={opt.value}
                      checked={checked}
                      onChange={() => selectOption(currentQuestion.id, opt.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          selectOption(currentQuestion.id, opt.value);
                        }
                      }}
                    />
                    <span className="risk-option-marker" aria-hidden="true" />
                    <span className="risk-option-text">{opt.label[locale]}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          {stepError ? (
            <p className="field-error" role="alert">
              {stepError}
            </p>
          ) : null}

          <div className="risk-check-nav">
            {stepIndex > 0 ? (
              <button
                type="button"
                className="btn btn-ghost risk-btn-back"
                onClick={handlePrevStep}
              >
                {copy.back}
              </button>
            ) : (
              <span />
            )}
            <button
              type="button"
              className="btn btn-solid risk-btn-next"
              onClick={handleNextStep}
            >
              {stepIndex === totalQuestions - 1 ? copy.finishQuestions : copy.next}
            </button>
          </div>

          <p className="risk-check-privacy-note">{copy.privacyInline}</p>
        </div>
      ) : null}

      {stage === "capture" ? (
        <form
          className="risk-check-card risk-capture-form"
          onSubmit={handleCaptureSubmit}
          noValidate
          aria-labelledby={`${formIdPrefix}-capture-title`}
        >
          <h3 id={`${formIdPrefix}-capture-title`} ref={captureHeadingRef} tabIndex={-1}>
            {copy.emailCapture.title}
          </h3>
          <p className="risk-capture-lead">{copy.emailCapture.text}</p>

          <div className="hp" aria-hidden="true">
            <label htmlFor={`${formIdPrefix}-hp`}>{t.form.hp}</label>
            <input
              id={`${formIdPrefix}-hp`}
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={leadValues.hp}
              onChange={(e) => setLeadValues((prev) => ({ ...prev, hp: e.target.value }))}
            />
          </div>

          <div className="diag-form-grid">
            <div>
              <label htmlFor={`${formIdPrefix}-email`}>
                {copy.emailCapture.emailLabel} <span className="req">{t.required}</span>
              </label>
              <input
                id={`${formIdPrefix}-email`}
                name="email"
                type="email"
                autoComplete="email"
                maxLength={254}
                value={leadValues.email}
                onChange={(e) => {
                  setLeadValues((prev) => ({ ...prev, email: e.target.value }));
                  if (leadErrors.email) {
                    setLeadErrors((prev) => ({ ...prev, email: "" }));
                  }
                }}
                aria-invalid={leadErrors.email ? "true" : "false"}
                aria-describedby={leadErrors.email ? `${formIdPrefix}-email-err` : undefined}
                required
              />
              {leadErrors.email ? (
                <p className="field-error" id={`${formIdPrefix}-email-err`} role="alert">
                  {leadErrors.email}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor={`${formIdPrefix}-company`}>
                {copy.emailCapture.companyLabel} <span className="req">{t.required}</span>
              </label>
              <input
                id={`${formIdPrefix}-company`}
                name="company"
                type="text"
                autoComplete="organization"
                maxLength={120}
                value={leadValues.company}
                onChange={(e) => {
                  setLeadValues((prev) => ({ ...prev, company: e.target.value }));
                  if (leadErrors.company) {
                    setLeadErrors((prev) => ({ ...prev, company: "" }));
                  }
                }}
                aria-invalid={leadErrors.company ? "true" : "false"}
                aria-describedby={leadErrors.company ? `${formIdPrefix}-company-err` : undefined}
                required
              />
              {leadErrors.company ? (
                <p className="field-error" id={`${formIdPrefix}-company-err`} role="alert">
                  {leadErrors.company}
                </p>
              ) : null}
            </div>

            <div>
              <label htmlFor={`${formIdPrefix}-name`}>
                {copy.emailCapture.nameLabel} <span className="opt">{t.optional}</span>
              </label>
              <input
                id={`${formIdPrefix}-name`}
                name="name"
                type="text"
                autoComplete="name"
                maxLength={120}
                value={leadValues.name}
                onChange={(e) => setLeadValues((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>

            <div>
              <label htmlFor={`${formIdPrefix}-system`}>
                {copy.emailCapture.systemTypeLabel}
              </label>
              <input
                id={`${formIdPrefix}-system`}
                name="systemType"
                type="text"
                value={systemTypeLabel}
                readOnly
                className="input-readonly"
              />
            </div>

            <div className="diag-form-wide">
              <label className="consent-checkbox-label" htmlFor={`${formIdPrefix}-consent`}>
                <input
                  id={`${formIdPrefix}-consent`}
                  name="consent"
                  type="checkbox"
                  checked={leadValues.consent}
                  onChange={(e) => {
                    setLeadValues((prev) => ({ ...prev, consent: e.target.checked }));
                    if (leadErrors.consent) {
                      setLeadErrors((prev) => ({ ...prev, consent: "" }));
                    }
                  }}
                  aria-invalid={leadErrors.consent ? "true" : "false"}
                  aria-describedby={leadErrors.consent ? `${formIdPrefix}-consent-err` : undefined}
                  required
                />
                <span>
                  {copy.emailCapture.consentLabel} <span className="req">({t.required})</span>
                </span>
              </label>
              {leadErrors.consent ? (
                <p className="field-error" id={`${formIdPrefix}-consent-err`} role="alert">
                  {leadErrors.consent}
                </p>
              ) : null}
              <p className="risk-capture-privacy-links">
                {copy.emailCapture.noNewsletterNote}{" "}
                <Link to={localizedPath(PRIVACY_PATH)}>
                  {copy.emailCapture.privacyLinkLabel}
                </Link>
                .
              </p>
            </div>
          </div>

          <div className="risk-check-nav">
            <button
              type="button"
              className="btn btn-ghost risk-btn-back"
              onClick={handlePrevStep}
            >
              {copy.emailCapture.backToQuestions}
            </button>
            <button
              type="submit"
              className="btn btn-solid"
              disabled={submitting}
            >
              {submitting ? copy.emailCapture.sending : copy.emailCapture.cta}
            </button>
          </div>
        </form>
      ) : null}

      {stage === "result" && assessment ? (
        <div
          className="risk-check-card risk-result-view"
          role="region"
          aria-labelledby={`${formIdPrefix}-result-title`}
        >
          <p className="risk-result-disclaimer">{copy.result.badge}</p>

          <div className={`risk-tier-banner severity-${assessment.tier.severity}`}>
            <p className="risk-tier-kicker">
              {copy.result.tierHeading} · {assessment.systemTypeLabel}
            </p>
            <h3 id={`${formIdPrefix}-result-title`} ref={resultHeadingRef} tabIndex={-1}>
              {assessment.tier.title}
            </h3>
            <p className="risk-tier-explanation">{assessment.tier.explanation}</p>
          </div>

          <article className="risk-primary-finding">
            <p className="callout-label">{copy.result.primaryRiskLabel}</p>
            <h4>{assessment.primaryFinding.title}</h4>
            <p>{assessment.primaryFinding.text}</p>
            <div className="risk-recommended-control">
              <strong>{copy.result.recommendedControlLabel}:</strong>{" "}
              <span>{assessment.primaryFinding.recommendedControl}</span>
            </div>
          </article>

          <div className="risk-dimensions-section">
            <h4>{copy.result.dimensionsHeading}</h4>
            <div className="risk-dimensions-grid">
              <div className="risk-dim-card">
                <div className="risk-dim-head">
                  <span className="risk-dim-title">{copy.result.dimExposure}</span>
                  <span className={`risk-dim-badge level-${assessment.dimensions.exposure.level}`}>
                    {assessment.dimensions.exposure.label}
                  </span>
                </div>
                <div className="risk-dim-meter" aria-hidden="true">
                  <div
                    className={`risk-dim-fill level-${assessment.dimensions.exposure.level}`}
                    style={{ width: `${assessment.dimensions.exposure.percentage}%` }}
                  />
                </div>
                {assessment.dimensions.exposure.signals.length > 0 ? (
                  <ul className="risk-dim-signals">
                    {assessment.dimensions.exposure.signals.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className="risk-dim-card">
                <div className="risk-dim-head">
                  <span className="risk-dim-title">{copy.result.dimAutonomy}</span>
                  <span className={`risk-dim-badge level-${assessment.dimensions.autonomy.level}`}>
                    {assessment.dimensions.autonomy.label}
                  </span>
                </div>
                <div className="risk-dim-meter" aria-hidden="true">
                  <div
                    className={`risk-dim-fill level-${assessment.dimensions.autonomy.level}`}
                    style={{ width: `${assessment.dimensions.autonomy.percentage}%` }}
                  />
                </div>
                {assessment.dimensions.autonomy.signals.length > 0 ? (
                  <ul className="risk-dim-signals">
                    {assessment.dimensions.autonomy.signals.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                ) : null}
              </div>

              <div className="risk-dim-card">
                <div className="risk-dim-head">
                  <span className="risk-dim-title">{copy.result.dimControl}</span>
                  <span
                    className={`risk-dim-badge level-${assessment.dimensions.controlAndEvidence.level}`}
                  >
                    {assessment.dimensions.controlAndEvidence.label}
                  </span>
                </div>
                <div className="risk-dim-meter" aria-hidden="true">
                  <div
                    className={`risk-dim-fill level-${assessment.dimensions.controlAndEvidence.level}`}
                    style={{ width: `${assessment.dimensions.controlAndEvidence.percentage}%` }}
                  />
                </div>
                {assessment.dimensions.controlAndEvidence.signals.length > 0 ? (
                  <ul className="risk-dim-signals">
                    {assessment.dimensions.controlAndEvidence.signals.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>
          </div>

          {assessment.secondaryFindings.length > 0 ? (
            <div className="risk-secondary-findings">
              <h4>{copy.result.secondaryRisksHeading}</h4>
              <div className="risk-secondary-grid">
                {assessment.secondaryFindings.map((finding) => (
                  <article key={finding.id} className="risk-secondary-card">
                    <h5>{finding.title}</h5>
                    <p>{finding.text}</p>
                    <p className="risk-secondary-control">
                      <strong>{copy.result.recommendedControlLabel}:</strong>{" "}
                      {finding.recommendedControl}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          <aside className="risk-result-cta-box">
            <h4>{copy.result.ctaTitle}</h4>
            <p>{copy.result.ctaText}</p>
            <div className="hero-cta-row">
              <button
                type="button"
                className="btn btn-solid"
                onClick={handleSnapshotClick}
              >
                {copy.result.ctaPrimary}
              </button>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={handleDemoClick}
              >
                {copy.result.ctaSecondary}
              </button>
            </div>
          </aside>

          <div className="risk-result-footer">
            <button
              type="button"
              className="btn btn-ghost risk-btn-back"
              onClick={() => {
                setStage("questions");
                setStepIndex(totalQuestions - 1);
              }}
            >
              {copy.emailCapture.backToQuestions}
            </button>
            <button
              type="button"
              className="text-link"
              onClick={handleRestart}
            >
              {copy.result.restart}
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
