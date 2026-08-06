import { formatPrice, formatRate } from "@/lib/format";

export function PriceTag({
  priceInr,
  rateInrPerHour,
}: {
  priceInr: number;
  rateInrPerHour: number | null;
}) {
  return (
    <div>
      <div data-figure className="text-lg font-medium">{formatPrice(priceInr)}</div>
      {rateInrPerHour !== null && (
        <div data-figure className="text-xs text-muted">{formatRate(rateInrPerHour)}</div>
      )}
    </div>
  );
}
