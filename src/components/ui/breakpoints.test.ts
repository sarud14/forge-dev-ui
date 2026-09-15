import { describe, expect, it } from 'vitest'
import { BREAKPOINTS, minWidthQuery } from './breakpoints'

describe('BREAKPOINTS', () => {
  it('names the five device stops', () => {
    expect(BREAKPOINTS).toEqual({
      phoneSm: 360,
      phoneLg: 430,
      tablet: 768,
      laptop: 1024,
      desktop: 1440,
    })
  })
})

describe('minWidthQuery', () => {
  it('builds a min-width media query from a pixel stop', () => {
    expect(minWidthQuery(BREAKPOINTS.laptop)).toBe('(min-width: 1024px)')
  })
})
