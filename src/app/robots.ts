import type { MetadataRoute } from 'next'
import { env } from '@/env'
import {
  buildRobotsConfig,
  hasCanonicalSiteUrl,
  resolveSiteUrl,
} from '@/lib/seo/siteMetadata'

/**
 * Thin Next.js `robots.ts` wrapper — rules live in `buildRobotsConfig`.
 */
export default function robots(): MetadataRoute.Robots {
  return buildRobotsConfig(resolveSiteUrl(env.appUrl), hasCanonicalSiteUrl(env.appUrl))
}
