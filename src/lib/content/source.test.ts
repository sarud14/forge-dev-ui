import { describe, expect, it } from 'vitest'
import {
  componentDocHref,
  engineeringDocHref,
  foundationDocHref,
  getComponentDoc,
  getComponentDocs,
  getEngineeringDoc,
  getEngineeringDocs,
  getFoundationDoc,
  getFoundationDocs,
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

describe('getEngineeringDocs', () => {
  it('returns the Phase 1 engineering set in frontmatter order', async () => {
    const docs = await getEngineeringDocs()

    expect(docs.map((doc) => doc.slug)).toEqual([
      'accessibility',
      'performance',
      'testing',
      'decisions',
    ])
  })
})

describe('engineeringDocHref', () => {
  it('builds the per-slug engineering path', () => {
    expect(engineeringDocHref('accessibility')).toBe('/engineering/accessibility')
  })
})

describe('getEngineeringDoc', () => {
  it('returns the body for a known slug', async () => {
    const doc = await getEngineeringDoc('testing')

    expect(doc?.title).toBe('Testing')
    expect(doc?.body).toContain('Levels')
  })

  it('returns null for an unknown or unsafe slug', async () => {
    expect(await getEngineeringDoc('not-a-guide')).toBeNull()
    expect(await getEngineeringDoc('../testing')).toBeNull()
  })
})

describe('getFoundationDocs', () => {
  it('returns the Phase 1 foundation set in frontmatter order', async () => {
    const docs = await getFoundationDocs()

    expect(docs.map((doc) => doc.slug)).toEqual(['principles', 'tokens', 'layout'])
  })
})

describe('foundationDocHref', () => {
  it('builds the per-slug foundation path', () => {
    expect(foundationDocHref('tokens')).toBe('/foundations/tokens')
  })
})

describe('getFoundationDoc', () => {
  it('returns the body for a known slug', async () => {
    const doc = await getFoundationDoc('principles')

    expect(doc?.title).toBe('Principles')
    expect(doc?.body).toContain('Stance')
  })

  it('returns null for an unknown or unsafe slug', async () => {
    expect(await getFoundationDoc('not-a-foundation')).toBeNull()
    expect(await getFoundationDoc('../tokens')).toBeNull()
  })
})
