import Link from "next/link";
import type { Project } from "@/lib/content";
import { getCategory } from "@/lib/categories";
import { cn } from "@/lib/utils";

export function ProjectCard({
  project,
  className,
  showCategory = true,
}: {
  project: Project;
  className?: string;
  /** Hide when cards already sit under their category heading (e.g. /work). */
  showCategory?: boolean;
}) {
  const category = getCategory(project.category);

  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group relative flex flex-col justify-between gap-10 rounded-xl border border-border bg-card p-6 transition-all duration-300",
        "hover:-translate-y-1 hover:border-border-strong hover:bg-card-hover",
        "motion-reduce:transition-none motion-reduce:hover:translate-y-0",
        className
      )}
    >
      <div>
        {showCategory ? (
          <p className="mb-3 font-mono text-[0.6875rem] uppercase tracking-widest text-faint">
            {category.title}
          </p>
        ) : null}
        <h3 className="text-lg font-medium tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>
      </div>

      <div className="flex items-center justify-between text-sm">
        <span className="text-faint">{project.status}</span>
        <span
          aria-hidden="true"
          className="text-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent"
        >
          →
        </span>
      </div>
    </Link>
  );
}
