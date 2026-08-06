import type { Metadata } from "next";
import { PageHeader } from "@/components/content/PageHeader";
import { ExternalLink } from "@/components/content/ExternalLink";
import { EntryBand } from "@/components/pricing/EntryBand";
import { PricingExplorer } from "@/components/pricing/PricingExplorer";
import { corePackages, entryPackages } from "@/lib/packages";
import { currencyDisclosure } from "@/lib/format";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <div className="space-y-10">
      <div data-box className="space-y-5">
        <PageHeader
          title="Consulting engagements"
          dek="Fixed pricing keeps the engagement simple. Scope can be adjusted for deeper involvement, additional stakeholders, or tighter timelines."
        />
        <ExternalLink
          href={siteConfig.booking.calUrl}
          data-cta="primary"
          className="inline-block rounded border border-accent bg-accent px-5 py-2.5 text-sm text-accent-fg"
        >
          Book a 30-minute call
        </ExternalLink>
      </div>

      <EntryBand packages={entryPackages} />

      <PricingExplorer packages={corePackages} />

      <p data-box className="text-sm text-muted">
        {currencyDisclosure()}
      </p>
    </div>
  );
}
