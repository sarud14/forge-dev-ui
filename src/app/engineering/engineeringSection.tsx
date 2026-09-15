/**
 * Shared loader for the four explicit `/engineering/*` routes (requirement doc §5).
 * Lives next to those routes so `features/engineering` does not import `features/documentation`.
 */
import type { Metadata } from 'next'
import type { JSX } from 'react'
import { notFound } from 'next/navigation'
import { ComponentDocArticle } from '@/features/documentation/ComponentDocArticle'
import { getEngineeringDoc } from '@/lib/content/source'
import type { EngineeringSectionPageProps } from '@/types/content.types'

export async function engineeringSectionMetadata(slug: string): Promise<Metadata> {
  const doc = await getEngineeringDoc(slug)

  return { title: doc?.title ?? 'Engineering' }
}

export async function EngineeringSectionPage({
  slug,
}: EngineeringSectionPageProps): Promise<JSX.Element> {
  const doc = await getEngineeringDoc(slug)

  if (doc === null) {
    notFound()
  }

  return (
    <ComponentDocArticle
      title={doc.title}
      summary={doc.summary}
      body={doc.body}
      backHref="/engineering"
      backLabel="← Engineering"
    />
  )
}
