import type { LabScriptSpecimen, LabScriptTier } from "./scriptSpecimens";

/**
 * 技能實驗室 · 草體標本庫
 * 準則：草階／撩草、藝術氣息強；唔收哥德、印刷襯線、無襯線。
 */
export const labScriptSpecimens: LabScriptSpecimen[] = [
  {
    id: "scriptoria-italic",
    family: "Scriptoria Italic",
    tier: "fine-script",
    moodZh: "細草骨架——清晰、可讀、可教",
    sample: "human scriptoria",
    license: "SIL Open Font License 1.1",
    source: "Cormorant Garamond Italic subset（自製）",
    notesZh: "實驗室自製細草。斜體 master 裁字，網頁用 font-style:normal。",
    render: { kind: "local", fontId: "scriptoria-italic" },
  },
  {
    id: "italianno",
    family: "Italianno",
    tier: "fine-script",
    moodZh: "尖筆正式草——銅板氣口",
    sample: "Beloved flourish",
    license: "SIL Open Font License 1.1",
    source: "Google Fonts · Italianno",
    notesZh: "正式尖筆連筆；適合銅板／斯賓塞方向對照，唔好當花飾入門第一站。",
    render: { kind: "css-var", cssVar: "--font-script" },
  },
  {
    id: "great-vibes",
    family: "Great Vibes",
    tier: "flourished-script",
    moodZh: "撩草——優雅上揚、婚禮氣場",
    sample: "Amore Scriptoria",
    license: "SIL Open Font License 1.1",
    source: "Google Fonts · Great Vibes",
    notesZh: "高對比撩草；入門可對照入筆角度同環形收尾。",
    render: { kind: "css-var", cssVar: "--font-lab-great-vibes" },
  },
  {
    id: "pinyon-script",
    family: "Pinyon Script",
    tier: "flourished-script",
    moodZh: "細撩草——輕、薄、貴族感",
    sample: "Quiet elegance",
    license: "SIL Open Font License 1.1",
    source: "Google Fonts · Pinyon Script",
    notesZh: "纖細連筆；睇小寫連接同 x-height，適合練「輕壓」感覺。",
    render: { kind: "css-var", cssVar: "--font-lab-pinyon" },
  },
  {
    id: "tangerine",
    family: "Tangerine",
    tier: "flourished-script",
    moodZh: "藝術草——柔和起伏",
    sample: "atelier night",
    license: "SIL Open Font License 1.1",
    source: "Google Fonts · Tangerine",
    notesZh: "節奏偏柔；用來對照「藝術氣息」同正式銅板嘅分別。",
    render: { kind: "css-var", cssVar: "--font-lab-tangerine" },
  },
  {
    id: "allura",
    family: "Allura",
    tier: "flourished-script",
    moodZh: "現代花飾草——工作室常用氣口",
    sample: "Flourish gently",
    license: "SIL Open Font License 1.1",
    source: "Google Fonts · Allura",
    notesZh: "現代 calligraphy／花飾對照；練習紙 modern 範字同源。",
    render: { kind: "css-var", cssVar: "--font-modern" },
  },
  {
    id: "alex-brush",
    family: "Alex Brush",
    tier: "flourished-script",
    moodZh: "撩草筆觸——刷感、流動",
    sample: "Ink in motion",
    license: "SIL Open Font License 1.1",
    source: "Google Fonts · Alex Brush",
    notesZh: "偏刷筆流動；睇入筆甩出同字間韻律。",
    render: { kind: "css-var", cssVar: "--font-lab-alex-brush" },
  },
  {
    id: "sacramento",
    family: "Sacramento",
    tier: "flourished-script",
    moodZh: "軟撩草——親密、手寫感",
    sample: "dear reader",
    license: "SIL Open Font License 1.1",
    source: "Google Fonts · Sacramento",
    notesZh: "軟質連筆；適合對照「親切手寫」同「正式尖筆」。",
    render: { kind: "css-var", cssVar: "--font-lab-sacramento" },
  },
  {
    id: "rouge-script",
    family: "Rouge Script",
    tier: "ornate-script",
    moodZh: "華麗細草——飾線、儀式感",
    sample: "Velvet letter",
    license: "SIL Open Font License 1.1",
    source: "Google Fonts · Rouge Script",
    notesZh: "飾感強；實驗用對照，唔建議初學摹寫結構。",
    render: { kind: "css-var", cssVar: "--font-lab-rouge" },
  },
  {
    id: "mea-culpa",
    family: "Mea Culpa",
    tier: "ornate-script",
    moodZh: "極華麗花體——戲劇張力",
    sample: "Imperial night",
    license: "SIL Open Font License 1.1",
    source: "Google Fonts · Mea Culpa",
    notesZh: "站內 Imperial Grandeur 對照；藝術實驗，唔作入門主線。",
    render: { kind: "css-var", cssVar: "--font-grand" },
  },
  {
    id: "mr-dafoe",
    family: "Mr Dafoe",
    tier: "ornate-script",
    moodZh: "戲劇撩草——大動作、張揚",
    sample: "Drama on paper",
    license: "SIL Open Font License 1.1",
    source: "Google Fonts · Mr Dafoe",
    notesZh: "動作大、藝術氣息濃；用來研究節奏同誇張入筆。",
    render: { kind: "css-var", cssVar: "--font-lab-mr-dafoe" },
  },
];

const TIER_ORDER: Record<LabScriptTier, number> = {
  "fine-script": 0,
  "flourished-script": 1,
  "ornate-script": 2,
};

export function getLabScriptSpecimens(): LabScriptSpecimen[] {
  return [...labScriptSpecimens].sort((a, b) => {
    const tierDiff = TIER_ORDER[a.tier] - TIER_ORDER[b.tier];
    if (tierDiff !== 0) return tierDiff;
    return a.family.localeCompare(b.family);
  });
}

export function getLabScriptSpecimensByTier(
  tier: LabScriptTier,
): LabScriptSpecimen[] {
  return getLabScriptSpecimens().filter((item) => item.tier === tier);
}

export function countLabScriptSpecimens(): number {
  return labScriptSpecimens.length;
}
