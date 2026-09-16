import { IBM_Plex_Mono } from "next/font/google";

const labMono = IBM_Plex_Mono({
  variable: "--font-lab-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export default function LabLayout({ children }: LayoutProps<"/lab">) {
  return <div className={`lab-shell ${labMono.variable}`}>{children}</div>;
}
