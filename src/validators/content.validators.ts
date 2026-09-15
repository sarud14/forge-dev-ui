import type { ContentDocMeta } from '@/types/content.types'

const SLUG_PATTERN = /^[a-z0-9-]+$/

export function isSafeContentSlug(value: string): boolean {
  return SLUG_PATTERN.test(value)
}

export function parseContentDocMeta(
  data: Readonly<Record<string, string>>
): ContentDocMeta | null {
  const slug = data['slug']
  const title = data['title']
  const summary = data['summary']
  const orderRaw = data['order']
  if (
    slug === undefined ||
    title === undefined ||
    summary === undefined ||
    orderRaw === undefined ||
    !isSafeContentSlug(slug)
  ) {
    return null
  }

  const order = Number(orderRaw)
  if (!Number.isInteger(order)) {
    return null
  }

  return { slug, title, summary, order }
}
