import type { LetterGlyph } from "@/data/glyphs/types";

/** Modern pointed-pen minuscule `t` — edit this file only to retune the letter. */
export const glyph_t: LetterGlyph = {
  letter: "t",
  case: "lower",
  family: "ascender",
  advance: 26,
  strokes: [
    {
      id: "stem",
      order: 1,
      kind: "shade",
      points: [
      { x: 12, y: 26, r: 0.55 },
      { x: 9.78, y: 29.17, r: 0.7 },
      { x: 7.57, y: 32.33, r: 0.85 },
      { x: 5.35, y: 35.5, r: 1 },
      { x: 3.13, y: 38.67, r: 1.15 },
      { x: 0.92, y: 41.83, r: 1.3 },
      { x: -1.3, y: 45, r: 1.45 },
      { x: -3.52, y: 48.17, r: 1.6 },
      { x: -5.73, y: 51.33, r: 1.75 },
      { x: -7.95, y: 54.5, r: 1.9 },
      { x: -10.17, y: 57.67, r: 2.05 },
      { x: -12.38, y: 60.83, r: 2.2 },
      { x: -14.6, y: 64, r: 2.35 },
      { x: 38.6, y: 64, r: 2.35 },
      { x: 40.2, y: 64.24, r: 1.99 },
      { x: 41.8, y: 64.16, r: 1.63 },
      { x: 43.4, y: 63.76, r: 1.27 },
      { x: 45, y: 63.04, r: 0.91 },
      { x: 46.6, y: 62, r: 0.55 }
      ],
    },
    {
      id: "bar",
      order: 2,
      kind: "hair",
      points: [
      { x: 6, y: 36, r: 0.55 },
      { x: 20, y: 34, r: 0.55 },
      { x: 28, y: 37, r: 0.55 }
      ],
    }
  ],
};
