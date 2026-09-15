import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { EngineeringSectionPage } from './engineeringSection'

describe('EngineeringSectionPage', () => {
  it('renders the accessibility write-up and a back link', async () => {
    const element = await EngineeringSectionPage({ slug: 'accessibility' })
    render(element)

    expect(screen.getByRole('link', { name: '← Engineering' })).toHaveAttribute(
      'href',
      '/engineering',
    )
    expect(screen.getByRole('heading', { level: 1, name: 'Accessibility' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Stance' })).toBeInTheDocument()
  })
})
