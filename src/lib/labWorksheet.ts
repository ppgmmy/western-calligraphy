export type WorksheetSlant = 55 | 52 | 75 | 90 | 0;
export type WorksheetSpacingMode = "grid" | "uniform" | "auto";
export type WorksheetPageMode =
  | "all"
  | "warmup"
  | "p1"
  | "p2"
  | "p3"
  | "quotes"
  | "custom";

export type WorksheetRenderState = {
  fontFamily: string;
  slantAngle: WorksheetSlant;
  gridColor: string;
  fontSize: number;
  traceOpacity: number;
  spacingMode: WorksheetSpacingMode;
  customSpacing: number;
  mainTitle: string;
  subTitle: string;
  customText: string[];
};

type RowOptions = {
  sampleText?: string;
  traceCount?: number;
  showDemo?: boolean;
  rowHeight?: number;
  isHalfWidth?: boolean;
  label?: string;
  customColumns?: number[] | null;
};

function buildSlantLines(
  angle: number,
  color: string,
  lineAscender: number,
  lineDescender: number,
  xHeight: number,
): string {
  if (angle <= 0) return "";
  if (angle === 90) {
    let svg = "";
    for (let x = 10; x < 800; x += 18) {
      svg += `<line x1="${x}" y1="${lineAscender}" x2="${x}" y2="${lineDescender}" stroke="${color}" stroke-opacity="0.18" stroke-dasharray="1,3" stroke-width="0.7"/>`;
    }
    return svg;
  }

  const rad = (angle * Math.PI) / 180;
  const dx = Math.round((xHeight * 3) / Math.tan(rad));
  let svg = "";
  for (let x = -60; x < 860; x += 16) {
    svg += `<line x1="${x + dx}" y1="${lineAscender}" x2="${x}" y2="${lineDescender}" stroke="${color}" stroke-opacity="0.22" stroke-dasharray="2,2" stroke-width="0.7"/>`;
  }
  return svg;
}

function buildXPositions(
  state: WorksheetRenderState,
  options: RowOptions,
): number[] {
  const {
    sampleText = "",
    traceCount = 5,
    showDemo = true,
    isHalfWidth = false,
    customColumns = null,
  } = options;

  if (customColumns) return customColumns;

  const startX = isHalfWidth ? 15 : 25;
  const count = showDemo ? traceCount : traceCount + 1;
  const positions: number[] = [];

  if (state.spacingMode === "grid") {
    let pitch = state.customSpacing;
    if (isHalfWidth) pitch = 58;
    else if (sampleText.length <= 2) {
      pitch = Math.max(75, Math.round(state.fontSize * 1.8));
    } else {
      pitch = Math.max(200, state.customSpacing);
    }
    for (let i = 0; i <= count; i += 1) {
      const posX = startX + i * pitch;
      if (posX <= 760) positions.push(posX);
    }
    return positions;
  }

  if (state.spacingMode === "uniform") {
    const pitch = isHalfWidth ? 58 : state.customSpacing;
    for (let i = 0; i <= count; i += 1) {
      const posX = startX + i * pitch;
      if (posX <= 760) positions.push(posX);
    }
    return positions;
  }

  let letterSpacing: number;
  if (isHalfWidth) letterSpacing = 26;
  else if (sampleText.length === 1) {
    letterSpacing = Math.max(65, Math.round(state.fontSize * 1.8));
  } else {
    const charRatio =
      state.fontFamily.includes("Monsieur") ||
      state.fontFamily.includes("Tangerine")
        ? 0.65
        : 0.52;
    const approxWidth = sampleText.length * (state.fontSize * charRatio);
    letterSpacing = Math.max(140, Math.ceil(approxWidth + 50));
  }
  for (let i = 0; i <= count; i += 1) {
    const posX = startX + i * letterSpacing;
    if (posX <= 760) positions.push(posX);
  }
  return positions;
}

