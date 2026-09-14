export type PracticeSheetKind =
  | "slant-guidelines"
  | "oval-drills"
  | "broad-nib-rules"
  | "gothic-grid"
  | "blank-lines"
  | "pointed-pen-strokes"
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

/** 練習路線：斜體主線，或尖筆銅板／斯賓塞平行進程 */
export type PracticeTrackId =
  | "italic"
  | "copperplate"
  | "spencerian"
  | "shared";

/** 詞語／句子難度 */
export type PracticeDifficulty = "easy" | "medium" | "hard";

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
  /** 所屬練習路線 */
  track?: PracticeTrackId;
  /** 詞語／句子難度 */
  difficulty?: PracticeDifficulty;
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
    titleZh: "第 3 級｜詞語（易／中／難）",
    titleEn: "Words by Difficulty",
    goal: "由短詞到升降部多的詞，分難度練習字距與連筆。",
  },
  {
    stage: 4,
    titleZh: "第 4 級｜短句（易／中／難）",
    titleEn: "Sentences by Difficulty",
    goal: "由短句到節奏複雜的句子，分難度練習整行呼吸與一致性。",
  },
];

/** 三條可並行的練習路線（斜體主線 + 兩條尖筆線） */
export const practiceTracks: Array<{
  id: Exclude<PracticeTrackId, "shared">;
  titleZh: string;
  titleEn: string;
  summary: string;
  tools: string;
  sheetSlugs: string[];
}> = [
  {
    id: "italic",
    titleZh: "斜體字主線",
    titleEn: "Italic Path",
    summary: "闊尖筆：格線 → 字母家族 → 詞語難度冊 → 短句難度冊。",
    tools: "闊尖筆、墨水",
    sheetSlugs: [
      "italic-rules",
      "italic-family-upper-straight",
      "italic-family-lower-oval",
      "italic-words-easy",
      "italic-sentences-easy",
    ],
  },
  {
    id: "copperplate",
    titleZh: "銅板體尖筆線",
    titleEn: "Copperplate Path",
    summary: "尖筆：導引線 → 橢圓 → 基本筆畫 → 核心小寫 → 短詞。",
    tools: "尖筆、墨水",
    sheetSlugs: [
      "copperplate-guidelines",
      "copperplate-ovals",
      "copperplate-basic-strokes",
      "copperplate-minuscule-core",
      "copperplate-words-easy",
    ],
  },
  {
    id: "spencerian",
    titleZh: "斯賓塞體尖筆線",
    titleEn: "Spencerian Path",
    summary: "尖筆：導引線 → 複合曲線 → 基本筆畫 → 核心小寫 → 短詞。",
    tools: "尖筆、墨水",
    sheetSlugs: [
      "spencerian-guidelines",
      "spencerian-compound-curves",
      "spencerian-basic-strokes",
      "spencerian-minuscule-core",
      "spencerian-words-easy",
    ],
  },
];

