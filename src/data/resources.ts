export type PracticeSheetKind =
  | "slant-guidelines"
  | "oval-drills"
  | "broad-nib-rules"
  | "gothic-grid"
  | "blank-lines"
  | "alphabet-upper"
  | "alphabet-lower"
  | "alphabet-family"
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
  /** 字母家族分冊的字母列表 */
  letters?: string[];
  /** 對應 letterFamilies 的 id */
  familyId?: string;
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
    titleZh: "第 1 級｜大寫字母家族",
    titleEn: "Uppercase Families",
    goal: "依直筆、斜筆、圓筆分冊練習，再以總覽頁複習 A–Z。",
  },
  {
    stage: 2,
    titleZh: "第 2 級｜小寫字母家族",
    titleEn: "Lowercase Families",
    goal: "依橢圓、拱門、升降部與特殊形分冊，再以總覽頁複習 a–z。",
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

  // —— Stage 1 uppercase families + overview ——
  {
    slug: "italic-family-upper-straight",
    titleZh: "大寫｜直線家族",
    titleEn: "Uppercase · Straight",
    styleId: "italic",
    kind: "alphabet-family",
    stage: 1,
    familyId: "upper-straight",
    letters: ["I", "L", "T", "H", "E", "F"],
    summary: "垂直與水平骨架：I L T H E F。適合建立大寫第一印象。",
    level: "第 1 級",
    tools: "闊尖筆、墨水",
    uses: ["直筆骨架", "筆畫方向", "家族分冊"],
    guidance: [
      "每個字母左側有筆畫方向示意：箭頭代表起筆到收筆。",
      "流程：看示意 → 描淡字 → 空白自寫。",
      "保持豎筆平行、橫筆水平，再進入下一家族。",
    ],
    sheetTip: "直線家族：先穩骨架，再求細節。",
  },
  {
    slug: "italic-family-upper-diagonal",
    titleZh: "大寫｜斜線家族",
    titleEn: "Uppercase · Diagonal",
    styleId: "italic",
    kind: "alphabet-family",
    stage: 1,
    familyId: "upper-diagonal",
    letters: ["A", "V", "W", "X", "Y", "Z", "K"],
    summary: "對角骨架：A V W X Y Z K。練習斜線交會與平衡。",
    level: "第 1 級",
    tools: "闊尖筆、墨水",
    uses: ["斜筆平衡", "交會點", "家族分冊"],
    guidance: [
      "斜線交會點盡量落在視覺中心，避免左右傾倒。",
      "A / V / W 先定頂點或底點，再拉兩側斜線。",
      "寫完遠看整行，檢查斜度是否一致。",
    ],
    sheetTip: "斜線家族：先定交會點，再拉兩側。",
  },
  {
    slug: "italic-family-upper-round",
    titleZh: "大寫｜圓形家族",
    titleEn: "Uppercase · Round",
    styleId: "italic",
    kind: "alphabet-family",
    stage: 1,
    familyId: "upper-round",
    letters: ["O", "C", "G", "Q", "D", "B", "P", "R", "S", "J", "M", "N", "U"],
    summary: "曲線與碗形為主的大寫字母，一次練一小組即可。",
    level: "第 1 級",
    tools: "闊尖筆、墨水",
    uses: ["曲線控制", "碗形寬度", "家族分冊"],
    guidance: [
      "O / C / G / Q 先求橢圓閉合與左右對稱。",
      "B / P / R 的碗形寬度盡量一致。",
      "本冊字母較多：建議分兩天寫完。",
    ],
    sheetTip: "圓形家族：橢圓對稱優先於速度。",
  },
  {
    slug: "italic-alphabet-upper",
    titleZh: "斜體字大寫總覽 A–Z",
    titleEn: "Italic Uppercase A–Z Overview",
    styleId: "italic",
    kind: "alphabet-upper",
    stage: 1,
    summary:
      "完整大寫一覽：建議先完成三個家族分冊，再用本頁複習。",
    level: "第 1 級",
    tools: "闊尖筆、墨水",
    uses: ["總覽複習", "起筆收筆", "字母辨識"],
    guidance: [
      "若你是初學，請先練直線／斜線／圓形家族分冊。",
      "每列流程：看範字 → 沿淡字描一至兩次 → 空白自寫。",
      "一次專心 4–6 個字母，不要急著寫完整頁。",
    ],
    sheetTip: "總覽頁：範字 → 描寫 → 空白自寫。",
  },

  // —— Stage 2 lowercase families + overview ——
  {
    slug: "italic-family-lower-oval",
    titleZh: "小寫｜橢圓家族",
    titleEn: "Lowercase · Oval",
    styleId: "italic",
    kind: "alphabet-family",
    stage: 2,
    familyId: "lower-oval",
    letters: ["o", "c", "e", "a", "d", "g", "q"],
    summary: "以 o 為核心的橢圓形小寫：o c e a d g q。",
    level: "第 2 級",
    tools: "闊尖筆、墨水",
    uses: ["橢圓基礎", "筆畫方向", "家族分冊"],
    guidance: [
      "先把 o 寫穩，其餘字母多半由此變形。",
      "左側示意箭頭：慢描一遍再落筆。",
      "a / d / g / q 的右側豎筆要垂直穩定。",
    ],
    sheetTip: "橢圓家族：o 穩了，全家都穩。",
  },
  {
    slug: "italic-family-lower-arch",
    titleZh: "小寫｜拱形家族",
    titleEn: "Lowercase · Arch",
    styleId: "italic",
    kind: "alphabet-family",
    stage: 2,
    familyId: "lower-arch",
    letters: ["i", "n", "h", "m", "u", "r"],
    summary: "拱門節奏：i n h m u r。練習拱形寬度與連筆入口。",
    level: "第 2 級",
    tools: "闊尖筆、墨水",
    uses: ["拱門寬度", "連筆入口", "家族分冊"],
    guidance: [
      "n / h / m 的拱門寬度盡量一致。",
      "先寫下筆幹，再補拱門，避免整字歪斜。",
      "寫完一列後退後兩步看節奏是否均勻。",
    ],
    sheetTip: "拱形家族：拱門寬度保持一致。",
  },
  {
    slug: "italic-family-lower-asc-desc",
    titleZh: "小寫｜升部／降部",
    titleEn: "Lowercase · Ascenders & Descenders",
    styleId: "italic",
    kind: "alphabet-family",
    stage: 2,
    familyId: "lower-asc-desc",
    letters: ["l", "t", "b", "p", "k", "f", "j", "y"],
    summary: "高度控制：l t b p k f j y。升部與降部不要過長或過短。",
    level: "第 2 級",
    tools: "闊尖筆、墨水",
    uses: ["升部降部", "高度比例", "家族分冊"],
    guidance: [
      "升部頂到上虛線附近即可，不要衝出紙邊感。",
      "降部同樣克制，保持整行視覺重量平均。",
      "b / p 可對照橢圓家族的碗形寬度。",
    ],
    sheetTip: "升降部：高度克制，整行才穩。",
  },
  {
    slug: "italic-family-lower-special",
    titleZh: "小寫｜特殊形",
    titleEn: "Lowercase · Special Forms",
    styleId: "italic",
    kind: "alphabet-family",
    stage: 2,
    familyId: "lower-special",
    letters: ["s", "v", "w", "x", "z"],
    summary: "獨立結構字母：s v w x z。適合在橢圓與拱門之後練習。",
    level: "第 2 級",
    tools: "闊尖筆、墨水",
    uses: ["特殊結構", "筆畫方向", "家族分冊"],
    guidance: [
      "s 的上下彎曲要對稱，避免頭重腳輕。",
      "v / w / x / z 注意斜線交會與起收筆。",
      "本冊較短，可與總覽頁同一天複習。",
    ],
    sheetTip: "特殊形：慢寫結構，少求連筆花俏。",
  },
  {
    slug: "italic-alphabet-lower",
    titleZh: "斜體字小寫總覽 a–z",
    titleEn: "Italic Lowercase a–z Overview",
    styleId: "italic",
    kind: "alphabet-lower",
    stage: 2,
    summary:
      "完整小寫一覽：建議先完成四個家族分冊，再用本頁複習。",
    level: "第 2 級",
    tools: "闊尖筆、墨水",
    uses: ["總覽複習", "升部降部", "小寫節奏"],
    guidance: [
      "先完成橢圓、拱形、升降部、特殊形分冊再來。",
      "注意 x-height，以及升部（b d h）與降部（g j p q y）。",
      "小寫穩定後，才進入第 3 級詞語。",
    ],
    sheetTip: "總覽頁：先家族、再整頁複習。",
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

/** 依星期輪替，給出「今日練習」建議 */
export function getTodaysPractice(date = new Date()) {
  const day = date.getDay(); // 0 Sun ... 6 Sat
  const plan = [
    {
      focus: "熱身與筆壓",
      reason: "適合放慢節奏，先把線條感覺找回來。",
      sheetSlugs: ["copperplate-ovals", "italic-rules"],
    },
    {
      focus: "大寫直筆家族",
      reason: "從結構最清楚的直筆大寫開始一週。",
      sheetSlugs: ["italic-family-upper-straight", "copperplate-guidelines"],
    },
    {
      focus: "大寫斜筆與圓筆",
      reason: "挑戰角度平衡與曲線控制。",
      sheetSlugs: [
        "italic-family-upper-diagonal",
        "italic-family-upper-round",
      ],
    },
    {
      focus: "小寫橢圓與拱門",
      reason: "打好小寫基本形，後面連筆會輕鬆很多。",
      sheetSlugs: ["italic-family-lower-oval", "italic-family-lower-arch"],
    },
    {
      focus: "升降部與特殊形",
      reason: "處理 b/d/g/y 與 s/r/z 這些易歪字母。",
      sheetSlugs: [
        "italic-family-lower-asc-desc",
        "italic-family-lower-special",
      ],
    },
    {
      focus: "單字組合",
      reason: "把字母串成字，檢查字距與節奏。",
      sheetSlugs: ["italic-words-basic", "italic-alphabet-lower"],
    },
    {
      focus: "短句與總複習",
      reason: "用完整句子收束一週練習。",
      sheetSlugs: ["italic-sentences-basic", "italic-alphabet-upper"],
    },
  ] as const;

  const today = plan[day];
  const sheets = today.sheetSlugs
    .map((slug) => getPracticeSheet(slug))
    .filter((sheet): sheet is PracticeSheet => Boolean(sheet));

  return {
    weekdayLabel: ["日", "一", "二", "三", "四", "五", "六"][day],
    focus: today.focus,
    reason: today.reason,
    sheets,
  };
}