export function createCalligraphyRowSVG(
  state: WorksheetRenderState,
  options: RowOptions,
): string {
  const {
    sampleText = "",
    showDemo = true,
    rowHeight = 70,
    label = "",
  } = options;

  const color = state.gridColor;
  const opacity = state.traceOpacity;
  const topOffset = 10;
  const xHeight = 20;
  const lineAscender = topOffset;
  const lineWaist = topOffset + xHeight;
  const lineBase = topOffset + xHeight * 2;
  const lineDescender = topOffset + xHeight * 3;

  const slantLinesSVG = buildSlantLines(
    state.slantAngle,
    color,
    lineAscender,
    lineDescender,
    xHeight,
  );

  let textSVG = "";
  if (sampleText) {
    const xPositions = buildXPositions(state, options);
    xPositions.forEach((posX, index) => {
      const isDemoItem = showDemo && index === 0;
      const textFill = isDemoItem ? "#152028" : color;
      const textOpacity = isDemoItem ? 1 : opacity;
      textSVG += `
        <text x="${posX}" y="${lineBase}"
              font-size="${state.fontSize}"
              fill="${textFill}"
              ${isDemoItem ? "" : `fill-opacity="${textOpacity}"`}
              style="font-family: ${state.fontFamily};">
          ${escapeXml(sampleText)}
        </text>`;
    });
  }

  return `
    <div class="lab-ws-row">
      ${label ? `<div class="lab-ws-row__label">${escapeXml(label)}</div>` : ""}
      <svg viewBox="0 0 800 ${rowHeight}" class="lab-ws-row__svg" aria-hidden="true">
        ${slantLinesSVG}
        <line x1="0" y1="${lineAscender}" x2="800" y2="${lineAscender}" stroke="${color}" stroke-opacity="0.4" stroke-dasharray="3,3" stroke-width="0.8"/>
        <line x1="0" y1="${lineWaist}" x2="800" y2="${lineWaist}" stroke="${color}" stroke-opacity="0.7" stroke-width="1"/>
        <line x1="0" y1="${lineBase}" x2="800" y2="${lineBase}" stroke="${color}" stroke-opacity="0.9" stroke-width="1.5"/>
        <line x1="0" y1="${lineDescender}" x2="800" y2="${lineDescender}" stroke="${color}" stroke-opacity="0.4" stroke-dasharray="3,3" stroke-width="0.8"/>
        ${textSVG}
      </svg>
    </div>`;
}

function createWarmupFlourishSVG(
  state: WorksheetRenderState,
  patternType: "loops-up" | "figure-8" | "waves",
): string {
  const color = state.gridColor;
  const opacity = state.traceOpacity;
  let pathD = "";
  if (patternType === "loops-up") {
    pathD =
      "M 10 30 C 25 5, 35 5, 40 30 C 45 55, 55 55, 70 30 C 85 5, 95 5, 100 30 C 105 55, 115 55, 130 30 C 145 5, 155 5, 160 30 C 165 55, 175 55, 190 30 C 205 5, 215 5, 220 30 C 225 55, 235 55, 250 30 C 265 5, 275 5, 280 30 C 285 55, 295 55, 310 30 C 325 5, 335 5, 340 30 C 345 55, 355 55, 370 30 C 385 5, 395 5, 400 30 Q 500 30 780 30";
  } else if (patternType === "figure-8") {
    pathD =
      "M 10 30 Q 30 10 50 30 T 90 30 T 130 30 T 170 30 T 210 30 T 250 30 T 290 30 T 330 30 T 370 30 T 410 30 T 450 30 T 490 30 Q 600 30 780 30";
  } else {
    pathD =
      "M 10 30 Q 25 10 40 30 T 70 30 T 100 30 T 130 30 T 160 30 T 190 30 T 220 30 T 250 30 T 280 30 T 310 30 T 340 30 T 370 30 Q 550 30 780 30";
  }

  return `
    <div class="lab-ws-row">
      <svg viewBox="0 0 800 60" class="lab-ws-row__svg" aria-hidden="true">
        <line x1="0" y1="10" x2="800" y2="10" stroke="${color}" stroke-opacity="0.3" stroke-dasharray="2,2"/>
        <line x1="0" y1="30" x2="800" y2="30" stroke="${color}" stroke-opacity="0.6"/>
        <line x1="0" y1="50" x2="800" y2="50" stroke="${color}" stroke-opacity="0.3" stroke-dasharray="2,2"/>
        <path d="${pathD}" fill="none" stroke="#152028" stroke-width="2"/>
        <path d="${pathD}" fill="none" stroke="${color}" stroke-opacity="${opacity + 0.2}" stroke-width="2.5" transform="translate(380, 0)"/>
      </svg>
    </div>`;
}

