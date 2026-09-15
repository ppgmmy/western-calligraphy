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
    sample: "human",
    summary:
      "目前站內唯一夠靚嘅，係斜體小寫（細草）。闊尖筆、結構清晰；初學者請先把斜體小寫練完，再學大寫或其他字體。逐字辨認穩咗先會做自製字體檔。",
    traits: ["小寫細草正式示範", "闊尖筆", "初學首選"],
    tip: "初學先專心 a–z 小寫：用寬尖筆寫出筆畫寬窄，掌握 a、n、m 骨架；大寫與其他字體留待斜體小寫過關後。",
    quality: "primary",
  },
  {
    id: "copperplate",
    nameZh: "銅板體",
    nameEn: "Copperplate",
    era: "18 世紀英國 · 學完斜體後再開",
    sample: "Flourish",
    summary:
      "尖筆粗細對比強烈。示範字體暫未夠靚；為顧及初學者，請學完斜體整條主線後先開呢條，唔好同斜體並行混練。",
    traits: ["尖筆斜寫", "學完斜體後", "範字待精修"],
    tip: "斜體小寫過關後，先練橢圓與上斜筆熱身，再進入銅板字母。",
    quality: "draft",
  },
  {
    id: "spencerian",
    nameZh: "斯賓塞體",
    nameEn: "Spencerian",
    era: "19 世紀美國 · 學完斜體後再開",
    sample: "Grace",
    summary:
      "輕盈節奏與卵形結構。暫未達展示水準；同樣建議學完斜體後再開，一次只深耕一款。",
    traits: ["輕盈節奏", "學完斜體後", "範字待精修"],
    tip: "斜體過關後，先建立尖筆壓力控制，再學斯賓塞字母。",
    quality: "draft",
  },
  {
    id: "flourishing",
    nameZh: "花飾書法",
    nameEn: "Modern Flourishing",
    era: "當代尖筆 · 斜體穩後再加",
    sample: "Flourish",
    summary:
      "花飾係加成，唔係入門第一站。小寫 glyph 仍在精修；請斜體可讀穩定後先學，避免未穩字就加花。",
    traits: ["斜體穩後再加", "精修中", "暫緩字體檔"],
    tip: "斜體詞語／短句過關後，先穩 modern script 基礎形，再加花飾。",
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
    title: "一次只學一款",
    detail:
      "初學先跟斜體主線（尤其小寫細草）。學完晒一款過關，先開銅板／斯賓塞／花飾，避免並行混練。",
  },
  {
    title: "基本筆畫",
    detail:
      "每天 10–15 分鐘只練直線、橢圓、上斜與下斜；斜體小寫穩了再談花飾 C／S。",
  },
  {
    title: "字母家族",
    detail: "斜體先練小寫家族（o／a／d、n／h／m），再補大寫；對照逐字辨認規格。",
  },
  {
    title: "短句之後才換款",
    detail: "斜體短句過關後，才選下一款字體重新由熱身練起。",
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
