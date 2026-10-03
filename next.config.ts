import path from "node:path";
import type { NextConfig } from "next";

/**
 * 字體來源切換（見 src/fonts/README.md）：
 *   FONT_SOURCE 未設定或 "local"（預設）→ 本地字體（next/font/local + CSS），build 唔需要連 Google Fonts
 *   FONT_SOURCE=google               → 原有 next/font/google 設定（src/fonts/google.ts、lab.google.ts）
 * 用 bundler alias 令未選用嗰邊唔會被打包，亦唔會向 Google 發出請求。
 */
const fontSource = process.env.FONT_SOURCE ?? "local";
if (fontSource !== "local" && fontSource !== "google") {
  throw new Error(`FONT_SOURCE must be "local" or "google", got "${fontSource}"`);
}
const useGoogleFonts = fontSource === "google";
console.log(`[fonts] FONT_SOURCE=${fontSource}`);

const fontAliases: Record<string, string> = useGoogleFonts
  ? {
      "@/fonts/active": "./src/fonts/google.ts",
      "@/fonts/lab-active": "./src/fonts/lab.google.ts",
    }
  : {};

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: fontAliases,
  },
  webpack(config) {
    for (const [from, to] of Object.entries(fontAliases)) {
      config.resolve.alias[from] = path.resolve(process.cwd(), to);
    }
    return config;
  },
};

export default nextConfig;
