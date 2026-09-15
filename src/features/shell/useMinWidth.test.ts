import { describe, expect, it, vi, beforeEach } from 'vitest'
import { renderHook } from '@testing-library/react'
import { BREAKPOINTS } from '@/components/ui'
import { useMinWidth } from './useMinWidth'

function stubMatchMedia(matches: boolean): void {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
    onchange: null,
  }))
}

describe('useMinWidth', () => {
  beforeEach(() => {
    stubMatchMedia(false)
  })

  it('is false below the stop', () => {
    stubMatchMedia(false)
    const { result } = renderHook(() => useMinWidth(BREAKPOINTS.laptop))

    expect(result.current).toBe(false)
  })

  it('is true at or above the stop', () => {
    stubMatchMedia(true)
    const { result } = renderHook(() => useMinWidth(BREAKPOINTS.laptop))

    expect(result.current).toBe(true)
  })
})
