import { RegionScript } from "@/components/region/RegionScript";
import { RegionProvider } from "@/components/region/RegionProvider";

/**
 * Everything under /lab is a prototype: reachable by direct link only,
 * excluded from the sitemap, and marked noindex on each page.
 *
 * RegionScript renders first so `data-region` is set on <html> before any
 * priced element below it is parsed — that ordering is the whole no-flash
 * guarantee, which is why it lives here rather than in a component that
 * might be moved further down a page.
 */
export default function LabLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <RegionScript />
      <RegionProvider>{children}</RegionProvider>
    </>
  );
}
