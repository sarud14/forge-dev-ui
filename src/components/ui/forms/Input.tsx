import { forwardRef, useId } from 'react'
import type { InputProps, InputTone } from '../types'
import { cx } from '../helpers'

const sizeClassNames = {
  md: 'px-[12px] py-[10px] text-[length:var(--text-sm)] rounded-[var(--radius-md)]',
} as const

const toneClassNames: Record<InputTone, string> = {
  neutral: 'border-[var(--color-border)]',
  danger: 'border-[var(--color-danger)]',
}

function isAriaInvalid(value: InputProps['aria-invalid']): boolean {
  return value === true || value === 'true'
}

/**
 * Native text input. Validation libraries (React Hook Form, Zod) bind via standard input
 * props — this primitive must not import them (AGENTS.md: `components/ui` stays self-contained).
 * When `errorMessage` is set, `aria-invalid` and `aria-describedby` are wired to the message
 * (docs/DESIGN_SYSTEM.md accessibility contract).
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size = 'md',
    tone,
    errorMessage,
    disabled,
    id,
    'aria-invalid': ariaInvalid,
    'aria-describedby': ariaDescribedBy,
    ...props
  },
  ref
) {
  const generatedId = useId()
  const inputId = id ?? generatedId
  const errorId = errorMessage !== undefined && errorMessage !== '' ? `${inputId}-error` : undefined
  const isInvalid = errorId !== undefined || isAriaInvalid(ariaInvalid)
  const resolvedTone: InputTone = tone ?? (isInvalid ? 'danger' : 'neutral')
  const describedBy = [ariaDescribedBy, errorId].filter(Boolean).join(' ') || undefined

  return (
    <div className="flex w-full flex-col gap-[var(--space-1)]">
      <input
        {...props}
        ref={ref}
        id={inputId}
        disabled={disabled}
        aria-invalid={isInvalid || undefined}
        aria-describedby={describedBy}
        className={cx(
          'w-full border bg-[var(--color-background)] text-[var(--color-foreground)]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
          'disabled:opacity-40 disabled:pointer-events-none',
          sizeClassNames[size],
          toneClassNames[resolvedTone]
        )}
        style={{ fontFamily: 'var(--font-sans)' }}
      />
      {errorId !== undefined ? (
        <p
          id={errorId}
          style={{
            fontSize: 'var(--text-2xs)',
            color: 'var(--color-danger)',
            margin: 0,
            lineHeight: 'var(--leading-normal)',
          }}
        >
          {errorMessage}
        </p>
      ) : null}
    </div>
  )
})
