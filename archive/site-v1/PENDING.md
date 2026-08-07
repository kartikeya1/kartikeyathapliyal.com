# PENDING.md - open items and how to complete them

This file is the backlog for kartikeyathapliyal.com, written so that a future AI
agent (or the site owner) can pick up any item, understand exactly what input is
needed, and know the precise code change to make once that input arrives.

## How to use this file

**If you are the AI agent:**
1. Read this whole file plus [`CLAUDE.md`](./CLAUDE.md) before making changes.
2. When Kartikeya provides an input (a PDF, a URL, a project write-up, a
   screenshot), find the matching item below by its **`id`**.
3. Follow the **"When Kartikeya provides X, do Y"** steps for that item exactly -
   they name the files and the edits.
4. Run `npm run build` to confirm nothing broke, then verify locally
   (`npm run dev`) if the change is visible.
5. **Push to `main` to ship** - auto-deploy is connected, so a push triggers a
   production build (~40s). Use `vercel --prod --yes` only to force a deploy
   without a commit.
6. Update this file: move the finished item to the "## Done" section at the
   bottom with a one-line note, or delete it if fully resolved.
7. Keep this file honest - if you discover a new gap, add it here in the same
   format.

**If you are Kartikeya:** hand the AI the input named in bold under any item
(e.g. "here are my resume PDFs", "use the Waypoint project for the template"),
and it has everything it needs to finish and ship.

**Format of each item:** `id`, what it is, current state, the exact input
needed from you, and the code steps to apply it.

_Last verified against the tree: 2026-07-29 · working tree clean, level with
`origin/main`. Auto-deploy from `main` is connected and verified, so pushing to
`main` ships._

## Phases - execute in this order

Sections below are grouped by **phase**, using the same ladder as every other
repo in Kartikeya's portfolio, so the numbering means the same thing everywhere.
Within a phase, items are independent.

| Phase | Meaning | Section below |
|---|---|---|
| **P0** stop the bleeding | irreversible / exposure risk | *nothing pending* - clean, in sync, auto-deploying, no leaks |
| **P1** safety net | tests + CI | "Phase 1 - no automated safety net" |
| **P2** truth in docs | stale claims, drift | "Phase 2 - docs that contradict the code" |
| **P3** polish | live placeholders, dead routes, SEO | "Phase 3 - unfinished content shipped live" |
| **P4** features | new capability | "Future / nice-to-have" (blog, now-page) |
| **P5** decision-gated | needs your input or a dashboard click | "Blocked on Kartikeya's input" + "Infrastructure" |

**Recommended order:** **P1 first now that auto-deploy is live** - every push
ships to production with nothing checking it. Then P2 (~30 minutes of doc fixes),
then P3's `from-ambiguity-to-launch` decision (it's a live indexed template), then
whichever P5 inputs you have to hand.

---

## Phase 1 - no automated safety net

### 11. No tests and no CI - `id: no-ci`

- **What:** There is no test runner (no Vitest/Jest/Playwright in
  `package.json`) and **no `.github/` directory at all** - so nothing runs on
  push. `npm run lint` is the only gate, and it's manual.
- **Why it matters more here than usual:** auto-deploy is now connected, so a
  push to `main` ships straight to production **with no check in front of it**.
  Nothing catches a broken build except remembering to run `npm run build` first
  - and Vercel's own build failing after the fact. CI is now the missing guard,
  not the missing deploy.
- **No input needed. Do this:**
  1. Add `.github/workflows/ci.yml` running `npm ci`, `npm run lint`,
     `npm run build` on push and PR to `main`.
  2. The highest-value tests are over `lib/content.ts` - frontmatter parsing,
     `getFeaturedProjects`, and category validation against `lib/categories.ts`
     (a bad `category` key currently only fails at build time).
  3. A link-check over the built output would catch the class of bug that
     commit `71c84c5` fixed by hand.

---

## Phase 2 - docs that contradict the code

