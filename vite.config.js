import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";

function githubPagesSpaFallbacks() {
  return {
    name: "github-pages-spa-fallbacks",
    writeBundle() {
      const index = path.resolve("dist/index.html");
      if (!fs.existsSync(index)) return;
      fs.copyFileSync(index, path.resolve("dist/404.html"));
      const nested = path.resolve("dist/governance/eu-ai-act-mapping");
      fs.mkdirSync(nested, { recursive: true });
      fs.copyFileSync(index, path.join(nested, "index.html"));
    },
  };
}

export default defineConfig({
  plugins: [react(), githubPagesSpaFallbacks()],
  server: {
    port: 5174,
  },
});
