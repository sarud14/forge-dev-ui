'use client'

import { useState, type JSX } from 'react'
import { Button } from '@/components/ui'
import type { ButtonVariant } from '@/components/ui'

type DocTab = 'preview' | 'code' | 'a11y'

const tabs: readonly { readonly id: DocTab; readonly label: string }[] = [
  { id: 'preview', label: 'Preview' },
  { id: 'code', label: 'Code' },
  { id: 'a11y', label: 'Accessibility' },
]

const variants: readonly ButtonVariant[] = ['primary', 'secondary', 'ghost', 'destructive']

const a11yNotes: readonly string[] = [
  'Renders a native <button> — full keyboard operability (Space/Enter activation, Tab focus order) comes for free.',
  'Focus state uses a visible 2px outline in --color-primary, offset from the edge — never relies on color alone.',
  'isLoading sets aria-busy and disables the button so assistive tech does not announce it as actionable mid-request.',
  'disabled uses the native attribute, not a visual-only style — screen readers and keyboard nav both skip it correctly.',
  'Color contrast for every variant is checked against --color-background / --color-muted (see docs/DESIGN_SYSTEM.md).',
]

function codeForVariant(variant: ButtonVariant): string {
  return `<Button variant="${variant}">Button</Button>`
}

/**
 * Button's documentation screen: Preview / Code / Accessibility tabs over the variant grid.
 * Client component — tab state and the variant/state matrix are interactive
 * (requirement/forge-requirements.md §3.5; design-mockup skill Step 3 — Server vs Client
 * decided by the route's actual interactivity, not a blanket default).
 */
export function ButtonDoc(): JSX.Element {
  const [activeTab, setActiveTab] = useState<DocTab>('preview')

  return (
    <div>
      <div
        role="tablist"
        aria-label="Button documentation"
        style={{ display: 'flex', gap: 4, marginBottom: 'var(--space-4)', borderBottom: '1px solid var(--color-border)' }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 16px',
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              background: 'transparent',
              border: 'none',
              borderBottom: activeTab === tab.id ? '2px solid var(--color-primary)' : '2px solid transparent',
              color: activeTab === tab.id ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'preview' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--space-3)' }}>
          {variants.map((variant) => (
            <div
              key={variant}
              style={{
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                background: 'var(--color-muted)',
              }}
            >
              <div
                style={{
                  fontSize: 'var(--text-2xs)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                  color: 'var(--color-muted-foreground)',
                  marginBottom: 14,
                }}
              >
                {variant}
              </div>
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                <Button variant={variant}>Button</Button>
                <Button variant={variant} disabled>
                  Disabled
                </Button>
                <Button variant={variant} isLoading>
                  Loading
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {activeTab === 'code' ? (
        <pre
          style={{
            background: 'var(--color-muted)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            lineHeight: 'var(--leading-normal)',
            color: 'var(--color-foreground)',
            overflowX: 'auto',
          }}
        >
          {variants.map(codeForVariant).join('\n')}
        </pre>
      ) : null}

      {activeTab === 'a11y' ? (
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 20, margin: 0 }}>
          {a11yNotes.map((note) => (
            <li
              key={note}
              style={{ fontSize: 'var(--text-base)', color: 'var(--color-muted-foreground)', lineHeight: 'var(--leading-relaxed)' }}
            >
              {note}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
