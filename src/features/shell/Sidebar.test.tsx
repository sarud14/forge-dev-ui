import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'

vi.mock('next/navigation', () => ({
  usePathname: () => '/components',
}))

import { Sidebar } from './Sidebar'

describe('Sidebar', () => {
  it('exposes the forge.dev wordmark as the home link', () => {
    render(<Sidebar />)

    expect(screen.getByRole('link', { name: 'forge.dev' })).toHaveAttribute('href', '/')
  })

  it('renders every top-level nav item as a link', () => {
    render(<Sidebar />)

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
    render(<Sidebar />)

    expect(screen.getByRole('link', { name: 'Components' })).toHaveAttribute(
      'aria-current',
      'page'
    )
    expect(screen.getByRole('link', { name: 'Foundations' })).not.toHaveAttribute('aria-current')
  })
})
