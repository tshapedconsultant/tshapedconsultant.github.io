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

/**
 * Formspree accepts the POST then may respond with JSON { ok: true } or a 3xx redirect
 * to a thank-you page. Following that redirect in fetch() often hits a CORS wall even
 * though the enquiry was delivered — treat 2xx/3xx as success unless JSON explicitly says ok: false.
 */
export async function submitEnquiry({ name, company, email, govern, stage }) {
  const endpoint = import.meta.env.VITE_FORM_ENDPOINT?.trim();
  if (!endpoint) {
    throw new FormNotConfiguredError();
  }

  const payload = {
    name: sanitizeLine(name),
    email: sanitizeLine(email, 254),
    company: sanitizeLine(company) || "Not specified",
    stage: sanitizeLine(stage, 160) || "Not specified",
    message: sanitizeBody(govern),
    _subject: "AI Governance Diagnostic enquiry",
  };

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
    return;
  }

  const bodyText = await response.text();
  const result = parseJsonBody(bodyText);

  if (response.ok) {
    if (result?.ok === false) {
      throw new Error(result.error || result.message || "Enquiry could not be sent.");
    }
    return;
  }

  throw new Error(result?.error || result?.message || "Enquiry could not be sent.");
}
