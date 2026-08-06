import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * At most one per page — enforced by scripts/check-config.mjs from Phase 2
 * onward, via the data-cta="primary" marker.
 */
export function PrimaryCta({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      data-cta="primary"
      className={cn(
        "inline-block rounded border border-accent bg-accent px-5 py-2.5 text-sm text-accent-fg",
        className,
      )}
    >
      {children}
    </Link>
  );
}
