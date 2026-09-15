import { describe, expect, it } from 'vitest'
import { PAGE_FRAME_DOC_CLASS, PREVIEW_GRID_CLASS, PLAYGROUND_SPLIT_CLASS } from './helpers'

describe('responsive layout class helpers', () => {
  it('names the tablet and laptop Tailwind stops', () => {
    expect(PREVIEW_GRID_CLASS).toContain('tablet:grid-cols-2')
    expect(PLAYGROUND_SPLIT_CLASS).toContain('laptop:grid-cols-')
    expect(PAGE_FRAME_DOC_CLASS).toContain('desktop:p-[var(--space-8)]')
  })
})
