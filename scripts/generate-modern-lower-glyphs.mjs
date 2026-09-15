/**
 * One-shot generator for modernLower glyph letter files.
 * Run: node scripts/generate-modern-lower-glyphs.mjs
 */
import fs from "node:fs";
import path from "node:path";

const dir = path.resolve("src/data/glyphs/modernLower");
fs.mkdirSync(dir, { recursive: true });

const H = 0.55;
const S = 2.35;
const BASE = 64;
const XH = 38;
const ASC = 14;
const DESC = 90;

function pts(arr) {
  return arr.map(([x, y, r]) => ({
    x: +Number(x).toFixed(2),
    y: +Number(y).toFixed(2),
    r: +Number(r).toFixed(2),
  }));
}

function quad(x0, y0, r0, cx, cy, x1, y1, r1, steps = 10) {
  const out = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const u = 1 - t;
    out.push({
      x: +(u * u * x0 + 2 * u * t * cx + t * t * x1).toFixed(2),
      y: +(u * u * y0 + 2 * u * t * cy + t * t * y1).toFixed(2),
      r: +(r0 + (r1 - r0) * t).toFixed(2),
    });
  }
  return out;
}

function cubic(x0, y0, r0, c1x, c1y, c2x, c2y, x1, y1, r1, steps = 12) {
  const out = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const u = 1 - t;
    out.push({
      x: +(
        u * u * u * x0 +
        3 * u * u * t * c1x +
        3 * u * t * t * c2x +
        t * t * t * x1
      ).toFixed(2),
      y: +(
        u * u * u * y0 +
        3 * u * u * t * c1y +
        3 * u * t * t * c2y +
        t * t * t * y1
      ).toFixed(2),
      r: +(r0 + (r1 - r0) * t).toFixed(2),
    });
  }
  return out;
}

function join(...segs) {
  const out = [];
  for (const seg of segs) {
    for (const p of seg) {
      if (
        !out.length ||
        Math.hypot(out[out.length - 1].x - p.x, out[out.length - 1].y - p.y) >
          0.35
      ) {
        out.push(p);
      }
    }
  }
  return out;
}

function slantDown(x, y0, y1, r0, r1, steps = 8) {
  const dy = y1 - y0;
  // Forward slash slant "/": downstroke moves left as it descends.
  const dx = dy * -0.7;
  return pts(
    Array.from({ length: steps + 1 }, (_, i) => {
      const t = i / steps;
      return [x + dx * t, y0 + dy * t, r0 + (r1 - r0) * t];
    }),
  );
}

function slantUp(x, y0, y1, r0, r1, steps = 8) {
  const dy = y1 - y0;
  const dx = dy * -0.7;
  return pts(
    Array.from({ length: steps + 1 }, (_, i) => {
      const t = i / steps;
      return [x + dx * t, y0 + dy * t, r0 + (r1 - r0) * t];
    }),
  );
}

function ovalOC(cx, cy, rx, ry, start = 0.05, end = 1.05) {
  const steps = 18;
  const out = [];
  for (let i = 0; i <= steps; i += 1) {
    const t = start + (end - start) * (i / steps);
    const ang = t * Math.PI * 2;
    const lx = Math.cos(ang) * rx;
    const ly = Math.sin(ang) * ry;
    // Shear matches forward "/" slant (negate previous wrong lean).
    const x = cx + lx + ly * -0.55;
    const y = cy + ly;
    const thick = lx < -1 && ly > 0 ? S : lx < 0 ? S * 0.8 : H;
    out.push({
      x: +x.toFixed(2),
      y: +y.toFixed(2),
      r: +thick.toFixed(2),
    });
  }
  return out;
}

function exitHair(x, y) {
  return quad(x, y, S, x + 4, y + 1, x + 8, y - 2, H, 5);
}

const glyphs = {};

