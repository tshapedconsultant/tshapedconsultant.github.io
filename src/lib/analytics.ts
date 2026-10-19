/**
 * Privacy-preserving conversion analytics helper.
 *
 * Security & privacy constraints:
 * - Never logs prompts, free-text answers, client names, emails, or confidential data.
 * - Only emits allowlisted event names and non-PII categorical properties
 *   (locale, viewport, question_step, exposure_tier, primary_finding_id, source).
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
  | "contact_submitted";

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
]);

const ALLOWED_PROP_KEYS = new Set([
  "locale",
  "viewport",
  "source",
  "question_step",
  "question_id",
  "exposure_tier",
  "primary_finding",
  "intent",
]);

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
    if (typeof val === "number" && Number.isFinite(val)) {
      safe[key] = val;
    } else if (typeof val === "boolean") {
      safe[key] = val;
    } else if (typeof val === "string") {
      // Strip anything resembling an email or free-text sentence with spaces
      const trimmed = val.trim().slice(0, 48);
      if (trimmed && !trimmed.includes("@") && !/\s/.test(trimmed)) {
        safe[key] = trimmed.replace(/[^a-zA-Z0-9_-]/g, "_");
      }
    }
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
      }
      if (typeof window.gtag === "function") {
        window.gtag("event", event, props);
      }
    } catch {
      // Never let analytics break user flow
    }
  }

  return record;
}
