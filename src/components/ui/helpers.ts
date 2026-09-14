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
