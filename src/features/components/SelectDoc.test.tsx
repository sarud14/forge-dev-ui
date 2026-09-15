import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SelectDoc } from './SelectDoc'

describe('SelectDoc', () => {
  it('shows the Preview tab with default and disabled examples', () => {
    render(<SelectDoc />)

    expect(screen.getByRole('tab', { name: 'Preview' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('combobox', { name: 'Size' })).toHaveTextContent('Medium')
    expect(screen.getByRole('combobox', { name: 'Disabled size' })).toBeDisabled()
  })

  it('switches to the Code tab and shows Select snippets', async () => {
    const user = userEvent.setup()
    render(<SelectDoc />)

    await user.click(screen.getByRole('tab', { name: 'Code' }))

    expect(screen.getByText(/aria-label="Size"/)).toBeInTheDocument()
    expect(screen.getByText(/disabled/)).toBeInTheDocument()
  })

  it('switches to the Accessibility tab and lists the a11y notes', async () => {
    const user = userEvent.setup()
    render(<SelectDoc />)

    await user.click(screen.getByRole('tab', { name: 'Accessibility' }))

    expect(screen.getByText(/combobox/)).toBeInTheDocument()
    expect(screen.getByText(/aria-label/)).toBeInTheDocument()
  })
})
