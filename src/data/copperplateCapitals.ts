/**
 * Copperplate Capitals — identified by pointed-pen CONSTRUCTION, not a font.
 *
 * June-style Copperplate Majuscules are handwritten Engrosser's / Copperplate
 * capitals. Distinguishing traits (not typeface names):
 *   1. ~55° right slant
 *   2. Oval (not circle) as the governing shape
 *   3. Shade = weighted downstroke; hair = pressure-release upstroke
 *   4. Entrance oval / exit flourish attached to a readable skeleton
 *
 * Each letter is a numbered ductus (stroke order). Paths are open pen tracks
 * for teaching — not filled “font outlines”.
 */

export type StrokeRole = "shade" | "hair";

export type CapitalStroke = {
  order: number;
  role: StrokeRole;
  /** Open path in viewBox 0–100 × 0–120 (baseline ≈ 88) */
  d: string;
};

export type CopperplateFamily =
  | "oval-entry" // A C E G O Q S …
  | "stem-loop" // B D F H I J K L P R T …
  | "compound"; // M N U V W X Y Z …

export type CopperplateCapital = {
  letter: string;
  family: CopperplateFamily;
  strokes: CapitalStroke[];
  tipZh: string;
};

export const COPPERPLATE_CAPITAL_VB = { w: 100, h: 120 } as const;

export const COPPERPLATE_STYLE_DNA = [
  { id: "slant", labelZh: "約 55° 右斜", labelEn: "55° slant" },
  { id: "oval", labelZh: "橢圓主宰", labelEn: "Oval-led" },
  { id: "shade", labelZh: "下行加壓＝陰影", labelEn: "Shade down" },
  { id: "hair", labelZh: "上行放壓＝髮絲", labelEn: "Hair up" },
] as const;

