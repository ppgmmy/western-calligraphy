#!/usr/bin/env node
/**
 * 由 src/fonts/google.ts、src/fonts/lab.google.ts 嘅 next/font/google 宣告，
 * 產生本地字體後備方案：
 *   - src/fonts/files/<family>/*.woff2 + 授權檔（OFL／Apache，來自 google/fonts repo）
 *   - src/fonts/local.ts、src/fonts/lab.local.ts（next/font/local）
 *   - src/fonts/noto-serif-tc.css（Noto Serif TC 要保留全部 unicode-range 分片，所以用 CSS @font-face）
 *   - src/fonts/files/THIRD_PARTY_FONTS.md（來源、版權、授權清單）
 *
 * 只需喺新增／更改字體時執行（需要網絡）；一般 build 唔需要。
 *   node scripts/generate-local-fonts.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fontsDir = path.join(root, "src/fonts");
const filesDir = path.join(fontsDir, "files");
// 現代瀏覽器 UA，令 Google Fonts 回傳 woff2
const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36";

async function getText(url, headers = {}) {
  const r = await fetch(url, { headers });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return r.text();
}
async function getBuf(url) {
  const r = await fetch(url, { headers: { "User-Agent": UA } });
  if (!r.ok) throw new Error(`${r.status} ${url}`);
  return Buffer.from(await r.arrayBuffer());
}

/** 解析 `const x = Family_Name({ ... });` */
function parseDecls(file) {
  const src = fs.readFileSync(path.join(fontsDir, file), "utf8");
  const out = [];
  const re = /const (\w+) = (\w+)\(\{([\s\S]*?)\}\);/g;
  let m;
  while ((m = re.exec(src))) {
    const [, id, fn, body] = m;
    if (fn === "localFont") continue;
    const variable = /variable:\s*"([^"]+)"/.exec(body)[1];
    const list = (key) => {
      const mm = new RegExp(`${key}:\\s*(\\[[^\\]]*\\]|"[^"]*")`).exec(body);
      if (!mm) return null;
      return [...mm[1].matchAll(/"([^"]*)"/g)].map((x) => x[1]);
    };
    out.push({
      id,
      family: fn.replace(/_/g, " "),
      variable,
      weights: list("weight") ?? ["400"],
      styles: list("style") ?? ["normal"],
    });
  }
  return out;
}

const camel = (s) => s.replace(/[^A-Za-z0-9]+(.)?/g, (_, c) => (c ? c.toUpperCase() : "")).replace(/^./, (c) => c.toLowerCase());
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

function cssUrl(d) {
  const fam = d.family.replace(/ /g, "+");
  const ws = [...d.weights].sort();
  let spec;
  if (d.styles.includes("italic")) {
    const parts = [];
    for (const [i, st] of [[0, "normal"], [1, "italic"]]) {
      if (d.styles.includes(st)) for (const w of ws) parts.push(`${i},${w}`);
    }
    spec = `:ital,wght@${parts.join(";")}`;
  } else spec = `:wght@${ws.join(";")}`;
  return `https://fonts.googleapis.com/css2?family=${fam}${spec}&display=swap`;
}

function parseBlocks(css) {
  const blocks = [];
  // CJK 分片前面可能冇 /* subset */ 註解
  for (const m of css.matchAll(/(?:\/\* ([^*]+?) \*\/\s*)?@font-face \{([\s\S]*?)\}/g)) {
    const g = (p) => new RegExp(p).exec(m[2])?.[1];
    blocks.push({
      subset: m[1] ?? "unlabeled",
      style: g("font-style: (\\w+)"),
      weight: g("font-weight: (\\d+)"),
      url: g("url\\((.*?)\\)"),
      range: g("unicode-range: ([^;]+);"),
    });
  }
  return blocks;
}

async function licenseFor(family) {
  const dir = family.toLowerCase().replace(/[^a-z0-9]/g, "");
  for (const lic of ["ofl", "apache", "ufl"]) {
    for (const name of ["OFL.txt", "LICENSE.txt", "UFL.txt"]) {
      const url = `https://raw.githubusercontent.com/google/fonts/main/${lic}/${dir}/${name}`;
      const r = await fetch(url);
      if (r.ok) {
        const text = await r.text();
        let designer = "";
        if (lic !== "ofl") {
          const meta = await fetch(`https://raw.githubusercontent.com/google/fonts/main/${lic}/${dir}/METADATA.pb`);
          designer = meta.ok ? (/designer:\s*"([^"]+)"/.exec(await meta.text())?.[1] ?? "") : "";
        }
        return { kind: lic.toUpperCase(), name, url, text, designer };
      }
    }
  }
  throw new Error(`license not found for ${family}`);
}

