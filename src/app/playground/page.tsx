import type { Metadata } from 'next'
import type { JSX } from 'react'
import { PlaygroundControls } from '@/features/playground/PlaygroundControls'
import { PageFrame } from '@/features/shell/PageFrame'

export const metadata: Metadata = { title: 'Playground' }

export default function PlaygroundPage(): JSX.Element {
  return (
    <PageFrame width="wide">
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
        Try Button, Input, Select, Tabs, Tooltip, Toast, and Data Table
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
        Adjust props on the left, read the generated code, and see the result live. Input also
        has a React Hook Form + Zod email demo so validation is composed onto the primitive,
        not baked into it. Toast is fired with <code>toast()</code> into the app-wide live region.
        Tooltip uses <code>delayDuration=0</code> here so the preview appears immediately. Data
        Table sort is live — click a header to toggle ascending/descending.
      </p>

      <PlaygroundControls />
    </PageFrame>
  )
}
