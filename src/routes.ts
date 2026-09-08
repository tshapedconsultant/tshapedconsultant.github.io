export const WHITEPAPER_PATH = "/whitepaper";
export const HYBRID_PROFILES_PATH = "/hybrid-profiles";
export const MONTEQUIEU_PATH = "/agentic-ai-montesquieu";
export const EU_AI_ACT_MAPPING_PATH = "/governance/eu-ai-act-mapping";

/** Nested folders that receive a copy of index.html so GitHub Pages serves the SPA. */
export const SPA_FALLBACK_DIRS = [
  WHITEPAPER_PATH,
  HYBRID_PROFILES_PATH,
  MONTEQUIEU_PATH,
  EU_AI_ACT_MAPPING_PATH,
] as const;

export function normalisePath(pathname: string): string {
  return pathname.replace(/\/+$/, "") || "/";
}

export function isEuAiActMappingPath(pathname: string): boolean {
  return normalisePath(pathname) === EU_AI_ACT_MAPPING_PATH;
}

export function isEuAiActMappingHash(hash: string): boolean {
  const raw = hash.replace(/^#/, "").replace(/^\/+/, "").replace(/\/+$/, "");
  return raw === "governance/eu-ai-act-mapping";
}

export function isWhitepaperPath(pathname: string): boolean {
  return normalisePath(pathname) === WHITEPAPER_PATH;
}

export function isHybridProfilesPath(pathname: string): boolean {
  return normalisePath(pathname) === HYBRID_PROFILES_PATH;
}

export function isMontesquieuPath(pathname: string): boolean {
  return normalisePath(pathname) === MONTEQUIEU_PATH;
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
