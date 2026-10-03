/**
 * Google Fonts 版本（原有設定，內容與舊 layout.tsx 一致，只是搬入此檔）。
 * 由 next.config.ts 內嘅 FONT_SOURCE=google 選用；預設用 ./local.ts（唔需 Google 連線）。
 * 詳見 src/fonts/README.md。
 */
import localFont from "next/font/local";
import {
  Allura,
  Cormorant_Garamond,
  Italianno,
  Mea_Culpa,
  Noto_Serif_TC,
  Source_Serif_4,
  UnifrakturMaguntia,
} from "next/font/google";

export const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

/** 自製斜體／細草範字：由 Cormorant Garamond Italic 裁字而成（OFL） */
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

export const body = Source_Serif_4({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

/** 正式尖筆（Copperplate／Spencerian）範字 */
export const script = Italianno({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

/** 當代現代花飾／modern calligraphy 範字 */
export const modern = Allura({
  variable: "--font-modern",
  subsets: ["latin"],
  weight: "400",
});

/** 試驗用極華麗花體 */
export const grand = Mea_Culpa({
  variable: "--font-grand",
  subsets: ["latin"],
  weight: "400",
});

export const blackletter = UnifrakturMaguntia({
  variable: "--font-blackletter",
  subsets: ["latin"],
  weight: "400",
});

export const zh = Noto_Serif_TC({
  variable: "--font-zh",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
