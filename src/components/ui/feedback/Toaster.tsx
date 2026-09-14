'use client'

import { useSyncExternalStore, type JSX } from 'react'
import * as RadixToast from '@radix-ui/react-toast'
import { Toast } from './Toast'
import {
  getToastsServerSnapshot,
  getToastsSnapshot,
  subscribeToToasts,
} from './toastStore'

/**
 * App-wide toast renderer. Mount once in the root layout so `toast()` has a live region
 * to announce into. Provider + viewport are Radix; queue state lives in toastStore.
 */
export function Toaster(): JSX.Element {
  const toasts = useSyncExternalStore(
    subscribeToToasts,
    getToastsSnapshot,
    getToastsServerSnapshot
  )

  return (
    <RadixToast.Provider>
      {toasts.map((item) => (
        <Toast key={item.id} {...item} />
      ))}
      <RadixToast.Viewport
        className="fixed right-[var(--space-4)] bottom-[var(--space-4)] z-20 flex w-[360px] max-w-[calc(100vw-var(--space-4))] list-none flex-col gap-[var(--space-2)] outline-none"
      />
    </RadixToast.Provider>
  )
}
