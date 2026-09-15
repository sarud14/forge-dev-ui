import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TooltipProvider } from '@/components/ui'
import { TooltipDoc } from './TooltipDoc'

function renderDoc(): void {
  render(
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <TooltipDoc />
    </TooltipProvider>
  )
}

describe('TooltipDoc', () => {
  it('shows the Preview tab with a trigger per side', () => {
    renderDoc()

    expect(screen.getByRole('tab', { name: 'Preview' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('button', { name: 'top' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'right' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'bottom' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'left' })).toBeInTheDocument()
  })

  it('switches to the Code tab and shows Tooltip snippets', async () => {
    const user = userEvent.setup()
    renderDoc()

    await user.click(screen.getByRole('tab', { name: 'Code' }))

    expect(screen.getByText(/content="Copy to clipboard"/)).toBeInTheDocument()
    expect(screen.getByText(/side="right"/)).toBeInTheDocument()
  })

  it('switches to the Accessibility tab and lists the a11y notes', async () => {
    const user = userEvent.setup()
    renderDoc()

    await user.click(screen.getByRole('tab', { name: 'Accessibility' }))

    expect(screen.getByText(/role="tooltip"/)).toBeInTheDocument()
    expect(screen.getByText(/TooltipProvider/)).toBeInTheDocument()
  })
})
