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

function patchSpanishHtml(html, dir) {
  const pagePath = dir === "es" ? "/es/" : `/${dir}`;
  const canonical = `https://tshapedconsultant.com${pagePath}`;
  return html
    .replace('lang="en-GB"', 'lang="es"')
    .replace(
      '<link rel="canonical" href="https://tshapedconsultant.com/" />',
      `<link rel="canonical" href="${canonical}" />`
    )
    .replace(
      '<meta property="og:url" content="https://tshapedconsultant.com/" />',
      `<meta property="og:url" content="${canonical}" />`
    )
    .replace(
      '<meta property="og:locale" content="en_GB" />',
      '<meta property="og:locale" content="es_ES" />\n    <meta property="og:locale:alternate" content="en_GB" />'
    );
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
        const out = dir === "es" || dir.startsWith("es/") ? patchSpanishHtml(html, dir) : html;
        fs.writeFileSync(path.join(nested, "index.html"), out);
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
