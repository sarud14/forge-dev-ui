'use client'

import { useState, type JSX } from 'react'
import { DataTable, DEFAULT_EMPTY_STATE } from '@/components/ui'
import type { DataTableColumn } from '@/components/ui'

type DocTab = 'preview' | 'code' | 'a11y'

interface ExampleRow {
  readonly id: string
  readonly name: string
  readonly status: string
  readonly count: number
}

const tabs: readonly { readonly id: DocTab; readonly label: string }[] = [
  { id: 'preview', label: 'Preview' },
  { id: 'code', label: 'Code' },
  { id: 'a11y', label: 'Accessibility' },
]

const exampleRows: readonly ExampleRow[] = [
  { id: 'button', name: 'Button', status: 'Stable', count: 4 },
  { id: 'input', name: 'Input', status: 'Stable', count: 2 },
  { id: 'toast', name: 'Toast', status: 'Draft', count: 3 },
]

const exampleColumns: readonly DataTableColumn<ExampleRow>[] = [
  {
    id: 'name',
    header: 'Name',
    cell: (row) => row.name,
    sortable: true,
    sortValue: (row) => row.name,
  },
  {
    id: 'status',
    header: 'Status',
    cell: (row) => row.status,
    sortable: true,
    sortValue: (row) => row.status,
  },
  {
    id: 'count',
    header: 'Count',
    cell: (row) => String(row.count),
    sortable: true,
    sortValue: (row) => row.count,
  },
]

const a11yNotes: readonly string[] = [
  'Renders a native <table> with columnheader/row/cell roles — screen readers get a real data table, not a grid of divs.',
  'Sortable headers are real <button> elements with accessible names. aria-sort on the columnheader exposes none/ascending/descending.',
  'Non-sortable columns stay plain header text so they are not announced as actionable.',
  `emptyState replaces the body when data is empty (default “${DEFAULT_EMPTY_STATE}”). Headers remain so the table structure is still announced.`,
]

/**
 * Data Table documentation: Preview / Code / Accessibility. Client because the preview is a
 * live sortable table (requirement/forge-requirements.md §11 step 10).
 */
export function DataTableDoc(): JSX.Element {
  const [activeTab, setActiveTab] = useState<DocTab>('preview')

  return (
    <div>
      <div
        role="tablist"
        aria-label="Data Table documentation"
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <DataTable
            aria-label="Components"
            columns={exampleColumns}
            data={exampleRows}
            getRowId={(row) => row.id}
          />
          <div>
            <div
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--color-muted-foreground)',
                marginBottom: 8,
              }}
            >
              Empty
            </div>
            <DataTable
              aria-label="Empty components"
              columns={exampleColumns}
              data={[]}
              getRowId={(row) => row.id}
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
          {`<DataTable aria-label="Components" columns={columns} data={rows} getRowId={(row) => row.id} />
<DataTable aria-label="Components" columns={columns} data={[]} getRowId={(row) => row.id} />`}
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
