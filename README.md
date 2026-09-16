# Scriptoria｜西洋書法

西洋書法入門網站：介紹銅板體、斯賓塞體、斜體字、哥德體等風格，並提供工具與練習路徑。

## 本地開發

```bash
npm install
npm run dev
```

開啟 [http://localhost:3000](http://localhost:3000)。

## 技術

- Next.js App Router
- TypeScript
- Tailwind CSS v4

## 練習本

開啟 `/resources` 可按級練習：

1. 熱身格線  
2. 大寫 A–Z  
3. 小寫 a–z  
4. 簡單詞語  
5. 短句  

每張紙都有用法說明，可下載 SVG 或直接列印 A4。

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
