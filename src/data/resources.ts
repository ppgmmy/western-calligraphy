export type PracticeSheetKind =
  | "slant-guidelines"
  | "oval-drills"
  | "broad-nib-rules"
  | "gothic-grid"
  | "blank-lines";

export type PracticeSheetStyleId =
  | "copperplate"
  | "spencerian"
  | "italic"
  | "foundational"
  | "gothic"
  | "general";

export type PracticeSheet = {
  slug: string;
  titleZh: string;
  titleEn: string;
  styleId: PracticeSheetStyleId;
  kind: PracticeSheetKind;
  summary: string;
  level: "入門" | "進階";
  tools: string;
  uses: string[];
};

export const practiceSheets: PracticeSheet[] = [
  {
    slug: "copperplate-guidelines",
    titleZh: "銅板體導引線",
    titleEn: "Copperplate Guidelines",
    styleId: "copperplate",
    kind: "slant-guidelines",
    summary:
      "55° 斜寫導引線與基線分組，適合尖筆練字母高度、斜度與字距。",
    level: "入門",
    tools: "尖筆、墨水",
    uses: ["對齊斜度", "控制字高", "日常臨摹"],
  },
  {
    slug: "copperplate-ovals",
    titleZh: "銅板體橢圓練習",
    titleEn: "Copperplate Ovals",
    styleId: "copperplate",
    kind: "oval-drills",
    summary:
      "沿著橢圓軌跡反覆練習上細下粗，是進入銅板體字母前的基本功。",
    level: "入門",
    tools: "尖筆、墨水",
    uses: ["壓力控制", "橢圓節奏", "熱身練習"],
  },
  {
    slug: "spencerian-guidelines",
    titleZh: "斯賓塞體導引線",
    titleEn: "Spencerian Guidelines",
    styleId: "spencerian",
    kind: "slant-guidelines",
    summary:
      "輕盈斜寫紙面，幫助維持斯賓塞體的卵形結構與均勻節奏。",
    level: "入門",
    tools: "尖筆、墨水",
    uses: ["字距練習", "連筆流動", "花飾前準備"],
  },
  {
    slug: "italic-rules",
    titleZh: "斜體字筆寬格線",
    titleEn: "Italic Nib Rules",
    styleId: "italic",
    kind: "broad-nib-rules",
    summary:
      "以筆寬倍數標示 x-height 與升部／降部，適合闊尖筆 Italic 入門。",
    level: "入門",
    tools: "闊尖筆、墨水",
    uses: ["比例訓練", "字母骨架", "短句練習"],
  },
  {
    slug: "foundational-rules",
    titleZh: "基礎手寫體格線",
    titleEn: "Foundational Rules",
    styleId: "foundational",
    kind: "broad-nib-rules",
    summary:
      "端正的 Foundational Hand 練習紙，建立穩定字高與筆畫節奏。",
    level: "入門",
    tools: "闊尖筆、墨水",
    uses: ["入門打底", "筆畫分明", "每日短練"],
  },
  {
    slug: "gothic-grid",
    titleZh: "哥德體垂直格線",
    titleEn: "Gothic Vertical Grid",
    styleId: "gothic",
    kind: "gothic-grid",
    summary:
      "密排垂直格線，幫助哥德體保持等寬豎筆與莊嚴字距。",
    level: "進階",
    tools: "闊尖筆、墨水",
    uses: ["豎筆對齊", "菱形收尾", "中世紀字感"],
  },
  {
    slug: "blank-practice",
    titleZh: "通用練習線",
    titleEn: "Blank Practice Lines",
    styleId: "general",
    kind: "blank-lines",
    summary:
      "乾淨基線紙，適合任何字體做自由臨摹、短句或簽名練習。",
    level: "入門",
    tools: "尖筆或闊尖筆",
    uses: ["自由練習", "短句書寫", "列印多用"],
  },
];

export function getPracticeSheet(slug: string): PracticeSheet | undefined {
  return practiceSheets.find((sheet) => sheet.slug === slug);
}

export function getStyleLabel(styleId: PracticeSheetStyleId): string {
  switch (styleId) {
    case "copperplate":
      return "銅板體";
    case "spencerian":
      return "斯賓塞體";
    case "italic":
      return "斜體字";
    case "foundational":
      return "基礎手寫體";
    case "gothic":
      return "哥德體";
    case "general":
      return "通用";
    default: {
      const _exhaustive: never = styleId;
      return _exhaustive;
    }
  }
}
