import type { LetterGlyph } from "@/data/glyphs/types";
import { glyph_a } from "@/data/glyphs/modernLower/a";
import { glyph_b } from "@/data/glyphs/modernLower/b";
import { glyph_c } from "@/data/glyphs/modernLower/c";
import { glyph_d } from "@/data/glyphs/modernLower/d";
import { glyph_e } from "@/data/glyphs/modernLower/e";
import { glyph_f } from "@/data/glyphs/modernLower/f";
import { glyph_g } from "@/data/glyphs/modernLower/g";
import { glyph_h } from "@/data/glyphs/modernLower/h";
import { glyph_i } from "@/data/glyphs/modernLower/i";
import { glyph_j } from "@/data/glyphs/modernLower/j";
import { glyph_k } from "@/data/glyphs/modernLower/k";
import { glyph_l } from "@/data/glyphs/modernLower/l";
import { glyph_m } from "@/data/glyphs/modernLower/m";
import { glyph_n } from "@/data/glyphs/modernLower/n";
import { glyph_o } from "@/data/glyphs/modernLower/o";
import { glyph_p } from "@/data/glyphs/modernLower/p";
import { glyph_q } from "@/data/glyphs/modernLower/q";
import { glyph_r } from "@/data/glyphs/modernLower/r";
import { glyph_s } from "@/data/glyphs/modernLower/s";
import { glyph_t } from "@/data/glyphs/modernLower/t";
import { glyph_u } from "@/data/glyphs/modernLower/u";
import { glyph_v } from "@/data/glyphs/modernLower/v";
import { glyph_w } from "@/data/glyphs/modernLower/w";
import { glyph_x } from "@/data/glyphs/modernLower/x";
import { glyph_y } from "@/data/glyphs/modernLower/y";
import { glyph_z } from "@/data/glyphs/modernLower/z";

/** a–z modern pointed-pen glyphs (one module per letter). */
export const modernLowerGlyphs: Record<string, LetterGlyph> = {
  a: glyph_a,
  b: glyph_b,
  c: glyph_c,
  d: glyph_d,
  e: glyph_e,
  f: glyph_f,
  g: glyph_g,
  h: glyph_h,
  i: glyph_i,
  j: glyph_j,
  k: glyph_k,
  l: glyph_l,
  m: glyph_m,
  n: glyph_n,
  o: glyph_o,
  p: glyph_p,
  q: glyph_q,
  r: glyph_r,
  s: glyph_s,
  t: glyph_t,
  u: glyph_u,
  v: glyph_v,
  w: glyph_w,
  x: glyph_x,
  y: glyph_y,
  z: glyph_z,
};

export function getModernLowerGlyph(letter: string): LetterGlyph | undefined {
  return modernLowerGlyphs[letter.toLowerCase()];
}

export const modernLowerLetters = Object.keys(modernLowerGlyphs);
