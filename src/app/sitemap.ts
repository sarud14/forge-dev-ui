import type { MetadataRoute } from 'next'
import { env } from '@/env'
import { navItems } from '@/features/shell/navItems'
import { componentDocHref, engineeringDocHref, getComponentDocs, getEngineeringDocs, getPatternDocs, patternDocHref } from '@/lib/content/source'
import { buildSitemapEntries, resolveSiteUrl } from '@/lib/seo/siteMetadata'

/**
 * Thin Next.js `sitemap.ts` wrapper — URL joining lives in `buildSitemapEntries`.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const componentDocs = await getComponentDocs()
  const patternDocs = await getPatternDocs()
  const engineeringDocs = await getEngineeringDocs()
  const paths: readonly string[] = [
    ...navItems.map((item) => item.href),
    ...componentDocs.map((doc) => componentDocHref(doc.slug)),
    ...patternDocs.map((doc) => patternDocHref(doc.slug)),
    ...engineeringDocs.map((doc) => engineeringDocHref(doc.slug)),
  ]
  return [...buildSitemapEntries(resolveSiteUrl(env.appUrl), paths, new Date())]
}
