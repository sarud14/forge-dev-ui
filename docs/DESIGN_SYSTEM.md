# Design System (`src/components/ui`)

<!--
Scaffolded. Tokens and the Button/Dialog components below reflect the "Editorial Dark" visual
direction (design/Forge Prototype Editorial Dark standalone.html, adopted 2026-09-11 — see
"Design tokens" and "Status / gaps" below), which fully replaced the earlier amber/JetBrains-Mono
brand direction. Select, Tabs, Tooltip, and Data Table are built (Build Order steps 9–10).
-->

The local, editable design system for Forge. Hand-built from scratch — Forge's whole point is
demonstrating the design decisions behind each primitive, not porting an existing kit.

> `src/components/ui` is **self-contained** — see [`ARCHITECTURE.md`](./ARCHITECTURE.md) for
> the full layering rules this folder must respect (what it may and may not import from).

## Import surface

Everything is re-exported from the barrel — always import from `@/components/ui`:

```tsx
import { Button, Input, Dialog, toast, Toaster } from '@/components/ui';
import type { ButtonProps, InputProps } from '@/components/ui';
```

---

## Folder map

```
components/ui/
  index.ts          barrel — components, helpers, types
  types.ts          every prop interface + shared unions (Size, Tone, ButtonVariant, ...)
  helpers.ts        className-string derivations
  tokens/           token CSS files (see "Design tokens" below)
  core/             Button (built), Tabs (built), Tooltip (built)
  forms/            Input (built), Select (built)
  feedback/         Dialog (built), Toast (built)
  data/             Data Table (built)
```

`navigation/` is not created yet — add it if a future component needs its own group rather
than pre-creating an empty folder (see ARCHITECTURE.md's noted deviation). The sidebar shell
(`src/features/shell/Sidebar.tsx`) is app layout, not a reusable design-system component, so it
lives in `features/shell/`, not `components/ui/navigation/` — see ARCHITECTURE.md's directory
layout.

---

## Design tokens

Tokens are the source of truth. They are declared as custom properties in
`src/components/ui/tokens/*.css` and mapped into Tailwind v4's `@theme` block, so a utility
class like `bg-surface` resolves to `var(--color-background)`.

| File | What it defines |
|---|---|
| `colors.css` | `--color-background`, `--color-foreground`, `--color-primary`, `--color-muted`, `--color-border`, `--color-muted-foreground`, `--color-brand`, `--color-success`, `--color-danger`, `--color-warning`, `--color-info` |
| `spacing.css` | `--space-1` … `--space-16` (8px base unit) |
| `radius.css` | `--radius-sm`, `--radius-md`, `--radius-lg` |
| `typography.css` | `--font-sans`, `--font-serif`, `--font-mono`, `--font-brand`, a text-size scale (`--text-2xs`…`--text-3xl`), `--leading-tight`/`--leading-normal`/`--leading-relaxed`/`--leading-loose` |
| `elevation.css` | Shadow tokens for Dialog/Toast/Tooltip surfaces (`--shadow-sm/md/lg`) — not yet populated |
| `motion.css` | Duration/easing tokens for Dialog open/close, Toast enter/exit, Tooltip delay (`--duration-*`, `--ease-standard`) — not yet populated |
| `breakpoints.css` | Viewport stops `--bp-phone-sm` (360), `--bp-phone-lg` (430, Pro Max-class), `--bp-tablet` (768), `--bp-laptop` (1024), `--bp-desktop` (1440), plus layout sizes `--size-sidebar` / `--size-dialog` / `--size-content` / `--size-content-wide` / `--size-playground-rail`. Pixel copies for `matchMedia` live in `src/components/ui/breakpoints.ts` |

**Palette — "Editorial Dark", locked 2026-09-11.** Forge replaced its earlier amber/JetBrains-Mono
brand direction wholesale with the palette from `design/Forge Prototype Editorial Dark
standalone.html` (a full Claude Design export), per an explicit dark-only decision — there is no
light theme and no `prefers-color-scheme` branch in `colors.css`. Values and their provenance:

| Token | Value | Source |
|---|---|---|
| `--color-background` | `#12151b` | mockup's own declared `colorTokens` |
| `--color-foreground` | `#eef1f5` | mockup's own declared `colorTokens` |
| `--color-primary` | `#45c4b0` (teal) | mockup's own declared `colorTokens` — also the new brand accent |
| `--color-muted` | `#1a1e26` | mockup's own declared `colorTokens` |
| `--color-brand` | `#45c4b0` | same as `--color-primary` — the logo mark, the interactive accent, and the brand are one color in this direction (no separate brand-vs-accent split) |
| `--color-border` | `#2b3140` | **flagged addition** — the mockup uses this border color throughout but never names it in its own token list; promoted to a token since it repeats everywhere (card borders, dividers, input borders) |
| `--color-muted-foreground` | `#93a0b0` | **flagged addition** — the mockup uses several near-identical grays for secondary text (`#93a0b0`, `#8d97a8`, `#aab4c2`) that aren't part of its own 4-token palette; consolidated into this one token rather than keeping three near-duplicates in the codebase (design-mockup skill Step 2 — flag, don't silently invent) |
| `--color-danger` | `#b5453a` | mockup's destructive/delete-confirmation red |
| `--color-success`/`--color-warning`/`--color-info` | unchanged from the prior system | the mockup's own demo doesn't exercise these — kept as placeholders until a real success/warning/info surface is built |

