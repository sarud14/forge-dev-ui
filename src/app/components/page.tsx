import type { Metadata } from 'next'
import type { JSX } from 'react'
import { ButtonDoc } from '@/features/components/ButtonDoc'

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
        Button
      </h1>
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
    </div>
  )
}
