import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import test from "node:test";

import { pulseByPath } from "../src/data/pulseLibrary.ts";
import { jsonLdForPath, pageSeoFor } from "../src/seo.js";
import {
  DETERMINISTIC_CAGE_PATH,
  INCENTIVE_PATH,
  RED_TEAM_PATH,
  switchLocalePath,
} from "../src/routes.ts";

const ORIGIN = "https://tshapedconsultant.com";

const PAIRS = [
  {
    path: DETERMINISTIC_CAGE_PATH,
    titleEn: "The Deterministic Cage: Runtime AI Governance | TShaped",
    titleEs: "La Jaula Determinista: gobernanza IA en ejecución | TShaped",
    descEn:
      "Why PDF policies cannot stop autonomous AI agents—and how a Deterministic Cage enforces runtime controls aligned with the EU AI Act (Art. 14) and DORA.",
    descEs:
      "Por qué las políticas en PDF no frenan a los agentes de IA y cómo aplicar una Jaula Determinista con controles en ejecución para el EU AI Act y DORA.",
    titleEnLen: 55,
    titleEsLen: 59,
    descEnLen: 151,
    descEsLen: 149,
  },
  {
    path: RED_TEAM_PATH,
    titleEn: "AI Governance Is a Hypothesis. Red Teaming Is the Test.",
    titleEs: "La gobernanza IA es una hipótesis; el Red Teaming, prueba",
    descEn:
      "Why compliance policies fail under adversarial pressure, how to close the Govern–Attack–Redesign loop, and 3 questions to audit your AI runtime controls.",
    descEs:
      "Por qué las políticas fallan ante ataques adversarios, cómo cerrar el ciclo Gobernar–Atacar–Rediseñar y 3 preguntas para auditar tus controles en IA.",
    titleEnLen: 55,
    titleEsLen: 57,
    descEnLen: 153,
    descEsLen: 149,
  },
  {
    path: INCENTIVE_PATH,
    titleEn: "Show Me the Incentive: Reward Hacking & Runtime Control",
    titleEs: "Incentivos, Ley de Goodhart y reward hacking en IA",
    descEn:
      "How Goodhart's Law and reward hacking distort enterprise AI deployments—and why Mechanism Design requires Layer 3 runtime controls outside the model.",
    descEs:
      "Cómo la Ley de Goodhart y el reward hacking rompen despliegues de IA, y por qué el diseño de mecanismos exige controles en Capa 3 (Runtime).",
    titleEnLen: 55,
    titleEsLen: 50,
    descEnLen: 149,
    descEsLen: 140,
  },
];

const sitemap = fs.readFileSync("public/sitemap.xml", "utf8");
const llms = fs.readFileSync("public/llms.txt", "utf8");

test("flagship insights keep one slug, exact metadata and a paired language switch", () => {
  for (const pair of PAIRS) {
    const en = pulseByPath(pair.path, "en");
    const es = pulseByPath(`/es${pair.path}`, "es");
    assert.ok(en);
    assert.ok(es);
    assert.equal(en.slug, es.slug);
    assert.equal(pageSeoFor(pair.path).title, pair.titleEn);
    assert.equal(pageSeoFor(`/es${pair.path}`).title, pair.titleEs);
    assert.equal(pageSeoFor(pair.path).description, pair.descEn);
    assert.equal(pageSeoFor(`/es${pair.path}`).description, pair.descEs);
    assert.equal(pair.titleEn.length, pair.titleEnLen);
    assert.equal(pair.titleEs.length, pair.titleEsLen);
    assert.equal(pair.descEn.length, pair.descEnLen);
    assert.equal(pair.descEs.length, pair.descEsLen);
    assert.equal(switchLocalePath(pair.path, "", "es"), `/es${pair.path}`);
    assert.equal(switchLocalePath(`/es${pair.path}`, "", "en"), pair.path);
    assert.equal(en.blocks.some((block) => block.type === "h2"), true);
    assert.equal(en.blocks.some((block) => block.type === "h1"), false);
    const enCta = en.blocks.find((block) => block.type === "blockquote");
    const esCta = es.blocks.find((block) => block.type === "blockquote");
    assert.match(enCta.html, /href="\/ai-runtime-risk-check"/);
    assert.match(enCta.html, /href="\/#hr-copilot-case"/);
    assert.match(esCta.html, /href="\/es\/ai-runtime-risk-check"/);
    assert.match(esCta.html, /href="\/es\/#hr-copilot-case"/);
    assert.equal(enCta.html.includes("/es/"), false);
  }
});

