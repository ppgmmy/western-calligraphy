import type {
  LabScriptFace,
  LabScriptSpecimen,
  LabScriptTier,
} from "./scriptSpecimens";

function face(
  id: string,
  family: string,
  cssVar: string,
  moodZh: string,
  sample: string,
  sourceName: string,
): LabScriptFace {
  return {
    id,
    family,
    moodZh,
    sample,
    source: `Google Fonts · ${sourceName}`,
    render: { kind: "css-var", cssVar },
  };
}

/**
 * 技能實驗室 · 草體標本庫
 * 準則：草階／撩草、藝術氣息強；每款主標本 + 三隻變體供肉眼檢視。
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
    notesZh: "實驗室自製細草。下面三隻變體係相近氣口，肉眼對照後再決定合用邊款。",
    render: { kind: "local", fontId: "scriptoria-italic" },
    variants: [
      face("parisienne", "Parisienne", "--font-lab-parisienne", "法式細連筆", "human scriptoria", "Parisienne"),
      face("norican", "Norican", "--font-lab-norican", "輕盈正式草", "human scriptoria", "Norican"),
      face("arizonia", "Arizonia", "--font-lab-arizonia", "飄逸細草", "human scriptoria", "Arizonia"),
    ],
  },
  {
    id: "italianno",
    family: "Italianno",
    tier: "fine-script",
    moodZh: "尖筆正式草——銅板氣口",
    sample: "Beloved flourish",
    license: "SIL Open Font License 1.1",
    source: "Google Fonts · Italianno",
    notesZh: "正式尖筆連筆。三隻變體偏銅板／儀式感，方便對照正式程度。",
    render: { kind: "css-var", cssVar: "--font-script" },
    variants: [
      face("niconne", "Niconne", "--font-lab-niconne", "圓潤正式草", "Beloved flourish", "Niconne"),
      face("petit-formal", "Petit Formal Script", "--font-lab-petit-formal", "細緻正式", "Beloved flourish", "Petit Formal Script"),
      face("clicker", "Clicker Script", "--font-lab-clicker", "尖筆跳動", "Beloved flourish", "Clicker Script"),
    ],
  },
  {
    id: "great-vibes",
    family: "Great Vibes",
    tier: "flourished-script",
    moodZh: "撩草——優雅上揚、婚禮氣場",
    sample: "Amore Scriptoria",
    license: "SIL Open Font License 1.1",
    source: "Google Fonts · Great Vibes",
    notesZh: "高對比撩草。變體偏婚禮／邀請函氣場。",
    render: { kind: "css-var", cssVar: "--font-lab-great-vibes" },
    variants: [
      face("ephesis", "Ephesis", "--font-lab-ephesis", "柔和上揚", "Amore Scriptoria", "Ephesis"),
      face("playball", "Playball", "--font-lab-playball", "跳躍撩草", "Amore Scriptoria", "Playball"),
      face("style-script", "Style Script", "--font-lab-style-script", "當代優雅", "Amore Scriptoria", "Style Script"),
    ],
  },
  {
    id: "pinyon-script",
    family: "Pinyon Script",
    tier: "flourished-script",
    moodZh: "細撩草——輕、薄、貴族感",
    sample: "Quiet elegance",
    license: "SIL Open Font License 1.1",
    source: "Google Fonts · Pinyon Script",
    notesZh: "纖細連筆。變體同樣偏薄、輕壓感。",
    render: { kind: "css-var", cssVar: "--font-lab-pinyon" },
    variants: [
      face("windsong", "WindSong", "--font-lab-windsong", "風線細草", "Quiet elegance", "WindSong"),
      face("birthstone", "Birthstone", "--font-lab-birthstone", "輕薄飾感", "Quiet elegance", "Birthstone"),
      face("inspiration", "Inspiration", "--font-lab-inspiration", "空氣感連筆", "Quiet elegance", "Inspiration"),
    ],
  },
  {
    id: "tangerine",
    family: "Tangerine",
    tier: "flourished-script",
    moodZh: "藝術草——柔和起伏",
    sample: "atelier night",
    license: "SIL Open Font License 1.1",
    source: "Google Fonts · Tangerine",
    notesZh: "節奏偏柔。變體用來對照柔和藝術氣息。",
    render: { kind: "css-var", cssVar: "--font-lab-tangerine" },
    variants: [
      face("courgette", "Courgette", "--font-lab-courgette", "柔圓藝術草", "atelier night", "Courgette"),
      face("satisfy", "Satisfy", "--font-lab-satisfy", "輕鬆連筆", "atelier night", "Satisfy"),
      face("cookie", "Cookie", "--font-lab-cookie", "甜潤手寫草", "atelier night", "Cookie"),
    ],
  },
  {
    id: "allura",
    family: "Allura",
    tier: "flourished-script",
    moodZh: "現代花飾草——工作室常用氣口",
    sample: "Flourish gently",
    license: "SIL Open Font License 1.1",
    source: "Google Fonts · Allura",
    notesZh: "現代 calligraphy 對照。變體偏當代工作室風。",
    render: { kind: "css-var", cssVar: "--font-modern" },
    variants: [
      face("yellowtail", "Yellowtail", "--font-lab-yellowtail", "招牌撩草", "Flourish gently", "Yellowtail"),
      face("kaushan", "Kaushan Script", "--font-lab-kaushan", "現代筆刷草", "Flourish gently", "Kaushan Script"),
      face("marck", "Marck Script", "--font-lab-marck", "手感現代草", "Flourish gently", "Marck Script"),
    ],
  },
  {
    id: "alex-brush",
    family: "Alex Brush",
    tier: "flourished-script",
    moodZh: "撩草筆觸——刷感、流動",
    sample: "Ink in motion",
    license: "SIL Open Font License 1.1",
    source: "Google Fonts · Alex Brush",
    notesZh: "偏刷筆流動。變體同樣睇入筆甩出。",
    render: { kind: "css-var", cssVar: "--font-lab-alex-brush" },
    variants: [
      face("seaweed", "Seaweed Script", "--font-lab-seaweed", "流動刷草", "Ink in motion", "Seaweed Script"),
      face("dynalight", "Dynalight", "--font-lab-dynalight", "閃電連筆", "Ink in motion", "Dynalight"),
      face("qwigley", "Qwigley", "--font-lab-qwigley", "彈性刷感", "Ink in motion", "Qwigley"),
    ],
  },
  {
    id: "sacramento",
    family: "Sacramento",
    tier: "flourished-script",
    moodZh: "軟撩草——親密、手寫感",
    sample: "dear reader",
    license: "SIL Open Font License 1.1",
    source: "Google Fonts · Sacramento",
    notesZh: "軟質連筆。變體偏親密手寫。",
    render: { kind: "css-var", cssVar: "--font-lab-sacramento" },
    variants: [
      face("dancing", "Dancing Script", "--font-lab-dancing", "輕快手寫", "dear reader", "Dancing Script"),
      face("stalemate", "Stalemate", "--font-lab-stalemate", "細軟連筆", "dear reader", "Stalemate"),
      face("whispers", "Whisper", "--font-lab-whispers", "低語手寫", "dear reader", "Whisper"),
    ],
  },
  {
    id: "rouge-script",
    family: "Rouge Script",
    tier: "ornate-script",
    moodZh: "華麗細草——飾線、儀式感",
    sample: "Velvet letter",
    license: "SIL Open Font License 1.1",
    source: "Google Fonts · Rouge Script",
    notesZh: "飾感強。變體同樣偏儀式／華麗。",
    render: { kind: "css-var", cssVar: "--font-lab-rouge" },
    variants: [
      face("luxurious", "Luxurious Script", "--font-lab-luxurious", "奢華飾草", "Velvet letter", "Luxurious Script"),
      face("imperial", "Imperial Script", "--font-lab-imperial", "帝國飾線", "Velvet letter", "Imperial Script"),
      face("updock", "Updock", "--font-lab-updock", "高對比飾草", "Velvet letter", "Updock"),
    ],
  },
  {
    id: "mea-culpa",
    family: "Mea Culpa",
    tier: "ornate-script",
    moodZh: "極華麗花體——戲劇張力",
    sample: "Imperial night",
    license: "SIL Open Font License 1.1",
    source: "Google Fonts · Mea Culpa",
    notesZh: "極華麗實驗。變體同樣戲劇張力高。",
    render: { kind: "css-var", cssVar: "--font-grand" },
    variants: [
      face("monsieur", "Monsieur La Doulaise", "--font-lab-monsieur", "法式極華麗", "Imperial night", "Monsieur La Doulaise"),
      face("mrs-saint", "Mrs Saint Delafield", "--font-lab-mrs-saint", "細密花飾", "Imperial night", "Mrs Saint Delafield"),
      face("miss-fajardos", "Miss Fajardose", "--font-lab-miss-fajardos", "古典華麗", "Imperial night", "Miss Fajardose"),
    ],
  },
  {
    id: "mr-dafoe",
    family: "Mr Dafoe",
    tier: "ornate-script",
    moodZh: "戲劇撩草——大動作、張揚",
    sample: "Drama on paper",
    license: "SIL Open Font License 1.1",
    source: "Google Fonts · Mr Dafoe",
    notesZh: "大動作藝術草。變體同樣張揚，方便肉眼揀「戲劇程度」。",
    render: { kind: "css-var", cssVar: "--font-lab-mr-dafoe" },
    variants: [
      face("eagle-lake", "Eagle Lake", "--font-lab-eagle-lake", "大開大合", "Drama on paper", "Eagle Lake"),
      face("felipa", "Felipa", "--font-lab-felipa", "張揚連筆", "Drama on paper", "Felipa"),
      face("jim-nightshade", "Jim Nightshade", "--font-lab-jim-nightshade", "暗夜戲劇草", "Drama on paper", "Jim Nightshade"),
    ],
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

/** Primary + three variants each — total faces for eye inspection. */
export function countLabScriptFaces(): number {
  return labScriptSpecimens.reduce(
    (sum, item) => sum + 1 + item.variants.length,
    0,
  );
}

export function specimenAsFace(specimen: LabScriptSpecimen): LabScriptFace {
  return {
    id: specimen.id,
    family: specimen.family,
    moodZh: specimen.moodZh,
    sample: specimen.sample,
    source: specimen.source,
    render: specimen.render,
  };
}
