import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * The five real routes. Kept as an explicit list rather than derived from the
 * filesystem — there is no route generator on this site, so five is stable,
 * and scripts/check-static.mjs cross-checks this exact set against the build.
 */
const routes = ["/", "/about", "/services", "/for-individuals", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));
}
