# Dashboard-only checklist

Things about this site that **cannot be done from the repo** - no file, no
script, no commit touches them. Collected here so they aren't rediscovered
one at a time. Each one was verified to be dashboard-only, not just assumed.

---

## GitHub

- [ ] **Upload the social preview.** `.github/social-preview.png` exists in
      the repo at the right dimensions, but GitHub does not read that path.
      Go to **Settings → General → Social preview → Edit → Upload an
      image**.

## Vercel

- [ ] **Attach the custom domain.** `kartikeyathapliyal.com` is not yet
      attached; the live site is `kartikeyathapliyalcom.vercel.app`. Once
      attached, update `siteConfig.url` in `lib/site.ts` - that one value
      flows into the sitemap, robots.txt, OG tags, canonical URLs, and
      JSON-LD.
- [ ] **The project dashboard thumbnail is an automatic screenshot of the
      homepage.** It is not a file and not configurable from any settings
      page. The only way to change it is to change what `/` looks like.
      Don't go looking for a thumbnail upload option - there isn't one.

## Link-preview caches

OG images are cached by each platform independently. After changing
`app/opengraph-image.tsx`, previews on already-shared links won't update on
their own:

- [ ] **LinkedIn** - re-scrape via the [Post Inspector](https://www.linkedin.com/post-inspector/).
- [ ] **Slack / WhatsApp** - no manual tool; their caches expire on their
      own schedule (days, not hours).
- [ ] **X (Twitter)** - no public re-scrape tool; also expires on its own.

## Verified NOT dashboard-only (so nobody re-checks these)

- Favicon, apple-touch-icon, OG image, sitemap, robots.txt - all generated
  from the repo (`app/icon.svg`, `app/apple-icon.tsx`,
  `app/opengraph-image.tsx`, `app/sitemap.ts`, `app/robots.ts`). No dashboard
  step for any of these.
- Redirects (`/contact` → `/services#book`) - `next.config.ts`, deploys with
  the app.
