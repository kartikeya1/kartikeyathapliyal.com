import Link from "next/link";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import { Container } from "./Container";
import { siteConfig } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <Container className="flex items-center justify-between py-5">
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
      </Container>
    </header>
  );
}
