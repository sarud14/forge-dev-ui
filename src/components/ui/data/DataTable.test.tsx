import { describe, expect, it, vi } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DataTable } from './DataTable'
import { DEFAULT_EMPTY_STATE } from './sortTableRows'
import type { DataTableColumn } from '../types'

interface Row {
  readonly id: string
  readonly name: string
  readonly status: string
  readonly notes: string
}

const rows: readonly Row[] = [
  { id: 'toast', name: 'Toast', status: 'Stable', notes: 'Live region' },
  { id: 'button', name: 'Button', status: 'Draft', notes: 'Native button' },
  { id: 'input', name: 'Input', status: 'Stable', notes: 'No RHF' },
]

const columns: readonly DataTableColumn<Row>[] = [
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
  { id: 'notes', header: 'Notes', cell: (row) => row.notes },
]

function renderTable(): void {
  render(
    <DataTable
      aria-label="Components"
      columns={columns}
      data={rows}
      getRowId={(row) => row.id}
    />
  )
}

describe('DataTable', () => {
  it('renders a named table with headers and cells', () => {
    renderTable()

    expect(screen.getByRole('table', { name: 'Components' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Notes' })).toHaveTextContent('Notes')
    expect(screen.getByText('Toast')).toBeInTheDocument()
    expect(screen.getByText('Live region')).toBeInTheDocument()
  })

  it('uses a real button for sortable headers and plain text for others', () => {
    renderTable()

    expect(screen.getByRole('button', { name: 'Name' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Status' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Notes' })).not.toBeInTheDocument()
  })

  it('sorts rows when a sortable header is activated', async () => {
    const user = userEvent.setup()
    renderTable()

    await user.click(screen.getByRole('button', { name: 'Name' }))

    const bodyRows = screen.getAllByRole('row').slice(1)
    expect(within(bodyRows[0] as HTMLElement).getByText('Button')).toBeInTheDocument()
    expect(within(bodyRows[1] as HTMLElement).getByText('Input')).toBeInTheDocument()
    expect(within(bodyRows[2] as HTMLElement).getByText('Toast')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute(
      'aria-sort',
      'ascending'
    )
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute('data-sort', 'asc')
  })

  it('toggles sort direction and reports it through onSortChange', async () => {
    const user = userEvent.setup()
    const onSortChange = vi.fn()
    render(
      <DataTable
        aria-label="Components"
        columns={columns}
        data={rows}
        getRowId={(row) => row.id}
        onSortChange={onSortChange}
      />
    )

    await user.click(screen.getByRole('button', { name: 'Name' }))
    await user.click(screen.getByRole('button', { name: 'Name' }))

    expect(onSortChange).toHaveBeenLastCalledWith({ columnId: 'name', direction: 'desc' })
    expect(screen.getByRole('columnheader', { name: 'Name' })).toHaveAttribute(
      'aria-sort',
      'descending'
    )
  })

  it('shows emptyState when there are no rows', () => {
    render(
      <DataTable
        aria-label="Components"
        columns={columns}
        data={[]}
        getRowId={(row) => row.id}
      />
    )

    expect(screen.getByText(DEFAULT_EMPTY_STATE)).toBeInTheDocument()
    expect(screen.queryByText('Toast')).not.toBeInTheDocument()
  })
})
