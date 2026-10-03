import type { Metadata } from "next";
import {
  body,
  blackletter,
  display,
  grand,
  italicCustom,
  modern,
  script,
  zh,
} from "@/fonts/active";
import "./globals.css";

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
      className={`${display.variable} ${italicCustom.variable} ${body.variable} ${script.variable} ${modern.variable} ${grand.variable} ${blackletter.variable} ${zh.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
