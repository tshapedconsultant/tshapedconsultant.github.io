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
  "ai-runtime-risk-check",
  "privacy",
  "es",
  "es/whitepaper",
  "es/hybrid-profiles",
  "es/agentic-ai-montesquieu",
  "es/governance/eu-ai-act-mapping",
  "es/ai-runtime-risk-check",
  "es/privacy",
];

const ORIGIN = "https://tshapedconsultant.com";

const NOSCRIPT_ES = `<noscript>
      <main>
        <p>Andrés Lage Freire · Madrid · EMEA en remoto</p>
        <h1>Gobernanza ejecutable para sistemas de IA que pueden acceder, decidir y actuar.</h1>
        <p>Ingeniería de Gobernanza de IA</p>
        <p>
          Diseño controles técnicos, límites de runtime y evidencia verificable para RAG,
          copilotos, agentes y workflows de alto impacto.
        </p>
        <p>Para CISOs, CTOs, responsables de riesgo y equipos que llevan IA de piloto a producción.</p>
        <section id="why">
          <h2>Tu sistema puede estar gobernado sobre el papel y seguir siendo vulnerable en ejecución.</h2>
          <ul>
            <li><strong>Acceso:</strong> Qué puede leer o recuperar el sistema (RAG, permisos, prompt injection).</li>
            <li><strong>Autoridad:</strong> Qué puede invocar o modificar (allowlist de herramientas, HITL, fail-safe).</li>
            <li><strong>Evidencia:</strong> Qué puedes reconstruir y demostrar después (trazas de decisión, logs SHA-256).</li>
          </ul>
          <p><strong>¿Qué te trae aquí?</strong> [Estoy evaluando mi sistema] · [Quiero formar a mi equipo] · [Busco un partner técnico] · [Quiero explorar co-delivery]</p>
        </section>
        <section id="risk-check">
          <h2>AI Runtime Risk Check (90 segundos)</h2>
          <p>Ejemplo de resultado — Riesgo detectado: autonomía sin compuerta independiente.</p>
          <p><a href="/es/ai-runtime-risk-check/">Comprobar mi riesgo (/es/ai-runtime-risk-check/)</a></p>
        </section>
        <section id="hr-copilot-case">
          <h2>HR Copilot — Implementación Técnica de Gobernanza (TGI v1)</h2>
          <p>Mismo modelo. Mismas peticiones. Dos posturas de riesgo: Acto I (sin gobernanza) frente a Acto II (8 controles deterministas en runtime). Cero hallazgos sensibles en el conjunto de pruebas de esta demostración.</p>
        </section>
        <section id="services">
          <h2>Jerarquía de servicios y orientación de precios</h2>
          <ol>
            <li><strong>AI Runtime Risk Check</strong> — Gratis · 90 segundos</li>
            <li><strong>AI Governance Snapshot</strong> — Desde €2.495 · Revisión técnica acotada en 1 semana</li>
            <li><strong>Workshop / Hackathon In-Company («Del PDF Legal al Código»)</strong> — €1.200–€3.000</li>
            <li><strong>AI Governance Blueprint</strong> — Desde €6.500 · Diseño de arquitectura de control</li>
            <li><strong>Runtime Assurance / Arquitecto Fraccional</strong> — Implementación por sprints según alcance</li>
            <li><strong>Partner / Co-delivery / White-label</strong> — Entrega técnica para despachos, Big 4 y consultoras</li>
          </ol>
        </section>
        <p>
          <a href="https://www.lavozdegalicia.es/noticia/educacion/2018/03/15/alumnos-fp-unen-empresas-estudiantes-resolver-retos/0003_201803H15C6991.htm">Premio al Emprendimiento de la Fundación Repsol, 2018</a>
          ·
          <a href="/bbva-platform-ai-strategy-case-study.pdf">Caso: estrategia de plataforma e IA de BBVA</a>
          ·
          <a href="/responsible-ai-resume-job-matching.pdf">Marco: IA responsable para emparejar currículum y puesto</a>
          ·
          <a href="/Gobernanza-Determinista-IA.pdf">Gobernanza determinista para IA probabilística (PDF)</a>
          ·
          <a href="/Dedalo-Executive-Brief.pdf">Dédalo™ Executive Brief (PDF)</a>
        </p>
        <nav>
          <ul>
            <li><a href="/es/ai-runtime-risk-check/">Comprobar mi riesgo (AI Runtime Risk Check)</a></li>
            <li><a href="/es/#diagnostic">Solicitar AI Governance Snapshot</a></li>
            <li><a href="/es/#hr-copilot-case">Ver la demo técnica (HR Copilot TGI v1)</a></li>
            <li><a href="/es/#enablement">Workshop In-Company: Del PDF Legal al Código</a></li>
            <li><a href="/es/#services">Servicios y precios</a></li>
            <li><a href="/es/#dgom">Modelo operativo DGOM™</a></li>
            <li><a href="/es/#partners">Explorar co-delivery (Despachos y firmas asesoras)</a></li>
            <li><a href="/es/governance/eu-ai-act-mapping/">Mapeo del EU AI Act</a></li>
            <li><a href="/es/whitepaper/">Whitepaper</a></li>
            <li><a href="/es/hybrid-profiles/">Perfiles híbridos</a></li>
            <li><a href="/es/agentic-ai-montesquieu/">IA agéntica y Montesquieu</a></li>
            <li><a href="/es/privacy/">Política de privacidad</a></li>
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
