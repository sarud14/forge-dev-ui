# Forge — Architecture

<!--
Scaffolded (hand-authored — `yarn install` has not been run in this environment; see "Known
gaps / substitutions / tech debt" below). Fields that can only be confirmed once a real install
has run — exact lockfile versions, ESLint preset — remain TBD. The visual direction is
"Editorial Dark" (see docs/DESIGN_SYSTEM.md) — this file covers structure/layering only, which
did not change with that pivot except for the addition of `features/shell/` below.
-->

Forge is a personal frontend system and component laboratory: Next.js App Router site that
documents and demonstrates a small set of production-quality, accessible UI components, the
design tokens and UX decisions behind them, and the automated quality gates that keep them
correct. No backend, no database, no accounts in Phase 1 — content is Git + MDX, read-only at
runtime.

- **Source of truth for stack/version decisions:** `requirement/forge-requirements.md`
- **Source of truth for the rules this doc instantiates:** `AGENTS.md`

---

## Stack

<!-- Copy exact lockfile versions here once `yarn install` has run — see requirement doc §2.1. -->

| Concern | Choice |
|---|---|
| Build / dev | Next.js App Router 16.x |
| UI framework | React 19.x |
| Language | TypeScript 5.x (strict) |
| Routing | Next.js App Router (file-based, Server Components by default) |
| Styling | Tailwind CSS 4.x (CSS-first config) + CSS Custom Properties |
| Interaction primitives | Radix UI (Dialog, Dropdown Menu, Select, Tooltip, Tabs, and similar) |
| Data / ORM | N/A — Phase 1 has no database |
| Auth | N/A — Phase 1 has no accounts or protected routes |
| Unit / component tests | Vitest + Testing Library |
| E2E | Playwright |
| Accessibility checks | axe-core (via Playwright) |
| Lint / format | ESLint + Prettier (AGENTS.md default — confirm exact configs at scaffold) |
| Package manager | Yarn (`yarn.lock` committed) |

**TBD once scaffolded:** exact minor/patch versions from `yarn.lock`; ESLint config preset chosen.

---

## Directory layout

Instantiates the AGENTS.md default, combined with Forge's route boundaries from
requirement/forge-requirements.md §5:

```
src/
├── app/
│   ├── icon.png            <- 32×32 favicon: cropped Chevron Peak, transparent canvas
│   ├── apple-icon.tsx
│   ├── opengraph-image.tsx <- 1200×630 share card with the same mark
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── page.tsx
│   ├── layout.tsx
│   ├── components/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── patterns/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── foundations/
│   │   ├── page.tsx
│   │   └── [slug]/page.tsx
│   ├── engineering/
│   │   ├── page.tsx
│   │   ├── accessibility/
│   │   ├── performance/
│   │   ├── testing/
│   │   └── decisions/
│   └── playground/
│       └── page.tsx
├── features/
│   ├── shell/              <- app-wide sidebar nav shell (Sidebar.tsx, navItems.ts) — used by
│   │                          app/layout.tsx, not a single route; see "Deviations" below
│   ├── components/        <- powers app/components (ButtonDoc.tsx: Preview/Code/A11y tabs)
│   ├── patterns/          <- powers app/patterns
│   ├── foundations/       <- powers app/foundations
│   ├── playground/        <- powers app/playground (PlaygroundControls.tsx)
│   └── documentation/     <- shared MDX rendering used by components/patterns/engineering
├── lib/
│   ├── seo/
│   │   └── siteMetadata.ts <- title/OG/JSON-LD/robots/sitemap builders (no feature imports)
│   └── content/
│       ├── source.ts           <- single content-read abstraction (getComponentDocs(), etc.)
│       ├── parseFrontmatter.ts <- local `---` fence parser (no gray-matter in Phase 1)
│       └── parseMarkdown.ts    <- Phase 1 markdown subset (`##`, lists, paragraphs)
├── types/
├── components/
│   └── ui/                 <- the design system, see docs/DESIGN_SYSTEM.md
│       ├── index.ts
│       ├── types.ts
│       ├── helpers.ts
│       ├── tokens/
│       │   ├── colors.css
│       │   ├── spacing.css
│       │   ├── typography.css
│       │   ├── radius.css
│       │   ├── elevation.css
│       │   ├── motion.css
│       │   └── breakpoints.css  <- viewport stops + shell/dialog/content widths
│       ├── core/            <- Button, Tabs, Tooltip
│       ├── forms/           <- Input, Select
│       ├── feedback/        <- Dialog, Toast
│       └── data/            <- Data Table
├── constants/
│   └── seo.ts              <- site description, keywords, logo geometry, OG hexes for Satori
├── validators/
└── env.ts

content/
├── components/            <- Phase 1 MDX docs, one file per locked primitive
├── patterns/              <- Phase 1 MDX docs (Form, Search, Data Table, empty/loading/error, Confirmation)
├── engineering/           <- Accessibility, Performance, Testing, Decisions write-ups
├── decisions/             <- reserved for individual ADRs; getDecisionDocs() still returns []
└── guides/

e2e/
└── <flow-name>.spec.ts

.github/
├── workflows/ci.yml
└── scripts/notify-discord.sh

.claude/skills/
docs/
├── ARCHITECTURE.md          <- this file
└── DESIGN_SYSTEM.md

design/
requirement/
```

**Deviations from the AGENTS.md default folder structure:**

- `content/` is a new top-level folder (not in the AGENTS.md generic tree) — Forge's content
  layer is Git + MDX per requirement doc §4, and `src/lib/content/source.ts` is the single
  abstraction that reads it. This is additive, not a rename of anything in the default tree.
- No `actions/` or `api/` folder yet — Phase 1 has no mutations or external API consumers
  (requirement doc §7 has no write paths). Add it if/when Phase 2 introduces saved playground
  state or any write path.
- `components/ui/` groups are `core/`, `forms/`, `feedback/`, `data/` rather than the full
  AGENTS.md example list (`core/`, `forms/`, `data/`, `feedback/`, `navigation/`) — Forge's
  Phase 1 component set (§10.4 of the requirements doc) doesn't need a separate `navigation/`
  group yet; Tabs lives in `core/` for now. Add `navigation/` when a component needs it rather
  than pre-creating an empty folder.
- `features/shell/` is a new folder not in the AGENTS.md generic tree — it holds the sidebar
  navigation shell (`Sidebar.tsx`, `navItems.ts`) introduced by the "Editorial Dark" layout
  pivot (2026-09-11, see docs/DESIGN_SYSTEM.md). It's consumed once, from `app/layout.tsx`, not
  per-route — kept as its own feature folder rather than `components/ui/navigation/` because it
  composes app-specific routing (`usePathname`, the real nav item list) rather than being a
  generic, liftable primitive (see "Layering & import rules" below on why `components/ui/`
  stays framework/route-agnostic).

---

## Layering & import rules

Instantiates AGENTS.md's `features → app → { lib, components/ui, types, constants, validators }`
rule directly — Forge does not rename or add layers.

```
features/  ──▶  app/  ──▶  lib/ ─┐
                      │          ├─▶ types/
                      │          ├─▶ constants/
                      │          └─▶ validators/
                      └────────────▶ components/ui/  ──▶  types/ (only)
```

- `lib/`, `components/ui/`, `types/`, `constants/`, `validators/` never import from `features/`
  or `app/` — they exist to be depended on, not to depend back (AGENTS.md's Feature Folders &
  Layering).
- `components/ui/` imports nothing from `lib/` either, at most `types/` for a shared prop
  signature — it must stay liftable into another project wholesale.
- `features/content/` and `features/playground/` etc. never import each other's folders
  directly; anything shared is promoted to `lib/` or `components/ui/`.
- `lib/content/source.ts` is the only place that reads from `content/` — no route or feature
  imports MDX/filesystem access directly (requirement doc §4 "Read abstraction").

---

## Path aliases

<!-- Proposed — confirm/adjust once tsconfig exists at scaffold time (Build Order step 1). -->

Configured in **both** `tsconfig.json` (`paths`) and Next.js's built-in module resolution
(no separate bundler config needed under Next.js 16's default webpack/Turbopack setup).

| Alias | Resolves to |
|---|---|
| `@/components/ui` | `src/components/ui` (barrel) |
| `@/features/*` | `src/features/*` |
| `@/lib/*` | `src/lib/*` |
| `@/types/*` | `src/types/*` |
| `@/constants/*` | `src/constants/*` |
| `@/validators/*` | `src/validators/*` |
| `@/env` | `src/env.ts` |

Prefer aliases over `../../..` relative chains across layers. Relative imports are fine
**within** one feature/module folder.

---

## Styling model

1. **Tokens are the source of truth** — see [`DESIGN_SYSTEM.md`](./DESIGN_SYSTEM.md) for the
   full inventory. They live at `src/components/ui/tokens/*.css`.
2. **Tailwind v4 maps the tokens via CSS-first config** — `@theme` in the global stylesheet
   references the token custom properties, so a utility class like `bg-surface` resolves to
   `var(--color-background)`. (Exact `@theme` block is written at scaffold time — Tailwind v4
   does not use a separate `tailwind.config.js` by default.)
3. **Arbitrary one-off values** are allowed only for genuine one-offs — see AGENTS.md's Design
   Tokens rule on when a repeated one-off should be promoted to a token.
4. **Inline `style={{}}`** is reserved for runtime-computed values the utility layer can't
   express — expected Forge cases: Data Table column widths, any depth-based Tabs/Tooltip
   offset calculations.

Do **not** add a new global CSS file or component-level `.css` file. Extend the token layer
or the Tailwind `@theme` block instead.

---

## Data & derivations

Forge has no live backend — "data" is MDX content, not fixtures for a future API.

- Content types (frontmatter shape for components/patterns/decisions/guides docs) live in
  `src/types/content.types.ts`.
- `src/lib/content/source.ts` exposes `getComponentDocs()`, `getComponentDoc(slug)`,
  `componentDocHref(slug)`, `getPatternDocs()`, `getPatternDoc(slug)`, `patternDocHref(slug)`,
  `getEngineeringDocs()`, `getEngineeringDoc(slug)`, `engineeringDocHref(slug)`,
  `getDecisionDocs()` — pure read functions over
  `content/`, per requirement doc §4. No component or route reads the filesystem directly.
- Phase 1 parses `content/components/*.mdx`, `content/patterns/*.mdx`, and
  `content/engineering/*.mdx` with `parseFrontmatter.ts`
  and renders the markdown subset via `parseMarkdown.ts` + `features/documentation/MarkdownBody.tsx`.
  JSX in MDX is not compiled yet (no extra MDX package — AGENTS.md "Ask First").
- `getDecisionDocs()` still returns `[]` until `content/decisions/` is filled. The Phase 1
  decisions write-up lives at `/engineering/decisions` from `content/engineering/decisions.mdx`.
- Any value derived from content for display (e.g. a computed "last updated" label) is a pure
  helper in `src/lib/content/`, never inline in a route component.

---

## Routing

Route table mirrors requirement doc §5 exactly — no deviation planned for Phase 1:

- `/` — Forge landing/overview
- `/foundations`, `/foundations/[slug]` — design principles, tokens, layout foundations docs
- `/components`, `/components/[slug]` — component list + per-component documentation page
- `/patterns`, `/patterns/[slug]` — pattern list + per-pattern documentation page
- `/engineering` — index of engineering write-ups
- `/engineering/accessibility`, `/engineering/performance`, `/engineering/testing`,
  `/engineering/decisions` — engineering notes sub-sections
- `/playground` — interactive component playground

---

## Testing

- **Unit/component:** colocated `*.test.ts(x)` next to source, per AGENTS.md. Cross-cutting
  suites expected: a `tokens.test.ts` style check is not applicable (CSS isn't unit-testable
  this way) — instead, accessibility checks (below) act as the cross-cutting suite for the
  design system.
- **E2E:** `e2e/`, using Playwright. Phase 1 critical flows: browsing a component doc page,
  a pattern composition, an engineering write-up, and the accessibility smoke pass on home.
- Run: `yarn install` · `yarn test` · `yarn build` · `yarn lint` · `yarn type-check` ·
  `yarn test:e2e`
- **CI:** `.github/workflows/ci.yml` — on push/PR to `main`: lint → type-check → unit tests →
  production build, then Playwright e2e (axe smoke included), then Vercel deploy. Discord
  notifications are optional (`DISCORD_WEBHOOK_URL`). No database job — Phase 1 has no Prisma.

---

## Accessibility commitments

<!-- Expected guarantees given the chosen primitives — confirm/finalize per component as each
one is actually built (requirement doc §11 Build Order steps 7-10). -->

- `Dialog` → focus trapped while open, focus restored to the trigger on close, `Escape` and
  overlay click dismiss, correct `role="dialog"`/`aria-modal` (via Radix Dialog).
- `Select` → combobox trigger + listbox of options; typeahead and keyboard via Radix Select.
- `Tabs` → tablist/tab/tabpanel roles; arrow keys, Home, and End via Radix Tabs.
- `Tooltip` → `role="tooltip"`, dismiss on Escape, collision-aware placement via Radix Tooltip.
  `TooltipProvider` is mounted in `src/app/layout.tsx`.
- `Toast` → announced via a live region so it does not require the user to be looking at the
  screen when it appears.
- `Data Table` → sortable/interactive headers are real buttons with accessible names, not
  divs with click handlers. `aria-sort` exposes the current direction.

Full conformance to any accessibility standard cannot be claimed from automated checks alone —
assistive-technology testing and expert review are still required before that claim is made.

---

## Known gaps / substitutions / tech debt

- **`yarn install` has not been run in this environment.** The scaffold (`package.json` and
  every source file) was hand-authored because this environment's cloud sandbox has no route to
  the npm registry — dependency versions in `package.json` are best-effort, not resolved/locked
  against the real registry. Run `yarn install` · `yarn build` · `yarn lint` · `yarn type-check`
  · `yarn test` on a machine with registry access before treating any of it as verified (AGENTS.md
  "Definition of Done"); replace the TBD stack-version cells above from the resulting `yarn.lock`.
- **The logo mark intentionally diverges from the rest of the palette** — it reuses the
  Chevron Peak icon/amber from `design/forge-logo-directions` while every other color stays on
  the teal Editorial Dark palette; see docs/DESIGN_SYSTEM.md's "Design tokens" → "Logo".
