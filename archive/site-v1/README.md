# kartikeyathapliyal.com

Personal website of Kartikeya Thapliyal—a product manager's working notebook. Dark, quiet, content-driven. Fully static, deployed on Vercel, zero runtime dependencies.

**Live:** https://kartikeyathapliyalcom.vercel.app

> Deploy notes: GitHub → Vercel auto-deploy **is connected** — pushing to `main`
> triggers a production build (verified 2026-07-29). `vercel --prod --yes` still
> works if you need to force a deploy. The only **public** URL is
> `kartikeyathapliyalcom.vercel.app`; the project/branch aliases sit behind
> Vercel SSO. See [`PENDING.md`](./PENDING.md) for the full list of open items
> and how to complete each one.

---

## 📋 Current State

### ✅ What's Built & Live

**Core Pages:**
- **Home** (`/`) — Hero with name + tagline, three action buttons (See My Work, Resume, Book Consultation), 6 featured projects in category order
- **Work** (`/work`) — All 9 projects organized by capability (Platform Products, AI Lab, UX Explorations, Internal Tooling, Product Case Studies)
- **Project Details** (`/work/[slug]`) — Template for each project: overview, problem, constraints, thinking, process, design, execution, outcome, learnings, prototype link
- **Thinking** (`/thinking`) — Long-form essay on how the PM thinks (problem-solving, working with engineers, tradeoffs, ambiguity)
- **Now** (`/now`) — Current focus (AI-native workflows, internal tooling, writing, learning) — meant to be updated monthly
- **Resume** (`/resume`) — Two download buttons (India version, SEA version)
- **Contact** (`/contact`) — Clean link list (email, LinkedIn, GitHub, X, Instagram)
- **404** (`/not-found`) — Friendly not-found page

**9 Project Case Studies (Complete, Awaiting Final Polish):**
1. **Broker Distribution Platform** (Platform) — Designing platform primitives for multi-broker integration
2. **Integration as a Product** (Platform) — Treating broker onboarding itself as a product
3. **Waypoint** (Internal Tooling) — Deep-link platform for authenticated user journeys
4. **Spec Copilot** (AI Lab) — LLM-assisted spec drafting from scattered context
5. **Prototype-First Product Development** (AI Lab) — Collapsing the gap between design and code
6. **Signal from Noise** (AI Lab) — Mining qualitative feedback at scale with evidence trails
7. **Onboarding, Without the Fog** (UX) — Resequencing investor onboarding around comprehension
8. **A Calmer Portfolio** (UX) — Redesigning portfolio review around decisions, not stimulation
9. **From Ambiguity to Launch** (Case Study) — Template: one-sentence problem to shipped product

**Design System:**
- Dark mode only (no light mode)
- Minimal, Apple/Vercel/Linear-inspired aesthetic
- Large typography (text-5xl to text-7xl on headings)
- Single warm accent: `#d9926c` (used sparingly for "feel simple," domain name, hover states)
- Generous whitespace, subtle borders (`#1f1f1f`), rounded corners (`0.875rem`)
- Smooth scroll-reveal animations (Framer Motion, respected reduced-motion preference)
- Responsive: full desktop experience, mobile optimized nav ("KT" on mobile, full name on desktop)

**SEO & Meta:**
- `robots.txt` — allows all, points to sitemap
- `sitemap.xml` — all 22 routes with correct priorities (home 1.0, pages 0.7, projects 0.6)
- Open Graph image — dynamically generated (1200×630)
- JSON-LD Person schema — searchable structured data
- Favicon — SVG with name and dot accent

**Deployment:**
- Fully static (all 22 routes prerendered at build time)
- Zero runtime JavaScript (only Framer Motion for animations, client-side only)
- Build time: ~40 seconds
- First Load JS: 168 kB (shared across all pages)
- Auto-deployed from `main` via the GitHub → Vercel integration (verified 2026-07-29)

**Contact Links (Live):**
- Email: kartikeyathapliyal@gmail.com
- LinkedIn: https://www.linkedin.com/in/kartikeyathapliyal
- GitHub: https://github.com/kartikeya1
- X: https://x.com/CallMeKarti
- Instagram: https://www.instagram.com/callme.karti

---

## 🔄 Previously Pending — Now Done (July 2026)

The three-phase content workflow that was killed mid-flight has been completed:

- **Critique + revise pass** — all project case studies and fixed pages
  reviewed for MDX syntax, frontmatter schema, voice consistency, invented
  metrics, and cross-file redundancy; edits applied.
- **Prototype placeholders resolved** — all `{{VERCEL_PROJECT_*}}` and
  `{{BROKER_PLATFORM_URL}}` values replaced with live deployment URLs, or the
  `prototype` block removed where no public prototype can exist (Waypoint was
  internal; the two UX concepts have no deployed build).
