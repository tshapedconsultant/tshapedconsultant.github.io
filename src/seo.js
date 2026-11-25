import {
  DEDALO_PATH,
  DUAL_KEY_PATH,
  EU_AI_ACT_MAPPING_PATH,
  HYBRID_PROFILES_PATH,
  MONTEQUIEU_PATH,
  PRIVACY_PATH,
  RISK_CHECK_PATH,
  WHITEPAPER_PATH,
  homePath,
  localeFromPath,
  stripLocale,
  withLocale,
} from "./routes.ts";
import { ARTICLE, HYBRID_ARTICLE } from "./content.js";
import { pulseByPath } from "./data/pulseLibrary.ts";
import { ARTICLE as ARTICLE_ES, HYBRID_ARTICLE as HYBRID_ARTICLE_ES } from "./content.es.js";

export const ORIGIN = "https://tshapedconsultant.com";

export const HOME_TITLE =
  "Executable AI Governance for Agentic and Regulated Systems | TShaped Consultant";

export const HOME_TITLE_ES =
  "Gobernanza ejecutable para sistemas de IA | TShaped Consultant";

export const HOME_DESCRIPTION =
  "AI Governance Engineering for organisations deploying RAG, copilots and agentic systems. Assess whether your AI system can access, decide or act without sufficient controls.";

export const HOME_DESCRIPTION_ES =
  "Diseño controles técnicos, límites de runtime y evidencia verificable para RAG, copilotos, agentes y sistemas de IA de alto impacto. Comprueba el riesgo de tu sistema en 90 segundos.";

export const HOME_OG_TITLE_ES =
  "Gobernanza ejecutable para sistemas de IA que pueden acceder, decidir y actuar";

export const HOME_OG_DESCRIPTION_ES =
  "De políticas en papel a controles técnicos, supervisión en ejecución y evidencia lista para auditoría.";

export const PAGE_SEO = {
  "/": {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    ogTitle: "Can your AI system act without an independent control gate?",
    ogDescription:
      "Take a 90-second AI Runtime Risk Check to detect gaps in access, authority and evidence.",
  },
  [RISK_CHECK_PATH]: {
    title: "AI Runtime Risk Check | TShaped Consultant",
    description:
      "Discover in 90 seconds whether your AI system can access, decide or act without a sufficient runtime control gate. 6 questions for RAG, copilots, agents and workflows.",
    ogTitle: "Can your AI system act without an independent control gate?",
    ogDescription:
      "Take a 90-second AI Runtime Risk Check to detect gaps in access, authority and evidence.",
  },
  [PRIVACY_PATH]: {
    title: "Privacy and Data Retention Policy | TShaped Consultant",
    description:
      "Minimal, transparent data handling for the AI Runtime Risk Check and commercial enquiries at tshapedconsultant.com.",
  },
  [WHITEPAPER_PATH]: {
    title: "Probabilistic Models Require Deterministic Governance | tshapedconsultant",
    description:
      "Unified Edition v5.4 (23 pages): Dédalo™, DGOM™ and the Dual-Key Protocol. The illustrative policy is checked with OPA 1.22.4. Reference architectures are not production deployments.",
  },
  [HYBRID_PROFILES_PATH]: {
    title: `${HYBRID_ARTICLE.title} | tshapedconsultant`,
    description: HYBRID_ARTICLE.excerpt,
  },
  [MONTEQUIEU_PATH]: {
    title: `${ARTICLE.title} | tshapedconsultant`,
    description: ARTICLE.excerpt,
  },
  [DEDALO_PATH]: {
    title: "Dédalo™ | Workflow, decision rights and runtime controls",
    description:
      "A short governance frame for AI workflow redesign: decision rights, review capacity and executable controls. Anthropic’s Working with AI study is directional, not a measure of return.",
  },
  [DUAL_KEY_PATH]: {
    title: "Dual-Key Protocol | Separate AI recommendations from execution authority",
    description:
      "Find where agents can change systems or commit actions without an independent authorization gate. The AI Governance Snapshot is a one-week technical review, not a certification.",
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
    ogTitle: HOME_OG_TITLE_ES,
    ogDescription: HOME_OG_DESCRIPTION_ES,
  },
  [RISK_CHECK_PATH]: {
    title: "AI Runtime Risk Check | TShaped Consultant",
    description:
      "Descubre en 90 segundos si tu sistema de IA puede acceder, decidir o actuar sin una compuerta de control suficiente. 6 preguntas para RAG, copilotos, agentes y workflows.",
    ogTitle: HOME_OG_TITLE_ES,
    ogDescription: HOME_OG_DESCRIPTION_ES,
  },
  [PRIVACY_PATH]: {
    title: "Política de privacidad y retención | TShaped Consultant",
    description:
      "Tratamiento de datos mínimo, base legal y política de retención para el AI Runtime Risk Check y las consultas técnicas en tshapedconsultant.com.",
  },
  [WHITEPAPER_PATH]: {
    title: "Los modelos probabilísticos requieren gobernanza determinista | tshapedconsultant",
    description:
      "El ensayo en castellano es la edición del 16 de noviembre de 2026 (30 páginas). La edición unificada en castellano no está publicada. El Executive Brief es un resumen aparte de dos páginas.",
  },
  [HYBRID_PROFILES_PATH]: {
    title: `${HYBRID_ARTICLE_ES.title} | tshapedconsultant`,
    description:
      "Ensayo sobre perfiles híbridos y agentes de IA: fundamentos, forma en T y juicio entre dominios. Gobernanza de IA cuando la ejecución especializada se abarata.",
  },
  [MONTEQUIEU_PATH]: {
    title: `${ARTICLE_ES.title} | tshapedconsultant`,
    description:
      "IA agéntica y separación de poderes: Runtime Checks & Balances, art. 14 del EU AI Act y DORA. Gobernanza de IA para agentes autónomos con supervisión independiente.",
  },
  [DEDALO_PATH]: {
    title: "Dédalo™ | Flujo de trabajo, autoridad de decisión y controles en ejecución",
    description:
      "Marco breve para rediseñar el trabajo con IA: quién decide, quién revisa y qué control se ejecuta. El estudio Working with AI, de Anthropic, es orientativo y no mide el retorno.",
  },
  [DUAL_KEY_PATH]: {
    title: "Protocolo Dual-Key | Separa las recomendaciones de la IA de la autoridad de ejecución",
    description:
      "Localiza dónde un agente puede cambiar sistemas o ejecutar acciones sin un control de autorización independiente. El AI Governance Snapshot es una revisión técnica de una semana, no una certificación.",
  },
  [EU_AI_ACT_MAPPING_PATH]: {
    title: "Mapeo del EU AI Act | gobernanza de IA y cumplimiento | tshapedconsultant",
    description:
      "Mapeo del EU AI Act a controles ejecutables y evidencia con hash. Gobernanza de IA, ISO 42001, cumplimiento y sistemas de alto riesgo — para CTOs y líderes de Riesgo.",
  },
};

