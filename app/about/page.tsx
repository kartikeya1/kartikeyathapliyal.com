import type { Metadata } from "next";
import { PageHeader } from "@/components/content/PageHeader";
import { Lede } from "@/components/content/Lede";
import { ExternalLink } from "@/components/content/ExternalLink";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="max-w-[62ch] space-y-6">
      <PageHeader title="About" />
      <Lede>Final copy written in Phase 2, from the owner&rsquo;s work history.</Lede>
      <ExternalLink
        href={siteConfig.social.linkedin}
        className="text-sm underline text-muted hover:text-text"
      >
        Full profile on LinkedIn
      </ExternalLink>
    </div>
  );
}
