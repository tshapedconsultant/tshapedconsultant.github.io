import {
  EU_AI_ACT_MAPPING_PATH,
  HYBRID_PROFILES_PATH,
  MONTEQUIEU_PATH,
  WHITEPAPER_PATH,
  homePath,
  localeFromPath,
  stripLocale,
  withLocale,
} from "./routes";
import { ARTICLE, HYBRID_ARTICLE } from "./content.js";
import { ARTICLE as ARTICLE_ES, HYBRID_ARTICLE as HYBRID_ARTICLE_ES } from "./content.es.js";

export const ORIGIN = "https://tshapedconsultant.com";

export const HOME_TITLE =
  "Andres Lage – AI Governance & Responsible AI Architect | EU AI Act, ISO 42001";

export const HOME_TITLE_ES =
  "Andrés Lage – Gobernanza de IA y arquitecto de IA responsable | EU AI Act, ISO 42001";

export const HOME_DESCRIPTION =
  "AI governance and Responsible AI architecture for regulated organisations. Andrés Lage Freire helps CTOs and Risk leaders implement EU AI Act and ISO 42001 controls across RAG systems, agents and high-accountability use cases.";

export const HOME_DESCRIPTION_ES =
  "Gobernanza de IA y arquitectura de IA responsable para organizaciones reguladas. Andrés Lage Freire ayuda a CTOs y líderes de Riesgo a implantar controles del EU AI Act e ISO 42001 en sistemas RAG, agentes y casos de alta responsabilidad.";

export const PAGE_SEO = {
  "/": {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
  },
  [WHITEPAPER_PATH]: {
    title: "Probabilistic Models Require Deterministic Governance | tshapedconsultant",
    description:
      "Why enterprise and agentic AI needs a constitutional architecture — independent runtime controls, the Deterministic Cage, and a separation of policy, execution and oversight.",
  },
  [HYBRID_PROFILES_PATH]: {
    title: `${HYBRID_ARTICLE.title} | tshapedconsultant`,
    description: HYBRID_ARTICLE.excerpt,
  },
  [MONTEQUIEU_PATH]: {
    title: `${ARTICLE.title} | tshapedconsultant`,
    description: ARTICLE.excerpt,
  },
  [EU_AI_ACT_MAPPING_PATH]: {
    title: "EU AI Act mapping | tshapedconsultant",
    description:
      "Selected EU AI Act duties mapped to executable controls and hashed evidence packs — for CTOs, Heads of AI and Risk leaders.",
  },
};

export const PAGE_SEO_ES = {
  "/": {
    title: HOME_TITLE_ES,
    description: HOME_DESCRIPTION_ES,
  },
  [WHITEPAPER_PATH]: {
    title: "Modelos probabilísticos requieren gobernanza determinista | tshapedconsultant",
    description:
      "Por qué la IA empresarial necesita una arquitectura constitucional. Whitepaper en español: gobernanza determinista para modelos probabilísticos.",
  },
  [HYBRID_PROFILES_PATH]: {
    title: `${HYBRID_ARTICLE_ES.title} | tshapedconsultant`,
    description: HYBRID_ARTICLE_ES.excerpt,
  },
  [MONTEQUIEU_PATH]: {
    title: `${ARTICLE_ES.title} | tshapedconsultant`,
    description: ARTICLE_ES.excerpt,
  },
  [EU_AI_ACT_MAPPING_PATH]: {
    title: "Mapeo del EU AI Act | tshapedconsultant",
    description:
      "Deberes seleccionados del EU AI Act mapeados a controles ejecutables y paquetes de evidencia con hash — para CTOs, responsables de IA y líderes de Riesgo.",
  },
};

export function pageSeoFor(pathname) {
  const locale = localeFromPath(pathname);
  const path = stripLocale(pathname);
  const table = locale === "es" ? PAGE_SEO_ES : PAGE_SEO;
  return table[path] || table["/"];
}

export function absoluteUrl(pathname) {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/") return `${ORIGIN}/`;
  if (p === "/es") return `${ORIGIN}/es/`;
  return `${ORIGIN}${p}`;
}

export function alternateUrls(pathname) {
  const canonical = stripLocale(pathname);
  return {
    en: absoluteUrl(withLocale(canonical, "en")),
    es: absoluteUrl(withLocale(canonical, "es")),
  };
}

