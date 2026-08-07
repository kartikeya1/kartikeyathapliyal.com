"use client";

import { useMemo, useState } from "react";
import {
  defaultRateInr,
  type ConsultingPackage,
  type PackageCategory,
} from "@/lib/packages";
import { PackageCard } from "./PackageCard";
import { RateCalculator } from "./RateCalculator";
import { FilterSortBar, type SortValue } from "./FilterSortBar";
import { CalculatorToggle, useCalculatorVisible } from "./CalculatorToggle";

/** Matches the `flash-highlight` fade below. */
const FLASH_MS = 1200;

/**
 * Owns the state that the calculator and the filter/sort bar both act on:
 * the calculator needs to find and flash a card that filter/sort may have
 * hidden or reordered, so all three live in one client component.
 *
 * The calculator sits below the grid (it was moved from the top — it was
 * confusing visitors before they'd even seen the plans) and is gated behind
 * a temporary on/off flag so it can be evaluated for removal without a
 * redeploy. See CalculatorToggle.tsx.
 */
export function PricingExplorer({
  packages,
}: {
  packages: readonly ConsultingPackage[];
}) {
  const [hours, setHours] = useState(10);
  const [weeks, setWeeks] = useState(3);
  const [rate, setRate] = useState<number>(defaultRateInr);
  const [filter, setFilter] = useState<PackageCategory | "all">("all");
  const [sort, setSort] = useState<SortValue>("default");
  const [flashId, setFlashId] = useState<string | null>(null);
  const [showCalculator, setShowCalculator] = useCalculatorVisible();

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
    window.setTimeout(() => setFlashId(null), FLASH_MS);
  }

  return (
    <div className="space-y-8">
      <FilterSortBar
        activeFilter={filter}
        onFilterChange={setFilter}
        sort={sort}
        onSortChange={setSort}
      />
      {/* Own h2, not just a styled label — keeps this grid's h3 cards under
          their own section rather than nested under EntryBand's "Start
          here" heading. */}
      <h2 data-label className="text-muted">
        All engagements
      </h2>
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
                ? "rounded-[var(--radius)] ring-2 ring-accent transition-shadow duration-300"
                : ""
            }
          >
            <PackageCard pkg={pkg} />
          </div>
        ))}
      </div>

      {showCalculator && (
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
      )}

      <CalculatorToggle show={showCalculator} onToggle={setShowCalculator} />
    </div>
  );
}
