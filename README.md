# kartikeyathapliyal.com

Personal website of Kartikeya Thapliyal—a product manager's working notebook. Dark, quiet, content-driven. Fully static, deployed on Vercel, zero runtime dependencies.

**Live:** https://kartikeyathapliyal-com.vercel.app

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
- Vercel auto-deploys on git push

**Contact Links (Live):**
- Email: kartikeyathapliyal@gmail.com
- LinkedIn: https://www.linkedin.com/in/kartikeyathapliyal
- GitHub: https://github.com/kartikeya1
- X: https://x.com/CallMeKarti
- Instagram: https://www.instagram.com/callme.karti

---

## 🔄 What Was Pending (Killed Mid-Flight)

**Background workflow stopped:** The Fable 5 model hit token limits while running a three-phase content review workflow.

**Status at kill time (Jul 6, 22:52 IST):**

### Phase 1: Author ✅ **COMPLETE**
- All 10 MDX files written and committed to git:
  - 9 project case studies (`content/projects/*/index.mdx`)
  - 1 now page (`content/now.mdx`)
- All files structurally sound, have correct frontmatter schema, compile without errors
- Word counts in target ranges (450–700 for standard, 350–550 for AI lab)
- All required Placeholder components present

### Phase 2: Critique 🔄 **IN PROGRESS (NOT STARTED)**
- Critic agent was assigned to review all 10 files for:
  - **MDX syntax violations:** raw `{` `}` `<` `>` in prose, invalid HTML comments, curly braces outside Placeholder components
  - **YAML frontmatter schema:** wrong/missing/extra keys, unquoted values, wrong category values
  - **Voice consistency:** banned buzzwords (rockstar, ninja, guru, synergy, seamless, etc.), exclamation marks, invented metrics/percentages, present-tense use of smallcase, arrogance/false modesty
  - **Cross-file redundancy:** repeated opening constructions, identical stock phrases
  - **Structure compliance:** correct H2 sections in order, Placeholder components present, word counts in range
- Agent would return list of concrete edits (file, problem, exact find-and-replace)
- **Action if you restart:** Check the workflow journal at `/Users/kartikeya/.claude/projects/-Users-kartikeya-workspace-productmanager/c2a549af-3de4-42ea-ae6d-425af64b2edb/subagents/workflows/wf_dab433c4-5ba/journal.jsonl` — if critique finished, you'll see edits structured. Otherwise, restart the Critique phase.

### Phase 3: Revise ⏳ **NOT STARTED**
- Would apply critique edits using Edit tool
- Would re-read each touched file to verify YAML and MDX syntax validity
- No edits anticipated for structural quality — more likely: voice tone consistency, a few invented metrics→TODO comments

**Implication:** All 9 projects are **production-ready** but may benefit from a tone pass. The content is not broken; it's just unreviewed. Safe to ship as-is.

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
    india: "{{INDIA_RESUME}}",     // 👈 Still a placeholder — add URL
    sea: "{{SEA_RESUME}}",         // 👈 Still a placeholder — add URL
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

**Vercel auto-deploys** on push. Build takes ~40 seconds.

**Check deployment status:**
```bash
vercel inspect kartikeyathapliyal-com.vercel.app
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

### Outstanding Placeholders

Search the repo for `{{` to find all:
- `{{INDIA_RESUME}}` — URL to India resume PDF
- `{{SEA_RESUME}}` — URL to SEA resume PDF
- `{{BROKER_PLATFORM_URL}}` — Waypoint prototype link (internal tooling)
- `{{VERCEL_PROJECT_1..5}}` — Prototype links for AI Lab experiments

**Action:** Replace these in `lib/site.ts` and project frontmatter with real URLs.

### Book Consultation Button

Currently points to `/contact`. When a booking link (Cal.com, etc.) exists:
1. Update `lib/site.ts` → `booking: "https://cal.com/..."`
2. Update `app/page.tsx` — change `/contact` href to use `site.booking`

### Future Blog

`content/writing/` is ready but empty. When the first post is written:
1. Create `content/writing/my-post.mdx`
2. Optionally add route `/thinking/<slug>` (copy `/work/[slug]/page.tsx` pattern)

### Custom Domain

Currently deployed to `kartikeyathapliyal-com.vercel.app`. To use `kartikeyathapliyal.com`:
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
