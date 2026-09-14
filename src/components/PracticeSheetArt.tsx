import type { ReactNode } from "react";
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
      <line
        x1={MARGIN}
        y1={70}
        x2={PAGE_W - MARGIN}
        y2={70}
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
  const top = 88;
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
  const top = 96;
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
  const top = 92;
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
  const top = 92;
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
  const top = 96;
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
    default: {
      const _exhaustive: never = sheet.kind;
      return _exhaustive;
    }
  }
}
