import type { Metadata } from "next";
import { PageHeader } from "@/components/content/PageHeader";
import { PrimaryCta } from "@/components/content/PrimaryCta";
import { PackageGrid } from "@/components/pricing/PackageGrid";
import { individualPackages } from "@/lib/packages";

export const metadata: Metadata = { title: "For individuals" };

export default function ForIndividualsPage() {
  return (
    <div className="space-y-10">
      <div data-box className="space-y-5">
        <PageHeader
          title="For individuals"
          dek="Career coaching and interview preparation for people moving into or within product management."
        />
        <PrimaryCta href="/contact">Get in touch</PrimaryCta>
      </div>

      <PackageGrid packages={individualPackages} />
    </div>
  );
}
