import type { Metadata } from 'next'
import type { JSX } from 'react'

export const metadata: Metadata = { title: 'Foundations' }

// Display data only — the tokens themselves are defined once in
// src/components/ui/tokens/*.css; this list must be kept in sync with that file
// (AGENTS.md "Always Do" — a token in code but not documented is as good as undocumented).
const colorTokens = [
  { name: '--color-background', value: '#12151b' },
  { name: '--color-foreground', value: '#eef1f5' },
  { name: '--color-primary', value: '#45c4b0' },
  { name: '--color-muted', value: '#1a1e26' },
  { name: '--color-border', value: '#2b3140' },
  { name: '--color-muted-foreground', value: '#93a0b0' },
  { name: '--color-danger', value: '#b5453a' },
] as const

const spaceTokens = [
  { name: '--space-1', px: 8 },
  { name: '--space-2', px: 16 },
  { name: '--space-3', px: 24 },
  { name: '--space-4', px: 32 },
] as const

const radiusTokens = [
  { name: '--radius-sm', px: 6 },
  { name: '--radius-md', px: 10 },
  { name: '--radius-lg', px: 16 },
] as const

export default function FoundationsPage(): JSX.Element {
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
        Foundations
      </div>
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 600,
          margin: '0 0 var(--space-6)',
        }}
      >
        Design tokens
      </h1>

      <div
        style={{
          fontSize: 'var(--text-xs)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          fontWeight: 600,
          color: 'var(--color-muted-foreground)',
          marginBottom: 14,
        }}
      >
        Color
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 14,
          marginBottom: 'var(--space-8)',
        }}
      >
        {colorTokens.map((tok) => (
          <div
            key={tok.name}
            style={{
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid var(--color-border)',
            }}
          >
            <div style={{ height: 64, background: tok.value }} />
            <div style={{ padding: 12, background: 'var(--color-muted)' }}>
              <div style={{ fontSize: 'var(--text-xs)', fontWeight: 600 }}>{tok.name}</div>
              <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-muted-foreground)' }}>
                {tok.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          fontSize: 'var(--text-xs)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          fontWeight: 600,
          color: 'var(--color-muted-foreground)',
          marginBottom: 14,
        }}
      >
        Spacing scale
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 20,
          background: 'var(--color-muted)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-4)',
          marginBottom: 'var(--space-8)',
          border: '1px solid var(--color-border)',
        }}
      >
        {spaceTokens.map((sp) => (
          <div key={sp.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 28, borderRadius: 4, background: 'var(--color-primary)', height: sp.px }} />
            <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-muted-foreground)' }}>{sp.name}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          fontSize: 'var(--text-xs)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          fontWeight: 600,
          color: 'var(--color-muted-foreground)',
          marginBottom: 14,
        }}
      >
        Radius scale
      </div>
      <div
        style={{
          display: 'flex',
          gap: 20,
          background: 'var(--color-muted)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-4)',
          border: '1px solid var(--color-border)',
        }}
      >
        {radiusTokens.map((r) => (
          <div key={r.name} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 56,
                height: 56,
                background: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                borderRadius: r.px,
              }}
            />
            <div style={{ fontSize: 'var(--text-2xs)', color: 'var(--color-muted-foreground)' }}>{r.name}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
