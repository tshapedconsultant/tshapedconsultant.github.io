export const WHITEPAPER_PATH = "/whitepaper";
export const HYBRID_PROFILES_PATH = "/hybrid-profiles";
export const MONTEQUIEU_PATH = "/agentic-ai-montesquieu";
export const EU_AI_ACT_MAPPING_PATH = "/governance/eu-ai-act-mapping";
export const ES_PREFIX = "/es";

export type Locale = "en" | "es";

/** Nested folders that receive a copy of index.html so GitHub Pages serves the SPA. */
export const SPA_FALLBACK_DIRS = [
  WHITEPAPER_PATH,
  HYBRID_PROFILES_PATH,
  MONTEQUIEU_PATH,
  EU_AI_ACT_MAPPING_PATH,
  ES_PREFIX,
  `${ES_PREFIX}${WHITEPAPER_PATH}`,
  `${ES_PREFIX}${HYBRID_PROFILES_PATH}`,
  `${ES_PREFIX}${MONTEQUIEU_PATH}`,
  `${ES_PREFIX}${EU_AI_ACT_MAPPING_PATH}`,
] as const;

export function normalisePath(pathname: string): string {
  return pathname.replace(/\/+$/, "") || "/";
}

export function localeFromPath(pathname: string): Locale {
  const p = normalisePath(pathname);
  if (p === ES_PREFIX || p.startsWith(`${ES_PREFIX}/`)) return "es";
  return "en";
}

export function stripLocale(pathname: string): string {
  const p = normalisePath(pathname);
  if (p === ES_PREFIX) return "/";
  if (p.startsWith(`${ES_PREFIX}/`)) return p.slice(ES_PREFIX.length) || "/";
  return p;
}

export function withLocale(pathname: string, locale: Locale): string {
  const p = normalisePath(pathname);
  if (locale !== "es") return p;
  if (p === "/") return ES_PREFIX;
  return `${ES_PREFIX}${p}`;
}

export function homePath(locale: Locale): string {
  return locale === "es" ? ES_PREFIX : "/";
}

/** Prefix internal site hrefs with `/es` when the Spanish locale is active. */
export function localizeHref(href: string, locale: Locale): string {
  if (locale !== "es" || typeof href !== "string") return href;
  if (href.startsWith("/#")) return `${ES_PREFIX}${href.slice(1)}`;
  if (href.startsWith("/") && !href.startsWith("//")) return `${ES_PREFIX}${href}`;
  return href;
}

export function switchLocalePath(pathname: string, hash: string, target: Locale): string {
  const next = withLocale(stripLocale(pathname), target);
  if (!hash || hash === "#") return next;
  return `${next}${hash.startsWith("#") ? hash : `#${hash}`}`;
}

export function isEuAiActMappingPath(pathname: string): boolean {
  return stripLocale(pathname) === EU_AI_ACT_MAPPING_PATH;
}

export function isEuAiActMappingHash(hash: string): boolean {
  const raw = hash.replace(/^#/, "").replace(/^\/+/, "").replace(/\/+$/, "");
  return raw === "governance/eu-ai-act-mapping";
}

export function isWhitepaperPath(pathname: string): boolean {
  return stripLocale(pathname) === WHITEPAPER_PATH;
}

export function isHybridProfilesPath(pathname: string): boolean {
  return stripLocale(pathname) === HYBRID_PROFILES_PATH;
}

export function isMontesquieuPath(pathname: string): boolean {
  return stripLocale(pathname) === MONTEQUIEU_PATH;
}

/** Map legacy homepage hashes to path routes. Whitepaper section hashes (#s00) stay on /whitepaper. */
export function hashToPathRoute(hash: string): { pathname: string; hash: string } | null {
  const raw = hash.replace(/^#/, "");
  if (!raw) return null;
  if (isEuAiActMappingHash(`#${raw}`)) {
    return { pathname: EU_AI_ACT_MAPPING_PATH, hash: "" };
  }
  if (raw === "whitepaper") {
    return { pathname: WHITEPAPER_PATH, hash: "" };
  }
  if (/^s\d{2}$/.test(raw)) {
    return { pathname: WHITEPAPER_PATH, hash: `#${raw}` };
  }
  if (raw === "hybrid-profiles") {
    return { pathname: HYBRID_PROFILES_PATH, hash: "" };
  }
  if (raw === "agentic-ai-montesquieu") {
    return { pathname: MONTEQUIEU_PATH, hash: "" };
  }
  return null;
}
