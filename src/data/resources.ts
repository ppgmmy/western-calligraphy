export type PracticeSheetKind =
  | "slant-guidelines"
  | "oval-drills"
  | "broad-nib-rules"
  | "gothic-grid"
  | "blank-lines"
  | "alphabet-upper"
  | "alphabet-lower"
  | "words"
  | "sentences";

export type PracticeSheetStyleId =
  | "copperplate"
  | "spencerian"
  | "italic"
  | "foundational"
  | "gothic"
  | "general";

/** 0 = 熱身格線；1–4 = 字母大寫 → 小寫 → 詞語 → 句子 */
export type PracticeStage = 0 | 1 | 2 | 3 | 4;

export type PracticeSheet = {
  slug: string;
  titleZh: string;
  titleEn: string;
  styleId: PracticeSheetStyleId;
  kind: PracticeSheetKind;
  stage: PracticeStage;
  summary: string;
  level: "熱身" | "第 1 級" | "第 2 級" | "第 3 級" | "第 4 級";
  tools: string;
  uses: string[];
  /** 頁面上給用家的逐步指引 */
  guidance: string[];
  /** 印在練習紙上的簡短用法 */
  sheetTip: string;
  /** 詞語／句子內容（字母表由元件內建） */
  content?: string[];
};

export const practiceStages: Array<{
  stage: PracticeStage;
  titleZh: string;
  titleEn: string;
  goal: string;
}> = [
  {
    stage: 0,
    titleZh: "第 0 級｜熱身與格線",
    titleEn: "Warm-up & Guidelines",
    goal: "先熟悉紙面比例、斜度與筆感，再進入字母。",
  },
  {
    stage: 1,
    titleZh: "第 1 級｜大寫字母 A–Z",
    titleEn: "Uppercase A–Z",
    goal: "認識每個大寫字母的骨架、起筆與收筆。",
  },
  {
    stage: 2,
    titleZh: "第 2 級｜小寫字母 a–z",
    titleEn: "Lowercase a–z",
    goal: "練好 x-height、升部與降部，建立穩定小寫節奏。",
  },
  {
    stage: 3,
    titleZh: "第 3 級｜簡單詞語",
    titleEn: "Simple Words",
    goal: "把字母連成詞，注意字距與連筆。",
  },
  {
    stage: 4,
    titleZh: "第 4 級｜短句練習",
    titleEn: "Short Sentences",
    goal: "以短句練習整行節奏、呼吸與一致性。",
  },
];

