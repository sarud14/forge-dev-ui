import { describe, expect, it } from 'vitest'
import { nextTableSort, sortTableRows } from './sortTableRows'

const rows = [
  { id: 'a', name: 'Toast', count: 3 },
  { id: 'b', name: 'Button', count: 11 },
  { id: 'c', name: 'Input', count: 2 },
] as const

describe('sortTableRows', () => {
  it('sorts strings ascending without mutating the input', () => {
    const original = [...rows]
    const sorted = sortTableRows(rows, 'asc', (row) => row.name)

    expect(sorted.map((row) => row.name)).toEqual(['Button', 'Input', 'Toast'])
    expect(rows).toEqual(original)
  })

  it('sorts numbers descending', () => {
    const sorted = sortTableRows(rows, 'desc', (row) => row.count)

    expect(sorted.map((row) => row.count)).toEqual([11, 3, 2])
  })
})

describe('nextTableSort', () => {
  it('starts a new column at ascending', () => {
    expect(nextTableSort(undefined, 'name')).toEqual({ columnId: 'name', direction: 'asc' })
    expect(nextTableSort({ columnId: 'count', direction: 'desc' }, 'name')).toEqual({
      columnId: 'name',
      direction: 'asc',
    })
  })

  it('toggles direction on the same column', () => {
    expect(nextTableSort({ columnId: 'name', direction: 'asc' }, 'name')).toEqual({
      columnId: 'name',
      direction: 'desc',
    })
    expect(nextTableSort({ columnId: 'name', direction: 'desc' }, 'name')).toEqual({
      columnId: 'name',
      direction: 'asc',
    })
  })
})
