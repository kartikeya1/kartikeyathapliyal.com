"use client";

import type { PackageCategory } from "@/lib/packages";
import { cn } from "@/lib/cn";

const filters: { value: PackageCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "call", label: "Calls" },
  { value: "sprint", label: "Sprints" },
  { value: "monthly", label: "Monthly" },
  { value: "workshop", label: "Workshops" },
];

const sorts = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
] as const;

export type SortValue = (typeof sorts)[number]["value"];

export function FilterSortBar({
  activeFilter,
  onFilterChange,
  sort,
  onSortChange,
}: {
  activeFilter: PackageCategory | "all";
  onFilterChange: (f: PackageCategory | "all") => void;
  sort: SortValue;
  onSortChange: (s: SortValue) => void;
}) {
  return (
    <div
      data-box
      className="flex flex-wrap items-center justify-between gap-4"
    >
      <div role="group" aria-label="Filter by category" className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.value}
            type="button"
            onClick={() => onFilterChange(f.value)}
            className={cn(
              "rounded border px-3 py-1.5 text-sm",
              activeFilter === f.value
                ? "border-accent text-accent"
                : "border-border text-muted hover:text-text",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>
      <label className="text-sm text-muted">
        Sort
        <select
          aria-label="Sort packages"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as SortValue)}
          className="ml-2 rounded border border-border bg-bg px-2 py-1.5 text-sm"
        >
          {sorts.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
