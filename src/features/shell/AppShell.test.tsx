import { describe, expect, it, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SITE_NAME } from '@/constants/seo'
import { AppShell } from './AppShell'

vi.mock('next/navigation', () => ({
  usePathname: () => '/components',
}))

function stubMatchMedia(matches: boolean): void {
  window.matchMedia = vi.fn().mockImplementation((query: string) => ({
    matches,
    media: query,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
    onchange: null,
  }))
}

describe('AppShell', () => {
  beforeEach(() => {
    stubMatchMedia(false)
  })

  it('shows a Menu control below the laptop stop', () => {
    stubMatchMedia(false)
    render(
      <AppShell>
        <p>Page</p>
      </AppShell>
    )

    expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: SITE_NAME })).toBeInTheDocument()
    expect(screen.queryByRole('navigation', { name: 'Primary' })).not.toBeInTheDocument()
  })

  it('opens the primary nav from Menu and closes it', async () => {
    const user = userEvent.setup()
    stubMatchMedia(false)
    render(
      <AppShell>
        <p>Page</p>
      </AppShell>
    )

    await user.click(screen.getByRole('button', { name: 'Menu' }))

    expect(screen.getByRole('dialog', { name: 'Menu' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Playground' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Close menu' }))

    expect(screen.queryByRole('dialog', { name: 'Menu' })).not.toBeInTheDocument()
  })

  it('shows the persistent sidebar from the laptop stop up', () => {
    stubMatchMedia(true)
    render(
      <AppShell>
        <p>Page</p>
      </AppShell>
    )

    expect(screen.queryByRole('button', { name: 'Menu' })).not.toBeInTheDocument()
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument()
  })
})
