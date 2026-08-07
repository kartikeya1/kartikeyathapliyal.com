import { siteConfig } from "./site";

export type Currency = "inr" | "usd";

export interface FxRate {
  inrPerUsd: number;
  /** ISO timestamp of when the source last published, not when we fetched. */
  asOf: string;
  /** "live" once fetched; "fallback" while using the build-time constant. */
  source: "live" | "fallback";
}

export const FALLBACK_RATE: FxRate = {
  inrPerUsd: siteConfig.currency.inrPerUsd,
  asOf: siteConfig.currency.rateAsOf,
  source: "fallback",
};

const STORAGE_CURRENCY = "currency";
const STORAGE_RATE = "fx-rate";

/**
 * Timezone rather than IP geolocation: it needs no network call, no
 * third-party service, and no rate limit. Vercel's geo headers would need
 * middleware, which creates a serverless function and fails check-static.
 * The explicit toggle is the escape hatch when this guesses wrong.
 */
export function inferCurrency(): Currency {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
    return /Asia\/(Kolkata|Calcutta)/i.test(tz) ? "inr" : "usd";
  } catch {
    return "inr";
  }
}

export function readStoredCurrency(): Currency | null {
  try {
    const v = localStorage.getItem(STORAGE_CURRENCY);
    return v === "inr" || v === "usd" ? v : null;
  } catch {
    return null;
  }
}

export function storeCurrency(c: Currency) {
  try {
    localStorage.setItem(STORAGE_CURRENCY, c);
  } catch {
    // Storage blocked - the choice still applies for this page view.
  }
}

/**
 * Returns a cached rate if it is fresh, otherwise fetches. Falls back
 * through primary → fallback → the build-time constant, so a dead API
 * degrades to a visibly-labelled indicative rate rather than a broken page.
 */
export async function loadRate(): Promise<FxRate> {
  const cached = readCachedRate();
  if (cached) return cached;

  const fetched =
    (await fetchPrimary()) ?? (await fetchFallback()) ?? null;

  if (fetched) {
    try {
      localStorage.setItem(
        STORAGE_RATE,
        JSON.stringify({ ...fetched, fetchedAt: Date.now() }),
      );
    } catch {
      // Non-fatal: we just refetch next time.
    }
    return fetched;
  }

  return FALLBACK_RATE;
}

function readCachedRate(): FxRate | null {
  try {
    const raw = localStorage.getItem(STORAGE_RATE);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const ageMs = Date.now() - (parsed.fetchedAt ?? 0);
    if (ageMs > siteConfig.currency.fx.cacheHours * 3_600_000) return null;
    if (typeof parsed.inrPerUsd !== "number" || !parsed.inrPerUsd) return null;
    return {
      inrPerUsd: parsed.inrPerUsd,
      asOf: parsed.asOf,
      source: "live",
    };
  } catch {
    return null;
  }
}

async function fetchPrimary(): Promise<FxRate | null> {
  try {
    const res = await fetch(siteConfig.currency.fx.primaryUrl);
    if (!res.ok) return null;
    const data = await res.json();
    const rate = data?.rates?.INR;
    if (typeof rate !== "number" || !rate) return null;
    return {
      inrPerUsd: rate,
      asOf: data.time_last_update_utc ?? new Date().toISOString(),
      source: "live",
    };
  } catch {
    return null;
  }
}

async function fetchFallback(): Promise<FxRate | null> {
  try {
    const res = await fetch(siteConfig.currency.fx.fallbackUrl);
    if (!res.ok) return null;
    const data = await res.json();
    const rate = data?.usd?.inr;
    if (typeof rate !== "number" || !rate) return null;
    return {
      inrPerUsd: rate,
      asOf: data.date ?? new Date().toISOString(),
      source: "live",
    };
  } catch {
    return null;
  }
}

/** Magnitude-aware, matching lib/format.ts - see the note there. */
export function convertToUsd(inr: number, inrPerUsd: number): number {
  const raw = inr / inrPerUsd;
  if (raw < 100) return Math.round(raw);
  const step = siteConfig.currency.usdRounding;
  return Math.round(raw / step) * step;
}

export function formatUsdAmount(inr: number, inrPerUsd: number): string {
  if (inr === 0) return "Free";
  return `~$${convertToUsd(inr, inrPerUsd).toLocaleString("en-US")}`;
}
