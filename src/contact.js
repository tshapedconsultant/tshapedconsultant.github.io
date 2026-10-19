/** Recipient assembled at runtime so the address is not a harvestable mailto/string in source. */
export function contactEmail() {
  const local = String.fromCharCode(97, 110, 100, 114, 101, 115, 108, 97, 103, 101);
  const host = ["tshapedconsultant", "com"].join(".");
  return `${local}@${host}`;
}

export class FormNotConfiguredError extends Error {
  constructor() {
    super("FORM_NOT_CONFIGURED");
    this.name = "FormNotConfiguredError";
  }
}

export class RateLimitError extends Error {
  constructor() {
    super("RATE_LIMITED");
    this.name = "RateLimitError";
  }
}

const RATE_LIMIT_KEY = "tshaped_form_rl_v1";
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 3; // max 3 submissions per 10-minute window

export function checkAndRecordRateLimit(
  customStorage = typeof window !== "undefined" ? window.sessionStorage : null,
  now = Date.now()
) {
  if (!customStorage) return;
  try {
    const raw = customStorage.getItem(RATE_LIMIT_KEY);
    const list = raw ? JSON.parse(raw) : [];
    const recent = Array.isArray(list)
      ? list.filter((ts) => typeof ts === "number" && now - ts < RATE_LIMIT_WINDOW_MS)
      : [];
    if (recent.length >= RATE_LIMIT_MAX) {
      throw new RateLimitError();
    }
    recent.push(now);
    customStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent));
  } catch (err) {
    if (err instanceof RateLimitError) throw err;
    // Ignore storage quota errors
  }
}

