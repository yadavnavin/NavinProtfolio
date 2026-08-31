import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Navin Kumar Yadav — Software Engineer",
  description:
    "Software engineer building products, systems, and developer tools.",
};

const designContract =
  "THESIS: inspect product evidence, not a conventional portfolio; OWN-WORLD: mineral paper, graphite rules, cobalt paths, square specimens, one optical lens; STORY: trace product behavior through five layers into verified work and an honest contact state; FIRST VIEWPORT: left thesis and proof list with code-native topology, no SeeMyUI screenshot; FORM: Product Specimen, seed aeb13637; FINISH: unreviewed and undocumented is unfinished";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <span aria-hidden="true" hidden data-design-contract={designContract} />
        {children}
      </body>
    </html>
  );
}
