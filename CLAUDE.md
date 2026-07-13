# CLAUDE.md — how to work on this site

Personal site of Kartikeya Thapliyal (product manager). Next.js App Router,
fully static, dark-mode only, deployed on Vercel (auto-deploys on push to
`main`). This file is the contract for any AI agent working here.

## The one rule

**Content drives everything; code is a dumb renderer.** Routine updates
(new project, edited copy, changed link) touch only `content/` and `lib/site.ts`.
If you are editing a component to change words or URLs, stop — you are in the
wrong file.

## Where things live

| Change | File |
|---|---|
| Tagline, links, resume URLs, booking link, employment dates | `lib/site.ts` |
| Work-page category titles, order, intros | `lib/categories.ts` |
| Colors, fonts, radii (design tokens) | `app/globals.css` |
| A project's copy, frontmatter, highlights | `content/projects/<slug>/index.mdx` |
| Thinking essay / Now page | `content/thinking.mdx` / `content/now.mdx` |
| Blog posts (none yet) | `content/writing/<slug>.mdx` |
| Navigation | `navigation` array in `lib/site.ts` |

Full authoring guide with the frontmatter schema: `content/README.md`. Read it
before touching any `.mdx` file.

## Adding content

- **New project**: create `content/projects/<slug>/index.mdx`. It appears on
  /work, the sitemap, and (if `featured: true`) the home page automatically.
  Zero code changes.
- **New category**: add an entry to `lib/categories.ts` (array order = section
  order on /work).
- **New page**: create `app/<name>/page.tsx` (copy an existing simple page like
  `app/now/page.tsx`), add it to `navigation` in `lib/site.ts`, and add the
  route to `app/sitemap.ts`.
- **New MDX component**: build it in `components/mdx/`, register it in
  `components/mdx/mdx-components.tsx`, then use it in content. Never invent a
  component in MDX without registering it — the build fails.

## The "At a glance" feature (added July 2026)

Every project can carry `highlights:` in frontmatter — 3–4 scannable facts
rendered as an accent-dotted list under the Role/Timeframe/Status strip on
`/work/<slug>`. Purpose: hiring managers and recruiters get the substance
without reading 600 words of prose.

- Rendered by `app/work/[slug]/page.tsx`; parsed in `lib/content.ts`
  (`Project.highlights`).
- Rules: each bullet is a standalone fact already stated in the body. Never
  invent metrics or numbers for a highlight. Omit the key entirely rather than
  write filler.

## Design constraints (do not "improve")

- Dark only, single accent `#d9926c`, subtle borders, generous whitespace.
  All values are tokens in `app/globals.css` — change tokens, never inline hex.
- Do not redesign layouts, typography scale, or animation behavior. The owner
  has explicitly asked that the look stay as-is; new features must reuse the
  existing patterns (mono uppercase eyebrows, border-y meta strips, `bg-card`
  asides — see `app/work/[slug]/page.tsx` for the vocabulary).
- `components/motion/reveal.tsx` is the only animation primitive; it respects
  reduced motion. Reuse it, don't add new motion.

## MDX gotchas (these break the build)

- No raw `{` `}` `<` `>` in prose. Comments are `{/* like this */}` — HTML
  comments (`<!-- -->`) fail.
- Only `<Placeholder label aspect caption />` is available in MDX
  (`aspect`: `video` | `wide` | `square`).
- Headings in project bodies are H2 (`##`) only.
- Frontmatter `category` must be a key in `lib/categories.ts`:
  `platform | ai-lab | ux | internal-tooling | case-study`.

## Voice (for any copy you write)

Quiet, first-person, concrete, honest about limits. Past tense for smallcase
work (employment ended July 2026). No buzzwords, no exclamation marks, and
**never invent metrics** — where a real number is missing, leave a
`{/* TODO: add real metric */}` comment instead.

## Known open items

- **Resume PDFs**: `lib/site.ts` → `resumes.india` / `resumes.sea` are `null`.
  Drop real PDFs into `public/` and set the paths; the Resume page currently
  shows a "Request by email" fallback.
- **Booking link**: `site.booking` is `null`; wire a Cal.com-style URL when it
  exists (home page "Book Consultation" currently goes to /contact).
- **From Ambiguity to Launch** (`content/projects/from-ambiguity-to-launch/`)
  is a template case study — its `{/* TODO */}` comments mark where a real
  project's specifics belong before it can be considered finished.
- **Blog**: `content/writing/` is empty; first post needs a
  `/thinking/[slug]` route (mirror `app/work/[slug]/page.tsx`).

## Commands & verification

```bash
npm run dev     # local dev, http://localhost:3000
npm run build   # static production build — MUST pass before any push
npm run lint    # eslint
```

Before pushing: run `npm run build`, and spot-check `/`, `/work`, one project
page, and `/resume`. Push to `main` only when the owner has approved the local
work — Vercel deploys every push immediately.