**Logo — Chevron Peak in brand teal, 2026-09-11.** The in-app mark uses the earlier "Chevron
Peak" icon and `forge.dev` wordmark (`design/forge-logo-directions`, `ChevronPeak.dc.html`)
for the shape, colored with `--color-brand` so it matches the Editorial Dark CI. A brief
amber `--color-logo-accent` exception (`#f5a524`) was tried and then retired the same day —
the lockup is no longer a separate color from buttons, focus rings, and highlights. The mark
renders (`src/features/shell/Sidebar.tsx`):

- Icon: the exact two-polygon shape from `ChevronPeak.dc.html` (`50,12 78,58 66,58 50,32 34,58
  22,58` at 40% opacity behind `50,34 72,72 60,72 50,55 40,72 28,72` at full opacity), both
  filled with `--color-brand` (`#45c4b0`).
- Wordmark: `forge.dev` in `--font-mono` (IBM Plex Mono — reusing an already-loaded font rather
  than adding JetBrains Mono, which the original canvas used, for a visually equivalent result
  without a new font dependency), with the `.` colored `--color-brand` and the rest in
  `--color-foreground`.
- Favicon / Apple touch icon / Open Graph image (`src/app/icon.png`, `apple-icon.tsx`,
  `opengraph-image.tsx`) reuse the same geometry from `src/constants/seo.ts`. The tab
  favicon is a 32×32 PNG cropped tight around the mark (`LOGO_ICON_VIEWBOX`) with a
  transparent canvas — a padded SVG made Chrome paint the page’s dark background into
  the empty space. ImageResponse files cannot read CSS variables, so they duplicate the
  token hexes in `SEO_OG_COLORS`.

The previously published "Forge Logo" design canvas (`design/forge-logo-directions`) is the
source of this icon *shape*. Its original amber fill is not used in-app.

**Typography.** Three Google fonts loaded via `next/font/google` in `src/app/layout.tsx`: Public
Sans (`--font-public-sans`, default UI sans), Spectral (`--font-spectral`, serif — headings and the
"Forge" wordmark), IBM Plex Mono (`--font-ibm-plex-mono`, code/generated-snippet display).
`--font-sans`/`--font-serif`/`--font-mono` in `typography.css` reference these variables so
components never reference a font-loader variable name directly.

**Radius normalization — flagged.** `Button`'s `lg` size uses `--radius-lg` (16px) rather than the
mockup's own literal inline 10px for its largest button — the mockup's Foundations-equivalent
section separately declares `--radius-lg` as 16px, so Button was made to consume that scale
instead of carrying a parallel one-off value (AGENTS.md "Design Tokens": tokens are the single
source of visual truth). Flagged to Ruj as a deliberate normalization, not silently resolved.

**Utility-class aliases** (exact list finalized once the Tailwind `@theme` block exists):

- Colour: `bg-background`, `text-foreground`, `bg-primary`, `text-muted`, `text-brand`/`bg-brand`,
  `border-border`, `text-muted-foreground`
