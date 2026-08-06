/**
 * Every factual claim published on the site lives here and renders only
 * through <Claim id="..." />. Pages never type a metric as literal text.
 *
 * This file seeds the uncontroversial, settled metrics needed for Phase 1's
 * structural build (the homepage proof line, service-page context). Phase 2
 * adds the full registry plus three claims flagged for owner review before
 * they can be marked public-safe — see the Phase 2 plan.
 *
 * `CLAIMS.md` at repo root is GENERATED from this file in Phase 2
 * (scripts/build-claims-manifest.mjs) — never hand-edit it.
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
  reviewNote?: string;
}

export const claims = [
  {
    id: "users-reached",
    kind: "scale",
    text: "10M+ investors reached",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
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
      row: "corrected 2026-07-28 from a prior 19",
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
      row: "#2",
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
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "orders-per-month",
    kind: "scale",
    text: "2.5–4M orders processed monthly",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "sip-success",
    kind: "delta",
    text: "SIP success rate ~35% → ~85%",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
      row: "#1",
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "error-rate",
    kind: "delta",
    text: "Platform error rate ~30% → ~7%",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
      row: "#3",
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "support-tat",
    kind: "delta",
    text: "Support ticket turnaround down ~85%",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
      row: "#3",
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "mf-onboarding-conversion",
    kind: "delta",
    text: "Mutual-fund onboarding conversion ~60% → ~85%",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
      row: "#5",
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "mf-aum",
    kind: "scale",
    text: "~₹40,000 crore AUM across 48 live AMCs",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
      row: "#5",
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "transaction-value",
    kind: "scale",
    text: "~₹90,000 crore cumulative transaction value",
    source: {
      repo: "whoami",
      file: "WORK.md",
      section: "§5 Quantified Impact — Metrics Bank",
    },
    verifiedOn: "2026-08-06",
  },
  {
    id: "tenure",
    kind: "tenure",
    text: "~7 years building tech products",
    source: {
      repo: "whoami",
      file: "REBRAND.md",
      section: "§4",
      row: "supersedes the stale '6.5 years' phrasing",
    },
    verifiedOn: "2026-08-06",
  },
] as const satisfies readonly Claim[];

export type ClaimId = (typeof claims)[number]["id"];

export function claimById(id: ClaimId): Claim {
  const claim = claims.find((c) => c.id === id);
  if (!claim) throw new Error(`Unknown claim id: ${id}`);
  return claim;
}
