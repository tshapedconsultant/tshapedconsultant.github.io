import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { PAGE_SEO, PAGE_SEO_ES, pageSeoFor, jsonLdForPath } from "./src/seo.js";
import { PULSE_ARTICLES } from "./src/data/pulseArticles.ts";
import { FLAGSHIP_ARTICLES } from "./src/data/flagshipArticles.ts";
import crypto from "node:crypto";
import { WHITEPAPER_PUBLICATION, publishedFileHref } from "./src/data/whitepaperPublication.js";
import { assertLocaleSwitch } from "./src/routes.ts";

assertLocaleSwitch();

/** GitHub Pages custom domain is served from `/`. Never use the repo-name base. */
const CORE_FALLBACK_DIRS = [
  "whitepaper",
  "hybrid-profiles",
  "agentic-ai-montesquieu",
  "governance/eu-ai-act-mapping",
  "governance/dual-key-protocol",
  "dedalo",
  "insights/ai-value-workflow-redesign",
  "ai-runtime-risk-check",
  "privacy",
  "es",
  "es/whitepaper",
  "es/hybrid-profiles",
  "es/agentic-ai-montesquieu",
  "es/governance/eu-ai-act-mapping",
  "es/governance/dual-key-protocol",
  "es/dedalo",
  "es/insights/ai-value-workflow-redesign",
  "es/ai-runtime-risk-check",
  "es/privacy",
];

const SPA_FALLBACK_DIRS = [
  ...new Set([
    ...CORE_FALLBACK_DIRS,
    ...PULSE_ARTICLES.map((article) =>
      article.lang === "es" ? `es/insights/${article.slug}` : `insights/${article.slug}`
    ),
    ...FLAGSHIP_ARTICLES.map((article) =>
      article.lang === "es" ? `es/insights/${article.slug}` : `insights/${article.slug}`
    ),
  ]),
];

const CUSTOM_NOSCRIPT_DIRS = new Set([
  "es",
  "whitepaper",
  "es/whitepaper",
  "dedalo",
  "es/dedalo",
  "insights/ai-value-workflow-redesign",
  "es/insights/ai-value-workflow-redesign",
]);

const ORIGIN = "https://tshapedconsultant.com";
const UNIFIED_PDF = publishedFileHref(WHITEPAPER_PUBLICATION.en);

const NOSCRIPT_ES = `<noscript>
      <main>
        <p>Ingeniería de Gobernanza de IA · EU AI Act</p>
        <h1>Gobernanza ejecutable para sistemas de IA que pueden acceder, decidir y actuar.</h1>
        <p>Diseño controles técnicos, límites de runtime y evidencia verificable para RAG, copilotos, agentes y workflows de alto impacto.</p>
        <p>AI Governance Snapshot · Desde €2.495 · 1 semana</p>
        <p>
          <a href="/es/#risk-check">Comprobar el riesgo de mi sistema</a>
          ·
          <a href="/es/#hr-copilot-case">Ver la demo técnica</a>
        </p>
        <ul>
          <li>6 sistemas ejecutables — Planos de control abiertos y demos en vivo</li>
          <li>~30 % menos tiempo — Entrega cliente CRM multiagente gobernado (Coco Mind)</li>
          <li>Panel de 24 registros — Revisor independiente, Piloto de validación JRS (2026)</li>
          <li>Mentor y ponente — AImpacto Hackathon (MIL e IE), AI Safety Meetup</li>
        </ul>
        <section id="paths">
          <h2>¿Qué te trae aquí?</h2>
          <article>
            <h3>Comprador</h3>
            <p>Para CTOs, CISOs, Heads of AI, Risk y responsables de tecnología</p>
            <ul>
              <li>AI Runtime Risk Check</li>
              <li>AI Governance Snapshot</li>
              <li>Blueprint</li>
            </ul>
          </article>
          <article>
            <h3>Técnico</h3>
            <p>Para arquitectos, ingenieros y Red Team Leads</p>
            <ul>
              <li>HR Copilot</li>
              <li>Demo de controles</li>
              <li>Validación técnica</li>
            </ul>
          </article>
          <article>
            <h3>Partner</h3>
            <p>Para firmas legales, Big Four y consultoras</p>
            <ul>
              <li>Del PDF Legal al Código</li>
              <li>Workshop o Hackathon</li>
              <li>Co-delivery</li>
            </ul>
          </article>
        </section>
        <section id="risk-check">
          <h2>AI Runtime Risk Check</h2>
          <p>Seis preguntas, evaluadas en local en el navegador. Un resultado preliminar para RAG, copilotos, agentes y workflows automatizados. Ejemplo de resultado — Riesgo detectado: autonomía sin compuerta independiente.</p>
          <p>El trabajo convierte AI runtime risk en gobernanza de IA en tiempo de ejecución mediante controles de acceso, autoridad y evidencia.</p>
        </section>
        <section id="hr-copilot-case">
          <h2>Mismo modelo. Mismas peticiones. Dos posturas de riesgo.</h2>
          <p>HR Copilot — Acto I · Sin gobernanza frente a Acto II · Con TGI v1. La demostración no produjo hallazgos sensibles en el conjunto de pruebas utilizado.</p>
        </section>
        <nav>
          <ul>
            <li><a href="/es/#services">Servicios</a></li>
            <li><a href="/es/#hr-copilot-case">Demos</a></li>
            <li><a href="/es/#case-studies">Casos</a></li>
            <li><a href="/es/whitepaper/">Recursos</a></li>
            <li><a href="/es/#about">Sobre mí</a></li>
            <li><a href="/es/#risk-check">Comprobar mi riesgo</a></li>
            <li><a href="/" hreflang="en">EN</a></li>
          </ul>
        </nav>
        <p>
          Contacto:
          <a href="mailto:andreslage@tshapedconsultant.com">andreslage@tshapedconsultant.com</a>
        </p>
      </main>
    </noscript>`;

