import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { FoundationPreview } from './FoundationPreview'

describe('FoundationPreview', () => {
  it('renders color swatches for the tokens slug', () => {
    render(<FoundationPreview slug="tokens" />)

    expect(screen.getByRole('img', { name: '--color-primary swatch' })).toBeInTheDocument()
    expect(screen.getByText('--space-4')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: '--radius-md swatch' })).toBeInTheDocument()
  })

  it('renders breakpoint names for the layout slug', () => {
    render(<FoundationPreview slug="layout" />)

    expect(screen.getByText('--bp-laptop')).toBeInTheDocument()
    expect(screen.getByText('--size-content')).toBeInTheDocument()
  })

  it('renders nothing for an unknown slug', () => {
    const { container } = render(<FoundationPreview slug="principles" />)

    expect(container).toBeEmptyDOMElement()
  })
})
