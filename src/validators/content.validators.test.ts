import { describe, expect, it } from 'vitest'
import { isSafeContentSlug, parseComponentDocMeta } from './content.validators'

describe('isSafeContentSlug', () => {
  it('accepts kebab-case slugs and rejects path traversal', () => {
    expect(isSafeContentSlug('data-table')).toBe(true)
    expect(isSafeContentSlug('../etc/passwd')).toBe(false)
    expect(isSafeContentSlug('Button')).toBe(false)
  })
})

describe('parseComponentDocMeta', () => {
  it('returns a meta object when required fields are present', () => {
    expect(
      parseComponentDocMeta({
        slug: 'button',
        title: 'Button',
        summary: 'Trigger for an action',
        order: '1',
      })
    ).toEqual({
      slug: 'button',
      title: 'Button',
      summary: 'Trigger for an action',
      order: 1,
    })
  })

  it('rejects incomplete or unsafe frontmatter', () => {
    expect(parseComponentDocMeta({ slug: 'button', title: 'Button' })).toBeNull()
    expect(
      parseComponentDocMeta({
        slug: '../nope',
        title: 'X',
        summary: 'Y',
        order: '1',
      })
    ).toBeNull()
  })
})