glyphs.i = {
  letter: "i",
  case: "lower",
  family: "arch",
  advance: 22,
  note: "stem + tittle",
  strokes: [
    {
      id: "stem",
      order: 1,
      kind: "shade",
      points: join(
        pts([[8, XH + 2, H]]),
        slantDown(8, XH + 2, BASE, H, S, 10),
        exitHair(8 + (BASE - (XH + 2)) * 0.7, BASE),
      ),
    },
    {
      id: "dot",
      order: 2,
      kind: "dot",
      points: pts([
        [11, ASC + 7, 1.25],
        [12.2, ASC + 5.5, 1.1],
        [11, ASC + 7, 1.25],
      ]),
    },
  ],
};

glyphs.u = {
  letter: "u",
  case: "lower",
  family: "arch",
  advance: 34,
  strokes: [
    {
      id: "body",
      order: 1,
      kind: "shade",
      points: join(
        pts([[6, XH, H]]),
        slantDown(6, XH, BASE, H, S, 8),
        cubic(
          6 + (BASE - XH) * 0.7,
          BASE,
          S,
          12,
          BASE + 2,
          18,
          BASE + 2,
          22,
          BASE,
          S,
          8,
        ),
        slantUp(22, BASE, XH, S, H, 8),
        pts([
          [22 + (XH - BASE) * 0.7, XH, H],
          [28, XH + 4, H],
        ]),
      ),
    },
  ],
};

glyphs.n = {
  letter: "n",
  case: "lower",
  family: "arch",
  advance: 34,
  strokes: [
    {
      id: "body",
      order: 1,
      kind: "shade",
      points: join(
        pts([[6, XH - 1, H]]),
        slantDown(6, XH - 1, BASE, H, S, 8),
        slantUp(6 + (BASE - (XH - 1)) * 0.7, BASE, XH, H, H, 6),
        cubic(6, XH, H, 12, XH - 6, 20, XH - 4, 24, XH + 2, H, 8),
        slantDown(24, XH + 2, BASE, H, S, 8),
        exitHair(24 + (BASE - (XH + 2)) * 0.7, BASE),
      ),
    },
  ],
};

glyphs.m = {
  letter: "m",
  case: "lower",
  family: "arch",
  advance: 48,
  strokes: [
    {
      id: "body",
      order: 1,
      kind: "shade",
      points: join(
        pts([[5, XH - 1, H]]),
        slantDown(5, XH - 1, BASE, H, S, 7),
        slantUp(5 + (BASE - (XH - 1)) * 0.7, BASE, XH, H, H, 5),
        cubic(5, XH, H, 10, XH - 6, 16, XH - 4, 20, XH + 2, H, 7),
        slantDown(20, XH + 2, BASE, H, S, 7),
        slantUp(20 + (BASE - (XH + 2)) * 0.7, BASE, XH, H, H, 5),
        cubic(20, XH, H, 26, XH - 6, 32, XH - 4, 36, XH + 2, H, 7),
        slantDown(36, XH + 2, BASE, H, S, 7),
        exitHair(36 + (BASE - (XH + 2)) * 0.7, BASE),
      ),
    },
  ],
};

glyphs.v = {
  letter: "v",
  case: "lower",
  family: "arch",
  advance: 30,
  strokes: [
    {
      id: "body",
      order: 1,
      kind: "shade",
      points: join(
        pts([[6, XH, H]]),
        slantDown(6, XH, BASE - 2, H, S, 8),
        cubic(
          6 + (BASE - 2 - XH) * 0.7,
          BASE - 2,
          S,
          12,
          BASE + 3,
          18,
          BASE + 2,
          24,
          XH,
          H,
          10,
        ),
      ),
    },
  ],
};

glyphs.w = {
  letter: "w",
  case: "lower",
  family: "arch",
  advance: 42,
  strokes: [
    {
      id: "body",
      order: 1,
      kind: "shade",
      points: join(
        pts([[5, XH, H]]),
        slantDown(5, XH, BASE - 2, H, S, 6),
        cubic(
          5 + (BASE - 2 - XH) * 0.7,
          BASE - 2,
          S,
          10,
          BASE + 2,
          14,
          BASE + 1,
          17,
          XH + 4,
          H,
          7,
        ),
        slantDown(17, XH + 4, BASE - 2, H, S, 6),
        cubic(
          17 + (BASE - 2 - (XH + 4)) * 0.7,
          BASE - 2,
          S,
          24,
          BASE + 2,
          30,
          BASE + 1,
          36,
          XH,
          H,
          8,
        ),
      ),
    },
  ],
};

