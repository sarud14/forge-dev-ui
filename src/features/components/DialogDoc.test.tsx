import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DialogDoc } from './DialogDoc'

describe('DialogDoc', () => {
  it('shows the Preview tab with a trigger that opens the dialog', async () => {
    const user = userEvent.setup()
    render(<DialogDoc />)

    expect(screen.getByRole('tab', { name: 'Preview' })).toHaveAttribute('aria-selected', 'true')
    await user.click(screen.getByRole('button', { name: 'Open dialog' }))

    expect(screen.getByRole('dialog', { name: 'Delete component?' })).toBeInTheDocument()
  })

  it('switches to the Code tab and shows a Dialog snippet', async () => {
    const user = userEvent.setup()
    render(<DialogDoc />)

    await user.click(screen.getByRole('tab', { name: 'Code' }))

    expect(screen.getByText(/title="Delete component\?"/)).toBeInTheDocument()
  })

  it('switches to the Accessibility tab and lists the a11y notes', async () => {
    const user = userEvent.setup()
    render(<DialogDoc />)

    await user.click(screen.getByRole('tab', { name: 'Accessibility' }))

    expect(screen.getByText(/Focus is trapped/)).toBeInTheDocument()
    expect(screen.getByText(/role="dialog"/)).toBeInTheDocument()
  })
})
