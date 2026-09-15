'use client'

import { useState, type JSX } from 'react'
import { Tabs } from '@/components/ui'

type DocTab = 'preview' | 'code' | 'a11y'

const tabs: readonly { readonly id: DocTab; readonly label: string }[] = [
  { id: 'preview', label: 'Preview' },
  { id: 'code', label: 'Code' },
  { id: 'a11y', label: 'Accessibility' },
]

const exampleItems = [
  { value: 'usage', label: 'Usage', content: 'Import Tabs from @/components/ui and pass items.' },
  {
    value: 'a11y',
    label: 'Keyboard',
    content: 'Arrow keys, Home, and End move between tabs via Radix.',
  },
] as const

const a11yNotes: readonly string[] = [
  'Tablist, tab, and tabpanel roles — plus aria-selected — come from Radix, not a hand-rolled tablist.',
  'Arrow keys, Home, and End move focus between tabs; the selected tab is the one that is aria-selected.',
  'disabled items stay in the tablist but are not activatable (native disabled on the trigger).',
  'Pass aria-label so the tablist has an accessible name when there is no visible heading.',
]

/**
 * Tabs documentation: Preview / Code / Accessibility. The Preview/Code/A11y chrome stays a
 * local tablist (same as ButtonDoc) so this page does not nest two Tabs primitives. Client
 * because the preview is a live Tabs instance.
 */
export function TabsDoc(): JSX.Element {
  const [activeTab, setActiveTab] = useState<DocTab>('preview')

  return (
    <div>
      <div
        role="tablist"
        aria-label="Tabs documentation"
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
        <Tabs aria-label="Example" items={exampleItems} defaultValue="usage" />
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
          {`<Tabs defaultValue="usage" items={tabItems} />`}
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