glyphs.o = {
  letter: "o",
  case: "lower",
  family: "oval",
  advance: 30,
  strokes: [
    {
      id: "oval",
      order: 1,
      kind: "oval",
      points: ovalOC(16, (XH + BASE) / 2, 11, 12.5),
    },
  ],
};

glyphs.c = {
  letter: "c",
  case: "lower",
  family: "oval",
  advance: 28,
  strokes: [
    {
      id: "open-oval",
      order: 1,
      kind: "oval",
      points: ovalOC(15, (XH + BASE) / 2, 11, 12.5, 0.72, 1.55),
    },
  ],
};

glyphs.e = {
  letter: "e",
  case: "lower",
  family: "ascender",
  advance: 28,
  strokes: [
    {
      id: "eye",
      order: 1,
      kind: "shade",
      points: join(
        pts([[8, 52, H]]),
        cubic(8, 52, H, 12, XH + 2, 20, XH, 24, 48, H, 8),
        cubic(24, 48, H, 26, 56, 22, BASE + 1, 14, BASE - 1, S, 8),
        cubic(14, BASE - 1, S, 8, 58, 7, 48, 12, 44, H, 7),
      ),
    },
  ],
};

glyphs.a = {
  letter: "a",
  case: "lower",
  family: "oval",
  advance: 32,
  strokes: [
    {
      id: "oval",
      order: 1,
      kind: "oval",
      points: ovalOC(14, (XH + BASE) / 2, 10.5, 12.2),
    },
    {
      id: "stem",
      order: 2,
      kind: "shade",
      points: join(
        pts([[22, XH + 1, H]]),
        slantDown(22, XH + 1, BASE, H, S, 8),
        exitHair(22 + (BASE - (XH + 1)) * 0.7, BASE),
      ),
    },
  ],
};

glyphs.d = {
  letter: "d",
  case: "lower",
  family: "oval",
  advance: 34,
  strokes: [
    {
      id: "oval",
      order: 1,
      kind: "oval",
      points: ovalOC(14, (XH + BASE) / 2, 10.5, 12.2),
    },
    {
      id: "asc",
      order: 2,
      kind: "shade",
      points: join(
        pts([[22, ASC + 4, H]]),
        slantDown(22, ASC + 4, BASE, H, S, 14),
        exitHair(22 + (BASE - (ASC + 4)) * 0.7, BASE),
      ),
    },
  ],
};

glyphs.g = {
  letter: "g",
  case: "lower",
  family: "oval",
  advance: 32,
  strokes: [
    {
      id: "oval",
      order: 1,
      kind: "oval",
      points: ovalOC(14, (XH + BASE) / 2, 10.5, 12.2),
    },
    {
      id: "desc",
      order: 2,
      kind: "shade",
      points: join(
        pts([[22, XH + 2, H]]),
        slantDown(22, XH + 2, DESC - 4, H, S, 12),
        cubic(
          22 + (DESC - 4 - (XH + 2)) * 0.7,
          DESC - 4,
          S,
          16,
          DESC + 2,
          6,
          DESC - 2,
          10,
          BASE + 4,
          H,
          10,
        ),
      ),
    },
  ],
};

glyphs.q = {
  letter: "q",
  case: "lower",
  family: "oval",
  advance: 32,
  strokes: [
    {
      id: "oval",
      order: 1,
      kind: "oval",
      points: ovalOC(14, (XH + BASE) / 2, 10.5, 12.2),
    },
    {
      id: "desc",
      order: 2,
      kind: "shade",
      points: join(
        pts([[22, XH + 2, H]]),
        slantDown(22, XH + 2, DESC - 2, H, S, 12),
        quad(
          22 + (DESC - 2 - (XH + 2)) * 0.7,
          DESC - 2,
          S,
          30,
          DESC,
          34,
          DESC - 6,
          H,
          6,
        ),
      ),
    },
  ],
};