function createPageHeader(
  state: WorksheetRenderState,
  pageNum: string,
  partInfo: string,
): string {
  return `
    <div class="lab-ws-page__header">
      <div>
        <h2 class="lab-ws-page__title">${escapeXml(state.mainTitle)}</h2>
        <p class="lab-ws-page__part">${escapeXml(partInfo)} · ${escapeXml(state.subTitle)}</p>
      </div>
      <span class="lab-ws-page__num">PAGE ${escapeXml(pageNum)}</span>
    </div>`;
}

function pageShell(inner: string): string {
  return `<article class="lab-ws-page">${inner}
    <footer class="lab-ws-page__footer">Scriptoria 超级實驗室 · 西洋書法練習字帖</footer>
  </article>`;
}

function sectionTitle(text: string): string {
  return `<h3 class="lab-ws-section-title">${escapeXml(text)}</h3>`;
}

export function renderWorksheetPages(
  mode: WorksheetPageMode,
  state: WorksheetRenderState,
): string {
  switch (mode) {
    case "all":
      return renderPage1(state) + renderPage2(state) + renderPage3(state);
    case "warmup":
      return renderWarmup(state);
    case "p1":
      return renderPage1(state);
    case "p2":
      return renderPage2(state);
    case "p3":
      return renderPage3(state);
    case "quotes":
      return renderQuotes(state);
    case "custom":
      return renderCustom(state);
    default: {
      const _exhaustive: never = mode;
      return _exhaustive;
    }
  }
}

function renderPage1(state: WorksheetRenderState): string {
  const strokeCols = [25, 105, 185, 265, 345, 425, 505, 585, 665];
  const familyCols = [25, 275, 525];
  const row = (text: string, cols: number[], label?: string) =>
    createCalligraphyRowSVG(state, {
      sampleText: text,
      customColumns: cols,
      label,
    });

  return pageShell(`
    ${createPageHeader(state, "01", "Part 1: Basic Strokes & Lowercase Families")}
    <p class="lab-ws-legend">${state.slantAngle}° 斜引線 · 四線格（Ascender / Waist / Baseline / Descender）</p>
    ${sectionTitle("1. 七大基礎筆劃")}
    ${row("i", strokeCols)}${row("u", strokeCols)}${row("n", strokeCols)}
    ${row("v", strokeCols)}${row("o", strokeCols)}${row("l", strokeCols)}${row("j", strokeCols)}
    ${sectionTitle("2. 小寫字母分組家族")}
    ${row("o  c  a  d  g  q", familyCols, "橢圓家族")}
    ${row("i  u  n  m  v  w  y", familyCols, "分支家族")}
    ${row("l  e  b  h  k  t  f", familyCols, "上環家族")}
    ${row("j  p  z  r  s  x", familyCols, "下環與特殊字母")}
  `);
}

function renderPage2(state: WorksheetRenderState): string {
  const letters = "abcdefghijklmnopqrstuvwxyz".split("");
  const a2zCols = [15, 73, 131, 189, 247, 305];
  let left = "";
  let right = "";
  letters.forEach((char, index) => {
    const html = createCalligraphyRowSVG(state, {
      sampleText: char,
      customColumns: a2zCols,
      isHalfWidth: true,
      rowHeight: 60,
    });
    if (index % 2 === 0) left += html;
    else right += html;
  });

  return pageShell(`
    ${createPageHeader(state, "02", "Part 2: Lowercase A–Z Tracing")}
    ${sectionTitle("小寫字母 A–Z 雙欄描紅")}
    <div class="lab-ws-split"><div>${left}</div><div>${right}</div></div>
  `);
}

