'use client'

import { useState, type ChangeEvent, type JSX } from 'react'
import { Button, Dialog } from '@/components/ui'
import type { ButtonVariant, Size } from '@/components/ui'

const variantOptions: readonly ButtonVariant[] = ['primary', 'secondary', 'ghost', 'destructive']
const sizeOptions: readonly Size[] = ['sm', 'md', 'lg']

function generateCode(props: {
  readonly variant: ButtonVariant
  readonly size: Size
  readonly label: string
  readonly disabled: boolean
  readonly isLoading: boolean
}): string {
  const attrs = [
    props.variant !== 'primary' ? `variant="${props.variant}"` : null,
    props.size !== 'md' ? `size="${props.size}"` : null,
    props.disabled ? 'disabled' : null,
    props.isLoading ? 'isLoading' : null,
  ].filter((attr): attr is string => attr !== null)

  const attrString = attrs.length > 0 ? ` ${attrs.join(' ')}` : ''
  return `<Button${attrString}>${props.label}</Button>`
}

/**
 * Interactive Button playground: adjust props, read the generated code, see it change live
 * (requirement/forge-requirements.md — Playground route). Client component for the same reason
 * as ButtonDoc — the whole point is live prop manipulation.
 */
export function PlaygroundControls(): JSX.Element {
  const [variant, setVariant] = useState<ButtonVariant>('primary')
  const [size, setSize] = useState<Size>('md')
  const [label, setLabel] = useState('Button')
  const [disabled, setDisabled] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  function handleLabelChange(event: ChangeEvent<HTMLInputElement>): void {
    setLabel(event.target.value)
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div>
          <label htmlFor="playground-variant" style={labelStyle}>
            Variant
          </label>
          <select
            id="playground-variant"
            value={variant}
            onChange={(event) => setVariant(event.target.value as ButtonVariant)}
            style={fieldStyle}
          >
            {variantOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="playground-size" style={labelStyle}>
            Size
          </label>
          <select
            id="playground-size"
            value={size}
            onChange={(event) => setSize(event.target.value as Size)}
            style={fieldStyle}
          >
            {sizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="playground-label" style={labelStyle}>
            Label
          </label>
          <input
            id="playground-label"
            type="text"
            value={label}
            onChange={handleLabelChange}
            style={fieldStyle}
          />
        </div>

        <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="checkbox" checked={disabled} onChange={(event) => setDisabled(event.target.checked)} />
          Disabled
        </label>

        <label style={{ ...labelStyle, display: 'flex', alignItems: 'center', gap: 8 }}>
          <input
            type="checkbox"
            checked={isLoading}
            onChange={(event) => setIsLoading(event.target.checked)}
          />
          Loading
        </label>

        <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: 'var(--space-4)' }}>
          <Dialog
            trigger={<Button variant="secondary">Open dialog demo</Button>}
            title="Delete component?"
            description="This demonstrates Dialog's focus-trap, Escape-to-close, and overlay-click dismissal."
          />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 220,
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--color-border)',
            background: 'var(--color-muted)',
          }}
        >
          <Button variant={variant} size={size} disabled={disabled} isLoading={isLoading}>
            {label}
          </Button>
        </div>

        <pre
          style={{
            background: 'var(--color-muted)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-foreground)',
            overflowX: 'auto',
            margin: 0,
          }}
        >
          {generateCode({ variant, size, label, disabled, isLoading })}
        </pre>
      </div>
    </div>
  )
}

const labelStyle = {
  display: 'block',
  fontSize: 'var(--text-xs)',
  fontWeight: 500,
  color: 'var(--color-muted-foreground)',
  marginBottom: 6,
} as const

const fieldStyle = {
  width: '100%',
  padding: '8px 12px',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--color-border)',
  background: 'var(--color-background)',
  color: 'var(--color-foreground)',
  fontSize: 'var(--text-sm)',
  fontFamily: 'var(--font-sans)',
} as const
