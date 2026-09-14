import type { Metadata } from 'next'
import type { RobotsConfig, SitemapEntry, WebSiteJsonLd } from '@/types/seo.types'
import {
  LOCAL_SITE_URL,
  OG_IMAGE_ALT,
  OG_IMAGE_PATH,
  OG_IMAGE_SIZE,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  buildDocumentTitle,
} from '@/constants/seo'

export function stripTrailingSlash(url: string): string {
  return url.endsWith('/') ? url.slice(0, -1) : url
}

export function resolveSiteUrl(appUrl: string): string {
  if (appUrl.trim() === '') {
    return LOCAL_SITE_URL
  }
  return stripTrailingSlash(appUrl.trim())
}

export function hasCanonicalSiteUrl(appUrl: string): boolean {
  return appUrl.trim() !== ''
}

export function joinSitePath(siteUrl: string, path: string): string {
  const base = stripTrailingSlash(siteUrl)
  if (path === '/') {
    return base
  }
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}

export function buildWebSiteJsonLd(
  name: string,
  description: string,
  appUrl: string,
): WebSiteJsonLd {
  const jsonLd: WebSiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name,
    description,
  }

  if (!hasCanonicalSiteUrl(appUrl)) {
    return jsonLd
  }

  const siteUrl = resolveSiteUrl(appUrl)
  return {
    ...jsonLd,
    url: siteUrl,
    image: joinSitePath(siteUrl, OG_IMAGE_PATH),
  }
}

export function buildSitemapEntries(
  siteUrl: string,
  paths: readonly string[],
  lastModified: Date,
): readonly SitemapEntry[] {
  const uniquePaths = [...new Set(paths)]
  return uniquePaths.map((path) => ({
    url: joinSitePath(siteUrl, path),
    lastModified,
  }))
}

export function buildRobotsConfig(siteUrl: string, hasCanonicalUrl: boolean): RobotsConfig {
  const config: RobotsConfig = {
    rules: {
      userAgent: '*',
      allow: '/',
    },
  }

  if (!hasCanonicalUrl) {
    return config
  }

  return {
    ...config,
    sitemap: `${stripTrailingSlash(siteUrl)}/sitemap.xml`,
  }
}

export function buildSiteMetadata(appName: string, appUrl: string): Metadata {
  const siteUrl = resolveSiteUrl(appUrl)
  const documentTitle = buildDocumentTitle(appName)

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: documentTitle,
      template: `%s — ${appName}`,
    },
    description: SITE_DESCRIPTION,
    applicationName: appName,
    keywords: [...SITE_KEYWORDS],
    openGraph: {
      type: 'website',
      locale: 'en_US',
      siteName: appName,
      title: documentTitle,
      description: SITE_DESCRIPTION,
      images: [
        {
          url: OG_IMAGE_PATH,
          width: OG_IMAGE_SIZE.width,
          height: OG_IMAGE_SIZE.height,
          alt: OG_IMAGE_ALT,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: documentTitle,
      description: SITE_DESCRIPTION,
    },
    robots: {
      index: true,
      follow: true,
    },
  }
}
