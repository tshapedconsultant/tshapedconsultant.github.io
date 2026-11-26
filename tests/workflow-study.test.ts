import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

import { PROJECTS, SERVICE_LADDER, DIAGNOSTIC } from "../src/content.js";
import { PROJECTS as PROJECTS_ES, SERVICE_LADDER as LADDER_ES, DIAGNOSTIC as DIAGNOSTIC_ES } from "../src/content.es.js";
import { pulseByPath } from "../src/data/pulseLibrary.ts";
import { clearTrackedEvents, getTrackedEvents, trackEvent } from "../src/lib/analytics.ts";
import { pageSeoFor } from "../src/seo.js";
import { DEDALO_PATH, WORKFLOW_ARTICLE_PATH, switchLocalePath } from "../src/routes.ts";

const article = fs.readFileSync("src/data/workflowArticle.ts", "utf8");
const hub = fs.readFileSync("src/pages/DedaloHub.tsx", "utf8");
const home = fs.readFileSync("src/App.jsx", "utf8");
const contentEn = fs.readFileSync("src/content.js", "utf8");
const contentEs = fs.readFileSync("src/content.es.js", "utf8");
const sitemap = fs.readFileSync("public/sitemap.xml", "utf8");
const vite = fs.readFileSync("vite.config.js", "utf8");

test("paired workflow article keeps the same slug in both languages", () => {
  const en = pulseByPath(WORKFLOW_ARTICLE_PATH, "en");
  const es = pulseByPath(`/es${WORKFLOW_ARTICLE_PATH}`, "es");
  assert.ok(en);
  assert.ok(es);
  assert.equal(en.slug, es.slug);
  assert.equal(en.lang, "en");
  assert.equal(es.lang, "es");
  assert.match(en.title, /Beyond task automation/);
  assert.match(es.title, /Más allá de automatizar tareas/);
  assert.equal(switchLocalePath(WORKFLOW_ARTICLE_PATH, "", "es"), `/es${WORKFLOW_ARTICLE_PATH}`);
  assert.equal(switchLocalePath(`/es${WORKFLOW_ARTICLE_PATH}`, "", "en"), WORKFLOW_ARTICLE_PATH);
  assert.equal(switchLocalePath(DEDALO_PATH, "", "es"), "/es/dedalo");
});

test("dedalo and article metadata do not fall back to the homepage", () => {
  const en = pageSeoFor("/dedalo");
  const es = pageSeoFor("/es/dedalo");
  const essay = pageSeoFor(WORKFLOW_ARTICLE_PATH);
  assert.match(en.title, /Dédalo/);
  assert.match(es.title, /Dédalo/);
  assert.match(en.description, /directional/);
  assert.match(essay.title, /Beyond task automation/);
  assert.match(pageSeoFor(`/es${WORKFLOW_ARTICLE_PATH}`).title, /Más allá de automatizar tareas/);
});

test("study copy stays directional and does not quote an unread coefficient", () => {
  const blob = `${article}\n${hub}\n${home}\n${contentEn}\n${contentEs}`;
  assert.equal(blob.includes("r=+0.39"), false);
  assert.equal(blob.includes("39% more value"), false);
  assert.equal(blob.includes("doesn't create value by automating"), false);
  assert.match(article, /does not quote a correlation coefficient/);
  assert.match(article, /Our governance interpretation/);
  assert.match(article, /Interpretación de gobernanza/);
  assert.match(contentEn, /AI value depends on the workflow around the model/);
  assert.match(contentEs, /La IA crea valor dentro de un proceso, no al margen de él/);
});

