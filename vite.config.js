import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

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

const PAGE_HEAD = {
  "/": {
    en: {
      title: "Andres Lage – AI Governance &amp; Responsible AI Architect | EU AI Act, ISO 42001",
      description:
        "AI governance and Responsible AI architecture for regulated organisations. Andrés Lage Freire helps CTOs and Risk leaders implement EU AI Act and ISO 42001 controls across RAG systems, agents and high-accountability use cases.",
    },
    es: {
      title:
        "Andrés Lage – Ingeniería de Gobernanza de IA y arquitecto de IA responsable | EU AI Act, ISO 42001",
      description:
        "Ingeniería de gobernanza de IA y arquitectura de IA responsable para organizaciones reguladas. Andrés Lage Freire ayuda a CTOs y líderes de Riesgo a implantar controles del EU AI Act e ISO 42001 en sistemas RAG, agentes y casos de alta responsabilidad.",
    },
  },
  "/whitepaper": {
    en: {
      title: "Probabilistic Models Require Deterministic Governance | tshapedconsultant",
      description:
        "Why enterprise and agentic AI needs a constitutional architecture — independent runtime controls, the Deterministic Cage, and a separation of policy, execution and oversight.",
    },
    es: {
      title: "Modelos probabilísticos requieren gobernanza determinista | tshapedconsultant",
      description:
        "Por qué la IA empresarial necesita una arquitectura constitucional. Whitepaper en español: gobernanza determinista para modelos probabilísticos.",
    },
  },
  "/hybrid-profiles": {
    en: {
      title: "Why Hybrid Profiles May Have an Advantage in the Age of AI Agents | tshapedconsultant",
      description:
        "As AI agents make specialised execution cheaper, the advantage may shift toward people who can connect specialist capabilities, understand the underlying systems and exercise judgment across domains.",
    },
    es: {
      title: "Por qué los perfiles híbridos pueden tener ventaja en la era de los agentes de IA | tshapedconsultant",
      description:
        "A medida que los agentes de IA abaratan la ejecución especializada, la ventaja puede desplazarse hacia quienes conectan capacidades de especialista, entienden los sistemas de base y ejercen juicio entre dominios.",
    },
  },
  "/agentic-ai-montesquieu": {
    en: {
      title: "Agentic AI and Montesquieu: Why Autonomous Systems Need Separation of Powers | tshapedconsultant",
      description:
        "Agentic systems that reason, decide, execute and self-evaluate concentrate power in the model. Separation of powers — applied as Runtime Checks &amp; Balances — is the condition for EU AI Act Art. 14 and DORA.",
    },
    es: {
      title:
        "IA agéntica y Montesquieu: por qué los sistemas autónomos necesitan separación de poderes | tshapedconsultant",
      description:
        "Los sistemas agénticos que razonan, deciden, ejecutan y se autoevalúan concentran el poder en el modelo. La separación de poderes — aplicada como Runtime Checks &amp; Balances — es la condición del art. 14 del EU AI Act y de DORA.",
    },
  },
  "/governance/eu-ai-act-mapping": {
    en: {
      title: "EU AI Act mapping | tshapedconsultant",
      description:
        "Selected EU AI Act duties mapped to executable controls and hashed evidence packs — for CTOs, Heads of AI and Risk leaders.",
    },
    es: {
      title: "Mapeo del EU AI Act | tshapedconsultant",
      description:
        "Deberes seleccionados del EU AI Act mapeados a controles ejecutables y paquetes de evidencia con hash — para CTOs, responsables de IA y líderes de Riesgo.",
    },
  },
};

function pathsForDir(dir) {
  const isEs = dir === "es" || dir.startsWith("es/");
  const stripped = dir === "es" ? "/" : isEs ? `/${dir.slice("es/".length)}` : `/${dir}`;
  const enUrl = stripped === "/" ? `${ORIGIN}/` : `${ORIGIN}${stripped}`;
  const esUrl = stripped === "/" ? `${ORIGIN}/es/` : `${ORIGIN}/es${stripped}`;
  return { isEs, enUrl, esUrl, canonical: isEs ? esUrl : enUrl, pagePath: stripped };
}

function replaceAttr(html, pattern, replacement) {
  const next = html.replace(pattern, replacement);
  return next;
}

function patchFallbackHtml(html, dir) {
  const { isEs, enUrl, esUrl, canonical, pagePath } = pathsForDir(dir);
  const locale = isEs ? "es" : "en";
  const meta = PAGE_HEAD[pagePath]?.[locale];
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
  }
  if (meta) {
    out = replaceAttr(out, /<title>[^<]*<\/title>/, `<title>${meta.title}</title>`);
    out = out.replace(
      /<meta\s+name="description"\s+content="[^"]*"\s*\/>/s,
      `<meta name="description" content="${meta.description}" />`
    );
    out = out.replace(
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${meta.title}" />`
    );
    out = out.replace(
      /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/s,
      `<meta property="og:description" content="${meta.description}" />`
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
