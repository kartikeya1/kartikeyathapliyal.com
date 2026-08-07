"use client";

import { applyCoupon, totalPercentOff } from "@/lib/coupons";
import { useCoupon } from "@/components/pricing/CouponProvider";
import { REGION_ORDER, regionalPrice } from "@/lib/regions";
import type { ConsultingPackage } from "@/lib/packages";

/**
 * The region-aware replacement for PriceTag.
 *
 * Both regions' prices are rendered into the static HTML and CSS shows one,
 * keyed off `[data-region]` — the same mechanism PriceTag uses for the two
 * currencies, and for the same reasons: correct with JavaScript disabled,
 * correct for crawlers, no flash, no hydration mismatch.
 *
 * The difference from PriceTag is what varies between the two branches.
 * There, one INR figure is converted at a live rate. Here the two figures
 * are independently authored prices for two different markets, so nothing
 * is derived from anything — see lib/regions.ts.
 */
export function RegionalPriceTag({
  pkg,
  from = false,
  compact = false,
}: {
  pkg: ConsultingPackage;
  /** Renders "From" — used when a tier holds several options. */
  from?: boolean;
  /** Inline size, no hourly rate — for option lists inside a tier. */
  compact?: boolean;
}) {
  const { coupon } = useCoupon();

  return (
    <div>
      {REGION_ORDER.map((region) => {
        const rp = regionalPrice(pkg, region);
        // Not sold in this region: render nothing rather than falling back
        // to a converted figure, which is the whole point of the module.
        if (!rp) return null;

        const { original, price, hours, config } = rp;

        // Coupons discount the pre-discount anchor and stack additively with
        // the standing discount, identical to PriceTag. The maths is
        // proportional, so it holds in either currency without change.
        const final =
          coupon && price > 0 ? applyCoupon(price, original, coupon.discount) : price;
        const isDiscounted = final < original;

        // Rates derive from totals so the per-hour figure can never disagree
        // with the headline — including after a coupon.
        const showRate =
          config.showHourlyRate && Boolean(hours) && !from && !compact;
        const originalRate = hours ? Math.round(original / hours) : 0;
        const finalRate = hours ? Math.round(final / hours) : 0;

        const perMonth = pkg.category === "monthly";

        return (
          <span key={region} data-region-price={region}>
            <span
              className={
                compact ? "block text-sm" : "block text-lg font-medium"
              }
            >
              {from && <span className="mr-1">From</span>}

              {isDiscounted && (
                <span className="mr-2 text-sm font-normal text-price-cut line-through">
                  <span data-figure>{config.format(original)}</span>
                </span>
              )}

              {/* The kept price, not the given-up one — same reasoning as
                  the value calculator's "you save" line: green reads as
                  good news, red reads as loss. Only the struck-through
                  original stays red, below. */}
              <span className={isDiscounted ? "text-price-save" : undefined}>
                <span data-figure>{config.format(final)}</span>
                {perMonth && price > 0 && (
                  <span className="text-sm font-normal">/month</span>
                )}
              </span>

              {isDiscounted && (
                <span className="ml-2 align-middle text-xs font-normal text-price-save">
                  {totalPercentOff(original, final)}% off
                </span>
              )}
            </span>

            {showRate && (
              <span className="mt-0.5 block text-xs text-muted">
                {isDiscounted && (
                  <span className="mr-2 text-price-cut line-through">
                    <span data-figure>{config.format(originalRate)}</span>/hour
                  </span>
                )}
                <span className={isDiscounted ? "text-price-save" : undefined}>
                  <span data-figure>{config.format(finalRate)}</span>/hour
                </span>
              </span>
            )}
          </span>
        );
      })}
    </div>
  );
}
