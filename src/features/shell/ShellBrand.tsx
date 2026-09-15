import type { JSX } from 'react'
import Link from 'next/link'
import { LOGO_MARK, SITE_NAME } from '@/constants/seo'

export function ShellBrand(): JSX.Element {
  return (
    <Link href="/" aria-label={SITE_NAME} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
  )
}