- Radius: `rounded-sm`, `rounded-md`, `rounded-lg`
- Size / spacing: `p-1` … `p-16` (mirrors `--space-*` scale)
- Motion: `duration-*` via `--duration-fast/normal/slow` (Tailwind v4 arbitrary-value syntax
  until a named `--theme` mapping is added)
- Font: `font-sans` (default), `font-serif`, `font-mono`; components currently reach these via
  `style={{ fontFamily: 'var(--font-serif)' }}` rather than a Tailwind utility class, since Button
  is the only styled component and most page copy sets its own font inline — promote to a
  utility once a second consumer needs the same class
- Breakpoints (mobile-first `min-width`): `phone-sm:` 360px, `phone-lg:` 430px, `tablet:` 768px,
  `laptop:` 1024px, `desktop:` 1440px. Mapped in `globals.css` `@theme` from `tokens/breakpoints.css`.
  Default Tailwind `sm`/`md`/`lg` remain; do not use them for Forge layout — they are not these
  device stops.

**Breakpoints — locked with this pass.** Five named stops, not Tailwind’s default scale:

| Token | Pixels | Device class | Layout |
|---|---|---|---|
| `--bp-phone-sm` | 360 | Compact phone | Base styles; top bar + Menu |
| `--bp-phone-lg` | 430 | Pro Max-class phone | Same shell; slightly more padding |
| `--bp-tablet` | 768 | Tablet | Preview grids go 2-column; still Menu |
| `--bp-laptop` | 1024 | Laptop | Persistent sidebar |
| `--bp-desktop` | 1440 | Desktop | Widest page padding |

`AppShell` (`src/features/shell/AppShell.tsx`) switches at the laptop stop. JS reads
`BREAKPOINTS` from `@/components/ui` because `matchMedia` cannot use CSS custom properties.

Adjust a design value by editing the token file and/or extending the `@theme` block. **Do not**
add a new global or per-component CSS file — see AGENTS.md's Design Tokens rule.

---

## Shared types

From `src/components/ui/types.ts`:

```ts
type Size = 'sm' | 'md' | 'lg';
type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive';

// Reserved for Toast (requirement doc §10.4, Build Order step 8) — not consumed by Button,
// which uses its own ButtonVariant union to match the Editorial Dark mockup's variant naming.
type Tone = 'neutral' | 'success' | 'info' | 'warning' | 'danger' | 'brand';

interface DialogProps {
  trigger: ReactNode;
  title: string;
  description?: string;
  children?: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
```

---

## Component reference

<!-- One block per Phase 1 component (requirement doc §10.4). Props are a draft starting
point, not a locked API — refine while implementing each one (Build Order steps 7-10). -->

### Core

#### `Button` — built

Primary interactive trigger. Rebuilt for Editorial Dark — `tone` was replaced with `variant` to
match the mockup's own variant naming (`primary`/`secondary`/`ghost`/`destructive`).

- `size` (`'sm' | 'md' | 'lg'`, default `'md'`) · `variant` (`'primary' | 'secondary' | 'ghost' |
  'destructive'`, default `'primary'`) · `isLoading` · `disabled`
- States per requirement doc §3.5: default, hover, focus, active, disabled, loading — implemented
  via real Tailwind `hover:`/`focus-visible:`/`disabled:` classes (not inline styles), so the
  browser's own pseudo-classes drive the interaction, not JS state.
- Focus ring: `focus-visible:outline-2 outline-offset-2` in `--color-primary`.
- `isLoading` sets `aria-busy` and disables the button; renders the literal text "Loading…" in
  place of `children` (no spinner asset yet — flagged as a gap, see "Status / gaps").

```tsx
<Button variant="destructive" size="lg">Delete</Button>
```

#### `Tabs` — built

Wraps Radix Tabs as a single composed control.

- `items` (`{ value, label, content, disabled? }[]`) · `defaultValue` · `value` (controlled) ·
  `onValueChange` · `aria-label` (names the tablist)
- Full keyboard navigation (arrow keys, Home/End) via Radix — not reimplemented.
- Doc screens (`ButtonDoc`, `InputDoc`, …) keep their own local `role="tablist"` chrome so this
  primitive is not nested inside itself on `/components`.

```tsx
<Tabs defaultValue="usage" items={tabItems} />
```

