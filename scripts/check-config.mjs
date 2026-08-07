#!/usr/bin/env node
/**
 * Runs in `prebuild`, so Vercel enforces it on every deployment - a hardcoded
 * email or price can never reach production.
 *
 * Rule: app/ and components/ may not contain contact details, external URLs,
 * or currency literals. Those belong in lib/site.ts, lib/packages.ts, or
 * lib/claims.ts, so changing one value changes it everywhere.
 *
 * Also asserts at most one primary CTA per page, and warns when the manually
 * maintained FX rate is going stale.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ROOT, sourceFiles, readSource } from "./lib/read-data.mjs";

const ALLOWLIST = new Set([
  "lib/site.ts",
  "lib/packages.ts",
  "lib/claims.ts",
  // Vendor integration. The app.cal.com script URL and the cal.com embed
  // origin are part of Cal.com's embed protocol, not site configuration -
  // they change when Cal.com changes, not when Kartikeya's details do.
  // Which booking page to open still comes from siteConfig.booking.calUrl.
  "components/content/CalEmbed.tsx",
]);

const RULES = [
  {
    name: "email-literal",
    re: /[\w.%+-]+@[\w.-]+\.\w{2,}/,
    hint: "use siteConfig.contact.email",
  },
  {
    name: "phone-literal",
    re: /\+91[\s-]?\d/,
    hint: "use siteConfig.contact.phone",
  },
  {
    name: "external-url",
    re: /https?:\/\/(?:docs\.google|[\w.-]*linkedin\.com|github\.com|cal\.com|app\.cal\.com)/,
    hint: "use siteConfig.social.* or siteConfig.booking.*",
  },
  {
    name: "rupee-literal",
    re: /₹\s?\d/,
    hint: "use formatPrice() / formatInr() from lib/format.ts",
  },
];

// Numbers that are legitimately structural rather than data.
const NUMBER_EXEMPT =
  /viewBox|^\s*d="|stroke|\bpath\b|#[0-9a-f]{3,8}\b|20\d\d-\d\d-\d\d|max-w-|min-h-|\bh-\d|\bw-\d|height|width|\bzIndex\b|\bkey=|\bconst\s+[A-Z][A-Z0-9_]*\s*=/;

const errors = [];
const warnings = [];

for (const file of sourceFiles()) {
  if (ALLOWLIST.has(file)) continue;
  const lines = readSource(file).split("\n");

  lines.forEach((line, i) => {
    const at = `${file}:${i + 1}`;
    for (const rule of RULES) {
      const m = line.match(rule.re);
      if (m) errors.push(`${at}  [${rule.name}] ${m[0].trim()} - ${rule.hint}`);
    }

    // Bare 4+ digit integers, e.g. a price pasted into JSX.
    if (!NUMBER_EXEMPT.test(line)) {
      const m = line.match(/(?<![\w.#-])\d{4,}(?![\w.-])/);
      if (m) {
        warnings.push(`${at}  [bare-number] ${m[0]} - should this come from lib/?`);
      }
    }
  });

  // --- CTA rules ---
  //
  // Counted by inspecting <CtaLink> elements and their `variant`, NOT by
  // grepping for data-cta="primary". CtaLink emits that attribute at
  // runtime, so the literal string appears only inside CtaLink.tsx - a
  // source grep would silently pass on every file and check nothing.
  const primaryCtas = countPrimaryCtas(readSource(file));

  // At most one primary CTA per page.
  if (/^app\/.*page\.tsx$/.test(file) && primaryCtas > 1) {
    errors.push(
      `${file}  [multi-cta] ${primaryCtas} primary CTAs - a page may have at most one`,
    );
  }

  // None at all in site-wide chrome: a primary CTA in the header or footer
  // would add a second one to *every* page. The footer's booking link is
  // deliberately variant="secondary".
  if (/^components\/layout\//.test(file) && primaryCtas > 0) {
    errors.push(
      `${file}  [chrome-cta] ${primaryCtas} primary CTA(s) in site-wide chrome - this doubles every page's CTA. Use variant="secondary".`,
    );
  }
}

/**
 * CtaLink defaults to variant="primary", so any usage that does not
 * explicitly opt into "secondary" counts as a primary.
 */
function countPrimaryCtas(src) {
  const tags = src.match(/<CtaLink[\s\S]*?>/g) || [];
  return tags.filter((tag) => !/variant\s*=\s*"secondary"/.test(tag)).length;
}

// --- brand sync ---
// app/icon.svg is a static file, so it cannot import lib/logo.ts like the
// header mark and the OG image do. Assert its path data matches instead -
// the same "derived or verified, never hand-synced" rule as CLAIMS.md.
// Only stroke-width and a wrapping transform differ between surfaces, so
// verbatim `d` matching is exactly the right assertion.
const logoSrc = readFileSync(join(ROOT, "lib/logo.ts"), "utf8");
const iconSrc = readFileSync(join(ROOT, "app/icon.svg"), "utf8");
const logoPaths = [...logoSrc.matchAll(/^\s*"(M[^"]+)",/gm)].map((m) => m[1]);

if (logoPaths.length === 0) {
  errors.push("lib/logo.ts  [brand] no paths parsed - the gate is checking nothing");
}
for (const d of logoPaths) {
  if (!iconSrc.includes(d)) {
    errors.push(
      `app/icon.svg  [brand-drift] missing path from lib/logo.ts: ${d} - the favicon no longer matches the logo`,
    );
  }
}

// FX staleness - a warning, never a failure. A hard error here would break a
// deploy months from now for a reason nobody is awake to fix.
const site = readFileSync(join(ROOT, "lib/site.ts"), "utf8");
const rateAsOf = site.match(/rateAsOf:\s*"([\d-]+)"/)?.[1];
const source = site.match(/source:\s*"(\w+)"/)?.[1];
if (rateAsOf) {
  const days = Math.round((Date.now() - Date.parse(rateAsOf)) / 86_400_000);
  if (days > 180 && source !== "live") {
    warnings.push(
      `lib/site.ts  [fx-stale] INR/USD rate set ${days} days ago and still manual - re-check it`,
    );
  }
}

for (const w of warnings) console.warn(`warning  ${w}`);

if (errors.length) {
  console.error(`\ncheck-config: ${errors.length} problem(s)\n`);
  for (const e of errors) console.error(`  ${e}`);
  console.error("");
  process.exit(1);
}

console.log(`check-config: ok - ${warnings.length} warning(s)`);
