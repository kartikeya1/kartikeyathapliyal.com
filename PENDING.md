# Pending items

Open work and parked scope. Nothing here blocks a production deploy any
more - the launch blockers are closed. Items are grouped by whether they
need Kartikeya's input or are simply queued.

---

## Queued work - no input needed

### Pricing programme - all three phases done

P1 (base discounts), P2 (calculator moved + toggled) and P3 (coupon codes)
are all built. Two temporary things live in production as a result, and
both need a decision before they can be cleaned up:

**1. The calculator toggle is temporary.** Once a call is made on whether
the calculator earns its place, delete `components/pricing/CalculatorToggle.tsx`
and its usage in `PricingExplorer.tsx`. Don't leave a dead toggle in
production indefinitely.

**2. `TEST10` is a test coupon.** It's live in the sheet and works on the
public site right now. Retire it (set `Active` to anything but `YES`) before
this matters, and replace it with the real ad / LinkedIn / past-client codes.

**Base rate raised to ₹4,500/hr - 2026-08-07.** This resolved the
struck-through-price concern: every "was" price is now a rate genuinely
quotable, rather than an anchor invented to manufacture a discount. Nobody
pays more as a result - the discounted rate is unchanged at ₹4,000/hr - and
typical discounts moved from 4% to 11%.

**Still true: PM coaching is a genuine price rise.** ₹30,000 → ₹32,000 for
the same 8 hours (₹3,750/hr → ₹4,000/hr). The only plan where a client
actually pays more for the same scope. Deliberate, recorded so it isn't
rediscovered as a surprise.

**Workshop naming - resolved.** Renamed to "Product workshop" (6h) and
"Strategy offsite" (10h); the hours live in the tag, so the names no longer
contradict them.

### Sheet sharing must stay public

`siteConfig.currency.couponsUrl` reads the coupon sheet anonymously. It must
stay shared as **"Anyone with the link - Viewer"**. If it's ever set back to
restricted, coupons silently stop resolving and every visitor pays base
price with no error visible to you.

Codes in that sheet are readable by anyone who opens DevTools - a deliberate
trade for having no backend. Don't put anything there you wouldn't publish.

### Improvements programme, remaining phases

**All improvements phases (I1-I7) are done.** Nothing queued here right now.

I2 (header/footer/CTA), I3 (individuals pricing), I4 (brand assets), I5
(homepage) and I6 (currency) are **done**. **I1 is done** - see below.
**I7 is done** - `CLAUDE.md` and `README.md` brought current with I1-I6
(stale `PrimaryCta`/`SecondaryLink` references, missing `lib/currency.ts`
and `lib/logo.ts` entries, updated non-negotiables), plus
`DASHBOARD-CHECKLIST.md` for the settings that live only in GitHub or
Vercel.

**I1 shipped**: `app/contact/` deleted; the Cal.com and Google Form embeds
moved to a `#book` section at the bottom of `/services` (highest-intent
place on the site - someone who scrolled the whole pricing grid); a `308`
redirect `/contact → /services#book` added in `next.config.ts` (verified
this does not create a serverless function - it compiles into
`routes-manifest.json`, not `middleware-manifest.json`, and the build
already carried an unrelated redirect there before this one existed);
`sitemap.ts` and `check-static.mjs`'s `EXPECTED_ROUTES` updated together in
one commit, since either alone hard-fails the build.

**I6 shipped** using the following, which is recorded because it would
otherwise be re-derived: **Yahoo and Google Finance cannot be used** - both are
CORS-blocked from a browser (Yahoo also returns 429). Verified working
alternatives, both free and CORS-enabled: `open.er-api.com/v6/latest/USD`
(primary - it returns `time_last_update_utc`, which supplies the
"last refreshed" display directly) and the jsdelivr `@fawazahmed0/currency-api`
(fallback). Both update **daily**, not intraday - the UI should say "as of"
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

## Parked - deliberately not being picked up

### Back-office tools → separate project

Invoice generator, pricing control panel, lead-generation tooling, LinkedIn
cold-outreach templates. **Decided: these will not live in this repo.**
Kartikeya will build a separate project for them. **Delete this section once
that project exists.**

The analysis, kept for when it's picked up:

| Tool | Backend needed? | Why |
|---|---|---|
| Invoice generator | **No** | Form → rendered invoice → browser print-to-PDF is fully client-side. Data never leaves the browser. |
| Pricing control panel | **Yes, for live edits** | Changing what *other visitors* see requires server-side persistence. The no-backend pattern is: the tool emits updated `lib/packages.ts` content, you commit, Vercel redeploys. One deploy per change - acceptable, since prices move rarely. |
| Lead generation / LinkedIn outreach | **Mostly yes** | Scraping LinkedIn is CORS-blocked from a browser and violates their ToS. Workable client-side: template generators, a `localStorage` tracker, CSV import/export. Automated lead *discovery* needs a backend and usually a paid data source. |

Why it can't live here: with no backend there is no real authentication. A
client-side password ships in the JS bundle and is readable by anyone; a
"secret route" is obscurity, not security. Vercel's Password Protection is
Pro-plan only, and this account cannot enable SSO on production.

### Testimonials

`whoami` holds ~15 name-attributed, public-safe pull quotes, but **none are
cleared for public use** and no referee outreach has happened. This blocks
the strongest version of the homepage (I5) - social proof is the single
biggest missing element on the site.

