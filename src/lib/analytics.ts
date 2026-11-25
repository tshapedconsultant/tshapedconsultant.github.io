/**
 * Privacy-preserving conversion analytics helper.
 *
 * Security & privacy constraints:
 * - Never logs prompts, free-text answers, client names, emails, or confidential data.
 * - Categorical properties are closed enums taken from real call sites.
 * - question_step is an integer from 1 to 6. Other numbers are dropped.
 *
 * Submitted enquiry, not a qualified request:
 * - diagnostic_form_submit_success means the provider accepted the send.
 *   intent "snapshot" is a submitted Snapshot request only.
 * - Qualification is a later human review: identifiable organisation,
 *   a concrete system, a problem inside scope, and a real chance of buying.
 * - A commercial opportunity is later still: the right counterpart and an
 *   agreed next step. A proposal and a won or lost outcome stay in that
 *   same commercial record. The browser does not record those later levels.
 * - contact_submitted is the same accepted send, kept for existing consumers.
 * - Do not add the two events together.
 *
 * One analytics destination. If both window.plausible and window.gtag exist,
 * only Plausible receives the event, so one submitted request is not stored twice.
 */

export type ConversionEventName =
  | "risk_check_started"
  | "risk_check_question_answered"
  | "risk_check_completed"
  | "risk_check_email_viewed"
  | "risk_check_email_submitted"
  | "risk_check_result_viewed"
  | "snapshot_cta_clicked"
  | "demo_cta_clicked"
  | "contact_submitted"
  | "whitepaper_mailing_list_joined"
  | "dual_key_cta_click"
  | "diagnostic_form_start"
  | "diagnostic_form_submit_success"
  | "workflow_bridge_click";

const ALLOWED_EVENTS = new Set<ConversionEventName>([
  "risk_check_started",
  "risk_check_question_answered",
  "risk_check_completed",
  "risk_check_email_viewed",
  "risk_check_email_submitted",
  "risk_check_result_viewed",
  "snapshot_cta_clicked",
  "demo_cta_clicked",
  "contact_submitted",
  "whitepaper_mailing_list_joined",
  "dual_key_cta_click",
  "diagnostic_form_start",
  "diagnostic_form_submit_success",
  "workflow_bridge_click",
]);

const ENUMS: Record<string, ReadonlySet<string>> = {
  locale: new Set(["en", "es"]),
  viewport: new Set(["mobile", "desktop"]),
  placement: new Set(["hero", "middle", "footer"]),
  intent: new Set([
    "snapshot",
    "mentoring",
    "workshop",
    "hackathon",
    "briefing",
    "blueprint",
    "fractional",
    "partners",
    "other",
    "mailing_list",
  ]),
  source: new Set([
    "dedicated_route",
    "dedicated_page",
    "home_embed",
    "embedded_home",
    "risk_check_result",
    "dual-key",
    "commercial_form",
    "diagnostic_form",
    "whitepaper_page",
    "whitepaper_es",
    "whitepaper_es_reading_gate",
    "whitepaper_en",
    "whitepaper_en_reading_gate",
    "home_whitepaper_teaser",
  ]),
  question_id: new Set(["q1", "q2", "q3", "q4", "q5", "q6"]),
  exposure_tier: new Set(["informational", "operational", "sensitive", "critical_agentic", "unknown"]),
  primary_finding: new Set(["result_a", "result_b", "result_c", "result_d", "unknown"]),
  bridge_placement: new Set([
    "nav",
    "home_research_block",
    "home_framework_card",
    "dedalo_hub",
    "workflow_article",
  ]),
  bridge_target: new Set(["dedalo", "study", "snapshot", "dual-key", "article"]),
};

const ALLOWED_PROP_KEYS = new Set(Object.keys(ENUMS).concat("question_step"));

export interface AnalyticsEventRecord {
  event: ConversionEventName;
  props: Record<string, string | number | boolean>;
  ts: number;
}

const memoryQueue: AnalyticsEventRecord[] = [];

declare global {
  interface Window {
    __TSHAPED_ANALYTICS_QUEUE__?: AnalyticsEventRecord[];
    plausible?: (
      event: string,
      options?: { props?: Record<string, string | number | boolean> }
    ) => void;
    gtag?: (
      command: "event",
      eventName: string,
      eventParams?: Record<string, string | number | boolean>
    ) => void;
  }
}

function detectViewport(): "mobile" | "desktop" {
  if (typeof window === "undefined") return "desktop";
  return window.innerWidth <= 768 ? "mobile" : "desktop";
}

function detectLocale(): "es" | "en" {
  if (typeof window === "undefined") return "es";
  const p = window.location.pathname;
  return p === "/es" || p.startsWith("/es/") ? "es" : "en";
}

export function sanitizeAnalyticsProps(
  raw?: Record<string, unknown>
): Record<string, string | number | boolean> {
  const safe: Record<string, string | number | boolean> = {
    locale: detectLocale(),
    viewport: detectViewport(),
  };

  if (!raw || typeof raw !== "object") return safe;

  for (const [key, val] of Object.entries(raw)) {
    if (!ALLOWED_PROP_KEYS.has(key)) continue;
    if (key === "question_step") {
      if (typeof val === "number" && Number.isInteger(val) && val >= 1 && val <= 6) {
        safe[key] = val;
      }
      continue;
    }
    if (typeof val !== "string") continue;
    const trimmed = val.trim();
    const allowed = ENUMS[key];
    if (allowed?.has(trimmed)) safe[key] = trimmed;
  }

  return safe;
}

export function getTrackedEvents(): AnalyticsEventRecord[] {
  if (typeof window !== "undefined" && Array.isArray(window.__TSHAPED_ANALYTICS_QUEUE__)) {
    return [...window.__TSHAPED_ANALYTICS_QUEUE__];
  }
  return [...memoryQueue];
}

export function clearTrackedEvents(): void {
  memoryQueue.length = 0;
  if (typeof window !== "undefined" && Array.isArray(window.__TSHAPED_ANALYTICS_QUEUE__)) {
    window.__TSHAPED_ANALYTICS_QUEUE__.length = 0;
  }
}

export function trackEvent(
  event: ConversionEventName,
  rawProps?: Record<string, unknown>
): AnalyticsEventRecord | null {
  if (!ALLOWED_EVENTS.has(event)) return null;

  const props = sanitizeAnalyticsProps(rawProps);
  const record: AnalyticsEventRecord = {
    event,
    props,
    ts: Date.now(),
  };

  if (memoryQueue.length >= 100) {
    memoryQueue.shift();
  }
  memoryQueue.push(record);

  if (typeof window !== "undefined") {
    if (!Array.isArray(window.__TSHAPED_ANALYTICS_QUEUE__)) {
      window.__TSHAPED_ANALYTICS_QUEUE__ = [];
    }
    if (window.__TSHAPED_ANALYTICS_QUEUE__.length >= 100) {
      window.__TSHAPED_ANALYTICS_QUEUE__.shift();
    }
    window.__TSHAPED_ANALYTICS_QUEUE__.push(record);

    try {
      if (typeof window.plausible === "function") {
        window.plausible(event, { props });
      } else if (typeof window.gtag === "function") {
        window.gtag("event", event, props);
      }
    } catch {
      // Never let analytics break user flow
    }
  }

  return record;
}
