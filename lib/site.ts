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
    /**
     * Build-time fallback. Every price is server-rendered with this so the
     * page is correct with JavaScript disabled and for crawlers; the client
     * then refines it with a live rate.
     */
    inrPerUsd: 90,
    rateAsOf: "2026-08-06",
    source: "manual",
    /** USD figures round to the nearest multiple of this above $100. */
    usdRounding: 10,

    /**
     * Live rate sources, in order. Both are free, keyless and CORS-enabled -
     * verified. Yahoo and Google Finance cannot be used: neither sends
     * Access-Control-Allow-Origin, so a browser request is blocked outright
     * (Yahoo also rate-limits to 429).
     *
     * Both publish once daily, so the UI says "as of" rather than implying a
     * live market feed.
     */
    /**
     * Coupon codes live in a Google Sheet so they can be added or retired
     * without a redeploy. Columns: Code | Discount | Active.
     *
     * gviz rather than the CSV `export` endpoint - export 307-redirects to a
     * googleusercontent.com host, gviz answers directly with CORS. Verified.
     *
     * `Discount` arrives as a number: "10%" in the sheet parses to 0.1.
     *
     * The sheet must stay shared as "Anyone with the link - Viewer". If it's
     * ever set back to restricted, coupons silently stop resolving and
     * everyone pays base price.
     *
     * Codes here are readable by anyone who opens DevTools - this is a
     * deliberate trade for 5-10% discounts and no backend. Don't put
     * anything in that sheet you wouldn't publish.
     */
    couponsUrl:
      "https://docs.google.com/spreadsheets/d/1OMNzEk5DgnZWiOwlBZc814cbQDeA6A9K1nO9Ks2pZqc/gviz/tq?tqx=out:json&gid=0",

    fx: {
      primaryUrl: "https://open.er-api.com/v6/latest/USD",
      fallbackUrl:
        "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json",
      /** How long a fetched rate is reused before refetching. */
      cacheHours: 12,
    },
  },

  /** Primary nav - topics. Rendered left, next to the brand. */
  nav: [
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
  ],

  /**
   * Audience switch, not a topic - so it sits right, with the theme toggle,
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
