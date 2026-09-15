import {
  getModernLowerGlyph,
  modernLowerGlyphs,
  modernLowerLetters,
} from "@/data/glyphs/modernLower";
import { ribbonPath } from "@/data/glyphs/ribbon";
import {
  GLYPH_METRICS,
  type LetterGlyph,
} from "@/data/glyphs/types";

export {
  GLYPH_METRICS,
  getModernLowerGlyph,
  modernLowerGlyphs,
  modernLowerLetters,
  ribbonPath,
};
export type { LetterGlyph };

export function getLetterGlyph(letter: string): LetterGlyph | undefined {
  if (letter.length !== 1) return undefined;
  if (letter >= "a" && letter <= "z") {
    return getModernLowerGlyph(letter);
  }
  // Capitals come later as modernUpper/<Letter>.ts
  return undefined;
}

export function glyphRibbonPaths(glyph: LetterGlyph): string[] {
  return glyph.strokes.map((stroke) => ribbonPath(stroke.points));
}
