"use client";

import { useEffect, useId, useState } from "react";

declare global {
  interface Window {
    Cal?: {
      (...args: unknown[]): void;
      ns: Record<string, (...args: unknown[]) => void>;
      loaded?: boolean;
      q?: unknown[];
    };
  }
}

/**
 * A raw <iframe src="https://cal.com/..."> renders Cal.com's full public
 * page — their own header, footer, and page margins — inside our iframe,
 * which is why it looked cramped and left a dead strip on the right at
 * normal content width. Cal.com's inline-embed script solves exactly this:
 * it renders just the booking widget, sized to the container, and resizes
 * itself as the visitor moves through the flow.
 *
 * calLink is the path after cal.com/, e.g. "kartikeyathapliyal/30min".
 */
export function CalEmbed({ calLink }: { calLink: string }) {
  const reactId = useId();
  const namespace = `cal-embed-${reactId.replace(/[^a-zA-Z0-9]/g, "")}`;
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (function (C: Window, A: string, L: string) {
      const p = (a: { q: unknown[] }, ar: unknown) => a.q.push(ar);
      const d = C.document;
      const bootstrap = function (...args: unknown[]) {
        const cal = C.Cal!;
        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
          d.head.appendChild(d.createElement("script")).setAttribute("src", A);
          cal.loaded = true;
        }
        if (args[0] === L) {
          const api: { (...a: unknown[]): void; q: unknown[] } = (
            ...a: unknown[]
          ) => p(api, a);
          api.q = [];
          const ns = args[1] as string;
          if (typeof ns === "string") {
            cal.ns[ns] = cal.ns[ns] || (api as unknown as (...a: unknown[]) => void);
            p({ q: (cal.ns[ns] as unknown as { q: unknown[] }).q }, args);
            p({ q: cal.q! }, ["initNamespace", ns]);
          } else {
            p({ q: cal.q! }, args);
          }
          return;
        }
        p({ q: cal.q! }, args);
      } as Window["Cal"];

      C.Cal = C.Cal || bootstrap;
    })(window, "https://app.cal.com/embed/embed.js", "init");

    window.Cal!("init", namespace, { origin: "https://cal.com" });
    window.Cal!.ns[namespace]("inline", {
      elementOrSelector: `#${namespace}`,
      calLink,
      config: { layout: "month_view" },
    });
    window.Cal!.ns[namespace]("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });

    if (!cancelled) setReady(true);
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      id={namespace}
      style={{ minHeight: ready ? undefined : 650 }}
      className="w-full"
    />
  );
}
