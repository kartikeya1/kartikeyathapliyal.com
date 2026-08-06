import type { Metadata } from "next";
import { PageHeader } from "@/components/content/PageHeader";
import { LazyEmbed } from "@/components/content/LazyEmbed";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
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
          <a href={siteConfig.social.linkedin} className="underline">
            LinkedIn
          </a>
        </div>
      </div>

      <div data-box>
        <LazyEmbed
          label="Book a 30-minute call"
          linkUrl={siteConfig.booking.calUrl}
          embedUrl={siteConfig.booking.calUrl}
          height={650}
        />
      </div>

      <div data-box>
        <LazyEmbed
          label="Open the inquiry form"
          linkUrl={siteConfig.booking.formUrl}
          embedUrl={siteConfig.booking.formEmbedUrl}
          height={900}
        />
      </div>
    </div>
  );
}
