export type PackageCategory = "call" | "sprint" | "monthly" | "workshop";
export type PackageTier = "entry" | "core";

export interface ConsultingPackage {
  id: string;
  name: string;
  category: PackageCategory;
  tier: PackageTier;
  priceInr: number;
  rateInrPerHour: number | null;
  tag: string;
  featured: boolean;
  /** Exactly one sentence. */
  summary: string;
  /** Exactly two — a third element is a type error. */
  bullets: readonly [string, string];
  outcome: string;
  claimIds?: readonly string[];
  /**
   * Billable hours. Present on every rate-based engagement, and the basis
   * for both the original and discounted hourly figures — rates are derived
   * from totals rather than stored twice, so they can't drift apart.
   */
  hours?: number;
  /**
   * The pre-discount price. When set, `priceInr` is the *discounted* price
   * and the card renders a struck-through original plus a discount badge.
   * Absent means no discount — the plan renders exactly as it always has.
   */
  originalPriceInr?: number;
  /**
   * Set when one offering has several prices — mock interviews are priced by
   * the candidate's level. `priceInr` then acts as the "from" price and the
   * tiers render beneath it, which beats three near-identical cards.
   */
  priceTiers?: readonly { label: string; priceInr: number }[];
  /** Marks an offering whose price is not final. Renders a visible badge. */
  isPlaceholder?: true;
}

/**
 * The 10 packages below are transcribed unchanged from the consultancy-pricing
 * repo (index.html). Prices never move in this migration; names are sharpened
 * toward outcomes per the competitor research (named-outcome offers convert
 * better than "consulting call"), for owner approval in Phase 2.
 */
