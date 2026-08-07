import { tiers, tierAnchor, tierPackages } from "@/lib/tiers";
import { RegionalPriceTag } from "@/components/region/RegionalPriceTag";
import { cn } from "@/lib/cn";

/**
 * Three tiers replacing twelve competing cards.
 *
 * The middle tier is featured on purpose: three options anchor the middle
 * as the rational choice, and "Fix" is where most buyers who arrive with a
 * named problem should land. See §2.3 of the research doc.
 */
export function TierLadder() {
  return (
    <section data-box className="space-y-4">
      <h2 data-label className="text-muted">
        Three ways to work together
      </h2>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {tiers.map((tier) => {
          const anchor = tierAnchor(tier);
          const options = tierPackages(tier);
          const hasOptions = options.length > 1;

          return (
            <article
              key={tier.id}
              id={tier.id}
              data-box
              className={cn(
                "flex scroll-mt-8 flex-col rounded-[var(--radius)] border bg-[var(--card-bg)] p-5",
                tier.featured
                  ? "border-accent"
                  : "border-[var(--card-border)]",
              )}
            >
              <div data-label className="text-muted">
                {tier.step} · {tier.name}
              </div>
              <h3 className="mt-1">{tier.headline}</h3>

              {anchor && (
                <div className="mt-3">
                  <RegionalPriceTag pkg={anchor} from={hasOptions} />
                </div>
              )}

              <p className="mt-4 text-sm text-muted">{tier.bestFor}</p>

              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {tier.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              {hasOptions && (
                <div className="mt-4 border-t border-border pt-3">
                  <div data-label className="text-muted">
                    {tier.optionsLabel}
                  </div>
                  <ul className="mt-2 space-y-2">
                    {options.map((pkg) => (
                      <li key={pkg.id} className="flex flex-wrap items-baseline justify-between gap-x-3">
                        <span className="text-sm text-text">{pkg.name}</span>
                        <RegionalPriceTag pkg={pkg} compact />
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
