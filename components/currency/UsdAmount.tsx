"use client";

import { formatUsdAmount } from "@/lib/currency";
import { useCurrency } from "./CurrencyProvider";

/**
 * The only element React owns in the price display. It renders the
 * build-time figure on the server and during hydration, then re-renders
 * once with the live rate. `data-cur="usd"` is what the CSS visibility
 * rules key off.
 */
export function UsdAmount({ inr, className }: { inr: number; className?: string }) {
  const { rate } = useCurrency();
  return (
    <span data-cur="usd" data-figure className={className}>
      {formatUsdAmount(inr, rate.inrPerUsd)}
    </span>
  );
}
