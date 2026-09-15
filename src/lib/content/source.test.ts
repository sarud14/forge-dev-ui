import { describe, expect, it } from 'vitest'
import { componentDocHref, getComponentDoc, getComponentDocs } from './source'

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
