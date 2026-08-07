import { testimonials } from "@/lib/testimonials";

/**
 * Social proof was the single biggest thing missing from the site — the
 * competitor research found it to be the main lever, and none of these had
 * been cleared for use until now.
 *
 * Attribution is always visible. An unattributed testimonial reads as
 * invented, which is worse than having none.
 */
export function Testimonials() {
  return (
    <section data-box>
      <h2 data-label className="text-muted">
        What people who worked with me say
      </h2>
      <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8">
        {testimonials.map((t) => (
          <figure key={t.id} className="border-l-2 border-border pl-4">
            <blockquote className="text-sm text-muted">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-2 text-xs">
              <span className="text-text">{t.author}</span>
              <span className="text-muted"> · {t.role}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
