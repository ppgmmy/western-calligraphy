/**
 * 目前啟用嘅字體組合（預設：本地字體，build 唔需要連 Google Fonts）。
 * 設定環境變數 FONT_SOURCE=google 時，next.config.ts 會將呢個模組換成 ./google.ts
 * （原有 next/font/google 設定）。詳見 src/fonts/README.md。
 */
export * from "./local";
