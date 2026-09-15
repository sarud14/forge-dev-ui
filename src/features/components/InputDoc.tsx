'use client'

import { useState, type JSX } from 'react'
import { Input, PREVIEW_GRID_CLASS } from '@/components/ui'
import type { InputTone } from '@/components/ui'
import { EMAIL_INVALID_MESSAGE } from '@/validators/email.validators'

type DocTab = 'preview' | 'code' | 'a11y'

const tabs: readonly { readonly id: DocTab; readonly label: string }[] = [
  { id: 'preview', label: 'Preview' },
  { id: 'code', label: 'Code' },
  { id: 'a11y', label: 'Accessibility' },
]

const tones: readonly InputTone[] = ['neutral', 'danger']

const a11yNotes: readonly string[] = [
  'Renders a native <input> — typing, Tab focus, and disabled skipping come from the platform, not custom keyboard handlers.',
  'Focus state uses a visible 2px outline in --color-primary, offset from the edge — never relies on color alone.',
  'errorMessage sets aria-invalid and points aria-describedby at the visible error text so the invalid state is announced with its reason.',
  'disabled uses the native attribute, not a visual-only style — screen readers and keyboard nav both skip it correctly.',
  'React Hook Form and Zod bind through native input props; Input itself does not import either library.',
]

function codeForTone(tone: InputTone): string {
  if (tone === 'danger') {
    return `<Input tone="danger" errorMessage="${EMAIL_INVALID_MESSAGE}" placeholder="you@example.com" />`
  }
  return `<Input placeholder="you@example.com" />`
}

/**
 * Input's documentation screen: Preview / Code / Accessibility tabs over the tone/state matrix.
 * Client component — tab state is interactive (requirement/forge-requirements.md §3.5).
 */
export function InputDoc(): JSX.Element {
  const [activeTab, setActiveTab] = useState<DocTab>('preview')

  return (
    <div>
      <div
        role="tablist"
        aria-label="Input documentation"
        style={{
          display: 'flex',
          gap: 4,
          marginBottom: 'var(--space-4)',
          borderBottom: '1px solid var(--color-border)',
        }}
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
              borderBottom:
                activeTab === tab.id ? '2px solid var(--color-primary)' : '2px solid transparent',
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
        <div className={PREVIEW_GRID_CLASS}>
          <div
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
              default
            </div>
            <Input aria-label="Default email" placeholder="you@example.com" />
          </div>
          <div
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
              disabled
            </div>
            <Input aria-label="Disabled email" placeholder="you@example.com" disabled />
          </div>
          <div
            style={{
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4)',
              background: 'var(--color-muted)',
              gridColumn: '1 / -1',
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
              danger / invalid
            </div>
            <Input
              aria-label="Invalid email"
              placeholder="you@example.com"
              errorMessage={EMAIL_INVALID_MESSAGE}
            />
          </div>
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
          {tones.map(codeForTone).join('\n')}
        </pre>
      ) : null}

      {activeTab === 'a11y' ? (
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 20, margin: 0 }}>
          {a11yNotes.map((note) => (
            <li
              key={note}
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--color-muted-foreground)',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              {note}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
