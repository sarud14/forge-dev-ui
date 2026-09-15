import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './Button'
import { Tooltip, TooltipProvider } from './Tooltip'

describe('Tooltip', () => {
  it('renders the trigger and stays closed by default', () => {
    render(
      <TooltipProvider delayDuration={0} skipDelayDuration={0}>
        <Tooltip content="Copy to clipboard" delayDuration={0}>
          <Button>Hover me</Button>
        </Tooltip>
      </TooltipProvider>
    )

    expect(screen.getByRole('button', { name: 'Hover me' })).toBeInTheDocument()
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument()
  })
})

// Opening the floating content is owned by Radix Popper and hangs in jsdom (ResizeObserver /
// collision loop). Use `open` in the browser / Playwright; Phase 1 asserts the trigger wiring.
