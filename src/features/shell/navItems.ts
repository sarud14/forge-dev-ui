export interface NavItem {
  readonly href: string
  readonly label: string
}

/**
 * Pure data — no React/router import (AGENTS.md "Feature Folders & Layering").
 * The mockup's sidebar shows only Overview/Foundations/Components/Playground; Patterns and
 * Engineering are kept here too since they're already-approved routes (requirement doc §5,
 * docs/ARCHITECTURE.md's Routing section) that the mockup simply didn't get around to mocking —
 * flagged to Ruj rather than silently dropped.
 */
export const navItems: readonly NavItem[] = [
  { href: '/', label: 'Overview' },
  { href: '/foundations', label: 'Foundations' },
  { href: '/components', label: 'Components' },
  { href: '/patterns', label: 'Patterns' },
  { href: '/engineering', label: 'Engineering' },
  { href: '/playground', label: 'Playground' },
]

/** Pure predicate — the active-nav-item rule, testable without rendering. */
export function isNavItemActive(itemHref: string, pathname: string): boolean {
  if (itemHref === '/') return pathname === '/'
  return pathname === itemHref || pathname.startsWith(`${itemHref}/`)
}
