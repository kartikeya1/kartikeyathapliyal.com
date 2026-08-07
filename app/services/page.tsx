import type { Metadata } from "next";
import { PageHeader } from "@/components/content/PageHeader";
import { CtaLink } from "@/components/content/CtaLink";
import { CurrencyToggle } from "@/components/currency/CurrencyToggle";
import { CouponProvider } from "@/components/pricing/CouponProvider";
import { CouponField } from "@/components/pricing/CouponField";
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
    "Fixed-price consulting engagements for fintech and platform teams - from a 15-minute fit call to fractional product leadership.",
  path: "/services",
});

// Cal.com's embed wants the path segment ("user/event-type"), not the full
// URL. Derived from booking.calUrl rather than duplicated in config, so the
// config keeps exactly one source of truth for where bookings go.
const calLink = new URL(siteConfig.booking.calUrl).pathname.slice(1);

/**
 * Ordered around what a buyer needs, in the order they need it:
 * what this is → how pricing works and in which currency → the
 * low-commitment options → everything → a coupon if they have one → book.
 *
 * Two things were previously out of order and made the page confusing. The
 * coupon field sat above the grid, asking for a code before showing anything
 * worth discounting; it now sits with the booking step, where someone who
 * arrived from an ad actually uses it. The currency control sat *below* the
 * grid, so prices were read before anyone knew they could switch.
 */
export default function ServicesPage() {
  return (
    <div className="space-y-12">
      <div data-box className="space-y-5">
        <PageHeader
          title="Consulting engagements"
          dek="Fixed pricing keeps the engagement simple. Scope can be adjusted for deeper involvement, additional stakeholders, or tighter timelines."
        />
        <CtaLink href={siteConfig.booking.calUrl} external>
          Book a 30-minute call
        </CtaLink>
      </div>

      <CouponProvider>
        <section data-box className="space-y-3">
          <h2 data-label className="text-muted">
            How pricing works
          </h2>
          <p className="max-w-[62ch] text-sm text-muted">
            Every engagement below runs at the same hourly rate - what changes
            is scope and duration, not the rate. Each price is fixed for the
            hours listed, so there is no meter running.
          </p>
          <CurrencyToggle />
        </section>

        <EntryBand packages={entryPackages} />

        <PricingExplorer packages={corePackages} />

        {/* Anyone who scrolled the whole pricing grid is the highest-intent
            visitor on the site - this is the natural place to book or ask,
            not a standalone /contact page nobody would navigate to first. */}
        <section data-box id="book" className="scroll-mt-8 space-y-4">
          <h2 data-label className="text-muted">
            Book a call or send a brief
          </h2>

          <CouponField />

          <div className="max-w-[46rem] space-y-8">
            <LazyEmbed
              label="Book a 30-minute call"
              linkUrl={siteConfig.booking.calUrl}
            >
              <CalEmbed calLink={calLink} />
            </LazyEmbed>

            <LazyEmbed
              label="Open the inquiry form"
              linkUrl={siteConfig.booking.formUrl}
            >
              <iframe
                src={siteConfig.booking.formEmbedUrl}
                title="Consulting inquiry form"
                loading="lazy"
                style={{ height: 900 }}
                className="w-full rounded border border-border"
              />
            </LazyEmbed>
          </div>
        </section>
      </CouponProvider>
    </div>
  );
}
