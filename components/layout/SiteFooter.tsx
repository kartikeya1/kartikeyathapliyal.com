import Link from "next/link";
import { Container } from "./Container";
import { ExternalLink } from "@/components/content/ExternalLink";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <Container className="flex flex-wrap items-center justify-between gap-4 py-8 text-sm text-muted">
        <a href={`mailto:${siteConfig.contact.email}`}>
          {siteConfig.contact.email}
        </a>
        <div className="flex items-center gap-6">
          <ExternalLink href={siteConfig.social.linkedin}>LinkedIn</ExternalLink>
          <ExternalLink href={siteConfig.social.github}>GitHub</ExternalLink>
          <Link href="/for-individuals">For individuals</Link>
        </div>
      </Container>
    </footer>
  );
}
