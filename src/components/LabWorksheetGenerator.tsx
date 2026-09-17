"use client";

import { useMemo, useState } from "react";
import {
  getLabWorksheetFont,
  groupLabWorksheetFonts,
  labWorksheetPresets,
  type LabWorksheetPresetId,
} from "@/data/lab/worksheetFonts";
import {
  renderWorksheetPages,
  type WorksheetPageMode,
  type WorksheetRenderState,
  type WorksheetSlant,
  type WorksheetSpacingMode,
} from "@/lib/labWorksheet";

const GRID_COLORS = [
  { value: "#245c54", labelZh: "實驗室青綠" },
  { value: "#3b82f6", labelZh: "經典水藍" },
  { value: "#64748b", labelZh: "鉛筆灰" },
  { value: "#9a8658", labelZh: "黃銅" },
  { value: "#d97706", labelZh: "古典棕紅" },
] as const;

export function LabWorksheetGenerator() {
  const fontGroups = groupLabWorksheetFonts();
  const [presetId, setPresetId] = useState<LabWorksheetPresetId>("modern");
  const [fontId, setFontId] = useState("great-vibes");
  const [pageMode, setPageMode] = useState<WorksheetPageMode>("all");
  const [slantAngle, setSlantAngle] = useState<WorksheetSlant>(55);
  const [gridColor, setGridColor] = useState("#245c54");
  const [fontSize, setFontSize] = useState(38);
  const [traceOpacity, setTraceOpacity] = useState(0.25);
  const [spacingMode, setSpacingMode] = useState<WorksheetSpacingMode>("grid");
  const [customSpacing, setCustomSpacing] = useState(230);
  const [mainTitle, setMainTitle] = useState("Scriptoria Lab");
  const [subTitle, setSubTitle] = useState("超级實驗室 · 多款式練習字帖");
  const [customTextRaw, setCustomTextRaw] = useState(
    "minimum\ncalligraphy\nbeautiful\ncreative",
  );

  const font = getLabWorksheetFont(fontId) ?? getLabWorksheetFont("great-vibes")!;

  const state: WorksheetRenderState = useMemo(
    () => ({
      fontFamily: font.fontFamily,
      slantAngle,
      gridColor,
      fontSize,
      traceOpacity,
      spacingMode,
      customSpacing,
      mainTitle,
      subTitle,
      customText: customTextRaw
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean),
    }),
    [
      font.fontFamily,
      slantAngle,
      gridColor,
      fontSize,
      traceOpacity,
      spacingMode,
      customSpacing,
      mainTitle,
      subTitle,
      customTextRaw,
    ],
  );

  const pagesHtml = useMemo(
    () => renderWorksheetPages(pageMode, state),
    [pageMode, state],
  );

  function applyPreset(id: LabWorksheetPresetId) {
    const preset = labWorksheetPresets[id];
    setPresetId(id);
    setFontId(preset.fontId);
    setSlantAngle(preset.slant);
  }

  function handleFontChange(nextId: string) {
    setFontId(nextId);
    const next = getLabWorksheetFont(nextId);
    if (next?.defaultSlant != null) setSlantAngle(next.defaultSlant);
  }

  return (
    <div className="lab-generator">
      <aside className="lab-generator__controls no-print">
        <p className="lab-generator__eyebrow">BAY G · WORKSHEET FORGE</p>
        <h2 className="lab-generator__title">多款式字帖生成器</h2>
        <p className="lab-generator__lead">
          對齊你提供嘅字帖機：換草體、調斜度、描紅，再列印。適合實驗室肉眼揀字之後試紙。
        </p>

        <div className="lab-generator__block">
          <p className="lab-generator__label">1. 快選體裁</p>
          <div className="lab-generator__presets">
            {(Object.keys(labWorksheetPresets) as LabWorksheetPresetId[]).map(
              (id) => (
                <button
                  key={id}
                  type="button"
                  className={`lab-generator__preset${presetId === id ? " is-active" : ""}`}
                  onClick={() => applyPreset(id)}
                >
                  {labWorksheetPresets[id].labelZh}
                </button>
              ),
            )}
          </div>
          <label className="lab-generator__field">
            <span>字型款式</span>
            <select
              value={fontId}
              onChange={(event) => handleFontChange(event.target.value)}
            >
              {fontGroups.map((group) => (
                <optgroup key={group.groupZh} label={group.groupZh}>
                  {group.fonts.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.labelZh}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
        </div>

        <div className="lab-generator__block">
          <p className="lab-generator__label">2. 練習內容</p>
          <label className="lab-generator__field">
            <span>頁面模式</span>
            <select
              value={pageMode}
              onChange={(event) =>
                setPageMode(event.target.value as WorksheetPageMode)
              }
            >
              <option value="all">全套（P1 + P2 + P3）</option>
              <option value="warmup">暖手線條</option>
              <option value="p1">Page 01：基礎筆劃與家族</option>
              <option value="p2">Page 02：小寫 a–z</option>
              <option value="p3">Page 03：大寫、數字與詞</option>
              <option value="quotes">名言短句</option>
              <option value="custom">自訂內容</option>
            </select>
          </label>
          {pageMode === "custom" ? (
            <label className="lab-generator__field">
              <span>自訂文字（每行一組）</span>
              <textarea
                rows={4}
                value={customTextRaw}
                onChange={(event) => setCustomTextRaw(event.target.value)}
              />
            </label>
          ) : null}
        </div>

        <div className="lab-generator__block">
          <p className="lab-generator__label">3. 格線與比例</p>
          <div className="lab-generator__grid2">
            <label className="lab-generator__field">
              <span>斜線角度</span>
              <select
                value={slantAngle}
                onChange={(event) =>
                  setSlantAngle(Number(event.target.value) as WorksheetSlant)
                }
              >
                <option value={55}>55° 標準</option>
                <option value={52}>52° 銅板／斯賓塞</option>
                <option value={75}>75° 義大利體</option>
                <option value={90}>90° 哥德垂直</option>
                <option value={0}>無斜線</option>
              </select>
            </label>
            <label className="lab-generator__field">
              <span>格線顏色</span>
              <select
                value={gridColor}
                onChange={(event) => setGridColor(event.target.value)}
              >
                {GRID_COLORS.map((color) => (
                  <option key={color.value} value={color.value}>
                    {color.labelZh}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="lab-generator__field">
            <span>字體大小 {fontSize}</span>
            <input
              type="range"
              min={26}
              max={54}
              value={fontSize}
              onChange={(event) => setFontSize(Number(event.target.value))}
            />
          </label>
          <label className="lab-generator__field">
            <span>描紅透明度 {traceOpacity.toFixed(2)}</span>
            <input
              type="range"
              min={0.1}
              max={0.6}
              step={0.05}
              value={traceOpacity}
              onChange={(event) =>
                setTraceOpacity(Number(event.target.value))
              }
            />
          </label>
          <div className="lab-generator__grid2">
            <label className="lab-generator__field">
              <span>間距模式</span>
              <select
                value={spacingMode}
                onChange={(event) =>
                  setSpacingMode(event.target.value as WorksheetSpacingMode)
                }
              >
                <option value="grid">整齊網格</option>
                <option value="uniform">固定間距</option>
                <option value="auto">動態字寬</option>
              </select>
            </label>
            <label className="lab-generator__field">
              <span>間距 {customSpacing}</span>
              <input
                type="range"
                min={120}
                max={320}
                value={customSpacing}
                onChange={(event) =>
                  setCustomSpacing(Number(event.target.value))
                }
              />
            </label>
          </div>
        </div>

        <div className="lab-generator__block">
          <p className="lab-generator__label">4. 頁頭</p>
          <label className="lab-generator__field">
            <span>主標題</span>
            <input
              value={mainTitle}
              onChange={(event) => setMainTitle(event.target.value)}
            />
          </label>
          <label className="lab-generator__field">
            <span>副標題</span>
            <input
              value={subTitle}
              onChange={(event) => setSubTitle(event.target.value)}
            />
          </label>
        </div>

        <button
          type="button"
          className="btn lab-generator__print"
          onClick={() => window.print()}
        >
          列印／匯出 PDF
        </button>
      </aside>

      <div
        className="lab-generator__stage"
        dangerouslySetInnerHTML={{ __html: pagesHtml }}
      />
    </div>
  );
}
