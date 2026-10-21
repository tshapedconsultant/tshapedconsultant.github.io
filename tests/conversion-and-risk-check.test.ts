import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test, { describe, beforeEach } from "node:test";

import {
  RISK_QUESTIONS,
  calculateRiskAssessment,
  isAssessmentComplete,
  getSystemTypeLabel,
  type AnswerMap,
} from "../src/lib/riskCheckScoring.ts";
import {
  sanitizeAnalyticsProps,
  trackEvent,
  getTrackedEvents,
  clearTrackedEvents,
} from "../src/lib/analytics.ts";
import {
  RateLimitError,
  FormNotConfiguredError,
  buildEnquiryPayload,
  checkAndRecordRateLimit,
  isValidWorkEmail,
  sanitizeBody,
  sanitizeLine,
  submitEnquiry,
} from "../src/contact.js";
import {
  RISK_CHECK_PATH,
  PRIVACY_PATH,
  isAppPath,
  isRiskCheckPath,
  isPrivacyPath,
  localeFromPath,
  stripLocale,
  switchLocalePath,
  assertLocaleSwitch,
  withLocale,
} from "../src/routes.ts";
import {
  pageSeoFor,
  HOME_TITLE_ES,
  HOME_DESCRIPTION_ES,
  HOME_OG_TITLE_ES,
  HOME_OG_DESCRIPTION_ES,
} from "../src/seo.js";
import * as contentEs from "../src/content.es.js";
import * as contentEn from "../src/content.js";
import { UI } from "../src/i18n/copy.js";