export const practiceSheets: PracticeSheet[] = [
  // —— Stage 0 warm-up ——
  {
    slug: "copperplate-guidelines",
    titleZh: "銅板體導引線",
    titleEn: "Copperplate Guidelines",
    styleId: "copperplate",
    kind: "slant-guidelines",
    stage: 0,
    summary: "55° 斜寫導引線，幫你在寫字母前對好斜度與字高。",
    level: "熱身",
    tools: "尖筆、墨水",
    uses: ["對齊斜度", "控制字高", "字母前熱身"],
    guidance: [
      "先只沿著基線與斜線空畫，不要急著寫完整字母。",
      "保持手腕放鬆，感受 55° 斜度。",
      "熟悉格線後，再進入第 1 級大寫字母。",
    ],
    sheetTip: "熱身用：先對斜度與基線，再寫字母。",
  },
  {
    slug: "copperplate-ovals",
    titleZh: "銅板體橢圓練習",
    titleEn: "Copperplate Ovals",
    styleId: "copperplate",
    kind: "oval-drills",
    stage: 0,
    summary: "橢圓軌跡練習上細下粗，是尖筆壓力控制的基本功。",
    level: "熱身",
    tools: "尖筆、墨水",
    uses: ["壓力控制", "橢圓節奏", "熱身"],
    guidance: [
      "上行輕、下行稍加力，反覆同一個橢圓。",
      "前幾列可描線，後面改成自己畫。",
      "覺得筆壓穩定後，再進入字母級。",
    ],
    sheetTip: "上行細、下行粗；先求穩定，再求漂亮。",
  },
  {
    slug: "italic-rules",
    titleZh: "斜體字筆寬格線",
    titleEn: "Italic Nib Rules",
    styleId: "italic",
    kind: "broad-nib-rules",
    stage: 0,
    summary: "闊尖筆 Italic 的比例格線，後續字母／詞語／句子練習以此為準。",
    level: "熱身",
    tools: "闊尖筆、墨水",
    uses: ["比例訓練", "筆寬感", "入門打底"],
    guidance: [
      "先量好筆寬：x-height 約 5 個筆寬。",
      "在陰影帶內只寫直線與斜線熱身。",
      "接著用同一套比例練習 A–Z。",
    ],
    sheetTip: "本練習本主線：斜體字 Italic。先熟悉筆寬比例。",
  },
  {
    slug: "foundational-rules",
    titleZh: "基礎手寫體格線",
    titleEn: "Foundational Rules",
    styleId: "foundational",
    kind: "broad-nib-rules",
    stage: 0,
    summary: "端正 Foundational Hand 格線，適合想先打穩骨架的用家。",
    level: "熱身",
    tools: "闊尖筆、墨水",
    uses: ["骨架穩定", "筆畫分明", "每日短練"],
    guidance: [
      "保持字母直立、筆畫清楚分離。",
      "每行只練少數筆形，避免一次寫滿。",
      "熟練後可轉 Italic 字母進程。",
    ],
    sheetTip: "端正骨架優先；速度放慢。",
  },
  {
    slug: "spencerian-guidelines",
    titleZh: "斯賓塞體導引線",
    titleEn: "Spencerian Guidelines",
    styleId: "spencerian",
    kind: "slant-guidelines",
    stage: 0,
    summary: "輕盈斜寫紙面，為斯賓塞體連筆與花飾做準備。",
    level: "熱身",
    tools: "尖筆、墨水",
    uses: ["字距", "連筆流動", "花飾前準備"],
    guidance: [
      "線條保持輕，不要壓死筆尖。",
      "先練均勻節奏，再加花飾。",
    ],
    sheetTip: "輕壓、均勻；花飾留到後面。",
  },
  {
    slug: "gothic-grid",
    titleZh: "哥德體垂直格線",
    titleEn: "Gothic Vertical Grid",
    styleId: "gothic",
    kind: "gothic-grid",
    stage: 0,
    summary: "密排垂直格線，協助哥德體等寬豎筆。",
    level: "熱身",
    tools: "闊尖筆、墨水",
    uses: ["豎筆對齊", "等寬感", "中世紀字感"],
    guidance: [
      "先只寫垂直筆，再補斜筆。",
      "保持字距緊湊但可讀。",
    ],
    sheetTip: "先豎筆骨架，再收菱形尾。",
  },
  {
    slug: "blank-practice",
    titleZh: "通用練習線",
    titleEn: "Blank Practice Lines",
    styleId: "general",
    kind: "blank-lines",
    stage: 0,
    summary: "乾淨基線紙，完成各級後可作自由臨摹或複習。",
    level: "熱身",
    tools: "尖筆或闊尖筆",
    uses: ["自由練習", "複習", "簽名"],
    guidance: [
      "可複習已學字母、詞語或短句。",
      "也可自行加上斜線輔助。",
    ],
    sheetTip: "自由複習用；保持與前面同級相同的字高。",
  },

  // —— Stage 1 uppercase ——
  {
    slug: "italic-alphabet-upper",
    titleZh: "斜體字大寫 A–Z",
    titleEn: "Italic Uppercase A–Z",
    styleId: "italic",
    kind: "alphabet-upper",
    stage: 1,
    summary:
      "逐字練習大寫字母：先看範字、再描寫、最後在空行獨立寫出。",
    level: "第 1 級",
    tools: "闊尖筆、墨水",
    uses: ["大寫骨架", "起筆收筆", "字母辨識"],
    guidance: [
      "每列流程：看範字 → 沿淡字描一至兩次 → 在空白格自己寫。",
      "一次專心 4–6 個字母，不要急著寫完整頁。",
      "注意筆畫方向：通常由上而下、由左而右。",
      "完成大寫後，再進入第 2 級小寫。",
    ],
    sheetTip: "第 1 級：大寫 A–Z。範字 → 描寫 → 空白自寫。",
  },

  // —— Stage 2 lowercase ——
  {
    slug: "italic-alphabet-lower",
    titleZh: "斜體字小寫 a–z",
    titleEn: "Italic Lowercase a–z",
    styleId: "italic",
    kind: "alphabet-lower",
    stage: 2,
    summary:
      "小寫字母練習，重點在 x-height、升部（b d h）與降部（g j p q y）。",
    level: "第 2 級",
    tools: "闊尖筆、墨水",
    uses: ["小寫節奏", "升部降部", "家族字母"],
    guidance: [
      "先把 o、a、c、e 等圓形家族寫穩。",
      "再練 n、h、m、r、u 等拱形家族。",
      "升部與降部不要寫得過長或過短。",
      "小寫穩定後，才進入第 3 級詞語。",
    ],
    sheetTip: "第 2 級：小寫 a–z。先家族分組，再整頁複習。",
  },

  // —— Stage 3 words ——
  {
    slug: "italic-words-basic",
    titleZh: "斜體字簡單詞語",
    titleEn: "Italic Basic Words",
    styleId: "italic",
    kind: "words",
    stage: 3,
    summary: "用短詞練習字母連接與字距，為寫句子做準備。",
    level: "第 3 級",
    tools: "闊尖筆、墨水",
    uses: ["連字", "字距", "詞形節奏"],
    guidance: [
      "每個詞先臨摹一行淡字，再獨立寫一行。",
      "字母之間保持呼吸感：不要黏死，也不要拆太開。",
      "寫完一個詞，停頓看整體是否水平、是否同高。",
      "詞語順暢後，進入第 4 級短句。",
    ],
    sheetTip: "第 3 級：簡單詞語。先摹後寫，注意字距。",
    content: [
      "art",
      "ink",
      "pen",
      "calm",
      "form",
      "hand",
      "grace",
      "light",
      "script",
      "quiet",
      "letter",
      "beauty",
    ],
  },

  // —— Stage 4 sentences ——
  {
    slug: "italic-sentences-basic",
    titleZh: "斜體字短句練習",
    titleEn: "Italic Short Sentences",
    styleId: "italic",
    kind: "sentences",
    stage: 4,
    summary: "以完整短句練習整行節奏、一致性與書寫呼吸。",
    level: "第 4 級",
    tools: "闊尖筆、墨水",
    uses: ["整行節奏", "一致性", "書寫呼吸"],
    guidance: [
      "每句先慢讀，想好從哪裡起筆、哪裡換氣。",
      "第一行可描淡字，第二行自己寫。",
      "整句寫完後檢查：字高、斜度、字距是否一致。",
      "熟練後可回到通用練習線，自由抄寫喜歡的句子。",
    ],
    sheetTip: "第 4 級：短句。慢寫、換氣、保持整行一致。",
    content: [
      "Practice makes progress.",
      "Write slowly and steadily.",
      "Keep your lines even today.",
      "Breathe, then begin again.",
      "Beauty grows with patience.",
      "A quiet hand writes clearly.",
    ],
  },
];

export function getPracticeSheet(slug: string): PracticeSheet | undefined {
  return practiceSheets.find((sheet) => sheet.slug === slug);
}

export function getSheetsByStage(stage: PracticeStage): PracticeSheet[] {
  return practiceSheets.filter((sheet) => sheet.stage === stage);
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

export function getStageLabel(stage: PracticeStage): string {
  const found = practiceStages.find((item) => item.stage === stage);
  return found?.titleZh ?? `第 ${stage} 級`;
}
