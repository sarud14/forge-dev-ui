import { SITE_NAME } from '@/constants/seo'

/**
 * Typed wrapper for process.env — never read process.env directly elsewhere
 * (see AGENTS.md "Environment Variables").
 */
function readAppUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_APP_URL ?? ''
  if (explicit !== '') {
    return explicit
  }
  const vercel = process.env.VERCEL_URL ?? ''
  if (vercel !== '') {
    return `https://${vercel}`
  }
  return ''
}

export const env = {
  appUrl: readAppUrl(),
  appName: process.env.NEXT_PUBLIC_APP_NAME ?? SITE_NAME,
} as const
