import type { ButtonHTMLAttributes, ReactNode } from 'react'

/** Every shared prop interface/union for the design system lives here — never inline. */
export type Size = 'sm' | 'md' | 'lg'

/**
 * Semantic feedback tone — not currently consumed by any built component (Button uses its own
 * `variant` union instead, matching design/forge-editorial-dark). Kept for Toast/feedback
 * components planned in requirement doc §10.4 (Build Order step 8).
 */
export type Tone = 'neutral' | 'success' | 'info' | 'warning' | 'danger' | 'brand'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  readonly size?: Size
  readonly variant?: ButtonVariant
  readonly isLoading?: boolean
}

export interface DialogProps {
  readonly trigger: ReactNode
  readonly title: string
  readonly description?: string
  readonly children?: ReactNode
  readonly open?: boolean
  readonly onOpenChange?: (open: boolean) => void
}
