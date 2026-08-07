"use client";

import { useEffect, useState } from "react";

const STORAGE_KEY = "show-calculator";

/**
 * Temporary. The calculator confused visitors enough that it's being
 * evaluated for removal - this lets the owner (or anyone testing) flip it
 * on to judge whether it earns its place, without a redeploy.
 *
 * Styled with hardcoded values on purpose, same reasoning as the old Phase 3
 * design switcher: it must not depend on the page's own tokens so it reads
 * identically regardless of what's being judged underneath it.
 *
 * Delete this component and its one usage in PricingExplorer once a final
 * call is made - see PENDING.md.
 */
export function CalculatorToggle({
  show,
  onToggle,
}: {
  show: boolean;
  onToggle: (next: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onToggle(!show)}
      style={{
        position: "fixed",
        bottom: 16,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        borderRadius: 999,
        background: "rgba(24,24,27,0.94)",
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow: "0 6px 24px rgba(0,0,0,0.3)",
        fontFamily: "ui-sans-serif, system-ui, sans-serif",
        fontSize: 12,
        color: "#fafafa",
        cursor: "pointer",
      }}
    >
      <span style={{ opacity: 0.7 }}>Calculator</span>
      <span
        style={{
          width: 26,
          height: 26,
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.18)",
          background: show ? "#fafafa" : "transparent",
          color: show ? "#18181b" : "#fafafa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: 600,
        }}
      >
        {show ? "On" : "Off"}
      </span>
    </button>
  );
}

/** Reads the persisted choice after mount, so SSR/hydration never disagree. */
export function useCalculatorVisible(): [boolean, (next: boolean) => void] {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      setShow(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {
      // Storage blocked - stays hidden for this page view.
    }
  }, []);

  function set(next: boolean) {
    setShow(next);
    try {
      localStorage.setItem(STORAGE_KEY, next ? "1" : "0");
    } catch {
      // Non-fatal: the choice just won't survive navigation.
    }
  }

  return [show, set];
}
