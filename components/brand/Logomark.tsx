import { LOGO_NODE, LOGO_PATHS, LOGO_VIEWBOX } from "@/lib/logo";

/**
 * Theme-aware because it strokes `currentColor` - same icon vocabulary as
 * ThemeToggle (24×24, 1.5 stroke, round caps), so the header reads as one
 * set of marks rather than two.
 */
export function Logomark({ className }: { className?: string }) {
  return (
    <svg
      viewBox={LOGO_VIEWBOX}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {LOGO_PATHS.map((d) => (
        <path key={d} d={d} />
      ))}
      <circle
        cx={LOGO_NODE.cx}
        cy={LOGO_NODE.cy}
        r={LOGO_NODE.r}
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
