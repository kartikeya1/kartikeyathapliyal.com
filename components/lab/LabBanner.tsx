/**
 * This route is reachable only by direct link and is excluded from the
 * sitemap and from robots indexing. Anyone who has the link still deserves
 * to be told, in the page itself, that it is not the live pricing — the
 * numbers here differ from /services and are under review.
 *
 * Hardcoded styling on purpose, same reasoning as CalculatorToggle: it must
 * not blend into the design being evaluated underneath it.
 */
export function LabBanner() {
  return (
    <div
      style={{
        borderRadius: "var(--radius)",
        border: "1px dashed rgba(127,127,127,0.5)",
        padding: "12px 16px",
        fontSize: 13,
        lineHeight: 1.5,
      }}
    >
      <strong>Prototype — not the live pricing page.</strong> A parallel
      version of Services testing a two-market pricing model (India pricing
      vs. everywhere-else pricing) and a three-tier structure. The switch
      below would not exist on the real page — region would be detected
      automatically. The live page is{" "}
      <a href="/services" className="underline underline-offset-4">
        /services
      </a>
      .
    </div>
  );
}
