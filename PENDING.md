# Pending items

Open work and parked scope. Nothing here blocks a production deploy any
more — the launch blockers are closed. Items are grouped by whether they
need Kartikeya's input or are simply queued.

---

## Queued work — no input needed

### Improvements programme, remaining phases

| Phase | Scope | Model · effort |
|---|---|---|
| **I7** | Docs pass, dashboard-only checklist | Sonnet 5 · low |

I2 (header/footer/CTA), I3 (individuals pricing), I4 (brand assets), I5
(homepage) and I6 (currency) are **done**. **I1 is done** — see below.

**I1 shipped**: `app/contact/` deleted; the Cal.com and Google Form embeds
moved to a `#book` section at the bottom of `/services` (highest-intent
place on the site — someone who scrolled the whole pricing grid); a `308`
redirect `/contact → /services#book` added in `next.config.ts` (verified
this does not create a serverless function — it compiles into
`routes-manifest.json`, not `middleware-manifest.json`, and the build
already carried an unrelated redirect there before this one existed);
`sitemap.ts` and `check-static.mjs`'s `EXPECTED_ROUTES` updated together in
one commit, since either alone hard-fails the build.

**I6 shipped** using the following, which is recorded because it would
otherwise be re-derived: **Yahoo and Google Finance cannot be used** — both are
CORS-blocked from a browser (Yahoo also returns 429). Verified working
alternatives, both free and CORS-enabled: `open.er-api.com/v6/latest/USD`
(primary — it returns `time_last_update_utc`, which supplies the
"last refreshed" display directly) and the jsdelivr `@fawazahmed0/currency-api`
(fallback). Both update **daily**, not intraday — the UI should say "as of"
rather than imply a live feed. Geo detection uses
`Intl.DateTimeFormat().resolvedOptions().timeZone`; Vercel's geo headers
would need middleware, which creates a serverless function and fails
`check-static.mjs`.

### Services page revamp

Kartikeya wants a substantial rework but hasn't briefed it yet. Recorded so
it isn't lost. **Needs a brief before it can be scoped.**

### Product-consultant research

Study how established product consultants position themselves, structure
offers, and price. Research task, not a build task. Low priority.

---

## Parked — deliberately not being picked up

### Back-office tools → separate project

Invoice generator, pricing control panel, lead-generation tooling, LinkedIn
cold-outreach templates. **Decided: these will not live in this repo.**
Kartikeya will build a separate project for them. **Delete this section once
that project exists.**

The analysis, kept for when it's picked up:

| Tool | Backend needed? | Why |
|---|---|---|
| Invoice generator | **No** | Form → rendered invoice → browser print-to-PDF is fully client-side. Data never leaves the browser. |
| Pricing control panel | **Yes, for live edits** | Changing what *other visitors* see requires server-side persistence. The no-backend pattern is: the tool emits updated `lib/packages.ts` content, you commit, Vercel redeploys. One deploy per change — acceptable, since prices move rarely. |
| Lead generation / LinkedIn outreach | **Mostly yes** | Scraping LinkedIn is CORS-blocked from a browser and violates their ToS. Workable client-side: template generators, a `localStorage` tracker, CSV import/export. Automated lead *discovery* needs a backend and usually a paid data source. |

Why it can't live here: with no backend there is no real authentication. A
client-side password ships in the JS bundle and is readable by anyone; a
"secret route" is obscurity, not security. Vercel's Password Protection is
Pro-plan only, and this account cannot enable SSO on production.

### Testimonials

`whoami` holds ~15 name-attributed, public-safe pull quotes, but **none are
cleared for public use** and no referee outreach has happened. This blocks
the strongest version of the homepage (I5) — social proof is the single
biggest missing element on the site.

---

## Needs Kartikeya's input

### 1. Package renames — awaiting approval

Phase 2 sharpened 8 of the 12 business package names toward buyer outcomes.
**Prices were not touched** — verified unchanged before and after.

| id | Original | Current |
|---|---|---|
| `intro-call` | Intro consultation call | Sanity-check a product decision |
| `deep-dive-diagnostic` | Deep-dive diagnostic | Diagnose a broken product flow |
| `strategy-sprint` | Product strategy / roadmap sprint | Reset a reactive roadmap |
| `integration-readiness-sprint` | Fintech integration / API readiness sprint | Integration readiness audit |
| `reliability-sprint` | Reliability / critical-journey sprint | Reliability and error-reduction program |
| `pm-coaching` | PM coaching / team enablement | PM coaching and team enablement |
| `half-day-workshop` | Half-day workshop / offsite | Half-day product workshop |
| `full-day-workshop` | Full-day workshop / offsite | Full-day strategy offsite |

Unchanged: `founder-advisory-retainer`, `fractional-product-lead`.

**To resolve:** review `/services` and either approve, or name the specific
ones to revert.

### 2. Custom domain

`siteConfig.url` points at `https://kartikeyathapliyalcom.vercel.app`.
Attach `kartikeyathapliyal.com` in Vercel, then one config value changes and
sitemap, robots, OG tags and JSON-LD all follow. Until then, link previews
and search results show the `.vercel.app` host.

### 3. Cal.com event for the individuals track

`/for-individuals` currently books the same 30-minute event as the business
track. If coaching should use its own event type, that's a new
`siteConfig.booking` value only Kartikeya can create.

### 4. FX refresh cadence (for I6)

Stated requirement was "fetch every time the user opens the website". The
sources only update **daily**, so per-visit fetching adds latency for no
fresher data. Recommend caching in `localStorage` with a TTL. Confirm before
I6 is built.

### 5. GitHub repo social preview — dashboard only

`.github/social-preview.png` exists at the right dimensions, but **GitHub
does not read that path**. It must be uploaded manually:
Settings → General → Social preview.

Note: the **Vercel dashboard thumbnail is an auto-screenshot of the
homepage** and is not configurable by any file — improving it means
improving the homepage (I5).

---

## Closed

- **`/for-individuals` prices** — resolved. Four real offerings shipped
  (career chat free, resume review ₹500, mock interview from ₹500 tiered,
  coaching ₹3,500). No `isPlaceholder` remains; `CLAIMS.md` reports
  "None. Safe to launch on this axis."
- **Phone number** — real number in `lib/site.ts`, rendered as a live `tel:`
  link in the footer. The manifest generator detects an all-repeated-digit
  number as a dummy, so a future revert to a placeholder resurfaces
  automatically.
- **`consultancy-pricing`** — GitHub repo and Vercel project both deleted;
  verified `404 / DEPLOYMENT_NOT_FOUND`. All 10 packages were migrated into
  `lib/packages.ts` and verified by a programmatic diff against the original
  HTML before removal.
- **Merge order** — Phases 0–4 are all on `main`.
