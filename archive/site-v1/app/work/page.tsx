import type { Metadata } from "next";
import { categories } from "@/lib/categories";
import { getProjectsByCategory } from "@/lib/content";
import { ProjectCard } from "@/components/site/project-card";
import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Platform products, AI experiments, UX explorations, internal tooling and product case studies by Kartikeya Thapliyal.",
};

export default function WorkPage() {
  return (
    <div className="mx-auto w-full max-w-5xl px-6 pb-28 pt-20 sm:pt-28">
      <Reveal>
        <h1 className="text-4xl font-medium tracking-tighter text-foreground sm:text-6xl">
          Work
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
          Organized by capability, not chronology — because the useful question
          is rarely <em className="not-italic text-foreground">when</em> something
          was built, but what kind of problem it solved.
        </p>
      </Reveal>

      <div className="mt-20 flex flex-col gap-24">
        {categories.map((category) => {
          const projects = getProjectsByCategory(category.key);
          if (projects.length === 0) return null;

          return (
            <section
              key={category.key}
              id={category.key}
              aria-labelledby={`${category.key}-heading`}
              className="scroll-mt-24"
            >
              <Reveal>
                <SectionHeading title={category.title} intro={category.intro} />
              </Reveal>
              <span id={`${category.key}-heading`} className="sr-only">
                {category.title}
              </span>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project, i) => (
                  <Reveal key={project.slug} delay={Math.min(i * 0.06, 0.24)}>
                    <ProjectCard
                      project={project}
                      showCategory={false}
                      className="h-full"
                    />
                  </Reveal>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
