"use client";

import { useEffect, useState } from "react";

/**
 * Phase 3 only. A floating A/B/C picker so the three design directions can be
 * compared on the real site, with real copy, rather than in a mockup.
 *
 * Deliberately styled with hardcoded values rather than design tokens — it
 * must look identical in all three directions so it never becomes part of
 * what is being judged.
 *
 * Deleted along with DesignScript once a direction is chosen.
 */
const DIRECTIONS = [
  { key: "a", label: "A", name: "Quiet editorial" },
  { key: "b", label: "B", name: "Technical spec" },
  { key: "c", label: "C", name: "Confident consultancy" },
] as const;

export function DesignSwitcher() {
  const [active, setActive] = useState("a");

  useEffect(() => {
    setActive(document.documentElement.dataset.design || "a");
  }, []);

  function pick(key: string) {
    if (key === "a") delete document.documentElement.dataset.design;
    else document.documentElement.dataset.design = key;
    try {
      localStorage.setItem("design", key);
    } catch {
      // Storage blocked; the choice still applies to this page.
    }
    setActive(key);
  }

  const current = DIRECTIONS.find((d) => d.key === active);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 10px",
        borderRadius: 999,
        background: "rgba(24,24,27,0.94)",
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow: "0 6px 24px rgba(0,0,0,0.3)",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        fontSize: 12,
        color: "#fafafa",
      }}
    >
      <span style={{ opacity: 0.6, paddingLeft: 4 }}>Design</span>
      {DIRECTIONS.map((d) => (
        <button
          key={d.key}
          type="button"
          onClick={() => pick(d.key)}
          title={d.name}
          style={{
            width: 26,
            height: 26,
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.18)",
            background: active === d.key ? "#fafafa" : "transparent",
            color: active === d.key ? "#18181b" : "#fafafa",
            cursor: "pointer",
            fontSize: 12,
            fontWeight: 600,
          }}
        >
          {d.label}
        </button>
      ))}
      <span style={{ opacity: 0.7, paddingRight: 4, minWidth: 130 }}>
        {current?.name}
      </span>
    </div>
  );
}
