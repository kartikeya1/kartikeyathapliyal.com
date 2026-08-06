import type { Metadata } from "next";
import { PageHeader } from "@/components/content/PageHeader";
import { CtaLink } from "@/components/content/CtaLink";
import { PackageGrid } from "@/components/pricing/PackageGrid";
import { individualPackages } from "@/lib/packages";
import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "For individuals",
  description:
    "Career coaching and interview preparation for people moving into or within product management.",
  path: "/for-individuals",
});

export default function ForIndividualsPage() {
  return (
    <div className="space-y-10">
      <div data-box className="space-y-5">
        <PageHeader
          title="For individuals"
          dek="Career coaching and interview preparation for people moving into or within product management."
        />
        <CtaLink href={siteConfig.booking.calUrl} external>
          Book a free intro call
        </CtaLink>
      </div>

      <PackageGrid packages={individualPackages} heading="Ways to work together" />
    </div>
  );
}