export const packages: readonly ConsultingPackage[] = [
  {
    id: "fit-call",
    name: "15-minute fit call",
    category: "call",
    tier: "entry",
    priceInr: 0,
    rateInrPerHour: null,
    tag: "15 min · free",
    featured: false,
    summary:
      "A short call to check whether this is the right fit before anyone spends money.",
    bullets: [
      "Useful when you're not sure which engagement fits your problem",
      "No prep required on either side",
    ],
    outcome: "Outcome: a clear yes, no, or pointer to the right engagement.",
  },
  {
    id: "async-teardown",
    name: "Async product teardown",
    category: "call",
    tier: "entry",
    priceInr: 7500,
    rateInrPerHour: null,
    tag: "48-hour turnaround · async",
    featured: false,
    summary:
      "Send a flow, PRD, or roadmap and get a recorded walkthrough plus written notes back within 48 hours.",
    bullets: [
      "Useful when calendars don't line up or the team is spread across time zones",
      "Works well as a second opinion before a big product decision",
    ],
    outcome: "Outcome: a recorded walkthrough, written notes, and a short action list.",
  },
  {
    id: "intro-call",
    name: "Sanity-check a product decision",
    category: "call",
    tier: "core",
    priceInr: 5000,
    rateInrPerHour: 5000,
    tag: "Starting point",
    featured: true,
    summary:
      "A focused advisory session for founders, CEOs, and product leads who want a sharp external point of view.",
    bullets: [
      "Useful for roadmap questions, feature prioritization, and fintech workflow questions",
      "Also suited for partner or integration blockers and second opinions before a major call",
    ],
    outcome: "Outcome: clear recommendations, decision framing, and immediate next steps.",
  },
  {
    id: "deep-dive-diagnostic",
    name: "Diagnose a broken product flow",
    category: "sprint",
    tier: "core",
    priceInr: 40000,
    rateInrPerHour: 4000,
    hours: 10,
    originalPriceInr: 41670,
    tag: "10 hours/week",
    featured: false,
    summary:
      "For teams dealing with a specific product, execution, integration, or reliability problem that needs more than one call.",
    bullets: [
      "Useful when a critical flow is underperforming or ownership is unclear",
      "Works well for messy partner or API situations and recurring operational friction",
    ],
    outcome: "Outcome: root-cause analysis, key findings, and a practical action plan.",
  },
  {
    id: "strategy-sprint",
    name: "Reset a reactive roadmap",
    category: "sprint",
    tier: "core",
    priceInr: 64000,
    rateInrPerHour: 4000,
    hours: 16,
    originalPriceInr: 70000,
    tag: "8 hours/week for 2 weeks",
    featured: false,
    summary:
      "For startups that need better product direction and a more disciplined plan for what to build next.",
    bullets: [
      "Useful when there are too many competing priorities or the roadmap has gone reactive",
      "Helps when founders and teams aren't aligned on sequencing or near-term focus",
    ],
    outcome: "Outcome: a clearer roadmap, prioritization logic, and stronger execution focus.",
  },
  {
    id: "integration-readiness-sprint",
    name: "Integration readiness audit",
    category: "sprint",
    tier: "core",
    priceInr: 120000,
    rateInrPerHour: 4000,
    hours: 30,
    originalPriceInr: 125010,
    tag: "10 hours/week for 3 weeks",
    featured: false,
    summary:
      "For fintech and platform businesses working with brokers, payment systems, aggregators, RTAs, or other ecosystem partners.",
    bullets: [
      "Useful when integrations are slowing delivery or partner onboarding is painful",
      "Helps improve API and workflow design, rollout planning, and dependency mapping",
    ],
    outcome: "Outcome: an integration review, risk map, partner-workflow recommendations, and rollout clarity.",
  },
  {
    id: "reliability-sprint",
    name: "Reliability and error-reduction program",
    category: "sprint",
    tier: "core",
    priceInr: 144000,
    rateInrPerHour: 4000,
    hours: 36,
    originalPriceInr: 150000,
    tag: "9 hours/week for 4 weeks",
    featured: false,
    summary:
      "For startups where key user journeys such as onboarding, payments, or partner-led flows need to become more reliable.",
    bullets: [
      "Useful when the issue is broken execution, recurring incidents, or weak ownership",
      "Helps identify failure points and what should be fixed first, based on impact",
    ],
    outcome: "Outcome: a diagnostic view of failure areas, metrics, and a structured improvement plan.",
  },
  {
    id: "founder-advisory-retainer",
    name: "Founder advisory retainer",
    category: "monthly",
    tier: "core",
    priceInr: 80000,
    rateInrPerHour: 4000,
    hours: 20,
    originalPriceInr: 83340,
    tag: "Monthly · 20 hours/month",
    featured: false,
    summary:
      "For founders who want recurring access to a senior product and fintech operator without hiring full-time leadership yet.",
    bullets: [
      "Useful for regular support on roadmap choices, product reviews, and prioritization",
      "Includes continuity across decisions instead of one-off advice",
    ],
    outcome: "Outcome: recurring guidance, review sessions, async support, and a better decision-making rhythm.",
  },
  {
    id: "fractional-product-lead",
    name: "Fractional product lead",
    category: "monthly",
    tier: "core",
    priceInr: 160000,
    rateInrPerHour: 4000,
    hours: 40,
    originalPriceInr: 166680,
    tag: "Monthly · 40 hours/month",
    featured: false,
    summary:
      "For startups that need hands-on product leadership, not just strategic advice.",
    bullets: [
      "Useful when there's no strong in-house product lead yet",
      "Helps establish product rituals, prioritization structure, specs, and reviews",
    ],
    outcome: "Outcome: active involvement in roadmap, execution, alignment, and operating cadence.",
  },
  {
    id: "pm-coaching",
    name: "PM coaching and team enablement",
    category: "monthly",
    tier: "core",
    priceInr: 32000,
    rateInrPerHour: 4000,
    hours: 8,
    originalPriceInr: 33336,
    tag: "Monthly · 8 hours/month",
    featured: false,
    summary:
      "For founders, associate PMs, or product teams that want stronger product thinking and execution discipline.",
    bullets: [
      "Useful when PMs need mentoring or prioritization and documentation are weak",
      "Helps improve PM habits, communication quality, and product-engineering collaboration",
    ],
    outcome: "Outcome: coaching, working templates, and stronger PM capability over time.",
  },
  {
    id: "half-day-workshop",
    name: "Product workshop",
    category: "workshop",
    tier: "core",
    priceInr: 24000,
    rateInrPerHour: 4000,
    hours: 6,
    originalPriceInr: 30000,
    tag: "Workshop · 6 hours",
    featured: false,
    summary:
      "A short, high-focus session to solve one important product problem together with the team.",
    bullets: [
      "Useful for roadmap alignment, execution resets, and priority clarification",
      "Best for founder and cross-functional sessions that need facilitated discussion",
    ],
    outcome: "Outcome: team alignment, action points, and sharper next-step clarity.",
  },
  {
    id: "full-day-workshop",
    name: "Strategy offsite",
    category: "workshop",
    tier: "core",
    priceInr: 40000,
    rateInrPerHour: 4000,
    hours: 10,
    originalPriceInr: 45000,
    tag: "Workshop · 10 hours",
    featured: false,
    summary:
      "A deeper facilitated session for strategy, planning, and cross-functional product alignment.",
    bullets: [
      "Useful when the team needs a roadmap reset or a fintech execution planning session",
      "Best suited for founder, product, engineering, business, and operations stakeholders together",
    ],
    outcome: "Outcome: shared direction, clearer priorities, and a stronger execution path.",
  },
] as const;