// ============================================================================
// 1. SCORING ENGINE & EDGE CASES (riskCheckScoring.ts)
// ============================================================================
describe("AI Runtime Risk Check — Scoring Engine & Edge Cases", () => {
  test("Exposes 6 exact questions with 5 options each in both ES and EN", () => {
    assert.equal(RISK_QUESTIONS.length, 6);
    for (const q of RISK_QUESTIONS) {
      assert.ok(q.prompt.es.length > 5, `Missing ES prompt for ${q.id}`);
      assert.ok(q.prompt.en.length > 5, `Missing EN prompt for ${q.id}`);
      assert.equal(q.options.length, 5, `Question ${q.id} must have 5 options`);
      for (const opt of q.options) {
        assert.ok(opt.label.es.length > 0);
        assert.ok(opt.label.en.length > 0);
      }
    }
  });

  test("isAssessmentComplete validates partial, empty, undefined, and full answers", () => {
    assert.equal(isAssessmentComplete({}), false);
    assert.equal(
      isAssessmentComplete({
        q1: "rag_internal",
        q2: "respond_only",
        q3: "internal_nonsensitive",
        q4: "allowlist",
        q5: "block_review",
      }),
      false,
      "Missing Q6 should return false"
    );
    assert.equal(
      isAssessmentComplete({
        q1: "rag_internal",
        q2: "respond_only",
        q3: "internal_nonsensitive",
        q4: "allowlist",
        q5: "block_review",
        q6: "full_decision_trace",
      }),
      true
    );
  });

  test("Tier 1: Exposición informativa (Low exposure, zero autonomy, full controls)", () => {
    const answers: AnswerMap = {
      q1: "chatbot",
      q2: "respond_only",
      q3: "public",
      q4: "hitl_sensitive",
      q5: "block_review",
      q6: "full_decision_trace",
    };
    const resEs = calculateRiskAssessment(answers, "es");
    assert.equal(resEs.tier.id, "informational");
    assert.equal(resEs.tier.title, "Exposición informativa");
    assert.equal(resEs.dimensions.exposure.score, 0);
    assert.equal(resEs.dimensions.autonomy.score, 0);
    assert.equal(resEs.dimensions.controlAndEvidence.score, 0);
  });

  test("Tier 2: Exposición operativa & Result C (Internal RAG with incomplete decision trace)", () => {
    const answers: AnswerMap = {
      q1: "rag_internal",
      q2: "draft_recommend",
      q3: "internal_nonsensitive",
      q4: "hitl_sensitive",
      q5: "block_review",
      q6: "final_response",
    };
    const resEs = calculateRiskAssessment(answers, "es");
    assert.equal(resEs.tier.id, "operational");
    assert.equal(resEs.tier.title, "Exposición operativa");
    assert.equal(resEs.primaryFinding.id, "result_c");
    assert.equal(resEs.primaryFinding.title, "Riesgo detectado: decisiones no reconstruibles");
  });

  test("Tier 3: Exposición sensible & Result B (RAG over personal/financial data without retrieval control)", () => {
    const answers: AnswerMap = {
      q1: "rag_internal",
      q2: "query_internal",
      q3: "personal_financial",
      q4: "hitl_sensitive",
      q5: "block_review",
      q6: "full_decision_trace",
    };
    const resEs = calculateRiskAssessment(answers, "es");
    assert.equal(resEs.tier.id, "sensitive");
    assert.equal(resEs.tier.title, "Exposición sensible");
    assert.equal(resEs.primaryFinding.id, "result_b");
    assert.equal(
      resEs.primaryFinding.title,
      "Riesgo detectado: datos internos sin control de retrieval"
    );
    assert.equal(
      resEs.primaryFinding.recommendedControl,
      "Autorización de retrieval + clasificación de documentos + provenance + DLP de salida."
    );
  });

  test("Tier 4: Exposición agéntica crítica & Result A (Agent modifying data where model decides)", () => {
    const answers: AnswerMap = {
      q1: "agent_actions",
      q2: "modify_execute",
      q3: "credentials_strategic",
      q4: "model_decides",
      q5: "undefined",
      q6: "final_response",
    };
    const resEs = calculateRiskAssessment(answers, "es");
    assert.equal(resEs.tier.id, "critical_agentic");
    assert.equal(resEs.tier.title, "Exposición agéntica crítica");
    assert.equal(resEs.primaryFinding.id, "result_a");
    assert.equal(
      resEs.primaryFinding.title,
      "Riesgo detectado: autonomía sin compuerta independiente"
    );
    assert.equal(
      resEs.primaryFinding.recommendedControl,
      "Allowlist de herramientas + autorización contextual + registro de identidad, política, decisión y resultado."
    );
    assert.ok(resEs.secondaryFindings.length >= 1);
  });

  test("Result D priority when fail-safe is undefined while other controls are strong", () => {
    const answers: AnswerMap = {
      q1: "chatbot",
      q2: "respond_only",
      q3: "public",
      q4: "hitl_sensitive",
      q5: "undefined",
      q6: "full_decision_trace",
    };
    const resEs = calculateRiskAssessment(answers, "es");
    assert.equal(resEs.primaryFinding.id, "result_d");
    assert.equal(
      resEs.primaryFinding.title,
      "Riesgo preliminar: falta de definición del fallo seguro"
    );
    assert.equal(
      resEs.primaryFinding.recommendedControl,
      "Fail-safe explícito: bloquear, escalar, registrar contexto y requerir revisión para acciones sensibles."
    );
  });

  test("Edge case: Empty or corrupted answers object does not throw and treats unknown state conservatively", () => {
    const resEmpty = calculateRiskAssessment({}, "es");
    assert.ok(resEmpty.tier.id);
    assert.ok(resEmpty.primaryFinding.title.length > 0);

    const corrupted: AnswerMap = {
      q1: "invalid_type",
      q2: undefined,
      q3: "non_existent",
    };
    const resCorrupted = calculateRiskAssessment(corrupted, "en");
    assert.ok(resCorrupted.tier.title.length > 0);
  });

  test("getSystemTypeLabel returns localized human-readable Q1 label or fallback", () => {
    assert.equal(
      getSystemTypeLabel({ q1: "copilot_tools" }, "es"),
      "Copiloto conectado a herramientas"
    );
    assert.equal(
      getSystemTypeLabel({ q1: "copilot_tools" }, "en"),
      "Copilot connected to tools"
    );
    assert.equal(getSystemTypeLabel({}, "es"), "Sistema de IA en evaluación");
  });
});

