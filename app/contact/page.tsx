import type { Metadata } from "next";
import { PageHeader } from "@/components/content/PageHeader";
import { LazyEmbed } from "@/components/content/LazyEmbed";
import { CalEmbed } from "@/components/content/CalEmbed";
import { ExternalLink } from "@/components/content/ExternalLink";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

// Cal.com's embed wants the path segment ("user/event-type"), not the full
// URL. Derived from booking.calUrl rather than duplicated in config, so the
// config keeps exactly one source of truth for where bookings go.
const calLink = new URL(siteConfig.booking.calUrl).pathname.slice(1);

export default function ContactPage() {
  return (
    <div className="space-y-8">
      <div className="max-w-[62ch] space-y-8">
        <PageHeader title="Contact" />

        <div data-box className="space-y-1 text-sm">
          <div>
            <a href={`mailto:${siteConfig.contact.email}`} className="underline">
              {siteConfig.contact.email}
            </a>
          </div>
          <div className="text-muted">{siteConfig.contact.phone}</div>
          <div>
            <ExternalLink href={siteConfig.social.linkedin} className="underline">
              LinkedIn
            </ExternalLink>
          </div>
        </div>
      </div>

      {/* Wider than the prose column above — a calendar and a form both
          need real width to lay out properly, not a reading-width column. */}
      <div data-box className="max-w-[46rem] space-y-8">
        <LazyEmbed label="Book a 30-minute call" linkUrl={siteConfig.booking.calUrl}>
          <CalEmbed calLink={calLink} />
        </LazyEmbed>

        <LazyEmbed label="Open the inquiry form" linkUrl={siteConfig.booking.formUrl}>
          <iframe
            src={siteConfig.booking.formEmbedUrl}
            title="Consulting inquiry form"
            loading="lazy"
            style={{ height: 900 }}
            className="w-full rounded border border-border"
          />
        </LazyEmbed>
      </div>
    </div>
  );
}