glyphs.l = {
  letter: "l",
  case: "lower",
  family: "ascender",
  advance: 24,
  strokes: [
    {
      id: "loop",
      order: 1,
      kind: "shade",
      points: join(
        pts([[10, ASC + 10, H]]),
        cubic(10, ASC + 10, H, 6, ASC, 14, ASC - 2, 18, ASC + 8, H, 8),
        slantDown(18, ASC + 8, BASE, H, S, 12),
        exitHair(18 + (BASE - (ASC + 8)) * 0.7, BASE),
      ),
    },
  ],
};

glyphs.b = {
  letter: "b",
  case: "lower",
  family: "ascender",
  advance: 32,
  strokes: [
    {
      id: "body",
      order: 1,
      kind: "shade",
      points: join(
        pts([[8, ASC + 8, H]]),
        cubic(8, ASC + 8, H, 4, ASC, 12, ASC - 2, 16, ASC + 8, H, 7),
        slantDown(16, ASC + 8, BASE, H, S, 12),
        cubic(
          16 + (BASE - (ASC + 8)) * 0.7,
          BASE,
          S,
          28,
          BASE + 2,
          32,
          50,
          26,
          XH + 2,
          H,
          10,
        ),
        cubic(26, XH + 2, H, 20, XH - 2, 14, XH + 4, 18, 52, H, 8),
      ),
    },
  ],
};

glyphs.h = {
  letter: "h",
  case: "lower",
  family: "ascender",
  advance: 34,
  strokes: [
    {
      id: "body",
      order: 1,
      kind: "shade",
      points: join(
        pts([[8, ASC + 8, H]]),
        cubic(8, ASC + 8, H, 4, ASC, 12, ASC - 2, 16, ASC + 8, H, 7),
        slantDown(16, ASC + 8, BASE, H, S, 12),
        slantUp(16 + (BASE - (ASC + 8)) * 0.7, BASE, XH, H, H, 6),
        cubic(16, XH, H, 22, XH - 6, 28, XH - 3, 30, XH + 3, H, 7),
        slantDown(30, XH + 3, BASE, H, S, 8),
        exitHair(30 + (BASE - (XH + 3)) * 0.7, BASE),
      ),
    },
  ],
};

glyphs.k = {
  letter: "k",
  case: "lower",
  family: "ascender",
  advance: 34,
  strokes: [
    {
      id: "stem",
      order: 1,
      kind: "shade",
      points: join(
        pts([[8, ASC + 8, H]]),
        cubic(8, ASC + 8, H, 4, ASC, 12, ASC - 2, 16, ASC + 8, H, 7),
        slantDown(16, ASC + 8, BASE, H, S, 12),
        exitHair(16 + (BASE - (ASC + 8)) * 0.7 * 0.2, BASE),
      ),
    },
    {
      id: "leg",
      order: 2,
      kind: "shade",
      points: join(
        pts([[18, 50, H]]),
        cubic(18, 50, H, 24, 44, 30, 42, 34, XH + 2, H, 7),
        cubic(34, XH + 2, H, 28, 52, 24, BASE - 2, 32, BASE, S, 8),
        exitHair(32, BASE),
      ),
    },
  ],
};

glyphs.t = {
  letter: "t",
  case: "lower",
  family: "ascender",
  advance: 26,
  strokes: [
    {
      id: "stem",
      order: 1,
      kind: "shade",
      points: join(
        pts([[12, ASC + 12, H]]),
        slantDown(12, ASC + 12, BASE, H, S, 12),
        exitHair(12 + (BASE - (ASC + 12)) * 0.7, BASE),
      ),
    },
    {
      id: "bar",
      order: 2,
      kind: "hair",
      points: pts([
        [6, XH - 2, H],
        [20, XH - 4, H],
        [28, XH - 1, H],
      ]),
    },
  ],
};

