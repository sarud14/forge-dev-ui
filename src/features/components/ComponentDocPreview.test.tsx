import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ComponentDocPreview } from './ComponentDocPreview'

describe('ComponentDocPreview', () => {
  it('renders the Button demo for the button slug', () => {
    render(<ComponentDocPreview slug="button" />)

    expect(screen.getByRole('tablist', { name: 'Button documentation' })).toBeInTheDocument()
  })

  it('renders nothing for an unknown slug', () => {
    const { container } = render(<ComponentDocPreview slug="unknown" />)

    expect(container).toBeEmptyDOMElement()
  })
})
