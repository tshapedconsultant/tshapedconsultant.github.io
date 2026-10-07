import { PULSE_ARTICLES, type PulseArticle } from "./pulseArticles";

/** Most relevant to executable governance first; market notes and explainers last. */
const RELEVANCE: Record<PulseArticle["lang"], string[]> = {
  es: [
    "el-genio-la-jaula-y-la-gobernanza-de-la-ia-por-que-las-politicas-no-frenan-a-los",
    "gobernanza-vs-red-teaming-en-ia-el-error-que-debilita-a-la-mayoria-de-las-organi",
    "el-governance-flywheel-de-freno-burocratico-a-motor-de-la-ia-autonoma",
    "el-riesgo-asimetrico-de-la-ia-por-que-un-acierto-del-99-puede-destruir-el-100-de",
    "el-juego-ha-cambiado-por-completo-ya-no-protegemos-aplicaciones-protegemos-agent",
    "dedalo-icaro-y-la-verdadera-leccion-de-la-ia-responsable",
    "disenar-la-empresa-del-futuro",
    "kahneman-predijo-la-ia-agentica-sin-saberlo",
    "ensename-el-incentivo-y-te-mostrare-el-resultado",
    "no-mates-moscas-a-canonazos-si-una-tarea-se-puede-resolver-con-un-script-no-nece",
    "ia-agentica-y-montesquieu-por-que-los-sistemas-autonomos-necesitan-separacion-de",
    "tu-coche-ya-entiende-el-futuro-de-la-ia-y-tu-tambien-deberias",
    "mckinsey-acaba-de-invertir-su-modelo-manda-a-sus-socios-al-aula-a-aprender-ia-y-",
    "la-verdadera-brecha-en-la-era-de-la-ia-no-es-saber-hacer-prompts-es-como-delegas",
    "trabajar-con-inteligencia-artificial-es-como-montar-a-caballo-el-futuro-es-de-lo",
    "cuando-la-gramatica-se-volvio-matematica-la-intuicion-detras-de-los-transformers",
    "spacex-y-cursor-la-apuesta-de-60-000-millones-que-demuestra-que-la-estrategia-si",
    "el-tablero-completo-nvidia-no-quiere-controlar-solo-el-hardware-quiere-controlar",
  ],
  en: [
    "the-risk-equation-of-agentic-ai",
    "ai-governance-is-a-hypothesis-red-teaming-is-the-test",
    "the-origin-of-ai-governance-why-einstein-was-right-about-the-wrong-thing",
    "the-governance-flywheel-accelerating-the-path-to-autonomous-ai",
    "daedalus-icarus-and-the-lesson-of-responsible-ai",
    "the-governance-flywheel-how-trust-turns-into-innovation",
    "the-ai-doom-loop-when-speed-outruns-sense",
    "the-rise-of-the-autonomous-enterprise-why-agentic-ai-is-the-future-not-just-bett",
    "the-corporate-tightrope-walker-an-act-of-balance-between-innovation-and-complian",
    "your-ai-isn-t-reading-words-it-s-navigating-a-latent-space",
    "ai-s-coding-fluency-the-strategic-imperative-for-a-new-human-machine-operating-m",
    "why-hybrid-profiles-may-have-an-advantage-in-the-age-of-ai-agents",
    "the-future-of-learning-freedom-ai-and-the-end-of-traditional-education",
  ],
};

export function pulseInsights(lang: PulseArticle["lang"]) {
  const rank = new Map(RELEVANCE[lang].map((slug, index) => [slug, index]));
  return PULSE_ARTICLES.filter((article) => article.lang === lang)
    .slice()
    .sort((a, b) => (rank.get(a.slug) ?? 999) - (rank.get(b.slug) ?? 999))
    .map((article) => ({
    title: article.title.replace(/\s+/g, " ").trim(),
    text: article.excerpt,
    href: `/insights/${article.slug}`,
    icon: "scales",
    internal: true,
  }));
}

export function pulseByPath(pathname: string, lang: PulseArticle["lang"]) {
  const match = pathname.replace(/\/+$/, "").match(/\/insights\/([a-z0-9-]+)$/);
  if (!match) return undefined;
  return PULSE_ARTICLES.find((article) => article.slug === match[1] && article.lang === lang);
}
