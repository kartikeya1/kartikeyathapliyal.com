import type { ConsultingPackage } from "@/lib/packages";
import { PackageCard } from "./PackageCard";

export function EntryBand({ packages }: { packages: readonly ConsultingPackage[] }) {
  if (packages.length === 0) return null;
  return (
    <div data-box>
      {/* A real heading, not just a styled label - /services otherwise
          jumps from the page h1 straight to each card's h3, skipping a
          level (caught by Lighthouse's heading-order audit). */}
      <h2 data-label className="text-muted">
        Start here
      </h2>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}
