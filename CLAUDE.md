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
4. **At most one `data-cta="primary"` per page.** Enforced by
   `check-config.mjs`. If a page needs a second action, it's a
   `SecondaryLink` or an `ExternalLink`, not another `PrimaryCta`.
5. **Any link that leaves the site uses `ExternalLink`** (`target="_blank"
   rel="noopener noreferrer"`), never a bare `<a>`. Internal navigation uses
   `next/link` via `PrimaryCta` / `SecondaryLink`.
6. **`npm run build` must pass before you push.** It runs `prebuild` →
   `next build` → `postbuild` in sequence — all three gates, every time.

## Where things live

```
lib/site.ts        The one config: contact, socials, booking, FX rate, nav.
lib/packages.ts     The 12 consulting SKUs (10 core + 2 entry) and the 3
                    /for-individuals placeholders. Prices, names, copy.
lib/claims.ts       Every factual claim, with its whoami source reference.
lib/format.ts       INR/USD formatting. No Intl — hand-rolled, deliberately,
                    to avoid ICU-build hydration mismatches.
lib/metadata.ts     buildMetadata() — one helper for every route's <head>.

components/theme/   Light/dark mechanism. ThemeToggle is the only client
                    component that isn't a form control.
components/pricing/ PricingExplorer owns the calculator + filter/sort state;
                    RateCalculator and FilterSortBar are its dumb children.
components/content/ Claim, PrimaryCta, SecondaryLink, ExternalLink, LazyEmbed,
                    CalEmbed, JsonLd — the structural building blocks that
                    keep copy and links config-driven.

scripts/            check-config.mjs, check-claims.mjs, check-static.mjs,
                    build-claims-manifest.mjs. Run in prebuild/postbuild.
                    scripts/lib/read-data.mjs parses lib/*.ts without a
                    TypeScript build step, since these run before one exists.

archive/site-v1/    The pre-rebuild site. Frozen. Do not edit, do not let
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
15-page portfolio site now frozen in `archive/site-v1/`. Full phase history,
open items, and the owner's pending decisions are in `PENDING.md`.
