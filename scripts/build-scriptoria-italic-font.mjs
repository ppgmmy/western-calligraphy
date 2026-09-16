/**
 * Build Scriptoria Italic from Cormorant Garamond Italic (OFL).
 *
 * Lab: archives previous files under public/fonts/_archive/ before overwrite,
 * writes manifest.json + appends public/fonts/_archive/lab-log.jsonl.
 *
 * Run:
 *   npm run fonts:scriptoria-italic
 *   npm run fonts:scriptoria-italic -- 1.001
 *
 * Requires: pip install 'fonttools[woff]' brotli
 */
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "public/fonts/scriptoria-italic");
const py = path.join(__dirname, "fonts/crop_scriptoria_italic.py");
const versionArg = process.argv[2];

fs.mkdirSync(outDir, { recursive: true });

const args = [py, outDir];
if (versionArg) args.push(versionArg);

const result = spawnSync("python3", args, {
  cwd: root,
  stdio: "inherit",
  env: process.env,
});

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

console.log("Scriptoria Italic ready in", outDir);
console.log("Archive + lab-log under public/fonts/_archive/");
console.log("Remember: append src/data/lab/changelog.ts for the /lab UI log.");
