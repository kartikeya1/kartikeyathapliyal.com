/**
 * The three objection-handling sections the research found on the closest
 * comparable and missing here: problem scenarios (self-qualification before
 * price), a first-30-days breakdown (makes an abstract service concrete),
 * and an FAQ (handles objections without needing a call).
 *
 * All static copy — no new mechanism. See §4 of
 * docs/PRICING-REVAMP-INDIA-VS-INTERNATIONAL.md.
 */

/** "You are probably here because…" — shown above pricing, on purpose. */
export interface Scenario {
  id: string;
  situation: string;
  detail: string;
  /** Which tier this situation points at. */
  tierId: string;
}

export const scenarios: readonly Scenario[] = [
  {
    id: "unclear-failure",
    situation: "A critical flow is underperforming and nobody agrees why",
    detail:
      "Onboarding, payments, or a partner-led journey is leaking users, and every function has a different theory about the cause.",
    tierId: "diagnose",
  },
  {
    id: "integration-drag",
    situation: "Integrations are setting the pace instead of the roadmap",
    detail:
      "Brokers, payment systems, aggregators or RTAs are slowing delivery, and partner onboarding takes longer every time.",
    tierId: "fix",
  },
  {
    id: "reactive-roadmap",
    situation: "The roadmap has gone reactive",
    detail:
      "Priorities shift faster than the team can execute, and sequencing is decided by whoever asked most recently.",
    tierId: "fix",
  },
  {
    id: "founder-bottleneck",
    situation: "Every product decision routes through the founder",
    detail:
      "There is no senior product owner yet, hiring one is months away, and decisions are queueing in the meantime.",
    tierId: "embed",
  },
];

/** What the first month actually looks like — the risk-killer section. */
export interface Milestone {
  id: string;
  when: string;
  what: string;
  output: string;
}

export const firstThirtyDays: readonly Milestone[] = [
  {
    id: "week-1",
    when: "Week 1",
    what: "Read the system, not the summary. Sessions with product, engineering, and whoever owns the partner relationships.",
    output: "A written problem statement you either agree with or correct.",
  },
  {
    id: "week-2",
    when: "Week 2",
    what: "Instrument and evidence. Establish what the data actually says about where the flow fails and what it costs.",
    output: "Findings with the evidence attached, ranked by impact.",
  },
  {
    id: "weeks-3-4",
    when: "Weeks 3–4",
    what: "Sequence and start. Specs for the first fixes, dependencies mapped, and the first change in flight.",
    output: "A plan the team owns, and visible movement on the top item.",
  },
];

export interface FaqItem {
  id: string;
  q: string;
  a: string;
}

export const faq: readonly FaqItem[] = [
  {
    id: "why-two-prices",
    q: "Why do India and international prices differ?",
    a: "Because they are different markets, not the same price in two currencies. Indian and international consulting rates genuinely differ by a factor of two to three, and quoting one converted number to both would be wrong for one of them. Each list is priced for its own market and billed in its own currency.",
  },
  {
    id: "what-do-i-get",
    q: "What do I actually receive?",
    a: "Working artefacts — findings documents with evidence, specs, sequencing plans, risk and dependency maps. Not a strategy deck. Everything is written down well enough that your team can execute it after the engagement ends.",
  },
  {
    id: "not-working",
    q: "What if it is not working out?",
    a: "Sprints are fixed-scope with a defined end date, so the exposure is bounded from the start. Monthly engagements can be stopped at the end of any month, with no notice period and no minimum term beyond the month in progress.",
  },
  {
    id: "existing-team",
    q: "Will you work with the product people we already have?",
    a: "Yes, and that is usually the better outcome. The aim is a team that does not need me afterwards, which means working through your existing PMs and engineers rather than around them.",
  },
  {
    id: "after-handover",
    q: "Do you disappear after handover?",
    a: "No. Follow-through past the point of handing over requirements is the thing colleagues most consistently say about working with me, and it is quoted on this site by name.",
  },
  {
    id: "nda",
    q: "Will you sign an NDA?",
    a: "Yes, before anything substantive is shared. Fintech work involves partner terms and unreleased roadmaps, and that is the normal starting point rather than a special request.",
  },
  {
    id: "how-fast",
    q: "How quickly can you start?",
    a: "A fit call can usually happen within a few days. Sprints and retainers start at the beginning of a week, subject to current commitments — the fit call is the fastest way to get a real answer on timing.",
  },
  {
    id: "coupons",
    q: "Do discount codes apply to both regions?",
    a: "Yes. A code discounts against the pre-discount anchor price in whichever region you are viewing, and stacks with the standing discount already shown.",
  },
];
