import type { Metadata } from 'next'
import type { JSX } from 'react'
import { ButtonDoc } from '@/features/components/ButtonDoc'
import { InputDoc } from '@/features/components/InputDoc'

export const metadata: Metadata = { title: 'Components' }

export default function ComponentsPage(): JSX.Element {
  return (
    <div style={{ padding: '64px 56px', maxWidth: 920 }}>
      <div
        style={{
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-primary)',
          fontWeight: 600,
          marginBottom: 'var(--space-2)',
        }}
      >
        Components
      </div>
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 600,
          margin: '0 0 var(--space-2)',
        }}
      >
        Components
      </h1>
      <p
        style={{
          fontSize: 'var(--text-base)',
          color: 'var(--color-muted-foreground)',
          lineHeight: 'var(--leading-relaxed)',
          maxWidth: 600,
          margin: '0 0 var(--space-8)',
        }}
      >
        Production-quality primitives with documented states, accessibility notes, and live
        previews. Phase 1 starts with Button and Input.
      </p>

      <section aria-labelledby="components-button-heading" style={{ marginBottom: 'var(--space-8)' }}>
        <h2
          id="components-button-heading"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-lg)',
            fontWeight: 600,
            margin: '0 0 var(--space-2)',
          }}
        >
          Button
        </h2>
        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-muted-foreground)',
            lineHeight: 'var(--leading-relaxed)',
            maxWidth: 600,
            margin: '0 0 var(--space-6)',
          }}
        >
          Trigger for an action, built on native button semantics. Four variants, three sizes, and
          default/hover/focus/active/disabled/loading states.
        </p>
        <ButtonDoc />
      </section>

      <section aria-labelledby="components-input-heading">
        <h2
          id="components-input-heading"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-lg)',
            fontWeight: 600,
            margin: '0 0 var(--space-2)',
          }}
        >
          Input
        </h2>
        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-muted-foreground)',
            lineHeight: 'var(--leading-relaxed)',
            maxWidth: 600,
            margin: '0 0 var(--space-6)',
          }}
        >
          Native text field with a danger tone and associated error text. React Hook Form and Zod
          bind through standard input props — Input does not import either library.
        </p>
        <InputDoc />
      </section>
    </div>
  )
}
