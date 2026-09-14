import type { ReactNode } from "react";
import { getStrokeGuide, type StrokePath } from "@/data/letterFamilies";
import type { PracticeSheet } from "@/data/resources";

const PAGE_W = 794;
const PAGE_H = 1123;
const MARGIN = 48;

type SheetProps = {
  sheet: PracticeSheet;
};

const INK = "#1c232b";
const GHOST = "#c8d0d8";
const RULE = "#9eb4c6";
const RULE_SOFT = "#c5d3de";
const TEAL = "#245c54";
const BRASS = "#9a8658";

function pageLabel(sheet: PracticeSheet) {
  return `PAGE ${String(sheet.stage + 1).padStart(2, "0")}`;
}

function GuidelineLegend({
  x,
  y,
  withSlant = true,
}: {
  x: number;
  y: number;
  withSlant?: boolean;
}) {
  const items = [
    { label: "Ascender 上升線", color: RULE_SOFT },
    { label: "x-Height 字身高度", color: RULE },
    { label: "Baseline 基線", color: "#4a5560" },
    { label: "Descender 下降線", color: RULE_SOFT },
    ...(withSlant ? [{ label: "55° Slant 傾斜線", color: RULE }] : []),
  ];

  return (
    <g transform={`translate(${x} ${y})`}>
      {items.map((item, index) => (
        <g key={item.label} transform={`translate(${index * 138} 0)`}>
          <circle cx={4} cy={-3} r={3} fill={item.color} />
          <text
            x={12}
            y={0}
            fill="#5b6570"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontSize="9"
            letterSpacing="0.4"
          >
            {item.label}
          </text>
        </g>
      ))}
    </g>
  );
}

