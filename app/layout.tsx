import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Instrument_Serif } from "next/font/google";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { DesignScript } from "@/components/design/DesignScript";
import { DesignSwitcher } from "@/components/design/DesignSwitcher";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.positioning,
};

/** Display face for design direction A. Removed if A is not chosen. */
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

const wireframe = process.env.NEXT_PUBLIC_WIREFRAME === "1";

/**
 * Phase 3 only — shows the A/B/C direction switcher.
 *
 * Hardcoded rather than read from an env var: Vercel strips committed `.env`
 * files from the build source, so a repo-level flag silently does nothing on
 * preview deployments. Setting it here is the only way to get the switcher
 * onto a preview without changing project settings.
 *
 * This constant, the switcher, and the two losing directions are all deleted
 * in the commit that collapses to the chosen direction. Until then this branch
 * must not be merged.
 */
const designPreview = true;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-wireframe={wireframe ? "" : undefined}
      // Suppresses exactly one attribute diff on this element: `data-theme`,
      // which ThemeScript adds before paint. Do not move this any deeper.
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <ThemeScript />
        {designPreview && <DesignScript />}
      </head>
      <body>
        <SiteHeader />
        <main>
          <Container className="py-[var(--page-pad)]">{children}</Container>
        </main>
        <SiteFooter />
        {designPreview && <DesignSwitcher />}
      </body>
    </html>
  );
}