function copyrightOf(lic) {
  if (lic.kind !== "OFL") return `設計者：${lic.designer || "見 METADATA.pb"}（授權：${lic.name}）`;
  return lic.text.split("\n").find((l) => /^Copyright|^\(c\)|^©/i.test(l.trim()))?.trim() ?? "(見授權檔)";
}

function weightRange(ws) {
  const n = ws.map(Number).sort((a, b) => a - b);
  return n.length > 1 ? `${n[0]} ${n[n.length - 1]}` : String(n[0]);
}

const credits = [];
async function processFile(file, outTs, kind) {
  const decls = parseDecls(file);
  const lines = [
    "/**",
    " * 自動產生：node scripts/generate-local-fonts.mjs（請勿手改）。",
    " * 本地字體後備方案（next/font/local），build 時唔需要連 Google Fonts。",
    " * 詳見 src/fonts/README.md、src/fonts/files/THIRD_PARTY_FONTS.md。",
    " */",
  ];
  if (kind === "main") {
    lines.push('import localFont from "next/font/local";', 'import "./noto-serif-tc.css";', "");
  } else lines.push('import localFont from "next/font/local";', "");
  const exported = [];
  for (const d of decls) {
    if (kind === "main" && d.family === "Noto Serif TC") {
      await doNoto(d);
      lines.push(
        `/** Noto Serif TC：保留全部 unicode-range 分片，用 CSS @font-face（見 noto-serif-tc.css） */`,
        `export const ${d.id} = { variable: "font-zh-local" };`,
        "",
      );
      exported.push(d.id);
      continue;
    }
    const css = await getText(cssUrl(d), { "User-Agent": UA });
    const blocks = parseBlocks(css).filter((b) => b.subset === "latin");
    if (!blocks.length) throw new Error(`no latin block for ${d.family}`);
    const dir = slug(d.family);
    fs.mkdirSync(path.join(filesDir, dir), { recursive: true });
    const byKey = new Map();
    for (const b of blocks) {
      const k = `${b.style}|${b.url}`;
      if (!byKey.has(k)) byKey.set(k, { ...b, weights: [] });
      byKey.get(k).weights.push(b.weight);
    }
    const entries = [];
    for (const e of byKey.values()) {
      const fname = e.url.split("/").pop();
      const dest = path.join(filesDir, dir, fname);
      if (!fs.existsSync(dest)) fs.writeFileSync(dest, await getBuf(e.url));
      entries.push(
        `    { path: "./files/${dir}/${fname}", weight: "${weightRange(e.weights)}", style: "${e.style}" },`,
      );
    }
    const lic = await licenseFor(d.family);
    fs.writeFileSync(path.join(filesDir, dir, lic.name), lic.text);
    credits.push({
      family: d.family,
      dir,
      lic,
      copyright: copyrightOf(lic),
      subset: "latin",
    });
    // main：const 名用字體名（next/font/local 用 const 名做 font-family 名），
    // 令 exportPracticeSheet.ts 靠 family 名認得 italianno／allura／unifraktur 等；再 export 返原本嘅 id。
    const local = kind === "main" ? camel(d.family) : d.id;
    lines.push(
      `${kind === "main" ? "const" : "export const"} ${local} = localFont({`,
      "  src: [",
      ...entries,
      "  ],",
      `  variable: "${d.variable}",`,
      '  display: "swap",',
      "});",
      ...(kind === "main" ? [`export { ${local} as ${d.id} };`] : []),
      "",
    );
    exported.push(d.id);
  }
  if (kind === "main") {
    // 自製 Scriptoria Italic 本身已經係 next/font/local，兩邊一樣
    lines.splice(
      lines.indexOf("") + 1,
      0,
      "/** 自製斜體／細草範字：由 Cormorant Garamond Italic 裁字而成（OFL）；與 google.ts 內設定一致 */",
      "export const italicCustom = localFont({",
      "  src: [",
      "    {",
      '      path: "../../public/fonts/scriptoria-italic/ScriptoriaItalic-Regular.woff2",',
      '      weight: "400",',
      '      style: "normal",',
      "    },",
      "  ],",
      '  variable: "--font-italic-custom",',
      '  display: "swap",',
      "});",
      "",
    );
  } else {
    lines.push(
      "export const labFontVars = [",
      ...exported.map((x) => `  ${x}.variable,`),
      '].join(" ");',
      "",
    );
  }
  fs.writeFileSync(path.join(fontsDir, outTs), lines.join("\n"));
}

