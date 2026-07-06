import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllProjects, getProject } from "@/lib/content";
import { getCategory } from "@/lib/categories";
import { mdxComponents } from "@/components/mdx/mdx-components";
import { buttonVariants } from "@/components/ui/button";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const category = getCategory(project.category);

  const meta = [
    { label: "Role", value: project.role },
    { label: "Timeframe", value: project.timeframe },
    { label: "Status", value: project.status },
  ].filter((m) => m.value);

  return (
    <article className="mx-auto w-full max-w-3xl px-6 pb-28 pt-16 sm:pt-24">
      <Link
        href="/work"
        className="text-sm text-faint transition-colors hover:text-foreground"
      >
        <span aria-hidden="true">←</span> Work
      </Link>

      <header className="mt-10">
        <p className="font-mono text-xs uppercase tracking-widest text-faint">
          {category.title}
        </p>
        <h1 className="mt-4 text-4xl font-medium tracking-tighter text-foreground sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-muted">
          {project.summary}
        </p>

        {meta.length > 0 ? (
          <dl className="mt-10 grid grid-cols-2 gap-6 border-y border-border py-6 sm:grid-cols-3">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="font-mono text-[0.6875rem] uppercase tracking-widest text-faint">
                  {m.label}
                </dt>
                <dd className="mt-1.5 text-sm text-foreground">{m.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </header>

      <div className="prose prose-invert mt-12 max-w-none prose-p:leading-relaxed">
        <MDXRemote source={project.body} components={mdxComponents} />
      </div>

      {project.prototype ? (
        <aside
          aria-label="Prototype"
          className="mt-16 rounded-xl border border-border bg-card p-8"
        >
          <h2 className="text-lg font-medium tracking-tight text-foreground">
            Prototype
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            The fastest way to understand this project is to use it.
          </p>
          {/* Placeholder URL — replaced when the prototype is deployed. */}
          <a
            href={project.prototype.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${buttonVariants({ size: "default" })} mt-6`}
          >
            {project.prototype.label}
          </a>
        </aside>
      ) : null}

      <footer className="mt-16 border-t border-border pt-8">
        <Link
          href="/work"
          className="text-sm text-muted transition-colors hover:text-foreground"
        >
          <span aria-hidden="true">←</span> All work
        </Link>
      </footer>
    </article>
  );
}