These are all this repo's own docs disagreeing with the tree. Cheap to fix, and
worth doing: these files are the contract an agent works from.

### 12. README undercounts the site by 7 projects - `id: doc-project-count`

- **What:** `content/projects/` holds **16** projects. `README.md:21` says
  "All 9 projects" and `README.md:29` says "9 Project Case Studies". Commit
  `17921f8` ("Add 7 project cards") never updated the README. `README.md:51`
  and `:57` likewise say "22 routes", which is pre-drift.
- **Note:** `PENDING.md` and `CLAUDE.md` are correct - only the README drifted.
- **No input needed. Do this:** recount and update those four lines. Better:
  stop hand-writing the count - derive it, or drop the number and say
  "organised by capability".

### 13. The same backlog is duplicated four ways - `id: doc-backlog-duplication`

- **What:** open items are listed in this file, `README.md` §"Known Limitations
  & TODOs", `CLAUDE.md` §"Known open items", and `content/README.md` §"Still
  pending". Four copies of one list.
- **Evidence it doesn't hold up:** the 16-vs-9 drift above and the auto-deploy
  contradiction both come from exactly this duplication.
- **No input needed. Do this:** make **this file the single source**. Reduce the
  other three to a one-line pointer ("open items live in `PENDING.md`"). Keep
  `CLAUDE.md`'s pointer, drop its bulleted summary.

### 14. `/resume` and "Book Consultation" are described as more than they are - `id: doc-overclaim`

- **What:** `README.md` describes `/resume` as "Two download buttons (India
  version, SEA version)"; both currently resolve to mailto fallbacks because
  `lib/site.ts` has `resumes.india`/`resumes.sea` as `null` (see `resume-pdfs`).
  "Book Consultation" is described as an action button but points at `/contact`
  (see `booking-link`).
- **No input needed. Do this:** reword the README to describe the *current*
  fallback behaviour, and let `resume-pdfs` / `booking-link` update it when the
  real assets arrive. The code is fine - only the description overclaims.

### 15. Performance numbers are asserted, not measured - `id: doc-perf-claims`

- **What:** `README.md` §Performance Metrics asserts "Lighthouse 95+", "First
  Load JS 168 kB" and "TTI <1s". There is no committed measurement, budget
  check, or date, and the route count it sits beside is stale.
- **No input needed. Do this:** either run Lighthouse and record the numbers
  *with a date*, or soften the claims. Optionally add a bundle-size budget to
  the `no-ci` workflow so the JS figure stays honest by itself.

---

## Phase 3 - unfinished content shipped live

### 16. A template case study is live and indexed - `id: live-template-route`

- **What:** `/work/from-ambiguity-to-launch` is publicly reachable **and listed
  in `app/sitemap.ts`**, while still being an unfinished template with four
  `{/* TODO */}` holes. `featured: false` only hides it from the home grid - it
  does not unpublish it.
- **Why this is P3 and not just P5:** the *decision* about which real project to
  use is blocked on you (`template-case-study`), but **un-indexing it is not**.
  A hiring manager can currently find a page with placeholder specifics on it.
- **No input needed for the interim fix. Do this now:**
  1. Either add a `draft: true` frontmatter flag that `lib/content.ts` filters
     out of `/work`, the sitemap and routes, or temporarily move the folder out
     of `content/projects/`.
  2. Then resolve it properly via `template-case-study` when you pick a project.

### 17. Unfilled placeholders across live case studies - `id: content-placeholders`

- **What:** two distinct classes, both live:
  - **23 `<Placeholder>` mockup frames** across the 16 case studies - hatched
    frames where real imagery belongs. Heaviest: `broker-distribution-platform`
    (3), then `prototype-first`, `partner-onboarding-system`, `spec-copilot`,
    `waypoint` (2 each). Resolving these needs image files → see `mockup-images`.
  - **"add real metric" TODO comments** in the MDX bodies of
    `broker-distribution-platform` (real broker count, integration timeline,
    onboarding-time reduction), `partner-onboarding-system:60,63`,
    `waypoint:27,61`. These are invisible to readers (MDX comments) but mark
    sentences that read as vague because the number is missing.
