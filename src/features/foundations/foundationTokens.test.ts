import { describe, expect, it } from 'vitest'
import {
  FOUNDATION_BREAKPOINT_ROWS,
  FOUNDATION_COLOR_TOKENS,
  FOUNDATION_RADIUS_TOKENS,
  FOUNDATION_SIZE_TOKENS,
  FOUNDATION_SPACE_TOKENS,
} from './foundationTokens'

describe('foundation token catalogs', () => {
  it('names the Editorial Dark color tokens shown on Foundations', () => {
    expect(FOUNDATION_COLOR_TOKENS).toContain('--color-primary')
    expect(FOUNDATION_COLOR_TOKENS).toContain('--color-danger')
  })

  it('includes the laptop stop where the sidebar stays on screen', () => {
    expect(FOUNDATION_BREAKPOINT_ROWS.map((row) => row.token)).toContain('--bp-laptop')
  })

  it('lists spacing, radius, and layout size tokens', () => {
    expect(FOUNDATION_SPACE_TOKENS).toEqual(['--space-1', '--space-2', '--space-3', '--space-4'])
    expect(FOUNDATION_RADIUS_TOKENS).toEqual(['--radius-sm', '--radius-md', '--radius-lg'])
    expect(FOUNDATION_SIZE_TOKENS).toContain('--size-content')
  })
})
