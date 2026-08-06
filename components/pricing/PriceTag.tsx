import { formatPrice, formatRate } from "@/lib/format";
import type { ConsultingPackage } from "@/lib/packages";

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
      <div data-figure className="text-lg font-medium">
        {/* With tiers the headline is a floor, not the price. Saying "From"
            keeps it honest rather than implying everyone pays the lowest. */}
        {hasTiers ? `From ${formatPrice(priceInr)}` : formatPrice(priceInr)}
      </div>

      {rateInrPerHour !== null && !hasTiers && (
        <div data-figure className="text-xs text-muted">
          {formatRate(rateInrPerHour)}
        </div>
      )}

      {hasTiers && (
        <ul className="mt-2 space-y-1 text-xs text-muted">
          {priceTiers!.map((tier) => (
            <li key={tier.label} className="flex justify-between gap-3">
              <span>{tier.label}</span>
              <span data-figure className="shrink-0">
                {formatPrice(tier.priceInr)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
