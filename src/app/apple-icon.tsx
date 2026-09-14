import { ImageResponse } from 'next/og'
import { LOGO_ICON_VIEWBOX, LOGO_MARK, SEO_OG_COLORS } from '@/constants/seo'

export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

/**
 * Apple touch icon from the Chevron Peak mark — mark only, no tile background.
 * Next.js file convention — no colocated test; geometry and colors are covered
 * in `src/constants/seo.test.ts`.
 */
export default function AppleIcon(): ImageResponse {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'transparent',
        }}
      >
        <svg width="180" height="180" viewBox={LOGO_ICON_VIEWBOX}>
          <polygon
            points={LOGO_MARK.backPolygonPoints}
            fill={SEO_OG_COLORS.brand}
            opacity={0.4}
          />
          <polygon points={LOGO_MARK.frontPolygonPoints} fill={SEO_OG_COLORS.brand} />
        </svg>
      </div>
    ),
    size,
  )
}
