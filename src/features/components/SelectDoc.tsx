'use client'

import { useState, type JSX } from 'react'
import { PREVIEW_GRID_CLASS, Select } from '@/components/ui'

type DocTab = 'preview' | 'code' | 'a11y'

const tabs: readonly { readonly id: DocTab; readonly label: string }[] = [
  { id: 'preview', label: 'Preview' },
  { id: 'code', label: 'Code' },
  { id: 'a11y', label: 'Accessibility' },
]

const sizeOptions = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
] as const

const a11yNotes: readonly string[] = [
  'Renders a combobox trigger with a listbox of options — roles, aria-expanded, and typeahead come from Radix, not custom handlers.',
  'Focus state uses a visible 2px outline in --color-primary, matching Input so form fields share one focus language.',
  'disabled uses Radix’s disabled state on the trigger so keyboard and pointer both skip it.',
  'Pass aria-label (or associate a visible label) — the trigger has no built-in visible <label>.',
]

/**
 * Select documentation: Preview / Code / Accessibility. Client because the preview is a live
 * Radix Select (requirement/forge-requirements.md §3.5).
 */
export function SelectDoc(): JSX.Element {
  const [activeTab, setActiveTab] = useState<DocTab>('preview')

  return (
    <div>
      <div
        role="tablist"
        aria-label="Select documentation"
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
          <div>
            <div
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--color-muted-foreground)',
                marginBottom: 8,
              }}
            >
              Default
            </div>
            <Select aria-label="Size" options={sizeOptions} defaultValue="md" />
          </div>
          <div>
            <div
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--color-muted-foreground)',
                marginBottom: 8,
              }}
            >
              Disabled
            </div>
            <Select aria-label="Disabled size" options={sizeOptions} defaultValue="md" disabled />
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
          {`<Select aria-label="Size" options={sizeOptions} defaultValue="md" />
<Select aria-label="Size" options={sizeOptions} defaultValue="md" disabled />`}
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
