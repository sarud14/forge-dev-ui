import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
  it('renders a named textbox', () => {
    render(<Input aria-label="Email" />)

    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument()
  })

  it('accepts typed input', async () => {
    const user = userEvent.setup()
    render(<Input aria-label="Email" />)

    const field = screen.getByRole('textbox', { name: 'Email' })
    await user.type(field, 'you@example.com')

    expect(field).toHaveValue('you@example.com')
  })

  it('is disabled when the native attribute is set', () => {
    render(<Input aria-label="Email" disabled />)

    expect(screen.getByRole('textbox', { name: 'Email' })).toBeDisabled()
  })

  it('marks invalid and associates the error message when errorMessage is set', () => {
    render(<Input aria-label="Email" errorMessage="Enter a valid email" />)

    const field = screen.getByRole('textbox', { name: 'Email' })
    expect(field).toHaveAttribute('aria-invalid', 'true')
    expect(field).toHaveAccessibleDescription('Enter a valid email')
    expect(screen.getByText('Enter a valid email')).toBeInTheDocument()
  })

  it('honors an explicit aria-invalid without an error message', () => {
    render(<Input aria-label="Email" aria-invalid="true" />)

    expect(screen.getByRole('textbox', { name: 'Email' })).toHaveAttribute('aria-invalid', 'true')
    expect(screen.queryByText('Enter a valid email')).not.toBeInTheDocument()
  })
})
