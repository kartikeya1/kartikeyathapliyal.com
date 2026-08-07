import { formatInr } from "@/lib/format";
import { UsdAmount } from "@/components/currency/UsdAmount";
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

/**
 * Percentage off, floored rather than rounded — a claimed discount should
 * never read higher than what's actually given.
 */
function percentOff(original: number, now: number): number {
  return Math.floor(((original - now) / original) * 100);
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
  const hasTiers = Boolean(priceTiers?.length);
  const isDiscounted = Boolean(originalPriceInr && originalPriceInr > priceInr);

  // Rates are derived from totals rather than stored separately, so the
  // per-hour figure can never disagree with the headline price.
  const originalRate =
    isDiscounted && hours ? Math.round(originalPriceInr! / hours) : null;
  const newRate = hours ? Math.round(priceInr / hours) : rateInrPerHour;

  return (
    <div>
      <div className="text-lg font-medium">
        {/* With tiers the headline is a floor, not the price. */}
        {hasTiers && <span className="mr-1">From</span>}

        {isDiscounted && (
          <span className="mr-2 text-sm font-normal text-price-cut line-through">
            <Amount inr={originalPriceInr!} />
          </span>
        )}

        <span className={isDiscounted ? "text-price-cut" : undefined}>
          <Amount inr={priceInr} />
        </span>

        {isDiscounted && (
          <span className="ml-2 align-middle text-xs font-normal text-price-cut">
            {percentOff(originalPriceInr!, priceInr)}% off
          </span>
        )}
      </div>

      {newRate !== null && !hasTiers && (
        <div className="mt-0.5 text-xs text-muted">
          {isDiscounted && originalRate !== null && (
            <span className="mr-2 text-price-cut line-through">
              <RatePerHour inr={originalRate} />
            </span>
          )}
          <RatePerHour
            inr={newRate}
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
