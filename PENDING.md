# PENDING.md — open items and how to complete them

This file is the backlog for kartikeyathapliyal.com, written so that a future AI
agent (or the site owner) can pick up any item, understand exactly what input is
needed, and know the precise code change to make once that input arrives.

## How to use this file

**If you are the AI agent:**
1. Read this whole file plus [`CLAUDE.md`](./CLAUDE.md) before making changes.
2. When Kartikeya provides an input (a PDF, a URL, a project write-up, a
   screenshot), find the matching item below by its **`id`**.
3. Follow the **"When Kartikeya provides X, do Y"** steps for that item exactly —
   they name the files and the edits.
4. Run `npm run build` to confirm nothing broke, then verify locally
   (`npm run dev`) if the change is visible.
5. **Deploy manually** — `vercel --prod --yes` (git push does NOT auto-deploy;
   see item `infra-autodeploy`).
6. Update this file: move the finished item to the "## Done" section at the
   bottom with a one-line note, or delete it if fully resolved.
7. Keep this file honest — if you discover a new gap, add it here in the same
   format.

**If you are Kartikeya:** hand the AI the input named in bold under any item
(e.g. "here are my resume PDFs", "use the Waypoint project for the template"),
and it has everything it needs to finish and ship.

**Format of each item:** `id`, what it is, current state, the exact input
needed from you, and the code steps to apply it.

---

## Blocked on Kartikeya's input

### 1. Resume PDFs  — `id: resume-pdfs`

- **What:** The `/resume` page offers India and SEA resume downloads.
- **Current state:** `lib/site.ts` → `resumes.india` and `resumes.sea` are both
  `null`. The page (`app/resume/page.tsx`) detects this and shows a
  **"Request by email"** button (mailto) instead of a broken download. This is a
  safe, intentional fallback — not an error.
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
  3. No other change needed — `app/resume/page.tsx` automatically switches each
     card from "Request by email" to a real "Download PDF" button when the value
     is non-null.
  4. `npm run build`, verify `/resume`, deploy.
- **If only one region's PDF is provided:** set just that one; the other card
  keeps the email fallback. That's fine.

### 2. "From Ambiguity to Launch" — real project or removal — `id: template-case-study`

- **What:** A case study at `content/projects/from-ambiguity-to-launch/index.mdx`.
- **Current state:** It is a **template**, not a real project — the body has
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
  2. Never invent metrics — only use numbers Kartikeya gives. Where a number is
     genuinely unknown, leave the sentence qualitative.
  3. Update the `highlights:` block to match the real facts.
  4. Consider setting `featured: true` again (and check the home grid still
     shows a balanced 6 — see `lib/content.ts` `getFeaturedProjects`).
- **When Kartikeya says remove it, do this:**
  1. Delete the folder `content/projects/from-ambiguity-to-launch/`.
  2. Rebuild — the /work page, sitemap, and routes update automatically. No code
     change needed.

### 3. Booking link — `id: booking-link`

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

### 4. Real mockup images — `id: mockup-images`

- **What:** Every case study currently uses `<Placeholder ... />` — a hatched
  frame with a label — where a real screenshot or diagram belongs.
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
  3. **Simpler alternative:** standard markdown image `![alt](/path.png)` — but
     `<Figure>` keeps captions and aspect handling consistent with the design.
  4. Do NOT restyle the page around the image; match existing spacing/borders.

### 5. Thin AI-Lab case studies — `id: thin-case-studies`

- **What:** Four case studies are noticeably shorter (~250–290 words) than the
  rest: `sign-bridge`, `deeplinks-generator`, `voyagr`, `devbox`.
- **Current state:** Complete and correct, just lighter. Not blocking.
- **Input needed from Kartikeya:** either **more detail** on any of these
  (what was hard, what a reader should take away), or approval to expand them
  using only what's already true (no invented specifics).
- **When actioned, do this:** extend the existing H2 sections in the relevant
  `content/projects/<slug>/index.mdx`, matching the quiet first-person voice
  described in `CLAUDE.md`. Never add invented metrics.

