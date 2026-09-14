import type { Metadata } from 'next'
import type { ReactNode, JSX } from 'react'
import { Public_Sans, Spectral, IBM_Plex_Mono } from 'next/font/google'
import './globals.css'
import { env } from '@/env'
import { SITE_DESCRIPTION } from '@/constants/seo'
import { Sidebar } from '@/features/shell/Sidebar'
import { buildSiteMetadata, buildWebSiteJsonLd } from '@/lib/seo/siteMetadata'

// Editorial Dark type system (design/forge-editorial-dark, picked 2026-09-11) — sets the
// --font-public-sans / --font-spectral / --font-ibm-plex-mono custom properties consumed by
// the --font-sans / --font-serif / --font-mono tokens in
// src/components/ui/tokens/typography.css. Replaces the earlier JetBrains-Mono-only brand face.
const publicSans = Public_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-public-sans',
})
const spectral = Spectral({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-spectral',
})
const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-ibm-plex-mono',
})

export const metadata: Metadata = buildSiteMetadata(env.appName, env.appUrl)

const webSiteJsonLd = buildWebSiteJsonLd(env.appName, SITE_DESCRIPTION, env.appUrl)

export default function RootLayout({ children }: { children: ReactNode }): JSX.Element {
  return (
    <html
      lang="en"
      className={`${publicSans.variable} ${spectral.variable} ${ibmPlexMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
        />
        <div style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
          <Sidebar />
          <main style={{ flex: 1, minWidth: 0, overflow: 'auto' }}>{children}</main>
        </div>
      </body>
    </html>
  )
}
