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
      <div className="text-lg font-medium">{formatPrice(priceInr)}</div>
      {rateInrPerHour !== null && (
        <div className="text-xs text-muted">{formatRate(rateInrPerHour)}</div>
      )}
    </div>
  );
}
