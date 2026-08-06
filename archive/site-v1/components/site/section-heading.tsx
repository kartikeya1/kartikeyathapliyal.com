import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-faint">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-medium tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-3 text-base leading-relaxed text-muted">{intro}</p>
      ) : null}
    </div>
  );
}
