import { firstThirtyDays } from "@/lib/services-sections";

/**
 * The risk-killer section. "What do I actually get" is the objection that
 * stops a first engagement, and a month-by-month breakdown answers it
 * without a call. Present on the closest comparable, absent here.
 */
export function FirstThirtyDays() {
  return (
    <section data-box className="space-y-4">
      <h2 data-label className="text-muted">
        What the first 30 days look like
      </h2>

      <ol className="space-y-4">
        {firstThirtyDays.map((m) => (
          <li
            key={m.id}
            className="border-l-2 border-border pl-4"
          >
            <h3 data-label className="text-muted">
              {m.when}
            </h3>
            <p className="mt-1 text-sm">{m.what}</p>
            <p className="mt-1 text-sm text-muted">{m.output}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
