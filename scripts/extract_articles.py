"""Extract LinkedIn article HTML into site data and flag truncated pieces."""

from __future__ import annotations

import json
import re
import unicodedata
from pathlib import Path

from bs4 import BeautifulSoup

SRC = Path(
    r"C:\Users\anlaf\Desktop\Dedalo\linkedin filter\linkedin info\Articles\Articles"
)
OUT = Path(__file__).resolve().parents[1] / "src" / "data" / "pulseArticles.ts"
SITEMAP = Path(__file__).resolve().parents[1] / "public" / "sitemap.xml"
SITEMAP_TXT = Path(__file__).resolve().parents[1] / "public" / "sitemap.txt"
ORIGIN = "https://tshapedconsultant.com"

ES_WORDS = {
    "el", "la", "los", "las", "un", "una", "que", "de", "en", "por", "para",
    "con", "del", "al", "es", "se", "no", "más", "como", "su", "sus", "lo",
    "esta", "este", "esto", "pero", "porque", "cuando", "también", "ya",
    "qué", "cómo", "sobre", "entre", "sin", "hay", "son", "está",
}
EN_WORDS = {
    "the", "and", "of", "to", "a", "in", "is", "for", "that", "with", "on",
    "as", "this", "it", "are", "be", "from", "or", "an", "we", "you", "not",
    "by", "at", "can", "its", "their", "our", "how", "why", "when",
}

ALLOWED = {"p", "h2", "h3", "blockquote", "ul", "ol", "hr", "li", "strong", "em", "a", "br"}


def slugify(title: str) -> str:
    text = unicodedata.normalize("NFKD", title)
    text = "".join(ch for ch in text if not unicodedata.combining(ch))
    text = text.lower()
    text = re.sub(r"[^a-z0-9]+", "-", text).strip("-")
    return text[:80] or "articulo"


def language(text: str) -> str:
    words = re.findall(r"[A-Za-zÁÉÍÓÚÜÑáéíóúüñ]+", text.lower())
    sample = words[:500]
    es = sum(1 for w in sample if w in ES_WORDS)
    en = sum(1 for w in sample if w in EN_WORDS)
    return "es" if es >= en else "en"


def clean_inline(node) -> str:
    parts: list[str] = []
    for child in node.children:
        name = getattr(child, "name", None)
        if name is None:
            parts.append(str(child))
        elif name in {"strong", "em", "b", "i"}:
            tag = "strong" if name in {"strong", "b"} else "em"
            parts.append(f"<{tag}>{clean_inline(child)}</{tag}>")
        elif name == "a":
            href = (child.get("href") or "").strip()
            label = clean_inline(child)
            if href.startswith("http://") or href.startswith("https://"):
                parts.append(f'<a href="{href}">{label}</a>')
            else:
                parts.append(label)
        elif name == "br":
            parts.append("<br>")
        else:
            parts.append(clean_inline(child))
    text = "".join(parts)
    text = re.sub(r"[ \t]+\n", "\n", text)
    text = re.sub(r"\n{3,}", "\n\n", text)
    return text.strip()


def blocks_from(div) -> list[dict]:
    blocks: list[dict] = []
    for el in div.find_all(["h2", "h3", "p", "blockquote", "ul", "ol", "hr"], recursive=False):
        if el.name == "hr":
            blocks.append({"type": "hr"})
            continue
        if el.name in {"ul", "ol"}:
            items = []
            for li in el.find_all("li", recursive=False):
                item = clean_inline(li)
                if item:
                    items.append(item)
            if items:
                blocks.append({"type": el.name, "items": items})
            continue
        if el.name == "blockquote":
            html = clean_inline(el)
            if html:
                blocks.append({"type": "blockquote", "html": html})
            continue
        html = clean_inline(el)
        if not html:
            continue
        blocks.append({"type": el.name, "html": html})
    if blocks:
        return blocks
    html = clean_inline(div)
    if html:
        blocks.append({"type": "p", "html": html})
    return blocks


def plain(blocks: list[dict]) -> str:
    chunks = []
    for block in blocks:
        if block["type"] in {"ul", "ol"}:
            chunks.extend(block["items"])
        elif block["type"] != "hr":
            chunks.append(re.sub(r"<[^>]+>", "", block.get("html", "")))
    return "\n".join(chunks).strip()


def truncated(text: str, html: str) -> str | None:
    if "</html>" not in html.lower():
        return "missing closing html"
    if len(text) < 400:
        return "body shorter than 400 characters"
    tail = text.rstrip()
    if re.search(r"(see more|ver más|\.\.\.\s*$|…\s*$)", tail, re.I):
        return "ends with a continuation marker"
    if not re.search(r"[.!?»\"”)\]]\s*$", tail):
        return "does not end on a complete sentence"
    return None


