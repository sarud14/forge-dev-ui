import type { Metadata } from 'next'
import type { JSX } from 'react'
import { notFound } from 'next/navigation'
import { ComponentDocArticle } from '@/features/documentation/ComponentDocArticle'
import { FoundationPreview } from '@/features/foundations/FoundationPreview'
import { getFoundationDoc, getFoundationDocs } from '@/lib/content/source'
import type { ContentSlugPageProps } from '@/types/content.types'

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const docs = await getFoundationDocs()
  return docs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: ContentSlugPageProps): Promise<Metadata> {
  const { slug } = await params
  const doc = await getFoundationDoc(slug)

  return { title: doc?.title ?? 'Foundation' }
}

export default async function FoundationSlugPage({
  params,
}: ContentSlugPageProps): Promise<JSX.Element> {
  const { slug } = await params
  const doc = await getFoundationDoc(slug)

  if (doc === null) {
    notFound()
  }

  return (
    <ComponentDocArticle
      title={doc.title}
      summary={doc.summary}
      body={doc.body}
      preview={<FoundationPreview slug={doc.slug} />}
      backHref="/foundations"
      backLabel="← Foundations"
    />
  )
}
