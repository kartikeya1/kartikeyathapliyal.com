import type { ConsultingPackage } from "@/lib/packages";
import { PackageCard } from "./PackageCard";

export function PackageGrid({ packages }: { packages: readonly ConsultingPackage[] }) {
  return (
    <div
      id="package-grid"
      data-box
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      {packages.map((pkg) => (
        <PackageCard key={pkg.id} pkg={pkg} />
      ))}
    </div>
  );
}
