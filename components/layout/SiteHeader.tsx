import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Container } from "./Container";
import { siteConfig } from "@/lib/site";

/**
 * Brand and primary nav form one left-hand cluster; the audience switch and
 * theme toggle pin right via `ml-auto` rather than `justify-between`. Nav on
 * the left follows the reading order, so scanning it costs one glance rather
 * than a jump across the header.
 *
 * Deliberately not a client component: active-route highlighting would need
 * `usePathname`, and ThemeToggle is meant to stay the only client component
 * in the chrome. Not worth it on a four-page site.
 */
export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <Container className="flex items-center gap-4 py-4 sm:gap-6 md:py-5">
        {/* Below `sm` the full name can't fit alongside nav, the audience
            switch and the theme toggle without eating the gutter — so the
            brand falls back to initials rather than truncating to something
            unreadable. Replaced by the logo mark in a later phase. */}
        <Link
          href="/"
          aria-label={siteConfig.name}
          className="shrink-0 whitespace-nowrap text-sm font-medium"
        >
          <span className="sm:hidden">{siteConfig.shortName}</span>
          <span className="hidden sm:inline">{siteConfig.name}</span>
        </Link>

        <nav
          aria-label="Main"
          className="flex shrink-0 items-center gap-4 sm:gap-6"
        >
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-xs text-muted hover:text-text sm:text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-3 sm:gap-4">
          {siteConfig.utilityNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-xs text-muted hover:text-text sm:text-sm"
            >
              <span className="sm:hidden">{item.shortLabel}</span>
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          ))}
          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
}
