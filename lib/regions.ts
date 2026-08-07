import type { ConsultingPackage } from "./packages";
import { formatInr } from "./format";

/**
 * Two markets, two price lists.
 *
 * The site previously had one INR list and FX-converted it for everyone
 * else. That is the bug this module exists to fix: the research in
 * docs/PRICING-REVAMP-INDIA-VS-INTERNATIONAL.md found the INR rate correctly
 * placed against the Indian senior-freelance band (₹2,000–₹4,000+/hr) and
 * roughly a fifth of the international fractional-product band
 * ($200–$400/hr). Converting one into the other exports an India price to a
 * market that pays 2–3× more.
 *
 * `Region` is therefore *not* the same thing as `Currency` in lib/currency.ts.
 * Currency changes how one number is displayed. Region changes which number
 * it is.
 *
 * Consumed only by the /lab/services prototype. /services still uses the
 * currency toggle and is unaffected by anything here.
 */
export type Region = "in" | "intl";

export interface RegionConfig {
  id: Region;
  label: string;
  shortLabel: string;
  /** Pre-discount hourly rate, in this region's own currency. */
  hourlyList: number;
  /** Hourly rate after the standing base discount. */
  hourlyNow: number;
  /**
   * Whether to surface a per-hour figure at all.
   *
   * Off internationally, deliberately. The closest comparable
   * (thefractionalproductmanager.com, $7,999–$15,999/month) quotes monthly
   * and never hourly. An hourly number invites comparison against a $30/hr
   * offshore contractor; a monthly retainer figure invites comparison
   * against a salary. See §3.2 of the research doc.
   */
  showHourlyRate: boolean;
  format: (n: number) => string;
  /** Shown beside the region switch, so the basis is never implicit. */
  note: string;
}

/**
 * Exact, not approximate. `formatUsdAmount` in lib/currency.ts prefixes a
 * `~` because it is converting at a floating rate — honest there, wrong
 * here. These figures are authored, so they are the price.
 */
function formatUsdExact(usd: number): string {
  if (usd === 0) return "Free";
  return `$${usd.toLocaleString("en-US")}`;
}

export const REGIONS: Record<Region, RegionConfig> = {
  in: {
    id: "in",
    label: "India",
    shortLabel: "India",
    hourlyList: 4500,
    hourlyNow: 4000,
    showHourlyRate: true,
    format: formatInr,
    note: "Billed in INR. Rates unchanged from the current site.",
  },
  intl: {
    id: "intl",
    label: "International",
    shortLabel: "Intl",
    hourlyList: 150,
    hourlyNow: 135,
    showHourlyRate: false,
    format: formatUsdExact,
    note: "Billed in USD. Priced for the market, not converted from INR.",
  },
};

export const REGION_ORDER: readonly Region[] = ["in", "intl"];

export interface RegionalPrice {
  /** The struck-through anchor. Equals `price` when there is no discount. */
  original: number;
  /** List price after the standing base discount, before any coupon. */
  price: number;
  hours?: number;
  config: RegionConfig;
}

/**
 * Returns null when an offering is not sold in a region — the caller renders
 * nothing rather than falling back to a converted figure, which is the
 * behaviour this whole module exists to prevent.
 */
export function regionalPrice(
  pkg: ConsultingPackage,
  region: Region,
): RegionalPrice | null {
  const config = REGIONS[region];

  if (region === "in") {
    return {
      original: pkg.originalPriceInr ?? pkg.priceInr,
      price: pkg.priceInr,
      hours: pkg.hours,
      config,
    };
  }

  if (!pkg.intl) return null;
  return {
    original: pkg.intl.originalPriceUsd ?? pkg.intl.priceUsd,
    price: pkg.intl.priceUsd,
    hours: pkg.hours,
    config,
  };
}

/**
 * Timezone rather than IP, matching `inferCurrency()` in lib/currency.ts —
 * no network call, no third-party service, and no middleware (which would
 * create a serverless function and fail check-static).
 *
 * On /services this is what would decide the region outright. On
 * /lab/services it only sets the switch's starting position.
 */
export function inferRegion(): Region {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    return /Asia\/(Kolkata|Calcutta)/i.test(tz) ? "in" : "intl";
  } catch {
    return "in";
  }
}

/**
 * Full-time-hire comparison inputs for the value calculator, per region.
 *
 * The salary bands are what a company would pay to hire the role the
 * retainer replaces. `loading` is the multiplier for everything beyond
 * base salary — employer taxes, benefits, equity, recruiting fees,
 * equipment, and the cost of the seat sitting empty during a search.
 */
export interface HireModel {
  /** Annual base salary options for the equivalent full-time hire. */
  salaryOptions: readonly number[];
  defaultSalary: number;
  /** Fully-loaded cost multiplier on base salary. */
  loading: number;
  /** The retainer this is compared against, monthly, in-region. */
  compareToPackageId: string;
}

export const HIRE_MODELS: Record<Region, HireModel> = {
  in: {
    salaryOptions: [3000000, 4500000, 6000000, 8000000],
    defaultSalary: 4500000,
    loading: 1.3,
    compareToPackageId: "fractional-product-lead",
  },
  intl: {
    salaryOptions: [140000, 180000, 220000, 260000],
    defaultSalary: 180000,
    loading: 1.3,
    compareToPackageId: "fractional-product-lead",
  },
};
