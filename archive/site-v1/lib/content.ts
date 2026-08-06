import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { categories, type CategoryKey } from "./categories";

/**
 * Content pipeline.
 *
 * Everything on this site is driven by files under /content:
 *   content/projects/<slug>/index.mdx  → /work/<slug>
 *   content/writing/<slug>.mdx         → listed under /thinking (future)
 *   content/thinking.mdx               → /thinking
 *   content/now.mdx                    → /now
 *
 * Adding a project = adding a folder. No code changes required.
 * See content/README.md for the authoring guide.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");
const WRITING_DIR = path.join(CONTENT_DIR, "writing");

export interface Prototype {
  url: string;
  label: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  category: CategoryKey;
  role?: string;
  timeframe?: string;
  status?: string;
  featured: boolean;
  order: number;
  /** 3–4 scannable facts rendered as "At a glance" on the project page. */
  highlights?: string[];
  prototype?: Prototype;
  /** Raw MDX body, compiled by the page that renders it. */
  body: string;
}

export interface WritingPost {
  slug: string;
  title: string;
  summary?: string;
  date?: string;
  body: string;
}

export interface SimplePage {
  title: string;
  body: string;
  data: Record<string, unknown>;
}

function readMdx(filePath: string) {
  const raw = fs.readFileSync(filePath, "utf8");
  return matter(raw);
}

export function getAllProjects(): Project[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];

  const slugs = fs
    .readdirSync(PROJECTS_DIR, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((slug) => fs.existsSync(path.join(PROJECTS_DIR, slug, "index.mdx")));

  const projects = slugs.map((slug) => {
    const { data, content } = readMdx(path.join(PROJECTS_DIR, slug, "index.mdx"));
    return {
      slug,
      title: data.title as string,
      summary: data.summary as string,
      category: data.category as CategoryKey,
      role: data.role as string | undefined,
      timeframe: data.timeframe as string | undefined,
      status: data.status as string | undefined,
      featured: Boolean(data.featured),
      order: typeof data.order === "number" ? data.order : 99,
      highlights: Array.isArray(data.highlights)
        ? (data.highlights as string[])
        : undefined,
      prototype: data.prototype as Prototype | undefined,
      body: content,
    } satisfies Project;
  });

  return projects.sort((a, b) => a.order - b.order || a.title.localeCompare(b.title));
}

export function getProject(slug: string): Project | undefined {
  return getAllProjects().find((p) => p.slug === slug);
}

/**
 * Featured projects for the home page, ordered by category (the order in
 * lib/categories.ts) and then by each project's `order` within it — so the
 * grid tells a deliberate story rather than an alphabetical accident.
 */
export function getFeaturedProjects(limit = 6): Project[] {
  const categoryRank = new Map(categories.map((c, i) => [c.key, i]));
  return getAllProjects()
    .filter((p) => p.featured)
    .sort(
      (a, b) =>
        (categoryRank.get(a.category) ?? 99) - (categoryRank.get(b.category) ?? 99) ||
        a.order - b.order
    )
    .slice(0, limit);
}

export function getProjectsByCategory(category: CategoryKey): Project[] {
  return getAllProjects().filter((p) => p.category === category);
}

/**
 * Writing posts for the (future) blog inside /thinking.
 * Returns [] until .mdx files exist under content/writing —
 * the "coming soon" state renders automatically in the meantime.
 */
export function getWritingPosts(): WritingPost[] {
  if (!fs.existsSync(WRITING_DIR)) return [];

  return fs
    .readdirSync(WRITING_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const { data, content } = readMdx(path.join(WRITING_DIR, file));
      return {
        slug: file.replace(/\.mdx$/, ""),
        title: (data.title as string) ?? file,
        summary: data.summary as string | undefined,
        date: data.date as string | undefined,
        body: content,
      } satisfies WritingPost;
    })
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export function getPage(name: "thinking" | "now"): SimplePage {
  const { data, content } = readMdx(path.join(CONTENT_DIR, `${name}.mdx`));
  return {
    title: (data.title as string) ?? name,
    body: content,
    data,
  };
}