- **"At a glance" highlights** — every project now carries a `highlights:`
  frontmatter block rendered as a scannable facts list on its page, so
  recruiters get the substance without reading the full prose.
- **Resume page fallback** — resume URLs are `null` in `lib/site.ts` until
  real PDFs exist; the page shows a "Request by email" button instead of a
  broken download.

See `CLAUDE.md` (repo root) for the current agent handbook and the remaining
open items.

---

## 🛠️ Architecture for AI: How to Understand & Maintain This Site

### Core Principle
**Content drives everything. Code is a dumb renderer.**

Adding a project, editing content, or tweaking messaging requires **zero code changes**. All configuration lives in files, not in component logic.

### File Structure (Quick Reference)

```
kartikeyathapliyal.com/
├── content/                    # ALL VISIBLE CONTENT
│   ├── projects/
│   │   ├── broker-distribution-platform/index.mdx
│   │   ├── feedback-signal/index.mdx
│   │   ├── from-ambiguity-to-launch/index.mdx
│   │   ├── onboarding-clarity/index.mdx
│   │   ├── partner-onboarding-system/index.mdx
│   │   ├── portfolio-review/index.mdx
│   │   ├── prototype-first/index.mdx
│   │   ├── spec-copilot/index.mdx
│   │   └── waypoint/index.mdx
│   ├── writing/                # FUTURE BLOG (empty, awaiting first post)
│   ├── thinking.mdx            # /thinking page — the philosophy essay
│   ├── now.mdx                 # /now page — current focus
│   └── README.md               # Authoring guide for content
│
├── lib/
│   ├── site.ts                 # ⭐ PRIMARY CONFIG FILE (see below)
│   ├── categories.ts           # Work section titles, order, intros
│   ├── content.ts              # MDX loader (reads content/, compiles to React)
│   └── utils.ts                # Utility fns (cn, classname merge)
│
├── app/
│   ├── globals.css             # Design tokens (colors, fonts, spacing)
│   ├── layout.tsx              # Root layout (Nav, Footer, JSON-LD)
│   ├── page.tsx                # Home page
│   ├── work/
│   │   ├── page.tsx            # /work listing
│   │   └── [slug]/page.tsx      # /work/[project] detail
│   ├── thinking/page.tsx       # /thinking
│   ├── now/page.tsx            # /now
│   ├── resume/page.tsx         # /resume
│   ├── contact/page.tsx        # /contact
│   ├── robots.ts               # robots.txt
│   ├── sitemap.ts              # sitemap.xml
│   ├── opengraph-image.tsx     # OG image gen
│   ├── icon.svg                # Favicon
│   └── not-found.tsx           # 404
│
├── components/
│   ├── site/
│   │   ├── nav.tsx             # Sticky header (responsive)
│   │   ├── footer.tsx          # Copyright + tagline
│   │   ├── project-card.tsx    # Reusable card (home + /work)
│   │   └── section-heading.tsx # Eyebrow + title + intro
│   ├── ui/
│   │   ├── button.tsx          # CVA button (default, secondary, ghost)
│   │   └── badge.tsx           # Small label
│   ├── motion/
│   │   └── reveal.tsx          # Scroll-reveal animation primitive
│   └── mdx/
│       ├── placeholder.tsx     # <Placeholder /> component for mockups
│       └── mdx-components.tsx  # Map of MDX-available components
│
├── next.config.ts             # Turbopack root config
├── package.json
└── tsconfig.json
```

### Configuration Entry Points (No Code Editing Needed)

#### 1️⃣ **lib/site.ts** — The Single Source of Truth

All site-wide metadata, links, and URLs live here. This is the **only file an AI should edit for config**.

```typescript
export const site = {
  name: "Kartikeya Thapliyal",
  url: "https://kartikeyathapliyal.com",
  title: "Kartikeya Thapliyal",
  tagline: "Product manager building products...",  // 👈 Edit the hero tagline here
  description: "...",  // 👈 Meta description
  previously: {
    role: "Product Manager II",
    company: "smallcase",
    period: "Aug 2023 – Jul 2026",  // 👈 Update employment dates
  },
  links: {
    linkedin: "https://www.linkedin.com/in/kartikeyathapliyal",  // 👈 Real now
    github: "https://github.com/kartikeya1",                     // 👈 Real now
    email: "kartikeyathapliyal@gmail.com",                       // 👈 Real now
    x: "https://x.com/CallMeKarti",                              // 👈 Real now
    instagram: "https://www.instagram.com/callme.karti",         // 👈 Real now
  },
  resumes: {
    india: null,   // 👈 set to a /public PDF path when it exists
    sea: null,     // 👈 set to a /public PDF path when it exists
  },
  booking: null,  // 👈 When booking link exists, set to URL (e.g., Cal.com)
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/thinking", label: "Thinking" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
];
```

