'use client'

import type { JSX } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LOGO_MARK, SITE_NAME } from '@/constants/seo'
import { isNavItemActive, navItems } from './navItems'

/**
 * App shell sidebar — Editorial Dark direction (design/forge-editorial-dark, 2026-09-11).
 * Client component: needs the current route to highlight the active nav item
 * (AGENTS.md Code Quality — client only where the route's actual interactivity needs it).
 */
export function Sidebar(): JSX.Element {
  const pathname = usePathname()

  return (
    <div
      style={{
        width: 230,
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
      {/* Logo mark — Chevron Peak shape from design/forge-logo-directions, colored with
          --color-brand so the lockup matches the Editorial Dark CI (teal), not a separate accent.
          Wrapped in <header> so the wordmark is inside a banner landmark (axe region). */}
      <header>
        <Link
          href="/"
          aria-label={SITE_NAME}
          style={{ display: 'flex', alignItems: 'center', gap: 10 }}
        >
          <svg
            width="26"
            height="26"
            viewBox={LOGO_MARK.viewBox}
            aria-hidden="true"
            style={{ flexShrink: 0 }}
          >
            <polygon
              points={LOGO_MARK.backPolygonPoints}
              fill="var(--color-brand)"
              opacity="0.4"
            />
            <polygon points={LOGO_MARK.frontPolygonPoints} fill="var(--color-brand)" />
          </svg>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: 'var(--text-lg)',
              letterSpacing: '-0.01em',
              color: 'var(--color-foreground)',
            }}
          >
            forge
            <span style={{ color: 'var(--color-brand)' }}>.</span>
            dev
          </span>
        </Link>
      </header>

      <nav aria-label="Primary" style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navItems.map((item) => {
          const active = isNavItemActive(item.href, pathname)
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? 'page' : undefined}
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
