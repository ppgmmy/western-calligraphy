# Scriptoria Italic

自製示範字體：由 **Cormorant Garamond Italic**（SIL Open Font License）裁出練習用字元，專供斜體／細草範字。

## 現行檔

- `ScriptoriaItalic-Regular.ttf`
- `ScriptoriaItalic-Regular.woff2`
- `manifest.json` — 版號、checksum
- `OFL.txt` — 授權全文（必須保留）

## 實驗室歸檔

呢個站係超级實驗室：每次重建字體前，現行檔會自動搬去：

`public/fonts/_archive/scriptoria-italic/v{版號}-{時間戳}/`

機器 log：`public/fonts/_archive/lab-log.jsonl`  
UI log／對比頁：`/lab`（資料喺 `src/data/lab/`）

## 重建

```bash
pip install 'fonttools[woff]' brotli
npm run fonts:scriptoria-italic
npm run fonts:scriptoria-italic -- 1.001
```

注意：來源已是 Italic master，網站使用時請設 `font-style: normal`，避免瀏覽器再合成一層斜體。