function SheetFrame({
  sheet,
  children,
  showLegend = false,
}: SheetProps & { children: ReactNode; showLegend?: boolean }) {
  return (
    <svg
      className="practice-sheet-svg"
      viewBox={`0 0 ${PAGE_W} ${PAGE_H}`}
      width="100%"
      role="img"
      aria-label={`${sheet.titleZh} 練習紙`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width={PAGE_W} height={PAGE_H} fill="#fbfaf7" />
      <text
        x={MARGIN}
        y={42}
        fill={INK}
        fontFamily="var(--font-script), 'Segoe Script', cursive"
        fontSize="34"
      >
        Scriptoria
      </text>
      <text
        x={PAGE_W - MARGIN}
        y={28}
        fill={BRASS}
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="10"
        letterSpacing="2"
        textAnchor="end"
      >
        {pageLabel(sheet)}
      </text>
      <text
        x={PAGE_W - MARGIN}
        y={44}
        fill="#5b6570"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="11"
        textAnchor="end"
      >
        {sheet.titleEn}
      </text>
      <text
        x={MARGIN}
        y={68}
        fill={TEAL}
        fontFamily="'Noto Serif TC', 'Songti TC', serif"
        fontSize="18"
      >
        {sheet.titleZh}
      </text>
      <text
        x={MARGIN}
        y={86}
        fill="#5b6570"
        fontFamily="'Noto Serif TC', serif"
        fontSize="11"
      >
        {sheet.sheetTip}
      </text>
      <line
        x1={MARGIN}
        y1={94}
        x2={PAGE_W - MARGIN}
        y2={94}
        stroke={BRASS}
        strokeWidth="0.8"
      />
      {showLegend ? <GuidelineLegend x={MARGIN} y={108} /> : null}
      {children}
      <text
        x={MARGIN}
        y={PAGE_H - 22}
        fill="#6b7280"
        fontFamily="'Noto Serif TC', serif"
        fontSize="10"
      >
        列印：A4｜實際大小｜關閉頁首頁尾｜單面｜深色範字＋淺灰描紅＋空白自寫
      </text>
      <text
        x={PAGE_W - MARGIN}
        y={PAGE_H - 22}
        fill="#6b7280"
        fontFamily="Georgia, serif"
        fontSize="10"
        textAnchor="end"
      >
        western-calligraphy.vercel.app
      </text>
    </svg>
  );
}

function SlantGuidelines({ sheet }: SheetProps) {
  const top = 124;
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
    <SheetFrame sheet={sheet} showLegend>
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
  withSlant = true,
  clipId,
}: {
  y: number;
  height: number;
  left: number;
  right: number;
  withSlant?: boolean;
  clipId?: string;
}) {
  const asc = y + 2;
  const xTop = y + height * 0.28;
  const base = y + height * 0.72;
  const desc = y + height - 2;
  const id = clipId ?? `band-${Math.round(y)}-${Math.round(left)}`;
  const slantRad = (55 * Math.PI) / 180;
  const slantLines: Array<{ x1: number; y1: number; x2: number; y2: number }> =
    [];
  if (withSlant) {
    const step = 22;
    for (let i = -8; i < 36; i += 1) {
      const x0 = left + i * step;
      const dx = (desc - asc) / Math.tan(slantRad);
      slantLines.push({ x1: x0, y1: asc, x2: x0 + dx, y2: desc });
    }
  }

  return (
    <g>
      <defs>
        <clipPath id={id}>
          <rect x={left} y={asc} width={right - left} height={desc - asc} />
        </clipPath>
      </defs>
      {withSlant ? (
        <g clipPath={`url(#${id})`} stroke={RULE_SOFT} strokeWidth="0.55">
          {slantLines.map((line, index) => (
            <line
              key={`s-${id}-${index}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
            />
          ))}
        </g>
      ) : null}
      <line
        x1={left}
        y1={asc}
        x2={right}
        y2={asc}
        stroke={RULE_SOFT}
        strokeWidth="0.8"
      />
      <line
        x1={left}
        y1={xTop}
        x2={right}
        y2={xTop}
        stroke={RULE}
        strokeWidth="0.9"
      />
      <line
        x1={left}
        y1={base}
        x2={right}
        y2={base}
        stroke="#4a5560"
        strokeWidth="1.15"
      />
      <line
        x1={left}
        y1={desc}
        x2={right}
        y2={desc}
        stroke={RULE_SOFT}
        strokeWidth="0.8"
      />
    </g>
  );
}

function TraceRow({
  exemplar,
  y,
  height,
  left,
  right,
  ghostCount = 4,
  fontSize = 30,
}: {
  exemplar: string;
  y: number;
  height: number;
  left: number;
  right: number;
  ghostCount?: number;
  fontSize?: number;
}) {
  const baseY = y + height * 0.72;
  const gap = Math.min(56, Math.max(36, (right - left - 24) / (ghostCount + 2)));
  return (
    <g>
      <RuledBand y={y} height={height} left={left} right={right} clipId={`tr-${y}-${left}`} />
      <text
        x={left + 10}
        y={baseY}
        fill={INK}
        fontFamily="var(--font-script), Georgia, cursive"
        fontSize={fontSize}
      >
        {exemplar}
      </text>
      {Array.from({ length: ghostCount }).map((_, index) => (
        <text
          key={`ghost-${exemplar}-${index}`}
          x={left + 10 + gap * (index + 1)}
          y={baseY}
          fill={GHOST}
          fontFamily="var(--font-script), Georgia, cursive"
          fontSize={fontSize}
        >
          {exemplar}
        </text>
      ))}
    </g>
  );
}

function AlphabetSheet({
  sheet,
  letters,
}: SheetProps & { letters: string[] }) {
  const left = MARGIN;
  const right = PAGE_W - MARGIN;
  const top = 128;
  const cols = 2;
  const colGap = 18;
  const colW = (right - left - colGap) / cols;
  const rowH = 58;
  const mid = Math.ceil(letters.length / 2);
  const columns = [letters.slice(0, mid), letters.slice(mid)];

  return (
    <SheetFrame sheet={sheet} showLegend>
      <text
        x={left}
        y={118}
        fill="#5b6570"
        fontFamily="'Noto Serif TC', serif"
        fontSize="11"
      >
        每行：深色範字 → 淺灰描紅 → 右側空白自寫（對齊基線與 55° 斜度）
      </text>
      {columns.map((colLetters, colIndex) => {
        const x0 = left + colIndex * (colW + colGap);
        return (
          <g key={`col-${colIndex}`}>
            {colLetters.map((letter, rowIndex) => {
              const y = top + rowIndex * rowH;
              if (y + rowH > PAGE_H - 56) return null;
              return (
                <TraceRow
                  key={`alpha-${letter}`}
                  exemplar={letter}
                  y={y}
                  height={rowH - 8}
                  left={x0}
                  right={x0 + colW}
                  ghostCount={3}
                  fontSize={28}
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
        建議一次練半欄；描紅求形準，空白格求自己寫得像範字。
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
  const top = 122;
  const usable = PAGE_H - 56 - top;
  const rowH = Math.min(92, Math.max(68, Math.floor(usable / Math.max(letters.length, 1))));
  const guideSize = Math.min(56, rowH - 14);

  return (
    <SheetFrame sheet={sheet} showLegend>
      <text
        x={left}
        y={118}
        fill="#5b6570"
        fontFamily="'Noto Serif TC', serif"
        fontSize="11"
      >
        左＝筆畫方向｜其後深色範字＋淺灰描紅＋右側空白自寫
      </text>
      {letters.map((letter, index) => {
        const y = top + index * rowH;
        if (y + rowH > PAGE_H - 56) return null;
        const bandH = rowH - 10;
        const baseY = y + bandH * 0.72;
        const practiceLeft = left + guideSize + 14;
        const gap = Math.min(58, Math.max(40, (right - practiceLeft - 20) / 6));

        return (
          <g key={`family-${letter}`}>
            <RuledBand
              y={y}
              height={bandH}
              left={practiceLeft}
              right={right}
              clipId={`fam-${letter}`}
            />
            <StrokeGuideGlyph
              letter={letter}
              x={left}
              y={y + Math.max(0, (bandH - guideSize) / 2)}
              size={guideSize}
            />
            <text
              x={practiceLeft + 10}
              y={baseY}
              fill={INK}
              fontFamily="var(--font-script), Georgia, cursive"
              fontSize={rowH > 78 ? 34 : 28}
            >
              {letter}
            </text>
            {Array.from({ length: 3 }).map((_, ghostIndex) => (
              <text
                key={`fg-${letter}-${ghostIndex}`}
                x={practiceLeft + 10 + gap * (ghostIndex + 1)}
                y={baseY}
                fill={GHOST}
                fontFamily="var(--font-script), Georgia, cursive"
                fontSize={rowH > 78 ? 34 : 28}
              >
                {letter}
              </text>
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
        筆畫示意為教學簡圖。先慢描淺灰字，再在空白區獨立書寫。
      </text>
    </SheetFrame>
  );
}

function PointedPenStrokes({ sheet }: SheetProps) {
  const left = MARGIN;
  const right = PAGE_W - MARGIN;
  const top = 108;
  const isSpencerian = sheet.styleId === "spencerian";
  const rows = 7;
  const cols = 8;
  const rowH = 118;
  const colW = (right - left) / cols;

  return (
    <SheetFrame sheet={sheet}>
      <text
        x={left}
        y={102}
        fill="#5b6570"
        fontFamily="'Noto Serif TC', serif"
        fontSize="11"
      >
        {isSpencerian
          ? "輕壓為主：曲線要連、節奏要勻；前兩列可描，其後自寫。"
          : "下行加力（粗）、上行減力（細）；前兩列可描，其後自寫。"}
      </text>
      {Array.from({ length: rows }).map((_, row) => {
        const y = top + row * rowH;
        const guide = row < 2;
        const stroke = guide ? "#9a8658" : "#c5ccd6";
        const weight = guide ? 1.2 : 0.9;
        return (
          <g key={`pp-row-${row}`}>
            <line
              x1={left}
              y1={y + rowH - 18}
              x2={right}
              y2={y + rowH - 18}
              stroke="#d0d6de"
              strokeWidth="0.8"
            />
            {Array.from({ length: cols }).map((__, col) => {
              const cx = left + col * colW + colW / 2;
              const cy = y + 48;
              if (isSpencerian && sheet.slug.includes("compound")) {
                return (
                  <path
                    key={`curve-${row}-${col}`}
                    d={`M ${cx - 18} ${cy + 22} C ${cx - 8} ${cy - 28}, ${cx + 8} ${cy + 28}, ${cx + 18} ${cy - 22}`}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={weight}
                    strokeLinecap="round"
                    strokeDasharray={guide ? undefined : "2 3"}
                  />
                );
              }
              // shade + hairline pair
              return (
                <g key={`stroke-${row}-${col}`}>
                  <line
                    x1={cx - 4}
                    y1={cy - 28}
                    x2={cx + 6}
                    y2={cy + 28}
                    stroke={stroke}
                    strokeWidth={isSpencerian ? weight : guide ? 3.2 : 2.4}
                    strokeLinecap="round"
                    opacity={isSpencerian ? 0.85 : 1}
                  />
                  <path
                    d={`M ${cx + 8} ${cy + 26} Q ${cx + 16} ${cy + 4} ${cx + 10} ${cy - 20}`}
                    fill="none"
                    stroke={stroke}
                    strokeWidth={0.8}
                    strokeDasharray={guide ? undefined : "2 3"}
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
        {isSpencerian
          ? "斯賓塞體：均勻輕盈優先；華麗線條留到骨架穩定之後。"
          : "銅板體：陰影筆畫寬度盡量一致，細畫保持乾淨不斷墨。"}
      </text>
    </SheetFrame>
  );
}

function WordsSheet({ sheet }: SheetProps) {
  const words = sheet.content ?? [];
  const left = MARGIN;
  const right = PAGE_W - MARGIN;
  const top = 122;
  const rowH = 86;

  return (
    <SheetFrame sheet={sheet} showLegend>
      <text
        x={left}
        y={118}
        fill="#5b6570"
        fontFamily="'Noto Serif TC', serif"
        fontSize="11"
      >
        單詞連接節奏：深色範例 → 淺灰描紅 → 下方空白自寫
      </text>
      {words.map((word, index) => {
        const y = top + index * rowH;
        if (y + rowH > PAGE_H - 56) return null;
        const bandH = 34;
        const baseY = y + bandH * 0.72;
        const ghostX = left + 8 + Math.min(240, 26 * word.length + 48);
        return (
          <g key={`word-${word}`}>
            <RuledBand y={y} height={bandH} left={left} right={right} clipId={`w1-${index}`} />
            <text
              x={left + 8}
              y={baseY}
              fill={INK}
              fontFamily="var(--font-script), Georgia, cursive"
              fontSize="24"
            >
              {word}
            </text>
            <text
              x={ghostX}
              y={baseY}
              fill={GHOST}
              fontFamily="var(--font-script), Georgia, cursive"
              fontSize="24"
            >
              {word}
            </text>
            <RuledBand
              y={y + bandH + 6}
              height={bandH}
              left={left}
              right={right}
              clipId={`w2-${index}`}
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
        注意進出筆與字母間距；整行應落在同一基線、同一斜度。
      </text>
    </SheetFrame>
  );
}

function SentencesSheet({ sheet }: SheetProps) {
  const sentences = sheet.content ?? [];
  const left = MARGIN;
  const right = PAGE_W - MARGIN;
  const top = 122;
  const blockH = 100;

  return (
    <SheetFrame sheet={sheet} showLegend>
      <text
        x={left}
        y={118}
        fill="#5b6570"
        fontFamily="'Noto Serif TC', serif"
        fontSize="11"
      >
        短句練習：上行淺灰描紅，下行空白自寫
      </text>
      {sentences.map((sentence, index) => {
        const y = top + index * blockH;
        if (y + blockH > PAGE_H - 56) return null;
        const bandH = 36;
        return (
          <g key={`sentence-${index}`}>
            <RuledBand y={y} height={bandH} left={left} right={right} clipId={`s1-${index}`} />
            <text
              x={left + 6}
              y={y + bandH * 0.7}
              fill={GHOST}
              fontFamily="var(--font-script), Georgia, cursive"
              fontSize="18"
            >
              {sentence}
            </text>
            <RuledBand
              y={y + bandH + 8}
              height={bandH}
              left={left}
              right={right}
              clipId={`s2-${index}`}
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
        整句完成後退後兩步看：字高、斜度、字距是否一致。
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
    case "pointed-pen-strokes":
      return <PointedPenStrokes sheet={sheet} />;
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