// ============================================================================
// 2. ANALYTICS SANITIZATION & PRIVACY EDGE CASES (analytics.ts)
// ============================================================================
describe("Analytics — Zero PII & Sanitization Edge Cases", () => {
  beforeEach(() => {
    clearTrackedEvents();
  });

  test("Strips unallowed keys, emails, long strings, and free-text spaces", () => {
    const dirty = {
      email: "ciso@bank.es",
      name: "Juan Pérez",
      company: "Banco Ejemplo SA",
      source: "embedded_home",
      exposure_tier: "critical_agentic",
      primary_finding: "result_a",
      question_step: 3,
      intent: "Free text with spaces should be stripped",
      malicious_email_in_allowed_key: "attacker@evil.com",
    };

    const clean = sanitizeAnalyticsProps(dirty);
    assert.equal("email" in clean, false);
    assert.equal("name" in clean, false);
    assert.equal("company" in clean, false);
    assert.equal("intent" in clean, false, "Strings with spaces must be stripped");
    assert.equal(clean.source, "embedded_home");
    assert.equal(clean.exposure_tier, "critical_agentic");
    assert.equal(clean.primary_finding, "result_a");
    assert.equal(clean.question_step, 3);
  });

  test("Rejects non-finite numbers and strings containing @ even inside allowed keys", () => {
    const clean = sanitizeAnalyticsProps({
      source: "user@domain.com",
      question_step: Number.NaN,
      intent: "snapshot",
    });
    assert.equal("source" in clean, false);
    assert.equal("question_step" in clean, false);
    assert.equal(clean.intent, "snapshot");
  });

  test("trackEvent records all 9 required conversion events in order", () => {
    trackEvent("risk_check_started", { source: "dedicated_page" });
    trackEvent("risk_check_question_answered", { question_step: 1, question_id: "q1" });
    trackEvent("risk_check_completed", { exposure_tier: "sensitive", primary_finding: "result_b" });
    trackEvent("risk_check_email_viewed", { exposure_tier: "sensitive" });
    trackEvent("risk_check_email_submitted", { exposure_tier: "sensitive" });
    trackEvent("risk_check_result_viewed", { exposure_tier: "sensitive" });
    trackEvent("snapshot_cta_clicked", { source: "risk_check_result" });
    trackEvent("demo_cta_clicked", { source: "risk_check_result" });
    trackEvent("contact_submitted", { source: "commercial_form", intent: "snapshot" });
    trackEvent("whitepaper_mailing_list_joined", { source: "whitepaper_es", intent: "mailing_list" });

    const events = getTrackedEvents();
    assert.equal(events.length, 10);
    assert.equal(events[0].event, "risk_check_started");
    assert.equal(events[8].event, "contact_submitted");
    assert.equal(events[9].event, "whitepaper_mailing_list_joined");
  });
});

