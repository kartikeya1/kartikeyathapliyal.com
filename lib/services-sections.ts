/**
 * The three objection-handling sections the research found on the closest
 * comparable and missing here: problem scenarios (self-qualification before
 * price), a first-30-days breakdown (makes an abstract service concrete),
 * and an FAQ (handles objections without needing a call).
 *
 * All static copy - no new mechanism. See §4 of
 * docs/PRICING-REVAMP-INDIA-VS-INTERNATIONAL.md.
 */

/** "You are probably here because..." - shown above pricing, on purpose. */
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
    situation: "A key flow is underperforming and nobody agrees why",
    detail:
      "Onboarding or checkout is leaking users, and every team has a different theory about the cause.",
    tierId: "diagnose",
  },
  {
    id: "integration-drag",
    situation: "Third-party integrations are setting your pace, not your roadmap",
    detail:
      "Payment processors, data providers, or brokerage partners keep taking longer than planned, and each new one is slower than the last.",
    tierId: "fix",
  },
  {
    id: "reactive-roadmap",
    situation: "The roadmap has gone reactive",
    detail:
      "Priorities shift faster than the team can execute, and sequencing gets decided by whoever asked most recently.",
    tierId: "fix",
  },
  {
    id: "founder-bottleneck",
    situation: "Every product decision routes through the founder",
    detail:
      "There is no senior product owner yet, hiring one is months away, and decisions are queuing in the meantime.",
    tierId: "embed",
  },
];

/** What the first month actually looks like - the risk-killer section. */
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
    when: "Weeks 3-4",
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
    id: "first-call",
    q: "What actually happens on the fit call?",
    a: "30 minutes. You describe the problem, I ask enough questions to know whether it's a one-call answer, a sprint, or something bigger - and say so directly. If it's a one-call answer, you get that on the call, free, whether or not you hire me. If it's more, you leave knowing exactly which engagement fits and why, not with a follow-up email to decode.",
  },
  {
    id: "what-do-i-get",
    q: "What does a findings document actually look like?",
    a: "A written root cause with the evidence behind it, not a hunch. A ranked list of what to fix and why that order. Specs, sequencing, and dependency maps where the engagement calls for them - working artefacts your team executes from, not a slide deck that gets skimmed once and archived.",
  },
  {
    id: "start-now",
    q: "How soon can you actually start?",
    a: "Often immediately. There's no notice period on my side, the same as there's none to leave - if the fit call goes well, work can begin as soon as you're ready. The exact date depends on what's already committed elsewhere, and the fit call is where we settle that in minutes, not over an email thread.",
  },
  {
    id: "not-working",
    q: "What if it is not working out?",
    a: "Sprints are fixed-scope with a defined end date, so the exposure is bounded from the start. Monthly engagements can be stopped at the end of any month - no notice period, no minimum term beyond the month already in progress.",
  },
  {
    id: "not-sure-which",
    q: "What if I'm not sure which tier fits?",
    a: "Say so on the fit call. Most people arrive certain they need one thing and leave booked for another, once the actual scope is clear. Sorting that out is the point of the free call, not something you're expected to know beforehand.",
  },
  {
    id: "why-not-hire",
    q: "Why not just hire a full-time product lead?",
    a: "Sometimes you should - this isn't a substitute for a strong in-house hire long-term. But a search takes months, a bad hire costs more than a year of this, and most teams don't know they need a full-time seat until someone senior has spent real time in the problem first. The calculator above runs the actual numbers for your situation.",
  },
  {
    id: "existing-team",
    q: "Will you work with the product people we already have?",
    a: "Yes, and that's usually the better outcome. The aim is a team that doesn't need me afterwards, which means working through your existing PMs and engineers rather than around them.",
  },
  {
    id: "after-handover",
    q: "Do you disappear after handover?",
    a: "No. Staying engaged through implementation and launch, not just requirements, is the thing colleagues most consistently say about working with me - quoted on this site by name, not paraphrased.",
  },
  {
    id: "nda",
    q: "Will you sign an NDA?",
    a: "Yes, before anything substantive is shared. Product and partner details are often sensitive - unreleased roadmaps, integration terms, sometimes financial data - and an NDA up front is the normal starting point, not a special request.",
  },
  {
    id: "why-two-prices",
    q: "Why do India and international prices differ?",
    a: "Because they're different markets, not the same price shown in two currencies. Consulting rates in India and internationally genuinely differ by a factor of two to three, and one converted number would misprice one of them. India pricing is set for the Indian market; pricing elsewhere follows the international rate for this level of work.",
  },
  {
    id: "coupons",
    q: "Do discount codes apply to both price lists?",
    a: "Yes. A code discounts against the pre-discount anchor price in whichever list you're viewing, and stacks with the standing discount already shown.",
  },
];
