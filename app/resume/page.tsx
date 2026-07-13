import type { Metadata } from "next";
import { site } from "@/lib/site";
import { buttonVariants } from "@/components/ui/button";
import { Reveal } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Download Kartikeya Thapliyal's resume — available in India and Southeast Asia versions.",
};

const resumes = [
  {
    label: "India Resume",
    description: "Formatted for roles based in India.",
    href: site.resumes.india,
  },
  {
    label: "SEA Resume",
    description: "Formatted for roles across Southeast Asia.",
    href: site.resumes.sea,
  },
];

const requestHref = (label: string) =>
  `mailto:${site.links.email}?subject=${encodeURIComponent(`Resume request — ${label}`)}`;

export default function ResumePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-6 pb-28 pt-20 sm:pt-28">
      <Reveal>
        <h1 className="text-4xl font-medium tracking-tighter text-foreground sm:text-6xl">
          Resume
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
          One page, two versions — pick the region you’re hiring in.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-4 sm:grid-cols-2">
        {resumes.map((resume, i) => (
          <Reveal key={resume.label} delay={i * 0.06}>
            <div className="flex h-full flex-col justify-between gap-8 rounded-xl border border-border bg-card p-6">
              <div>
                <h2 className="text-lg font-medium tracking-tight text-foreground">
                  {resume.label}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {resume.description}
                </p>
              </div>
              {resume.href ? (
                <a
                  href={resume.href}
                  download
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Download PDF
                </a>
              ) : (
                <a
                  href={requestHref(resume.label)}
                  className={buttonVariants({ variant: "secondary" })}
                >
                  Request by email
                </a>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
