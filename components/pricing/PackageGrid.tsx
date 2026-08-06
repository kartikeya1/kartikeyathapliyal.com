import type { ConsultingPackage } from "@/lib/packages";
import { PackageCard } from "./PackageCard";

export function PackageGrid({
  packages,
  heading = "Packages",
}: {
  packages: readonly ConsultingPackage[];
  /**
   * A real h2, not just a styled label — the page's h1 is always the only
   * heading above this grid, and each card is an h3, so without one here
   * the heading order skips a level (caught by Lighthouse's heading-order
   * audit on /for-individuals).
   */
  heading?: string;
}) {
  return (
    <div data-box>
      <h2 data-label className="text-muted">
        {heading}
      </h2>
      <div
        id="package-grid"
        className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}
