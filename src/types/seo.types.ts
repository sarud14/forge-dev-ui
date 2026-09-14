/**
 * SEO / social-preview shapes — consumed by `src/constants/seo.ts` and `src/lib/seo/`.
 * Hex values on OgColors must stay in sync with `src/components/ui/tokens/colors.css`
 * (Satori / ImageResponse cannot read CSS custom properties).
 */
export interface LogoMarkGeometry {
  readonly viewBox: string
  readonly backPolygonPoints: string
  readonly frontPolygonPoints: string
}

export interface OgColors {
  readonly background: string
  readonly foreground: string
  readonly mutedForeground: string
  readonly brand: string
}

export interface OgImageSize {
  readonly width: number
  readonly height: number
}

export interface SitemapEntry {
  readonly url: string
  readonly lastModified: Date
}

export interface RobotsConfig {
  readonly rules: {
    readonly userAgent: string
    readonly allow: string
  }
  readonly sitemap?: string
}

export interface WebSiteJsonLd {
  readonly '@context': 'https://schema.org'
  readonly '@type': 'WebSite'
  readonly name: string
  readonly description: string
  readonly url?: string
  readonly image?: string
}
