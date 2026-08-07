import { packageById, type ConsultingPackage } from "./packages";

/**
 * Three tiers, not twelve cards.
 *
 * Price Intelligently's data across 512 companies found three packages
 * produced ~30% higher ARPU than five or more, and the consensus B2B
 * guidance is that past 3–4 options buyers default to the cheapest or
 * abandon entirely. The closest comparable in this exact niche
 * (thefractionalproductmanager.com) ships exactly three. /services ships
 * twelve, to cold traffic. See §2.3 of
 * docs/PRICING-REVAMP-INDIA-VS-INTERNATIONAL.md.
 *
 * The key structural insight is tier 2: `strategy-sprint`,
 * `integration-readiness-sprint` and `reliability-sprint` are *one product
 * with three subject matters* — same shape, same delivery, 16–36 hours.
 * They belong in one card as focus areas, not as three tiles competing with
 * each other.
 *
 * Nothing is deleted from lib/packages.ts. Every SKU keeps its entry, price
 * and hours; this file only decides how they are grouped on the page. That
 * keeps CLAIMS.md, the coupon maths and the currency renderer untouched.
 */
export interface Tier {
  id: string;
  /** "01" — the ladder is the point, so the step number is explicit. */
  step: string;
  name: string;
  /** One line on what this tier is for. */
  headline: string;
  /** The package whose price anchors the tier. Cheapest, when several. */
  anchorId: string;
  /** Every package presented inside this tier, anchor first. */
  packageIds: readonly string[];
  /** Set when the tier holds several options — renders a "from" price. */
  optionsLabel?: string;
  /** Who this is for, in their words not ours. */
  bestFor: string;
  /** What the buyer actually receives. */
  includes: readonly string[];
  /** True for the tier most buyers should land on. */
  featured?: boolean;
}

export const tiers: readonly Tier[] = [
  {
    id: "diagnose",
    step: "01",
    name: "Diagnose",
    headline: "Find out what is actually wrong, with evidence.",
    anchorId: "deep-dive-diagnostic",
    packageIds: ["deep-dive-diagnostic"],
    bestFor:
      "You know something is broken, but not what — and the team disagrees about where to look.",
    includes: [
      "A root-cause finding, with the evidence behind it, in writing",
      "A prioritised action plan your team can run without me",
    ],
  },
  {
    id: "fix",
    step: "02",
    name: "Fix",
    headline: "One focused sprint on the thing that is costing you most.",
    anchorId: "strategy-sprint",
    packageIds: [
      "strategy-sprint",
      "integration-readiness-sprint",
      "reliability-sprint",
    ],
    optionsLabel: "Choose a focus",
    bestFor:
      "The problem is scoped, and you need someone to run the fix, not advise from the sidelines.",
    includes: [
      "A fixed-scope sprint, a named focus, a defined end date",
      "Working artefacts your team owns after I leave — not a slide deck",
    ],
    featured: true,
  },
  {
    id: "embed",
    step: "03",
    name: "Embed",
    headline: "Senior product leadership, monthly, without the full-time hire.",
    anchorId: "founder-advisory-retainer",
    packageIds: ["founder-advisory-retainer", "fractional-product-lead"],
    optionsLabel: "Choose a depth",
    bestFor:
      "There's no strong in-house product lead yet, and decisions are piling up in the founder's inbox.",
    includes: [
      "Ongoing ownership of roadmap, prioritisation, and operating cadence",
      "A monthly commitment — stop at the end of any month, no minimum term",
    ],
  },
];

/** Everything that is real, useful, and not one of the three main steps. */
export const secondaryPackageIds: readonly string[] = [
  "intro-call",
  "pm-coaching",
  "half-day-workshop",
  "full-day-workshop",
];

export function tierPackages(tier: Tier): ConsultingPackage[] {
  return tier.packageIds
    .map(packageById)
    .filter((p): p is ConsultingPackage => Boolean(p));
}

export function tierAnchor(tier: Tier): ConsultingPackage | undefined {
  return packageById(tier.anchorId);
}
