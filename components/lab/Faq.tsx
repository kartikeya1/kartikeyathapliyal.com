import { faq } from "@/lib/services-sections";

/**
 * Objection handling that does not need a call, plus a real SEO surface:
 * FAQPage structured data is emitted from the same array that renders the
 * list, so the markup and the schema can never drift apart.
 *
 * <details> rather than a JS accordion — it works with JavaScript disabled,
 * is keyboard accessible for free, and adds nothing to the bundle.
 */
export function Faq() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section data-box className="space-y-4">
      <h2 data-label className="text-muted">
        Questions people ask first
      </h2>

      <div className="divide-y divide-border border-y border-border">
        {faq.map((item) => (
          <details key={item.id} className="group py-3">
            <summary className="cursor-pointer list-none text-sm marker:content-none">
              <span className="text-text">{item.q}</span>
            </summary>
            <p className="mt-2 max-w-[62ch] text-sm text-muted">{item.a}</p>
          </details>
        ))}
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