- **Input needed:** the numbers, or a decision to keep those sentences
  qualitative. Per `CLAUDE.md`, never invent them.
- **Note:** this is the same underlying gap as `mockup-images` and
  `thin-case-studies`; kept here as the *inventory* so the scale is visible.

### 18. Site advertises a URL it doesn't serve - `id: seo-canonical-mismatch`

- **What:** `lib/site.ts` sets `url: "https://kartikeyathapliyal.com"`, and
  `app/sitemap.ts`, `robots`, the OG tags and the JSON-LD all read from it - but
  that domain is not attached (see `custom-domain`). The live site is
  `kartikeyathapliyalcom.vercel.app`.
- **Consequence:** every canonical URL, sitemap entry and OG link points at a
  hostname that doesn't resolve to this site. Crawlers and link unfurlers both
  get it wrong today.
- **Do this:** either complete `custom-domain` (preferred - it fixes this as a
  side effect), or temporarily set `site.url` to the working `.vercel.app` host
  so the metadata is at least truthful in the meantime.

### 19. Stray `.DS_Store` files - `id: dsstore`

- **What:** `.DS_Store` files exist in the repo root, `app/`, `components/` and
  `content/`. **They are not tracked by git** (verified) - so this is local
  noise, not a committed-file problem.
- **Do this:** add `.DS_Store` to `.gitignore` if absent, and delete the local
  ones. Low priority; listed so it isn't re-investigated as a leak.

### Verified non-issues (do not re-investigate)

- **Accessibility looks deliberate and no gap was found** - sections carry
  `aria-labelledby`, `<Placeholder>` carries `aria-label`, and
  `components/motion/reveal.tsx` respects `prefers-reduced-motion`. This is the
  only repo in the portfolio where a11y is in good shape.
- **No secrets or internal data** in the repo; the site is genuinely env-free,
  so the absence of `.env.example` is correct rather than a gap.

---

## Phase 5 - blocked on Kartikeya's input

_Each of these is a **question**, not a task. Hand over the bold input and the
steps below are mechanical._

### 1. Resume PDFs  - `id: resume-pdfs`

- **What:** The `/resume` page offers India and SEA resume downloads.
- **Current state:** `lib/site.ts` → `resumes.india` and `resumes.sea` are both
  `null`. The page (`app/resume/page.tsx`) detects this and shows a
  **"Request by email"** button (mailto) instead of a broken download. This is a
  safe, intentional fallback - not an error.
- **Input needed from Kartikeya:** the two resume **PDF files** (India + SEA).
  (Note: only a SEA resume in *markdown* exists today, at
  `~/Downloads/Kartikeya_Thapliyal_Resume_SEA.md`. A PDF must be produced.)
- **When Kartikeya provides the PDFs, do this:**
  1. Copy the files into `public/`, e.g. `public/resume-india.pdf` and
     `public/resume-sea.pdf`.
  2. In `lib/site.ts`, set:
     ```ts
     resumes: {
       india: "/resume-india.pdf",
       sea: "/resume-sea.pdf",
     },
     ```
  3. No other change needed - `app/resume/page.tsx` automatically switches each
     card from "Request by email" to a real "Download PDF" button when the value
     is non-null.
  4. `npm run build`, verify `/resume`, deploy.
- **If only one region's PDF is provided:** set just that one; the other card
  keeps the email fallback. That's fine.

### 2. "From Ambiguity to Launch" - real project or removal - `id: template-case-study`

- **What:** A case study at `content/projects/from-ambiguity-to-launch/index.mdx`.
- **Current state:** It is a **template**, not a real project - the body has
  `{/* TODO */}` comments where a real project name, team size, and metrics go.
  It is `featured: false` (removed from the home page) but still live at
  `/work/from-ambiguity-to-launch`.
