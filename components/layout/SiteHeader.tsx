import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Container } from "./Container";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <Container className="flex items-center justify-between gap-3 py-5">
        {/* min-w-0 + truncate lets the wordmark give way on narrow screens
            instead of pushing the nav and theme toggle past the gutter. */}
        <Link
          href="/"
          className="min-w-0 truncate text-sm font-medium"
        >
          {siteConfig.name}
        </Link>
        <nav className="flex shrink-0 items-center gap-3 sm:gap-6">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-xs text-muted hover:text-text sm:text-sm"
            >
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}
