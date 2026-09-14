import { describe, expect, it } from 'vitest'
import { LOCAL_SITE_URL, OG_IMAGE_PATH, SITE_DESCRIPTION, SITE_NAME } from '@/constants/seo'
import {
  buildRobotsConfig,
  buildSitemapEntries,
  buildSiteMetadata,
  buildWebSiteJsonLd,
  hasCanonicalSiteUrl,
  joinSitePath,
  resolveSiteUrl,
} from './siteMetadata'

describe('resolveSiteUrl', () => {
  it('falls back to the local origin when the canonical URL is missing', () => {
    expect(resolveSiteUrl('')).toBe(LOCAL_SITE_URL)
    expect(resolveSiteUrl('   ')).toBe(LOCAL_SITE_URL)
  })

  it('strips a trailing slash from a configured origin', () => {
    expect(resolveSiteUrl('https://forge.dev/')).toBe('https://forge.dev')
  })
})

describe('hasCanonicalSiteUrl', () => {
  it('is true only when an explicit origin is present', () => {
    expect(hasCanonicalSiteUrl('')).toBe(false)
    expect(hasCanonicalSiteUrl('https://forge.dev')).toBe(true)
  })
})

describe('joinSitePath', () => {
  it('does not double-slash the origin for the home path', () => {
    expect(joinSitePath('https://forge.dev', '/')).toBe('https://forge.dev')
  })

  it('joins a nested path onto the origin', () => {
    expect(joinSitePath('https://forge.dev', '/components')).toBe(
      'https://forge.dev/components',
    )
  })
})

describe('buildWebSiteJsonLd', () => {
  it('omits url and image when no canonical origin is configured', () => {
    expect(buildWebSiteJsonLd(SITE_NAME, SITE_DESCRIPTION, '')).toEqual({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
    })
  })

  it('adds absolute url and OG image when a canonical origin is configured', () => {
    expect(buildWebSiteJsonLd(SITE_NAME, SITE_DESCRIPTION, 'https://forge.dev/')).toEqual({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      url: 'https://forge.dev',
      image: `https://forge.dev${OG_IMAGE_PATH}`,
    })
  })
})

describe('buildSitemapEntries', () => {
  it('emits unique absolute URLs for each path', () => {
    const lastModified = new Date('2026-09-11T00:00:00.000Z')
    expect(
      buildSitemapEntries(
        'https://forge.dev',
        ['/', '/components', '/components'],
        lastModified,
      ),
    ).toEqual([
      { url: 'https://forge.dev', lastModified },
      { url: 'https://forge.dev/components', lastModified },
    ])
  })
})

describe('buildRobotsConfig', () => {
  it('allows all crawlers and omits sitemap without a canonical origin', () => {
    expect(buildRobotsConfig(LOCAL_SITE_URL, false)).toEqual({
      rules: { userAgent: '*', allow: '/' },
    })
  })

  it('points sitemap at the canonical origin when one exists', () => {
    expect(buildRobotsConfig('https://forge.dev', true)).toEqual({
      rules: { userAgent: '*', allow: '/' },
      sitemap: 'https://forge.dev/sitemap.xml',
    })
  })
})

describe('buildSiteMetadata', () => {
  it('sets metadataBase, the title template, and social cards', () => {
    const metadata = buildSiteMetadata(SITE_NAME, 'https://forge.dev')

    expect(metadata.metadataBase).toEqual(new URL('https://forge.dev'))
    expect(metadata.title).toEqual({
      default: `${SITE_NAME} — ${SITE_DESCRIPTION}`,
      template: `%s — ${SITE_NAME}`,
    })
    expect(metadata.description).toBe(SITE_DESCRIPTION)
    expect(metadata.openGraph?.images).toEqual([
      {
        url: OG_IMAGE_PATH,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
      },
    ])
    expect(metadata.twitter).toEqual({
      card: 'summary_large_image',
      title: `${SITE_NAME} — ${SITE_DESCRIPTION}`,
      description: SITE_DESCRIPTION,
    })
  })

  it('uses the local origin for metadataBase when no canonical URL is set', () => {
    const metadata = buildSiteMetadata(SITE_NAME, '')
    expect(metadata.metadataBase).toEqual(new URL(LOCAL_SITE_URL))
  })
})
