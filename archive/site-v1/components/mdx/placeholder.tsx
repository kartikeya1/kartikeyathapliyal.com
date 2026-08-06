import { cn } from "@/lib/utils";

const aspects = {
  video: "aspect-video",
  wide: "aspect-[21/9]",
  square: "aspect-square max-w-md",
} as const;

/**
 * Stand-in for images and mockups that don't exist yet.
 * Deliberately looks intentional rather than broken: a quiet, hatched
 * frame with a label describing what will eventually live here.
 *
 * Usage in MDX:
 *   <Placeholder label="Broker configuration screen" aspect="video" caption="..." />
 */
export function Placeholder({
  label,
  aspect = "video",
  caption,
}: {
  label: string;
  aspect?: keyof typeof aspects;
  caption?: string;
}) {
  return (
    <figure className="my-10">
      <div
        role="img"
        aria-label={`Placeholder: ${label}`}
        className={cn(
          "flex items-center justify-center rounded-xl border border-border bg-card",
          "bg-[repeating-linear-gradient(135deg,transparent,transparent_10px,rgba(255,255,255,0.015)_10px,rgba(255,255,255,0.015)_11px)]",
          aspects[aspect]
        )}
      >
        <span className="max-w-[80%] text-center font-mono text-xs uppercase tracking-widest text-faint">
          {label}
        </span>
      </div>
      {caption ? (
        <figcaption className="mt-3 text-center text-sm text-faint">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
