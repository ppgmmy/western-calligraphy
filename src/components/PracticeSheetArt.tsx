import type { ReactNode } from "react";
import { getStrokeGuide, type StrokePath } from "@/data/letterFamilies";
import type { PracticeSheet } from "@/data/resources";

const PAGE_W = 794;
const PAGE_H = 1123;
const MARGIN = 48;

type SheetProps = {
  sheet: PracticeSheet;
};

function SheetFrame({
  sheet,
  children,
}: SheetProps & { children: ReactNode }) {
  return (
    <svg
      className="practice-sheet-svg"
      viewBox={`0 0 ${PAGE_W} ${PAGE_H}`}
      width="100%"
      role="img"
      aria-label={`${sheet.titleZh} 練習紙`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={PAGE_W} height={PAGE_H} fill="#f7f5f1" />
      <text
        x={MARGIN}
        y={36}
        fill="#245c54"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="18"
        letterSpacing="1.5"
      >
        Scriptoria
      </text>
      <text
        x={PAGE_W - MARGIN}
        y={36}
        fill="#3a4450"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="13"
        textAnchor="end"
      >
        {sheet.titleEn}
      </text>
      <text
        x={MARGIN}
        y={58}
        fill="#1a1f24"
        fontFamily="'Noto Serif TC', 'Songti TC', serif"
        fontSize="22"
      >
        {sheet.titleZh}
      </text>
      <text
        x={MARGIN}
        y={78}
        fill="#5b6570"
        fontFamily="'Noto Serif TC', serif"
        fontSize="12"
      >
        {sheet.sheetTip}
      </text>
      <line
        x1={MARGIN}
        y1={88}
        x2={PAGE_W - MARGIN}
        y2={88}
        stroke="#9a8658"
        strokeWidth="1"
      />
      {children}
      <text
        x={MARGIN}
        y={PAGE_H - 22}
        fill="#6b7280"
        fontFamily="'Noto Serif TC', serif"
        fontSize="11"
      >
        列印建議：A4｜實際大小｜關閉頁首頁尾｜單面
      </text>
      <text
        x={PAGE_W - MARGIN}
        y={PAGE_H - 22}
        fill="#6b7280"
        fontFamily="Georgia, serif"
        fontSize="11"
        textAnchor="end"
      >
        western-calligraphy.vercel.app
      </text>
    </svg>
  );
}

function SlantGuidelines({ sheet }: SheetProps) {
  const top = 104;
  const bottom = PAGE_H - 48;
  const left = MARGIN;
  const right = PAGE_W - MARGIN;
  const bandHeight = 78;
  const bands: number[] = [];
  for (let y = top; y + bandHeight < bottom; y += bandHeight + 18) {
    bands.push(y);
  }

  const slantRad = (55 * Math.PI) / 180;
  const slantLines: Array<{ x1: number; y1: number; x2: number; y2: number }> =
    [];
  const step = 28;
  for (let i = -20; i < 40; i += 1) {
    const x0 = left + i * step;
    const y1 = top;
    const y2 = bottom;
    const dx = (y2 - y1) / Math.tan(slantRad);
    slantLines.push({ x1: x0, y1, x2: x0 + dx, y2 });
  }

  return (
    <SheetFrame sheet={sheet}>
      <clipPath id="sheet-clip">
        <rect x={left} y={top} width={right - left} height={bottom - top} />
      </clipPath>
      <g clipPath="url(#sheet-clip)" stroke="#b7c0cb" strokeWidth="0.7">
        {slantLines.map((line, index) => (
          <line
            key={`slant-${index}`}
            x1={line.x1}
            y1={line.y1}
            x2={line.x2}
            y2={line.y2}
          />
        ))}
      </g>
      {bands.map((y) => {
        const base = y + bandHeight * 0.62;
        const xHeight = y + bandHeight * 0.28;
        const asc = y + 4;
        const desc = y + bandHeight - 4;
        return (
          <g key={`band-${y}`}>
            <line
              x1={left}
              y1={asc}
              x2={right}
              y2={asc}
              stroke="#c5ccd6"
              strokeWidth="0.8"
              strokeDasharray="3 4"
            />
            <line
              x1={left}
              y1={xHeight}
              x2={right}
              y2={xHeight}
              stroke="#8fa0b0"
              strokeWidth="0.9"
            />
            <line
              x1={left}
              y1={base}
              x2={right}
              y2={base}
              stroke="#3a4450"
              strokeWidth="1.1"
            />
            <line
              x1={left}
              y1={desc}
              x2={right}
              y2={desc}
              stroke="#c5ccd6"
              strokeWidth="0.8"
              strokeDasharray="3 4"
            />
          </g>
        );
      })}
      <text
        x={left}
        y={bottom + 18}
        fill="#5b6570"
        fontFamily="'Noto Serif TC', serif"
        fontSize="12"
      >
        斜度約 55°｜細線＝升部／降部｜中線＝x-height｜粗線＝基線
      </text>
    </SheetFrame>
  );
}

function OvalDrills({ sheet }: SheetProps) {
  const top = 110;
  const left = MARGIN;
  const right = PAGE_W - MARGIN;
  const rows = 8;
  const cols = 6;
  const rowH = 108;
  const colW = (right - left) / cols;

  return (
    <SheetFrame sheet={sheet}>
      {Array.from({ length: rows }).map((_, row) => {
        const cy = top + row * rowH + 44;
        return (
          <g key={`row-${row}`}>
            <line
              x1={left}
              y1={cy + 28}
              x2={right}
              y2={cy + 28}
              stroke="#d0d6de"
              strokeWidth="0.8"
            />
            {Array.from({ length: cols }).map((__, col) => {
              const cx = left + col * colW + colW / 2;
              const isGuide = row < 3;
              return (
                <ellipse
                  key={`oval-${row}-${col}`}
                  cx={cx}
                  cy={cy}
                  rx={26}
                  ry={34}
                  fill="none"
                  stroke={isGuide ? "#9a8658" : "#c5ccd6"}
                  strokeWidth={isGuide ? 1.1 : 0.9}
                  strokeDasharray={isGuide ? undefined : "2 3"}
                  transform={`rotate(-12 ${cx} ${cy})`}
                />
              );
            })}
          </g>
        );
      })}
      <text
        x={left}
        y={PAGE_H - 48}
        fill="#5b6570"
        fontFamily="'Noto Serif TC', serif"
        fontSize="12"
      >
        前三列可沿虛／實線描寫；其後自行以橢圓節奏反覆練習。
      </text>
    </SheetFrame>
  );
}

function BroadNibRules({ sheet }: SheetProps) {
  const top = 108;
  const left = MARGIN;
  const right = PAGE_W - MARGIN;
  const unit = 10;
  const xHeight = unit * 5;
  const asc = unit * 5;
  const desc = unit * 5;
  const band = asc + xHeight + desc;
  const gap = 22;
  const bands: number[] = [];
  for (let y = top; y + band < PAGE_H - 56; y += band + gap) {
    bands.push(y);
  }

  return (
    <SheetFrame sheet={sheet}>
      {bands.map((y) => {
        const ascLine = y;
        const xTop = y + asc;
        const base = y + asc + xHeight;
        const descLine = y + band;
        return (
          <g key={`nib-${y}`}>
            <rect
              x={left}
              y={xTop}
              width={right - left}
              height={xHeight}
              fill="rgba(36, 92, 84, 0.04)"
            />
            <line
              x1={left}
              y1={ascLine}
              x2={right}
              y2={ascLine}
              stroke="#b7c0cb"
              strokeWidth="0.8"
            />
            <line
              x1={left}
              y1={xTop}
              x2={right}
              y2={xTop}
              stroke="#3d7a70"
              strokeWidth="1"
            />
            <line
              x1={left}
              y1={base}
              x2={right}
              y2={base}
              stroke="#1a1f24"
              strokeWidth="1.2"
            />
            <line
              x1={left}
              y1={descLine}
              x2={right}
              y2={descLine}
              stroke="#b7c0cb"
              strokeWidth="0.8"
            />
            {Array.from({ length: 5 }).map((_, i) => (
              <line
                key={`tick-${y}-${i}`}
                x1={left - 10}
                y1={xTop + i * unit}
                x2={left - 2}
                y2={xTop + i * unit}
                stroke="#9a8658"
                strokeWidth="0.8"
              />
            ))}
          </g>
        );
      })}
      <text
        x={left}
        y={PAGE_H - 48}
        fill="#5b6570"
        fontFamily="'Noto Serif TC', serif"
        fontSize="12"
      >
        建議筆寬單位：升部 5｜x-height 5｜降部 5。陰影帶為主要書寫區。
      </text>
    </SheetFrame>
  );
}

function GothicGrid({ sheet }: SheetProps) {
  const top = 108;
  const bottom = PAGE_H - 56;
  const left = MARGIN;
  const right = PAGE_W - MARGIN;
  const colW = 18;
  const rowH = 54;

  const cols: number[] = [];
  for (let x = left; x <= right; x += colW) cols.push(x);
  const rows: number[] = [];
  for (let y = top; y <= bottom; y += rowH) rows.push(y);

  return (
    <SheetFrame sheet={sheet}>
      {cols.map((x, index) => (
        <line
          key={`v-${x}`}
          x1={x}
          y1={top}
          x2={x}
          y2={bottom}
          stroke={index % 2 === 0 ? "#9aa7b5" : "#d5dbe3"}
          strokeWidth={index % 2 === 0 ? 1 : 0.6}
        />
      ))}
      {rows.map((y) => (
        <line
          key={`h-${y}`}
          x1={left}
          y1={y}
          x2={right}
          y2={y}
          stroke="#3a4450"
          strokeWidth="1"
        />
      ))}
      <text
        x={left}
        y={PAGE_H - 48}
        fill="#5b6570"
        fontFamily="'Noto Serif TC', serif"
        fontSize="12"
      >
        雙豎線協助等寬筆畫；先寫垂直骨架，再補斜筆與菱形收尾。
      </text>
    </SheetFrame>
  );
}

function BlankLines({ sheet }: SheetProps) {
  const top = 110;
  const left = MARGIN;
  const right = PAGE_W - MARGIN;
  const spacing = 36;
  const lines: number[] = [];
  for (let y = top; y < PAGE_H - 56; y += spacing) lines.push(y);

  return (
    <SheetFrame sheet={sheet}>
      {lines.map((y) => (
        <line
          key={`line-${y}`}
          x1={left}
          y1={y}
          x2={right}
          y2={y}
          stroke="#b7c0cb"
          strokeWidth="1"
        />
      ))}
      <text
        x={left}
        y={PAGE_H - 48}
        fill="#5b6570"
        fontFamily="'Noto Serif TC', serif"
        fontSize="12"
      >
        通用基線紙：可臨摹範本、練習簽名，或自行加上斜度輔助線。
      </text>
    </SheetFrame>
  );
}

const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const LOWER = "abcdefghijklmnopqrstuvwxyz".split("");

function RuledBand({
  y,
  height,
  left,
  right,
}: {
  y: number;
  height: number;
  left: number;
  right: number;
}) {
  const xTop = y + height * 0.28;
  const base = y + height * 0.72;
  return (
    <g>
      <line
        x1={left}
        y1={y}
        x2={right}
        y2={y}
        stroke="#d0d6de"
        strokeWidth="0.7"
        strokeDasharray="2 3"
      />
      <line
        x1={left}
        y1={xTop}
        x2={right}
        y2={xTop}
        stroke="#a8b4c0"
        strokeWidth="0.8"
      />
      <line
        x1={left}
        y1={base}
        x2={right}
        y2={base}
        stroke="#3a4450"
        strokeWidth="1.1"
      />
      <line
        x1={left}
        y1={y + height}
        x2={right}
        y2={y + height}
        stroke="#d0d6de"
        strokeWidth="0.7"
        strokeDasharray="2 3"
      />
    </g>
  );
}

function AlphabetSheet({
  sheet,
  letters,
}: SheetProps & { letters: string[] }) {
  const left = MARGIN;
  const right = PAGE_W - MARGIN;
  const top = 108;
  const rowH = 70;
  const cols = 4;
  const colW = (right - left) / cols;

  const rows: string[][] = [];
  for (let i = 0; i < letters.length; i += cols) {
    rows.push(letters.slice(i, i + cols));
  }

  return (
    <SheetFrame sheet={sheet}>
      <text
        x={left}
        y={102}
        fill="#5b6570"
        fontFamily="'Noto Serif TC', serif"
        fontSize="11"
      >
        每格：左＝範字｜中＝淡字描寫｜右＝空白自寫
      </text>
      {rows.map((rowLetters, rowIndex) => {
        const y = top + rowIndex * rowH;
        return (
          <g key={`alpha-row-${rowIndex}`}>
            <RuledBand y={y} height={rowH - 10} left={left} right={right} />
            {rowLetters.map((letter, colIndex) => {
              const x = left + colIndex * colW;
              const baseY = y + (rowH - 10) * 0.72;
              return (
                <g key={`cell-${letter}`}>
                  <text
                    x={x + 18}
                    y={baseY}
                    fill="#1a1f24"
                    fontFamily="Georgia, 'Times New Roman', serif"
                    fontSize="34"
                    fontStyle="italic"
                  >
                    {letter}
                  </text>
                  <text
                    x={x + colW * 0.38}
                    y={baseY}
                    fill="#b7c0cb"
                    fontFamily="Georgia, 'Times New Roman', serif"
                    fontSize="34"
                    fontStyle="italic"
                  >
                    {letter}
                  </text>
                  <line
                    x1={x + colW - 8}
                    y1={y + 4}
                    x2={x + colW - 8}
                    y2={y + rowH - 14}
                    stroke="#e2e6eb"
                    strokeWidth="1"
                  />
                </g>
              );
            })}
          </g>
        );
      })}
      <text
        x={left}
        y={PAGE_H - 48}
        fill="#5b6570"
        fontFamily="'Noto Serif TC', serif"
        fontSize="12"
      >
        建議：一次練 4–6 字；寫完用鉛筆圈出最好的 3 個，明天先抄它們。
      </text>
    </SheetFrame>
  );
}

function strokeToPath(strokes: StrokePath[], size: number): string[] {
  return strokes.map((stroke) => {
    const [first, ...rest] = stroke.points;
    if (!first) return "";
    const scale = size / 100;
    const to = ([x, y]: [number, number]) =>
      `${(x * scale).toFixed(1)} ${(y * scale).toFixed(1)}`;
    return `M ${to(first)} ${rest.map((p) => `L ${to(p)}`).join(" ")}`;
  });
}

function arrowHead(
  from: [number, number],
  to: [number, number],
  size: number,
): string {
  const scale = size / 100;
  const x1 = from[0] * scale;
  const y1 = from[1] * scale;
  const x2 = to[0] * scale;
  const y2 = to[1] * scale;
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const len = 5;
  const a1 = angle + Math.PI * 0.82;
  const a2 = angle - Math.PI * 0.82;
  const p1 = [x2 + Math.cos(a1) * len, y2 + Math.sin(a1) * len];
  const p2 = [x2 + Math.cos(a2) * len, y2 + Math.sin(a2) * len];
  return `M ${x2.toFixed(1)} ${y2.toFixed(1)} L ${p1[0].toFixed(1)} ${p1[1].toFixed(1)} M ${x2.toFixed(1)} ${y2.toFixed(1)} L ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
}

function StrokeGuideGlyph({
  letter,
  x,
  y,
  size = 52,
}: {
  letter: string;
  x: number;
  y: number;
  size?: number;
}) {
  const strokes = getStrokeGuide(letter);
  const paths = strokeToPath(strokes, size);
  const colors = ["#245c54", "#9a8658", "#3a4450", "#5b6570"];

  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width={size}
        height={size}
        rx={4}
        fill="#fff"
        stroke="#d5dbe3"
        strokeWidth="0.8"
      />
      {paths.map((d, index) => {
        const stroke = strokes[index];
        if (!stroke || stroke.points.length < 2) return null;
        const last = stroke.points[stroke.points.length - 1];
        const prev = stroke.points[stroke.points.length - 2];
        return (
          <g key={`${letter}-stroke-${index}`}>
            <path
              d={d}
              fill="none"
              stroke={colors[index % colors.length]}
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d={arrowHead(prev, last, size)}
              fill="none"
              stroke={colors[index % colors.length]}
              strokeWidth="1.4"
              strokeLinecap="round"
            />
            <circle
              cx={(stroke.points[0][0] * size) / 100}
              cy={(stroke.points[0][1] * size) / 100}
              r={2.2}
              fill={colors[index % colors.length]}
            />
          </g>
        );
      })}
    </g>
  );
}

/** 字母家族分冊：左側筆畫方向 + 範字／描寫／空白 */
function FamilyAlphabetSheet({ sheet }: SheetProps) {
  const letters = sheet.letters ?? [];
  const left = MARGIN;
  const right = PAGE_W - MARGIN;
  const top = 108;
  const usable = PAGE_H - 56 - top;
  const rowH = Math.min(88, Math.max(64, Math.floor(usable / Math.max(letters.length, 1))));
  const guideSize = Math.min(54, rowH - 10);

  return (
    <SheetFrame sheet={sheet}>
      <text
        x={left}
        y={102}
        fill="#5b6570"
        fontFamily="'Noto Serif TC', serif"
        fontSize="11"
      >
        左＝筆畫方向（圓點起筆、箭頭收筆）｜中左範字｜中右描寫｜右＝空白自寫
      </text>
      {letters.map((letter, index) => {
        const y = top + index * rowH;
        if (y + rowH > PAGE_H - 56) return null;
        const bandH = rowH - 10;
        const baseY = y + bandH * 0.72;
        const practiceLeft = left + guideSize + 14;
        const colW = (right - practiceLeft) / 3;

        return (
          <g key={`family-${letter}`}>
            <RuledBand y={y} height={bandH} left={practiceLeft} right={right} />
            <StrokeGuideGlyph
              letter={letter}
              x={left}
              y={y + Math.max(0, (bandH - guideSize) / 2)}
              size={guideSize}
            />
            <text
              x={practiceLeft + 12}
              y={baseY}
              fill="#1a1f24"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize={rowH > 75 ? 36 : 30}
              fontStyle="italic"
            >
              {letter}
            </text>
            <text
              x={practiceLeft + colW + 12}
              y={baseY}
              fill="#b7c0cb"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize={rowH > 75 ? 36 : 30}
              fontStyle="italic"
            >
              {letter}
            </text>
            <line
              x1={practiceLeft + colW - 6}
              y1={y + 4}
              x2={practiceLeft + colW - 6}
              y2={y + bandH - 4}
              stroke="#e2e6eb"
              strokeWidth="1"
            />
            <line
              x1={practiceLeft + colW * 2 - 6}
              y1={y + 4}
              x2={practiceLeft + colW * 2 - 6}
              y2={y + bandH - 4}
              stroke="#e2e6eb"
              strokeWidth="1"
            />
          </g>
        );
      })}
      <text
        x={left}
        y={PAGE_H - 48}
        fill="#5b6570"
        fontFamily="'Noto Serif TC', serif"
        fontSize="12"
      >
        筆畫示意為教學簡圖（非唯一正統寫法）。先慢描箭頭方向，再獨立書寫。
      </text>
    </SheetFrame>
  );
}

function WordsSheet({ sheet }: SheetProps) {
  const words = sheet.content ?? [];
  const left = MARGIN;
  const right = PAGE_W - MARGIN;
  const top = 110;
  const rowH = 78;

  return (
    <SheetFrame sheet={sheet}>
      <text
        x={left}
        y={102}
        fill="#5b6570"
        fontFamily="'Noto Serif TC', serif"
        fontSize="11"
      >
        上行淡字可描；下行空白請獨立書寫，注意字母間距。
      </text>
      {words.map((word, index) => {
        const y = top + index * rowH;
        if (y + rowH > PAGE_H - 56) return null;
        return (
          <g key={`word-${word}`}>
            <RuledBand y={y} height={32} left={left} right={right} />
            <text
              x={left + 8}
              y={y + 32 * 0.72}
              fill="#b0bac4"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize="26"
              fontStyle="italic"
            >
              {word}
            </text>
            <RuledBand y={y + 38} height={32} left={left} right={right} />
          </g>
        );
      })}
      <text
        x={left}
        y={PAGE_H - 48}
        fill="#5b6570"
        fontFamily="'Noto Serif TC', serif"
        fontSize="12"
      >
        詞與詞之間留半個字寬呼吸；寫完檢查整行是否在同一基線上。
      </text>
    </SheetFrame>
  );
}

function SentencesSheet({ sheet }: SheetProps) {
  const sentences = sheet.content ?? [];
  const left = MARGIN;
  const right = PAGE_W - MARGIN;
  const top = 110;
  const blockH = 96;

  return (
    <SheetFrame sheet={sheet}>
      <text
        x={left}
        y={102}
        fill="#5b6570"
        fontFamily="'Noto Serif TC', serif"
        fontSize="11"
      >
        每句兩行：第一行臨摹，第二行自寫。寫前先想換氣位置。
      </text>
      {sentences.map((sentence, index) => {
        const y = top + index * blockH;
        if (y + blockH > PAGE_H - 56) return null;
        return (
          <g key={`sentence-${index}`}>
            <RuledBand y={y} height={36} left={left} right={right} />
            <text
              x={left + 6}
              y={y + 36 * 0.7}
              fill="#b0bac4"
              fontFamily="Georgia, 'Times New Roman', serif"
              fontSize="20"
              fontStyle="italic"
            >
              {sentence}
            </text>
            <RuledBand y={y + 44} height={36} left={left} right={right} />
          </g>
        );
      })}
      <text
        x={left}
        y={PAGE_H - 48}
        fill="#5b6570"
        fontFamily="'Noto Serif TC', serif"
        fontSize="12"
      >
        整句完成後，退後兩步看：字高、斜度、字距是否一致。
      </text>
    </SheetFrame>
  );
}

export function PracticeSheetArt({ sheet }: SheetProps) {
  switch (sheet.kind) {
    case "slant-guidelines":
      return <SlantGuidelines sheet={sheet} />;
    case "oval-drills":
      return <OvalDrills sheet={sheet} />;
    case "broad-nib-rules":
      return <BroadNibRules sheet={sheet} />;
    case "gothic-grid":
      return <GothicGrid sheet={sheet} />;
    case "blank-lines":
      return <BlankLines sheet={sheet} />;
    case "alphabet-upper":
      return <AlphabetSheet sheet={sheet} letters={UPPER} />;
    case "alphabet-lower":
      return <AlphabetSheet sheet={sheet} letters={LOWER} />;
    case "alphabet-family":
      return <FamilyAlphabetSheet sheet={sheet} />;
    case "words":
      return <WordsSheet sheet={sheet} />;
    case "sentences":
      return <SentencesSheet sheet={sheet} />;
    default: {
      const _exhaustive: never = sheet.kind;
      return _exhaustive;
    }
  }
}
