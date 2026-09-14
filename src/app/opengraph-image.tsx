import { ImageResponse } from 'next/og'
import {
  LOGO_MARK,
  OG_IMAGE_ALT,
  OG_IMAGE_SIZE,
  SEO_OG_COLORS,
  SITE_DESCRIPTION,
} from '@/constants/seo'

export const alt = OG_IMAGE_ALT
export const size = OG_IMAGE_SIZE
export const contentType = 'image/png'

/**
 * Open Graph / Twitter share image with the Chevron Peak lockup. Next.js file
 * convention — no colocated test; geometry, copy, and colors are covered in
 * `src/constants/seo.test.ts` and `src/lib/seo/siteMetadata.test.ts`.
 */
export default function OpenGraphImage(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: SEO_OG_COLORS.background,
          gap: 28,
        }}
      >
        <svg width="96" height="96" viewBox={LOGO_MARK.viewBox}>
          <polygon
            points={LOGO_MARK.backPolygonPoints}
            fill={SEO_OG_COLORS.brand}
            opacity={0.4}
          />
          <polygon points={LOGO_MARK.frontPolygonPoints} fill={SEO_OG_COLORS.brand} />
        </svg>
        <div
          style={{
            display: 'flex',
            fontSize: 64,
            fontWeight: 700,
            color: SEO_OG_COLORS.foreground,
            letterSpacing: -1,
          }}
        >
          forge
          <span style={{ color: SEO_OG_COLORS.brand }}>.</span>
          dev
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 24,
            color: SEO_OG_COLORS.mutedForeground,
            maxWidth: 800,
            textAlign: 'center',
            justifyContent: 'center',
          }}
        >
          {SITE_DESCRIPTION}
        </div>
      </div>
    ),
    { width: OG_IMAGE_SIZE.width, height: OG_IMAGE_SIZE.height },
  )
}
