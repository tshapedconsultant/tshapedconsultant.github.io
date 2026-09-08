import { ARTICLE, HYBRID_ARTICLE } from "./content.js";
import {
  EU_AI_ACT_MAPPING_PATH,
  HYBRID_PROFILES_PATH,
  MONTEQUIEU_PATH,
  WHITEPAPER_PATH,
  normalisePath,
} from "./routes";

export const HOME_TITLE =
  "Andres Lage – AI Governance & Responsible AI Architect | EU AI Act, ISO 42001";

export const PAGE_SEO = {
  "/": {
    title: HOME_TITLE,
  },
  [WHITEPAPER_PATH]: {
    title: "Probabilistic Models Require Deterministic Governance | tshapedconsultant",
  },
  [HYBRID_PROFILES_PATH]: {
    title: `${HYBRID_ARTICLE.title} | tshapedconsultant`,
  },
  [MONTEQUIEU_PATH]: {
    title: `${ARTICLE.title} | tshapedconsultant`,
  },
  [EU_AI_ACT_MAPPING_PATH]: {
    title: "EU AI Act mapping | tshapedconsultant",
  },
};

export function pageSeoFor(pathname) {
  const path = normalisePath(pathname);
  return PAGE_SEO[path] || PAGE_SEO["/"];
}
