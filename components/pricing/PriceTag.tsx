import { formatInr, formatRate } from "@/lib/format";
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

export function PriceTag({
  priceInr,
  rateInrPerHour,
  priceTiers,
}: {
  priceInr: number;
  rateInrPerHour: number | null;
  priceTiers?: ConsultingPackage["priceTiers"];
}) {
  const hasTiers = Boolean(priceTiers?.length);

  return (
    <div>
      <div className="text-lg font-medium">
        {/* With tiers the headline is a floor, not the price. */}
        {hasTiers && <span className="mr-1">From</span>}
        <Amount inr={priceInr} />
      </div>

      {rateInrPerHour !== null && !hasTiers && (
        <div className="text-xs text-muted">
          <span data-cur="inr" data-figure>
            {formatRate(rateInrPerHour)}
          </span>
          <span data-cur="usd">
            <UsdAmount inr={rateInrPerHour} />
            <span>/hour</span>
          </span>
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
