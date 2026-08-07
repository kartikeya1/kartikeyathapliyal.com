"use client";

import { formatInr } from "@/lib/format";
import { UsdAmount } from "@/components/currency/UsdAmount";
import { applyCoupon, totalPercentOff } from "@/lib/coupons";
import { useCoupon } from "./CouponProvider";
import type { ConsultingPackage } from "@/lib/packages";

/**
 * Renders both currencies; CSS shows one based on [data-currency]. Only the
 * USD figure is React-owned (UsdAmount), so it can be refined by the live
 * rate without any of the INR markup re-rendering.
 */
function Amount({ inr, className }: { inr: number; className?: string }) {
  if (inr === 0) return <span className={className}>Free</span>;
  return (
    <>
      <span data-cur="inr" data-figure className={className}>
        {formatInr(inr)}
      </span>
      <UsdAmount inr={inr} className={className} />
    </>
  );
}

/** The per-hour figure, in whichever currency is active. */
function RatePerHour({ inr, className }: { inr: number; className?: string }) {
  return (
    <span className={className}>
      <span data-cur="inr" data-figure>
        {formatInr(inr)}
      </span>
      <span data-cur="usd">
        <UsdAmount inr={inr} />
      </span>
      <span>/hour</span>
    </span>
  );
}

export function PriceTag({
  priceInr,
  rateInrPerHour,
  priceTiers,
  originalPriceInr,
  hours,
}: {
  priceInr: number;
  rateInrPerHour: number | null;
  priceTiers?: ConsultingPackage["priceTiers"];
  originalPriceInr?: number;
  hours?: number;
}) {
  // No provider on /for-individuals, so this is null there and coupons
  // simply don't reach that page — no per-page special-casing needed.
  const { coupon } = useCoupon();

  const hasTiers = Boolean(priceTiers?.length);

  // Plans with no base discount still anchor a coupon against their own
  // list price, so a code works on the three excluded plans too.
  const original = originalPriceInr ?? priceInr;
  const final =
    coupon && priceInr > 0
      ? applyCoupon(priceInr, original, coupon.discount)
      : priceInr;

  const isDiscounted = final < original;

  // Rates derive from totals, so the per-hour figure can never disagree
  // with the headline price — including after a coupon is applied.
  //
  // Plans without `hours` (the excluded three) still have a stored rate,
  // which is by definition their *original* rate. Scale it by the same
  // ratio as the total, or a coupon would discount the headline price
  // while leaving the per-hour figure stale.
  const originalRate = hours ? Math.round(original / hours) : rateInrPerHour;
  const finalRate = hours
    ? Math.round(final / hours)
    : rateInrPerHour !== null && priceInr > 0
      ? Math.round((rateInrPerHour * final) / priceInr)
      : rateInrPerHour;

  return (
    <div>
      <div className="text-lg font-medium">
        {/* With tiers the headline is a floor, not the price. */}
        {hasTiers && <span className="mr-1">From</span>}

        {isDiscounted && (
          <span className="mr-2 text-sm font-normal text-price-cut line-through">
            <Amount inr={original} />
          </span>
        )}

        <span className={isDiscounted ? "text-price-cut" : undefined}>
          <Amount inr={final} />
        </span>

        {isDiscounted && (
          <span className="ml-2 align-middle text-xs font-normal text-price-cut">
            {totalPercentOff(original, final)}% off
          </span>
        )}
      </div>

      {finalRate !== null && !hasTiers && (
        <div className="mt-0.5 text-xs text-muted">
          {isDiscounted && originalRate !== null && (
            <span className="mr-2 text-price-cut line-through">
              <RatePerHour inr={originalRate} />
            </span>
          )}
          <RatePerHour
            inr={finalRate}
            className={isDiscounted ? "text-price-cut" : undefined}
          />
        </div>
      )}

      {hasTiers && (
        <ul className="mt-2 space-y-1 text-xs text-muted">
          {priceTiers!.map((tier) => (
            <li key={tier.label} className="flex justify-between gap-3">
              <span>{tier.label}</span>
              <span className="shrink-0">
                <Amount inr={tier.priceInr} />
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
