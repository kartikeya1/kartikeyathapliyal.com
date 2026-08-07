"use client";

import { useCurrency } from "./CurrencyProvider";
import { siteConfig } from "@/lib/site";
import { cn } from "@/lib/cn";

/**
 * The toggle plus the rate disclosure, kept together because the rate is
 * only meaningful next to the control that uses it.
 *
 * The disclosure is always visible and always honest: it names the rate,
 * when the source published it, and says "indicative" when we are on the
 * build-time fallback rather than a live figure.
 */
export function CurrencyToggle() {
  const { currency, rate, setCurrency } = useCurrency();

  const asOf = formatAsOf(rate.asOf);
  const isLive = rate.source === "live";

  return (
    <div data-box className="flex flex-wrap items-center gap-x-4 gap-y-2">
      <div
        role="group"
        aria-label="Display currency"
        className="inline-flex overflow-hidden rounded-[var(--radius)] border border-border"
      >
        {(["inr", "usd"] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setCurrency(c)}
            aria-pressed={currency === c}
            className={cn(
              "px-3 py-1.5 text-xs",
              currency === c
                ? "bg-accent text-accent-fg"
                : "text-muted hover:text-text",
            )}
          >
            {c === "inr" ? "₹ INR" : "$ USD"}
          </button>
        ))}
      </div>

      <p className="text-xs text-muted">
        {isLive ? "Live rate" : "Indicative rate"}: ₹
        {rate.inrPerUsd.toFixed(2)} = $1
        {asOf ? ` · as of ${asOf}` : ""}
        {isLive ? "" : " · live rate unavailable"} · INR is the billing
        currency
      </p>

      <noscript>
        <span className="text-xs text-muted">
          Prices shown in INR. USD conversion needs JavaScript; the rate used
          is ₹{siteConfig.currency.inrPerUsd} = $1.
        </span>
      </noscript>
    </div>
  );
}

function formatAsOf(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
