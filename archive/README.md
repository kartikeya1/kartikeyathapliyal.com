# archive/

Frozen code. Nothing in here is built, linted, type-checked, or deployed.

## consultancy-pricing — migrated, not archived

The standalone HTML pricing sheet that used to live at
`kartikeya1/consultancy-pricing` was folded into this site in August 2026.
Its 10 packages are now `lib/packages.ts`; `/services` replaces it entirely.

The migration was verified by diffing the original `index.html` against
`lib/packages.ts` programmatically — every price, category, hourly rate and
duration tag matched. The one intentional difference is an added ₹4,500
workshop rate, which the original calculator's dropdown was missing. The
Google Form URL carried over into `siteConfig.booking`.

**No copy of the old repo is kept here.** A git bundle was created and
verified during the migration, then deliberately removed at the owner's
request once `/services` was live — the pricing data is fully represented
in `lib/packages.ts`, and the old page had no remaining users. The GitHub
repo and its Vercel project were deleted at the same time.

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
