export const EU_AI_ACT_MAPPING_PATH = "/governance/eu-ai-act-mapping";

export function isEuAiActMappingPath(pathname: string): boolean {
  const normalised = pathname.replace(/\/+$/, "") || "/";
  return normalised === EU_AI_ACT_MAPPING_PATH;
}

export function isEuAiActMappingHash(hash: string): boolean {
  const raw = hash.replace(/^#/, "").replace(/^\/+/, "").replace(/\/+$/, "");
  return raw === "governance/eu-ai-act-mapping";
}
