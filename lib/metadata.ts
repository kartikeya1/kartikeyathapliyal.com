import type { Metadata } from "next";
import { siteConfig } from "./site";

interface PageMeta {
  /** Page-only title. Omit for the homepage to use the root layout's default. */
  title?: string;
  description: string;
  /** Route path, e.g. "/services". */
  path: string;
}

/**
 * One helper for every route's metadata, so canonical URLs, OG tags, and
 * Twitter cards all derive from siteConfig.url rather than being retyped per
 * page. When the custom domain is attached, changing siteConfig.url is the
 * only edit needed here.
 */
export function buildMetadata({ title, description, path }: PageMeta): Metadata {
  const url = `${siteConfig.url}${path}`;
  const fullTitle = title ? `${title} - ${siteConfig.name}` : `${siteConfig.name} - ${siteConfig.role}`;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
      images: [{ url: `${siteConfig.url}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
    },
  };
}
