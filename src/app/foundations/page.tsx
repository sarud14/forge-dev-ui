import type { Metadata } from 'next'
import type { JSX } from 'react'
import Link from 'next/link'
import { PageFrame } from '@/features/shell/PageFrame'
import { foundationDocHref, getFoundationDocs } from '@/lib/content/source'

export const metadata: Metadata = { title: 'Foundations' }

export default async function FoundationsPage(): Promise<JSX.Element> {
  const docs = await getFoundationDocs()

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
        Foundations
      </div>
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 600,
          margin: '0 0 var(--space-2)',
        }}
      >
        Foundations
      </h1>
      <p
        style={{
          fontSize: 'var(--text-base)',
          color: 'var(--color-muted-foreground)',
          lineHeight: 'var(--leading-relaxed)',
          maxWidth: 'var(--size-content)',
          margin: '0 0 var(--space-8)',
        }}
      >
        Design principles, the token inventory, and the layout stops the shell is built on.
        Live swatches live on Tokens; breakpoint names live on Layout.
      </p>

      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {docs.map((doc) => (
          <li key={doc.slug} style={{ marginBottom: 'var(--space-6)' }}>
            <h2
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                margin: '0 0 var(--space-2)',
              }}
            >
              <Link href={foundationDocHref(doc.slug)} style={{ color: 'inherit', textDecoration: 'none' }}>
                {doc.title}
              </Link>
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 'var(--text-base)',
                color: 'var(--color-muted-foreground)',
                lineHeight: 'var(--leading-relaxed)',
                maxWidth: 'var(--size-content)',
              }}
            >
              {doc.summary}
            </p>
          </li>
        ))}
      </ul>
    </PageFrame>
  )
}