export function getDifficultyLabel(difficulty?: PracticeDifficulty): string {
  switch (difficulty) {
    case "easy":
      return "易";
    case "medium":
      return "中";
    case "hard":
      return "難";
    case undefined:
      return "";
    default: {
      const _exhaustive: never = difficulty;
      return _exhaustive;
    }
  }
}

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

  // —— Copperplate pointed-pen path ——
  {
    slug: "copperplate-basic-strokes",
    titleZh: "銅板體基本筆畫",
    titleEn: "Copperplate Basic Strokes",
    styleId: "copperplate",
    kind: "pointed-pen-strokes",
    stage: 0,
    track: "copperplate",
    summary: "尖筆壓力轉換：細畫上行、粗畫下行，建立銅板體筆觸基礎。",
    level: "熱身",
    tools: "尖筆、墨水",
    uses: ["壓力控制", "粗細轉換", "尖筆熱身"],
    guidance: [
      "下行稍加力形成陰影筆畫，上行幾乎不施壓。",
      "先求每一筆粗細轉換乾淨，再求速度。",
      "完成後進入核心小寫字母。",
    ],
    sheetTip: "銅板基本筆畫：下行粗、上行細。",
  },
  {
    slug: "copperplate-minuscule-core",
    titleZh: "銅板體核心小寫",
    titleEn: "Copperplate Minuscule Core",
    styleId: "copperplate",
    kind: "alphabet-family",
    stage: 2,
    track: "copperplate",
    familyId: "copperplate-minuscule-core",
    letters: ["i", "u", "n", "m", "a", "o", "c", "e"],
    summary: "尖筆小寫核心形：i u n m a o c e。先穩橢圓與拱門。",
    level: "第 2 級",
    tools: "尖筆、墨水",
    uses: ["核心小寫", "筆畫方向", "尖筆進程"],
    guidance: [
      "左側示意箭頭：慢描起筆到收筆。",
      "保持約 55° 斜度，陰影筆畫寬度盡量一致。",
      "這八個字母穩了，再進入短詞。",
    ],
    sheetTip: "銅板核心小寫：先穩 i/u/n/m 與 a/o/c/e。",
  },
  {
    slug: "copperplate-words-easy",
    titleZh: "銅板體短詞｜易",
    titleEn: "Copperplate Words · Easy",
    styleId: "copperplate",
    kind: "words",
    stage: 3,
    track: "copperplate",
    difficulty: "easy",
    summary: "3–4 字母短詞，練習尖筆連筆與字距。",
    level: "第 3 級",
    tools: "尖筆、墨水",
    uses: ["短詞", "連筆", "字距"],
    guidance: [
      "每個詞先慢寫一筆陰影、再補細畫連接。",
      "字距以能放入細畫為直覺。",
      "寫完遠看斜度是否整行一致。",
    ],
    sheetTip: "銅板短詞（易）：先求穩定，再求華麗。",
    content: ["in", "on", "me", "one", "mine", "name", "come", "moon", "nice", "once"],
  },

  // —— Spencerian pointed-pen path ——
  {
    slug: "spencerian-compound-curves",
    titleZh: "斯賓塞體複合曲線",
    titleEn: "Spencerian Compound Curves",
    styleId: "spencerian",
    kind: "pointed-pen-strokes",
    stage: 0,
    track: "spencerian",
    summary: "輕盈複合曲線熱身，為斯賓塞體流動節奏做準備。",
    level: "熱身",
    tools: "尖筆、墨水",
    uses: ["曲線節奏", "輕壓", "流動感"],
    guidance: [
      "整頁保持輕壓，只在需要處略加重。",
      "曲線連接要圓滑，避免突然折角。",
      "節奏穩定後，再進入基本筆畫。",
    ],
    sheetTip: "斯賓塞複合曲線：輕、連、均勻。",
  },
  {
    slug: "spencerian-basic-strokes",
    titleZh: "斯賓塞體基本筆畫",
    titleEn: "Spencerian Basic Strokes",
    styleId: "spencerian",
    kind: "pointed-pen-strokes",
    stage: 0,
    track: "spencerian",
    summary: "直筆、曲線與進出筆練習，建立斯賓塞體骨架感。",
    level: "熱身",
    tools: "尖筆、墨水",
    uses: ["基本筆畫", "進出筆", "骨架"],
    guidance: [
      "先練等距直筆，再練進出曲線。",
      "筆畫之間留一致呼吸。",
      "完成後進入核心小寫。",
    ],
    sheetTip: "斯賓塞基本筆畫：均勻勝過用力。",
  },
  {
    slug: "spencerian-minuscule-core",
    titleZh: "斯賓塞體核心小寫",
    titleEn: "Spencerian Minuscule Core",
    styleId: "spencerian",
    kind: "alphabet-family",
    stage: 2,
    track: "spencerian",
    familyId: "spencerian-minuscule-core",
    letters: ["i", "u", "n", "m", "x", "v", "w", "r"],
    summary: "斯賓塞核心小寫：i u n m x v w r。強調流動進出筆。",
    level: "第 2 級",
    tools: "尖筆、墨水",
    uses: ["核心小寫", "流動進出", "尖筆進程"],
    guidance: [
      "進出筆保持輕盈，不要壓死起筆。",
      "n / m 的拱門寬度盡量一致。",
      "寫穩後進入短詞練習。",
    ],
    sheetTip: "斯賓塞核心小寫：輕進出、穩節奏。",
  },
  {
    slug: "spencerian-words-easy",
    titleZh: "斯賓塞體短詞｜易",
    titleEn: "Spencerian Words · Easy",
    styleId: "spencerian",
    kind: "words",
    stage: 3,
    track: "spencerian",
    difficulty: "easy",
    summary: "短詞練習連筆流動，保持輕盈字距。",
    level: "第 3 級",
    tools: "尖筆、墨水",
    uses: ["短詞", "連筆流動", "字距"],
    guidance: [
      "連筆不要拖泥帶水，保持輕快節奏。",
      "每個詞寫完檢查基線是否平。",
      "可與複合曲線熱身同一天交替練。",
    ],
    sheetTip: "斯賓塞短詞（易）：連筆輕快、字距勻。",
    content: ["in", "run", "win", "vine", "mine", "warm", "rain", "wave", "river", "winter"],
  },

  // —— Stage 3 Italic words by difficulty ——
  {
    slug: "italic-words-easy",
    titleZh: "斜體字詞語｜易",
    titleEn: "Italic Words · Easy",
    styleId: "italic",
    kind: "words",
    stage: 3,
    track: "italic",
    difficulty: "easy",
    summary: "3–4 字母短詞，少升降部，適合剛離開字母家族的練習。",
    level: "第 3 級",
    tools: "闊尖筆、墨水",
    uses: ["短詞", "字距入門", "連筆基礎"],
    guidance: [
      "每個詞先臨摹一行淡字，再獨立寫一行。",
      "字母之間保持呼吸感：不要黏死，也不要拆太開。",
      "寫完一個詞，停頓看整體是否水平、是否同高。",
      "順暢後再進入「中」難度冊。",
    ],
    sheetTip: "詞語｜易：短詞、少升降部。先摹後寫。",
    content: [
      "art",
      "ink",
      "pen",
      "calm",
      "form",
      "hand",
      "note",
      "line",
      "soft",
      "warm",
      "care",
      "time",
    ],
  },
  {
    slug: "italic-words-medium",
    titleZh: "斜體字詞語｜中",
    titleEn: "Italic Words · Medium",
    styleId: "italic",
    kind: "words",
    stage: 3,
    track: "italic",
    difficulty: "medium",
    summary: "5–6 字母、連筆較多的詞，練習節奏與字距穩定。",
    level: "第 3 級",
    tools: "闊尖筆、墨水",
    uses: ["連筆", "字距", "詞形節奏"],
    guidance: [
      "先在心中規劃字母寬度，再落筆。",
      "連筆入口與出口盡量一致。",
      "寫完遠看整行，檢查疏密是否均勻。",
    ],
    sheetTip: "詞語｜中：連筆增多，節奏要穩。",
    content: [
      "grace",
      "light",
      "script",
      "quiet",
      "letter",
      "beauty",
      "paper",
      "stroke",
      "margin",
      "rhythm",
      "gentle",
      "steady",
    ],
  },
  {
    slug: "italic-words-hard",
    titleZh: "斜體字詞語｜難",
    titleEn: "Italic Words · Hard",
    styleId: "italic",
    kind: "words",
    stage: 3,
    track: "italic",
    difficulty: "hard",
    summary: "含較多升部／降部的詞，挑戰高度控制與整詞平衡。",
    level: "第 3 級",
    tools: "闊尖筆、墨水",
    uses: ["升降部", "整詞平衡", "進階字距"],
    guidance: [
      "升部與降部保持克制，不要搶走整詞重心。",
      "g / y / p / b / d / h 出現時，先想好高度再寫。",
      "同一頁速度放慢，品質優先。",
    ],
    sheetTip: "詞語｜難：升降部多，高度克制。",
    content: [
      "glyph",
      "height",
      "depth",
      "happy",
      "playful",
      "daylight",
      "alphabet",
      "typography",
      "paragraph",
      "handwriting",
      "calligraphy",
      "flourish",
    ],
  },

  // —— Stage 4 Italic sentences by difficulty ——
  {
    slug: "italic-sentences-easy",
    titleZh: "斜體字短句｜易",
    titleEn: "Italic Sentences · Easy",
    styleId: "italic",
    kind: "sentences",
    stage: 4,
    track: "italic",
    difficulty: "easy",
    summary: "短而清楚的句子，先練整行節奏與換氣。",
    level: "第 4 級",
    tools: "闊尖筆、墨水",
    uses: ["短句", "換氣", "整行節奏"],
    guidance: [
      "每句先慢讀，想好起筆與換氣點。",
      "第一行可描淡字，第二行自己寫。",
      "寫完檢查字高與斜度是否一致。",
    ],
    sheetTip: "短句｜易：短句、慢寫、先求整齊。",
    content: [
      "Write slowly today.",
      "Keep the line even.",
      "Breathe, then begin.",
      "Practice with care.",
      "A calm hand helps.",
      "Begin again gently.",
    ],
  },
  {
    slug: "italic-sentences-medium",
    titleZh: "斜體字短句｜中",
    titleEn: "Italic Sentences · Medium",
    styleId: "italic",
    kind: "sentences",
    stage: 4,
    track: "italic",
    difficulty: "medium",
    summary: "稍長句子，練習字距連續與整行一致性。",
    level: "第 4 級",
    tools: "闊尖筆、墨水",
    uses: ["稍長句", "連續字距", "一致性"],
    guidance: [
      "句子中段最容易變擠或變鬆，特別留意。",
      "標點也要有位置意識。",
      "第二遍可略求流暢，但仍保持可讀。",
    ],
    sheetTip: "短句｜中：中段字距最易亂，放慢。",
    content: [
      "Practice makes real progress.",
      "Write slowly and steadily now.",
      "Keep your lines even today.",
      "Beauty grows with patience.",
      "A quiet hand writes clearly.",
      "Return to the page each day.",
    ],
  },
  {
    slug: "italic-sentences-hard",
    titleZh: "斜體字短句｜難",
    titleEn: "Italic Sentences · Hard",
    styleId: "italic",
    kind: "sentences",
    stage: 4,
    track: "italic",
    difficulty: "hard",
    summary: "較長、升降部較多的句子，挑戰整頁氣韻與控制。",
    level: "第 4 級",
    tools: "闊尖筆、墨水",
    uses: ["長句", "升降部", "整頁氣韻"],
    guidance: [
      "先用鉛筆輕點換氣位置，再落墨。",
      "升降部字母出現時，維持 x-height 穩定。",
      "整句完成後退後兩步審視。",
    ],
    sheetTip: "短句｜難：長句與升降部，氣韻優先。",
    content: [
      "Typography begins with patient glyphs.",
      "Keep height, depth, and rhythm aligned.",
      "Beautiful letters grow through daily practice.",
      "The quiet page rewards a steady hand.",
      "Breathe through each stroke and space.",
      "Your best line is written without hurry.",
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
      sheetSlugs: ["italic-words-easy", "copperplate-basic-strokes"],
    },
    {
      focus: "短句與尖筆複習",
      reason: "用短句收束，並點綴尖筆路線熱身。",
      sheetSlugs: ["italic-sentences-easy", "spencerian-compound-curves"],
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
