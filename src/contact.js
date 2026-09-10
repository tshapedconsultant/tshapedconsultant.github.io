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

function sanitizeLine(value, max = 120) {
  return String(value)
    .replace(/[\r\n\0\u2028\u2029]/g, " ")
    .replace(/%0[da]/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function sanitizeBody(value, max = 2000) {
  return String(value)
    .replace(/\0/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/[\r\u2028\u2029]/g, "\n")
    .trim()
    .slice(0, max);
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
export function buildEnquiryPayload({ name, company, email, govern, stage }) {
  const workEmail = sanitizeLine(email, 254);
  const payload = {
    Name: sanitizeLine(name),
  };

  const companyLine = sanitizeLine(company);
  if (companyLine) {
    payload.Company = companyLine;
  }

  payload["Work email"] = workEmail;

  const stageLine = sanitizeLine(stage, 160);
  if (stageLine) {
    payload["Current stage"] = stageLine;
  }

  payload["What they want to govern"] = sanitizeBody(govern);
  payload.email = workEmail;
  payload._replyto = workEmail;
  payload._subject = "AI Governance Diagnostic enquiry";
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

  throw new Error(result?.error || result?.message || "Enquiry could not be sent.");
}

export async function submitEnquiry(fields) {
  const formspree = import.meta.env.VITE_FORM_ENDPOINT?.trim();
  if (!formspree) {
    throw new FormNotConfiguredError();
  }

  const payload = buildEnquiryPayload(fields);
  const attempts = await Promise.allSettled([
    postEnquiry(formspree, payload).then((result) => {
      if (!isDelivered(result, "formspree")) {
        throw new Error(result.error || result.message || "Enquiry could not be sent.");
      }
      return "formspree";
    }),
    postEnquiry(inboxEndpoint(), formsubmitPayload(payload)).then((result) => {
      if (!isDelivered(result, "formsubmit")) {
        throw new Error(result.error || result.message || "Enquiry could not be sent.");
      }
      return "formsubmit";
    }),
  ]);

  if (attempts.some((attempt) => attempt.status === "fulfilled")) {
    return;
  }

  const reason = attempts.find((attempt) => attempt.status === "rejected")?.reason;
  throw reason instanceof Error ? reason : new Error("Enquiry could not be sent.");
}
