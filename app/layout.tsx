import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { CurrencyScript } from "@/components/currency/CurrencyScript";
import { CurrencyProvider } from "@/components/currency/CurrencyProvider";
import { JsonLd } from "@/components/content/JsonLd";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Container } from "@/components/layout/Container";
import { siteConfig } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} - ${siteConfig.role}`,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.positioning,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      // Suppresses exactly one attribute diff on this element: `data-theme`,
      // which ThemeScript adds before paint. Do not move this any deeper.
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <head>
        <ThemeScript />
        <CurrencyScript />
        <JsonLd />
      </head>
      <body>
        <CurrencyProvider>
          <SiteHeader />
          <main>
            <Container className="py-[var(--page-pad)]">{children}</Container>
          </main>
          <SiteFooter />
        </CurrencyProvider>
      </body>
    </html>
  );
}
