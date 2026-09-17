import type { Metadata } from "next";
import localFont from "next/font/local";
import {
  Alex_Brush,
  Allura,
  Cormorant_Garamond,
  Great_Vibes,
  Italianno,
  Mea_Culpa,
  Mr_Dafoe,
  Noto_Serif_TC,
  Pinyon_Script,
  Rouge_Script,
  Sacramento,
  Source_Serif_4,
  Tangerine,
  UnifrakturMaguntia,
} from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

/** 自製斜體／細草範字：由 Cormorant Garamond Italic 裁字而成（OFL） */
const italicCustom = localFont({
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

const body = Source_Serif_4({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

/** 正式尖筆（Copperplate／Spencerian）範字 */
const script = Italianno({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

/** 當代現代花飾／modern calligraphy 範字 */
const modern = Allura({
  variable: "--font-modern",
  subsets: ["latin"],
  weight: "400",
});

/** 試驗用極華麗花體 */
const grand = Mea_Culpa({
  variable: "--font-grand",
  subsets: ["latin"],
  weight: "400",
});

/** 實驗室 · 撩草／藝術草標本（OFL） */
const labGreatVibes = Great_Vibes({
  variable: "--font-lab-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

const labPinyon = Pinyon_Script({
  variable: "--font-lab-pinyon",
  subsets: ["latin"],
  weight: "400",
});

const labTangerine = Tangerine({
  variable: "--font-lab-tangerine",
  subsets: ["latin"],
  weight: "400",
});

const labAlexBrush = Alex_Brush({
  variable: "--font-lab-alex-brush",
  subsets: ["latin"],
  weight: "400",
});

const labSacramento = Sacramento({
  variable: "--font-lab-sacramento",
  subsets: ["latin"],
  weight: "400",
});

const labRouge = Rouge_Script({
  variable: "--font-lab-rouge",
  subsets: ["latin"],
  weight: "400",
});

const labMrDafoe = Mr_Dafoe({
  variable: "--font-lab-mr-dafoe",
  subsets: ["latin"],
  weight: "400",
});

const blackletter = UnifrakturMaguntia({
  variable: "--font-blackletter",
  subsets: ["latin"],
  weight: "400",
});

const zh = Noto_Serif_TC({
  variable: "--font-zh",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Scriptoria｜西洋書法工作室",
    template: "%s｜Scriptoria",
  },
  description:
    "Scriptoria 西洋書法專職工作室：教學、受託書寫與可列印練習系統。涵蓋 Copperplate、Spencerian、Flourishing、Italic 與 Blackletter。",
};

const labFontVars = [
  labGreatVibes.variable,
  labPinyon.variable,
  labTangerine.variable,
  labAlexBrush.variable,
  labSacramento.variable,
  labRouge.variable,
  labMrDafoe.variable,
].join(" ");

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${display.variable} ${italicCustom.variable} ${body.variable} ${script.variable} ${modern.variable} ${grand.variable} ${labFontVars} ${blackletter.variable} ${zh.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
