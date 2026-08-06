import type { Metadata } from "next";
import Link from "next/link";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { ThemeScript } from "@/components/theme/ThemeScript";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
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
        <header className="border-b border-border">
          <div className="mx-auto flex max-w-[68rem] items-center justify-between px-6 py-5 md:px-10">
            <Link href="/" className="text-sm font-medium">
              {siteConfig.name}
            </Link>
            <nav className="flex items-center gap-6">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-muted hover:text-text"
                >
                  {item.label}
                </Link>
              ))}
              <ThemeToggle />
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-[68rem] px-6 py-20 md:px-10">
          {children}
        </main>

        <footer className="border-t border-border">
          <div className="mx-auto flex max-w-[68rem] flex-wrap items-center justify-between gap-4 px-6 py-8 text-sm text-muted md:px-10">
            <a href={`mailto:${siteConfig.contact.email}`}>
              {siteConfig.contact.email}
            </a>
            <Link href="/for-individuals">For individuals</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
