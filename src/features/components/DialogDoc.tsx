'use client'

import { useState, type JSX } from 'react'
import { Button, Dialog } from '@/components/ui'

type DocTab = 'preview' | 'code' | 'a11y'

const tabs: readonly { readonly id: DocTab; readonly label: string }[] = [
  { id: 'preview', label: 'Preview' },
  { id: 'code', label: 'Code' },
  { id: 'a11y', label: 'Accessibility' },
]

const a11yNotes: readonly string[] = [
  'Focus is trapped while open and restored to the trigger on close — via Radix, not custom listeners.',
  'Escape and overlay-click dismiss. role="dialog" and aria-modal come from Radix.',
  'The title is a real dialog name. Description, when passed, is associated as the accessible description.',
  'Default footer buttons are real Buttons wrapped in Radix Close — Cancel and Confirm both dismiss.',
]

/**
 * Dialog documentation: Preview / Code / Accessibility. Client because the preview opens a
 * real modal (requirement/forge-requirements.md §3.5).
 */
export function DialogDoc(): JSX.Element {
  const [activeTab, setActiveTab] = useState<DocTab>('preview')

  return (
    <div>
      <div
        role="tablist"
        aria-label="Dialog documentation"
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
        <Dialog
          trigger={<Button>Open dialog</Button>}
          title="Delete component?"
          description="This demonstrates Dialog’s focus-trap, Escape-to-close, and overlay-click dismissal."
        />
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
          {`<Dialog trigger={<Button>Open dialog</Button>} title="Delete component?" />`}
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
