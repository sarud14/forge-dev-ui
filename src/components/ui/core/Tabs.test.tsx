import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Tabs } from './Tabs'

const items = [
  { value: 'usage', label: 'Usage', content: 'How to use it' },
  { value: 'a11y', label: 'Accessibility', content: 'Keyboard notes' },
  { value: 'hidden', label: 'Hidden', content: 'Should stay unreachable', disabled: true },
] as const

describe('Tabs', () => {
  it('selects the first item by default and exposes tab/tabpanel roles', () => {
    render(<Tabs aria-label="Example" items={items} />)

    expect(screen.getByRole('tablist', { name: 'Example' })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: 'Usage' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('tabpanel')).toHaveTextContent('How to use it')
  })

  it('switches the panel when another tab is activated', async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<Tabs aria-label="Example" items={items} onValueChange={onValueChange} />)

    await user.click(screen.getByRole('tab', { name: 'Accessibility' }))

    expect(onValueChange).toHaveBeenCalledWith('a11y')
    expect(screen.getByRole('tab', { name: 'Accessibility' })).toHaveAttribute(
      'aria-selected',
      'true'
    )
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Keyboard notes')
  })

  it('does not activate a disabled tab', async () => {
    const user = userEvent.setup()
    render(<Tabs aria-label="Example" items={items} />)

    expect(screen.getByRole('tab', { name: 'Hidden' })).toBeDisabled()
    await user.click(screen.getByRole('tab', { name: 'Hidden' }))

    expect(screen.getByRole('tab', { name: 'Usage' })).toHaveAttribute('aria-selected', 'true')
  })
})