/**
 * The hourly-rate ladder offered by the estimator, mirroring the effective
 * rates of the packages above. Lives here rather than in the component
 * because it is pricing data, not presentation.
 */
export const rateOptions = [
  { value: 5000, label: "5,000 · advisory / workshop" },
  { value: 4500, label: "4,500 · full-day workshop" },
  { value: 4375, label: "4,375 · strategy sprint" },
  { value: 4167, label: "4,167 · reliability sprint" },
  { value: 4000, label: "4,000 · standard sprint / retainer" },
  { value: 3750, label: "3,750 · coaching" },
] as const;

/** The estimator's starting rate — the most common one across packages. */
export const defaultRateInr = 4000;

export const entryPackages: readonly ConsultingPackage[] = packages.filter(
  (p) => p.tier === "entry",
);
export const corePackages: readonly ConsultingPackage[] = packages.filter(
  (p) => p.tier === "core",
);

export function packageById(id: string): ConsultingPackage | undefined {
  return packages.find((p) => p.id === id);
}

/**
 * /for-individuals only. All placeholder values — see CLAIMS.md's
 * PLACEHOLDERS block once Phase 2 generates it. Owner supplies real
 * prices before launch.
 */
export const individualPackages: readonly ConsultingPackage[] = [
  {
    id: "individuals-intro-chat",
    name: "Career chat",
    category: "call",
    tier: "entry",
    priceInr: 0,
    rateInrPerHour: null,
    tag: "30 min · free",
    featured: false,
    summary:
      "A free call to talk through where you are and what you actually want next.",
    bullets: [
      "Useful when you're not sure whether you want a PM role or just a change",
      "No prep, no pitch — bring a question or bring the confusion",
    ],
    outcome:
      "Outcome: a clearer read on your next step, and an honest answer on whether any of the paid options below would help.",
  },
  {
    id: "individuals-resume-review",
    name: "Resume review",
    category: "call",
    tier: "core",
    priceInr: 500,
    rateInrPerHour: null,
    tag: "Two passes · 24-hour turnaround each",
    featured: false,
    summary:
      "Two full passes over your resume — I review, you revise, I check the final version.",
    bullets: [
      "First pass: written feedback on positioning, structure, and which lines are doing no work",
      "Second pass: I re-read your revision and tell you whether it's ready. Further rounds need a new booking",
    ],
    outcome:
      "Outcome: a resume that survives a recruiter screen, and a clear account of what was weak and why.",
  },
  {
    id: "individuals-mock-interview",
    name: "Mock PM interview",
    category: "call",
    tier: "core",
    priceInr: 500,
    rateInrPerHour: null,
    tag: "60 min · priced by level",
    featured: false,
    priceTiers: [
      { label: "Breaking into APM", priceInr: 500 },
      { label: "APM practising for PM", priceInr: 1000 },
      { label: "Working PM or SPM", priceInr: 1500 },
    ],
    summary:
      "A realistic 60-minute round at your level, followed by written feedback within 24 hours.",
    bullets: [
      "Priced by where you actually are, so the questions match the bar you're being held to",
      "Feedback is honest rather than encouraging — what worked, what didn't, and what to change",
    ],
    outcome:
      "Outcome: a real read on where you stand, and specific things to fix before the round that counts.",
  },
  {
    id: "individuals-career-coaching",
    name: "SDE→PM / APM→PM coaching",
    category: "monthly",
    tier: "core",
    priceInr: 3500,
    rateInrPerHour: 1750,
    tag: "2 × 1-hour sessions · mock interview included",
    featured: true,
    summary:
      "Two hours of coaching on your specific transition, plus a mock interview at no extra cost.",
    bullets: [
      "Two one-hour sessions on your actual situation and gaps — not a generic PM curriculum",
      "Includes a free mock interview with written feedback inside 24 hours",
    ],
    outcome:
      "Outcome: a concrete path from where you are to a PM role, and practice at the part that decides it.",
  },
] as const;
