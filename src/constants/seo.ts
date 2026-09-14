import type { LogoMarkGeometry, OgColors, OgImageSize } from '@/types/seo.types'

/** Matches the layout / home-page description — the canonical one-line pitch for crawlers. */
export const SITE_DESCRIPTION: string =
  'A frontend system for designing, building, and maintaining consistent interfaces.'

export const SITE_NAME: string = 'forge.dev'

export function buildDocumentTitle(appName: string): string {
  return `${appName} — ${SITE_DESCRIPTION}`
}

export const SITE_KEYWORDS: readonly string[] = [
  'forge.dev',
  'Forge',
  'design system',
  'frontend',
  'React',
  'accessibility',
  'UI components',
  'design tokens',
] as const

export const LOCAL_SITE_URL: string = 'http://localhost:3000'

export const OG_IMAGE_PATH: string = '/opengraph-image'

export const OG_IMAGE_SIZE: OgImageSize = {
  width: 1200,
  height: 630,
} as const

export const OG_IMAGE_ALT: string = 'forge.dev'

/**
 * Chevron Peak geometry shared by the sidebar mark, favicon, and Open Graph image
 * (`design/forge-logo-directions` / ChevronPeak.dc.html).
 */
export const LOGO_MARK: LogoMarkGeometry = {
  viewBox: '0 0 100 100',
  backPolygonPoints: '50,12 78,58 66,58 50,32 34,58 22,58',
  frontPolygonPoints: '50,34 72,72 60,72 50,55 40,72 28,72',
}

/** Cropped around the chevron so the tab favicon is the mark, not a padded tile. */
export const LOGO_ICON_VIEWBOX: string = '18 8 64 68'

/**
 * Pixel colors for `next/og` ImageResponse. Satori cannot read CSS variables —
 * keep these hexes aligned with `src/components/ui/tokens/colors.css`.
 */
export const SEO_OG_COLORS: OgColors = {
  background: '#12151b',
  foreground: '#eef1f5',
  mutedForeground: '#93a0b0',
  brand: '#45c4b0',
}
