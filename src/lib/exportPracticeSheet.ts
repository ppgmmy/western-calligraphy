/**
 * Practice-sheet export helpers.
 * SVG/PDF clones lose CSS variable fonts (fall back to Georgia). Embed the
 * same next/font faces as data-URI @font-face rules before rasterizing.
 */

const FONT_VAR_NAMES = [
  "--font-script",
  "--font-modern",
  "--font-display",
  "--font-body",
  "--font-zh",
  "--font-blackletter",
  "--font-grand",
] as const;

/** Families we must keep for calligraphy exemplars */
const EXPORT_FONT_HINTS = [
  "italianno",
  "allura",
  "mea culpa",
  "unifraktur",
] as const;

/** Google Fonts fallback when page stylesheets are not readable */
const GOOGLE_FONT_FALLBACKS: Array<{ family: string; query: string }> = [
  { family: "Italianno", query: "Italianno" },
  { family: "Allura", query: "Allura" },
  { family: "Mea Culpa", query: "Mea+Culpa" },
  { family: "UnifrakturMaguntia", query: "UnifrakturMaguntia" },
];

let embeddedFontCssPromise: Promise<string> | null = null;

function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);
  const chunk = 0x8000;
  let binary = "";
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function mimeForFontUrl(url: string): string {
  if (url.includes(".woff2")) return "font/woff2";
  if (url.includes(".woff")) return "font/woff";
  if (url.includes(".ttf")) return "font/ttf";
  if (url.includes(".otf")) return "font/otf";
  return "font/woff2";
}

