import type { JSX, ReactNode } from 'react'
import Link from 'next/link'
import { PAGE_FRAME_DOC_CLASS } from '@/components/ui'
import { MarkdownBody } from './MarkdownBody'

interface ComponentDocArticleProps {
  readonly title: string
  readonly summary: string
  readonly body: string
  readonly preview: ReactNode
}

/**
 * Per-slug documentation layout. Preview is passed in so this feature does not import
 * features/components (AGENTS.md "No feature imports another feature's folder").
 */
export function ComponentDocArticle({
  title,
  summary,
  body,
  preview,
}: ComponentDocArticleProps): JSX.Element {
  return (
    <article className={PAGE_FRAME_DOC_CLASS}>
      <p style={{ margin: '0 0 var(--space-4)' }}>
        <Link
          href="/components"
          style={{
            fontSize: 'var(--text-sm)',
            color: 'var(--color-primary)',
            textDecoration: 'none',
          }}
        >
          ← Components
        </Link>
      </p>
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 600,
          margin: '0 0 var(--space-2)',
        }}
      >
        {title}
      </h1>
      <p
        style={{
          fontSize: 'var(--text-base)',
          color: 'var(--color-muted-foreground)',
          lineHeight: 'var(--leading-relaxed)',
          maxWidth: 600,
          margin: '0 0 var(--space-8)',
        }}
      >
        {summary}
      </p>
      <MarkdownBody source={body} />
      <div style={{ marginTop: 'var(--space-8)' }}>{preview}</div>
    </article>
  )
}