glyphs.f = {
  letter: "f",
  case: "lower",
  family: "ascender",
  advance: 30,
  strokes: [
    {
      id: "full",
      order: 1,
      kind: "shade",
      points: join(
        pts([[14, DESC - 6, H]]),
        cubic(14, DESC - 6, H, 6, DESC + 1, 4, BASE + 8, 12, BASE, H, 8),
        slantUp(12, BASE, ASC + 6, H, H, 10),
        cubic(
          12 + (ASC + 6 - BASE) * 0.7,
          ASC + 6,
          H,
          8,
          ASC - 2,
          18,
          ASC - 2,
          22,
          ASC + 10,
          H,
          8,
        ),
        slantDown(
          22,
          ASC + 10,
          XH + 2,
          H,
          S * 0.7,
          6,
        ),
      ),
    },
    {
      id: "bar",
      order: 2,
      kind: "hair",
      points: pts([
        [8, XH - 1, H],
        [22, XH - 3, H],
        [30, XH, H],
      ]),
    },
  ],
};

glyphs.j = {
  letter: "j",
  case: "lower",
  family: "descender",
  advance: 24,
  strokes: [
    {
      id: "desc",
      order: 1,
      kind: "shade",
      points: join(
        pts([[12, XH + 2, H]]),
        slantDown(12, XH + 2, DESC - 4, H, S, 12),
        cubic(
          12 + (DESC - 4 - (XH + 2)) * 0.7,
          DESC - 4,
          S,
          6,
          DESC + 2,
          0,
          DESC - 4,
          6,
          BASE + 6,
          H,
          10,
        ),
      ),
    },
    {
      id: "dot",
      order: 2,
      kind: "dot",
      points: pts([
        [14, ASC + 7, 1.25],
        [15.2, ASC + 5.5, 1.1],
        [14, ASC + 7, 1.25],
      ]),
    },
  ],
};

glyphs.p = {
  letter: "p",
  case: "lower",
  family: "descender",
  advance: 32,
  strokes: [
    {
      id: "stem",
      order: 1,
      kind: "shade",
      points: join(
        pts([[8, XH - 1, H]]),
        slantDown(8, XH - 1, DESC - 2, H, S, 14),
        quad(
          8 + (DESC - 2 - (XH - 1)) * 0.7,
          DESC - 2,
          S,
          14,
          DESC,
          18,
          DESC - 6,
          H,
          5,
        ),
      ),
    },
    {
      id: "bowl",
      order: 2,
      kind: "oval",
      points: join(
        pts([[8 + (BASE - (XH - 1)) * 0.35, XH + 2, H]]),
        cubic(12, XH + 2, H, 20, XH - 2, 28, XH + 4, 26, 52, S * 0.7, 8),
        cubic(26, 52, S * 0.7, 24, BASE + 2, 14, BASE + 1, 10, 54, H, 8),
      ),
    },
  ],
};

glyphs.y = {
  letter: "y",
  case: "lower",
  family: "arch",
  advance: 34,
  strokes: [
    {
      id: "body",
      order: 1,
      kind: "shade",
      points: join(
        pts([[6, XH, H]]),
        slantDown(6, XH, BASE, H, S, 8),
        cubic(
          6 + (BASE - XH) * 0.7,
          BASE,
          S,
          12,
          BASE + 2,
          18,
          BASE + 2,
          22,
          BASE,
          S,
          8,
        ),
        slantDown(22, BASE, DESC - 4, S, S, 8),
        cubic(
          22 + (DESC - 4 - BASE) * 0.7,
          DESC - 4,
          S,
          14,
          DESC + 2,
          4,
          DESC - 2,
          8,
          BASE + 4,
          H,
          10,
        ),
      ),
    },
  ],
};

glyphs.r = {
  letter: "r",
  case: "lower",
  family: "special",
  advance: 24,
  strokes: [
    {
      id: "body",
      order: 1,
      kind: "shade",
      points: join(
        pts([[6, XH - 1, H]]),
        slantDown(6, XH - 1, BASE, H, S, 8),
        slantUp(6 + (BASE - (XH - 1)) * 0.7, BASE, XH + 2, H, H, 6),
        cubic(8, XH + 2, H, 12, XH - 6, 18, XH - 8, 24, XH - 2, H, 8),
      ),
    },
  ],
};

