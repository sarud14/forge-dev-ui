import type { JSX } from 'react'
import Link from 'next/link'
import { HOME_CARD_GRID_CLASS } from '@/components/ui'
import { PageFrame } from '@/features/shell/PageFrame'

const layers = [
  'Foundations',
  'Components',
  'Patterns',
  'Accessibility',
  'Testing',
  'Performance',
  'Docs',
] as const

const homeCards = [
  {
    tag: 'Tokens',
    title: 'Foundations',
    desc: 'Color, spacing, radius — the source of visual truth.',
    href: '/foundations',
  },
  {
    tag: 'Primitive',
    title: 'Button',
    desc: 'Variants, states, accessibility notes, and code.',
    href: '/components',
  },
  {
    tag: 'Interactive',
    title: 'Playground',
    desc: 'Adjust props, read the code, see it change live.',
    href: '/playground',
  },
] as const

export default function HomePage(): JSX.Element {
  return (
    <PageFrame width="doc">
      <div
        style={{
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-primary)',
          fontWeight: 600,
          marginBottom: 'var(--space-2)',
        }}
      >
        Overview
      </div>
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-3xl)',
          lineHeight: 'var(--leading-tight)',
          fontWeight: 600,
          margin: '0 0 var(--space-4)',
        }}
      >
        A frontend system for designing, building, and maintaining consistent interfaces.
      </h1>
      <p
        style={{
          fontSize: 'var(--text-md)',
          lineHeight: 'var(--leading-relaxed)',
          color: 'var(--color-muted-foreground)',
          maxWidth: 600,
          margin: '0 0 var(--space-8)',
        }}
      >
        Forge is a personal component laboratory — tokens, primitives, and patterns documented
        with the reasoning behind each decision, not just the result.
      </p>

      <div
        style={{
          display: 'flex',
          gap: 10,
          marginBottom: 'var(--space-8)',
          flexWrap: 'wrap',
        }}
      >
        {layers.map((name, i) => (
          <span
            key={name}
            style={{
              padding: '8px 16px',
              borderRadius: 20,
              fontSize: 'var(--text-xs)',
              fontWeight: 500,
              background: i === 0 ? 'var(--color-primary)' : 'transparent',
              color: i === 0 ? 'var(--color-background)' : 'var(--color-muted-foreground)',
              border: '1px solid var(--color-border)',
            }}
          >
            {name}
          </span>
        ))}
      </div>

      <div className={HOME_CARD_GRID_CLASS}>
        {homeCards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            style={{
              padding: 'var(--space-4)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--color-muted)',
              border: '1px solid var(--color-border)',
              color: 'inherit',
              display: 'block',
            }}
          >
            <div
              style={{
                fontSize: 'var(--text-2xs)',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--color-primary)',
                fontWeight: 600,
                marginBottom: 10,
              }}
            >
              {card.tag}
            </div>
            <div
              style={{
                fontFamily: 'var(--font-serif)',
                fontWeight: 600,
                fontSize: 'var(--text-lg)',
                marginBottom: 8,
              }}
            >
              {card.title}
            </div>
            <div
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--color-muted-foreground)',
                lineHeight: 1.55,
              }}
            >
              {card.desc}
            </div>
          </Link>
        ))}
      </div>
    </PageFrame>
  )
}
