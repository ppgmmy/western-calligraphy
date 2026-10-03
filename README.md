# Scriptoria｜西洋書法

西洋書法入門網站：介紹銅板體、斯賓塞體、斜體字、哥德體等風格，並提供工具與練習路徑。

- 線上網站（Vercel production）：<https://western-calligraphy.vercel.app>
- 練習簿：[`/resources`](https://western-calligraphy.vercel.app/resources)
- 超级實驗室：[`/lab`](https://western-calligraphy.vercel.app/lab)（字帖生成器：[`/lab/generator`](https://western-calligraphy.vercel.app/lab/generator)）

## 本地開發

```bash
npm install
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)。

## 頁面用途

| 路徑 | 用途 |
| --- | --- |
| `/resources` | **練習簿**：斜體入門練習簿（熱身 → 小寫細草 → 大寫 → 詞語 → 短句）可下載 PDF，另有完整練習簿；每張練習紙可單張下載 SVG／列印 A4 |
| `/lab` | **超级實驗室**（私人實驗場）：字體版本登記與歸檔、變更 log、花體字體對比樣本；`/lab/generator` 係多款式字帖／練習紙生成器（斜格、描紅行、列印匯出） |

## 技術

- Next.js App Router
- TypeScript
- Tailwind CSS v4

## Build 與字體注意事項

```bash
npm run build                      # 預設：本地字體，build 唔需要連 Google Fonts
FONT_SOURCE=google npm run build   # 改用原有 next/font/google 設定（build 時要連 fonts.googleapis.com）
```

- 站內字體（Cormorant Garamond、Source Serif 4、Noto Serif TC、Italianno、Allura 等，及 `/lab` 用嘅花體）有兩套載入方式：
  **本地**（`next/font/local` + CSS，字體檔放 `src/fonts/files/`）同 **Google**（`next/font/google`，原有設定）。
  預設用本地；用環境變數 `FONT_SOURCE=google` 切換。詳見 [`src/fonts/README.md`](src/fonts/README.md)。
- 為咗避免 Vercel build 時 Google 字體解析失敗（曾出現 `Can't resolve '@vercel/turbopack-next/internal/font/google/font'`／
  `next/font/google queries have exactly one entry`），預設改用本地字體。
- 改動 `src/fonts/google.ts`／`lab.google.ts` 後，要執行 `node scripts/generate-local-fonts.mjs`（需要網絡）重新產生本地版。
- 字體來源與授權：[`src/fonts/files/THIRD_PARTY_FONTS.md`](src/fonts/files/THIRD_PARTY_FONTS.md)；自製 Scriptoria Italic 見 `public/fonts/scriptoria-italic/OFL.txt`。
- 依賴更新由 Dependabot 每週檢查（`.github/dependabot.yml`）。

## 授權

程式碼以 [MIT License](LICENSE) 授權。字體檔不在此授權範圍，各自沿用原授權（多數為 SIL OFL 1.1），見上面嘅字體授權文件。

## 練習簿

開啟 `/resources`：

- **斜體入門練習簿**（初學首選）：熱身 → 小寫細草 → 大寫 → 詞語 → 短句，可下載 PDF
- **完整練習簿**：站內全部練習紙

每張紙都有用法說明，亦可單張下載 SVG／列印 A4。

## 超级實驗室

私人實驗場：`/lab`

- 變更 log：`src/data/lab/changelog.ts`（只追加）
- 字體版本登記：`src/data/lab/fontRegistry.ts`
- 舊版字體：`public/fonts/_archive/`
- 機器 log：`public/fonts/_archive/lab-log.jsonl`

重建 Scriptoria Italic（覆寫前會自動歸檔）：

```bash
npm run fonts:scriptoria-italic -- 1.001
```