export function sanitizeLine(value, max = 120) {
  return String(value ?? "")
    .replace(/[\r\n\0\u2028\u2029]/g, " ")
    .replace(/[<>]/g, "")
    .replace(/%0[da]/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

export function sanitizeBody(value, max = 2000) {
  return String(value ?? "")
    .replace(/\0/g, "")
    .replace(/[<>]/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/[\r\u2028\u2029]/g, "\n")
    .split("\n")
    .map((line) => line.replace(/^\s*(bcc|cc|to|from|content-type|mime-version)\s*:/i, "$1 -"))
    .join("\n")
    .trim()
    .slice(0, max);
}

export function isValidWorkEmail(value) {
  const trimmed = String(value ?? "").trim();
  if (trimmed.length < 5 || trimmed.length > 254) return false;
  if (/[\r\n\0\s<>]/.test(trimmed)) return false;
  return /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/.test(trimmed);
}

function parseJsonBody(text) {
  const trimmed = text.trim();
  if (!trimmed) {
    return null;
  }
  try {
    return JSON.parse(trimmed);
  } catch {
    return null;
  }
}

function inboxEndpoint() {
  return `https://formsubmit.co/ajax/${contactEmail()}`;
}

/**
 * Formspree prints JSON keys as email headings, so user-facing labels stay readable.
 * `email` / `_replyto` are Formspree specials for Reply-To. Empty optionals are omitted.
 * Do not send `_status` — Formspree adds that itself.
 */
export function buildEnquiryPayload({
  name,
  company,
  email,
  govern,
  systemType,
  capability,
  stage,
  intent,
  caller,
  callerKey,
  role,
  practice,
  delivery,
  nda,
  consent,
  source,
  assessmentSummary,
}) {
  const workEmail = sanitizeLine(email, 254);
  const payload = {};

  const nameLine = sanitizeLine(name);
  if (nameLine) {
    payload.Name = nameLine;
  }

  const companyLine = sanitizeLine(company);
  if (companyLine) {
    payload.Organisation = companyLine;
  }

  payload["Work email"] = workEmail;

  const systemTypeLine = sanitizeLine(systemType, 160);
  if (systemTypeLine) {
    payload["System type"] = systemTypeLine;
  }

  const capabilityLine = sanitizeLine(capability, 160);
  if (capabilityLine) {
    payload["System capability"] = capabilityLine;
  }

  const callerKeyLine = sanitizeLine(callerKey, 40);
  if (callerKeyLine) {
    payload["Caller type"] = callerKeyLine;
  }

  const callerLine = sanitizeLine(caller, 160);
  if (callerLine) {
    payload["Contacting as"] = callerLine;
  }

  const intentLine = sanitizeLine(intent, 160);
  if (intentLine) {
    payload["What they need"] = intentLine;
  }

  const stageLine = sanitizeLine(stage, 160);
  if (stageLine) {
    payload["Current stage"] = stageLine;
  }

  const roleLine = sanitizeLine(role);
  if (roleLine) {
    payload.Role = roleLine;
  }

  const practiceLine = sanitizeLine(practice);
  if (practiceLine) {
    payload["Practice area"] = practiceLine;
  }

  const deliveryLine = sanitizeLine(delivery, 160);
  if (deliveryLine) {
    payload["Delivery model"] = deliveryLine;
  }

  const ndaLine = sanitizeLine(nda, 40);
  if (ndaLine) {
    payload["NDA may be required"] = ndaLine;
  }

  const governBody = sanitizeBody(govern);
  if (governBody) {
    payload["Primary concern / scope"] = governBody;
  }

  const summaryBody = sanitizeBody(assessmentSummary, 1000);
  if (summaryBody) {
    payload["Preliminary risk signal"] = summaryBody;
  }

  if (consent) {
    payload["Explicit consent"] = "Accepted (response to this request only)";
  }

  const sourceLine = sanitizeLine(source, 80);
  if (sourceLine) {
    payload.Source = sourceLine;
  }

  payload.email = workEmail;
  payload._replyto = workEmail;

  const subjectPrefix = {
    organisation: "Organisation",
    legal: "Legal partner",
    consulting: "Consulting partner",
    peer: "Peer/research",
    risk_check: "AI Runtime Risk Check",
    other: "Other",
  }[callerKey] || "Enquiry";
  payload._subject = intentLine
    ? `${subjectPrefix}: ${intentLine}`
    : `${subjectPrefix}: site enquiry`;
  return payload;
}

function formsubmitPayload(payload) {
  return {
    ...payload,
    _captcha: "false",
    _template: "table",
  };
}

function isDelivered(result, kind) {
  if (!result) return false;
  if (kind === "formspree") {
    return result.ok !== false;
  }
  if (result.success === true || result.success === "true") return true;
  const message = String(result.message || "").toLowerCase();
  // First use only arms the inbox; Formspree still holds the enquiry.
  return message.includes("activate");
}

/**
 * POST JSON to Formspree / FormSubmit. Treat 2xx/3xx as a transport success, then
 * read the JSON body. Following a thank-you redirect in fetch() often hits CORS
 * even when the enquiry was stored — hence redirect: "manual".
 */
async function postEnquiry(endpoint, payload) {
  let response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      body: JSON.stringify(payload),
      redirect: "manual",
    });
  } catch {
    throw new Error("Enquiry could not be sent.");
  }

  if (response.type === "opaqueredirect" || (response.status >= 300 && response.status < 400)) {
    return { ok: true };
  }

  const bodyText = await response.text();
  const result = parseJsonBody(bodyText);

  if (response.ok) {
    return result || { ok: true };
  }

  // Never leak raw backend details or stack traces to the UI
  throw new Error("Enquiry could not be sent.");
}

export async function submitEnquiry(fields) {
  checkAndRecordRateLimit();

  const envObj = import.meta.env || {};
  const formspree = envObj.VITE_FORM_ENDPOINT?.trim();
  if (!formspree) {
    throw new FormNotConfiguredError();
  }

  const payload = buildEnquiryPayload(fields);
  const attempts = await Promise.allSettled([
    postEnquiry(formspree, payload).then((result) => {
      if (!isDelivered(result, "formspree")) {
        throw new Error("Enquiry could not be sent.");
      }
      return "formspree";
    }),
    postEnquiry(inboxEndpoint(), formsubmitPayload(payload)).then((result) => {
      if (!isDelivered(result, "formsubmit")) {
        throw new Error("Enquiry could not be sent.");
      }
      return "formsubmit";
    }),
  ]);

  if (attempts.some((attempt) => attempt.status === "fulfilled")) {
    return;
  }

  throw new Error("Enquiry could not be sent.");
}
