'use client'

import type { JSX } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { NavLinksProps } from '@/types/shell.types'
import { isNavItemActive, navItems } from './navItems'

export function NavLinks({ onNavigate }: NavLinksProps): JSX.Element {
  const pathname = usePathname()

  return (
    <nav aria-label="Primary" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {navItems.map((item) => {
        const active = isNavItemActive(item.href, pathname)
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={active ? 'page' : undefined}
            onClick={onNavigate}
            style={{
              padding: '10px 12px',
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              borderRadius: 'var(--radius-sm)',
              background: active ? 'var(--color-border)' : 'transparent',
              color: active ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
            }}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
