import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import * as RadixToast from '@radix-ui/react-toast'
import { Toast } from './Toast'

describe('Toast', () => {
  it('renders title, description, and a dismiss control', () => {
    render(
      <RadixToast.Provider>
        <Toast
          id="toast-1"
          tone="success"
          title="Saved"
          description="Draft stored."
          duration={Number.POSITIVE_INFINITY}
        />
        <RadixToast.Viewport />
      </RadixToast.Provider>
    )

    expect(screen.getByText('Saved')).toBeInTheDocument()
    expect(screen.getByText('Draft stored.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Dismiss' })).toBeInTheDocument()
  })
})
