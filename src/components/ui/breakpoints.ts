/**
 * Pixel copies of `tokens/breakpoints.css`. Media queries cannot use custom properties,
 * so matchMedia and this map share these numbers (docs/DESIGN_SYSTEM.md → Breakpoints).
 */
export const BREAKPOINTS = {
  phoneSm: 360,
  phoneLg: 430,
  tablet: 768,
  laptop: 1024,
  desktop: 1440,
} as const

export type BreakpointName = keyof typeof BREAKPOINTS

export function minWidthQuery(px: number): string {
  return `(min-width: ${String(px)}px)`
}
