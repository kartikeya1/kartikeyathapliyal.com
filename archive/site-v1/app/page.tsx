import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ProjectCard } from "@/components/site/project-card";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { getFeaturedProjects } from "@/lib/content";
import { site } from "@/lib/site";

export default function HomePage() {
  const featured = getFeaturedProjects(6);

  return (
    <>
      {/* Hero */}
      <section className="mx-auto w-full max-w-5xl px-6 pb-24 pt-28 sm:pb-32 sm:pt-40">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-widest text-faint">
            Product Manager
          </p>
          <h1 className="mt-5 text-5xl font-medium leading-[1.04] tracking-tighter text-foreground sm:text-7xl">
            Kartikeya Thapliyal
          </h1>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-muted sm:text-2xl">
            I enjoy building products, platforms and internal systems that make
            complex ecosystems <span className="text-accent">feel simple</span>.
          </p>
          <p className="mt-6 text-sm text-faint">
            Previously {site.previously.role} at{" "}
            <span className="text-muted">{site.previously.company}</span>{" "}
            <span aria-hidden="true">·</span> {site.previously.period}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Link href="/work" className={buttonVariants({ size: "lg" })}>
              See My Work
            </Link>
            <Link
              href="/resume"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Resume
            </Link>
            {/*
              TODO: Book Consultation — replace href with a real booking link
              (e.g. Cal.com) once one exists; see `booking` in lib/site.ts.
              It points to /contact until then.
            */}
            <Link
              href="/contact"
              className={buttonVariants({ variant: "secondary", size: "lg" })}
            >
              Book Consultation
            </Link>
          </div>
        </Reveal>
      </section>

      {/* Selected Work */}
      <section
        aria-labelledby="selected-work"
        className="mx-auto w-full max-w-5xl px-6 pb-28"
      >
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Selected Work"
              title="Systems I'm glad I built"
              intro="Platforms, internal tools and experiments — chosen for what they say about how I work, not how they looked in a launch post."
            />
            <Link
              href="/work"
              className="mb-1 text-sm text-muted transition-colors hover:text-foreground"
            >
              All work <span aria-hidden="true">→</span>
            </Link>
          </div>
        </Reveal>

        <h2 id="selected-work" className="sr-only">
          Selected work
        </h2>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={Math.min(i * 0.06, 0.3)}>
              <ProjectCard project={project} className="h-full" />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Quiet close */}
      <section className="border-t border-border">
        <div className="mx-auto w-full max-w-5xl px-6 py-24">
          <Reveal>
            <p className="max-w-2xl text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
              If you want to know how I work before we ever talk —{" "}
              <Link
                href="/thinking"
                className="text-muted underline decoration-border-strong underline-offset-4 transition-colors hover:text-foreground hover:decoration-accent"
              >
                start with how I think
              </Link>
              .
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