glyphs.s = {
  letter: "s",
  case: "lower",
  family: "special",
  advance: 26,
  strokes: [
    {
      id: "body",
      order: 1,
      kind: "shade",
      points: join(
        pts([[20, XH + 4, H]]),
        cubic(20, XH + 4, H, 16, XH - 2, 8, XH, 8, 46, H, 8),
        cubic(8, 46, H, 8, 54, 14, 58, 20, 56, S * 0.8, 7),
        cubic(20, 56, S * 0.8, 26, 54, 26, BASE + 1, 16, BASE, S, 8),
        cubic(16, BASE, S, 8, BASE - 1, 6, BASE - 6, 12, BASE - 8, H, 6),
      ),
    },
  ],
};

glyphs.x = {
  letter: "x",
  case: "lower",
  family: "special",
  advance: 30,
  strokes: [
    {
      id: "down",
      order: 1,
      kind: "shade",
      points: join(
        pts([[6, XH, H]]),
        cubic(6, XH, H, 12, 48, 18, 54, 26, BASE, S, 10),
        exitHair(26, BASE),
      ),
    },
    {
      id: "cross",
      order: 2,
      kind: "hair",
      points: join(
        pts([[24, XH, H]]),
        cubic(24, XH, H, 18, 48, 12, 54, 6, BASE - 2, H, 10),
      ),
    },
  ],
};

glyphs.z = {
  letter: "z",
  case: "lower",
  family: "special",
  advance: 28,
  strokes: [
    {
      id: "body",
      order: 1,
      kind: "shade",
      points: join(
        pts([[8, XH + 2, H]]),
        pts([
          [22, XH, H],
          [26, XH + 3, H],
        ]),
        cubic(26, XH + 3, H, 18, 50, 12, 56, 10, BASE - 2, S, 10),
        cubic(10, BASE - 2, S, 16, BASE + 1, 24, BASE, 28, BASE - 3, H, 6),
        cubic(28, BASE - 3, H, 24, DESC - 8, 12, DESC, 6, DESC - 6, S * 0.8, 8),
      ),
    },
  ],
};

function serializePoints(points) {
  return points
    .map(
      (p) =>
        `      { x: ${p.x}, y: ${p.y}, r: ${p.r} }`,
    )
    .join(",\n");
}

function writeLetter(letter, glyph) {
  const strokes = glyph.strokes
    .map((stroke) => {
      const order =
        stroke.order !== undefined ? `\n      order: ${stroke.order},` : "";
      return `    {
      id: "${stroke.id}",${order}
      kind: "${stroke.kind}",
      points: [
${serializePoints(stroke.points)}
      ],
    }`;
    })
    .join(",\n");

  const note = glyph.note ? `\n  note: ${JSON.stringify(glyph.note)},` : "";
  const body = `import type { LetterGlyph } from "@/data/glyphs/types";

/** Modern pointed-pen minuscule \`${letter}\` — edit this file only to retune the letter. */
export const glyph_${letter}: LetterGlyph = {
  letter: "${letter}",
  case: "lower",
  family: "${glyph.family}",
  advance: ${glyph.advance},${note}
  strokes: [
${strokes}
  ],
};
`;
  fs.writeFileSync(path.join(dir, `${letter}.ts`), body);
}

const letters = Object.keys(glyphs).sort();
for (const letter of letters) {
  writeLetter(letter, glyphs[letter]);
}

const index = `import type { LetterGlyph } from "@/data/glyphs/types";
${letters.map((l) => `import { glyph_${l} } from "@/data/glyphs/modernLower/${l}";`).join("\n")}

/** a–z modern pointed-pen glyphs (one module per letter). */
export const modernLowerGlyphs: Record<string, LetterGlyph> = {
${letters.map((l) => `  ${l}: glyph_${l},`).join("\n")}
};

export function getModernLowerGlyph(letter: string): LetterGlyph | undefined {
  return modernLowerGlyphs[letter.toLowerCase()];
}

export const modernLowerLetters = Object.keys(modernLowerGlyphs);
`;

fs.writeFileSync(path.join(dir, "index.ts"), index);
console.log(`Wrote ${letters.length} letters + index to ${dir}`);
