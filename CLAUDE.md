# CLAUDE.md

Agent handbook for `kartikeyathapliyal.com`. Read this before touching the repo.

## What this is

A four-page consulting front door for Kartikeya Thapliyal — product and
fintech consulting for businesses, with a secondary track for individual
career coaching. **No backend of any kind.** Everything is static; the only
external services are a Google Form and a Cal.com booking embed, both
client-side, both on `/services#book`.

Routes: `/` `/about` `/services` `/for-individuals` — plus `/robots.txt`,
`/sitemap.xml`, `/opengraph-image`, `/icon.svg`, `/apple-icon`.
`/contact` 308-redirects to `/services#book`; contact details live in the
site-wide footer instead of a dedicated page.

## Non-negotiables

1. **Static output only.** No API routes, no route handlers, no server
   actions, no `runtime = "edge"`/`"nodejs"` exports. `scripts/check-static.mjs`
   enforces this in `postbuild` — if you add anything dynamic, the build fails
   and tells you exactly what it found.
2. **No hardcoded contact details, prices, or external URLs** outside
   `lib/site.ts`, `lib/packages.ts`, and `lib/claims.ts`. `scripts/check-config.mjs`
   enforces this in `prebuild`. If you need an email, phone, price, or a
   LinkedIn/GitHub/Cal.com URL in a component, read it from `siteConfig` —
   don't type it.
3. **Every factual claim on the site goes through `<Claim id="..." />`**,
   never literal text. The registry is `lib/claims.ts`; `CLAIMS.md` is
   *generated* from it (`npm run claims:build`) and is the owner's review
   surface. `scripts/check-claims.mjs` fails the build if `CLAIMS.md` is
   stale — regenerate it any time you touch `lib/claims.ts` or
   `lib/packages.ts`, and commit the result.
4. **At most one primary `CtaLink` per page, and none at all in
   `components/layout/`.** `CtaLink` (`variant="primary" | "secondary"`) is
   the only CTA element — `check-config.mjs` counts `<CtaLink>` elements by
   variant, not a literal `data-cta` string, so it sees through the
   attribute CtaLink emits at runtime. Chrome (header/footer) may only use
   `variant="secondary"`, since a primary there would double every page's CTA.
5. **Any link that leaves the site uses `ExternalLink`** (`target="_blank"
   rel="noopener noreferrer"`) or `CtaLink` with `external`, never a bare
   `<a>`. Internal navigation uses `next/link` via `CtaLink`.
6. **The logo mark (`lib/logo.ts`) is the one source of truth for the
   brand.** `app/icon.svg` is a static file and can't import it, so
   `check-config.mjs` asserts its paths match `lib/logo.ts` verbatim. Change
   the geometry in `lib/logo.ts`; the favicon must follow by hand.
7. **`npm run build` must pass before you push.** It runs `prebuild` →
   `next build` → `postbuild` in sequence — all three gates, every time.

## Where things live

```
lib/site.ts         The one config: contact, socials, booking, nav, FX
                     sources. Nav is split: `nav` (topics, header-left) vs
                     `utilityNav` (audience switch, header-right + footer).
lib/packages.ts      12 business SKUs (10 core + 2 entry) and 4 real
                     /for-individuals offerings — no placeholders remain.
lib/claims.ts        Every factual claim, with its whoami source reference.
lib/format.ts        Server-side INR/USD formatting for the build-time rate.
                     No Intl — hand-rolled, to avoid ICU-build hydration
                     mismatches. Magnitude-aware rounding: nearest dollar
                     below $100, nearest $10 above (see the note in-file —
                     the individuals prices exposed a real bug here once).
lib/currency.ts       Client-side: timezone-based geo default, live-rate
                     fetch with localStorage caching and a two-source
                     fallback chain, magnitude-aware rounding mirrored from
                     lib/format.ts.
lib/metadata.ts      buildMetadata() — one helper for every route's <head>.
lib/logo.ts          The logo mark's path data. Single source for the
                     header Logomark, the OG image, and (verified, not
                     imported) app/icon.svg and app/apple-icon.tsx.

components/theme/    Light/dark mechanism. ThemeScript sets [data-theme]
                     before paint; ThemeToggle is the only interactive
                     piece.
components/currency/ CurrencyScript (same before-paint pattern as
                     ThemeScript, sets [data-currency]), CurrencyProvider
                     (client context: currency + live rate), CurrencyToggle,
                     UsdAmount (the only element that re-renders when the
                     live rate arrives).
components/brand/    Logomark — renders lib/logo.ts with currentColor.
components/pricing/  PricingExplorer owns the calculator + filter/sort
                     state; RateCalculator and FilterSortBar are its dumb
                     children. PriceTag renders both currencies and lets
                     CSS pick one; supports priceTiers for offerings priced
                     by level (e.g. mock interviews).
components/content/  Claim, CtaLink (primary/secondary, internal/external —
                     the only CTA element), ExternalLink, LazyEmbed,
                     CalEmbed, JsonLd.
components/layout/   SiteHeader (brand + nav left, utilities right),
                     SiteFooter (contact lives here on every page — see
                     "Non-negotiables" #4 on why it may never carry a
                     primary CtaLink).

scripts/             check-config.mjs, check-claims.mjs, check-static.mjs,
                     build-claims-manifest.mjs. Run in prebuild/postbuild.
                     scripts/lib/read-data.mjs parses lib/*.ts without a
                     TypeScript build step, since these run before one exists.

archive/site-v1/     The pre-rebuild site. Frozen. Do not edit, do not let
                     any tool discover it — see archive/README.md for why its
                     manifests are renamed with a leading underscore.
```

## Design tokens

Everything visual — type scale, weight, radius, card treatment, spacing — is
a CSS variable in `app/globals.css`. Structure is theme-independent by
design (see the comment block at the top of that file for why); only colour
changes between light and dark. If you're changing how the site looks,
change the tokens, not the components' Tailwind classes.

## Before you commit

```bash
npm run typecheck   # tsc --noEmit
npm run lint         # eslint .
npm run build         # prebuild gates + next build + postbuild gate — the real test
```

`npm run verify` runs all three in sequence.

If you touched `lib/claims.ts` or `lib/packages.ts`:

```bash
npm run claims:build   # regenerates CLAIMS.md — commit the diff
```

## History

Built from scratch in four phases (2026-08-06), replacing a dark-only
15-page portfolio site now frozen in `archive/site-v1/`. An improvements
programme followed (I1–I7): contact moved from a dedicated page into the
site-wide footer, nav moved to the header-left, real individuals pricing,
a logo mark, a rebuilt homepage, and geo-defaulted currency with a live FX
rate. Full history, open items, and the owner's pending decisions are in
`PENDING.md`.
