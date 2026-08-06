"use client";

import { useState } from "react";
import { ExternalLink } from "./ExternalLink";

/**
 * Third-party embeds (Cal.com, Google Forms) would otherwise load on every
 * visit to /contact and hurt Lighthouse. This keeps them out of the page
 * until the visitor asks for them, with a plain link-out for no-JS.
 *
 * The revealed content is passed as children rather than baked in here, so
 * each embed can use whatever rendering it actually needs — an <iframe> for
 * Google Forms, Cal.com's own inline-embed component for Cal.com.
 */
export function LazyEmbed({
  label,
  linkUrl,
  children,
}: {
  label: string;
  linkUrl: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  if (open) return <>{children}</>;

  return (
    <div className="rounded border border-border p-5">
      <button type="button" onClick={() => setOpen(true)} className="text-sm underline">
        {label}
      </button>
      <noscript>
        <ExternalLink href={linkUrl} className="mt-2 block text-sm underline">
          {label} (opens in a new tab)
        </ExternalLink>
      </noscript>
    </div>
  );
}