#### `Tooltip` — built

Wraps Radix Tooltip for supplementary labels.

- `content` · `side` (`'top' | 'right' | 'bottom' | 'left'`, default `'top'`) · `delayDuration` ·
  `open` / `defaultOpen` / `onOpenChange` (controlled; useful in tests so jsdom does not have to
  simulate hover)
- Dismisses on `Escape`; positioned via Radix's collision-aware placement.
- Trigger is `asChild` — pass a single element (typically `Button`), not a text node.
- Mount `TooltipProvider` once in `src/app/layout.tsx`. Default delay is
  `DEFAULT_TOOLTIP_DELAY_MS` (700, matching Radix). Pass `delayDuration={0}` in tests and snappy
  demos.

```tsx
<Tooltip content="Copy to clipboard"><Button>Hover me</Button></Tooltip>
```

### Forms

#### `Input` — built

Native text input. React Hook Form + Zod bind through standard input props — this primitive
does not import either library (see `/playground` email demo).

- `size` (`'md'` only in Phase 1) · `tone` (`'neutral' | 'danger'` for error state) · `disabled` ·
  `errorMessage?` (sets `aria-invalid` and `aria-describedby` on the visible error text)

```tsx
<Input placeholder="you@example.com" />
<Input errorMessage="Enter a valid email" placeholder="you@example.com" />
```

#### `Select` — built

Wraps Radix Select as a single composed field. Trigger chrome matches Input so form fields sit
on one scale.

- `options` (`{ value, label, disabled? }[]`) · `value` / `defaultValue` · `onValueChange` ·
  `disabled` · `placeholder` (default `Select…`) · `aria-label`
- Full keyboard navigation and ARIA roles (combobox / listbox / option) via Radix.

```tsx
<Select aria-label="Size" options={sizeOptions} defaultValue="md" />
```

### Feedback

#### `Dialog` — built

Wraps Radix Dialog, styled to match the mockup's confirm-delete demo.

- `trigger` (ReactNode) · `title` (string) · `description?` (string) · `children?` (ReactNode —
  custom footer; omit for the default Cancel/Confirm footer) · `open?` / `onOpenChange?`
  (controlled mode)
- States per requirement doc §3.5: closed, opening, open, closing are owned by this component
  (via Radix); `submitting`/`error` are the caller's responsibility, expressed through a custom
  `children` footer — Dialog itself has no knowledge of request state.
- Focus trapped while open, restored to trigger on close; `Escape` and overlay-click dismiss;
  `role="dialog"` + `aria-modal` — all via Radix, not reimplemented.
- Default footer (no `children`): `<Button variant="ghost">Cancel</Button>` +
  `<Button variant="primary">Confirm</Button>`, each wrapped in `RadixDialog.Close asChild`.

```tsx
<Dialog trigger={<Button variant="secondary">Open dialog demo</Button>} title="Delete component?"
  description="This demonstrates Dialog's focus-trap and dismissal behavior." />
```

#### `Toast` — built

Transient notification, announced via a live region. Call `toast()` from any client
handler; mount `<Toaster />` once in the root layout.

- `tone` (`'neutral' | 'success' | 'danger'`, default `'neutral'`) · `title` · `description?` ·
  `duration?` (ms, default `5000` to match Radix)

```tsx
toast({ tone: 'success', title: 'Saved' });
```

### Data

#### `Data Table` — built

Tabular data display — the most complex Phase 1 component (requirement doc §11 step 10). Sort
logic lives in `sortTableRows` (no React) so it is unit-tested without rendering.

- `columns` (`{ id, header, cell, sortable?, sortValue? }[]`) · `data` · `getRowId` ·
  `emptyState` (default `No results.`) · `caption?` · `aria-label?` · `sort` / `defaultSort` /
  `onSortChange`
- `sortable: true` requires `sortValue` so ordering is independent of whatever ReactNode `cell`
  returns. First click sorts ascending; clicking again toggles descending.
- Sortable headers are real `<button>` elements with accessible names, not click-handled divs.
  `aria-sort` on the columnheader exposes `none` / `ascending` / `descending`.

```tsx
<DataTable columns={columns} data={rows} getRowId={(row) => row.id} />
```

---

## Class-string / derivation helpers

