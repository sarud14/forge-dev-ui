import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PatternPreview } from './PatternPreview'

describe('PatternPreview', () => {
  it('renders the form composition for the form slug', () => {
    render(<PatternPreview slug="form" />)

    expect(screen.getByRole('textbox', { name: 'Email' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
  })

  it('renders a confirmation dialog trigger for the confirmation slug', () => {
    render(<PatternPreview slug="confirmation" />)

    expect(screen.getByRole('button', { name: 'Delete component' })).toBeInTheDocument()
  })

  it('renders nothing for an unknown slug', () => {
    const { container } = render(<PatternPreview slug="unknown" />)

    expect(container).toBeEmptyDOMElement()
  })
})
