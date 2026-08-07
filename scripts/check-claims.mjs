#!/usr/bin/env node
/**
 * Runs in `prebuild`, so Vercel enforces it on every deployment.
 *
 * Fails the build when:
 *   1. A <Claim id="..."/> references an id that is not registered.
 *   2. A registered claim is on no page and is not marked `reserved`.
 *   3. CLAIMS.md is stale relative to lib/claims.ts / lib/packages.ts.
 *
 * (3) is the one that actually prevents drift: you cannot merge a claim change
 * without regenerating the manifest, so the review surface is never out of date.
 *
 * Warns (never fails) on claims not re-verified in over a year.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { ROOT, readClaims, sourceFiles, readSource } from "./lib/read-data.mjs";
import { buildManifest } from "./build-claims-manifest.mjs";

const errors = [];
const warnings = [];

const claims = readClaims();
const registered = new Set(claims.map((c) => c.id));
const used = new Map();

for (const file of sourceFiles()) {
  if (file === "components/content/Claim.tsx") continue;
  readSource(file)
    .split("\n")
    .forEach((line, i) => {
      for (const m of line.matchAll(/<Claim\s+id="([^"]+)"/g)) {
        const id = m[1];
        if (!used.has(id)) used.set(id, []);
        used.get(id).push(`${file}:${i + 1}`);
        if (!registered.has(id)) {
          errors.push(`${file}:${i + 1}  unknown claim id "${id}" - not in lib/claims.ts`);
        }
      }
    });
}

for (const claim of claims) {
  if (!used.has(claim.id) && !claim.reserved) {
    errors.push(
      `lib/claims.ts  claim "${claim.id}" is registered but on no page - place it, or mark it \`reserved: true\``,
    );
  }
  const ageDays = (Date.now() - Date.parse(claim.verifiedOn)) / 86_400_000;
  if (ageDays > 365) {
    warnings.push(`claim "${claim.id}" last verified ${Math.round(ageDays)} days ago`);
  }
}

// --- the anti-drift gate ---
const manifestPath = join(ROOT, "CLAIMS.md");
if (!existsSync(manifestPath)) {
  errors.push("CLAIMS.md is missing - run `npm run claims:build`");
} else if (readFileSync(manifestPath, "utf8") !== buildManifest()) {
  errors.push(
    "CLAIMS.md is stale - lib/claims.ts or lib/packages.ts changed. Run `npm run claims:build` and commit the result.",
  );
}

for (const w of warnings) console.warn(`warning  ${w}`);

if (errors.length) {
  console.error(`\ncheck-claims: ${errors.length} problem(s)\n`);
  for (const e of errors) console.error(`  ${e}`);
  console.error("");
  process.exit(1);
}

console.log(
  `check-claims: ok - ${claims.length} registered, ${used.size} rendered, ${warnings.length} warning(s)`,
);
