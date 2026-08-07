# kartikeyathapliyal.com

Personal consulting site for Kartikeya Thapliyal — product and fintech
consulting for businesses, with a secondary track for individual career
coaching.

**Live:** https://kartikeyathapliyalcom.vercel.app
**Stack:** Next.js 15 (App Router) · React 19 · Tailwind v4 · TypeScript
**Backend:** none. Fully static. The only external services are a Google
Form and a Cal.com booking embed, both loaded client-side and only on
`/services#book`. Contact details (email, phone, LinkedIn, GitHub) live in
the site-wide footer rather than a dedicated page.

## Routes

| Route | Purpose |
|---|---|
| `/` | Positioning, what I'm hired for, track record |
| `/about` | Career background, written from private source notes |
| `/services` | The 12 consulting packages, a rate estimator, filter/sort, an INR/USD toggle with a live FX rate, and booking |
| `/for-individuals` | Secondary audience — career coaching, real pricing |

`/contact` 308-redirects to `/services#book` (see `next.config.ts`).

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Before pushing

```bash
npm run verify    # typecheck + lint + build (all three build-time gates)
```

The build runs three gates automatically — `prebuild` checks for hardcoded
contact details/prices/URLs and validates the claims registry; `postbuild`
asserts the output is fully static with zero serverless functions. All
three run on Vercel too, so a build that passes locally will pass there.

If you touched `lib/claims.ts` or `lib/packages.ts`:

```bash
npm run claims:build    # regenerates CLAIMS.md — commit the diff
```

## Structure

See [`CLAUDE.md`](./CLAUDE.md) for the full map and the non-negotiables
(no hardcoded config, no dynamic routes, claims registry discipline). See
[`PENDING.md`](./PENDING.md) for open items awaiting the owner's input,
[`CLAIMS.md`](./CLAIMS.md) for every factual claim on the site with its
source, and [`DASHBOARD-CHECKLIST.md`](./DASHBOARD-CHECKLIST.md) for the
handful of things that only exist as a setting in GitHub or Vercel, not as
a file in this repo.

## History

Rebuilt from scratch in four phases, replacing a dark-only portfolio site
now frozen in [`archive/site-v1/`](./archive/) for reference.
