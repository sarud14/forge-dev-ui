'use client'

import { useState, type JSX } from 'react'
import type { DataTableColumn, DataTableProps, DataTableSort } from '../types'
import { cx } from '../helpers'
import { DEFAULT_EMPTY_STATE, nextTableSort, sortTableRows } from './sortTableRows'

export { DEFAULT_EMPTY_STATE }

function ariaSortValue<T>(
  column: DataTableColumn<T>,
  sort: DataTableSort | undefined
): 'none' | 'ascending' | 'descending' | undefined {
  if (column.sortable !== true || column.sortValue === undefined) {
    return undefined
  }

  if (sort?.columnId !== column.id) {
    return 'none'
  }

  return sort.direction === 'asc' ? 'ascending' : 'descending'
}

/**
 * Tabular data display. Sort lives in `sortTableRows` so it can be unit-tested without
 * rendering. Sortable headers are real buttons with accessible names — never click-handled
 * divs (docs/DESIGN_SYSTEM.md, requirement/forge-requirements.md §11 step 10).
 */
export function DataTable<T>({
  columns,
  data,
  getRowId,
  emptyState = DEFAULT_EMPTY_STATE,
  caption,
  'aria-label': ariaLabel,
  sort,
  defaultSort,
  onSortChange,
}: DataTableProps<T>): JSX.Element {
  const [uncontrolledSort, setUncontrolledSort] = useState<DataTableSort | undefined>(defaultSort)
  const isControlled = sort !== undefined
  const resolvedSort = isControlled ? sort : uncontrolledSort
  const activeColumn = columns.find((column) => column.id === resolvedSort?.columnId)
  const sortedData =
    resolvedSort !== undefined &&
    activeColumn?.sortable === true &&
    activeColumn.sortValue !== undefined
      ? sortTableRows(data, resolvedSort.direction, activeColumn.sortValue)
      : data

  function handleSort(columnId: string): void {
    const next = nextTableSort(resolvedSort, columnId)
    onSortChange?.(next)
    if (!isControlled) {
      setUncontrolledSort(next)
    }
  }

  return (
    <div className="w-full overflow-x-auto rounded-[var(--radius-md)] border border-[var(--color-border)]">
      <table
        aria-label={caption === undefined ? ariaLabel : undefined}
        className="w-full border-collapse"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {caption !== undefined ? (
          <caption
            className="border-b border-[var(--color-border)] px-[12px] py-[10px] text-left text-[length:var(--text-sm)] text-[var(--color-muted-foreground)]"
          >
            {caption}
          </caption>
        ) : null}
        <thead>
          <tr className="bg-[var(--color-muted)]">
            {columns.map((column) => {
              const isSortable = column.sortable === true && column.sortValue !== undefined
              const sortState = ariaSortValue(column, resolvedSort)
              const dataSort =
                sortState === 'ascending' ? 'asc' : sortState === 'descending' ? 'desc' : 'none'

              return (
                <th
                  key={column.id}
                  scope="col"
                  aria-sort={sortState}
                  data-sort={isSortable ? dataSort : undefined}
                  className="border-b border-[var(--color-border)] px-[12px] py-[10px] text-left text-[length:var(--text-xs)] font-medium text-[var(--color-muted-foreground)]"
                >
                  {isSortable ? (
                    <button
                      type="button"
                      onClick={() => {
                        handleSort(column.id)
                      }}
                      className={cx(
                        'inline-flex items-center gap-[var(--space-1)] bg-transparent p-0 text-inherit',
                        'border-0 cursor-pointer font-medium',
                        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]'
                      )}
                    >
                      {column.header}
                      <span aria-hidden="true">
                        {sortState === 'ascending' ? '↑' : sortState === 'descending' ? '↓' : '↕'}
                      </span>
                    </button>
                  ) : (
                    column.header
                  )}
                </th>
              )
            })}
          </tr>
        </thead>
        <tbody>
          {sortedData.length === 0 ? (
            <tr>
              <td
                colSpan={Math.max(columns.length, 1)}
                className="px-[12px] py-[var(--space-3)] text-center text-[length:var(--text-sm)] text-[var(--color-muted-foreground)]"
              >
                {emptyState}
              </td>
            </tr>
          ) : (
            sortedData.map((row) => (
              <tr key={getRowId(row)} className="hover:bg-[var(--color-muted)]/40">
                {columns.map((column) => (
                  <td
                    key={column.id}
                    className="border-b border-[var(--color-border)] px-[12px] py-[10px] text-[length:var(--text-sm)] text-[var(--color-foreground)]"
                  >
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
