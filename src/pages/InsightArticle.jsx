import { useLocation } from "react-router-dom";
import { pulseByPath } from "../data/pulseLibrary";
import { localeFromPath, withLocale } from "../routes";

function Block({ block }) {
  if (block.type === "hr") return <hr />;
  if (block.type === "h2") return <h2 dangerouslySetInnerHTML={{ __html: block.html }} />;
  if (block.type === "h3") return <h3 dangerouslySetInnerHTML={{ __html: block.html }} />;
  if (block.type === "blockquote") {
    return <blockquote dangerouslySetInnerHTML={{ __html: block.html }} />;
  }
  if (block.type === "ul" || block.type === "ol") {
    const Tag = block.type;
    return (
      <Tag>
        {block.items.map((item) => (
          <li key={item} dangerouslySetInnerHTML={{ __html: item }} />
        ))}
      </Tag>
    );
  }
  return <p dangerouslySetInnerHTML={{ __html: block.html }} />;
}

export default function InsightArticle() {
  const { pathname } = useLocation();
  const locale = localeFromPath(pathname);
  const article = pulseByPath(pathname, locale);
  if (!article) return null;
  const home = `${withLocale("/", locale)}#insights`;
  const published = article.published.slice(0, 10);

  return (
    <article className="paper article-page">
      <p className="paper-nav">
        <a href={home}>{locale === "es" ? "← Volver a ensayos" : "← Back to Insights"}</a>
      </p>
      <p className="paper-kicker">{locale === "es" ? "Ensayo" : "Essay"}</p>
      <h1>{article.title.replace(/\s+/g, " ").trim()}</h1>
      <p className="article-meta">
        {locale === "es" ? "Andrés Lage Freire" : "Andrés Lage Freire"}
        {published ? ` · ${published}` : ""}
      </p>
      {article.blocks.map((block, index) => (
        <Block key={index} block={block} />
      ))}
    </article>
  );
}
