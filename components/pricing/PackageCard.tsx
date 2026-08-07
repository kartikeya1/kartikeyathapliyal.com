import type { ConsultingPackage } from "@/lib/packages";
import { PriceTag } from "./PriceTag";

export function PackageCard({ pkg }: { pkg: ConsultingPackage }) {
  return (
    <article
      id={pkg.id}
      data-box
      data-category={pkg.category}
      data-price={pkg.priceInr}
      className="rounded-[var(--radius)] border border-[var(--card-border)] bg-[var(--card-bg)] p-5"
    >
      {pkg.isPlaceholder && (
        <div className="mb-2 inline-block rounded border border-accent px-2 py-0.5 text-xs text-accent">
          Draft pricing
        </div>
      )}
      <div data-label className="text-muted">{pkg.tag}</div>
      <h3 className="mt-1">{pkg.name}</h3>
      <div className="mt-3">
        <PriceTag
          priceInr={pkg.priceInr}
          rateInrPerHour={pkg.rateInrPerHour}
          priceTiers={pkg.priceTiers}
          originalPriceInr={pkg.originalPriceInr}
          hours={pkg.hours}
        />
      </div>
      <p className="mt-4 text-sm text-muted">{pkg.summary}</p>
      <ul className="mt-3 space-y-1.5 text-sm text-muted">
        {pkg.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
        <li className="text-text">{pkg.outcome}</li>
      </ul>
    </article>
  );
}