---

## Infrastructure (owner action or CLI, not blocked on content)

### 6. GitHub → Vercel auto-deploy is not connected — `id: infra-autodeploy`

- **What:** Pushing to `main` should trigger a Vercel build. It does not.
- **Evidence:** After a push to `main`, the newest Vercel deployment stayed days
  old; the live update only happened after a manual `vercel --prod`.
- **Current workaround:** deploy manually with `vercel --prod --yes` from the
  repo root (CLI authed under team `kartikeya-thapliyals-projects`).
- **Fix (requires Kartikeya in the Vercel dashboard — AI cannot click through):**
  1. Vercel dashboard → project `kartikeyathapliyal.com` → Settings → Git.
  2. Connect / reconnect the GitHub repo `kartikeya1/kartikeyathapliyal.com`,
     production branch `main`.
  3. Confirm by pushing a trivial commit and watching a new deployment appear.
  4. Once confirmed, update `README.md` and `CLAUDE.md` to say auto-deploy works,
     and mark this item Done.

### 7. Custom domain not attached — `id: custom-domain`

- **What:** The site is only reachable at `kartikeyathapliyalcom.vercel.app`
  (the branch/project aliases sit behind Vercel SSO). The real
  `kartikeyathapliyal.com` domain is not pointed at it.
- **Fix (requires Kartikeya — DNS + dashboard):**
  1. Vercel dashboard → project → Settings → Domains → add
     `kartikeyathapliyal.com`.
  2. Update DNS at the registrar per Vercel's instructions.
  3. Then in code: `lib/site.ts` → `url: "https://kartikeyathapliyal.com"`
     (also update the OG/JSON-LD which read from `site.url`), rebuild, deploy.

### 8. Deployment protection / SSO on aliases — `id: infra-sso`

- **What:** The project and git-branch `.vercel.app` aliases return a 302 to a
  Vercel sign-in (deployment protection is on). Only `kartikeyathapliyalcom.vercel.app`
  is public. Hiring managers must be given that exact URL, or protection must be
  relaxed.
- **Fix (Kartikeya, dashboard):** Settings → Deployment Protection → decide
  whether production should be public (recommended for a portfolio) while keeping
  previews protected. No code change.

---

## Future / nice-to-have

### 9. Blog — `id: blog`

- **What:** `content/writing/` exists but is empty; `/thinking` shows a
  "coming soon" state for posts.
- **When Kartikeya writes a post, do this:**
  1. Create `content/writing/<slug>.mdx` with frontmatter `title`, `summary`,
     `date: "YYYY-MM-DD"`. It appears on `/thinking` automatically.
  2. To make it individually readable, add a `/thinking/[slug]` route mirroring
     `app/work/[slug]/page.tsx` (~10 min). Documented in `content/README.md`.

### 10. Update the "Now" page — `id: now-page`

- **What:** `content/now.mdx` is a point-in-time snapshot with
  `lastUpdated: "July 2026"` and a `{/* TODO: update this page monthly */}` note.
- **When actioned:** edit the prose and bump `lastUpdated`. Pure content, no code.

---

## Done

_(Move completed items here with a date + one-line note, or delete them.)_

- **2026-07-15** — Resolved all `{{VERCEL_PROJECT_*}}` / `{{BROKER_PLATFORM_URL}}`
  prototype placeholders (real URLs, or block removed where no public prototype
  exists). — `id: prototype-urls`
- **2026-07-15** — Added "At a glance" `highlights` to every case study for
  recruiter scannability. — `id: at-a-glance`
- **2026-07-15** — Replaced broken `{{INDIA_RESUME}}` / `{{SEA_RESUME}}` download
  links with the "Request by email" fallback (the PDFs themselves are still
  pending — see item `resume-pdfs`). — `id: resume-fallback`
- **2026-07-15** — Ran the previously-killed content critique/revise pass; tone
  fixes applied, template case study un-featured. — `id: content-critique`
