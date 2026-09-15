'use client'

import type { JSX } from 'react'
import { ShellBrand } from './ShellBrand'
import { NavLinks } from './NavLinks'

/**
 * Persistent sidebar from the laptop stop up. Below that, AppShell renders a menu instead.
 */
export function Sidebar(): JSX.Element {
  return (
    <div
      style={{
        width: 'var(--size-sidebar)',
        flexShrink: 0,
        borderRight: '1px solid var(--color-border)',
        background: 'var(--color-muted)',
        padding: 'var(--space-4) 22px',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        minHeight: '100vh',
      }}
    >
      <header>
        <ShellBrand />
      </header>

      <NavLinks />

      <footer
        style={{
          marginTop: 'auto',
          fontSize: 'var(--text-2xs)',
          color: 'var(--color-muted-foreground)',
          lineHeight: 1.7,
          borderTop: '1px solid var(--color-border)',
          paddingTop: 'var(--space-2)',
        }}
      >
        Phase 1
        <br />
        Foundations → Components → Patterns → Accessibility → Testing → Docs
      </footer>
    </div>
  )
}
