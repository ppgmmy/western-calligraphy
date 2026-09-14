export type StudioService = {
  id: string;
  category: string;
  title: string;
  titleEn: string;
  summary: string;
  includes: string[];
  note: string;
};

export type StudioProcessStep = {
  step: string;
  title: string;
  body: string;
};

export type ContactChannel = {
  label: string;
  value: string;
  href: string;
  note: string;
};

export const atelierManifesto = {
  eyebrow: "Atelier",
  titleZh: "以筆尖守護歐洲手寫傳統",
  titleEn: "An atelier for the written line",
  lead:
    "Scriptoria 是西洋書法專職工作室。我們教學、受託書寫，並把可列印的練習系統公開給認真練習的人。",
  body: [
    "西洋書法不是一次性的美感展示，而是可被重複、被傳承的筆尖紀律。我們以結構、斜度與節奏為本，再談花飾與風格。",
    "無論你是自學者、婚禮委託方，或企業識別需求，工作室都以同一套標準工作：先釐清用途與字體，再進入草稿、定稿與交付。",
    "線上練習本不是行銷附屬品，而是教學系統的公開層——讓認真練習的人，不必先預約也能開始寫。",
  ],
};

export const atelierCredentials = [
  {
    title: "教學主線",
    detail: "Italic · Copperplate · Spencerian，依工具與節奏分開進程，避免混練造成壞習慣。",
  },
  {
    title: "練習系統",
    detail: "三條進程、字母家族、難度分冊，支援本機進度與完整練習本下載。",
  },
  {
    title: "受託書寫",
    detail: "請柬、名位卡、證書、銘牌與短句作品；強調可讀、莊重與場合適配。",
  },
  {
    title: "工作語言",
    detail: "繁體中文說明與 Latin letterforms 並用，服務香港與華語學習者。",
  },
];

export const atelierPrinciples = [
  {
    title: "結構先於裝飾",
    body: "先穩骨架、斜度與字距，再談花飾。華麗必須建立在可讀與穩定之上。",
  },
  {
    title: "工具服務字體",
    body: "尖筆與闊尖筆各有路徑。選對工具，比一次買齊整櫃筆尖更重要。",
  },
  {
    title: "短練、高專注",
    body: "每日 15–20 分鐘、一次一個家族，勝過一次寫滿卻無法回看的整頁。",
  },
  {
    title: "用途決定風格",
    body: "婚禮、證書與識別字標需求不同。先問場合與閱讀距離，再選字體與墨色。",
  },
];

export const studioServices: StudioService[] = [
  {
    id: "commission-invitation",
    category: "Commission",
    title: "請柬與名位卡",
    titleEn: "Invitations & Place Cards",
    summary:
      "婚禮、晚宴與私人聚會的手寫請柬、信封與席位卡。可指定字體、墨色與版式節奏。",
    includes: ["字體選定", "樣本確認", "成套書寫", "包裝建議"],
    note: "視數量約 10–21 日",
  },
  {
    id: "commission-certificate",
    category: "Commission",
    title: "證書與銘文",
    titleEn: "Certificates & Citations",
    summary:
      "機構證書、紀念銘文與命名書寫。強調莊重可讀，適合公開展示與存檔。",
    includes: ["版式規劃", "正楷／斜體選擇", "落款位置", "掃描備份"],
    note: "視複雜度約 7–14 日",
  },
  {
    id: "workshop-private",
    category: "Tuition",
    title: "私人一對一指導",
    titleEn: "Private Tuition",
    summary:
      "依程度設計課程：熱身、字母家族、詞語到短句。適合想系統入門或修正壞習慣的學習者。",
    includes: ["程度評估", "自訂練習紙", "筆壓與姿勢校正", "課後筆記"],
    note: "可預約線上／到點",
  },
  {
    id: "workshop-group",
    category: "Workshop",
    title: "小型工作坊",
    titleEn: "Studio Workshop",
    summary:
      "半日或全日工作坊，主題可選 Italic 入門、Copperplate 橢圓、或短句書寫體驗。",
    includes: ["工具借用說明", "示範臨摹", "練習紙套裝", "作品拍照"],
    note: "依場地檔期安排",
  },
];

export const studioProcess: StudioProcessStep[] = [
  {
    step: "01",
    title: "諮詢與樣本",
    body: "說明場合、字數、字體偏好與交件日期；先提供一小段樣本確認氣質。",
  },
  {
    step: "02",
    title: "確認版式",
    body: "鎖定斜度、字距、落款與紙材。必要時先以鉛筆或淡墨打稿。",
  },
  {
    step: "03",
    title: "正式書寫",
    body: "在穩定光源與紙面斜度下完成書寫；重要件會預留備份稿。",
  },
  {
    step: "04",
    title: "交付與存檔",
    body: "實體交付並提供高解析掃描，方便日後重印或數位存檔。",
  },
];

export const contactChannels: ContactChannel[] = [
  {
    label: "委託與課程",
    value: "studio@scriptoria.atelier",
    href: "mailto:studio@scriptoria.atelier",
    note: "請註明場合、字數與希望完成日期",
  },
  {
    label: "練習系統",
    value: "打開線上練習本",
    href: "/resources",
    note: "無需帳戶；進度保存在本機瀏覽器",
  },
];
