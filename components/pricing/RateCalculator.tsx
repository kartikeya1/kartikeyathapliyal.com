"use client";

import { formatInr } from "@/lib/format";

export const rateOptions = [
  { value: 5000, label: "5,000 · advisory / workshop" },
  { value: 4500, label: "4,500 · full-day workshop" },
  { value: 4375, label: "4,375 · strategy sprint" },
  { value: 4167, label: "4,167 · reliability sprint" },
  { value: 4000, label: "4,000 · standard sprint / retainer" },
  { value: 3750, label: "3,750 · coaching" },
] as const;

export function RateCalculator({
  hours,
  weeks,
  rate,
  onHoursChange,
  onWeeksChange,
  onRateChange,
  total,
  matchName,
  onMatchClick,
}: {
  hours: number;
  weeks: number;
  rate: number;
  onHoursChange: (n: number) => void;
  onWeeksChange: (n: number) => void;
  onRateChange: (n: number) => void;
  total: number;
  matchName: string | null;
  onMatchClick: () => void;
}) {
  return (
    <div data-box className="rounded-[10px] border border-border p-5">
      <div className="text-xs font-medium uppercase tracking-wide text-muted">
        Estimate a custom scope
      </div>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="text-sm">
          Hours per week
          <input
            type="number"
            min={1}
            max={60}
            value={hours}
            onChange={(e) => onHoursChange(Math.max(1, Number(e.target.value) || 0))}
            className="mt-1 w-full rounded border border-border bg-bg px-3 py-2 text-sm"
          />
        </label>
        <label className="text-sm">
          Duration (weeks)
          <input
            type="number"
            min={1}
            max={20}
            value={weeks}
            onChange={(e) => onWeeksChange(Math.max(1, Number(e.target.value) || 0))}
            className="mt-1 w-full rounded border border-border bg-bg px-3 py-2 text-sm"
          />
        </label>
        <label className="text-sm">
          Rate (INR/hour)
          <select
            value={rate}
            onChange={(e) => onRateChange(Number(e.target.value))}
            className="mt-1 w-full rounded border border-border bg-bg px-3 py-2 text-sm"
          >
            {rateOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="mt-5 flex items-baseline justify-between">
        <div className="text-2xl font-medium">{formatInr(total)}</div>
        {matchName && (
          <button
            type="button"
            onClick={onMatchClick}
            className="text-sm underline text-muted hover:text-text"
          >
            Closest match: {matchName}
          </button>
        )}
      </div>
    </div>
  );
}
