export type LabWorksheetFontOption = {
  id: string;
  labelZh: string;
  groupZh: string;
  /** CSS font-family stack using lab CSS variables where possible */
  fontFamily: string;
  /** Default slant when picking this face via preset */
  defaultSlant?: 55 | 52 | 75 | 90 | 0;
};

/**
 * 字帖生成器用字體——對齊上傳嘅多款式生成器，並優先用實驗室已載入嘅 OFL 草體。
 */
export const labWorksheetFonts: LabWorksheetFontOption[] = [
  {
    id: "great-vibes",
    labelZh: "Great Vibes（經典優雅）",
    groupZh: "經典軟筆斜體",
    fontFamily: "var(--font-lab-great-vibes), 'Great Vibes', cursive",
    defaultSlant: 55,
  },
  {
    id: "alex-brush",
    labelZh: "Alex Brush（流暢手寫）",
    groupZh: "經典軟筆斜體",
    fontFamily: "var(--font-lab-alex-brush), 'Alex Brush', cursive",
    defaultSlant: 55,
  },
  {
    id: "dancing-script",
    labelZh: "Dancing Script（活潑跳躍）",
    groupZh: "經典軟筆斜體",
    fontFamily: "var(--font-lab-dancing), 'Dancing Script', cursive",
    defaultSlant: 55,
  },
  {
    id: "monsieur",
    labelZh: "Monsieur La Doulaise（極致花體）",
    groupZh: "古典銅板／斯賓塞",
    fontFamily: "var(--font-lab-monsieur), 'Monsieur La Doulaise', cursive",
    defaultSlant: 52,
  },
  {
    id: "pinyon",
    labelZh: "Pinyon Script（高雅宮廷）",
    groupZh: "古典銅板／斯賓塞",
    fontFamily: "var(--font-lab-pinyon), 'Pinyon Script', cursive",
    defaultSlant: 52,
  },
  {
    id: "herr",
    labelZh: "Herr Von Muellerhoff（纖細古典）",
    groupZh: "古典銅板／斯賓塞",
    fontFamily: "var(--font-lab-herr), 'Herr Von Muellerhoff', cursive",
    defaultSlant: 52,
  },
  {
    id: "tangerine",
    labelZh: "Tangerine（高挺義大利體）",
    groupZh: "義大利體／文藝復興",
    fontFamily: "var(--font-lab-tangerine), 'Tangerine', cursive",
    defaultSlant: 75,
  },
  {
    id: "allura",
    labelZh: "Allura（流線花體）",
    groupZh: "義大利體／文藝復興",
    fontFamily: "var(--font-modern), 'Allura', cursive",
    defaultSlant: 75,
  },
  {
    id: "parisienne",
    labelZh: "Parisienne（法式細草）",
    groupZh: "義大利體／文藝復興",
    fontFamily: "var(--font-lab-parisienne), 'Parisienne', cursive",
    defaultSlant: 75,
  },
  {
    id: "scriptoria-italic",
    labelZh: "Scriptoria Italic（自製細草）",
    groupZh: "實驗室自製",
    fontFamily:
      "var(--font-italic-custom), 'Scriptoria Italic', Georgia, serif",
    defaultSlant: 75,
  },
  {
    id: "caveat",
    labelZh: "Caveat（現代隨性手寫）",
    groupZh: "現代刷頭／隨性",
    fontFamily: "var(--font-lab-caveat), 'Caveat', cursive",
    defaultSlant: 55,
  },
  {
    id: "gothic",
    labelZh: "UnifrakturMaguntia（哥德黑體）",
    groupZh: "哥德／中世紀",
    fontFamily: "var(--font-blackletter), 'UnifrakturMaguntia', serif",
    defaultSlant: 90,
  },
];

export type LabWorksheetPresetId =
  | "modern"
  | "copperplate"
  | "italic"
  | "gothic";

export const labWorksheetPresets: Record<
  LabWorksheetPresetId,
  { labelZh: string; fontId: string; slant: 55 | 52 | 75 | 90 }
> = {
  modern: { labelZh: "經典斜體", fontId: "great-vibes", slant: 55 },
  copperplate: { labelZh: "銅板體", fontId: "monsieur", slant: 52 },
  italic: { labelZh: "義大利體", fontId: "tangerine", slant: 75 },
  gothic: { labelZh: "哥德花體", fontId: "gothic", slant: 90 },
};

export function getLabWorksheetFont(
  id: string,
): LabWorksheetFontOption | undefined {
  return labWorksheetFonts.find((item) => item.id === id);
}

export function groupLabWorksheetFonts(): {
  groupZh: string;
  fonts: LabWorksheetFontOption[];
}[] {
  const map = new Map<string, LabWorksheetFontOption[]>();
  for (const font of labWorksheetFonts) {
    const list = map.get(font.groupZh) ?? [];
    list.push(font);
    map.set(font.groupZh, list);
  }
  return [...map.entries()].map(([groupZh, fonts]) => ({ groupZh, fonts }));
}