/** Representative majuscules with teaching ductus (A–Z). */
export const COPPERPLATE_CAPITALS: Record<string, CopperplateCapital> = {
  A: {
    letter: "A",
    family: "oval-entry",
    tipZh: "先畫左入口橢圓，再落右陰影幹，最後輕架橫畫。",
    strokes: [
      { order: 1, role: "hair", d: "M 28 92 C 12 78, 10 36, 32 28 C 46 22, 56 40, 54 58" },
      { order: 2, role: "shade", d: "M 54 34 L 62 90" },
      { order: 3, role: "hair", d: "M 36 64 L 60 64" },
      { order: 4, role: "hair", d: "M 62 90 C 70 102, 84 92, 76 78" },
    ],
  },
  B: {
    letter: "B",
    family: "stem-loop",
    tipZh: "主幹陰影垂直斜下；上下兩葉由髮絲橢圓接回主幹。",
    strokes: [
      { order: 1, role: "hair", d: "M 34 30 C 18 16, 10 40, 28 52" },
      { order: 2, role: "shade", d: "M 34 28 L 36 92" },
      { order: 3, role: "hair", d: "M 36 30 C 68 18, 78 48, 36 56" },
      { order: 4, role: "hair", d: "M 36 56 C 74 54, 82 86, 36 92" },
    ],
  },
  C: {
    letter: "C",
    family: "oval-entry",
    tipZh: "整字是打開的橢圓；開口處兩端用髮絲收。",
    strokes: [
      { order: 1, role: "shade", d: "M 72 38 C 58 16, 22 22, 24 60 C 26 92, 58 104, 74 82" },
      { order: 2, role: "hair", d: "M 72 38 C 82 48, 78 60, 66 64" },
      { order: 3, role: "hair", d: "M 74 82 C 84 70, 78 60, 66 62" },
    ],
  },
  D: {
    letter: "D",
    family: "stem-loop",
    tipZh: "左幹陰影 + 右大橢圓葉；入口小環用髮絲。",
    strokes: [
      { order: 1, role: "hair", d: "M 32 28 C 16 14, 8 42, 26 54" },
      { order: 2, role: "shade", d: "M 32 26 L 34 92" },
      { order: 3, role: "hair", d: "M 34 28 C 78 16, 90 58, 34 92" },
    ],
  },
  E: {
    letter: "E",
    family: "oval-entry",
    tipZh: "如打開的 C，中腰加一筆輕橫連接橢圓氣口。",
    strokes: [
      { order: 1, role: "shade", d: "M 70 40 C 56 16, 20 24, 22 60 C 24 90, 56 104, 74 80" },
      { order: 2, role: "hair", d: "M 26 60 L 58 60" },
      { order: 3, role: "hair", d: "M 70 40 C 80 50, 76 62, 64 66" },
      { order: 4, role: "hair", d: "M 74 80 C 84 68, 78 58, 66 60" },
    ],
  },
  F: {
    letter: "F",
    family: "stem-loop",
    tipZh: "頂蓋是波浪橢圓冠；主幹陰影；中腰短橫。",
    strokes: [
      { order: 1, role: "hair", d: "M 18 48 C 14 22, 36 10, 60 18 C 82 26, 84 52, 62 60 C 50 64, 44 54, 42 44" },
      { order: 2, role: "shade", d: "M 44 44 L 48 94" },
      { order: 3, role: "hair", d: "M 40 66 L 64 60" },
      { order: 4, role: "hair", d: "M 48 94 C 58 106, 74 94, 66 78" },
    ],
  },
  G: {
    letter: "G",
    family: "oval-entry",
    tipZh: "C 形橢圓 + 右下垂尾；尾部可帶小出口環。",
    strokes: [
      { order: 1, role: "shade", d: "M 70 40 C 56 16, 20 24, 22 60 C 24 92, 58 106, 74 84" },
      { order: 2, role: "hair", d: "M 74 84 L 74 58 L 56 58" },
      { order: 3, role: "hair", d: "M 74 84 C 86 100, 58 116, 34 100 C 20 90, 26 74, 40 76" },
    ],
  },
  H: {
    letter: "H",
    family: "stem-loop",
    tipZh: "雙陰影幹，中間髮絲橋；兩端入口／出口環。",
    strokes: [
      { order: 1, role: "hair", d: "M 30 30 C 14 14, 6 42, 24 56" },
      { order: 2, role: "shade", d: "M 30 28 L 32 94" },
      { order: 3, role: "hair", d: "M 32 62 L 64 62" },
      { order: 4, role: "shade", d: "M 64 36 L 66 94" },
      { order: 5, role: "hair", d: "M 64 36 C 80 20, 90 48, 70 60" },
      { order: 6, role: "hair", d: "M 66 94 C 78 108, 92 92, 82 76" },
    ],
  },
  I: {
    letter: "I",
    family: "stem-loop",
    tipZh: "單陰影幹；上下入口與出口橢圓環對稱呼吸。",
    strokes: [
      { order: 1, role: "hair", d: "M 50 36 C 32 12, 10 36, 30 58 C 38 68, 50 56, 52 42" },
      { order: 2, role: "shade", d: "M 50 38 L 52 92" },
      { order: 3, role: "hair", d: "M 52 92 C 64 108, 86 90, 72 72" },
    ],
  },
  J: {
    letter: "J",
    family: "stem-loop",
    tipZh: "陰影幹下探成下延環；頂部入口橢圓。",
    strokes: [
      { order: 1, role: "hair", d: "M 58 32 C 40 10, 16 36, 36 56 C 44 64, 58 52, 60 40" },
      { order: 2, role: "shade", d: "M 58 34 L 58 78 C 58 102, 26 112, 18 86" },
      { order: 3, role: "hair", d: "M 18 86 C 14 72, 32 68, 38 80" },
    ],
  },
  K: {
    letter: "K",
    family: "stem-loop",
    tipZh: "主幹陰影；上臂與下腿皆由髮絲斜接，下腿可略加重。",
    strokes: [
      { order: 1, role: "hair", d: "M 30 28 C 14 12, 6 40, 24 54" },
      { order: 2, role: "shade", d: "M 30 26 L 32 94" },
      { order: 3, role: "hair", d: "M 70 28 C 78 16, 88 36, 74 48 L 36 64" },
      { order: 4, role: "shade", d: "M 40 60 L 72 96" },
      { order: 5, role: "hair", d: "M 72 96 C 82 110, 96 94, 84 78" },
    ],
  },
  L: {
    letter: "L",
    family: "stem-loop",
    tipZh: "主幹陰影；底部大出口橢圓向右 sweep。",
    strokes: [
      { order: 1, role: "hair", d: "M 36 28 C 18 6, 2 40, 26 60 C 34 68, 40 52, 38 36" },
      { order: 2, role: "shade", d: "M 36 30 L 38 88" },
      { order: 3, role: "hair", d: "M 38 88 C 52 108, 90 100, 86 64 C 84 50, 68 54, 66 68 C 64 86, 48 90, 40 84" },
    ],
  },
  M: {
    letter: "M",
    family: "compound",
    tipZh: "三幹：左右陰影，中峰可較輕；峰谷用髮絲連。",
    strokes: [
      { order: 1, role: "hair", d: "M 20 34 C 8 16, 0 44, 16 58" },
      { order: 2, role: "shade", d: "M 20 32 L 22 94" },
      { order: 3, role: "hair", d: "M 22 36 L 48 84" },
      { order: 4, role: "shade", d: "M 48 84 L 50 94" },
      { order: 5, role: "hair", d: "M 50 84 L 76 36" },
      { order: 6, role: "shade", d: "M 76 34 L 78 94" },
      { order: 7, role: "hair", d: "M 76 34 C 90 16, 98 46, 80 60" },
    ],
  },
  N: {
    letter: "N",
    family: "compound",
    tipZh: "雙幹陰影，中間斜髮絲由左頂落到右底。",
    strokes: [
      { order: 1, role: "hair", d: "M 24 32 C 10 14, 2 42, 20 56" },
      { order: 2, role: "shade", d: "M 24 30 L 26 94" },
      { order: 3, role: "hair", d: "M 26 34 L 70 92" },
      { order: 4, role: "shade", d: "M 68 36 L 70 94" },
      { order: 5, role: "hair", d: "M 68 36 C 84 18, 94 46, 74 60" },
    ],
  },
  O: {
    letter: "O",
    family: "oval-entry",
    tipZh: "完整橢圓；右上可留髮絲入口觸角。",
    strokes: [
      { order: 1, role: "shade", d: "M 68 42 C 58 18, 24 24, 22 62 C 20 94, 52 110, 74 84 C 86 68, 82 50, 68 42" },
      { order: 2, role: "hair", d: "M 68 42 C 78 50, 74 64, 62 68" },
    ],
  },
  P: {
    letter: "P",
    family: "stem-loop",
    tipZh: "主幹貫底；上葉橢圓在腰線收回，勿封死成 B。",
    strokes: [
      { order: 1, role: "hair", d: "M 32 28 C 16 12, 6 40, 24 54" },
      { order: 2, role: "shade", d: "M 32 26 L 34 96" },
      { order: 3, role: "hair", d: "M 34 28 C 72 12, 84 48, 34 62" },
      { order: 4, role: "hair", d: "M 34 96 C 44 110, 62 96, 52 80" },
    ],
  },
  Q: {
    letter: "Q",
    family: "oval-entry",
    tipZh: "O 形橢圓 + 右下「2」字尾；尾是識別點。",
    strokes: [
      { order: 1, role: "shade", d: "M 68 42 C 58 18, 24 24, 22 62 C 20 94, 52 110, 74 84 C 86 68, 82 50, 68 42" },
      { order: 2, role: "hair", d: "M 56 78 C 68 90, 88 108, 92 94 C 94 86, 78 82, 70 90" },
    ],
  },
  R: {
    letter: "R",
    family: "stem-loop",
    tipZh: "如 P 之上葉，再加右下斜腿陰影。",
    strokes: [
      { order: 1, role: "hair", d: "M 30 28 C 14 12, 4 40, 22 54" },
      { order: 2, role: "shade", d: "M 30 26 L 32 96" },
      { order: 3, role: "hair", d: "M 32 28 C 68 12, 80 46, 32 60" },
      { order: 4, role: "shade", d: "M 40 58 L 74 96" },
      { order: 5, role: "hair", d: "M 74 96 C 84 110, 98 92, 86 76" },
    ],
  },
  S: {
    letter: "S",
    family: "oval-entry",
    tipZh: "上下兩個反向橢圓相接；粗細在轉折處交換。",
    strokes: [
      { order: 1, role: "shade", d: "M 70 36 C 58 14, 22 20, 24 44 C 26 60, 52 64, 62 74 C 74 86, 62 104, 36 98 C 22 94, 18 80, 28 76" },
      { order: 2, role: "hair", d: "M 70 36 C 80 44, 76 58, 64 62" },
      { order: 3, role: "hair", d: "M 28 76 C 18 66, 30 60, 38 70" },
    ],
  },
  T: {
    letter: "T",
    family: "stem-loop",
    tipZh: "波浪頂冠 + 中軸陰影幹；底部出口環。",
    strokes: [
      { order: 1, role: "hair", d: "M 14 48 C 10 20, 36 8, 62 16 C 84 24, 88 52, 66 60 C 52 66, 46 54, 48 44" },
      { order: 2, role: "shade", d: "M 48 44 L 50 94" },
      { order: 3, role: "hair", d: "M 50 94 C 60 110, 80 94, 68 76" },
    ],
  },
  U: {
    letter: "U",
    family: "compound",
    tipZh: "左幹下探接右幹；底部是寬橢圓彎。",
    strokes: [
      { order: 1, role: "hair", d: "M 28 30 C 12 12, 4 42, 22 56" },
      { order: 2, role: "shade", d: "M 28 32 L 28 70 C 28 94, 64 102, 74 72" },
      { order: 3, role: "shade", d: "M 74 34 L 74 70" },
      { order: 4, role: "hair", d: "M 74 34 C 90 16, 98 44, 78 58" },
    ],
  },
  V: {
    letter: "V",
    family: "compound",
    tipZh: "左髮絲斜下、右陰影斜下，交於底尖。",
    strokes: [
      { order: 1, role: "hair", d: "M 24 30 C 10 14, 2 40, 18 54" },
      { order: 2, role: "hair", d: "M 24 34 L 48 94" },
      { order: 3, role: "shade", d: "M 76 30 L 48 94" },
      { order: 4, role: "hair", d: "M 76 30 C 90 14, 98 42, 80 56" },
    ],
  },
  W: {
    letter: "W",
    family: "compound",
    tipZh: "雙 V 相連；內谷勿高過外肩。",
    strokes: [
      { order: 1, role: "hair", d: "M 14 30 C 4 16, -2 40, 12 52" },
      { order: 2, role: "shade", d: "M 16 34 L 30 94" },
      { order: 3, role: "hair", d: "M 30 94 L 48 40" },
      { order: 4, role: "shade", d: "M 48 40 L 64 94" },
      { order: 5, role: "hair", d: "M 64 94 L 84 34" },
      { order: 6, role: "hair", d: "M 84 30 C 96 14, 102 42, 86 56" },
    ],
  },
  X: {
    letter: "X",
    family: "compound",
    tipZh: "兩斜交叉；交叉點接近字心，四端可帶小環。",
    strokes: [
      { order: 1, role: "shade", d: "M 24 30 L 74 96" },
      { order: 2, role: "hair", d: "M 74 30 L 24 96" },
      { order: 3, role: "hair", d: "M 24 30 C 12 14, 4 40, 20 52" },
      { order: 4, role: "hair", d: "M 74 30 C 88 14, 96 40, 78 54" },
      { order: 5, role: "hair", d: "M 74 96 C 86 112, 98 94, 86 78" },
      { order: 6, role: "hair", d: "M 24 96 C 12 112, 2 92, 16 78" },
    ],
  },
  Y: {
    letter: "Y",
    family: "compound",
    tipZh: "上分叉接中軸下延；下延可加出口環。",
    strokes: [
      { order: 1, role: "hair", d: "M 22 30 C 10 14, 2 40, 18 52" },
      { order: 2, role: "hair", d: "M 22 34 L 48 70" },
      { order: 3, role: "shade", d: "M 78 30 L 48 70" },
      { order: 4, role: "shade", d: "M 48 70 L 48 98" },
      { order: 5, role: "hair", d: "M 78 30 C 92 14, 100 42, 82 56" },
      { order: 6, role: "hair", d: "M 48 98 C 58 114, 78 98, 66 80" },
    ],
  },
  Z: {
    letter: "Z",
    family: "compound",
    tipZh: "上下橫用波浪髮絲；中斜可略加陰影；底部常帶大環。",
    strokes: [
      { order: 1, role: "hair", d: "M 24 34 C 36 20, 64 22, 76 36" },
      { order: 2, role: "shade", d: "M 72 38 L 30 86" },
      { order: 3, role: "hair", d: "M 28 84 C 44 76, 70 84, 78 98 C 86 110, 64 118, 48 108 C 36 100, 40 88, 52 88" },
    ],
  },
};

export function getCopperplateCapital(
  letter: string,
): CopperplateCapital | undefined {
  return COPPERPLATE_CAPITALS[letter.toUpperCase()];
}

export function listCopperplateCapitals(): CopperplateCapital[] {
  return "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    .split("")
    .map((letter) => COPPERPLATE_CAPITALS[letter])
    .filter((item): item is CopperplateCapital => Boolean(item));
}
