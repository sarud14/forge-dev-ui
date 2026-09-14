import { forwardRef } from 'react'
import type { ButtonProps } from '../types'
import { cx } from '../helpers'

/**
 * Exact padding/font-size per size from design/forge-editorial-dark. `lg`'s radius is
 * `--radius-lg` (16px) rather than the mockup's literal inline 10px — the mockup's own
 * Foundations page declares --radius-lg as 16px, so Button consumes that scale instead of a
 * parallel one-off value (AGENTS.md "Design Tokens": tokens are the single source of visual
 * truth). Flagged to Ruj, not silently resolved.
 */
const sizeClassNames = {
  sm: 'px-[14px] py-[6px] text-[length:var(--text-xs)] rounded-[var(--radius-sm)]',
  md: 'px-[20px] py-[10px] text-[length:var(--text-sm)] rounded-[var(--radius-md)]',
  lg: 'px-[28px] py-[14px] text-[length:var(--text-md)] rounded-[var(--radius-lg)]',
} as const

const variantClassNames = {
  primary: 'bg-[var(--color-primary)] text-[var(--color-background)] border-transparent hover:opacity-90',
  secondary:
    'bg-transparent text-[var(--color-primary)] border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10',
  ghost: 'bg-transparent text-[var(--color-foreground)] border-transparent hover:bg-[var(--color-border)]',
  destructive:
    'bg-[var(--color-danger)] text-[var(--color-foreground)] border-transparent hover:opacity-90',
} as const

/**
 * Trigger for an action, built on native button semantics. Variants: primary, secondary,
 * ghost, destructive. States: default, hover, focus, active, disabled, loading
 * (requirement/forge-requirements.md §3.5).
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { size = 'md', variant = 'primary', isLoading = false, disabled, children, ...props },
  ref
) {
  return (
    <button
      ref={ref}
      type={props.type ?? 'button'}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={cx(
        'inline-flex items-center justify-center font-medium border transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
        'disabled:opacity-40 disabled:pointer-events-none',
        isLoading && 'opacity-70',
        sizeClassNames[size],
        variantClassNames[variant]
      )}
      style={{ fontFamily: 'var(--font-sans)' }}
      {...props}
    >
      {isLoading ? 'Loading…' : children}
    </button>
  )
})
