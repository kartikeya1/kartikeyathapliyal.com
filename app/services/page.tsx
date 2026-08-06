import type { Metadata } from "next";
import { PageHeader } from "@/components/content/PageHeader";
import { CtaLink } from "@/components/content/CtaLink";
import { CurrencyToggle } from "@/components/currency/CurrencyToggle";
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
    </div>
  );
}
