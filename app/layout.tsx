import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";

const display = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const utility = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-utility",
});

export const metadata: Metadata = {
  title: "Aryan Choudhary - AI Engineer",
  description:
    "A cinematic portfolio for Aryan Choudhary, focused on AI engineering, LLM systems, distributed systems, and quantitative products.",
  authors: [{ name: "Aryan Choudhary" }],
  openGraph: {
    title: "Aryan Choudhary - AI Engineer",
    description:
      "AI engineering, LLM systems, distributed systems, and quantitative products.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F8F7F4",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${utility.variable}`}>
        {children}
      </body>
    </html>
  );
}