async function doNoto(d) {
  const css = await getText(cssUrl(d), { "User-Agent": UA });
  const blocks = parseBlocks(css);
  const dir = slug(d.family);
  fs.mkdirSync(path.join(filesDir, dir), { recursive: true });
  const byUrl = new Map();
  for (const b of blocks) {
    if (!byUrl.has(b.url)) byUrl.set(b.url, { ...b, weights: [] });
    byUrl.get(b.url).weights.push(b.weight);
  }
  const out = [
    "/* 自動產生：node scripts/generate-local-fonts.mjs（請勿手改）。",
    "   Noto Serif TC（OFL，variable wght）全部 unicode-range 分片，來源同 next/font/google 一樣（fonts.gstatic.com），",
    "   但自行託管，build 時唔需要連網。 */",
    "",
  ];
  let i = 0;
  for (const e of byUrl.values()) {
    const fname = e.url.split("/").pop();
    const dest = path.join(filesDir, dir, fname);
    if (!fs.existsSync(dest)) fs.writeFileSync(dest, await getBuf(e.url));
    out.push(
      `/* ${e.subset} */`,
      "@font-face {",
      '  font-family: "Noto Serif TC Local";',
      "  font-style: normal;",
      `  font-weight: ${weightRange(e.weights)};`,
      "  font-display: swap;",
      `  src: url("./files/${dir}/${fname}") format("woff2");`,
      `  unicode-range: ${e.range};`,
      "}",
      "",
    );
    i++;
  }
  out.push(
    "/* 對應 next/font 嘅 variable class：html 加 font-zh-local 就會設定 --font-zh */",
    ".font-zh-local {",
    '  --font-zh: "Noto Serif TC Local", "Noto Serif TC", serif;',
    "}",
    "",
  );
  fs.writeFileSync(path.join(fontsDir, "noto-serif-tc.css"), out.join("\n"));
  const lic = await licenseFor(d.family);
  fs.writeFileSync(path.join(filesDir, dir, lic.name), lic.text);
  credits.push({
    family: d.family,
    dir,
    lic,
    copyright: copyrightOf(lic),
    subset: `全部 unicode-range 分片（${i} 個檔）`,
  });
}

fs.mkdirSync(filesDir, { recursive: true });
await processFile("google.ts", "local.ts", "main");
await processFile("lab.google.ts", "lab.local.ts", "lab");

const md = [
  "# 本地字體來源與授權",
  "",
  "此目錄嘅字體檔由 `node scripts/generate-local-fonts.mjs` 從 Google Fonts（fonts.googleapis.com／fonts.gstatic.com，",
  "即係 `next/font/google` 一直下載嘅同一批檔案）取得，並放入 repo 自行託管。",
  "各字體授權檔（OFL.txt／LICENSE.txt）放喺各自子目錄，來源：<https://github.com/google/fonts>。",
  "",
  "| 字體 | 授權 | 版權（取自授權檔） | 內容 | 授權檔 |",
  "| --- | --- | --- | --- | --- |",
  ...credits.map(
    (c) =>
      `| ${c.family} | ${c.lic.kind === "OFL" ? "SIL OFL 1.1" : c.lic.kind === "APACHE" ? "Apache 2.0" : c.lic.kind} | ${c.copyright.replace(/\|/g, "/")} | ${c.subset} | [\`${c.dir}/${c.lic.name}\`](./${c.dir}/${c.lic.name}) |`,
  ),
  "",
  "備註：",
  "",
  "- 檔案係 Google Fonts 提供嘅 latin（及 Noto Serif TC 全部 unicode-range）woff2 子集，未經本 repo 修改。",
  "- Source Serif 4、UnifrakturMaguntia、Bilbo Swash Caps、Euphoria Script 等字體帶有 Reserved Font Name，請勿用原名發佈修改版。",
  "- `public/fonts/scriptoria-italic/` 係自製字體（見該目錄 OFL.txt），唔屬此目錄。",
  "",
];
fs.writeFileSync(path.join(filesDir, "THIRD_PARTY_FONTS.md"), md.join("\n"));
console.log("done", credits.length, "families");
