import { labFontVars } from "@/fonts/lab-active";

export default function LabLayout({ children }: LayoutProps<"/lab">) {
  return <div className={`lab-shell ${labFontVars}`}>{children}</div>;
}
