import { describe, expect, it, beforeEach } from 'vitest'
import {
  clearToasts,
  DEFAULT_TOAST_DURATION_MS,
  dismissToast,
  getToastsSnapshot,
  toast,
} from './toastStore'

describe('toastStore', () => {
  beforeEach(() => {
    clearToasts()
  })

  it('enqueues a toast with defaults', () => {
    const id = toast({ title: 'Saved' })

    expect(getToastsSnapshot()).toEqual([
      {
        id,
        tone: 'neutral',
        title: 'Saved',
        description: undefined,
        duration: DEFAULT_TOAST_DURATION_MS,
      },
    ])
  })

  it('preserves explicit tone, description, and duration', () => {
    toast({
      tone: 'danger',
      title: 'Could not save',
      description: 'Try again.',
      duration: 1000,
    })

    expect(getToastsSnapshot()[0]).toMatchObject({
      tone: 'danger',
      title: 'Could not save',
      description: 'Try again.',
      duration: 1000,
    })
  })

  it('dismisses a toast by id', () => {
    const first = toast({ title: 'One' })
    toast({ title: 'Two' })
    dismissToast(first)

    expect(getToastsSnapshot().map((item) => item.title)).toEqual(['Two'])
  })
})