const NOSCRIPT_WHITEPAPER_EN = `<noscript>
      <main>
        <h1>Probabilistic Models Require Deterministic Governance</h1>
        <p>Unified Edition v5.4, 23 pages. Dédalo™ is the governance architecture, DGOM™ is the operating model, and Dual-Key is the execution-authority pattern.</p>
        <p>The illustrative policy is policies/dualkey_illustrative.rego, checked with OPA 1.22.4. The verifier, authorization coordinator and PEP are described, not demonstrated end to end. HR Copilot is a documented demonstration. Sector reference architectures are not production deployments.</p>
        <p><a href="${UNIFIED_PDF}">Download Unified Edition v5.4 (PDF, 23 pages)</a></p>
        <p><a href="/archive/Probabilistic-Models-Require-Deterministic-Governance-2026-11-16.pdf">Previous English PDF, 16 November 2026</a></p>
        <p><a href="/Dedalo-Executive-Brief.pdf">Dédalo™ Executive Brief, two pages, separate from the unified edition</a></p>
        <p>The essay on this page is the earlier long edition and can be read without an email. The Spanish unified edition is not published.</p>
      </main>
    </noscript>`;

const NOSCRIPT_WHITEPAPER_ES = `<noscript>
      <main>
        <h1>Los modelos probabilísticos requieren gobernanza determinista</h1>
        <p>La edición unificada en castellano no está publicada. El PDF en castellano es la edición del 16 de noviembre de 2026, 30 páginas. El ensayo de esta página es esa edición y se lee sin registro.</p>
        <p><a href="/Gobernanza-Determinista-IA.pdf">Descargar la edición en castellano del 16 de noviembre de 2026 (PDF, 30 páginas)</a></p>
        <p><a href="${UNIFIED_PDF}">Unified Edition v5.4 en inglés (PDF, 23 páginas)</a></p>
        <p><a href="/Dedalo-Executive-Brief.pdf">Dédalo™ Executive Brief, dos páginas, en inglés, distinto de la edición unificada</a></p>
      </main>
    </noscript>`;

const NOSCRIPT_DEDALO_EN = `<noscript>
      <main>
        <h1>Dédalo™</h1>
        <p>Redesign the workflow. Make decision authority explicit. Enforce the boundary at runtime. Anthropic’s Working with AI study is directional, not a measure of return, and it is not an endorsement.</p>
        <p><a href="https://www.anthropic.com/research/working-with-ai">Read the original research</a></p>
        <p><a href="/insights/ai-value-workflow-redesign/">Read the essay</a></p>
        <p><a href="/#diagnostic">Request an AI Governance Snapshot</a> — one week, one organisation, one system, from €2,495. Not a full organisational redesign.</p>
      </main>
    </noscript>`;

const NOSCRIPT_DEDALO_ES = `<noscript>
      <main>
        <h1>Dédalo™</h1>
        <p>Rediseña el flujo de trabajo. Haz explícita la autoridad de decisión. Haz cumplir el límite en ejecución. El estudio Working with AI, de Anthropic, es orientativo, no una medida del retorno, y no es un aval.</p>
        <p><a href="https://www.anthropic.com/research/working-with-ai">Leer el estudio original</a></p>
        <p><a href="/es/insights/ai-value-workflow-redesign/">Leer el ensayo</a></p>
        <p><a href="/es/#diagnostic">Solicitar AI Governance Snapshot</a>: una semana, una organización y un sistema, desde €2.495. No es un rediseño organizativo completo.</p>
      </main>
    </noscript>`;

