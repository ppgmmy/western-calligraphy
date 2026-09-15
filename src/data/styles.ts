export type StyleQuality = "primary" | "draft" | "experimental";

export type CalligraphyStyle = {
  id: string;
  nameZh: string;
  nameEn: string;
  era: string;
  sample: string;
  summary: string;
  traits: string[];
  tip: string;
  /**
   * primary = 目前唯一足夠靚、可作正式示範
   * draft = 路線保留，範字暫用字體、尚未達展示水準
   * experimental = 試驗對照
   */
  quality: StyleQuality;
};

export const calligraphyStyles: CalligraphyStyle[] = [
  {
    id: "italic",
    nameZh: "斜體字",
    nameEn: "Italic",
    era: "文藝復興意大利",
    sample: "Human",
    summary:
      "目前站內唯一足夠靚、可作正式示範嘅風格。闊尖筆、結構清晰，正進行逐字精準辨認；辨認穩咗先會做成自製字體檔。",
    traits: ["正式示範", "闊尖筆", "逐字辨認中"],
    tip: "用寬尖筆寫出筆畫寬窄，先掌握 a、n、m 的骨架；對照逐字辨認規格檢查每個字母。",
    quality: "primary",
  },
  {
    id: "copperplate",
    nameZh: "銅板體",
    nameEn: "Copperplate",
    era: "18 世紀英國 · 範字暫用",
    sample: "Flourish",
    summary:
      "尖筆粗細對比強烈。練習路線保留，但站內示範字體暫未夠靚——先跟斜體主線，尖筆以筆畫／橢圓熱身為主。",
    traits: ["尖筆斜寫", "路線保留", "範字待精修"],
    tip: "先練基本橢圓與上斜筆；正式字母示範會等逐字辨認完成後再升級。",
    quality: "draft",
  },
  {
    id: "spencerian",
    nameZh: "斯賓塞體",
    nameEn: "Spencerian",
    era: "19 世紀美國 · 範字暫用",
    sample: "Grace",
    summary:
      "輕盈節奏與卵形結構。同樣暫未達展示水準，僅作風格認識與路線佔位。",
    traits: ["輕盈節奏", "路線佔位", "範字待精修"],
    tip: "先建立尖筆壓力控制；字母精修排在斜體辨認之後。",
    quality: "draft",
  },
  {
    id: "flourishing",
    nameZh: "花飾書法",
    nameEn: "Modern Flourishing",
    era: "當代尖筆 · glyph 試作",
    sample: "Flourish",
    summary:
      "現代花飾路線：小寫已用逐字母 glyph path 管理，但仍屬精修中，未打包自製字體。正式「夠靚」示範仍以斜體為準。",
    traits: ["逐字母 glyph", "精修中", "暫緩字體檔"],
    tip: "先穩 modern script 基礎形；改字形請改對應字母檔，唔好急住造 font。",
    quality: "draft",
  },
  {
    id: "gothic",
    nameZh: "哥德體",
    nameEn: "Gothic / Blackletter",
    era: "中世紀歐洲 · 範字暫用",
    sample: "Gothic",
    summary: "垂直密實、稜角分明。暫作風格認識，示範水準未及斜體。",
    traits: ["垂直骨架", "範字暫用"],
    tip: "先畫好等寬豎筆格線，再補斜筆與菱形收尾。",
    quality: "draft",
  },
  {
    id: "foundational",
    nameZh: "基礎手寫體",
    nameEn: "Foundational Hand",
    era: "20 世紀復興 · 範字暫用",
    sample: "Bookhand",
    summary: "端正入門體。示範暫用斜體同源展示字體，完整辨認尚未展開。",
    traits: ["端正", "範字暫用"],
    tip: "用寬尖筆以筆寬倍數控制字高，建立比例感。",
    quality: "draft",
  },
  {
    id: "uncial",
    nameZh: "安色爾體",
    nameEn: "Uncial",
    era: "晚期羅馬／早期中世紀 · 範字暫用",
    sample: "Majuscule",
    summary: "圓潤大寫手寫體。暫作風格對照，非正式主線。",
    traits: ["圓潤", "範字暫用"],
    tip: "放慢速度，讓曲線飽滿，避免把字母壓得太扁。",
    quality: "draft",
  },
  {
    id: "imperial-grandeur",
    nameZh: "御典華體",
    nameEn: "Imperial Grandeur",
    era: "試驗用 · 極華麗展示",
    sample: "Grandeur",
    summary:
      "試驗字體：極度華麗大寫花飾作對照。唔納入正式練習，亦唔代表示範水準。",
    traits: ["極華麗大寫", "試驗對照"],
    tip: "只作視覺參考；真正書寫仍請跟正式路線筆順。",
    quality: "experimental",
  },
];

export const practiceSteps = [
  {
    title: "準備桌面",
    detail: "紙張略傾 30–45 度，光源從左前方來，肩頸放鬆。",
  },
  {
    title: "熟悉工具",
    detail:
      "尖筆練 Copperplate／Spencerian／Flourishing；寬尖筆練 Italic／Gothic／Foundational。優先練斜體主線。",
  },
  {
    title: "基本筆畫",
    detail:
      "每天 10–15 分鐘只練直線、橢圓、上斜與下斜；花飾線則加練 C／S 與 8 字環。",
  },
  {
    title: "字母家族",
    detail: "把形狀相近的字母分組練習，例如 o、a、d、g 或 n、h、m；對照逐字辨認規格。",
  },
  {
    title: "短句與花飾",
    detail: "能穩定寫出單字後，再加一句話與少量 flourish。",
  },
];

export const tools = [
  {
    name: "尖筆／闊尖筆",
    detail: "尖筆負責粗細變化；闊尖筆決定筆畫寬度與字體性格。",
  },
  {
    name: "墨水",
    detail: "入門可用鐵膽墨或水彩墨。濃度以筆尖不滴、不拖為準。",
  },
  {
    name: "練習紙",
    detail: "光滑紙適合尖筆；略有紋理的紙適合闊尖筆。先用格線紙對齊。",
  },
  {
    name: "斜寫板／導引線",
    detail: "Copperplate 常用斜寫板；所有字體都需要一致的基線與 x-height。斜線應為「／」方向（上右下左）。",
  },
];
