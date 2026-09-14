import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { EMAIL_INVALID_MESSAGE } from '@/validators/email.validators'
import { PlaygroundEmailForm } from './PlaygroundEmailForm'

describe('PlaygroundEmailForm', () => {
  it('shows a validation error for an invalid email', async () => {
    const user = userEvent.setup()
    render(<PlaygroundEmailForm />)

    await user.type(screen.getByLabelText('Email'), 'not-an-email')
    await user.click(screen.getByRole('button', { name: 'Validate' }))

    expect(await screen.findByText(EMAIL_INVALID_MESSAGE)).toBeInTheDocument()
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true')
  })

  it('accepts a valid email on submit', async () => {
    const user = userEvent.setup()
    render(<PlaygroundEmailForm />)

    await user.type(screen.getByLabelText('Email'), 'you@example.com')
    await user.click(screen.getByRole('button', { name: 'Validate' }))

    expect(await screen.findByText('Accepted you@example.com')).toBeInTheDocument()
  })
})
