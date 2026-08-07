/**
 * The logo mark, as raw SVG geometry.
 *
 * Three strokes enter from the left at different heights, converge on a
 * single node, and one clean stroke leaves to the right - "integration
 * chaos in, one calm system out", which is the positioning line and the
 * only idea in it that is actually drawable.
 *
 * Geometry lives here rather than in the component because three surfaces
 * need it and only one of them can import React:
 *   - components/brand/Logomark.tsx  (currentColor, theme-aware)
 *   - app/opengraph-image.tsx        (fixed hex, build-time PNG)
 *   - app/icon.svg                   (static file - cannot import)
 *
 * Since app/icon.svg can't share code, `scripts/check-config.mjs` asserts
 * that every path below appears verbatim in it. Same "derived or verified,
 * never hand-synced" rule as CLAIMS.md.
 *
 * Note: `lib/` is not scanned by check-config's literal rules, so the hex
 * and numeric values here are fine.
 */

/** Drawn on a 24×24 viewBox. Stroked, never filled. */
export const LOGO_PATHS = [
  // top input, curving in to the junction
  "M3 6C7 6 7 12 11 12",
  // middle input, straight through
  "M3 12H11",
  // bottom input, curving in to the junction
  "M3 18C7 18 7 12 11 12",
  // the single output
  "M13.5 12H21",
] as const;

/** The junction - the one filled element, so the mark has a focal point. */
export const LOGO_NODE = { cx: 12, cy: 12, r: 1.6 } as const;

export const LOGO_VIEWBOX = "0 0 24 24";
