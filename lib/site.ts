/**
 * The single source of truth for everything the site says about how to reach
 * Kartikeya, what it costs, and where it lives.
 *
 * Nothing in `app/` or `components/` may hardcode an email, a phone number, a
 * URL, or a currency figure. From Phase 2 onward `scripts/check-config.mjs`
 * enforces that in `prebuild`, so a stray literal fails the Vercel build.
 */
export const siteConfig = {
  name: "Kartikeya Thapliyal",
  role: "Product & fintech consultant",
  positioning:
    "I help fintech and platform teams ship integrations that hold up in production.",

  /** Swap this one value when the custom domain is attached in Vercel. */
  url: "https://kartikeyathapliyalcom.vercel.app",
  locale: "en_IN",

  contact: {
    email: "kartikeya.thapliyal.work@gmail.com",
    phone: "+91 8088033870",
  },

  social: {
    linkedin: "https://www.linkedin.com/in/kartikeyathapliyal",
    github: "https://github.com/kartikeya1",
  },

  booking: {
    /** The ?embedded=true variant is required for the iframe. */
    formEmbedUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSf3Vm1UgtyiVZNv3ikTodsnu_Hfu8MJPkloWbBCMkhkD3W3-w/viewform?embedded=true",
    /** Same form, link-out variant, for no-JS and for people who prefer a tab. */
    formUrl:
      "https://docs.google.com/forms/d/e/1FAIpQLSf3Vm1UgtyiVZNv3ikTodsnu_Hfu8MJPkloWbBCMkhkD3W3-w/viewform",
    calUrl: "https://cal.com/kartikeyathapliyal/30min",
  },

  currency: {
    /** Every ~$ figure on the site is computed from this at build time. */
    inrPerUsd: 90,
    rateAsOf: "2026-08-06",
    /** Becomes "live" if a future project fetches the rate instead. */
    source: "manual",
    /** USD figures round to the nearest multiple of this. */
    usdRounding: 10,
  },

  /** Primary nav — topics. Rendered left, next to the brand. */
  nav: [
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
  ],

  /**
   * Audience switch, not a topic — so it sits right, with the theme toggle,
   * rather than among the primary nav items. `shortLabel` is what renders
   * below the `sm` breakpoint, where the full label would push the theme
   * toggle past the gutter.
   */
  utilityNav: [
    {
      href: "/for-individuals",
      label: "For individuals",
      shortLabel: "Individuals",
    },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
