# Scriptoria Italic

自製示範字體：由 **Cormorant Garamond Italic**（SIL Open Font License）裁出練習用字元（A–Z、a–z、數字與常用標點），重新命名為 **Scriptoria Italic**，專供斜體／細草範字。

- `ScriptoriaItalic-Regular.ttf` — 原始 TrueType
- `ScriptoriaItalic-Regular.woff2` — 網站用
- `OFL.txt` — 授權全文（必須保留）

重建：

```bash
pip install 'fonttools[woff]' brotli
node scripts/build-scriptoria-italic-font.mjs
```

注意：來源已是 Italic master，網站使用時請設 `font-style: normal`，避免瀏覽器再合成一層斜體。
