import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { PAGE_SEO, PAGE_SEO_ES } from "./src/seo.js";
import { assertLocaleSwitch } from "./src/routes.ts";

assertLocaleSwitch();

/** GitHub Pages custom domain is served from `/`. Never use the repo-name base. */
const SPA_FALLBACK_DIRS = [
  "whitepaper",
  "hybrid-profiles",
  "agentic-ai-montesquieu",
  "governance/eu-ai-act-mapping",
  "es",
  "es/whitepaper",
  "es/hybrid-profiles",
  "es/agentic-ai-montesquieu",
  "es/governance/eu-ai-act-mapping",
];

const ORIGIN = "https://tshapedconsultant.com";

const NOSCRIPT_ES = `<noscript>
      <main>
        <p>Con sede en Madrid · Trabajo en remoto en EMEA</p>
        <h1>Andrés Lage Freire — Ingeniería de Gobernanza de IA</h1>
        <p>Arquitecto de IA responsable · De la regulación a la garantía en runtime</p>
        <p>
          Ingeniería de Gobernanza de IA: el diseño e implantación de controles, rendición de
          cuentas y evidencia a lo largo del ciclo de vida de la IA.
        </p>
        <p>
          Ayudo a las organizaciones a convertir el riesgo de IA, las obligaciones regulatorias y
          los requisitos de rendición de cuentas en controles ejecutables, compuertas de ciclo de
          vida y evidencia verificable.
        </p>
        <p>
          Para CTOs, responsables de IA y líderes de Riesgo/Cumplimiento en banca, seguros y
          energía. Trabajo típico: preparación para el EU AI Act, ISO/IEC 42001 y gobernanza de
          sistemas RAG y agentes.
        </p>
        <p>
          <a href="https://www.lavozdegalicia.es/noticia/educacion/2018/03/15/alumnos-fp-unen-empresas-estudiantes-resolver-retos/0003_201803H15C6991.htm">Premio al Emprendimiento de la Fundación Repsol, 2018</a>
          ·
          <a href="/bbva-platform-ai-strategy-case-study.pdf">Caso: estrategia de plataforma e IA de BBVA</a>
          ·
          <a href="/Gobernanza-Determinista-IA.pdf">Gobernanza determinista para IA probabilística (PDF)</a>
        </p>
        <nav>
          <ul>
            <li><a href="/es/#diagnostic">Diagnóstico de Gobernanza de IA</a></li>
            <li><a href="/es/governance/eu-ai-act-mapping/">Mapeo del EU AI Act</a></li>
            <li><a href="/es/whitepaper/">Whitepaper</a></li>
            <li><a href="/es/#case-studies">Casos</a></li>
            <li><a href="/es/hybrid-profiles/">Perfiles híbridos</a></li>
            <li><a href="/es/agentic-ai-montesquieu/">IA agéntica y Montesquieu</a></li>
            <li><a href="/es/#contact">Contacto</a></li>
            <li><a href="/llms.txt">Resumen en texto plano para modelos de lenguaje</a></li>
          </ul>
        </nav>
        <p>
          Contacto:
          <a href="mailto:andreslage@tshapedconsultant.com">andreslage@tshapedconsultant.com</a>
        </p>
      </main>
    </noscript>`;

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
  const meta = table[pagePath] || table["/"];
  let out = html;
  out = replaceAttr(out, /<html lang="[^"]*">/, `<html lang="${isEs ? "es" : "en-GB"}">`);
  out = replaceAttr(
    out,
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${canonical}" />`
  );
  out = replaceAttr(
    out,
    /<link rel="alternate" hreflang="en-GB" href="[^"]*" \/>/,
    `<link rel="alternate" hreflang="en-GB" href="${enUrl}" />`
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
    out = out.replace(/<noscript>[\s\S]*?<\/noscript>/, NOSCRIPT_ES);
  }
  if (meta) {
    const title = htmlAttr(meta.title);
    const description = htmlAttr(meta.description);
    out = replaceAttr(out, /<title>[^<]*<\/title>/, `<title>${title}</title>`);
    out = out.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/s,
      `<meta name="description" content="${description}" />`
    );
    out = out.replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${title}" />`
    );
    out = out.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/s,
      `<meta property="og:description" content="${description}" />`
    );
    out = out.replace(
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${title}" />`
    );
    out = out.replace(
      /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/s,
      `<meta name="twitter:description" content="${description}" />`
    );
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
