import { useSyncExternalStore } from 'react'
import { minWidthQuery } from '@/components/ui'

const SERVER_MATCHES_MIN_WIDTH = false

function readMinWidth(px: number): boolean {
  return window.matchMedia(minWidthQuery(px)).matches
}

function subscribeMinWidth(px: number, onStoreChange: () => void): () => void {
  const media = window.matchMedia(minWidthQuery(px))
  media.addEventListener('change', onStoreChange)
  return () => {
    media.removeEventListener('change', onStoreChange)
  }
}

/**
 * Mobile-first: SSR and the first paint assume below `px` (cached `false` snapshot —
 * a fresh boolean each call would trip React 19's getServerSnapshot loop).
 */
export function useMinWidth(px: number): boolean {
  return useSyncExternalStore(
    (onStoreChange) => subscribeMinWidth(px, onStoreChange),
    () => readMinWidth(px),
    () => SERVER_MATCHES_MIN_WIDTH
  )
}
