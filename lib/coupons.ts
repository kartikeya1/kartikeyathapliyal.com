import { siteConfig } from "./site";

export interface Coupon {
  code: string;
  /** Fraction, not percent: 0.1 means 10% off. */
  discount: number;
}

export type CouponResult =
  | { ok: true; coupon: Coupon }
  | { ok: false; reason: "unknown" | "inactive" | "unavailable" };

/**
 * gviz wraps its JSON in `/*O_o*​/\ngoogle.visualization.Query.setResponse(...);`
 * so it can be loaded as JSONP. Strip the wrapper to get at the payload.
 */
function unwrapGviz(text: string): unknown {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("unrecognised gviz response");
  return JSON.parse(text.slice(start, end + 1));
}

/**
 * Google gives percentages back as fractions - "10%" arrives as 0.1. But if
 * someone types a bare `10` into the sheet it arrives as 10, which would be
 * a 1000% discount. Anything above 1 is therefore read as whole percent.
 * Values outside 0-100% are rejected rather than clamped, so a typo can't
 * quietly hand out a free engagement.
 */
function normaliseDiscount(raw: unknown): number | null {
  if (typeof raw !== "number" || !Number.isFinite(raw) || raw <= 0) return null;
  const fraction = raw > 1 ? raw / 100 : raw;
  return fraction > 0 && fraction < 1 ? fraction : null;
}

function isActive(raw: unknown): boolean {
  return typeof raw === "string" && raw.trim().toUpperCase() === "YES";
}

/**
 * Looks a code up in the sheet. Network and parse failures are reported as
 * "unavailable" rather than "unknown" so the UI can tell the visitor their
 * code might be fine and the lookup failed - pricing is left untouched
 * either way.
 */
export async function lookupCoupon(input: string): Promise<CouponResult> {
  const wanted = input.trim().toUpperCase();
  if (!wanted) return { ok: false, reason: "unknown" };

  let rows: { c: ({ v?: unknown } | null)[] }[];
  try {
    const res = await fetch(siteConfig.currency.couponsUrl, { cache: "no-store" });
    if (!res.ok) return { ok: false, reason: "unavailable" };
    const data = unwrapGviz(await res.text()) as {
      table?: { rows?: { c: ({ v?: unknown } | null)[] }[] };
    };
    rows = data.table?.rows ?? [];
  } catch {
    return { ok: false, reason: "unavailable" };
  }

  for (const row of rows) {
    const code = row?.c?.[0]?.v;
    if (typeof code !== "string") continue;
    if (code.trim().toUpperCase() !== wanted) continue;

    const discount = normaliseDiscount(row.c?.[1]?.v);
    if (discount === null) return { ok: false, reason: "unknown" };
    if (!isActive(row.c?.[2]?.v)) return { ok: false, reason: "inactive" };

    return { ok: true, coupon: { code: code.trim().toUpperCase(), discount } };
  }

  return { ok: false, reason: "unknown" };
}

/**
 * The coupon discounts the ORIGINAL price and stacks additively with the
 * base discount, so a 4% base plus a 10% coupon is 14% off the original -
 * not 10% off the already-discounted price.
 */
export function applyCoupon(
  discountedInr: number,
  originalInr: number,
  couponDiscount: number,
): number {
  return Math.max(0, Math.round(discountedInr - originalInr * couponDiscount));
}

/** Total effective percentage off, floored so it never overstates. */
export function totalPercentOff(originalInr: number, finalInr: number): number {
  if (originalInr <= 0) return 0;
  return Math.floor(((originalInr - finalInr) / originalInr) * 100);
}
