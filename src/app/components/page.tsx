import type { Metadata } from 'next'
import type { JSX } from 'react'
import Link from 'next/link'
import { ComponentDocPreview } from '@/features/components/ComponentDocPreview'
import { getComponentDocs, componentDocHref } from '@/lib/content/source'

export const metadata: Metadata = { title: 'Components' }

export default async function ComponentsPage(): Promise<JSX.Element> {
  const docs = await getComponentDocs()

  return (
    <div style={{ padding: '64px 56px', maxWidth: 920 }}>
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
        Components
      </div>
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 600,
          margin: '0 0 var(--space-2)',
        }}
      >
        Components
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
        Production-quality primitives with documented states, accessibility notes, and live
        previews. Phase 1 currently ships Button, Input, Select, Tabs, Tooltip, Dialog, Toast, and
        Data Table.
      </p>

      {docs.map((doc) => {
        const headingId = `components-${doc.slug}-heading`

        return (
          <section
            key={doc.slug}
            aria-labelledby={headingId}
            style={{ marginBottom: 'var(--space-8)' }}
          >
            <h2
              id={headingId}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                margin: '0 0 var(--space-2)',
              }}
            >
              <Link
                href={componentDocHref(doc.slug)}
                style={{ color: 'inherit', textDecoration: 'none' }}
              >
                {doc.title}
              </Link>
            </h2>
            <p
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--color-muted-foreground)',
                lineHeight: 'var(--leading-relaxed)',
                maxWidth: 600,
                margin: '0 0 var(--space-6)',
              }}
            >
              {doc.summary}
            </p>
            <ComponentDocPreview slug={doc.slug} />
          </section>
        )
      })}
    </div>
  )
}
