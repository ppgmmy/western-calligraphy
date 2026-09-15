import type { LetterGlyph } from "@/data/glyphs/types";

/** Modern pointed-pen minuscule `j` — edit this file only to retune the letter. */
export const glyph_j: LetterGlyph = {
  letter: "j",
  case: "lower",
  family: "descender",
  advance: 24,
  strokes: [
    {
      id: "desc",
      order: 1,
      kind: "shade",
      points: [
      { x: 12, y: 40, r: 0.55 },
      { x: 9.32, y: 43.83, r: 0.7 },
      { x: 6.63, y: 47.67, r: 0.85 },
      { x: 3.95, y: 51.5, r: 1 },
      { x: 1.27, y: 55.33, r: 1.15 },
      { x: -1.42, y: 59.17, r: 1.3 },
      { x: -4.1, y: 63, r: 1.45 },
      { x: -6.78, y: 66.83, r: 1.6 },
      { x: -9.47, y: 70.67, r: 1.75 },
      { x: -12.15, y: 74.5, r: 1.9 },
      { x: -14.83, y: 78.33, r: 2.05 },
      { x: -17.52, y: 82.17, r: 2.2 },
      { x: -20.2, y: 86, r: 2.35 },
      { x: 44.2, y: 86, r: 2.35 },
      { x: 33.69, y: 87.44, r: 2.17 },
      { x: 24.98, y: 88.18, r: 1.99 },
      { x: 17.97, y: 88.21, r: 1.81 },
      { x: 12.52, y: 87.57, r: 1.63 },
      { x: 8.52, y: 86.25, r: 1.45 },
      { x: 5.85, y: 84.27, r: 1.27 },
      { x: 4.39, y: 81.65, r: 1.09 },
      { x: 4, y: 78.38, r: 0.91 },
      { x: 4.58, y: 74.5, r: 0.73 },
      { x: 6, y: 70, r: 0.55 }
      ],
    },
    {
      id: "dot",
      order: 2,
      kind: "dot",
      points: [
      { x: 14, y: 21, r: 1.25 },
      { x: 15.2, y: 19.5, r: 1.1 },
      { x: 14, y: 21, r: 1.25 }
      ],
    }
  ],
};
