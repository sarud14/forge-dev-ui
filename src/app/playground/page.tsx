import type { Metadata } from 'next'
import type { JSX } from 'react'
import { PlaygroundControls } from '@/features/playground/PlaygroundControls'

export const metadata: Metadata = { title: 'Playground' }

export default function PlaygroundPage(): JSX.Element {
  return (
    <div style={{ padding: '64px 56px', maxWidth: 1040 }}>
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
        Playground
      </div>
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 600,
          margin: '0 0 var(--space-2)',
        }}
      >
        Try Button
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
        Adjust props on the left, read the generated code, and see the result live.
      </p>

      <PlaygroundControls />
    </div>
  )
}