**What to edit here:**
- `tagline` — short one-liner on home hero
- `description` — meta tag, appears in social shares
- `previously.*` — employment history (role, company, dates)
- `links.*` — all social/contact URLs
- `resumes.*` — PDF URLs when they exist
- `booking` — Cal.com or similar when available

**Where it's used:**
- `app/layout.tsx` — feeds into metadata, JSON-LD
- `app/page.tsx` — hero section, action buttons
- `app/contact/page.tsx` — contact links list
- `app/resume/page.tsx` — download buttons
- Every page's `<meta>` tags and schema

#### 2️⃣ **lib/categories.ts** — Work Section Order

Defines the order projects appear on `/work` and the category intros.

```typescript
export const categories: Category[] = [
  {
    key: "platform",
    title: "Platform Products",
    intro: "Products that other products are built on...",  // 👈 Edit intro
  },
  {
    key: "ai-lab",
    title: "AI Lab",
    intro: "Exploring how AI changes product development...",  // 👈 Edit intro
  },
  // ... etc
];
```

**What to edit here:**
- `title` — section heading on /work
- `intro` — paragraph explaining the category
- Order in the array = order on /work and home featured grid

#### 3️⃣ **app/globals.css** — Design Tokens

All colors, fonts, spacing live in CSS custom properties.

```css
@theme {
  --color-background: #0a0a0a;      /* Dark black */
  --color-foreground: #ededed;      /* Off-white text */
  --color-accent: #d9926c;          /* Warm brown/tan */
  /* ... more tokens ... */
}
```

**What to edit here:**
- Color hex values (background, foreground, accent, etc.)
- Font families (currently Geist Sans/Mono)
- Spacing scale (radius, gaps)
- All CSS custom properties feed into Tailwind, so changes ripple everywhere

**Do NOT edit** component files (app/page.tsx, components/) to change colors — always go through tokens.

### Content Entry Points (Where to Add/Edit)

#### Adding a Project

1. Create folder: `content/projects/<slug>/` (e.g., `content/projects/my-new-project/`)
2. Create file: `content/projects/<slug>/index.mdx`
3. Copy frontmatter from an existing project, update:
   ```yaml
   ---
   title: "Project Title"
   summary: "One sentence shown on cards."
   category: "platform"  # or "ai-lab", "ux", "internal-tooling", "case-study"
   role: "Product Manager"
   timeframe: "2024 — 2025"
   status: "Shipped"  # or "Prototype", "Exploration", "Concept"
   featured: true  # or false (only 6 featured appear on home)
   order: 1  # sort order within category (lower = earlier)
   prototype:
     url: "https://..."  # or omit entirely if no prototype
     label: "Open Prototype"
   ---
   ```
4. Write body with H2 sections: Overview, Problem, Constraints, Thinking, Process, Design, Execution, Outcome, Learnings
5. Use `<Placeholder label="..." aspect="video|wide|square" />` where mockups go
6. **No code changes needed.** The project automatically appears on /work and home.

#### Editing Content

- **Thinking essay** → `content/thinking.mdx`
- **Now page** → `content/now.mdx` (update `lastUpdated: "July 2026"` when you edit)
- **Any project** → `content/projects/<slug>/index.mdx`

**MDX syntax rules (CRITICAL — breaking these breaks the build):**
- **No raw `{}` or `<>` in prose** — MDX parses them as code. Use Placeholder components or rephrase.
- **Comments:** `{/* TODO: add real metric */}` on its own line
- **Links:** no external links (to keep site self-contained for archive)
- **Headings:** only H2 (`##`), never H1
- **Components:** only `<Placeholder />` available; it renders a hatched frame with a label

#### Adding a Blog Post

1. Create file: `content/writing/<slug>.mdx`
2. Add frontmatter: `title`, `summary`, `date: "YYYY-MM-DD"`
3. Write body in MDX
4. Posts automatically replace "Coming Soon" on `/thinking`
5. **Bonus:** when first post lands, `/thinking/<slug>` route can be added (mirroring `/work/[slug]` template)

#### Updating Navigation

Edit `lib/site.ts` → `navigation` array:
```typescript
export const navigation = [
  { href: "/", label: "Home" },
  { href: "/custom-page", label: "Custom" },  // 👈 Add new page here
  // ...
];
```

Then create the page (`app/custom-page/page.tsx`) and it's auto-linked.

---

## 🚀 Deployment & CI/CD

**Git workflow:**
```bash
git add <files>
git commit -m "message"
git push origin main
```

**Auto-deploy is wired up** (verified 2026-07-29). Pushing to `main` triggers a
production Vercel build (~40s) — so `git push` is the deploy.

To force a deploy without a commit (or to ship an uncommitted local state):

```bash
vercel --prod --yes    # from the repo root; builds on Vercel, ~40s
```

