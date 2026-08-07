import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

/**
 * The four real routes. Kept as an explicit list rather than derived from the
 * filesystem - there is no route generator on this site, so four is stable,
 * and scripts/check-static.mjs cross-checks this exact set against the build.
 *
 * /lab/* is excluded on purpose. Those are prototypes reachable by direct
 * link only; they also carry `robots: noindex`. Deriving this list from the
 * filesystem would have silently published them.
 */
const routes = ["/", "/about", "/services", "/for-individuals"];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
  }));
}
