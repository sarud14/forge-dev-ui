import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NavLinks } from './NavLinks'

vi.mock('next/navigation', () => ({
  usePathname: () => '/components',
}))

describe('NavLinks', () => {
  it('renders every top-level nav item as a link', () => {
    render(<NavLinks />)

    for (const label of [
      'Overview',
      'Foundations',
      'Components',
      'Patterns',
      'Engineering',
      'Playground',
    ]) {
      expect(screen.getByRole('link', { name: label })).toBeInTheDocument()
    }
  })

  it('marks the current route as the active page', () => {
    render(<NavLinks />)

    expect(screen.getByRole('link', { name: 'Components' })).toHaveAttribute('aria-current', 'page')
    expect(screen.getByRole('link', { name: 'Foundations' }).getAttribute('aria-current')).toBeNull()
  })
})
