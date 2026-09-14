import type { ToastInput, ToastRecord } from '../types'

/** Matches Radix Toast's provider default so a missing `duration` is not a silent Forge-only value. */
export const DEFAULT_TOAST_DURATION_MS = 5000

type Listener = () => void

let nextId = 0
let toasts: readonly ToastRecord[] = []
const listeners = new Set<Listener>()

function emit(): void {
  for (const listener of listeners) {
    listener()
  }
}

export function subscribeToToasts(listener: Listener): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getToastsSnapshot(): readonly ToastRecord[] {
  return toasts
}

export function getToastsServerSnapshot(): readonly ToastRecord[] {
  return []
}

/**
 * Enqueue a toast. Callers (playground, docs) fire this from click handlers; `Toaster`
 * is the only renderer. Must not be imported from a Server Component.
 */
export function toast(input: ToastInput): string {
  nextId += 1
  const id = `toast-${nextId}`
  const record: ToastRecord = {
    id,
    tone: input.tone ?? 'neutral',
    title: input.title,
    description: input.description,
    duration: input.duration ?? DEFAULT_TOAST_DURATION_MS,
  }
  toasts = [...toasts, record]
  emit()
  return id
}

export function dismissToast(id: string): void {
  toasts = toasts.filter((item) => item.id !== id)
  emit()
}

/** Test helper — the store is module-scoped, so suites must reset between cases. */
export function clearToasts(): void {
  toasts = []
  nextId = 0
  emit()
}
