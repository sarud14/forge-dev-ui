import { describe, expect, it } from 'vitest'
import {
  componentDocHref,
  getComponentDoc,
  getComponentDocs,
  getPatternDoc,
  getPatternDocs,
  patternDocHref,
} from './source'

describe('getComponentDocs', () => {
  it('returns the Phase 1 component set in frontmatter order', async () => {
    const docs = await getComponentDocs()

    expect(docs.map((doc) => doc.slug)).toEqual([
      'button',
      'input',
      'select',
      'tabs',
      'tooltip',
      'dialog',
      'toast',
      'data-table',
    ])
  })
})

describe('componentDocHref', () => {
  it('builds the per-slug documentation path', () => {
    expect(componentDocHref('data-table')).toBe('/components/data-table')
  })
})

describe('getPatternDocs', () => {
  it('returns the Phase 1 pattern set in frontmatter order', async () => {
    const docs = await getPatternDocs()

    expect(docs.map((doc) => doc.slug)).toEqual([
      'form',
      'search',
      'data-table',
      'empty-state',
      'loading-state',
      'error-state',
      'confirmation',
    ])
  })
})

describe('patternDocHref', () => {
  it('builds the per-slug pattern path', () => {
    expect(patternDocHref('empty-state')).toBe('/patterns/empty-state')
  })
})

describe('getComponentDoc', () => {
  it('returns the body for a known slug', async () => {
    const doc = await getComponentDoc('button')

    expect(doc?.title).toBe('Button')
    expect(doc?.body).toContain('When to use')
  })

  it('returns null for an unknown or unsafe slug', async () => {
    expect(await getComponentDoc('not-a-component')).toBeNull()
    expect(await getComponentDoc('../button')).toBeNull()
  })
})

describe('getPatternDoc', () => {
  it('returns the body for a known slug', async () => {
    const doc = await getPatternDoc('form')

    expect(doc?.title).toBe('Form')
    expect(doc?.body).toContain('When to use')
  })

  it('returns null for an unknown or unsafe slug', async () => {
    expect(await getPatternDoc('not-a-pattern')).toBeNull()
    expect(await getPatternDoc('../form')).toBeNull()
  })
})