const NOSCRIPT_WORKFLOW_EN = `<noscript>
      <main>
        <h1>Beyond task automation: governing AI-enabled workflow redesign</h1>
        <p>Anthropic’s Working with AI study, 23 November 2026, is based on 66 interviews with 58 customers. The findings are directional. This essay separates that research from a governance reading.</p>
        <p><a href="https://www.anthropic.com/research/working-with-ai">Original research</a> · <a href="/dedalo/">Dédalo™</a> · <a href="/#diagnostic">AI Governance Snapshot</a></p>
      </main>
    </noscript>`;

const NOSCRIPT_WORKFLOW_ES = `<noscript>
      <main>
        <h1>Más allá de automatizar tareas: gobernar el rediseño del trabajo con IA</h1>
        <p>El estudio Working with AI, de Anthropic, del 23 de noviembre de 2026, recoge 66 entrevistas en 58 empresas. Los hallazgos son orientativos. Este ensayo separa esa investigación de una lectura de gobernanza.</p>
        <p><a href="https://www.anthropic.com/research/working-with-ai">Estudio original</a> · <a href="/es/dedalo/">Dédalo™</a> · <a href="/es/#diagnostic">AI Governance Snapshot</a></p>
      </main>
    </noscript>`;

function flagshipForDir(dir) {
  const match = dir.match(/^(?:es\/)?insights\/([a-z0-9-]+)$/);
  if (!match) return undefined;
  const lang = dir.startsWith("es/") ? "es" : "en";
  return FLAGSHIP_ARTICLES.find((article) => article.slug === match[1] && article.lang === lang);
}

function renderFlagshipNoscript(article) {
  const body = article.blocks
    .map((block) => {
      if (block.type === "h2") return `<h2>${block.html}</h2>`;
      if (block.type === "h3") return `<h3>${block.html}</h3>`;
      if (block.type === "blockquote") return `<blockquote>${block.html}</blockquote>`;
      if (block.type === "figure") {
        const loading = block.priority ? ' fetchpriority="high"' : ' loading="lazy"';
        const caption = block.caption ? `<figcaption>${htmlAttr(block.caption)}</figcaption>` : "";
        return `<figure><img src="${htmlAttr(block.src)}" alt="${htmlAttr(block.alt)}" width="${block.width}" height="${block.height}"${loading} decoding="async">${caption}</figure>`;
      }
      if (block.type === "ul" || block.type === "ol") {
        const items = block.items.map((item) => `<li>${item}</li>`).join("");
        return `<${block.type}>${items}</${block.type}>`;
      }
      if (block.type === "hr") return "<hr />";
      return `<p>${block.html}</p>`;
    })
    .join("");
  return `<noscript><main><article><h1>${htmlAttr(article.title)}</h1>${body}</article></main></noscript>`;
}

