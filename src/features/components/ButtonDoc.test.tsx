import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ButtonDoc } from './ButtonDoc'

describe('ButtonDoc', () => {
  it('shows the Preview tab by default with all four variants', () => {
    render(<ButtonDoc />)

    expect(screen.getByRole('tab', { name: 'Preview' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getAllByRole('button', { name: 'Button' })).toHaveLength(4)
  })

  it('switches to the Code tab and shows a snippet per variant', async () => {
    const user = userEvent.setup()
    render(<ButtonDoc />)

    await user.click(screen.getByRole('tab', { name: 'Code' }))

    expect(screen.getByRole('tab', { name: 'Code' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText(/variant="primary"/)).toBeInTheDocument()
    expect(screen.getByText(/variant="destructive"/)).toBeInTheDocument()
  })

  it('switches to the Accessibility tab and lists the a11y notes', async () => {
    const user = userEvent.setup()
    render(<ButtonDoc />)

    await user.click(screen.getByRole('tab', { name: 'Accessibility' }))

    expect(screen.getByText(/native <button>/)).toBeInTheDocument()
    expect(screen.getByText(/aria-busy/)).toBeInTheDocument()
  })
})
