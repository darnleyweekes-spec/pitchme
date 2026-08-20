import type { Metadata } from "next";
import Script from "next/script";
import { Fraunces, Inter } from "next/font/google";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://pitchme.prime24ai.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PitchMe by Prime24 AI — Stop applying. Start getting recruited.",
    template: "%s | PitchMe by Prime24 AI",
  },
  description:
    "PitchMe by Prime24 AI is an early-access reverse-recruiting marketplace where candidates control public visibility and employers send structured role pitches.",
  keywords: [
    "reverse recruiting",
    "candidate marketplace",
    "structured job pitch",
    "talent marketplace",
    "Prime24 AI",
  ],
  openGraph: {
    title: "PitchMe by Prime24 AI",
    description:
      "Real opt-in candidate profiles. Structured role pitches. Candidate-controlled visibility.",
    url: siteUrl,
    siteName: "PitchMe by Prime24 AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PitchMe by Prime24 AI",
    description:
      "Real opt-in candidate profiles. Structured role pitches. Candidate-controlled visibility.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <Script
          src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.57.4"
          strategy="beforeInteractive"
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:text-paper"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