<!-- Fill in as helpers.ts grows during implementation. -->

| Helper | Returns | Use |
|---|---|---|
| `cx(...classNames)` | class string | Joins conditional class names, filtering out `false`/`null`/`undefined` — used by Button's variant/size composition |
| `getToneClassName(tone)` | class string | Maps a `Tone` value to its token-backed background/text classes — consumed by Toast |

---

## Accessibility contract

The design system carries these guarantees; do not regress them (mirrors
docs/ARCHITECTURE.md's "Accessibility commitments", scoped to the component level):

- `Dialog` → focus trap + restore, `Escape`/overlay dismiss, `role="dialog"` + `aria-modal`
- `Select` → combobox + listbox/option; typeahead and keyboard via Radix
- `Tabs` → tablist/tab/tabpanel; arrow keys, Home, End via Radix
- `Tooltip` → `role="tooltip"`, Escape dismiss; `TooltipProvider` in the root layout
- `Toast` → rendered in a live region so it's announced without requiring visual focus
- `Data Table` → sortable headers are real buttons with accessible names; `aria-sort` on the
  columnheader
- `Input` → `aria-invalid` and an associated error message via `aria-describedby` when invalid

**Test at the semantic layer** — roles, labels, `aria-*`, and stable `data-*` hooks. Do not
assert on utility-class strings in component/screen tests (a helper's own unit test may assert
its returned class string, since that string is the helper's actual contract — see AGENTS.md's
Testing Conventions).

---

## Adding or changing a component

1. Add the file under the right group: `src/components/ui/<group>/`.
2. Add/extend its prop interface in `src/components/ui/types.ts`.
3. Export it from `src/components/ui/index.ts` (keep the group ordering: core, forms,
   feedback, data).
4. Style with Tailwind token classes; add a token first if a value is missing — never hardcode
   (see AGENTS.md's Design Tokens rule).
5. Add a colocated test asserting semantics and any `data-*`/ARIA contract (see Testing
   Conventions in AGENTS.md).
6. Render the new variant in `/playground` (Forge's dev-facing gallery route).
7. Run `yarn test`, `yarn build`, `yarn lint` before declaring done.

---

## Status / gaps

- **Fully styled and in use:** `Button`, `Input`, `Select`, `Tabs`, `Tooltip`, `Dialog`, `Toast`,
  `DataTable`.
  "Editorial Dark" is the locked visual
  direction as of 2026-09-11 (dark-only, no light theme) — see "Design tokens" above and
  `design/Forge Prototype Editorial Dark standalone.html` for the source mockup.
- **Screens built against the new system:** `/` (Home), `/foundations` (token showcase),
  `/components` (index driven by `getComponentDocs()` — Button, Input, Select, Tabs, Tooltip,
  Dialog, Toast, and Data Table, each with Preview/Code/Accessibility tabs via
  `src/features/components/*Doc.tsx`), `/components/[slug]` (MDX body from
  `content/components/*.mdx` plus the matching live preview), `/patterns` and `/patterns/[slug]`
  (MDX from `content/patterns/*.mdx` plus a composed preview via `PatternPreview`), `/playground`
  (live Button, Input, Select, Tabs, Tooltip, Data Table prop editors + Dialog demo + RHF/Zod
  email form + Toast firer, via `src/features/playground/PlaygroundControls.tsx`). `Toaster` and
  `TooltipProvider` are mounted in `src/app/layout.tsx`.
- **Not yet restyled:** `/engineering` remains the original plain placeholder stub (no
  Editorial Dark content yet — restyle when those write-ups are written).
- **Available, not yet used by any screen:** N/A
- **Ported but not yet finished:** N/A — nothing is ported; everything is hand-built per
  requirement doc §3.3.
- **Known gaps:** `Button`'s `isLoading` state has no spinner asset — it swaps to literal
  "Loading…" text; `--radius-lg` on `Button`'s `lg` size is normalized from the mockup's literal
  10px to the token's 16px (see "Design tokens" → "Radius normalization").
  `/engineering` stubs are still unpadded placeholders.
- **Known substitutions:** none for the built components — Public Sans/Spectral/IBM Plex Mono
  and the teal accent (`#45c4b0`, also used by the logo mark) are the real, chosen values, not
  placeholders.
