import Link from "next/link";
import { scenarios } from "@/lib/services-sections";
import { tiers } from "@/lib/tiers";

/**
 * Self-qualification before price. The closest comparable opens with
 * problem scenarios rather than offers, so a visitor recognises their own
 * situation before being asked to evaluate a number.
 *
 * Each scenario links to the tier it points at, which is the "embed the
 * path into the buyer journey" pattern rather than making people map
 * problems to packages themselves.
 */
export function ProblemScenarios() {
  return (
    <section data-box className="space-y-4">
      <h2 data-label className="text-muted">
        You are probably here because
      </h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {scenarios.map((s) => {
          const tier = tiers.find((t) => t.id === s.tierId);
          return (
            <div
              key={s.id}
              className="rounded-[var(--radius)] border border-[var(--card-border)] bg-[var(--card-bg)] p-5"
            >
              <h3 className="text-base">{s.situation}</h3>
              <p className="mt-2 text-sm text-muted">{s.detail}</p>
              {tier && (
                <Link
                  href={`#${tier.id}`}
                  className="mt-3 inline-block text-sm text-accent underline underline-offset-4"
                >
                  Start with {tier.step} · {tier.name}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
