import type { Metadata } from "next";
import { PageHeader } from "@/components/content/PageHeader";
import { PrimaryCta } from "@/components/content/PrimaryCta";
import { ExternalLink } from "@/components/content/ExternalLink";
import { Claim } from "@/components/content/Claim";
import { siteConfig } from "@/lib/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Platform and integration product manager, ~7 years across engineering and product, most recently at smallcase.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <div className="max-w-[62ch] space-y-10">
      <div data-box className="space-y-5">
        <PageHeader
          title="About"
          dek="I turn integration and infrastructure chaos into systems that stay calm under load."
        />
        <PrimaryCta href="/services">See how I work</PrimaryCta>
      </div>

      <section data-box className="space-y-4 text-muted">
        <p>
          I spent <Claim id="tenure" />. The engineering half is still the
          reason I&rsquo;m useful at the product and engineering boundary: I
          write specs a developer can build from, and I argue about failure
          modes before anyone writes code.
        </p>
        <p>
          Most of that time was at <Claim id="employer-smallcase" />, where I
          owned <Claim id="broker-count" /> &mdash;{" "}
          <Claim id="market-coverage" /> &mdash; and the investing workflows
          running on top of them: order execution, SIPs, compliance journeys,
          payments. The platform reached <Claim id="users-reached" />, handled{" "}
          <Claim id="orders-per-month" />, and carried{" "}
          <Claim id="transaction-value" />. I designed the reliability
          architecture behind <Claim id="uptime" /> on those flows.
        </p>
      </section>

      <section data-box className="space-y-4">
        <h2>What I actually fixed</h2>
        <ul className="space-y-2 text-muted">
          <li>
            Took <Claim id="sip-success" /> by finding where the retry and
            mandate logic was quietly failing.
          </li>
          <li>
            Cut <Claim id="error-rate" /> with standardised error codes and an
            experimentation framework across partner integrations &mdash;{" "}
            <Claim id="support-tat" />.
          </li>
          <li>
            <Claim id="legacy-uptime" />.
          </li>
          <li>
            <Claim id="sbi-integration" />.
          </li>
          <li>
            Moved <Claim id="mf-onboarding-conversion" /> by removing the
            wrong-bank and data-mismatch failures from the funnel.
          </li>
          <li>
            Stood up the mutual-fund commercial and integration backbone now
            carrying <Claim id="mf-aum" />.
          </li>
          <li>
            Grew <Claim id="organic-activation" />.
          </li>
        </ul>
      </section>

      <section data-box className="space-y-4">
        <h2>Where I go deep</h2>
        <p className="text-muted">
          Broker and stockbroker integrations first, then mutual funds and RTAs,
          account aggregation, payments, and compliance. Underneath all of it:
          API-first product design, reliability from a product lens, and
          migrations that don&rsquo;t break the people already using the thing.
        </p>
        <p className="text-muted">
          I also ran the regulatory backbone on my own &mdash;{" "}
          <Claim id="compliance-audits" /> &mdash; and handled{" "}
          <Claim id="amc-agreements" />. Platform work is rarely only technical.
        </p>
      </section>

      <section data-box className="space-y-4">
        <h2>How I think about it</h2>
        <blockquote className="border-l-2 border-border pl-4 text-muted">
          Design for the second integrator. The first one will forgive you. The
          platform is only real once the second one succeeds without asking you
          anything.
        </blockquote>
      </section>

      <section data-box className="space-y-3">
        <h2>Working with me</h2>
        <p className="text-muted">
          Advisory and strategy, not hands-on code. Best fit is fintech and
          wealth, and adjacent platform work where integrations, reliability, or
          compliance are the hard part.
        </p>
        <ExternalLink
          href={siteConfig.social.linkedin}
          className="inline-block text-sm underline text-muted hover:text-text"
        >
          Full profile on LinkedIn
        </ExternalLink>
      </section>
    </div>
  );
}
