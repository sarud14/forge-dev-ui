import type { MetadataRoute } from 'next'
import { env } from '@/env'
import { navItems } from '@/features/shell/navItems'
import { componentDocHref, getComponentDocs } from '@/lib/content/source'
import { buildSitemapEntries, resolveSiteUrl } from '@/lib/seo/siteMetadata'

const engineeringSubpaths: readonly string[] = [
  '/engineering/accessibility',
  '/engineering/performance',
  '/engineering/testing',
  '/engineering/decisions',
]

/**
 * Thin Next.js `sitemap.ts` wrapper — URL joining lives in `buildSitemapEntries`.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const docs = await getComponentDocs()
  const paths: readonly string[] = [
    ...navItems.map((item) => item.href),
    ...engineeringSubpaths,
    ...docs.map((doc) => componentDocHref(doc.slug)),
  ]
  return [...buildSitemapEntries(resolveSiteUrl(env.appUrl), paths, new Date())]
}
