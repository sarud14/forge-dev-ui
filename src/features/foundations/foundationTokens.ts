import type { FoundationBreakpointRow } from '@/types/foundation.types'

export const FOUNDATION_COLOR_TOKENS: readonly string[] = [
  '--color-background',
  '--color-foreground',
  '--color-primary',
  '--color-muted',
  '--color-border',
  '--color-muted-foreground',
  '--color-brand',
  '--color-danger',
]

export const FOUNDATION_SPACE_TOKENS: readonly string[] = [
  '--space-1',
  '--space-2',
  '--space-3',
  '--space-4',
]

export const FOUNDATION_RADIUS_TOKENS: readonly string[] = [
  '--radius-sm',
  '--radius-md',
  '--radius-lg',
]

export const FOUNDATION_BREAKPOINT_ROWS: readonly FoundationBreakpointRow[] = [
  { token: '--bp-phone-sm', label: 'compact phone' },
  { token: '--bp-phone-lg', label: 'Pro Max-class phone' },
  { token: '--bp-tablet', label: 'tablet' },
  { token: '--bp-laptop', label: 'persistent sidebar' },
  { token: '--bp-desktop', label: 'desktop' },
]

export const FOUNDATION_SIZE_TOKENS: readonly string[] = [
  '--size-sidebar',
  '--size-dialog',
  '--size-content',
  '--size-content-wide',
  '--size-playground-rail',
]
