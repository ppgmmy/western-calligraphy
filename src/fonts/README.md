# 字體載入（local ⇄ google 可切換）

網站用到嘅 Google 字體有兩套載入方式，用環境變數 `FONT_SOURCE` 切換（由 `next.config.ts` 處理）：

| `FONT_SOURCE` | 使用檔案 | 說明 |
| --- | --- | --- |
| 未設定／`local`（預設） | `local.ts`、`lab.local.ts`、`noto-serif-tc.css` | `next/font/local` + CSS `@font-face`，字體檔放喺 `files/`。**build 唔需要連 Google Fonts。** |
| `google` | `google.ts`、`lab.google.ts` | 原有 `next/font/google` 設定（內容保持原樣，只係由 `layout.tsx` 搬過嚟）。build 時要連 `fonts.googleapis.com`。 |

`layout.tsx` 同 `lab/layout.tsx` 只 import `@/fonts/active`／`@/fonts/lab-active`；`FONT_SOURCE=google` 時 bundler alias 會將佢哋換成 `google.ts`／`lab.google.ts`，
未被選用嗰邊唔會被打包，亦唔會發出 Google 請求。

```bash
npm run build                      # 本地字體（預設）
FONT_SOURCE=google npm run build   # 原有 Google Fonts 設定
```

Vercel：若要切換，喺 Project Settings → Environment Variables 加 `FONT_SOURCE=google`（唔加就用本地字體）。

## 重新產生本地字體

`local.ts`、`lab.local.ts`、`noto-serif-tc.css`、`files/` 係由 `scripts/generate-local-fonts.mjs` 根據 `google.ts`／`lab.google.ts` 內嘅宣告自動產生：

```bash
node scripts/generate-local-fonts.mjs   # 需要網絡；新增或更改 Google 字體後執行
```

**如果改咗 `google.ts`／`lab.google.ts`（新增字體、改 weight），要重跑呢個 script，否則兩套字體會唔同步。**

## 注意

- 本地版只收 **latin** 子集（Noto Serif TC 則保留全部 unicode-range 分片，確保中文字形一樣）。Google 版仲有 latin-ext／vietnamese／cyrillic 等子集，本地版冇，呢啲字元會 fallback 去系統字體。
- `local.ts` 內 `const` 名特登用字體名（`italianno`、`allura`、`meaCulpa`…），因為 `next/font/local` 以 const 名做 `font-family` 名，
  而 `src/lib/exportPracticeSheet.ts` 靠 family 名認出要內嵌嘅書法字體。
- `/lab` 練習紙匯出（`exportPracticeSheet.ts`）喺字體缺失時，會喺瀏覽器端 runtime 向 Google Fonts 取字體；呢個唔影響 build。
- 授權同來源見 [`files/THIRD_PARTY_FONTS.md`](./files/THIRD_PARTY_FONTS.md)。
