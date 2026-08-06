"use client";

import { useState } from "react";

/**
 * Third-party iframes (Google Forms, Cal.com) load several hundred KB of JS
 * and would otherwise hurt Lighthouse on every visit to /contact. This keeps
 * them out of the page until the visitor asks for them, with a plain link
 * for no-JS.
 */
export function LazyEmbed({
  label,
  linkUrl,
  embedUrl,
  height = 700,
}: {
  label: string;
  linkUrl: string;
  embedUrl: string;
  height?: number;
}) {
  const [open, setOpen] = useState(false);

  if (open) {
    return (
      <iframe
        src={embedUrl}
        title={label}
        loading="lazy"
        style={{ height }}
        className="w-full rounded border border-border"
      />
    );
  }

  return (
    <div className="rounded border border-border p-5">
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="text-sm underline"
      >
        {label}
      </button>
      <noscript>
        <a href={linkUrl} className="mt-2 block text-sm underline">
          {label} (opens in a new tab)
        </a>
      </noscript>
    </div>
  );
}
