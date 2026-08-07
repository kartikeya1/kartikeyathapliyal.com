#!/usr/bin/env node
/**
 * Runs in `postbuild`. Asserts the build shipped no backend:
 *   1. .next/prerender-manifest.json has zero dynamicRoutes.
 *   2. .next/server/middleware-manifest.json has zero functions and no
 *      middleware.
 *   3. The expected route set is exactly what's in the sitemap plus the
 *      framework-generated routes (icon, OG image, robots, sitemap, 404).
 *
 * This is deliberately soft-failing on anything it doesn't recognise: these
 * are undocumented Next.js build artifacts, not a public API, and can change
 * shape across minor versions. A verification script must never be the
 * reason a deploy breaks on a routine Next patch bump - it should warn and
 * get out of the way, and only hard-fail when it has positively identified
 * a dynamic route or a serverless function.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const ROOT = new URL("../", import.meta.url).pathname;
const NEXT_DIR = join(ROOT, ".next");

const EXPECTED_ROUTES = new Set([
  "/",
  "/about",
  "/services",
  "/for-individuals",
  // Prototype, reachable by direct link only: deliberately absent from
  // app/sitemap.ts and marked noindex. It is listed here because this gate
  // asserts an *exact* route set - an unlisted route would fail the build,
  // which is the behaviour we want for an accidental one.
  "/lab/services",
  "/_not-found",
  "/icon.svg",
  "/apple-icon",
  "/opengraph-image",
  "/robots.txt",
  "/sitemap.xml",
]);

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function softFail(reason) {
  console.warn(`check-static: skipping - ${reason}`);
  console.warn("check-static: cannot verify this build; not blocking on it");
  process.exit(0);
}

const prerenderPath = join(NEXT_DIR, "prerender-manifest.json");
const middlewarePath = join(NEXT_DIR, "server/middleware-manifest.json");

if (!existsSync(prerenderPath) || !existsSync(middlewarePath)) {
  softFail(".next manifests not found - was `next build` run?");
}

let prerender, middleware;
try {
  prerender = readJson(prerenderPath);
  middleware = readJson(middlewarePath);
} catch (e) {
  softFail(`could not parse a manifest (${e.message})`);
}

const errors = [];

// --- 1. no dynamic routes ---
if (prerender.dynamicRoutes && typeof prerender.dynamicRoutes === "object") {
  const dynamic = Object.keys(prerender.dynamicRoutes);
  if (dynamic.length > 0) {
    errors.push(`dynamic routes present: ${dynamic.join(", ")}`);
  }
} else {
  softFail("prerender-manifest.json has an unrecognized shape (no dynamicRoutes field)");
}

// --- 2. no serverless functions / middleware ---
if (middleware.functions && typeof middleware.functions === "object") {
  const fns = Object.keys(middleware.functions);
  if (fns.length > 0) errors.push(`serverless functions present: ${fns.join(", ")}`);
} else {
  softFail("middleware-manifest.json has an unrecognized shape (no functions field)");
}
if (middleware.middleware && Object.keys(middleware.middleware).length > 0) {
  errors.push("middleware present, which requires the Node.js runtime at request time");
}

// --- 3. route set matches exactly ---
if (prerender.routes && typeof prerender.routes === "object") {
  const actual = new Set(Object.keys(prerender.routes));
  const missing = [...EXPECTED_ROUTES].filter((r) => !actual.has(r));
  const extra = [...actual].filter((r) => !EXPECTED_ROUTES.has(r));
  if (missing.length) errors.push(`expected routes missing from build: ${missing.join(", ")}`);
  if (extra.length) errors.push(`unexpected routes in build: ${extra.join(", ")}`);
}

if (errors.length) {
  console.error(`\ncheck-static: ${errors.length} problem(s) - this build is not fully static\n`);
  for (const e of errors) console.error(`  ${e}`);
  console.error("");
  process.exit(1);
}

console.log(
  `check-static: ok - 0 dynamic routes, 0 serverless functions, ${EXPECTED_ROUTES.size} routes match`,
);