function renderPage3(state: WorksheetRenderState): string {
  const wordCols = [25, 275, 525];
  const upperCols = [25, 410];
  const row = (text: string, cols: number[]) =>
    createCalligraphyRowSVG(state, { sampleText: text, customColumns: cols });

  return pageShell(`
    ${createPageHeader(state, "03", "Part 3: Uppercase & Words")}
    ${sectionTitle("3. 大寫字母與數字")}
    ${row("A  B  C  D  E  F  G", upperCols)}
    ${row("H  I  J  K  L  M  N", upperCols)}
    ${row("O  P  Q  R  S  T  U", upperCols)}
    ${row("V  W  X  Y  Z", upperCols)}
    ${row("0  1  2  3  4  5  6  7  8  9", upperCols)}
    ${sectionTitle("4. 常用連句與詞彙")}
    ${row("minimum", wordCols)}
    ${row("calligraphy", wordCols)}
    ${row("beautiful", wordCols)}
    ${row("creative", wordCols)}
    ${sectionTitle("5. 空白自主練習列")}
    ${createCalligraphyRowSVG(state, { sampleText: "", showDemo: false })}
    ${createCalligraphyRowSVG(state, { sampleText: "", showDemo: false })}
    ${createCalligraphyRowSVG(state, { sampleText: "", showDemo: false })}
  `);
}

function renderWarmup(state: WorksheetRenderState): string {
  return pageShell(`
    ${createPageHeader(state, "Warm-Up", "Flourishing & Stroke Control")}
    ${sectionTitle("肌肉記憶與暖手線條")}
    <p class="lab-ws-caption">1. 上環與下環連綿</p>
    ${createWarmupFlourishSVG(state, "loops-up")}
    ${createWarmupFlourishSVG(state, "loops-up")}
    <p class="lab-ws-caption">2. 8 字迴旋</p>
    ${createWarmupFlourishSVG(state, "figure-8")}
    ${createWarmupFlourishSVG(state, "figure-8")}
    <p class="lab-ws-caption">3. 壓筆與提筆波浪</p>
    ${createWarmupFlourishSVG(state, "waves")}
    ${createWarmupFlourishSVG(state, "waves")}
  `);
}

function renderQuotes(state: WorksheetRenderState): string {
  const quotes = [
    "Practice Makes Perfect",
    "Stay Hungry Stay Foolish",
    "Create Beautiful Things",
    "Art is Eternal Life",
    "Patience and Passion",
  ];
  const rows = quotes
    .map((q) =>
      createCalligraphyRowSVG(state, {
        sampleText: q,
        traceCount: 1,
        showDemo: true,
      }),
    )
    .join("");

  return pageShell(`
    ${createPageHeader(state, "Quotes", "Calligraphy Quotes")}
    ${sectionTitle("經典名言臨摹")}
    ${rows}
    ${createCalligraphyRowSVG(state, { sampleText: "", showDemo: false })}
    ${createCalligraphyRowSVG(state, { sampleText: "", showDemo: false })}
  `);
}

function renderCustom(state: WorksheetRenderState): string {
  const rows = state.customText
    .map((text) =>
      createCalligraphyRowSVG(state, {
        sampleText: text,
        traceCount: 3,
        showDemo: true,
      }),
    )
    .join("");

  return pageShell(`
    ${createPageHeader(state, "Custom", "Custom Worksheet")}
    ${sectionTitle("自訂練習內容")}
    ${rows}
    ${createCalligraphyRowSVG(state, { sampleText: "", showDemo: false })}
    ${createCalligraphyRowSVG(state, { sampleText: "", showDemo: false })}
    ${createCalligraphyRowSVG(state, { sampleText: "", showDemo: false })}
  `);
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
