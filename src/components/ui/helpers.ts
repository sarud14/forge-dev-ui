import type { Tone } from './types'

/** className-string derivations only — no JSX here (see AGENTS.md Folder Structure). */

export function cx(...classNames: ReadonlyArray<string | false | null | undefined>): string {
  return classNames.filter(Boolean).join(' ')
}

/**
 * Tone → className. Consumed by Toast (requirement doc §10.4, Build Order step 8).
 * Button uses its own `variant` union — see types.ts.
 */
const toneClassNames: Record<Tone, string> = {
  neutral: 'bg-[var(--color-border)] text-[var(--color-foreground)]',
  success: 'bg-[var(--color-success)]/15 text-[var(--color-success)]',
  info: 'bg-[var(--color-info)]/15 text-[var(--color-info)]',
  warning: 'bg-[var(--color-warning)]/15 text-[var(--color-warning)]',
  danger: 'bg-[var(--color-danger)]/15 text-[var(--color-danger)]',
  brand: 'bg-[var(--color-primary)] text-[var(--color-background)]',
}

export function getToneClassName(tone: Tone): string {
  return toneClassNames[tone]
}

/** Page padding scales across the five viewport stops in tokens/breakpoints.css. */
export const PAGE_FRAME_DOC_CLASS =
  'mx-auto w-full max-w-[var(--size-content)] p-[var(--space-3)] phone-lg:p-[var(--space-4)] tablet:p-[var(--space-6)] laptop:px-[var(--space-6)] laptop:py-[var(--space-8)] desktop:p-[var(--space-8)]'

export const PAGE_FRAME_WIDE_CLASS =
  'mx-auto w-full max-w-[var(--size-content-wide)] p-[var(--space-3)] phone-lg:p-[var(--space-4)] tablet:p-[var(--space-6)] laptop:px-[var(--space-6)] laptop:py-[var(--space-8)] desktop:p-[var(--space-8)]'

export const PREVIEW_GRID_CLASS = 'grid grid-cols-1 gap-[var(--space-3)] tablet:grid-cols-2'

export const HOME_CARD_GRID_CLASS =
  'grid grid-cols-1 gap-[var(--space-4)] tablet:grid-cols-2 laptop:grid-cols-3'

export const TOKEN_SWATCH_GRID_CLASS =
  'mb-[var(--space-8)] grid grid-cols-1 gap-[var(--space-2)] phone-lg:grid-cols-2 tablet:grid-cols-4'

export const PLAYGROUND_SPLIT_CLASS =
  'grid grid-cols-1 gap-[var(--space-6)] laptop:grid-cols-[var(--size-playground-rail)_1fr]'
