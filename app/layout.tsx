import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeScript } from "@/components/theme/ThemeScript";
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

const wireframe = process.env.NEXT_PUBLIC_WIREFRAME === "1";

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
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <ThemeScript />
      </head>
      <body>
        <SiteHeader />
        <main>
          <Container className="py-20">{children}</Container>
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
