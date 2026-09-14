import { describe, expect, it, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toaster, clearToasts } from '@/components/ui'
import { ToastDoc } from './ToastDoc'

describe('ToastDoc', () => {
  beforeEach(() => {
    clearToasts()
  })

  it('shows the Preview tab with a trigger per tone', () => {
    render(<ToastDoc />)

    expect(screen.getByRole('tab', { name: 'Preview' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('button', { name: 'Show neutral' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Show success' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Show danger' })).toBeInTheDocument()
  })

  it('fires a toast from the preview trigger', async () => {
    const user = userEvent.setup()
    render(
      <>
        <Toaster />
        <ToastDoc />
      </>
    )

    await user.click(screen.getByRole('button', { name: 'Show success' }))

    expect(screen.getByText('Saved')).toBeInTheDocument()
  })

  it('switches to the Code tab and shows toast() snippets', async () => {
    const user = userEvent.setup()
    render(<ToastDoc />)

    await user.click(screen.getByRole('tab', { name: 'Code' }))

    expect(screen.getByText(/toast\(\{ title: "Saved" \}\)/)).toBeInTheDocument()
    expect(screen.getByText(/tone: "danger"/)).toBeInTheDocument()
  })

  it('switches to the Accessibility tab and lists the a11y notes', async () => {
    const user = userEvent.setup()
    render(<ToastDoc />)

    await user.click(screen.getByRole('tab', { name: 'Accessibility' }))

    expect(screen.getByText(/live region/)).toBeInTheDocument()
    expect(screen.getByText(/data-tone/)).toBeInTheDocument()
  })
})
