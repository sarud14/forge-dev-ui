import { describe, expect, it } from 'vitest'
import {
  LOGO_ICON_VIEWBOX,
  LOGO_MARK,
  OG_IMAGE_PATH,
  SEO_OG_COLORS,
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  buildDocumentTitle,
} from './seo'

describe('seo constants', () => {
  it('keeps the crawler description non-empty and under a typical SERP length', () => {
    expect(SITE_DESCRIPTION.length).toBeGreaterThan(20)
    expect(SITE_DESCRIPTION.length).toBeLessThanOrEqual(160)
  })

  it('builds the document title from forge.dev and the site description', () => {
    expect(SITE_NAME).toBe('forge.dev')
    expect(buildDocumentTitle(SITE_NAME)).toBe(`${SITE_NAME} — ${SITE_DESCRIPTION}`)
  })

  it('lists Forge-related keywords without an empty entry', () => {
    expect(SITE_KEYWORDS.length).toBeGreaterThan(0)
    expect(SITE_KEYWORDS.every((keyword) => keyword.trim() !== '')).toBe(true)
  })

  it('exposes the Chevron Peak polygon geometry used by the in-app mark', () => {
    expect(LOGO_MARK.viewBox).toBe('0 0 100 100')
    expect(LOGO_MARK.backPolygonPoints).toContain('50,12')
    expect(LOGO_MARK.frontPolygonPoints).toContain('50,34')
  })

  it('crops the favicon viewBox around the chevron instead of the padded 100 canvas', () => {
    expect(LOGO_ICON_VIEWBOX).toBe('18 8 64 68')
  })

  it('points Open Graph at the generated image route', () => {
    expect(OG_IMAGE_PATH).toBe('/opengraph-image')
  })

  it('keeps OG hexes aligned with the Editorial Dark token values', () => {
    expect(SEO_OG_COLORS.background).toBe('#12151b')
    expect(SEO_OG_COLORS.foreground).toBe('#eef1f5')
    expect(SEO_OG_COLORS.mutedForeground).toBe('#93a0b0')
    expect(SEO_OG_COLORS.brand).toBe('#45c4b0')
  })
})
