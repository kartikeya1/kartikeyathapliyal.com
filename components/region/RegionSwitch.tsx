"use client";

import { REGIONS, REGION_ORDER } from "@/lib/regions";
import { useRegion } from "./RegionProvider";
import { cn } from "@/lib/cn";

/**
 * Prototype affordance, not a proposed design element.
 *
 * On the real /services this control would not exist - region would resolve
 * from the browser timezone and never be shown, exactly as the currency
 * default already works. It is here so both price lists can be reviewed on
 * one screen in production, which is the only reason /lab/services exists.
 *
 * That is stated in the UI rather than only in the code, so nobody who
 * lands on this route by link mistakes it for the finished page.
 */
export function RegionSwitch() {
  const { region, setRegion } = useRegion();

  return (
    <div data-box className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <div
        role="group"
        aria-label="Pricing region"
        className="inline-flex overflow-hidden rounded-[var(--radius)] border border-border"
      >
        {REGION_ORDER.map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => setRegion(r)}
            aria-pressed={region === r}
            className={cn(
              "px-3 py-1.5 text-xs",
              region === r ? "bg-accent text-accent-fg" : "text-muted hover:text-text",
            )}
          >
            {REGIONS[r].label}
          </button>
        ))}
      </div>

      {/* Server-rendered for both regions so the note is right before
          hydration, same as the prices it explains. */}
      <p className="text-xs text-muted">
        {REGION_ORDER.map((r) => (
          <span key={r} data-region-price={r}>
            {REGIONS[r].note}
          </span>
        ))}
      </p>
    </div>
  );
}
