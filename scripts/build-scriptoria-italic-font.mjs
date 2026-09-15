/**
 * Build Scriptoria Italic from Cormorant Garamond Italic (OFL).
 *
 * Crops teaching glyphs (A–Z a–z digits punctuation) into a renamed atelier font.
 * Run: node scripts/build-scriptoria-italic-font.mjs
 *
 * Requires network on first run (downloads source), and Python fontTools:
 *   pip install 'fonttools[woff]' brotli
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public/fonts/scriptoria-italic");
const py = path.join(__dirname, "fonts/crop_scriptoria_italic.py");

fs.mkdirSync(outDir, { recursive: true });

const result = spawnSync("python3", [py, outDir], {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

console.log("Scriptoria Italic font ready in", outDir);
