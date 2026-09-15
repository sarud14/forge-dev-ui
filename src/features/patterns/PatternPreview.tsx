'use client'

import { useState, type FormEvent, type JSX } from 'react'
import { Button, DataTable, Dialog, Input } from '@/components/ui'
import type { DataTableColumn } from '@/components/ui'
import type { ComponentDocPreviewProps } from '@/types/content.types'

const tableColumns: readonly DataTableColumn<{ readonly name: string }>[] = [
  {
    id: 'name',
    header: 'Name',
    cell: (row) => row.name,
  },
]

/**
 * Live composition demos for pattern slugs. Lives in features/patterns so
 * features/documentation never imports this folder.
 */
export function PatternPreview({ slug }: ComponentDocPreviewProps): JSX.Element | null {
  const [query, setQuery] = useState('')

  switch (slug) {
    case 'form':
      return (
        <form
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
          }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            maxWidth: 'var(--size-dialog)',
          }}
        >
          <Input aria-label="Email" name="email" placeholder="you@example.com" />
          <Button type="submit">Save</Button>
        </form>
      )
    case 'search':
      return (
        <form
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
          }}
          style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)', alignItems: 'end' }}
        >
          <Input
            aria-label="Search"
            name="q"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Find a component"
          />
          <Button type="submit">Search</Button>
        </form>
      )
    case 'data-table':
      return (
        <DataTable
          aria-label="Components"
          columns={tableColumns}
          data={[{ name: 'Button' }, { name: 'Input' }]}
          getRowId={(row) => row.name}
        />
      )
    case 'empty-state':
      return (
        <DataTable
          aria-label="Components"
          columns={tableColumns}
          data={[]}
          emptyState="No components yet."
          getRowId={(row) => row.name}
        />
      )
    case 'loading-state':
      return <Button isLoading>Save</Button>
    case 'error-state':
      return (
        <Input
          aria-label="Email"
          tone="danger"
          errorMessage="Enter a valid email"
          defaultValue="not-an-email"
        />
      )
    case 'confirmation':
      return (
        <Dialog
          trigger={<Button variant="destructive">Delete component</Button>}
          title="Delete component?"
          description="This cannot be undone."
        />
      )
    default:
      return null
  }
}
