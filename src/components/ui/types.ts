import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactNode } from 'react'

/** Every shared prop interface/union for the design system lives here — never inline. */
export type Size = 'sm' | 'md' | 'lg'

/**
 * Semantic feedback tone. Input consumes the `neutral`/`danger` subset via `InputTone`.
 * Toast will use the remaining values (requirement doc §10.4, Build Order step 8). Button
 * uses `variant` instead of `tone`.
 */
export type Tone = 'neutral' | 'success' | 'info' | 'warning' | 'danger' | 'brand'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  readonly size?: Size
  readonly variant?: ButtonVariant
  readonly isLoading?: boolean
}

/** Input only ships `md` in Phase 1 — the union is closed so a later size is an explicit API change. */
export type InputSize = Extract<Size, 'md'>

/** Visual/validation tone for Input — a closed subset of `Tone`, not a parallel palette. */
export type InputTone = Extract<Tone, 'neutral' | 'danger'>

/**
 * Native text input. `size` is omitted from the HTML attribute set because the HTML `size`
 * attribute is a character-width number, not Forge's token size. `errorMessage` is Forge-only
 * and must not be forwarded to the DOM.
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'size'> {
  readonly size?: InputSize
  readonly tone?: InputTone
  readonly errorMessage?: string
}

export interface DialogProps {
  readonly trigger: ReactNode
  readonly title: string
  readonly description?: string
  readonly children?: ReactNode
  readonly open?: boolean
  readonly onOpenChange?: (open: boolean) => void
}
