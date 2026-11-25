/**
 * Install the supported OPA binary and verify its pinned sha256.
 *
 * Supported version: 1.22.4
 * Command: node scripts/install-opa.mjs
 *
 * The binary stays in tools/ and is not committed.
 */
import { createHash } from "node:crypto";
import { chmodSync, mkdirSync, readFileSync, renameSync, rmSync, writeFileSync, existsSync } from "node:fs";
import { get } from "node:https";
import path from "node:path";

const VERSION = "1.22.4";
const ASSETS = {
  win32: {
    name: "opa_windows_amd64.exe",
    file: "opa.exe",
    sha256: "4cd179b95041aa50c44241324da3becf35d0b28dca92bf10a07f32d002724d5e",
  },
  linux: {
    name: "opa_linux_amd64_static",
    file: "opa",
    sha256: "35e3b352e715e80624ead6c89930d8585f6f7d94cdc409eb2a9fe36620dcccba",
  },
};

const asset = ASSETS[process.platform];
if (!asset) {
  console.error(`OPA ${VERSION} install supports Windows and Linux. This host is ${process.platform}.`);
  process.exit(1);
}

const toolsDir = path.resolve("tools");
const destination = path.join(toolsDir, asset.file);

function sha256(buffer) {
  return createHash("sha256").update(buffer).digest("hex");
}

if (existsSync(destination) && sha256(readFileSync(destination)) === asset.sha256) {
  console.log(`OPA ${VERSION} already installed at ${destination}`);
  process.exit(0);
}

function download(url) {
  return new Promise((resolve, reject) => {
    get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        response.resume();
        download(response.headers.location).then(resolve, reject);
        return;
      }
      if (response.statusCode !== 200) {
        reject(new Error(`Download failed with HTTP ${response.statusCode} for ${url}`));
        response.resume();
        return;
      }
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.on("end", () => resolve(Buffer.concat(chunks)));
    }).on("error", reject);
  });
}

const url = `https://github.com/open-policy-agent/opa/releases/download/v${VERSION}/${asset.name}`;
const binary = await download(url);
const actual = sha256(binary);
if (actual !== asset.sha256) {
  console.error(`SHA256 mismatch for OPA ${VERSION} ${asset.name}.`);
  console.error(`Expected ${asset.sha256}`);
  console.error(`Received ${actual}`);
  process.exit(1);
}

mkdirSync(toolsDir, { recursive: true });
const temporary = `${destination}.download`;
writeFileSync(temporary, binary);
if (process.platform !== "win32") chmodSync(temporary, 0o755);
rmSync(destination, { force: true });
renameSync(temporary, destination);
console.log(`Installed OPA ${VERSION} at ${destination}`);
