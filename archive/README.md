# archive/

Frozen code. Nothing in here is built, linted, type-checked, or deployed.

## consultancy-pricing.bundle

The complete git history of the `kartikeya1/consultancy-pricing` repo — the
standalone HTML pricing sheet whose 10 packages now live in
`lib/packages.ts`. A `git bundle` is a single file containing every object
and ref, so this is the whole repo, not a snapshot.

Restore it any time with:

```bash
git clone archive/consultancy-pricing.bundle consultancy-pricing
```

Verified on creation (2026-08-06): restores all 6 commits and both branches,
and the restored `index.html` is byte-identical to the original.

The migration itself was verified by diffing the source HTML against
`lib/packages.ts` programmatically — every price, category, hourly rate and
duration tag matches. The only intentional difference is an added ₹4,500
workshop rate, which the original calculator's dropdown was missing.

## site-v1/

The original kartikeyathapliyal.com — a dark-only Next.js 15 "product manager's
working notebook" with 16 MDX project pages. Retired in August 2026 when the site
was rebuilt as a consulting front door.

Kept for reference only. **Do not edit.** New development happens at the repo root.

### Why some filenames start with an underscore

| In the archive | Originally |
|---|---|
| `_package.json` | `package.json` |
| `_package-lock.json` | `package-lock.json` |
| `_gitignore` | `.gitignore` |

A second `package.json` containing `next` makes Vercel's monorepo detection offer
to change the project's Root Directory, and makes Next.js/Turbopack infer the wrong
workspace root. Renaming them makes the archive invisible to every tool while
keeping the contents byte-identical.

`tsconfig.tsbuildinfo` was dropped — it was a committed TypeScript incremental
build cache, regenerated on any build.

Nothing else was changed. Git history is intact: the move was a pure rename commit,
so `git log --follow -- archive/site-v1/<path>` reaches back past it.

### Running it, if you ever need to

```bash
cd archive/site-v1
cp _package.json package.json && cp _package-lock.json package-lock.json
npm ci && npm run dev
```

Clean up afterwards — a real `package.json` in here will confuse the root build.

### What is excluded where

- `tsconfig.json` → `"exclude": ["archive", ...]`
- `eslint.config.mjs` → global `ignores: ["archive/**", ...]`
- `.vercelignore` → `archive`
- `.gitattributes` → `archive/** linguist-vendored`
