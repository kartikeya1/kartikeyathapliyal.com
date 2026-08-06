import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * The site's only call-to-action element.
 *
 * `variant="primary"` emits `data-cta="primary"`, which
 * `scripts/check-config.mjs` counts — at most one per page, and none at all
 * in `components/layout/` so that site-wide chrome (the footer) can never
 * silently double every page's primary action.
 *
 * `variant="secondary"` is the outline treatment: used for supporting
 * actions that should look clickable without competing with the primary.
 *
 * Replaces the old PrimaryCta, whose class string had been copy-pasted into
 * app/services/page.tsx to get an external primary button.
 */
const BASE =
  "inline-flex items-center justify-center rounded-[var(--radius)] px-5 py-2.5 text-sm";

const VARIANTS = {
  primary: "border border-accent bg-accent text-accent-fg hover:opacity-90",
  secondary: "border border-border text-text hover:border-text",
} as const;

export function CtaLink({
  href,
  variant = "primary",
  external = false,
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof VARIANTS;
  /** Renders an <a target="_blank"> instead of a next/link. */
  external?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const classes = cn(BASE, VARIANTS[variant], className);
  const marker = variant === "primary" ? { "data-cta": "primary" } : {};

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...marker}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...marker}>
      {children}
    </Link>
  );
}