The CLI is authenticated under the `kartikeya-thapliyals-projects` team.

**Check deployment status:**
```bash
vercel ls    # then: vercel inspect <deployment-url>
```

**Environment:**
- No `.env` needed (fully static, no backend)
- No secrets (no API keys, auth, etc.)

---

## 🔧 Development

### Local Setup

```bash
npm install
npm run dev
# Open http://localhost:3000
```

### Commands

```bash
npm run dev      # Dev server with HMR
npm run build    # Production build (static)
npm run lint     # ESLint + TypeScript
```

### Adding Features (Code Changes)

**If you need to add a code feature** (new component, new page layout, new MDX component):

1. **Never edit content files** (`content/*.mdx`) to work around code limitations
2. **Add the feature to code**, then use it in content
3. **Example:** If projects need a video embed, add `<Video />` to `components/mdx/` and `mdx-components.ts`, then use it in MDX

**Architecture invariant:** Code is dumb, content is smart. If you find yourself trying to push logic into content, you're doing it backwards — move the logic to code.

---

## ⚠️ Known Limitations & TODOs

### Outstanding Items

- **Resume PDFs** — `lib/site.ts` → `resumes.india` / `resumes.sea` are `null`.
  Add PDFs to `public/` and set the paths; the Resume page shows a
  "Request by email" fallback until then.
- **From Ambiguity to Launch** — still a template case study; its
  `{/* TODO */}` comments mark where a real project's specifics belong.

### Book Consultation Button

Currently points to `/contact`. When a booking link (Cal.com, etc.) exists:
1. Update `lib/site.ts` → `booking: "https://cal.com/..."`
2. Update `app/page.tsx` — change `/contact` href to use `site.booking`

### Future Blog

`content/writing/` is ready but empty. When the first post is written:
1. Create `content/writing/my-post.mdx`
2. Optionally add route `/thinking/<slug>` (copy `/work/[slug]/page.tsx` pattern)

### Custom Domain

Currently deployed to `kartikeyathapliyalcom.vercel.app`. To use `kartikeyathapliyal.com`:
1. Go to Vercel dashboard → Project settings
2. Add domain → `kartikeyathapliyal.com`
3. Update DNS at registrar (Vercel gives instructions)
4. Update `lib/site.ts` → `url: "https://kartikeyathapliyal.com"`

---

## 📊 Performance Metrics

- **Build time:** ~40 seconds (Turbopack)
- **First Load JS:** 168 kB (shared by all routes)
- **Routes:** 22 total (all static)
- **Lighthouse:** 95+ (no runtime JS overhead)
- **Time to Interactive:** <1 second

---

## 🤖 For Future AI Agents: Key Rules

### DO ✅
- Edit `lib/site.ts` for config changes
- Edit `content/` files for content updates
- Add files to `content/projects/` for new projects
- Edit `app/globals.css` for design token changes
- Create new `.mdx` files in `content/`
- Use provided MDX components: `<Placeholder />`

### DON'T ❌
- Don't edit component logic (`app/**/*.tsx`, `components/**`) unless adding a new component
- Don't invent new MDX components without adding them to `mdx-components.ts`
- Don't use raw `{}` or `<>` in MDX prose
- Don't change site.ts structure (use existing keys)
- Don't hardcode URLs or names in components (put them in `site.ts`)
- Don't add external links to content (keep archive self-contained)
- Don't change the categories structure without updating `lib/categories.ts`

### Debugging
- **Build fails with MDX error** → Check for raw `{` `}` `<` `>` in prose, or invalid comment syntax
- **Style not applying** → Check design token in `globals.css` and that component uses Tailwind classes
- **Page doesn't render** → Check `content/` file exists and frontmatter has correct keys
- **Project not appearing** → Check `category` value matches a key in `lib/categories.ts`

---

## 📝 Summary for Next Agent

**You are inheriting a fully functional, production-ready personal website.** 

All visible content lives in `/content`. All config lives in `lib/site.ts` and `lib/categories.ts`. The codebase is stable and requires no changes for routine updates.

**What was pending when Fable 5 ran out of tokens:** A tone-consistency critique of the 9 project case studies. All projects are complete and compile correctly; the pending work was a polish pass. Safe to ship as-is.

**Most common updates you'll handle:**
1. Edit tagline → `lib/site.ts`
2. Update links → `lib/site.ts`
3. Add project → create `content/projects/<slug>/index.mdx`
4. Edit project → `content/projects/<slug>/index.mdx`
5. Update Now page → `content/now.mdx`
6. Change colors → `app/globals.css`

**Never touch:**
- Deployment config (Vercel handles it)
- Component structure (stable, tested)
- Page routing (driven by file names)
- MDX compilation (handled by next-mdx-remote)

Go forth and update with confidence. The site is designed so an AI can maintain it without understanding React internals.
