import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EMAIL_INVALID_MESSAGE } from '@/validators/email.validators'
import { InputDoc } from './InputDoc'

describe('InputDoc', () => {
  it('shows the Preview tab by default with default, disabled, and invalid examples', () => {
    render(<InputDoc />)

    expect(screen.getByRole('tab', { name: 'Preview' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('textbox', { name: 'Default email' })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Disabled email' })).toBeDisabled()
    expect(screen.getByRole('textbox', { name: 'Invalid email' })).toHaveAccessibleDescription(
      EMAIL_INVALID_MESSAGE
    )
  })

  it('switches to the Code tab and shows snippets per tone', async () => {
    const user = userEvent.setup()
    render(<InputDoc />)

    await user.click(screen.getByRole('tab', { name: 'Code' }))

    expect(screen.getByRole('tab', { name: 'Code' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByText(/placeholder="you@example.com"/)).toBeInTheDocument()
    expect(screen.getByText(/tone="danger"/)).toBeInTheDocument()
  })

  it('switches to the Accessibility tab and lists the a11y notes', async () => {
    const user = userEvent.setup()
    render(<InputDoc />)

    await user.click(screen.getByRole('tab', { name: 'Accessibility' }))

    expect(screen.getByText(/native <input>/)).toBeInTheDocument()
    expect(screen.getByText(/aria-describedby/)).toBeInTheDocument()
  })
})
