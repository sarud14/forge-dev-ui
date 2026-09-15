'use client'

import { useState, type JSX } from 'react'
import { Button, BREAKPOINTS } from '@/components/ui'
import type { AppShellProps } from '@/types/shell.types'
import { NavLinks } from './NavLinks'
import { ShellBrand } from './ShellBrand'
import { Sidebar } from './Sidebar'
import { useMinWidth } from './useMinWidth'

function MobileNav({ onClose }: { readonly onClose: () => void }): JSX.Element {
  return (
    <div className="fixed inset-0 z-10">
      <button
        type="button"
        aria-label="Close menu"
        className="absolute inset-0"
        style={{ background: 'rgba(6, 8, 12, 0.6)' }}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="absolute inset-y-0 left-0 flex flex-col gap-[var(--space-4)] border-r p-[var(--space-4)]"
        style={{
          width: 'min(var(--size-sidebar), calc(100vw - var(--space-8)))',
          background: 'var(--color-muted)',
          borderColor: 'var(--color-border)',
        }}
      >
        <NavLinks onNavigate={onClose} />
      </div>
    </div>
  )
}

/**
 * Laptop+ keeps the Editorial Dark sidebar. Below that stop a top bar + drawer nav
 * so the 230px rail does not eat a phone or tablet viewport.
 */
export function AppShell({ children }: AppShellProps): JSX.Element {
  const isLaptop = useMinWidth(BREAKPOINTS.laptop)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const isDrawerOpen = isMenuOpen && !isLaptop

  if (isLaptop) {
    return (
      <div className="flex min-h-dvh w-full">
        <Sidebar />
        <main className="min-w-0 flex-1 overflow-auto">{children}</main>
      </div>
    )
  }

  return (
    <div className="flex min-h-dvh w-full flex-col">
      <header
        className="flex items-center justify-between gap-[var(--space-2)] border-b px-[var(--space-3)] py-[var(--space-2)] phone-lg:px-[var(--space-4)]"
        style={{
          background: 'var(--color-muted)',
          borderColor: 'var(--color-border)',
        }}
      >
        <ShellBrand />
        <Button
          variant="ghost"
          size="sm"
          aria-expanded={isDrawerOpen}
          aria-controls="mobile-nav"
          onClick={() => setIsMenuOpen(true)}
        >
          Menu
        </Button>
      </header>
      {isDrawerOpen ? (
        <div id="mobile-nav">
          <MobileNav onClose={() => setIsMenuOpen(false)} />
        </div>
      ) : null}
      <main className="min-w-0 flex-1 overflow-auto">{children}</main>
    </div>
  )
}
