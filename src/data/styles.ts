export type CalligraphyStyle = {
  id: string;
  nameZh: string;
  nameEn: string;
  era: string;
  sample: string;
  summary: string;
  traits: string[];
  tip: string;
};

export const calligraphyStyles: CalligraphyStyle[] = [
  {
    id: "copperplate",
    nameZh: "銅板體大寫",
    nameEn: "Copperplate Capitals",
    era: "尖筆結構系統（非字型檔）",
    sample: "A",
    summary:
      "June 示範嘅 Copperplate Capitals 唔係電腦花體字，而係手寫尖筆大寫結構：約 55° 斜度、橢圓主導、下行陰影／上行髮絲，再加入口環與出口飾。練習應跟筆順（ductus）分辨，而唔係換一個 Google Font。",
    traits: ["筆順結構", "陰影／髮絲", "橢圓＋55°"],
    tip: "先認筆畫角色（陰影定髮絲），再跟編號筆順寫；可讀骨架穩了才加花飾。",
  },
  {
    id: "spencerian",
    nameZh: "斯賓塞體",
    nameEn: "Spencerian",
    era: "19 世紀美國",
    sample: "Grace",
    summary:
      "美國商用書寫的經典。線條輕盈、節奏均勻，花飾如藤蔓自然延伸。",
    traits: ["輕盈節奏", "卵形結構", "流暢連筆"],
    tip: "保持整頁字距一致，花飾只點綴關鍵字母。",
  },
  {
    id: "italic",
    nameZh: "斜體字",
    nameEn: "Italic",
    era: "文藝復興意大利",
    sample: "Human",
    summary:
      "由人文主義手寫演變而來，易讀又優雅，適合日常書寫與現代練習入門。",
    traits: ["易讀", "略斜", "結構清晰"],
    tip: "用寬尖筆寫出筆畫寬窄，先掌握 a、n、m 的骨架。",
  },
  {
    id: "gothic",
    nameZh: "哥德體",
    nameEn: "Gothic / Blackletter",
    era: "中世紀歐洲",
    sample: "Gothic",
    summary:
      "垂直筆畫密實、稜角分明，帶有中世紀手抄本的莊嚴感。",
    traits: ["垂直骨架", "密排字距", "儀式感強"],
    tip: "先畫好等寬豎筆格線，再補斜筆與菱形收尾。",
  },
  {
    id: "foundational",
    nameZh: "基礎手寫體",
    nameEn: "Foundational Hand",
    era: "20 世紀復興",
    sample: "Bookhand",
    summary:
      "Edward Johnston 整理的入門體，平衡、端正，是學習西洋書法的穩固起點。",
    traits: ["端正", "適合入門", "筆畫分明"],
    tip: "用寬尖筆以筆寬倍數控制字高，建立比例感。",
  },
  {
    id: "uncial",
    nameZh: "安色爾體",
    nameEn: "Uncial",
    era: "晚期羅馬／早期中世紀",
    sample: "Majuscule",
    summary:
      "圓潤的大寫手寫體，常出現在早期基督教手稿，氣質溫和而古老。",
    traits: ["圓潤", "大寫為主", "古卷氣息"],
    tip: "放慢速度，讓曲線飽滿，避免把字母壓得太扁。",
  },
  {
    id: "flourishing",
    nameZh: "花飾書法",
    nameEn: "Modern Flourishing",
    era: "當代尖筆工作室傳統",
    sample: "Flourish",
    summary:
      "當代現代花飾書法：以橢圓與 C／S 為骨，在 modern script 上加大寫與詞尾花飾。氣質華麗、略帶彈跳節奏，接近香港工作室常見的教學風格。",
    traits: ["現代花體", "橢圓花飾", "可讀優先"],
    tip: "先穩 modern script，再練 uppercase／lowercase flourishing，最後加 decoration；花飾永遠服從可讀性。",
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
      "尖筆練 Copperplate／Spencerian／Flourishing；寬尖筆練 Italic／Gothic／Foundational。",
  },
  {
    title: "基本筆畫",
    detail:
      "每天 10–15 分鐘只練直線、橢圓、上斜與下斜；花飾線則加練 C／S 與 8 字環。",
  },
  {
    title: "字母家族",
    detail: "把形狀相近的字母分組練習，例如 o、a、d、g 或 n、h、m。",
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
    detail: "Copperplate 常用斜寫板；所有字體都需要一致的基線與 x-height。",
  },
];
