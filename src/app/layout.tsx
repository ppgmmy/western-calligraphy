import type { Metadata } from "next";
import {
  Allura,
  Cormorant_Garamond,
  Italianno,
  Mea_Culpa,
  Noto_Serif_TC,
  Source_Serif_4,
  UnifrakturMaguntia,
} from "next/font/google";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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

/** 當代現代花飾／modern calligraphy 範字（接近工作室教學風格） */
const modern = Allura({
  variable: "--font-modern",
  subsets: ["latin"],
  weight: "400",
});

/** 試驗用極華麗花體（Imperial Grandeur） */
const grand = Mea_Culpa({
  variable: "--font-grand",
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="zh-Hant"
      className={`${display.variable} ${body.variable} ${script.variable} ${modern.variable} ${grand.variable} ${blackletter.variable} ${zh.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
