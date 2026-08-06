import type { ConsultingPackage } from "@/lib/packages";
import { PackageCard } from "./PackageCard";

export function EntryBand({ packages }: { packages: readonly ConsultingPackage[] }) {
  if (packages.length === 0) return null;
  return (
    <div data-box>
      <div data-label className="text-muted">
        Start here
      </div>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {packages.map((pkg) => (
          <PackageCard key={pkg.id} pkg={pkg} />
        ))}
      </div>
    </div>
  );
}
