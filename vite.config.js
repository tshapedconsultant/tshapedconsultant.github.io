import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { PAGE_SEO, PAGE_SEO_ES, pageSeoFor } from "./src/seo.js";
import { assertLocaleSwitch } from "./src/routes.ts";

assertLocaleSwitch();

/** GitHub Pages custom domain is served from `/`. Never use the repo-name base. */
const SPA_FALLBACK_DIRS = [
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
        <p>
          Mitigación de AI runtime risk y gobernanza de IA en tiempo de ejecución mediante
          controles de acceso, autoridad y evidencia.
        </p>
        <p>Para CISOs, CTOs, responsables de riesgo y equipos que llevan IA de piloto a producción.</p>
        <section id="why">
          <h2>Tu sistema puede estar gobernado sobre el papel y seguir siendo vulnerable en ejecución.</h2>
          <ul>
            <li><strong>Acceso:</strong> Qué puede leer o recuperar el sistema (RAG, permisos, prompt injection).</li>
            <li><strong>Autoridad:</strong> Qué puede invocar o modificar (allowlist de herramientas, HITL, fail-safe).</li>
            <li><strong>Evidencia:</strong> Qué puedes reconstruir y demostrar después (trazas de decisión, logs SHA-256).</li>
          </ul>
          <p><strong>¿Qué te trae aquí?</strong> [Comprobar el riesgo de mi sistema] · [Quiero formar a mi equipo] · [Busco un partner técnico] · [Quiero explorar co-delivery]</p>
        </section>
        <section id="risk-check">
          <h2>AI Runtime Risk Check (90 segundos)</h2>
          <p>Ejemplo de resultado — Riesgo detectado: autonomía sin compuerta independiente.</p>
          <p><a href="/es/ai-runtime-risk-check/">Comprobar el riesgo de mi sistema (/es/ai-runtime-risk-check/)</a></p>
        </section>
        <section id="hr-copilot-case">
          <h2>HR Copilot — Implementación Técnica de Gobernanza (TGI v1)</h2>
          <p>Mismo modelo. Mismas peticiones. Dos posturas de riesgo: Acto I (sin gobernanza) frente a Acto II (8 controles deterministas en runtime). La demostración no produjo hallazgos sensibles en el conjunto de pruebas utilizado.</p>
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
          <a href="/Gobernanza-Determinista-IA.pdf">Whitepaper en castellano, edición del 16 de noviembre de 2026 (PDF, 30 páginas)</a>
          ·
          <a href="/Dedalo-Executive-Brief.pdf">Dédalo™ Executive Brief (PDF, EN)</a>
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
            <li><a href="/es/governance/dual-key-protocol/">Protocolo Dual-Key</a></li>
            <li><a href="/es/dedalo/">Dédalo™</a></li>
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

const NOSCRIPT_WHITEPAPER_EN = `<noscript>
      <main>
        <h1>Probabilistic Models Require Deterministic Governance</h1>
        <p>Unified Edition v5.4, 23 pages. Dédalo™ is the governance architecture, DGOM™ is the operating model, and Dual-Key is the execution-authority pattern.</p>
        <p>The illustrative policy is policies/dualkey_illustrative.rego, checked with OPA 1.22.4. The verifier, authorization coordinator and PEP are described, not demonstrated end to end. HR Copilot is a documented demonstration. Sector reference architectures are not production deployments.</p>
        <p><a href="/Probabilistic-Models-Require-Deterministic-Governance.pdf">Download Unified Edition v5.4 (PDF, 23 pages)</a></p>
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
        <p><a href="/Probabilistic-Models-Require-Deterministic-Governance.pdf">Unified Edition v5.4 en inglés (PDF, 23 páginas)</a></p>
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
