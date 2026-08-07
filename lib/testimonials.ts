/**
 * Public testimonials.
 *
 * Every quote here is verbatim and name-attributed, taken from
 * whoami/PROFESSIONAL_REPUTATION.md Part 6 ("Pull-Quotes for Public Use").
 * That file records that all of these were posted publicly by their authors
 * as LinkedIn recommendations, which is what makes naming them safe — these
 * are statements the recommenders already chose to publish.
 *
 * Nothing from the private review cycles appears here: no internal scores,
 * no manager or peer names from those cycles. whoami/WORK.md §19 lists those
 * as never-publish.
 *
 * `whoami` advises 4–6 quotes from different people and different strength
 * buckets. These four are chosen for a *consulting* buyer specifically:
 * technical credibility, behaviour in a crisis, follow-through after
 * handover (the single biggest fear about hiring a consultant), and
 * execution without hand-holding.
 *
 * Listed in CLAIMS.md by scripts/build-claims-manifest.mjs so they can be
 * reviewed alongside every other sourced statement on the site.
 */
export interface Testimonial {
  id: string;
  /** Verbatim. An ellipsis marks an omission; wording is otherwise unchanged. */
  quote: string;
  author: string;
  role: string;
  /** Which strength this was picked to evidence. */
  theme: string;
}

export const testimonials: readonly Testimonial[] = [
  {
    id: "jatin-technical",
    quote:
      "One of the most technically astute Product Managers I've partnered with… Any engineering team would be lucky to work with him.",
    author: "Jatin Manav",
    role: "Senior Software Engineer, smallcase",
    theme: "Technical depth",
  },
  {
    id: "gayatri-critical",
    quote:
      "He's the person everyone turns to during critical situations because he consistently gets to the root of the problem and drives solutions that are scalable and avoid creating unnecessary technical or product debt.",
    author: "Gayatri Joshi",
    role: "Associate Product Manager, smallcase",
    theme: "Under pressure",
  },
  {
    id: "vaibhav-followthrough",
    quote:
      "He doesn't disappear after handing over requirements: he stays engaged through implementation, testing, launch, and post-release validation to ensure the outcome meets both product and technical expectations.",
    author: "Vaibhav Bhandari",
    role: "Software Engineer",
    theme: "Follow-through",
  },
  {
    id: "udit-execution",
    quote:
      "A rare combination of ownership, structured thinking, and relentless execution… he doesn't wait for direction or perfect conditions, he takes initiative, asks the right questions, and moves work forward with high agency.",
    author: "Udit Khurana",
    role: "Product & Strategy",
    theme: "Execution",
  },
] as const;
