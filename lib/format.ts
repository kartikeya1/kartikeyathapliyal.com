import { siteConfig } from "./site";

/**
 * Indian digit grouping (1,20,000) without Intl.NumberFormat.
 * Intl output can differ across ICU builds (small-icu Node, older browsers),
 * which would produce a hydration mismatch on any client component and a
 * non-reproducible build. Twelve lines beats that risk.
 */
export function groupIndian(n: number): string {
  const sign = n < 0 ? "-" : "";
  const s = Math.abs(Math.trunc(n)).toString();
  if (s.length <= 3) return sign + s;
  const last3 = s.slice(-3);
  const rest = s.slice(0, -3);
  const grouped = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `${sign}${grouped},${last3}`;
}

export function formatInr(rupees: number): string {
  if (rupees === 0) return "Free";
  return `₹${groupIndian(rupees)}`;
}

export function toUsd(inr: number): number {
  const raw = inr / siteConfig.currency.inrPerUsd;
  const rounding = siteConfig.currency.usdRounding;
  return Math.round(raw / rounding) * rounding;
}

export function formatUsd(inr: number): string {
  if (inr === 0) return "";
  return `~$${toUsd(inr).toLocaleString("en-US")}`;
}

/** "₹40,000 (~$440)" — the standard price string used on every card. */
export function formatPrice(inr: number): string {
  if (inr === 0) return "Free";
  const usd = formatUsd(inr);
  return usd ? `${formatInr(inr)} (${usd})` : formatInr(inr);
}

export function formatRate(inrPerHour: number | null): string {
  if (inrPerHour === null) return "";
  return `${formatInr(inrPerHour)}/hour`;
}

/** The visible, non-footnote conversion-rate line for /services. */
export function currencyDisclosure(): string {
  const { inrPerUsd, rateAsOf } = siteConfig.currency;
  const date = new Date(rateAsOf).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  return `USD shown at ₹${inrPerUsd} = $1 (set ${date}). INR is the billing currency.`;
}
