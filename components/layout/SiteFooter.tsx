import Link from "next/link";
import { Container } from "./Container";
import { CtaLink } from "@/components/content/CtaLink";
import { ExternalLink } from "@/components/content/ExternalLink";
import { siteConfig } from "@/lib/site";

/**
 * Contact is a utility, not a destination — so it lives in the chrome on
 * every page rather than behind a nav click.
 *
 * Three rules keep it from becoming a dumping ground:
 *  1. Exactly one button-shaped element, and it is the *secondary* outline
 *     variant carrying no `data-cta` — the footer must never compete with
 *     the page's own primary action.
 *  2. Routes and external profiles are separate columns. Grouping a route
 *     with LinkedIn/GitHub is a category error.
 *  3. The Site column is derived from nav + utilityNav, so adding a route
 *     can't leave the footer stale.
 */
function FooterColumn({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 data-label className="text-muted">
        {label}
      </h3>
      <div className="mt-3 flex flex-col items-start gap-2 text-sm">
        {children}
      </div>
    </div>
  );
}

const linkClass = "text-muted hover:text-text";

export function SiteFooter() {
  const routes = [...siteConfig.nav, ...siteConfig.utilityNav];

  return (
    <footer className="border-t border-border">
      <Container className="py-12 md:py-14">
        <h2 className="sr-only">Site footer</h2>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)] md:gap-12">
          <div className="col-span-2 md:col-span-1">
            <h3 data-label className="text-muted">
              Get in touch
            </h3>
            <div className="mt-3 flex flex-col items-start gap-2 text-sm">
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className="break-all hover:text-muted"
              >
                {siteConfig.contact.email}
              </a>
              {/* A real tel: link — the old /contact page rendered this as
                  plain text, which looks actionable and isn't. */}
              <a
                href={`tel:${siteConfig.contact.phone.replace(/\s/g, "")}`}
                className={linkClass}
              >
                {siteConfig.contact.phone}
              </a>
              <CtaLink
                href={siteConfig.booking.calUrl}
                variant="secondary"
                external
                className="mt-2"
              >
                Book a 30-minute call
              </CtaLink>
              <ExternalLink href={siteConfig.booking.formUrl} className={linkClass}>
                Or send a project brief
              </ExternalLink>
            </div>
          </div>

          <FooterColumn label="Site">
            {routes.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass}>
                {item.label}
              </Link>
            ))}
          </FooterColumn>

          <FooterColumn label="Elsewhere">
            <ExternalLink href={siteConfig.social.linkedin} className={linkClass}>
              LinkedIn
            </ExternalLink>
            <ExternalLink href={siteConfig.social.github} className={linkClass}>
              GitHub
            </ExternalLink>
          </FooterColumn>
        </div>

        {/* No year: a static build bakes the build-time year and it goes
            stale every January until someone redeploys. */}
        <p className="mt-12 text-xs text-muted">© {siteConfig.name}</p>
      </Container>
    </footer>
  );
}