test("flagship sitemap pairs and llms.txt name both languages", () => {
  for (const pair of PAIRS) {
    const en = `${ORIGIN}${pair.path}/`;
    const es = `${ORIGIN}/es${pair.path}/`;
    assert.ok(sitemap.includes(`<loc>${en}</loc>`), en);
    assert.ok(sitemap.includes(`<loc>${es}</loc>`), es);
    assert.ok(sitemap.includes(`hreflang="en" href="${en}"`));
    assert.ok(sitemap.includes(`hreflang="es" href="${es}"`));
    assert.ok(sitemap.includes(`hreflang="x-default" href="${en}"`));
    assert.ok(llms.includes(en));
    assert.ok(llms.includes(es));
  }
  assert.equal(sitemap.includes('hreflang="en-GB"'), false);
});

test("flagship JSON-LD is a BlogPosting by Andrés Lage Freire and home stays unchanged", () => {
  const home = jsonLdForPath("/");
  assert.equal(
    home["@graph"].some((node) => node["@type"] === "BlogPosting" || (Array.isArray(node["@type"]) && node["@type"].includes("BlogPosting"))),
    false,
  );
  for (const pair of PAIRS) {
    for (const path of [pair.path, `/es${pair.path}`]) {
      const graph = jsonLdForPath(path)["@graph"];
      const post = graph.find((node) => Array.isArray(node["@type"]) && node["@type"].includes("BlogPosting"));
      assert.ok(post, path);
      assert.equal(post.author.name, "Andrés Lage Freire");
      assert.equal(post.image, `${ORIGIN}/og-image.jpg`);
      assert.ok(graph.some((node) => node["@type"] === "ProfessionalService"));
    }
  }
});

test("built flagship pages are real HTML with reciprocal head and semantic noscript", () => {
  for (const pair of PAIRS) {
    for (const [locale, path] of [
      ["en", pair.path],
      ["es", `/es${pair.path}`],
    ] as const) {
      const file = locale === "es" ? `dist/es${pair.path}/index.html` : `dist${pair.path}/index.html`;
      const html = fs.readFileSync(file, "utf8");
      const enUrl = `${ORIGIN}${pair.path}/`;
      const esUrl = `${ORIGIN}/es${pair.path}/`;
      const canonical = locale === "es" ? esUrl : enUrl;
      const title = (locale === "es" ? pair.titleEs : pair.titleEn).replace(/&/g, "&amp;");
      assert.ok(html.includes(`<title>${title}</title>`), file);
      assert.ok(html.includes(`<link rel="canonical" href="${canonical}" />`), file);
      assert.ok(html.includes(`hreflang="en" href="${enUrl}"`), file);
      assert.ok(html.includes(`hreflang="es" href="${esUrl}"`), file);
      assert.ok(html.includes(`hreflang="x-default" href="${enUrl}"`), file);
      assert.equal(html.includes('hreflang="en-GB"'), false, file);
      assert.ok(html.includes("https://tshapedconsultant.com/og-image.jpg"), file);
      assert.ok(html.includes('href="/ai-runtime-risk-check"') || html.includes('href="/es/ai-runtime-risk-check"'), file);
      assert.ok(html.includes('href="/#hr-copilot-case"') || html.includes('href="/es/#hr-copilot-case"'), file);
      const noscript = html.match(/<noscript>[\s\S]*?<\/noscript>/)?.[0] || "";
      assert.equal((noscript.match(/<h1>/g) || []).length, 1, file);
      assert.ok(noscript.includes("<h2>"), file);
      assert.ok(noscript.includes("<blockquote>"), file);
      assert.ok(noscript.includes("<ul>") || noscript.includes("<ol>"), file);
      const script = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
      const hash = html.match(/sha256-[A-Za-z0-9+/=]+/)?.[0];
      const computed = "sha256-" + crypto.createHash("sha256").update(script).digest("base64");
      assert.equal(hash, computed, file);
      assert.match(script, /BlogPosting/);
      assert.match(script, /Andrés Lage Freire/);
    }
  }
});

test("home videos do not use the invalid loading attribute", () => {
  const app = fs.readFileSync("src/App.jsx", "utf8");
  const videos = app.match(/<video[\s\S]*?<\/video>/g) || [];
  assert.ok(videos.length >= 3);
  for (const video of videos) {
    assert.equal(video.includes("loading="), false);
    assert.match(video, /preload="metadata"/);
    assert.match(video, /\bwidth=/);
    assert.match(video, /\bheight=/);
  }
});
