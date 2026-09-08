import { jsonLdForLocale, pageSeoFor, absoluteUrl, alternateUrls } from "../seo.js";
import { localeFromPath } from "../routes";

function setMetaByName(name, content) {
  let el = document.head.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setMetaByProperty(property, content) {
  let el = document.head.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel, href, hreflang) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    if (hreflang) el.setAttribute("hreflang", hreflang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

export function applyDocumentHead(pathname) {
  const locale = localeFromPath(pathname);
  const seo = pageSeoFor(pathname);
  const canonical = absoluteUrl(pathname);
  const alts = alternateUrls(pathname);

  document.documentElement.lang = locale === "es" ? "es" : "en-GB";
  document.title = seo.title;
  setMetaByName("description", seo.description);
  setLink("canonical", canonical);
  setLink("alternate", alts.en, "en-GB");
  setLink("alternate", alts.es, "es");
  setLink("alternate", alts.en, "x-default");

  setMetaByProperty("og:url", canonical);
  setMetaByProperty("og:title", seo.title);
  setMetaByProperty("og:description", seo.description);
  setMetaByProperty("og:locale", locale === "es" ? "es_ES" : "en_GB");
  setMetaByProperty("og:locale:alternate", locale === "es" ? "en_GB" : "es_ES");
  setMetaByName("twitter:title", seo.title);
  setMetaByName("twitter:description", seo.description);

  const script = document.head.querySelector('script[type="application/ld+json"]');
  if (script) {
    script.textContent = JSON.stringify(jsonLdForLocale(locale));
  }
}