export function jsonLdForLocale(locale) {
  const home = absoluteUrl(homePath(locale));
  const inLanguage = locale === "es" ? "es" : "en-GB";
  const paper = locale === "es" ? PAGE_SEO_ES[WHITEPAPER_PATH] : PAGE_SEO[WHITEPAPER_PATH];
  const hybrid = locale === "es" ? HYBRID_ARTICLE_ES : HYBRID_ARTICLE;
  const article = locale === "es" ? ARTICLE_ES : ARTICLE;
  const personJob =
    locale === "es"
      ? "Líder de gobernanza de IA | Arquitecto de IA responsable"
      : "AI Governance Lead | Responsible AI Architect";
  const personDesc =
    locale === "es"
      ? "Líder de gobernanza de IA y arquitecto de IA responsable, especializado en EU AI Act, ISO 42001 y gobernanza nativa del SDLC para RAG, LLM y agentes autónomos."
      : "AI Governance Lead and Responsible AI Architect specializing in EU AI Act, ISO 42001, and SDLC-native governance for RAG, LLMs and autonomous agents.";
  const serviceName = locale === "es" ? "Consultoría de gobernanza de IA" : "AI Governance Consulting";
  const serviceDesc =
    locale === "es"
      ? "Consultoría en gobernanza de IA, cumplimiento del EU AI Act, preparación ISO 42001 y gobernanza nativa del SDLC para sistemas de IA."
      : "Consulting on AI governance, EU AI Act compliance, ISO 42001 readiness, and SDLC-native governance for AI systems.";
  const practiceDesc =
    locale === "es"
      ? "Consultoría de ingeniería de gobernanza de IA para CTOs, responsables de IA y líderes de Riesgo/Cumplimiento. EU AI Act, ISO/IEC 42001 y gobernanza en runtime de sistemas RAG y agentes."
      : "AI Governance Engineering consultancy for CTOs, Heads of AI and Risk/Compliance leaders. EU AI Act, ISO/IEC 42001 and runtime governance of RAG systems and agents.";
  const worksName =
    locale === "es" ? "Con sede en Madrid · Trabajo en remoto en EMEA" : "Based in Madrid · Working remotely across EMEA";

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${ORIGIN}/#andres`,
        name: "Andrés Lage Freire",
        jobTitle: personJob,
        description: personDesc,
        url: home,
        image: `${ORIGIN}/cover.png`,
        sameAs: [
          "https://www.linkedin.com/in/andres-lage-freire-4562a91b1/",
          "https://github.com/tshapedconsultant",
          "https://medium.com/@andresl",
        ],
        knowsAbout: [
          "AI Governance",
          "Responsible AI",
          "EU AI Act",
          "ISO 42001",
          "LLM Governance",
          "RAG Systems",
          "AI Risk Management",
          "SDLC",
          "Machine Learning",
          "Data Governance",
        ],
        worksLocation: {
          "@type": "Place",
          name: worksName,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Madrid",
            addressCountry: "Spain",
          },
        },
        offers: {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: serviceName,
            description: serviceDesc,
          },
        },
      },
      {
        "@type": "ProfessionalService",
        "@id": `${ORIGIN}/#practice`,
        name: "tshapedconsultant",
        description: practiceDesc,
        url: home,
        image: `${ORIGIN}/cover.png`,
        founder: { "@id": `${ORIGIN}/#andres` },
        sameAs: [
          "https://www.linkedin.com/in/andres-lage-freire-4562a91b1/",
          "https://github.com/tshapedconsultant",
          "https://medium.com/@andresl",
        ],
      },
      {
        "@type": "Article",
        "@id": `${absoluteUrl(withLocale(WHITEPAPER_PATH, locale))}#article`,
        headline: locale === "es" ? "Modelos probabilísticos requieren gobernanza determinista" : paper.title.replace(" | tshapedconsultant", ""),
        description: paper.description,
        url: absoluteUrl(withLocale(WHITEPAPER_PATH, locale)),
        inLanguage,
        image: `${ORIGIN}/cover.png`,
        author: { "@id": `${ORIGIN}/#andres` },
        publisher: { "@id": `${ORIGIN}/#practice` },
      },
      {
        "@type": "Article",
        "@id": `${absoluteUrl(withLocale(HYBRID_PROFILES_PATH, locale))}#article`,
        headline: hybrid.title,
        description: hybrid.excerpt,
        url: absoluteUrl(withLocale(HYBRID_PROFILES_PATH, locale)),
        datePublished: "2026-09-07",
        inLanguage,
        image: `${ORIGIN}/hybrid-profiles-ai-agents.jpg`,
        author: { "@id": `${ORIGIN}/#andres` },
        publisher: { "@id": `${ORIGIN}/#practice` },
      },
      {
        "@type": "Article",
        "@id": `${absoluteUrl(withLocale(MONTEQUIEU_PATH, locale))}#article`,
        headline: article.title,
        description: article.excerpt,
        url: absoluteUrl(withLocale(MONTEQUIEU_PATH, locale)),
        datePublished: "2026-07-15",
        inLanguage,
        author: { "@id": `${ORIGIN}/#andres` },
        publisher: { "@id": `${ORIGIN}/#practice` },
      },
    ],
  };
}
