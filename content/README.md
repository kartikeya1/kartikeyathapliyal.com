# Content guide

Everything visible on this site is driven by the files in this folder.
Pages are generated from content — adding things here requires **no code changes**.

This file is written for two audiences: future me, and any AI assistant asked to
"add project X" or "add another blog post". Follow it exactly and the site will
keep working.

## Add a project

Create `content/projects/<slug>/index.mdx`. The slug becomes the URL:
`/work/<slug>`. That's it — the Work page, the home page (if `featured`), the
sitemap and the project page all pick it up automatically.

Frontmatter:

```yaml
---
title: "Project Name"
summary: "One sentence shown on cards and the page header."
category: "platform"     # platform | ai-lab | ux | internal-tooling | case-study
role: "Product Manager"  # optional
timeframe: "2024 — 2025" # optional
status: "Shipped"        # Shipped | Prototype | Exploration | Concept
featured: false          # true = appears in Selected Work on the home page (max 6 shown)
order: 3                 # sort order within its category (lower = earlier)
prototype:               # optional — omit entirely if there is nothing to open
  url: "https://..."
  label: "Open Prototype"
---
```

Body conventions:

- H2 (`##`) section headings. Standard projects use:
  Overview, Problem, Constraints, Thinking, Process, Design, Execution, Outcome, Learnings.
  AI Lab entries use: Problem, Idea, Mockup, Prototype.
- Where an image or mockup would go, use:
  `<Placeholder label="What the image will show" aspect="video" caption="Optional caption" />`
  (`aspect`: `video`, `wide`, or `square`). Replace with real images later by
  swapping the component for a standard markdown image.
- MDX gotchas: never write raw `{` `}` `<` `>` in prose; comments are
  `{/* like this */}` — HTML comments break the build.

## Add a category

Add an entry to `lib/categories.ts` (the one allowed code touch). Order in that
array = order of sections on /work.

## Add a blog post

Create `content/writing/<slug>.mdx` with frontmatter `title`, `summary`,
`date: "YYYY-MM-DD"`. Posts automatically replace the "Coming soon" block on
/thinking. When the first real post lands, add a `/thinking/[slug]` route
mirroring `app/work/[slug]/page.tsx` (10 minutes of work, documented on the
Thinking page code).

## Edit fixed pages

- `content/thinking.mdx` — the Thinking essay
- `content/now.mdx` — the Now page (update `lastUpdated` when you touch it)
- `lib/site.ts` — name, links, resume URLs, and all `{{PLACEHOLDER}}` values

## Placeholders still pending

Search the repo for `{{` to find every URL not yet real:
`{{LINKEDIN}}`, `{{GITHUB}}`, `{{EMAIL}}`, `{{X_PROFILE}}`, `{{INDIA_RESUME}}`,
`{{SEA_RESUME}}`, `{{BROKER_PLATFORM_URL}}`, `{{VERCEL_PROJECT_1..5}}`.
