/** Recipient assembled at runtime so the address is not a harvestable mailto/string in source. */
export function contactEmail() {
  const local = String.fromCharCode(97, 110, 100, 114, 101, 115, 108, 97, 103, 101);
  const host = ["tshapedconsultant", "com"].join(".");
  return `${local}@${host}`;
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

/**
 * POST to VITE_FORM_ENDPOINT (Formspree or compatible JSON API) when set.
 * Otherwise Formsubmit.co so visitors without a desktop mail client can still send.
 */
export async function submitEnquiry({ name, company, email, govern, stage }) {
  const payload = {
    name: sanitizeLine(name),
    email: sanitizeLine(email, 254),
    company: sanitizeLine(company) || "Not specified",
    stage: sanitizeLine(stage, 160) || "Not specified",
    message: sanitizeBody(govern),
    _subject: "AI Governance Diagnostic enquiry",
  };

  const configured = import.meta.env.VITE_FORM_ENDPOINT;
  const url = configured || `https://formsubmit.co/ajax/${contactEmail()}`;
  const body = configured
    ? payload
    : { ...payload, _template: "table", _captcha: "false" };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const result = await response.json().catch(() => ({}));
  const failed =
    !response.ok || result.ok === false || result.success === "false" || result.success === false;
  if (failed) {
    throw new Error(result.error || result.message || "Enquiry could not be sent.");
  }
}
