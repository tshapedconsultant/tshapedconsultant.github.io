import { PULSE_ARTICLES, type PulseArticle } from "./pulseArticles";

export function pulseInsights(lang: PulseArticle["lang"]) {
  return PULSE_ARTICLES.filter((article) => article.lang === lang).map((article) => ({
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
