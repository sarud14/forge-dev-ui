import { describe, expect, it, beforeAll, beforeEach } from 'vitest'
import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toaster } from './Toaster'
import { clearToasts, toast } from './toastStore'

beforeAll(() => {
  // jsdom does not implement Pointer Capture; Radix Toast Close uses it on pointerdown.
  if (typeof HTMLElement.prototype.hasPointerCapture !== 'function') {
    HTMLElement.prototype.hasPointerCapture = () => false
  }
  if (typeof HTMLElement.prototype.setPointerCapture !== 'function') {
    HTMLElement.prototype.setPointerCapture = () => undefined
  }
  if (typeof HTMLElement.prototype.releasePointerCapture !== 'function') {
    HTMLElement.prototype.releasePointerCapture = () => undefined
  }
})

function toastNode(title: string): HTMLElement {
  const node = screen.getByText(title).closest('[data-tone]')
  if (!(node instanceof HTMLElement)) {
    throw new Error(`Expected a data-tone ancestor for "${title}"`)
  }
  return node
}

describe('Toaster', () => {
  beforeEach(() => {
    clearToasts()
  })

  it('announces a toast in a status live region', () => {
    render(<Toaster />)

    act(() => {
      toast({ title: 'Saved', duration: Number.POSITIVE_INFINITY })
    })

    expect(toastNode('Saved')).toHaveAttribute('data-tone', 'neutral')
    expect(screen.getByRole('status')).toBeInTheDocument()
  })

  it('exposes tone on the toast node', () => {
    render(<Toaster />)

    act(() => {
      toast({ tone: 'danger', title: 'Could not save', duration: Number.POSITIVE_INFINITY })
    })

    expect(toastNode('Could not save')).toHaveAttribute('data-tone', 'danger')
  })

  it('dismisses the toast from the Dismiss control', async () => {
    const user = userEvent.setup()
    render(<Toaster />)

    act(() => {
      toast({ title: 'Saved', duration: Number.POSITIVE_INFINITY })
    })

    await user.click(screen.getByRole('button', { name: 'Dismiss' }))

    expect(screen.queryByText('Saved')).not.toBeInTheDocument()
  })
})
