import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { TabsDoc } from './TabsDoc'

describe('TabsDoc', () => {
  it('shows the Preview tab with a live Tabs example', () => {
    render(<TabsDoc />)

    expect(screen.getByRole('tab', { name: 'Preview' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tablist', { name: 'Example' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Usage' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tab', { name: 'Keyboard' })).toBeInTheDocument()
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Import Tabs')
  })

  it('switches to the Code tab and shows a Tabs snippet', async () => {
    const user = userEvent.setup()
    render(<TabsDoc />)

    await user.click(screen.getByRole('tab', { name: 'Code' }))

    expect(screen.getByText(/defaultValue="usage"/)).toBeInTheDocument()
    expect(screen.getByText(/items=\{tabItems\}/)).toBeInTheDocument()
  })

  it('switches to the Accessibility tab and lists the a11y notes', async () => {
    const user = userEvent.setup()
    render(<TabsDoc />)

    await user.click(screen.getByRole('tab', { name: 'Accessibility' }))

    expect(screen.getByText(/Tablist, tab, and tabpanel/)).toBeInTheDocument()
    expect(screen.getByText(/Home, and End/)).toBeInTheDocument()
  })
})
