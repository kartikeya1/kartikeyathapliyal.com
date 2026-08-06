"use client";

import { useMemo, useState } from "react";
import type { ConsultingPackage, PackageCategory } from "@/lib/packages";
import { PackageCard } from "./PackageCard";
import { RateCalculator } from "./RateCalculator";
import { FilterSortBar, type SortValue } from "./FilterSortBar";

/**
 * Owns the state that the calculator and the filter/sort bar both act on:
 * the calculator needs to find and flash a card that filter/sort may have
 * hidden or reordered, so all three live in one client component.
 */
export function PricingExplorer({
  packages,
}: {
  packages: readonly ConsultingPackage[];
}) {
  const [hours, setHours] = useState(10);
  const [weeks, setWeeks] = useState(3);
  const [rate, setRate] = useState(4000);
  const [filter, setFilter] = useState<PackageCategory | "all">("all");
  const [sort, setSort] = useState<SortValue>("default");
  const [flashId, setFlashId] = useState<string | null>(null);

  const total = hours * weeks * rate;

  const closest = useMemo(() => {
    // Rate-based packages only — the two flat-fee entry SKUs aren't
    // hours x weeks x rate offers, so they're excluded from the match.
    const candidates = packages.filter((p) => p.rateInrPerHour !== null);
    if (candidates.length === 0) return null;
    return candidates.reduce((best, pkg) =>
      Math.abs(pkg.priceInr - total) < Math.abs(best.priceInr - total) ? pkg : best,
    );
  }, [packages, total]);

  const visible = useMemo(() => {
    let list = packages.filter((p) => filter === "all" || p.category === filter);
    if (sort !== "default") {
      list = [...list].sort((a, b) =>
        sort === "price-asc" ? a.priceInr - b.priceInr : b.priceInr - a.priceInr,
      );
    }
    return list;
  }, [packages, filter, sort]);

  function handleMatchClick() {
    if (!closest) return;
    const el = document.getElementById(closest.id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    setFlashId(closest.id);
    window.setTimeout(() => setFlashId(null), 1200);
  }

  return (
    <div className="space-y-8">
      <RateCalculator
        hours={hours}
        weeks={weeks}
        rate={rate}
        onHoursChange={setHours}
        onWeeksChange={setWeeks}
        onRateChange={setRate}
        total={total}
        matchName={closest?.name ?? null}
        onMatchClick={handleMatchClick}
      />
      <FilterSortBar
        activeFilter={filter}
        onFilterChange={setFilter}
        sort={sort}
        onSortChange={setSort}
      />
      <div
        id="package-grid"
        data-box
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        {visible.map((pkg) => (
          <div
            key={pkg.id}
            className={
              flashId === pkg.id
                ? "rounded-[10px] ring-2 ring-accent transition-shadow duration-300"
                : ""
            }
          >
            <PackageCard pkg={pkg} />
          </div>
        ))}
      </div>
    </div>
  );
}
