/**
 * Single source for the whitepaper files the site actually serves.
 * The Spanish unified edition is not published. Do not invent its page count.
 */
export const WHITEPAPER_PUBLICATION = {
  version: "5.4",
  publishedAt: "2026-11-25",
  policyFile: "policies/dualkey_illustrative.rego",
  policyCommit: "5cd704a",
  evidenceStatus: "pdp-policy-tested",
  en: {
    status: "current",
    pdfPath: "/Probabilistic-Models-Require-Deterministic-Governance.pdf",
    archivePath: "/archive/Probabilistic-Models-Require-Deterministic-Governance-2026-11-16.pdf",
    pageCount: 23,
    bytes: 175725,
    sha256: "c80e046fd6cb06070f0c27743d11b385cdff32cd83db8b904d8bb3500aa74ef1",
  },
  es: {
    status: "pending",
    previousPdfPath: "/Gobernanza-Determinista-IA.pdf",
    previousPageCount: 30,
    previousPublishedAt: "2026-11-16",
    previousBytes: 185954,
    previousSha256: "87303bd63982a6f871d9afdfd9783502aff9f785ad5e92df4ec906a8e6079d02",
  },
  brief: {
    pdfPath: "/Dedalo-Executive-Brief.pdf",
    pageCount: 2,
    bytes: 230915,
    sha256: "285eef8072afb2ad2f14a1aa004965716a89bd200f975907814ea76ba08babdf",
  },
};

/** Bust the cached November edition that shared this URL and download name. */
export function publishedFileHref(file) {
  return `${file.pdfPath}?v=${file.sha256.slice(0, 12)}`;
}
