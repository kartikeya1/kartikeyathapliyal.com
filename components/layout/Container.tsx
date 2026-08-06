import { cn } from "@/lib/cn";

/** The single source of truth for page width and gutters. */
export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto max-w-[68rem] px-6 md:px-10", className)}>
      {children}
    </div>
  );
}