export function pageSeoFor(pathname) {
  const locale = localeFromPath(pathname);
  const path = stripLocale(pathname);
  const table = locale === "es" ? PAGE_SEO_ES : PAGE_SEO;
  const pulse = pulseByPath(pathname, locale);
  if (pulse) {
    return {
      title: `${pulse.title.replace(/\s+/g, " ").trim()} | tshapedconsultant`,
      description: pulse.excerpt,
    };
  }
  if (table[path]) return table[path];
  if (path !== "/") {
    return locale === "es"
      ? {
          title: "Página no encontrada | tshapedconsultant",
          description: "Esa dirección no corresponde a una página de este sitio. Gobernanza de IA, EU AI Act e ISO 42001 en tshapedconsultant.com.",
        }
      : {
          title: "Page not found | tshapedconsultant",
          description: "That address is not a page on this site. AI governance, EU AI Act and ISO 42001 at tshapedconsultant.com.",
        };
  }
  return table["/"];
}

export function absoluteUrl(pathname) {
  const p = pathname.replace(/\/+$/, "") || "/";
  if (p === "/") return `${ORIGIN}/`;
  if (p === "/es") return `${ORIGIN}/es/`;
  // GitHub Pages serves nested index.html as directories, so live URLs end with /.
  return `${ORIGIN}${p}/`;
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
      ? "Ingeniería de Gobernanza de IA | Arquitecto de IA responsable"
      : "AI Governance Engineering | Responsible AI Architect";
  const personDesc =
    locale === "es"
      ? "Ingeniería de gobernanza de IA. Diseña y gobierna DGOM™ y Dédalo™: controles ejecutables, compuertas de ciclo de vida y evidencia verificable para RAG, agentes y sistemas regulados."
      : "AI Governance Engineering. Designs and governs DGOM™ and Dédalo™: executable controls, lifecycle gates and verifiable evidence for RAG, agents and regulated systems.";
  const serviceName = locale === "es" ? "Ingeniería de Gobernanza de IA" : "AI Governance Engineering";
  const serviceDesc =
    locale === "es"
      ? "AI Runtime Risk Check, AI Governance Snapshot, Blueprint y aseguramiento en runtime para sistemas RAG, copilotos y agentes. No es asesoramiento jurídico ni certificación."
      : "AI Runtime Risk Check, AI Governance Snapshot, Blueprint and runtime assurance for RAG, copilots and agentic systems. Not legal advice or certification.";
  const practiceDesc =
    locale === "es"
      ? "Ingeniería de Gobernanza de IA para organizaciones que despliegan RAG y sistemas agénticos. Controles técnicos, límites de runtime y evidencia verificable."
      : "AI Governance Engineering for organisations deploying RAG and agentic systems. Technical controls, runtime limits and verifiable evidence.";
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
        headline: locale === "es" ? "Los modelos probabilísticos requieren gobernanza determinista" : paper.title.replace(" | tshapedconsultant", ""),
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
