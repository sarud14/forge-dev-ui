import type { Metadata } from 'next'
import type { JSX } from 'react'
import { notFound } from 'next/navigation'
import { ComponentDocArticle } from '@/features/documentation/ComponentDocArticle'
import { PatternPreview } from '@/features/patterns/PatternPreview'
import { getPatternDoc, getPatternDocs } from '@/lib/content/source'
import type { ContentSlugPageProps } from '@/types/content.types'

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const docs = await getPatternDocs()
  return docs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: ContentSlugPageProps): Promise<Metadata> {
  const { slug } = await params
  const doc = await getPatternDoc(slug)

  return { title: doc?.title ?? 'Pattern' }
}

export default async function PatternSlugPage({
  params,
}: ContentSlugPageProps): Promise<JSX.Element> {
  const { slug } = await params
  const doc = await getPatternDoc(slug)

  if (doc === null) {
    notFound()
  }

  return (
    <ComponentDocArticle
      title={doc.title}
      summary={doc.summary}
      body={doc.body}
      preview={<PatternPreview slug={doc.slug} />}
      backHref="/patterns"
      backLabel="← Patterns"
    />
  )
}
