import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

export const ROOT = new URL("../../", import.meta.url).pathname;

/**
 * These scripts run in `prebuild`, before any TypeScript is compiled, so they
 * cannot import lib/claims.ts directly. Rather than add a build step or a
 * transpiler dependency just for two checks, we parse the small, strictly
 * formatted object literals out of the source.
 *
 * This is deliberately strict: if the shape of claims.ts changes in a way the
 * parser does not recognise, it throws loudly rather than silently reporting
 * zero claims (which would make every check pass for the wrong reason).
 */
export function readClaims() {
  const src = readFileSync(join(ROOT, "lib/claims.ts"), "utf8");
  const start = src.indexOf("export const claims = [");
  if (start === -1) throw new Error("read-data: could not find `export const claims = [`");

  const body = src.slice(start);
  const claims = [];

  // Each claim is an object literal at a known indentation inside the array.
  const blocks = body.split(/\n  \{\n/).slice(1);
  for (const block of blocks) {
    const chunk = block.split(/\n  \},?/)[0];
    const field = (name) => {
      const m = chunk.match(
        new RegExp(`\\b${name}:\\s*(?:"((?:[^"\\\\]|\\\\.)*)"|\`([^\`]*)\`)`, "s"),
      );
      if (!m) return undefined;
      return (m[1] ?? m[2]).replace(/\\"/g, '"').replace(/\\n/g, "\n");
    };
    const id = field("id");
    if (!id) continue;
    claims.push({
      id,
      kind: field("kind"),
      text: field("text"),
      file: field("file"),
      section: field("section"),
      row: field("row"),
      verifiedOn: field("verifiedOn"),
      reviewNote: field("reviewNote"),
      reserved: /\breserved:\s*true/.test(chunk),
    });
  }

  if (claims.length === 0) throw new Error("read-data: parsed zero claims - parser is out of date");
  return claims;
}

/** Placeholder packages (isPlaceholder: true) plus their names and ids. */
export function readPlaceholderPackages() {
  const src = readFileSync(join(ROOT, "lib/packages.ts"), "utf8");
  const out = [];
  const blocks = src.split(/\n  \{\n/).slice(1);
  for (const block of blocks) {
    const chunk = block.split(/\n  \},?/)[0];
    if (!/\bisPlaceholder:\s*true/.test(chunk)) continue;
    const id = chunk.match(/\bid:\s*"([^"]+)"/)?.[1];
    const name = chunk.match(/\bname:\s*"([^"]+)"/)?.[1];
    if (id) out.push({ id, name });
  }
  return out;
}

/** Testimonials, so CLAIMS.md can list them for review alongside claims. */
export function readTestimonials() {
  const src = readFileSync(join(ROOT, "lib/testimonials.ts"), "utf8");
  const out = [];
  const start = src.indexOf("export const testimonials");
  if (start === -1) return out;
  for (const block of src.slice(start).split(/\n  \{\n/).slice(1)) {
    const chunk = block.split(/\n  \},?/)[0];
    const f = (k) => {
      const m = chunk.match(new RegExp(`\\b${k}:\\s*\n?\\s*"((?:[^"\\\\]|\\\\.)*)"`, "s"));
      return m ? m[1].replace(/\\"/g, '"') : undefined;
    };
    const id = f("id");
    if (id) out.push({ id, quote: f("quote"), author: f("author"), role: f("role"), theme: f("theme") });
  }
  return out;
}

/** The phone number currently configured in lib/site.ts. */
export function readSitePhone() {
  const src = readFileSync(join(ROOT, "lib/site.ts"), "utf8");
  const m = src.match(/phone:\s*"([^"]+)"/);
  if (!m) throw new Error("read-data: could not find contact.phone in lib/site.ts");
  return m[1];
}

/** Every .tsx/.ts file under app/ and components/, repo-relative. */
export function sourceFiles() {
  const out = [];
  for (const dir of ["app", "components"]) {
    walk(join(ROOT, dir), out);
  }
  return out.map((f) => relative(ROOT, f));
}

function walk(dir, out) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.tsx?$/.test(entry)) out.push(full);
  }
}

export function readSource(relPath) {
  return readFileSync(join(ROOT, relPath), "utf8");
}
