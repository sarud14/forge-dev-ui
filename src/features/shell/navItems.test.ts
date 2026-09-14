import { describe, expect, it } from 'vitest'
import { isNavItemActive, navItems } from './navItems'

describe('isNavItemActive', () => {
  it('matches the home route only on an exact "/"', () => {
    expect(isNavItemActive('/', '/')).toBe(true)
    expect(isNavItemActive('/', '/foundations')).toBe(false)
  })

  it('matches a section route and its sub-routes', () => {
    expect(isNavItemActive('/components', '/components')).toBe(true)
    expect(isNavItemActive('/components', '/components/button')).toBe(true)
    expect(isNavItemActive('/components', '/patterns')).toBe(false)
  })
})

describe('navItems', () => {
  it('covers every top-level route from the requirements doc', () => {
    const hrefs = navItems.map((item) => item.href)
    expect(hrefs).toEqual([
      '/',
      '/foundations',
      '/components',
      '/patterns',
      '/engineering',
      '/playground',
    ])
  })
})