function shouldExportFontFace(family: string, weight: string, src: string): boolean {
  const normalized = family.replace(/['"]/g, "").trim().toLowerCase();
  if (!normalized || normalized.includes("fallback")) return false;
  if (!EXPORT_FONT_HINTS.some((hint) => normalized.includes(hint))) return false;
  if (!src.includes("url(")) return false;
  return weight === "400" || weight === "normal" || weight === "";
}

async function fontUrlsToDataSrc(
  src: string,
  dataUriByUrl: Map<string, string>,
  baseHref: string,
) {
  const urls = Array.from(src.matchAll(/url\(([^)]+)\)/g)).map((match) =>
    match[1].replace(/['"]/g, "").trim(),
  );
  let rewrittenSrc = src;
  for (const rawUrl of urls) {
    if (rawUrl.startsWith("data:")) continue;
    const absolute = new URL(rawUrl, baseHref).href;
    let dataUri = dataUriByUrl.get(absolute);
    if (!dataUri) {
      const response = await fetch(absolute);
      if (!response.ok) continue;
      const buffer = await response.arrayBuffer();
      dataUri = `data:${mimeForFontUrl(absolute)};base64,${arrayBufferToBase64(buffer)}`;
      dataUriByUrl.set(absolute, dataUri);
    }
    rewrittenSrc = rewrittenSrc.replaceAll(rawUrl, dataUri);
  }
  return rewrittenSrc;
}

async function buildFontCssFromDocument(): Promise<string> {
  const blocks: string[] = [];
  const dataUriByUrl = new Map<string, string>();

  for (const styleSheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList;
    try {
      rules = styleSheet.cssRules;
    } catch {
      continue;
    }

    const baseHref = styleSheet.href || window.location.href;

    for (const rule of Array.from(rules)) {
      if (!(rule instanceof CSSFontFaceRule)) continue;

      const family = rule.style.getPropertyValue("font-family");
      const weight = rule.style.getPropertyValue("font-weight") || "400";
      const src = rule.style.getPropertyValue("src");
      if (!src || !shouldExportFontFace(family, weight, src)) continue;

      const rewrittenSrc = await fontUrlsToDataSrc(src, dataUriByUrl, baseHref);
      // Skip faces we failed to rewrite into data URIs.
      if (!rewrittenSrc.includes("data:")) continue;

      const style = rule.style.getPropertyValue("font-style") || "normal";
      const display = rule.style.getPropertyValue("font-display") || "swap";

      blocks.push(
        `@font-face{font-family:${family};font-style:${style};font-weight:${weight};font-display:${display};src:${rewrittenSrc};}`,
      );
    }
  }

  return blocks.join("\n");
}

async function buildFontCssFromGoogle(): Promise<string> {
  const blocks: string[] = [];
  const dataUriByUrl = new Map<string, string>();
  const cssUrl = `https://fonts.googleapis.com/css2?${GOOGLE_FONT_FALLBACKS.map(
    (item) => `family=${item.query}`,
  ).join("&")}&display=swap`;

  const cssResponse = await fetch(cssUrl);
  if (!cssResponse.ok) return "";
  const cssText = await cssResponse.text();
  const faceBlocks = cssText.match(/@font-face\s*\{[^}]+\}/g) ?? [];

  for (const block of faceBlocks) {
    const familyMatch = block.match(/font-family:\s*([^;]+);/i);
    const weightMatch = block.match(/font-weight:\s*([^;]+);/i);
    const styleMatch = block.match(/font-style:\s*([^;]+);/i);
    const srcMatch = block.match(/src:\s*([^;]+);/i);
    if (!familyMatch || !srcMatch) continue;

    const family = familyMatch[1].trim();
    const weight = weightMatch?.[1]?.trim() ?? "400";
    const style = styleMatch?.[1]?.trim() ?? "normal";
    const src = srcMatch[1].trim();
    if (!shouldExportFontFace(family, weight, src)) continue;

    const rewrittenSrc = await fontUrlsToDataSrc(src, dataUriByUrl, cssUrl);
    if (!rewrittenSrc.includes("data:")) continue;
    blocks.push(
      `@font-face{font-family:${family};font-style:${style};font-weight:${weight};font-display:swap;src:${rewrittenSrc};}`,
    );
  }

  return blocks.join("\n");
}

async function buildEmbeddedFontCss(): Promise<string> {
  const fromDocument = await buildFontCssFromDocument();
  if (fromDocument.includes("@font-face")) return fromDocument;
  return buildFontCssFromGoogle();
}

export async function getEmbeddedFontCss(): Promise<string> {
  if (!embeddedFontCssPromise) {
    embeddedFontCssPromise = buildEmbeddedFontCss().catch((error) => {
      embeddedFontCssPromise = null;
      throw error;
    });
  }
  return embeddedFontCssPromise;
}

function resolveCssFontVars(value: string): string {
  const root = getComputedStyle(document.documentElement);
  let next = value;
  for (const varName of FONT_VAR_NAMES) {
    const resolved = root.getPropertyValue(varName).trim();
    if (!resolved) continue;
    next = next.replaceAll(`var(${varName})`, resolved);
  }
  // Drop next/font metric-adjusted fallback faces so export can't
  // silently paint Times-like serif when the script face fails.
  next = next
    .replace(/,?\s*["'][^"']*Fallback["']/gi, "")
    .replace(/,?\s*[^,"']*Fallback(?=,|$)/gi, "")
    .replace(/,\s*,/g, ",")
    .replace(/^,\s*|\s*,$/g, "")
    .trim();
  return next;
}

/** Rewrite var(--font-*) on font-family attrs/styles so blob SVG can use embedded faces. */
export function resolveSvgFontFamilies(svg: SVGSVGElement): void {
  svg.querySelectorAll("[font-family]").forEach((node) => {
    const current = node.getAttribute("font-family");
    if (!current) return;
    node.setAttribute("font-family", resolveCssFontVars(current));
  });

  svg.querySelectorAll("[style]").forEach((node) => {
    const style = node.getAttribute("style");
    if (!style || !style.includes("font-family") || !style.includes("var(--font-")) {
      return;
    }
    node.setAttribute("style", resolveCssFontVars(style));
  });
}

/**
 * When Google fallback CSS is used, also map next/font hashed families to
 * public Google family names so text nodes still hit the embedded faces.
 */
function appendPublicFamilyAliases(svg: SVGSVGElement): void {
  svg.querySelectorAll("[font-family]").forEach((node) => {
    const current = node.getAttribute("font-family");
    if (!current) return;
    const lower = current.toLowerCase();
    const aliases: string[] = [];
    if (lower.includes("italianno") && !/"Italianno"|'Italianno'/.test(current)) {
      aliases.push("Italianno");
    }
    if (lower.includes("allura") && !/"Allura"|'Allura'/.test(current)) {
      aliases.push("Allura");
    }
    if (lower.includes("mea") && !/"Mea Culpa"|'Mea Culpa'/.test(current)) {
      aliases.push("'Mea Culpa'");
    }
    if (aliases.length > 0) {
      node.setAttribute("font-family", `${current}, ${aliases.join(", ")}`);
    }
  });
}

export async function prepareSvgForExport(
  source: SVGSVGElement,
): Promise<SVGSVGElement> {
  await document.fonts.ready;
  const clone = source.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("width", "794");
  clone.setAttribute("height", "1123");

  resolveSvgFontFamilies(clone);
  appendPublicFamilyAliases(clone);

  const fontCss = await getEmbeddedFontCss();
  if (fontCss) {
    const style = document.createElementNS("http://www.w3.org/2000/svg", "style");
    style.textContent = fontCss;
    const first = clone.firstChild;
    if (first) {
      clone.insertBefore(style, first);
    } else {
      clone.appendChild(style);
    }
  }

  return clone;
}

export async function svgElementToJpeg(
  svg: SVGSVGElement,
  options?: { scale?: number; quality?: number },
): Promise<string> {
  const scale = options?.scale ?? 2;
  const quality = options?.quality ?? 0.95;
  const prepared = await prepareSvgForExport(svg);
  const xml = new XMLSerializer().serializeToString(prepared);
  const blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);

  try {
    const image = await new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error("SVG image load failed"));
      img.src = url;
    });

    // Give the SVG-as-image renderer a beat to apply embedded faces.
    await new Promise((resolve) => window.setTimeout(resolve, 80));

    const canvas = document.createElement("canvas");
    canvas.width = 794 * scale;
    canvas.height = 1123 * scale;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas unavailable");
    ctx.fillStyle = "#f7f5f1";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    return canvas.toDataURL("image/jpeg", quality);
  } finally {
    URL.revokeObjectURL(url);
  }
}

export async function svgElementToSvgBlob(svg: SVGSVGElement): Promise<Blob> {
  const prepared = await prepareSvgForExport(svg);
  const payload = `<?xml version="1.0" encoding="UTF-8"?>\n${new XMLSerializer().serializeToString(prepared)}`;
  return new Blob([payload], { type: "image/svg+xml;charset=utf-8" });
}
