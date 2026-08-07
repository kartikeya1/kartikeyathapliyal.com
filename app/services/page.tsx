import type { Metadata } from "next";
import { PageHeader } from "@/components/content/PageHeader";
import { CtaLink } from "@/components/content/CtaLink";
import { CurrencyToggle } from "@/components/currency/CurrencyToggle";
import { LazyEmbed } from "@/components/content/LazyEmbed";
import { CalEmbed } from "@/components/content/CalEmbed";
import { EntryBand } from "@/components/pricing/EntryBand";
import { PricingExplorer } from "@/components/pricing/PricingExplorer";
import { corePackages, entryPackages } from "@/lib/packages";
import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Services",
  description:
    "Fixed-price consulting engagements for fintech and platform teams — from a 15-minute fit call to fractional product leadership.",
  path: "/services",
});

// Cal.com's embed wants the path segment ("user/event-type"), not the full
// URL. Derived from booking.calUrl rather than duplicated in config, so the
// config keeps exactly one source of truth for where bookings go.
const calLink = new URL(siteConfig.booking.calUrl).pathname.slice(1);

export default function ServicesPage() {
  return (
    <div className="space-y-10">
      <div data-box className="space-y-5">
        <PageHeader
          title="Consulting engagements"
          dek="Fixed pricing keeps the engagement simple. Scope can be adjusted for deeper involvement, additional stakeholders, or tighter timelines."
        />
        <CtaLink href={siteConfig.booking.calUrl} external>
          Book a 30-minute call
        </CtaLink>
      </div>

      <EntryBand packages={entryPackages} />

      <PricingExplorer packages={corePackages} />

      <CurrencyToggle />

      {/* Anyone who scrolled the whole pricing grid is the highest-intent
          visitor on the site — this is the natural place to book or ask,
          not a standalone /contact page nobody would navigate to first. */}
      <div data-box id="book" className="scroll-mt-8">
        <h2 data-label className="text-muted">
          Book a call or send a brief
        </h2>
        <div className="mt-3 max-w-[46rem] space-y-8">
          <LazyEmbed label="Book a 30-minute call" linkUrl={siteConfig.booking.calUrl}>
            <CalEmbed calLink={calLink} />
          </LazyEmbed>

          <LazyEmbed label="Open the inquiry form" linkUrl={siteConfig.booking.formUrl}>
            <iframe
              src={siteConfig.booking.formEmbedUrl}
              title="Consulting inquiry form"
              loading="lazy"
              style={{ height: 900 }}
              className="w-full rounded border border-border"
            />
          </LazyEmbed>
        </div>
      </div>
    </div>
  );
}