def _excerpt(text: str) -> str:
    flat = re.sub(r"\s+", " ", text).strip()
    if len(flat) <= 200:
        return flat
    return flat[:200].rsplit(" ", 1)[0].rstrip(".,;:") + "…"


def _write_sitemaps(articles: list[dict]) -> None:
    xml = SITEMAP.read_text(encoding="utf-8")
    txt_lines = SITEMAP_TXT.read_text(encoding="utf-8").splitlines()
    existing = set(txt_lines)
    additions = []
    for article in articles:
        prefix = "/es" if article["lang"] == "es" else ""
        url = f"{ORIGIN}{prefix}/insights/{article['slug']}/"
        if url not in existing:
            additions.append(url)
            existing.add(url)
    if not additions:
        return
    block = "".join(
        f"  <url>\n    <loc>{url}</loc>\n    <lastmod>2026-10-07</lastmod>\n  </url>\n" for url in additions
    )
    if "</urlset>" not in xml:
        raise SystemExit("sitemap.xml has no urlset close tag")
    SITEMAP.write_text(xml.replace("</urlset>", block + "</urlset>"), encoding="utf-8")
    SITEMAP_TXT.write_text("\n".join(txt_lines + additions) + "\n", encoding="utf-8")


def main() -> None:
    articles = []
    report = []
    for path in sorted(SRC.glob("*.html")):
        raw = path.read_text(encoding="utf-8", errors="replace")
        soup = BeautifulSoup(raw, "html.parser")
        h1 = soup.find("h1")
        title = h1.get_text(" ", strip=True) if h1 else path.stem
        published = ""
        pub = soup.find("p", class_="published")
        if pub:
            published = pub.get_text(" ", strip=True).replace("Published on ", "")
        div = soup.find("div")
        blocks = blocks_from(div) if div else []
        text = plain(blocks)
        lang = language(text or title)
        reason = truncated(text, raw)
        if len(text) < 1000:
            reason = reason or "body shorter than 1000 characters"
            report.append(
                {
                    "file": path.name,
                    "title": title,
                    "lang": lang,
                    "chars": len(text),
                    "blocks": len(blocks),
                    "truncated": reason,
                    "ending": text[-80:].replace("\n", " "),
                    "skipped": True,
                }
            )
            continue
        slug = slugify(title)
        item = {
            "slug": slug,
            "title": title,
            "lang": lang,
            "published": published,
            "source": path.name,
            "blocks": blocks,
            "excerpt": _excerpt(text),
        }
        articles.append(item)
        report.append(
            {
                "file": path.name,
                "title": title,
                "lang": lang,
                "chars": len(text),
                "blocks": len(blocks),
                "truncated": reason,
                "ending": text[-80:].replace("\n", " "),
            }
        )
    # Drop shorter duplicates of the same language and slug.
    best: dict[tuple[str, str], dict] = {}
    for item in articles:
        key = (item["lang"], item["slug"])
        prev = best.get(key)
        if prev is None or len(json.dumps(item["blocks"])) > len(json.dumps(prev["blocks"])):
            best[key] = item
    kept = list(best.values())
    kept.sort(key=lambda a: (a["lang"], a["published"], a["title"]))
    published = []
    for article in kept:
        published.append({key: value for key, value in article.items() if key != "source"})
    OUT.parent.mkdir(parents=True, exist_ok=True)
    payload = json.dumps(published, ensure_ascii=False, indent=2)
    OUT.write_text(
        "export type PulseBlock =\n"
        "  | { type: \"hr\" }\n"
        "  | { type: \"ul\" | \"ol\"; items: string[] }\n"
        "  | { type: \"p\" | \"h2\" | \"h3\" | \"blockquote\"; html: string };\n\n"
        "export type PulseArticle = {\n"
        "  slug: string;\n"
        "  title: string;\n"
        "  lang: \"es\" | \"en\";\n"
        "  published: string;\n"
        "  excerpt: string;\n"
        "  blocks: PulseBlock[];\n"
        "};\n\n"
        f"export const PULSE_ARTICLES: PulseArticle[] = {payload};\n",
        encoding="utf-8",
    )
    _write_sitemaps(published)
    report_path = Path(__file__).resolve().parent / "article-report.json"
    report_path.write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding="utf-8")
    cut = [row for row in report if row["truncated"]]
    print(f"KEPT {len(kept)} of {len(articles)}; flagged {len(cut)}")
    for row in cut:
        print(f"- {row['lang']} {row['title']}: {row['truncated']}")


if __name__ == "__main__":
    main()
