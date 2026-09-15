import type { Metadata } from 'next'
import type { JSX } from 'react'
import { notFound } from 'next/navigation'
import { ComponentDocPreview } from '@/features/components/ComponentDocPreview'
import { ComponentDocArticle } from '@/features/documentation/ComponentDocArticle'
import { getComponentDoc, getComponentDocs } from '@/lib/content/source'
import type { ContentSlugPageProps } from '@/types/content.types'

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const docs = await getComponentDocs()
  return docs.map((doc) => ({ slug: doc.slug }))
}

export async function generateMetadata({ params }: ContentSlugPageProps): Promise<Metadata> {
  const { slug } = await params
  const doc = await getComponentDoc(slug)

  return { title: doc?.title ?? 'Component' }
}

export default async function ComponentSlugPage({
  params,
}: ContentSlugPageProps): Promise<JSX.Element> {
  const { slug } = await params
  const doc = await getComponentDoc(slug)

  if (doc === null) {
    notFound()
  }

  return (
    <ComponentDocArticle
      title={doc.title}
      summary={doc.summary}
      body={doc.body}
      preview={<ComponentDocPreview slug={doc.slug} />}
    />
  )
}
