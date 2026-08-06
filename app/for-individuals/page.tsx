import type { Metadata } from "next";
import { PageHeader } from "@/components/content/PageHeader";
import { PackageGrid } from "@/components/pricing/PackageGrid";
import { individualPackages } from "@/lib/packages";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "For individuals" };

export default function ForIndividualsPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title="For individuals"
        dek="Career coaching and interview preparation for people moving into or within product management."
      />

      <PackageGrid packages={individualPackages} />

      <div data-box>
        <a
          href={`mailto:${siteConfig.contact.email}`}
          data-cta="primary"
          className="inline-block rounded border border-accent bg-accent px-5 py-2.5 text-sm text-accent-fg"
        >
          Get in touch
        </a>
      </div>
    </div>
  );
}
