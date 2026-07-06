/**
 * Work is organized by capability, not chronology.
 * The order of this array is the order sections appear on /work.
 *
 * To add a category: add an entry here, then use its `key` in a project's
 * frontmatter. Nothing else needs to change.
 */
export type CategoryKey =
  | "platform"
  | "ai-lab"
  | "ux"
  | "internal-tooling"
  | "case-study";

export interface Category {
  key: CategoryKey;
  title: string;
  intro: string;
}

export const categories: Category[] = [
  {
    key: "platform",
    title: "Platform Products",
    intro:
      "Products that other products are built on — where the users are often other teams, and the interface is as much organizational as technical.",
  },
  {
    key: "ai-lab",
    title: "AI Lab",
    intro:
      "Exploring how AI changes product development, software design, engineering workflows and user experiences. Ongoing experiments, not finished products.",
  },
  {
    key: "ux",
    title: "UX Explorations",
    intro:
      "Product thinking exercises. Each one starts from a problem worth having an opinion about — the pixels come later.",
  },
  {
    key: "internal-tooling",
    title: "Internal Tooling",
    intro:
      "Internal systems built to simplify coordination between smallcase and partner brokers.",
  },
  {
    key: "case-study",
    title: "Product Case Studies",
    intro:
      "End-to-end accounts of taking ambiguous problems to shipped products — the framing, the tradeoffs, and what actually happened.",
  },
];

export function getCategory(key: CategoryKey): Category {
  const category = categories.find((c) => c.key === key);
  if (!category) throw new Error(`Unknown category: ${key}`);
  return category;
}
