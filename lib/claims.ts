/**
 * Every factual claim published on the site lives here and renders only
 * through <Claim id="..." />. Pages never type a metric as literal text.
 *
 * `CLAIMS.md` at repo root is GENERATED from this file by
 * scripts/build-claims-manifest.mjs — never hand-edit it. scripts/check-claims.mjs
 * runs in `prebuild` and fails the build if the manifest is stale, so a claim
 * change cannot merge without a regenerated manifest.
 *
 * Source of truth is the private `whoami` repo. Per that repo's AGENTS.md,
 * CLAIMS.md carries file + section references but NEVER a verbatim quote —
 * this repo is public and the source is not.
 */
export type ClaimKind = "metric" | "delta" | "scale" | "entity" | "tenure";

export interface Claim {
  id: string;
  kind: ClaimKind;
  /** Exactly the string that renders on the site. Nothing else may render it. */
  text: string;
  source: {
    repo: "whoami";
    file: string;
    section: string;
    row?: string;
  };
  verifiedOn: string;
  /**
   * A flag raised for the owner's explicit decision. Surfaced prominently in
   * CLAIMS.md. Presence of this field does not block the build — the owner's
   * sign-off is the control, not a script.
   */
  reviewNote?: string;
  /** Registered but not yet placed on a page. Exempt from the unused check. */
  reserved?: true;
}

export const claims = [
  // ---------------------------------------------------------------- scale
  {
    id: "users-reached",
    kind: "scale",
    text: "10M+ investors",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
      row: "Users reached",
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "broker-count",
    kind: "scale",
    text: "22 broker integrations",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
      row: "Market coverage / §19 corrected 28 Jul 2026 from a prior 19",
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "market-coverage",
    kind: "scale",
    text: "~90–95% of India's active retail broking accounts",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
      row: "Market coverage",
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "uptime",
    kind: "metric",
    text: "99.99% platform uptime",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
      row: "Platform uptime",
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "orders-per-month",
    kind: "scale",
    text: "2.5–4M orders a month",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
      row: "Orders processed",
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "transaction-value",
    kind: "scale",
    text: "₹90,000 crore+ in cumulative transaction value",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
      row: "Cumulative transaction value",
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "mf-aum",
    kind: "scale",
    text: "~₹40,000 crore in mutual-fund AUM across 48 live AMCs",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
      row: "MF EOP backbone",
    },
    verifiedOn: "2026-08-06",
  },

  // ---------------------------------------------------------------- deltas
  {
    id: "sip-success",
    kind: "delta",
    text: "SIP success rate from ~35% to ~85%",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
      row: "SIP success rate",
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "error-rate",
    kind: "delta",
    text: "platform error rates from ~30% to ~7%",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
      row: "Platform error rate",
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "support-tat",
    kind: "delta",
    text: "support-ticket turnaround down ~85%, with 95% resolved in under 12 hours",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
      row: "Support-ticket TAT",
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "mf-onboarding-conversion",
    kind: "delta",
    text: "mutual-fund onboarding conversion from ~60% to ~85%",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
      row: "AA + BAV",
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "organic-activation",
    kind: "delta",
    text: "organic new-user activation from ~30k to 100k+ a month at near-zero acquisition cost",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
      row: "Organic new-user activation",
    },
    verifiedOn: "2026-08-06",
  },

  // ------------------------------------------------- delivery / leadership
  {
    id: "sbi-integration",
    kind: "entity",
    text: "Delivered SBI Securities as an end-to-end 0→1 bank-broker integration in ~4 sprints, now ~2.5M onboarded users",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Signature Accomplishments",
      row: "#4",
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "amc-agreements",
    kind: "metric",
    text: "48+ AMC legal agreements, including due diligence and commercial negotiation",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
      row: "AMC agreements",
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "compliance-audits",
    kind: "metric",
    text: "InfoSec, AppSec, DPDPA and TPRM audits across four cycles a year",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
      row: "Compliance audits",
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "prds",
    kind: "metric",
    text: "30+ PRDs, system flows, and API contracts",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
      row: "PRDs / workflow docs",
    },
    verifiedOn: "2026-08-06",
    reserved: true,
  },
  {
    id: "people-leadership",
    kind: "metric",
    text: "3 direct reports and 5 PMs mentored, across a ~35-person cross-functional program",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
      row: "People leadership",
    },
    verifiedOn: "2026-08-06",
    reserved: true,
  },

  // ---------------------------------------------------------------- tenure
  {
    id: "tenure",
    kind: "tenure",
    text: "~7 years building tech products — 2 in engineering, 5 in product",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§1 Snapshot / REBRAND.md §4",
      row: "supersedes the stale '6.5 years' figure, per §19",
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "employer-smallcase",
    kind: "entity",
    text: "smallcase, July 2021 to July 2026, most recently as Product Manager II",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§3 Career Timeline",
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "engineering-background",
    kind: "entity",
    text: "two years as a professional software engineer before moving into product",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§2 Positioning Statement / §4.2",
    },
    verifiedOn: "2026-08-06",
    reserved: true,
  },

  // ------------------------------------------------------- FLAGGED FOR REVIEW
  {
    id: "legacy-uptime",
    kind: "delta",
    text: "Lifted a legacy broker platform from ~75% to 99.99% uptime while migrating ~2.5M users, in about two sprints",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Signature Accomplishments",
      row: "#2 (Kotak and Axis legacy decommissioning)",
    },
    verifiedOn: "2026-08-06",
    reviewNote:
      "DECIDE: attribution. This is currently written UNATTRIBUTED. The source names Kotak (~75%→99.99%) and Axis (~90%→99.99%). Publishing a named bank's historical uptime as ~75% publicly attributes poor reliability to a partner you integrated with under contract — a reputational and possibly contractual exposure that carries no extra persuasive weight, since the unattributed version proves the same capability. Recommendation: keep unattributed. You approved naming companies generally; this is the one case where I'd still advise against it.",
  },
  {
    id: "cac",
    kind: "delta",
    text: "blended acquisition cost from ~₹1,350 to ~₹750 per user",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
      row: "Blended CAC",
    },
    verifiedOn: "2026-08-06",
    reserved: true,
    reviewNote:
      "DECIDE: whoami/WORK.md §19 'Do NOT include in any public-facing output' names undisclosed production metrics. Blended CAC is a former employer's internal unit economics, not your own. You cleared everything except compensation, so this is registered — but held off every page until you confirm you're comfortable publishing a previous employer's CAC figures.",
  },
  {
    id: "sbi-revenue",
    kind: "metric",
    text: "~₹2 crore a year in revenue, growing ~25% year on year",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Signature Accomplishments",
      row: "#4 (SBI Securities integration)",
    },
    verifiedOn: "2026-08-06",
    reserved: true,
    reviewNote:
      "DECIDE — HIGHEST RISK OF THE THREE. whoami/WORK.md §19 explicitly lists 'confidential broker commercial terms' as never-publish, and this is partner revenue from a named bank-broker relationship. Registered per your instruction but deliberately NOT placed on any page yet, so it ships nothing until you say so. Recommendation: leave it off.",
  },
] as const satisfies readonly Claim[];

export type ClaimId = (typeof claims)[number]["id"];

export function claimById(id: ClaimId): Claim {
  const claim = claims.find((c) => c.id === id);
  if (!claim) throw new Error(`Unknown claim id: ${id}`);
  return claim;
}
