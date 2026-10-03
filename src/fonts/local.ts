/**
 * 自動產生：node scripts/generate-local-fonts.mjs（請勿手改）。
 * 本地字體後備方案（next/font/local），build 時唔需要連 Google Fonts。
 * 詳見 src/fonts/README.md、src/fonts/files/THIRD_PARTY_FONTS.md。
 */
import localFont from "next/font/local";
import "./noto-serif-tc.css";

/** 自製斜體／細草範字：由 Cormorant Garamond Italic 裁字而成（OFL）；與 google.ts 內設定一致 */
export const italicCustom = localFont({
  src: [
    {
      path: "../../public/fonts/scriptoria-italic/ScriptoriaItalic-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-italic-custom",
  display: "swap",
});

const cormorantGaramond = localFont({
  src: [
    { path: "./files/cormorant-garamond/co3ZmX5slCNuHLi8bLeY9MK7whWMhyjYrEtImSo.woff2", weight: "400 700", style: "italic" },
    { path: "./files/cormorant-garamond/co3bmX5slCNuHLi8bLeY9MK7whWMhyjYqXtK.woff2", weight: "400 700", style: "normal" },
  ],
  variable: "--font-display",
  display: "swap",
});
export { cormorantGaramond as display };

const sourceSerif4 = localFont({
  src: [
    { path: "./files/source-serif-4/vEFF2_tTDB4M7-auWDN0ahZJW3IX2ih5nk3AucvUHf6kDXr4.woff2", weight: "400 600", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});
export { sourceSerif4 as body };

const italianno = localFont({
  src: [
    { path: "./files/italianno/dg4n_p3sv6gCJkwzT6RXiJwo.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-script",
  display: "swap",
});
export { italianno as script };

const allura = localFont({
  src: [
    { path: "./files/allura/9oRPNYsQpS4zjuA_iwgW.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-modern",
  display: "swap",
});
export { allura as modern };

const meaCulpa = localFont({
  src: [
    { path: "./files/mea-culpa/AMOTz4GcuWbEIuza8jspnccR.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-grand",
  display: "swap",
});
export { meaCulpa as grand };

const unifrakturMaguntia = localFont({
  src: [
    { path: "./files/unifrakturmaguntia/WWXPlieVYwiGNomYU-ciRLRvEmK7oaVemGZM.woff2", weight: "400", style: "normal" },
  ],
  variable: "--font-blackletter",
  display: "swap",
});
export { unifrakturMaguntia as blackletter };

/** Noto Serif TC：保留全部 unicode-range 分片，用 CSS @font-face（見 noto-serif-tc.css） */
export const zh = { variable: "font-zh-local" };