---

## Needs Kartikeya's input

### 0. Pricing revamp prototype - `/lab/services` - OPEN

Research and reasoning: `docs/PRICING-REVAMP-INDIA-VS-INTERNATIONAL.md`.
Live at `/lab/services` - direct link only, noindex, absent from the
sitemap. `/services` is untouched and unaffected.

Headline finding: the INR rate is correctly placed against the Indian
senior-freelance band; the FX-converted USD figure shown to international
visitors is roughly a fifth of the international fractional-product rate.
The closest comparable in the same niche charges ~$186/hr against our ~$44.

Decisions needed, in order of consequence:

1. **Adopt the international price list?** ($150/hr list → $135/hr
   effective, authored in `lib/packages.ts` as `intl`, never FX-converted.)
   Everything else in the prototype is presentation; this one is a business
   decision.
2. **Is $150/hr the right number?** One value in `lib/regions.ts`.
3. **Reprice the diagnostic as a product** ($2,000+, the standard
   productized-diagnostic band) and accept that it breaks the clean $150/hr
   derivation? See §3.3 of the doc.
4. **Does the value calculator earn its place** where the rate calculator
   did not? It replaces `hours × weeks × rate` with a fractional-vs-
   full-time-hire cost comparison.
5. **Promote `/lab/services` over `/services`, or cherry-pick?** The
   three-tier collapse, the `/month` retainer framing, the FAQ and the
   first-30-days section are all independent of the pricing decision and
   could ship on their own.

If the answer to (1) is no, `lib/regions.ts`, `components/region/`,
`components/lab/`, `app/lab/` and the `intl` field in `lib/packages.ts`
delete cleanly in one commit - nothing outside `/lab` depends on them.

### 1. Package renames - APPROVED 2026-08-07

Approved as-is. No further action.

### 2. Custom domain - deferred by choice

`siteConfig.url` points at `https://kartikeyathapliyalcom.vercel.app`.
Attach `kartikeyathapliyal.com` in Vercel, then one config value changes and
sitemap, robots, OG tags and JSON-LD all follow. Until then, link previews
and search results show the `.vercel.app` host.

### 3. Cal.com event for the individuals track - CLOSED

Booking the same 30-minute slot is intentional. Not an open item; it was
only ever a question.

### 4. FX refresh cadence - resolved as shipped, confirm you're OK with it

I6 shipped with a 12-hour `localStorage` cache rather than fetching on every
visit, since the underlying sources only publish once daily - per-visit
fetching would add latency for no fresher data. If you want it more
aggressive, `siteConfig.currency.fx.cacheHours` is the one value to change.

### 5. Dashboard-only steps

Everything that cannot be done from this repo - no file or commit reaches
it - is tracked in **[`DASHBOARD-CHECKLIST.md`](./DASHBOARD-CHECKLIST.md)**
instead of here, so it isn't duplicated in two places. Currently open:
uploading the GitHub social preview (image is now generated and committed
at `.github/social-preview.png` - it just needs the one manual upload), and
attaching the custom domain.

---

## Closed

- **`/for-individuals` prices** - resolved. Four real offerings shipped
  (career chat free, resume review ₹500, mock interview from ₹500 tiered,
  coaching ₹3,500). No `isPlaceholder` remains; `CLAIMS.md` reports
  "None. Safe to launch on this axis."
- **Phone number** - real number in `lib/site.ts`, rendered as a live `tel:`
  link in the footer. The manifest generator detects an all-repeated-digit
  number as a dummy, so a future revert to a placeholder resurfaces
  automatically.
- **`consultancy-pricing`** - GitHub repo and Vercel project both deleted;
  verified `404 / DEPLOYMENT_NOT_FOUND`. All 10 packages were migrated into
  `lib/packages.ts` and verified by a programmatic diff against the original
  HTML before removal.
- **Merge order** - Phases 0-4 are all on `main`.

---

## Deferred by choice

### Pricing from a Google Sheet - scrapped, with one idea kept

Moving pricing into a live-fetched sheet was **dropped**: prices are
currently baked into the static HTML, and fetching them at runtime would
mean Google indexes a pricing page with no prices on it.

**The one idea worth keeping if this ever comes back:** fetch the sheet at
*build time* and bake the result in as the SSR baseline, then re-fetch
client-side and update if it changed. That preserves crawlable prices and
no-JS correctness while still allowing hot-switching - the same pattern the
live FX rate already uses. A committed fallback (today's `lib/packages.ts`)
covers the sheet being unreachable mid-build.

### Private sheets via service account - scrapped

Not being pursued. For the record, a service account cannot work from a
static frontend: the private key would ship in the JS bundle. The workable
alternative was a Google Apps Script Web App, which can keep the sheet fully
private and return only `{valid, discount}` for a submitted code. Noted in
case coupon secrecy ever matters more than it does today.

---

## How to change a price

Deliberately simple - this should never need a heavyweight model.

1. Open `lib/packages.ts`.
2. Edit `priceInr` (the price actually charged) and, if the plan is
   discounted, `originalPriceInr` (the struck-through "was").
   `hours` drives both hourly figures; rates are derived, never stored.
   Leaving `originalPriceInr` out means the plan shows no discount.
3. `npm run claims:build` - regenerates `CLAIMS.md`.
4. `npm run build` - the gates will catch anything inconsistent.

Nothing else references prices. There is no second place to update.
