# Pending items

Open items that don't block ongoing build work but do block production
launch. Check this file before merging `phase-4-launch` (or its successor)
into `main`.

---

## 1. `/for-individuals` prices — not yet supplied

All three individual-track packages in `lib/packages.ts` carry
`isPlaceholder: true` and render a visible "Draft pricing" badge with a
₹0 / "Free" price on the live site:

- `individuals-resume-review` — Resume review
- `individuals-mock-interview` — Mock PM interview
- `individuals-career-coaching` — SDE→PM / APM→PM coaching

**To resolve:** supply name, price, duration, and a one-line outcome for
each. Update the three entries in `lib/packages.ts`, remove
`isPlaceholder: true`, run `npm run claims:build` to regenerate
`CLAIMS.md`, and confirm the PLACEHOLDERS section is empty.

Owner: Kartikeya. Noted 2026-08-06, deferred to "later."

---

## 2. Phone number — resolved 2026-08-06

Was `+91 9999999999` (a dummy). Updated to the real number
(`lib/site.ts` → `contact.phone`) and confirmed no longer flagged in
`CLAIMS.md`'s placeholder section — `scripts/build-claims-manifest.mjs`
detects an all-repeated-digit number as a dummy automatically, so a
future accidental revert back to a placeholder pattern will resurface
here rather than ship silently.

No action needed. Kept as a record.

---

## 3. Package name renames — awaiting explicit approval

Phase 2 sharpened 8 of the 12 package names toward buyer outcomes (per
the competitor research: named-outcome offers convert better than
"consulting call"). **Prices were not touched** — every price was
verified unchanged before and after. `CLAIMS.md` and `/about` have been
reviewed and approved; the renames have not been separately confirmed.

| id | Original name (consultancy-pricing) | Current name |
|---|---|---|
| `intro-call` | Intro consultation call | Sanity-check a product decision |
| `deep-dive-diagnostic` | Deep-dive diagnostic | Diagnose a broken product flow |
| `strategy-sprint` | Product strategy / roadmap sprint | Reset a reactive roadmap |
| `integration-readiness-sprint` | Fintech integration / API readiness sprint | Integration readiness audit |
| `reliability-sprint` | Reliability / critical-journey sprint | Reliability and error-reduction program |
| `pm-coaching` | PM coaching / team enablement | PM coaching and team enablement |
| `half-day-workshop` | Half-day workshop / offsite | Half-day product workshop |
| `full-day-workshop` | Full-day workshop / offsite | Full-day strategy offsite |

Unchanged: `founder-advisory-retainer` (Founder advisory retainer),
`fractional-product-lead` (Fractional product lead).

**To resolve:** review the table above against the live `/services`
page and either approve as-is or ask for specific names changed. Prices
are not affected either way.

Owner: Kartikeya. Noted 2026-08-06, deferred to "later."

---

## 4. Custom domain — deferred, not blocking

`siteConfig.url` (`lib/site.ts`) currently points at
`https://kartikeyathapliyalcom.vercel.app`, the only non-preview domain
attached to the Vercel project. When `kartikeyathapliyal.com` is
attached in the Vercel dashboard, update that one config value and
redeploy — sitemap, robots, OG tags, and JSON-LD all read from it.

Until then, OG previews and search results will show the `.vercel.app`
host. Confirmed fine for now.

Owner: Kartikeya. Confirmed fine for now, 2026-08-06.

---

## 5. `consultancy-pricing` — retired 2026-08-06

All 10 packages migrated into `lib/packages.ts` and verified by diffing the
original `index.html` against the migrated data programmatically: every
price, category, hourly rate and duration tag matched. The Google Form URL
carried over into `siteConfig.booking`. The one intentional difference is an
added ₹4,500 workshop rate the original calculator's dropdown was missing.

`/services` replaces the old page entirely. Retired at the owner's
instruction, after `/services` was confirmed live in production with all 12
packages.

Done:
1. Git bundle removed from `archive/` — the owner confirmed no copy was
   needed, since the pricing data is fully represented in `lib/packages.ts`
   and the old page had no remaining users.
2. **GitHub repo deleted** (`kartikeya1/consultancy-pricing`) — confirmed
   gone.

### Still open — one manual step

**The Vercel project still exists and `https://consultancy-pricing.vercel.app`
is still publicly serving the old pricing sheet.** Deleting the GitHub repo
does not remove the Vercel deployment; it only severs the git connection, so
the last successful build keeps being served.

This could not be automated: there is no project-deletion tool in the Vercel
MCP, no Vercel CLI or token on this machine, and Vercel Authentication /
password protection are not available for production deployments on this
plan (API returns `invalid_sso_protection`).

**To finish — about 30 seconds:**

1. Open https://vercel.com/kartikeya-thapliyals-projects/consultancy-pricing/settings
2. Scroll to the bottom, **Delete Project**
3. Type `consultancy-pricing` to confirm

Nothing depends on it — the packages live in `lib/packages.ts`, and
`/services` is live.

---

## Merge order — confirmed 2026-08-06

Branches stack in order: `phase-1-wireframes` → `phase-2-content` →
`phase-3-design` → `phase-4-launch`. **None of PRs #3–#6 merge into
`main` until Phase 4 is fully complete, tested, and explicitly approved
by the owner.** Items 1–3 above should be resolved before that approval,
since they're currently visible on the live preview as placeholders.