// ============================================================================
// 3. CONTACT SECURITY, SANITIZATION & RATE LIMITING EDGE CASES (contact.js)
// ============================================================================
describe("Contact & Security — Sanitization, Validation & Rate Limiting", () => {
  test("sanitizeLine strips CRLF, null bytes, URL-encoded newlines, and truncates length", () => {
    const input = "ACME Corp\r\nBcc: attacker@evil.com%0d%0a\0Extra";
    const out = sanitizeLine(input, 50);
    assert.equal(out.includes("\r"), false);
    assert.equal(out.includes("\n"), false);
    assert.equal(out.includes("\0"), false);
    assert.equal(/%0[da]/i.test(out), false);
    assert.ok(out.length <= 50);
  });

  test("sanitizeBody neutralizes MIME header injection lines and truncates to max length", () => {
    const payload = "Hola,\r\nBcc: spy@evil.com\nContent-Type: text/html\nNecesito revisar nuestro RAG.";
    const clean = sanitizeBody(payload, 500);
    assert.equal(/^bcc:/im.test(clean), false);
    assert.equal(/^content-type:/im.test(clean), false);
    assert.ok(clean.includes("Bcc - spy@evil.com"));
    assert.ok(clean.includes("Content-Type - text/html"));
  });

  test("isValidWorkEmail validates edge cases accurately", () => {
    assert.equal(isValidWorkEmail("cto@empresa.es"), true);
    assert.equal(isValidWorkEmail("nombre.apellido+tag@sub.dominio.co.uk"), true);
    assert.equal(isValidWorkEmail(""), false);
    assert.equal(isValidWorkEmail("sin-arroba.com"), false);
    assert.equal(isValidWorkEmail("espacios en@medio.com"), false);
    assert.equal(isValidWorkEmail("header\r\n@inject.com"), false);
    assert.equal(isValidWorkEmail("a".repeat(250) + "@test.com"), false, "Exceeds 254 RFC limit");
  });

  test("checkAndRecordRateLimit allows 3 submissions and blocks the 4th within the window", () => {
    const fakeStore = new Map<string, string>();
    const storage = {
      getItem: (k: string) => fakeStore.get(k) ?? null,
      setItem: (k: string, v: string) => fakeStore.set(k, v),
    };
    const t0 = 1_700_000_000_000;

    checkAndRecordRateLimit(storage, t0);
    checkAndRecordRateLimit(storage, t0 + 1000);
    checkAndRecordRateLimit(storage, t0 + 2000);

    assert.throws(
      () => checkAndRecordRateLimit(storage, t0 + 3000),
      (err: unknown) => err instanceof RateLimitError
    );

    // After 10 minutes + 1 ms, rate limit resets
    assert.doesNotThrow(() => checkAndRecordRateLimit(storage, t0 + 10 * 60 * 1000 + 1));
  });

  test("buildEnquiryPayload normalizes all commercial and risk-check fields", () => {
    const payload = buildEnquiryPayload({
      name: "  Andrés  ",
      company: "TShaped",
      email: "ciso@empresa.es",
      systemType: "RAG sobre documentación interna",
      capability: "Consultar sistemas o datos internos",
      govern: "Preocupa fuga de PII en retrieval",
      intent: "AI Governance Snapshot",
      consent: true,
      source: "ai-runtime-risk-check",
      assessmentSummary: "Tier: Exposición sensible",
    });

    assert.equal(payload.Name, "Andrés");
    assert.equal(payload.Organisation, "TShaped");
    assert.equal(payload["Work email"], "ciso@empresa.es");
    assert.equal(payload["System type"], "RAG sobre documentación interna");
    assert.equal(payload["System capability"], "Consultar sistemas o datos internos");
    assert.equal(payload["Explicit consent"], "Accepted (response to this request only)");
    assert.equal(payload.Source, "ai-runtime-risk-check");
    assert.equal(payload["Preliminary risk signal"], "Tier: Exposición sensible");

    const mailingPayload = buildEnquiryPayload({
      name: "Whitepaper Subscriber",
      email: "cto@empresa.es",
      intent: "Whitepaper & AI Governance Mailing List (ES)",
      consent: true,
      mailingList: true,
      source: "whitepaper_es",
    });
    assert.equal(
      mailingPayload["Explicit consent"],
      "Accepted (Whitepaper download & AI Governance mailing list)"
    );
    assert.equal(
      mailingPayload["Mailing list"],
      "Subscribed (AI Governance & Runtime Assurance updates)"
    );
    assert.equal(mailingPayload.Source, "whitepaper_es");
  });

  test("submitEnquiry throws FormNotConfiguredError when no endpoint is configured", async () => {
    await assert.rejects(
      async () => {
        await submitEnquiry({ name: "Test", email: "test@company.com" });
      },
      (err: unknown) => err instanceof FormNotConfiguredError
    );
  });
});