function htmlAttr(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function pageUrl(pathname, locale) {
  if (pathname === "/") return locale === "es" ? `${ORIGIN}/es/` : `${ORIGIN}/`;
  return locale === "es" ? `${ORIGIN}/es${pathname}/` : `${ORIGIN}${pathname}/`;
}

function pathsForDir(dir) {
  const isEs = dir === "es" || dir.startsWith("es/");
  const stripped = dir === "es" ? "/" : isEs ? `/${dir.slice("es/".length)}` : `/${dir}`;
  const enUrl = pageUrl(stripped, "en");
  const esUrl = pageUrl(stripped, "es");
  return { isEs, enUrl, esUrl, canonical: isEs ? esUrl : enUrl, pagePath: stripped };
}

function replaceAttr(html, pattern, replacement) {
  return html.replace(pattern, replacement);
}

function patchFallbackHtml(html, dir) {
  const { isEs, enUrl, esUrl, canonical, pagePath } = pathsForDir(dir);
  const table = isEs ? PAGE_SEO_ES : PAGE_SEO;
  const requestPath = isEs ? (pagePath === "/" ? "/es" : `/es${pagePath}`) : pagePath;
  const meta = table[pagePath] || pageSeoFor(requestPath);
  let out = html;
  out = replaceAttr(out, /<html lang="[^"]*">/, `<html lang="${isEs ? "es" : "en-GB"}">`);
  out = replaceAttr(
    out,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${canonical}" />`
  );
  out = replaceAttr(
    out,
    /<link rel="alternate" hreflang="en" href="[^"]*" \/>/,
    `<link rel="alternate" hreflang="en" href="${enUrl}" />`
  );
  out = replaceAttr(
    out,
    /<link rel="alternate" hreflang="es" href="[^"]*" \/>/,
    `<link rel="alternate" hreflang="es" href="${esUrl}" />`
  );
  out = replaceAttr(
    out,
    /<link rel="alternate" hreflang="x-default" href="[^"]*" \/>/,
    `<link rel="alternate" hreflang="x-default" href="${enUrl}" />`
  );
  out = replaceAttr(
    out,
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${canonical}" />`
  );
  if (isEs) {
    out = replaceAttr(
      out,
      /<meta property="og:locale" content="[^"]*" \/>/,
      '<meta property="og:locale" content="es_ES" />'
    );
    out = replaceAttr(
      out,
      /<meta property="og:locale:alternate" content="[^"]*" \/>/,
      '<meta property="og:locale:alternate" content="en_GB" />'
    );
    if (dir === "es") out = out.replace(/<noscript>[\s\S]*?<\/noscript>/, NOSCRIPT_ES);
  }
  if (dir === "whitepaper") {
    out = out.replace(/<noscript>[\s\S]*?<\/noscript>/, NOSCRIPT_WHITEPAPER_EN);
  }
  if (dir === "es/whitepaper") {
    out = out.replace(/<noscript>[\s\S]*?<\/noscript>/, NOSCRIPT_WHITEPAPER_ES);
  }
  if (dir === "dedalo") {
    out = out.replace(/<noscript>[\s\S]*?<\/noscript>/, NOSCRIPT_DEDALO_EN);
  }
  if (dir === "es/dedalo") {
    out = out.replace(/<noscript>[\s\S]*?<\/noscript>/, NOSCRIPT_DEDALO_ES);
  }
  if (dir === "insights/ai-value-workflow-redesign") {
    out = out.replace(/<noscript>[\s\S]*?<\/noscript>/, NOSCRIPT_WORKFLOW_EN);
  }
  if (dir === "es/insights/ai-value-workflow-redesign") {
    out = out.replace(/<noscript>[\s\S]*?<\/noscript>/, NOSCRIPT_WORKFLOW_ES);
  }
  const flagship = flagshipForDir(dir);
  if (flagship) {
    out = out.replace(/<noscript>[\s\S]*?<\/noscript>/, renderFlagshipNoscript(flagship));
  }
  if (meta) {
    const title = htmlAttr(meta.title);
    const description = htmlAttr(meta.description);
    const ogTitle = htmlAttr(meta.ogTitle || meta.title);
    const ogDescription = htmlAttr(meta.ogDescription || meta.description);
    out = replaceAttr(out, /<title>[^<]*<\/title>/, `<title>${title}</title>`);
    out = out.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/s,
      `<meta name="description" content="${description}" />`
    );
    out = out.replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${ogTitle}" />`
    );
    out = out.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/s,
      `<meta property="og:description" content="${ogDescription}" />`
    );
    out = out.replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${ogTitle}" />`
    );
    out = out.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/s,
      `<meta name="twitter:description" content="${ogDescription}" />`
    );
    const ldBody = `\n${JSON.stringify(jsonLdForPath(requestPath))}\n`;
    const ldHash = crypto.createHash("sha256").update(ldBody, "utf8").digest("base64");
    out = out.replace(
      /<script type="application\/ld\+json">[\s\S]*?<\/script>/,
      `<script type="application/ld+json">${ldBody}</script>`
    );
    out = out.replace(/sha256-[A-Za-z0-9+/=]+/, `sha256-${ldHash}`);
    if (!CUSTOM_NOSCRIPT_DIRS.has(dir) && !flagship) {
      const pageTitle = htmlAttr(meta.title.replace(/\s+\|\s+.*$/, ""));
      out = out.replace(
        /<noscript>[\s\S]*?<\/noscript>/,
        `<noscript><main><h1>${pageTitle}</h1><p>${description}</p></main></noscript>`
      );
    }
  }
  return out;
}

function githubPagesSpaFallbacks() {
  return {
    name: "github-pages-spa-fallbacks",
    writeBundle() {
      const index = path.resolve("dist/index.html");
      if (!fs.existsSync(index)) return;
      const html = fs.readFileSync(index, "utf8");
      fs.copyFileSync(index, path.resolve("dist/404.html"));
      for (const dir of SPA_FALLBACK_DIRS) {
        const nested = path.resolve("dist", dir);
        fs.mkdirSync(nested, { recursive: true });
        fs.writeFileSync(path.join(nested, "index.html"), patchFallbackHtml(html, dir));
      }
    },
  };
}

export default defineConfig({
  base: "/",
  plugins: [react(), githubPagesSpaFallbacks()],
  server: {
    port: 5174,
  },
});