test("portfolio cards keep the corrected limits", () => {
  const porto = PROJECTS.find((item) => item.name.includes("Porto"));
  const portoEs = PROJECTS_ES.find((item) => item.name.includes("Porto"));
  const risk = PROJECTS.find((item) => item.name.includes("Enterprise AI Risk"));
  const hr = PROJECTS.find((item) => item.name.includes("HR Copilot"));
  assert.match(porto.summary, /explainable predictive models/);
  assert.match(porto.summary, /evidence consulted does not demonstrate RAG isolation/);
  assert.equal(porto.summary.includes("does not implement RAG isolation"), false);
  assert.match(portoEs.summary, /evidencia consultada no demuestra aislamiento de RAG/);
  assert.equal(portoEs.summary.includes("no implementa aislamiento de RAG"), false);
  assert.match(risk.category, /Demo \/ PoC/);
  assert.match(risk.summary, /tamper-evident/);
  assert.match(risk.summary, /does not establish DORA conformity/);
  assert.match(hr.outcome, /does not by itself demonstrate Dual-Key end to end/);
  assert.equal(hr.outcome.includes("neutralised prompt injection"), false);
});

test("snapshot scope and price stay on the catalogue", () => {
  const en = SERVICE_LADDER.items.find((item) => item.id === "snapshot");
  const es = LADDER_ES.items.find((item) => item.id === "snapshot");
  const band = DIAGNOSTIC.bands.find((item) => item.id === "snapshot");
  const bandEs = DIAGNOSTIC_ES.bands.find((item) => item.id === "snapshot");
  assert.equal(en.price, "From €2,495");
  assert.equal(es.price, "Desde €2.495");
  assert.match(en.deliverables.join(" "), /1-week delivery/);
  assert.match(es.deliverables.join(" "), /1 semana/);
  assert.match(en.description, /later engagement/);
  assert.match(band.limits.join(" "), /later engagement/);
  assert.match(bandEs.kind, /1 semana/);
  assert.equal(band.price, "From €2,495");
});

test("routes, sitemap and fallback html include the new pages", () => {
  for (const url of [
    "https://tshapedconsultant.com/dedalo/",
    "https://tshapedconsultant.com/es/dedalo/",
    "https://tshapedconsultant.com/insights/ai-value-workflow-redesign/",
    "https://tshapedconsultant.com/es/insights/ai-value-workflow-redesign/",
  ]) {
    assert.ok(sitemap.includes(url), url);
  }
  assert.match(sitemap, /<loc>https:\/\/tshapedconsultant.com\/dedalo\/<\/loc>\s*<lastmod>2026-11-25<\/lastmod>/);
  assert.ok(vite.includes('"dedalo"'));
  assert.ok(vite.includes('"es/dedalo"'));
  assert.ok(vite.includes('"insights/ai-value-workflow-redesign"'));
  assert.ok(vite.includes("pageSeoFor"));
});

test("workflow bridge clicks use a closed enum and drop free text", () => {
  clearTrackedEvents();
  const kept = trackEvent("workflow_bridge_click", {
    bridge_placement: "home_research_block",
    bridge_target: "study",
    note: "client name",
  });
  assert.equal(kept.props.bridge_placement, "home_research_block");
  assert.equal(kept.props.bridge_target, "study");
  assert.equal("note" in kept.props, false);
  const dropped = trackEvent("workflow_bridge_click", {
    bridge_placement: "home",
    bridge_target: "dedalo",
  });
  assert.equal("bridge_placement" in dropped.props, false);
  assert.equal(dropped.props.bridge_target, "dedalo");
  assert.equal(getTrackedEvents().length, 2);
});

test("bridge placements stay separate and the dedalo table keeps its headers", () => {
  assert.match(home, /bridge_placement: "nav"/);
  assert.match(home, /bridge_placement: "home_research_block"/);
  assert.match(home, /bridge_placement: "home_framework_card"/);
  assert.equal(home.includes('bridge_placement: "home"'), false);
  assert.match(hub, /bridge_placement: "dedalo_hub"/);
  assert.match(hub, /scope="col"/);
  assert.match(hub, /headers=\{columns\[index\]\.id\}/);
  const css = fs.readFileSync("src/App.css", "utf8");
  assert.equal(/\.dedalo-table thead\s*\{[^}]*display:\s*none/.test(css), false);
  assert.equal(/\.dedalo-table[\s\S]{0,600}data-label/.test(css), false);
});