// ============================================================================
// 4. ROUTING, LOCALE SWITCHING & SEO PARITY (routes.ts, seo.js, content)
// ============================================================================
describe("Routes, SEO Metadata & Bilingual Content Parity", () => {
  test("Recognizes new /es/ai-runtime-risk-check and /es/privacy routes", () => {
    assert.equal(isRiskCheckPath("/ai-runtime-risk-check"), true);
    assert.equal(isRiskCheckPath("/es/ai-runtime-risk-check/"), true);
    assert.equal(isPrivacyPath("/privacy"), true);
    assert.equal(isPrivacyPath("/es/privacy/"), true);
    assert.equal(isAppPath("/es/ai-runtime-risk-check"), true);
    assert.equal(isAppPath("/es/privacy"), true);
    assert.equal(localeFromPath("/es/ai-runtime-risk-check"), "es");
    assert.equal(stripLocale("/es/ai-runtime-risk-check"), RISK_CHECK_PATH);
    assert.equal(withLocale(PRIVACY_PATH, "es"), "/es/privacy");
  });

  test("switchLocalePath preserves path and hash between ES and EN", () => {
    assert.doesNotThrow(() => assertLocaleSwitch());
    const targetEs = switchLocalePath("/ai-runtime-risk-check", "#top", "es");
    assert.equal(targetEs, "/es/ai-runtime-risk-check#top");

    const targetEn = switchLocalePath("/es/ai-runtime-risk-check/", "", "en");
    assert.equal(targetEn, "/ai-runtime-risk-check");
  });

  test("Spanish homepage SEO metadata matches exact required copy", () => {
    assert.equal(
      HOME_TITLE_ES,
      "Gobernanza ejecutable para sistemas de IA | TShaped Consultant"
    );
    assert.equal(
      HOME_DESCRIPTION_ES,
      "Diseño controles técnicos, límites de runtime y evidencia verificable para RAG, copilotos, agentes y sistemas de IA de alto impacto. Comprueba el riesgo de tu sistema en 90 segundos."
    );
    assert.equal(
      HOME_OG_TITLE_ES,
      "Gobernanza ejecutable para sistemas de IA que pueden acceder, decidir y actuar"
    );
    assert.equal(
      HOME_OG_DESCRIPTION_ES,
      "De políticas en papel a controles técnicos, supervisión en ejecución y evidencia lista para auditoría."
    );

    const seoEs = pageSeoFor("/es/");
    assert.equal(seoEs.title, HOME_TITLE_ES);
    assert.equal(seoEs.description, HOME_DESCRIPTION_ES);
    assert.equal(seoEs.ogTitle, HOME_OG_TITLE_ES);
    assert.equal(seoEs.ogDescription, HOME_OG_DESCRIPTION_ES);
  });

  test("Spanish Hero, Pain section, HR Copilot case, Services, and Enablement match required positioning", () => {
    assert.equal(
      contentEs.HERO.headline,
      "Gobernanza ejecutable para sistemas de IA que pueden acceder, decidir y actuar."
    );
    assert.equal(
      contentEs.HERO.value,
      "Diseño controles técnicos, límites de runtime y evidencia verificable para RAG, copilotos, agentes y workflows de alto impacto."
    );
    assert.equal(contentEs.CTA.primary, "Comprobar el riesgo de mi sistema");
    assert.equal(contentEs.CTA.secondary, "Ver la demo técnica");
    assert.equal(contentEs.CTA.persistentPrimary, "Comprobar mi riesgo");
    assert.equal(contentEs.CTA.persistentSecondary, "Solicitar diagnóstico");
    assert.equal(
      contentEs.HERO.tagline,
      "Lleva tus sistemas de IA a producción con controles verificables"
    );
    assert.deepEqual(contentEs.HERO.pills, [
      "EU AI Act",
      "Agentic AI Governance",
      "Runtime Assurance",
    ]);
    assert.equal(contentEs.HERO.executiveSummary.length, 3);
    assert.equal(contentEn.HERO.executiveSummary.length, 3);
    assert.equal(
      contentEs.PAIN_SECTION.title,
      "Tu sistema puede estar gobernado sobre el papel y seguir siendo vulnerable en ejecución."
    );
    assert.ok(contentEs.PAIN_SECTION.lead.length > 20);
    assert.equal(contentEs.PAIN_SECTION.cards.length, 3);
    for (const card of contentEs.PAIN_SECTION.cards) {
      assert.ok(card.subtitle && card.subtitle.length > 5, "Card subtitle must be populated");
      assert.ok(card.text && card.text.length > 10, "Card text must be populated");
    }
    for (const card of contentEn.PAIN_SECTION.cards) {
      assert.ok(card.subtitle && card.subtitle.length > 5, "EN Card subtitle must be populated");
      assert.ok(card.text && card.text.length > 10, "EN Card text must be populated");
    }
    assert.equal(
      contentEs.FEATURED_HR_COPILOT.title,
      "Mismo modelo. Mismas peticiones. Dos posturas de riesgo."
    );
    assert.equal(
      contentEs.FEATURED_HR_COPILOT.resultClaim,
      "La demostración no produjo hallazgos sensibles en el conjunto de pruebas utilizado."
    );
    assert.ok(contentEs.HERO.assets.includes("AI runtime risk"));
    assert.ok(contentEs.HERO.assets.includes("gobernanza de IA en tiempo de ejecución"));
    assert.ok(contentEs.HERO.assets.includes("controles de acceso, autoridad y evidencia"));
    assert.equal(contentEs.SERVICE_LADDER.items.length, 3);
    assert.equal(contentEs.ENABLEMENT_PROGRAMS.formats.length, 3);
    assert.equal(contentEn.ENABLEMENT_PROGRAMS.formats.length, 3);
    assert.equal(
      contentEs.DIAGNOSTIC_FORM.success,
      "Gracias. Responderé con el siguiente paso recomendado para tu sistema."
    );
    assert.ok(UI.es.form.errors.consent.length > 0);
    assert.ok(UI.en.form.errors.consent.length > 0);
  });

  test("Simulated full 6-step assessment flow with back-navigation and answer modification", () => {
    const state: AnswerMap = {};
    state.q1 = "rag_internal";
    state.q2 = "respond_only";
    state.q3 = "internal_nonsensitive";
    assert.equal(isAssessmentComplete(state), false);

    // User goes back to Q1 and changes from RAG to Agent, and Q3 to credentials_strategic
    state.q1 = "agent_actions";
    state.q2 = "modify_execute";
    state.q3 = "credentials_strategic";
    state.q4 = "model_decides";
    state.q5 = "undefined";
    state.q6 = "final_response";

    assert.equal(isAssessmentComplete(state), true);
    assert.equal(
      getSystemTypeLabel(state, "es"),
      "Agente que puede ejecutar acciones"
    );

    const finalResult = calculateRiskAssessment(state, "es");
    assert.equal(finalResult.tier.id, "critical_agentic");
    assert.equal(finalResult.primaryFinding.id, "result_a");
    assert.ok(finalResult.secondaryFindings.length >= 1);
  });

  test("Path Selector (¿Qué te trae aquí?), 3 routes, and 6-tier Service Hierarchy are defined in ES and EN", () => {
    assert.equal(contentEs.PATH_SELECTOR.title, "¿Qué te trae aquí?");
    assert.equal(contentEn.PATH_SELECTOR.title, "What brings you here?");
    assert.equal(contentEs.PATH_SELECTOR.options.length, 4);
    assert.equal(contentEn.PATH_SELECTOR.options.length, 4);
    assert.deepEqual(
      contentEs.PATH_SELECTOR.options.map((o: { label: string }) => o.label),
      [
        "Comprobar el riesgo de mi sistema",
        "Quiero formar a mi equipo",
        "Busco un partner técnico",
        "Quiero explorar co-delivery",
      ]
    );
    assert.equal(contentEs.PATH_SELECTOR.threeEntries.length, 3);
    assert.equal(contentEn.PATH_SELECTOR.threeEntries.length, 3);
    assert.deepEqual(
      contentEs.PATH_SELECTOR.threeEntries.map((r: { cta: string }) => r.cta),
      ["Comprobar el riesgo de mi sistema", "Ver la demo técnica", "Explorar co-delivery"]
    );
    assert.equal(contentEs.DIAGNOSTIC.hierarchySteps.length, 6);
    assert.equal(contentEn.DIAGNOSTIC.hierarchySteps.length, 6);
    assert.equal(contentEs.DIAGNOSTIC.hierarchySteps[0].name, "AI Runtime Risk Check");
    assert.equal(contentEs.DIAGNOSTIC.hierarchySteps[1].name, "AI Governance Snapshot");
    assert.equal(contentEs.DIAGNOSTIC.hierarchySteps[5].name, "Partner / Co-delivery / White-label");
  });

  test("Cross-layer content consistency: core commercial terms exist across React content, vite.config.js noscript, index.html, and dist/", () => {
    const rootDir = process.cwd();
    const viteConfigText = fs.readFileSync(path.join(rootDir, "vite.config.js"), "utf8");
    const indexHtmlText = fs.readFileSync(path.join(rootDir, "index.html"), "utf8");
    const contentEsJson = JSON.stringify(contentEs);
    const contentEnJson = JSON.stringify(contentEn);

    const requiredEsPhrases = [
      "AI Runtime Risk Check",
      "Comprobar el riesgo de mi sistema",
      "Comprobar mi riesgo",
      "Del PDF Legal al Código",
      "HR Copilot",
      "La demostración no produjo hallazgos sensibles en el conjunto de pruebas utilizado.",
      "AI Governance Snapshot",
      "AI runtime risk",
      "gobernanza de IA en tiempo de ejecución",
      "controles de acceso, autoridad y evidencia",
    ];

    for (const phrase of requiredEsPhrases) {
      assert.ok(
        contentEsJson.includes(phrase),
        `Phrase "${phrase}" missing from src/content.es.js`
      );
      assert.ok(
        viteConfigText.includes(phrase),
        `Phrase "${phrase}" missing from NOSCRIPT_ES in vite.config.js`
      );
    }

    const requiredEnPhrases = [
      "AI Runtime Risk Check",
      "Check my system's risk",
      "Check my risk",
      "From Legal PDF to Code",
      "HR Copilot",
      "The demonstration produced no sensitive findings across the test suite used.",
      "AI Governance Snapshot",
      "AI runtime risk",
    ];

    for (const phrase of requiredEnPhrases) {
      assert.ok(
        contentEnJson.includes(phrase),
        `Phrase "${phrase}" missing from src/content.js`
      );
      assert.ok(
        indexHtmlText.includes(phrase),
        `Phrase "${phrase}" missing from <noscript> in index.html`
      );
    }

    // If dist/ exists, verify generated static fallback files and canonical/hreflang tags
    const distDir = path.join(rootDir, "dist");
    if (fs.existsSync(distDir)) {
      const distEsHome = fs.readFileSync(path.join(distDir, "es", "index.html"), "utf8");
      for (const phrase of requiredEsPhrases) {
        assert.ok(
          distEsHome.includes(phrase),
          `Phrase "${phrase}" missing from built dist/es/index.html`
        );
      }

      const routeChecks = [
        {
          file: path.join(distDir, "es", "index.html"),
          canonical: "https://tshapedconsultant.com/es/",
        },
        {
          file: path.join(distDir, "es", "ai-runtime-risk-check", "index.html"),
          canonical: "https://tshapedconsultant.com/es/ai-runtime-risk-check/",
        },
        {
          file: path.join(distDir, "ai-runtime-risk-check", "index.html"),
          canonical: "https://tshapedconsultant.com/ai-runtime-risk-check/",
        },
        {
          file: path.join(distDir, "es", "privacy", "index.html"),
          canonical: "https://tshapedconsultant.com/es/privacy/",
        },
        {
          file: path.join(distDir, "privacy", "index.html"),
          canonical: "https://tshapedconsultant.com/privacy/",
        },
      ];

      for (const rc of routeChecks) {
        assert.ok(fs.existsSync(rc.file), `Missing built route file: ${rc.file}`);
        const html = fs.readFileSync(rc.file, "utf8");
        assert.ok(
          html.includes(`<link rel="canonical" href="${rc.canonical}" />`),
          `Incorrect canonical in ${rc.file}`
        );
        assert.ok(html.includes('hreflang="en-GB"'), `Missing hreflang en-GB in ${rc.file}`);
        assert.ok(html.includes('hreflang="es"'), `Missing hreflang es in ${rc.file}`);
        assert.ok(html.includes('hreflang="x-default"'), `Missing hreflang x-default in ${rc.file}`);
      }
    }
  });

  test("Risk Check result object never contains or leaks PII (email, name, company)", () => {
    const answers: AnswerMap = {
      q1: "agent_actions",
      q2: "modify_execute",
      q3: "credentials_strategic",
      q4: "model_decides",
      q5: "undefined",
      q6: "final_response",
    };
    const result = calculateRiskAssessment(answers, "es");
    const serialized = JSON.stringify(result);
    assert.equal(serialized.includes("@"), false, "Result must not contain email addresses");
    assert.equal("email" in result, false, "Result object must not have email property");
    assert.equal("name" in result, false, "Result object must not have name property");
    assert.equal("company" in result, false, "Result object must not have company property");
  });
});


