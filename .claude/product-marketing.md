# Product marketing context — kartikeyathapliyal.com

For the copywriting / cro / offers skills. Read this before asking the
standard intake questions — it answers all of them.

## Page purpose

`/lab/services` (prototype; live page is `/services`, untouched). Primary
action: book a 30-minute call (`CtaLink` → Cal.com) or apply a coupon and
submit the inquiry form. Single primary CTA per page, enforced by
`scripts/check-config.mjs`.

## Who this is for

**Two audiences, one seller.** Businesses hiring product/fintech consulting
(primary), individuals wanting career coaching (secondary, separate route
`/for-individuals` — not in scope here).

**Two markets, one page.** India (₹, timezone-detected) and everyone else
(USD, priced independently — see `lib/regions.ts`). Indian and international
consulting rates genuinely differ by 2–3×; this is not a currency
conversion, it's two price lists.

**Positioning tension to hold, deliberately:** Kartikeya's real expertise is
narrow and deep — fintech, brokerage/payments integrations, RTAs,
compliance. But the page must not read as fintech-only, because (a) most of
the SKUs (roadmap resets, PM coaching, fractional leadership) are general
product-leadership offers that any B2B team needs, and (b) international
readers won't parse "RTA" or "broker integration" and will bounce if the
copy opens with it. **Rule: lead every section with the general problem,
use the fintech specifics as proof-of-depth, never as the entry point.**
"Third-party integrations are setting the pace instead of your roadmap
(payment processors, data providers, brokerage partners)" — not "Brokers,
RTAs, and aggregators are slowing you down."

## Problem the buyer has

Varies by tier (see `lib/tiers.ts` and `lib/services-sections.ts`):
diagnosing an unclear failure, an integration/roadmap bottleneck, or no
senior product owner in-house. Objections that stop a first booking:
"what do I actually get," "what if it doesn't work out," "can I trust a
stranger with this," "is this too small/big for what I need." The FAQ
section exists specifically to kill these before a call is needed.

## Proof available (verbatim wording lives in `lib/claims.ts` / `CLAIMS.md`
— always render through `<Claim id="..."/>`, never retype)

Scale: 10M+ investors reached, 22 broker integrations, ~90–95% of India's
active retail broking accounts, 99.99% uptime, 2.5–4M orders/month.
Deltas: SIP success 35%→85%, error rate 30%→7%, support TAT down ~85%.
Delivery: SBI Securities 0→1 integration in ~4 sprints, now ~2.5M users.
Tenure: ~7 years building tech products (2 engineering, 5 product), at
smallcase Jul 2021–Jul 2026.

Four name-attributed testimonials in `lib/testimonials.ts`, themed:
technical depth, composure under pressure, follow-through after handover,
high-agency execution. **Follow-through after handover is the single
strongest differentiator** — competitors in this exact niche
(thefractionalproductmanager.com) have zero client testimonials; this is
where Kartikeya can win on trust that a page full of metrics can't buy.

No client-outcome case studies exist yet (no consulting clients). Don't
imply otherwise. The closest comparable in this niche doesn't have any
either and charges ~$186/hr — see
`docs/PRICING-REVAMP-INDIA-VS-INTERNATIONAL.md` §2.1.

## Competitive differentiation

- Fixed scope, fixed price, defined end date on every engagement — no
  metered hourly billing anxiety.
- No notice period to leave (can stop at the end of any month) — an
  explicit risk-reversal already in the FAQ. Extend the same symmetry to
  starting: no notice period to *join* either, if the fit call lands.
- International price ($150/hr list) sits ~20% under the closest
  comparable's $186/hr, above the $103 freelance-PM average — a
  defensible senior rate with a visible reason to choose it over either
  extreme.

## Traffic context

Direct link only (`/lab/services` is noindex, unlinked). Whoever lands here
either got the link from Kartikeya directly or from a shared prototype
review — assume moderate context already, but the page must still stand
alone since coupons get shared via `?code=` deep links to cold traffic too.

## Voice

Professional but direct, not corporate. Short sentences. No exclamation
points, no "leverage/synergy/streamline"-class words, no invented urgency.
Confident, not hedged — the existing site copy (`CLAUDE.md`, `PENDING.md`,
current `/services`) is the reference for tone; match it.
