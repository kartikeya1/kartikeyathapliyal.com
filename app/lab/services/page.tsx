import type { Metadata } from "next";
import { PageHeader } from "@/components/content/PageHeader";
import { CtaLink } from "@/components/content/CtaLink";
import { LazyEmbed } from "@/components/content/LazyEmbed";
import { CalEmbed } from "@/components/content/CalEmbed";
import { Testimonials } from "@/components/content/Testimonials";
import { CouponProvider } from "@/components/pricing/CouponProvider";
import { CouponField } from "@/components/pricing/CouponField";
import { RegionSwitch } from "@/components/region/RegionSwitch";
import { LabBanner } from "@/components/lab/LabBanner";
import { ProblemScenarios } from "@/components/lab/ProblemScenarios";
import { TierLadder } from "@/components/lab/TierLadder";
import { ValueCalculator } from "@/components/lab/ValueCalculator";
import { SecondaryBand } from "@/components/lab/SecondaryBand";
import { FirstThirtyDays } from "@/components/lab/FirstThirtyDays";
import { Faq } from "@/components/lab/Faq";
import { entryPackages } from "@/lib/packages";
import { secondaryPackageIds } from "@/lib/tiers";
import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = {
  ...buildMetadata({
    title: "Services (prototype)",
    description:
      "Prototype pricing page evaluating a two-market model and a three-tier engagement structure.",
    path: "/lab/services",
  }),
  // Direct-link only. Also absent from app/sitemap.ts — both, because
  // robots is a request not a guarantee and the sitemap is what actively
  // invites a crawler in.
  robots: { index: false, follow: false },
};

const calLink = new URL(siteConfig.booking.calUrl).pathname.slice(1);
const entryIds = entryPackages.map((p) => p.id);

/**
 * A parallel /services built from the pricing research in
 * docs/PRICING-REVAMP-INDIA-VS-INTERNATIONAL.md. /services itself is
 * untouched, so this can be judged in production against the live page.
 *
 * Section order follows what the research found converts, and differs from
 * /services in three ways: the visitor qualifies themselves *before* seeing
 * a price, twelve SKUs are three tiers, and the objection-handling sections
 * (first 30 days, FAQ) sit between the offers and the booking step rather
 * than not existing.
 */
export default function LabServicesPage() {
  return (
    <div className="space-y-12">
      <LabBanner />

      <div data-box className="space-y-5">
        <PageHeader
          title="Consulting engagements"
          dek="Three ways in, priced for the market you are in. Fixed scope, fixed price, and a defined end date on everything."
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
            Indian and international consulting rates genuinely differ, so
            there are two price lists rather than one converted number. Each
            is priced for its own market and billed in its own currency.
            Within a list, what changes between engagements is scope and
            duration — never the rate.
          </p>
          <RegionSwitch />
        </section>

        <ProblemScenarios />

        <TierLadder />

        <ValueCalculator />

        <SecondaryBand title="Not ready to commit" ids={entryIds} />

        <SecondaryBand title="Also available" ids={secondaryPackageIds} />

        <FirstThirtyDays />

        <Testimonials />

        <Faq />

        {/* Same reasoning as /services: anyone who reached the bottom is the
            highest-intent visitor on the site, so the booking step lives
            here rather than on a page nobody navigates to first. */}
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
