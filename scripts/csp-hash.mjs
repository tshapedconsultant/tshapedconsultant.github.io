import fs from "node:fs";
import crypto from "node:crypto";

const html = fs.readFileSync("index.html", "utf8");
const match = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
if (!match) throw new Error("JSON-LD script not found");
const text = match[1];
const hash = crypto.createHash("sha256").update(text, "utf8").digest("base64");
console.log(`sha256-${hash}`);
