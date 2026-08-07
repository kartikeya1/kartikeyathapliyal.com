"use client";

import { useState } from "react";
import { HIRE_MODELS, REGIONS, regionalPrice } from "@/lib/regions";
import { useRegion } from "@/components/region/RegionProvider";
import { packageById } from "@/lib/packages";

/**
 * Replaces the rate calculator, which computed `hours × weeks × rate`.
 *
 * That framing was the problem: its only output was a larger number, and it
 * presented the work as metered labour. This one compares the retainer
 * against the fully-loaded cost of the full-time hire the buyer is avoiding
 * — the same comparison the closest comparable puts on its own pricing page.
 * Same slot, inverted framing. See §4 of the research doc.
 *
 * Region comes from React state rather than the CSS attribute because this
 * is interactive: the numbers change as the select changes, so they cannot
 * be server-rendered for both regions. State resolves from the attribute
 * just after hydration, so an international visitor sees India figures for
 * one frame — the same trade already accepted for the live FX rate.
 */
export function ValueCalculator() {
  const { region } = useRegion();
  const model = HIRE_MODELS[region];
  const config = REGIONS[region];

  const [salary, setSalary] = useState<number>(model.defaultSalary);

  // The select's options change with the region, so a value chosen in one
  // region can be meaningless in the other. Fall back to that region's
  // default rather than showing a salary from the wrong market.
  const effectiveSalary = model.salaryOptions.includes(salary)
    ? salary
    : model.defaultSalary;

  const pkg = packageById(model.compareToPackageId);
  const rp = pkg ? regionalPrice(pkg, region) : null;
  if (!pkg || !rp) return null;

  const monthlyLoaded = Math.round((effectiveSalary * model.loading) / 12);
  const retainer = rp.price;
  const monthlyDelta = monthlyLoaded - retainer;

  const fmt = config.format;

  return (
    <section data-box className="space-y-4">
      <h2 data-label className="text-muted">
        What this replaces
      </h2>

      <div className="rounded-[var(--radius)] border border-[var(--card-border)] bg-[var(--card-bg)] p-5">
        <label className="flex flex-wrap items-center gap-3 text-sm">
          <span className="text-muted">
            If you hired a senior product lead at
          </span>
          <select
            value={effectiveSalary}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="rounded-[var(--radius)] border border-border bg-bg px-3 py-1.5 text-sm"
          >
            {model.salaryOptions.map((s) => (
              <option key={s} value={s}>
                {fmt(s)} / year
              </option>
            ))}
          </select>
        </label>

        <dl className="mt-5 space-y-3 text-sm">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-border pb-3">
            <dt className="text-muted">
              Fully loaded, per month
              <span className="ml-1 text-xs">
                (salary plus taxes, benefits, equity, recruiting)
              </span>
            </dt>
            <dd data-figure className="shrink-0">
              {fmt(monthlyLoaded)}
            </dd>
          </div>

          <div className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-border pb-3">
            <dt className="text-muted">
              {pkg.name}, per month
              <span className="ml-1 text-xs">({pkg.hours} hours)</span>
            </dt>
            <dd data-figure className="shrink-0">
              {fmt(retainer)}
            </dd>
          </div>

          <div className="flex flex-wrap items-baseline justify-between gap-x-4">
            <dt>Difference, per month</dt>
            <dd data-figure className="shrink-0 text-price-cut">
              {monthlyDelta >= 0 ? fmt(monthlyDelta) : `+${fmt(-monthlyDelta)}`}
            </dd>
          </div>
        </dl>

        <p className="mt-4 text-xs text-muted">
          Indicative. A fully-loaded multiple of{" "}
          {model.loading.toFixed(1)}× base salary is a common planning
          assumption, not a quote — and it excludes the months a search takes
          before anyone starts.
        </p>
      </div>
    </section>
  );
}