- **Input needed from Kartikeya:** either
  (a) **which real project** to rewrite it around, plus its specifics (the
  one-sentence brief it started from, team/constraints, what shipped, any real
  outcomes), OR
  (b) a decision to **remove it** entirely.
- **When Kartikeya names a real project, do this:**
  1. Replace the `{/* TODO ... */}` comments in the MDX body with the real
     details, keeping the existing H2 structure (Overview, Problem, Constraints,
     Thinking, Process, Design, Execution, Outcome, Learnings).
  2. Never invent metrics - only use numbers Kartikeya gives. Where a number is
     genuinely unknown, leave the sentence qualitative.
  3. Update the `highlights:` block to match the real facts.
  4. Consider setting `featured: true` again (and check the home grid still
     shows a balanced 6 - see `lib/content.ts` `getFeaturedProjects`).
- **When Kartikeya says remove it, do this:**
  1. Delete the folder `content/projects/from-ambiguity-to-launch/`.
  2. Rebuild - the /work page, sitemap, and routes update automatically. No code
     change needed.

### 3. Booking link - `id: booking-link`

- **What:** The home hero has a **"Book Consultation"** button.
- **Current state:** `lib/site.ts` → `booking` is `null`; the button currently
  points to `/contact` (see `app/page.tsx`).
- **Input needed from Kartikeya:** a **booking URL** (e.g. a Cal.com / Calendly
  link), or a decision to leave it pointing at `/contact`.
- **When Kartikeya provides a URL, do this:**
  1. In `lib/site.ts`, set `booking: "https://cal.com/..."`.
  2. In `app/page.tsx`, change the "Book Consultation" button's `href` from
     `/contact` to `site.booking` (guard: fall back to `/contact` if `booking`
     is null so the button never breaks).
  3. `npm run build`, verify the home page, deploy.

### 4. Real mockup images - `id: mockup-images`

- **What:** Every case study currently uses `<Placeholder ... />` - a hatched
  frame with a label - where a real screenshot or diagram belongs.
- **Current state:** Placeholders render cleanly but are obviously not real
  imagery. This is the single biggest visual upgrade available.
- **Input needed from Kartikeya:** **image files** (screenshots, diagrams,
  mockups) for specific case studies. Ideally name which image goes with which
  `<Placeholder>` (each has a descriptive `label` to match against).
- **When Kartikeya provides images, do this:**
  1. Add the images under `public/` (e.g. `public/work/<slug>/<name>.png`).
  2. **Preferred:** add a small `<Figure>` MDX component
     (`components/mdx/`, registered in `components/mdx/mdx-components.tsx`) that
     renders an image with the same caption styling as `<Placeholder>`, so the
     look stays identical. Then replace the matching `<Placeholder ... />` with
     `<Figure src="/work/<slug>/<name>.png" alt="..." caption="..." />`.
  3. **Simpler alternative:** standard markdown image `![alt](/path.png)` - but
     `<Figure>` keeps captions and aspect handling consistent with the design.
  4. Do NOT restyle the page around the image; match existing spacing/borders.

### 5. Thin AI-Lab case studies - `id: thin-case-studies`

- **What:** Four case studies are noticeably shorter (~250-290 words) than the
  rest: `sign-bridge`, `deeplinks-generator`, `voyagr`, `devbox`.
- **Current state:** Complete and correct, just lighter. Not blocking.
- **Input needed from Kartikeya:** either **more detail** on any of these
  (what was hard, what a reader should take away), or approval to expand them
  using only what's already true (no invented specifics).
- **When actioned, do this:** extend the existing H2 sections in the relevant
  `content/projects/<slug>/index.mdx`, matching the quiet first-person voice
  described in `CLAUDE.md`. Never add invented metrics.

---

## Phase 5 - infrastructure (owner action in a dashboard; an agent cannot click through)

### 6. Custom domain not attached - `id: custom-domain`

