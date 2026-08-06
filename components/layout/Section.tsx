import { cn } from "@/lib/cn";

/**
 * The only component allowed to emit vertical rhythm between page sections.
 * Generous whitespace is a constraint on this one component, not a habit
 * repeated ad hoc across pages.
 */
export function Section({
  heading,
  lede,
  className,
  children,
}: {
  heading?: string;
  /** At most two sentences. */
  lede?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      data-box
      className={cn("py-10 first:pt-0 md:py-14 md:first:pt-0", className)}
    >
      {heading && (
        <h2>{heading}</h2>
      )}
      {lede && <p className="mt-2 max-w-[62ch] text-muted">{lede}</p>}
      {children && <div className={heading || lede ? "mt-6" : ""}>{children}</div>}
    </section>
  );
}
