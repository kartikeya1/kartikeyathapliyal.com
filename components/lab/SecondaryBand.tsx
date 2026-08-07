import { packageById } from "@/lib/packages";
import { RegionalPriceTag } from "@/components/region/RegionalPriceTag";

/**
 * Everything real and useful that is not one of the three main steps -
 * workshops, coaching, the paid sanity-check call, and the free entry
 * options.
 *
 * Deliberately a compact list rather than cards. Nothing is deleted; these
 * just stop competing visually with the three tiers, which is the entire
 * fix for choice overload. See §2.3 of the research doc.
 */
export function SecondaryBand({
  title,
  ids,
}: {
  title: string;
  ids: readonly string[];
}) {
  const items = ids.map(packageById).filter((p) => p !== undefined);
  if (items.length === 0) return null;

  return (
    <section data-box className="space-y-4">
      <h2 data-label className="text-muted">
        {title}
      </h2>

      <ul className="divide-y divide-border border-y border-border">
        {items.map((pkg) => (
          <li
            key={pkg.id}
            id={pkg.id}
            className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3"
          >
            <div className="min-w-0">
              <h3 className="text-base">{pkg.name}</h3>
              <p className="mt-0.5 text-sm text-muted">{pkg.summary}</p>
            </div>
            <div className="shrink-0">
              <RegionalPriceTag pkg={pkg} compact />
              <div data-label className="mt-0.5 text-right text-muted">
                {pkg.tag}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
