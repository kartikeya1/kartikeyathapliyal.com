import Link from "next/link";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  return (
    <div data-box className="max-w-[62ch]">
      <h1 className="text-4xl font-medium tracking-tight">{siteConfig.name}</h1>
      <p className="mt-4 text-lg text-muted">{siteConfig.positioning}</p>
      <Link
        href="/services"
        data-cta="primary"
        className="mt-10 inline-block rounded border border-accent bg-accent px-5 py-2.5 text-sm text-accent-fg"
      >
        See how I work
      </Link>
    </div>
  );
}
