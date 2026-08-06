import { siteConfig } from "@/lib/site";

/**
 * Person + ProfessionalService, site-wide. One static block is enough for a
 * five-page site — no per-route JSON-LD needed.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteConfig.url}/#person`,
        name: siteConfig.name,
        url: siteConfig.url,
        jobTitle: siteConfig.role,
        image: `${siteConfig.url}/opengraph-image`,
        description: siteConfig.positioning,
        email: `mailto:${siteConfig.contact.email}`,
        sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}/#service`,
        name: `${siteConfig.name} — ${siteConfig.role}`,
        url: siteConfig.url,
        description: siteConfig.positioning,
        provider: { "@id": `${siteConfig.url}/#person` },
        areaServed: "Worldwide",
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
