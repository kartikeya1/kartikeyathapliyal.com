import type { Metadata } from "next";
import { CtaLink } from "@/components/content/CtaLink";
import { Claim } from "@/components/content/Claim";
import { Testimonials } from "@/components/content/Testimonials";
import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  description: siteConfig.positioning,
  path: "/",
});

/**
 * What someone actually hires him for. Homepage copy rather than data any
 * other surface consumes, so it lives here rather than in lib/.
 */
const PILLARS = [
  {
    title: "Integrations that hold",
    body: "Broker, RTA, aggregator and payment-partner work — API contracts, failure modes, and rollout plans that survive contact with a real partner.",
  },
  {
    title: "Reliability you can measure",
    body: "Error taxonomies, RCA discipline, and the operating cadence that turns a flaky critical journey into one nobody has to think about.",
  },
  {
    title: "Product leadership, part-time",
    body: "Advisory or fractional ownership of a platform area — roadmap, specs, and the product-engineering translation teams struggle with.",
  },
];

export default function HomePage() {
  return (
    <div className="space-y-16 md:space-y-20">
      <section data-box data-hero className="max-w-[62ch]">
        <h1>{siteConfig.name}</h1>
        <p className="mt-4 text-lg text-muted">{siteConfig.positioning}</p>
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <CtaLink href="/services">See how I work</CtaLink>
          <CtaLink href="/about" variant="secondary">
            About me
          </CtaLink>
        </div>
      </section>

      <section data-box>
        <h2 data-label className="text-muted">
          What I&rsquo;m hired for
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8">
          {PILLARS.map((p) => (
            <div key={p.title}>
              <h3>{p.title}</h3>
              <p className="mt-2 text-sm text-muted">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section data-box>
        <h2 data-label className="text-muted">
          Track record
        </h2>
        <p className="mt-4 max-w-[62ch] text-muted">
          <Claim id="tenure" />, most of it at{" "}
          <Claim id="employer-smallcase" />, where I owned{" "}
          <Claim id="broker-count" /> covering <Claim id="market-coverage" />.
          The platform reached <Claim id="users-reached" /> and handled{" "}
          <Claim id="orders-per-month" /> at <Claim id="uptime" />.
        </p>
        <ul className="mt-6 grid grid-cols-1 gap-3 text-sm text-muted sm:grid-cols-2">
          <li>
            Took <Claim id="sip-success" />
          </li>
          <li>
            Cut <Claim id="error-rate" />
          </li>
          <li>
            Moved <Claim id="mf-onboarding-conversion" />
          </li>
          <li>
            <Claim id="legacy-uptime" />
          </li>
        </ul>
      </section>

      <Testimonials />

      <section data-box className="max-w-[62ch]">
        <h2 data-label className="text-muted">
          How I think about it
        </h2>
        <blockquote className="mt-4 border-l-2 border-border pl-4 text-muted">
          Design for the second integrator. The first one will forgive you. The
          platform is only real once the second one succeeds without asking you
          anything.
        </blockquote>
      </section>
    </div>
  );
}
