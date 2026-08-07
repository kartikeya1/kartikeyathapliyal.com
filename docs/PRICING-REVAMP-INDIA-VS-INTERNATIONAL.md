# Pricing revamp: India vs international

Research conducted 2026-08-07. This document is the reasoning behind the
`/lab/services` prototype route - it records what the market actually pays,
where the current pricing sits against it, and the two-market model that
replaces it.

Nothing here is live on `/services`. `/lab/services` is a parallel,
unlinked route so the changes can be judged in production without touching
the page real visitors see.

---

## 1. The problem in one paragraph

The site has a single price list, denominated in INR, and a currency toggle
that FX-converts it to USD for anyone outside India. That rate is
**correct for the Indian market and roughly a fifth of the international
market rate**. Because the toggle defaults by timezone, an international
visitor is automatically shown an India-market price in dollars. The number
they see does not read as good value - it reads as offshore-commodity, and
it contradicts every seniority signal in the surrounding copy.

The fix is not a discount or a markup. It is recognising that these are two
different markets with two different price lists.

---

## 2. What the research found

### 2.1 The closest possible comparable

[thefractionalproductmanager.com](https://thefractionalproductmanager.com/)
leads with **"Fractional CPO & Product Leadership for SaaS, Fintech &
Platforms"** - near-identical positioning.

| Their offer | Commitment | Price | Effective |
|---|---|---|---|
| Focused Product Leadership | ~10 hrs/week (~43/mo) | $7,999/mo | ~$186/hr |
| Cross-Functional Ownership | ~20 hrs/week (~86/mo) | $15,999/mo | ~$186/hr |
| Interim & Custom | - | quoted at kickoff | - |

Two things matter about this page beyond the price:

1. **They have no client logos, no testimonials, and no case studies.**
   Their entire proof stack is quantified operating results from prior
   in-house work - 5 legacy systems retired, 30+ teams enabled, 30% shorter
   release cycles, 40% less downtime, 30% higher adoption. That is
   structurally identical to what already exists in `lib/claims.ts`. They
   are not out-proving us. They are out-pricing us.
2. **They ship exactly three engagement options.** Not twelve.

### 2.2 Rate benchmarks

| Market | Benchmark | Current position |
|---|---|---|
| India, senior freelance, high-demand domain | ₹2,000-₹4,000+/hr | **₹4,000/hr** - at/above the top of the band |
| Global freelance PM | avg $103/hr, most $60-$130 | **~$44/hr** - below the floor |
| Fractional CPO, US/UK | $200-$400/hr | **~$44/hr** - 5-9× below |
| Fractional executive retainers | $7,500-$25,000/mo | **~$1,780/mo** |
| Senior product marketing consultant | $1,800-$2,400/day | - |

Sources: [xflowpay](https://www.xflowpay.com/blog/freelancer-charges) ·
[Karbon Card](https://www.karboncard.com/blog/freelance-hourly-rate) ·
[Consultancy.in](https://www.consultancy.in/consulting-industry/fees-rates) ·
[Hubstaff](https://hubstaff.com/time-tracking/average-hourly-rates)

The decisive line, from Karbon: **international clients pay two to three
times higher than domestic clients**, because of market and currency
differences. That is not a markup - it is the actual observed spread.

**Conclusion: the India rate is right. The international rate is the bug.**

### 2.3 Offer count

- Price Intelligently, across 512 companies: **three packages produced 30%
  higher ARPU** than five or more
  ([Monetizely](https://www.getmonetizely.com/articles/customer-choice-overload-how-many-pricing-options-are-too-many))
- Consensus sweet spot is 3-4 tiers; past that, buyers **default to the
  cheapest option or abandon entirely**
  ([Figma](https://www.figma.com/resource-library/pricing-page-best-practices/),
  [10Louder](https://10louder.com/how-to-price-b2b-services/))
- Three tiers also anchor the middle as the rational choice, which is where
  most B2B buyers land

`/services` currently presents **12 business SKUs** to cold traffic.

### 2.4 The entry rung

Productized diagnostics - fixed scope, repeatable method, report deliverable
- are the standard entry product at **$2,000-$5,000**, explicitly designed
to lead into retainer work
([Pharallax](https://pharallax.ai/guides/productized-consulting-examples/),
[Melisa Liberman](https://www.melisaliberman.com/blog/productized-consulting)).

Also: **70%+ of fractional engagements are monthly retainers.** The current
retainers are priced as one-off blocks of hours, with no recurring framing.

### 2.5 Proof

Metric-led case studies convert **2.5× more B2B inquiries**, and work best
embedded per-service rather than siloed on a case-studies page
([Luniq](https://www.luniq.io/en/resources/blog/case-study-structure-for-consultancy-websites-that-close-deals)).

There are no consulting clients yet, so there are no case studies, and
inventing them is not an option. §2.1 is the consolation: the closest
competitor has none either and charges $186/hr.

---

## 3. The two-market model

### 3.1 India - unchanged

The research says the current INR pricing is correctly placed. **No INR
price changes.** ₹4,500/hr list → ₹4,000/hr effective stays exactly as it
is, discount anchoring included.

### 3.2 International - authored, not converted

International prices are **written down as USD figures in
`lib/packages.ts`**, not derived from the INR list by FX. This is the whole
point: FX conversion is what exported an India price to a US buyer.

Base: **$150/hr list → $135/hr effective (10% off)**, mirroring the shape of
the India anchoring.

| Engagement | Hours | List | Now | Off |
|---|---|---|---|---|
| Diagnose a broken product flow | 10 | $1,500 | $1,350 | 10% |
| Reset a reactive roadmap | 16 | $2,400 | $2,160 | 10% |
| Integration readiness audit | 30 | $4,500 | $4,050 | 10% |
| Reliability & error-reduction | 36 | $5,400 | $4,860 | 10% |
| Founder advisory retainer | 20/mo | $3,000 | $2,700 | 10% |
| Fractional product lead | 40/mo | $6,000 | $5,400 | 10% |
| PM coaching & enablement | 8/mo | $1,200 | $1,080 | 10% |
| Product workshop | 6 | $900 | $720 | 20% |
| Strategy offsite | 10 | $1,500 | $1,350 | 10% |

Flat-fee entries, priced as products rather than by the hour:
free fit call · async teardown **$200** · sanity-check session **$250**.

**Why $150/hr and not $186/hr.** Pricing level with the closest comparable
removes the reason to choose an unproven alternative. $150 sits ~20% below
it, comfortably above the $103 freelance-PM average, and lands almost
exactly on the 3× domestic multiple the research describes. It is a
defensible senior rate with a visible reason to pick it.

**Hourly rates are hidden in the international region.** The competitor
quotes monthly, never hourly. An hourly figure invites a commodity
comparison against a $30/hr offshore contractor; a monthly retainer figure
invites a comparison against a salary. The region config carries a
`showHourlyRate` flag for exactly this.

### 3.3 Known gap, deliberately left open

At $1,350 the diagnostic sits **below** the $2,000-$5,000 productized-
diagnostic benchmark from §2.4. Pricing it as a product rather than by the
hour would fix that, but would break the clean $150/hr derivation and make
the ladder internally inconsistent. Coherence was chosen over benchmark
alignment. Worth revisiting once the first international engagement lands.

---

## 4. Structural changes on `/lab/services`

Beyond price, six changes derived from §2.1 and §2.3:

| # | Change | Grounded in |
|---|---|---|
| 1 | 12 SKUs collapse into **3 tiers** - Diagnose / Fix / Embed | §2.3 |
| 2 | The three sprints become **one card with three focus areas** - they are one product with three subject matters | §2.3 |
| 3 | Retainers presented as **`/month`**, not blocks of hours | §2.4 |
| 4 | The rate calculator is replaced by a **fractional-vs-full-time cost comparison** | §2.1 |
| 5 | New sections: **problem scenarios**, **first 30 days**, **FAQ** | §2.1 |
| 6 | Workshops, coaching and the sanity-check call move to a secondary band | §2.3 |

On change 4: the current calculator computes `hours × weeks × rate`. Its
only output is a larger number, and it frames the service as metered labour.
The replacement compares the retainer against the fully-loaded cost of the
full-time hire the buyer is avoiding. Same component slot, inverted framing.

Nothing is deleted from `lib/packages.ts`. The sprints keep their
individual entries, prices and hours - they are *presented* as focus areas
within one tier. This is a presentation change, so `CLAIMS.md`, the coupon
maths and the currency renderer are untouched.

---

## 5. How the region switch works

`/lab/services` carries a visible **India / International** switch so both
price lists can be reviewed on one screen.

**On the real `/services` this switch would not exist.** Region resolves
from the browser timezone, the same mechanism `lib/currency.ts` already uses
(`Asia/Kolkata` → India, everything else → international). The switch is a
prototype affordance, not part of the proposed design.

Mechanically it reuses the pattern already proven for theme and currency:
both regions' prices are server-rendered into the static HTML, a
before-paint script sets `data-region` on `<html>`, and CSS picks one. That
keeps the page correct with JavaScript disabled, correct for crawlers, free
of any flash, and free of hydration mismatch - and it stays fully static, so
`check-static.mjs` still reports zero serverless functions.

---

## 6. Decisions still open

1. **Adopt the international price list?** Everything else is presentation;
   this one is a business decision.
2. **$150/hr, or higher/lower?** One number in `lib/regions.ts`.
3. **Reprice the diagnostic as a product** ($2,000+), accepting the
   inconsistency? See §3.3.
4. **Does the value calculator earn its place**, where the rate calculator
   did not?
5. **Promote `/lab/services` over `/services`**, or cherry-pick individual
   changes?
