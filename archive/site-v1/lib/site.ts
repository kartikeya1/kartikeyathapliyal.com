/**
 * Single source of truth for site-wide facts, links and placeholders.
 *
 * Every {{PLACEHOLDER}} below is meant to be replaced with a real URL
 * before (or after) going live. Search the codebase for "{{" to find
 * anything still pending.
 */
export const site = {
  name: "Kartikeya Thapliyal",
  url: "https://kartikeyathapliyal.com",
  title: "Kartikeya Thapliyal",
  tagline:
    "Product manager building products, platforms and internal systems that make complex ecosystems simpler.",
  description:
    "Kartikeya Thapliyal is a product manager who builds products, platforms and internal systems that make complex ecosystems simpler. Previously Product Manager II at smallcase (Aug 2023 - Jul 2026).",
  previously: {
    role: "Product Manager II",
    company: "smallcase",
    period: "Aug 2023 - Jul 2026",
  },
  links: {
    linkedin: "https://www.linkedin.com/in/kartikeyathapliyal",
    github: "https://github.com/kartikeya1",
    email: "kartikeyathapliyal@gmail.com",
    x: "https://x.com/CallMeKarti",
    instagram: "https://www.instagram.com/callme.karti",
  },
  // TODO: when the PDFs exist, drop them into /public (e.g. /resume-india.pdf)
  // and set these to the paths. null renders an "available on request" state.
  resumes: {
    india: null as string | null,
    sea: null as string | null,
  },
  // TODO: replace with a real booking link (e.g. Cal.com) and wire it up
  // in components/site/hero-actions and anywhere "Book Consultation" appears.
  booking: null as string | null,
};

export const navigation = [
  { href: "/", label: "Home" },
  { href: "/work", label: "Work" },
  { href: "/thinking", label: "Thinking" },
  { href: "/resume", label: "Resume" },
  { href: "/contact", label: "Contact" },
] as const;
