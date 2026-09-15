import type { DataTableSort, DataTableSortDirection } from '../types'

export const DEFAULT_EMPTY_STATE = 'No results.'

function compareSortValues(left: string | number, right: string | number): number {
  if (typeof left === 'number' && typeof right === 'number') {
    return left - right
  }

  return String(left).localeCompare(String(right), undefined, {
    numeric: true,
    sensitivity: 'base',
  })
}

/**
 * Returns a new array ordered by `getSortValue`. Pure — no React, no in-place mutation
 * (AGENTS.md: non-trivial business logic lives in a framework-free function).
 */
export function sortTableRows<T>(
  data: readonly T[],
  direction: DataTableSortDirection,
  getSortValue: (row: T) => string | number
): readonly T[] {
  const sorted = [...data]
  const sign = direction === 'asc' ? 1 : -1

  sorted.sort((left, right) => sign * compareSortValues(getSortValue(left), getSortValue(right)))

  return sorted
}

/**
 * First click on a column sorts ascending; clicking the same column toggles direction.
 * Clicking a different column starts that column at ascending.
 */
export function nextTableSort(current: DataTableSort | undefined, columnId: string): DataTableSort {
  if (current?.columnId !== columnId) {
    return { columnId, direction: 'asc' }
  }

  return { columnId, direction: current.direction === 'asc' ? 'desc' : 'asc' }
}