- **What:** The site is only reachable at `kartikeyathapliyalcom.vercel.app`
  (the branch/project aliases sit behind Vercel SSO). The real
  `kartikeyathapliyal.com` domain is not pointed at it.
- **Fix (requires Kartikeya - DNS + dashboard):**
  1. Vercel dashboard → project → Settings → Domains → add
     `kartikeyathapliyal.com`.
  2. Update DNS at the registrar per Vercel's instructions.
  3. Then in code: `lib/site.ts` → `url: "https://kartikeyathapliyal.com"`
     (also update the OG/JSON-LD which read from `site.url`), rebuild, deploy.

### 7. Deployment protection / SSO on aliases - `id: infra-sso`

- **What:** The project and git-branch `.vercel.app` aliases return a 302 to a
  Vercel sign-in (deployment protection is on). Only `kartikeyathapliyalcom.vercel.app`
  is public. Hiring managers must be given that exact URL, or protection must be
  relaxed.
- **Fix (Kartikeya, dashboard):** Settings → Deployment Protection → decide
  whether production should be public (recommended for a portfolio) while keeping
  previews protected. No code change.

---

## Phase 4 - future / nice-to-have (new capability)

### 9. Blog - `id: blog`

- **What:** `content/writing/` exists but is empty (only its README); `/thinking`
  shows a "coming soon" state for posts (`app/thinking/page.tsx:94`).
- **The missing piece is a route, not just content:** `app/thinking/` contains
  only `page.tsx` - there is **no `/thinking/[slug]` route**, so a post cannot be
  read individually even once written. `app/thinking/page.tsx:68` renders the
  list with no links. Writing the route is the unblocked half of this item and
  can be done before any post exists.
- **When Kartikeya writes a post, do this:**
  1. Create `content/writing/<slug>.mdx` with frontmatter `title`, `summary`,
     `date: "YYYY-MM-DD"`. It appears on `/thinking` automatically.
  2. To make it individually readable, add a `/thinking/[slug]` route mirroring
     `app/work/[slug]/page.tsx` (~10 min). Documented in `content/README.md`.

### 10. Update the "Now" page - `id: now-page`

- **What:** `content/now.mdx` is a point-in-time snapshot with
  `lastUpdated: "July 2026"` and a `{/* TODO: update this page monthly */}` note.
- **When actioned:** edit the prose and bump `lastUpdated`. Pure content, no code.

---

## Done

_(Move completed items here with a date + one-line note, or delete them.)_

- **2026-07-29** - **GitHub → Vercel auto-deploy is connected and verified by
  Kartikeya.** Pushing to `main` now triggers a production build; `vercel --prod
  --yes` is only needed to force a deploy without a commit. `README.md` (three
  places) and this file updated to match; `CLAUDE.md` was already correct.
  Consequence: CI is now the missing guard - a push ships to production with
  nothing checking it first (see `no-ci`). - `id: infra-autodeploy`
- **2026-07-29** - Resolved the `CLAUDE.md`-vs-`README.md` auto-deploy
  contradiction by confirming auto-deploy works and correcting the README, which
  was the file that had it wrong. - `id: doc-autodeploy-contradiction`

- **2026-07-15** - Resolved all `{{VERCEL_PROJECT_*}}` / `{{BROKER_PLATFORM_URL}}`
  prototype placeholders (real URLs, or block removed where no public prototype
  exists). - `id: prototype-urls`
- **2026-07-15** - Added "At a glance" `highlights` to every case study for
  recruiter scannability. - `id: at-a-glance`
- **2026-07-15** - Replaced broken `{{INDIA_RESUME}}` / `{{SEA_RESUME}}` download
  links with the "Request by email" fallback (the PDFs themselves are still
  pending - see item `resume-pdfs`). - `id: resume-fallback`
- **2026-07-15** - Ran the previously-killed content critique/revise pass; tone
  fixes applied, template case study un-featured. - `id: content-critique`
