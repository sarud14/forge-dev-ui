import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Select } from './Select'

const options = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
  { value: 'xl', label: 'Extra large', disabled: true },
] as const

describe('Select', () => {
  it('renders a named combobox', () => {
    render(<Select aria-label="Size" options={options} />)

    expect(screen.getByRole('combobox', { name: 'Size' })).toHaveTextContent('Select…')
  })

  it('is disabled when the disabled prop is set', () => {
    render(<Select aria-label="Size" options={options} disabled />)

    expect(screen.getByRole('combobox', { name: 'Size' })).toBeDisabled()
  })

  it('shows the selected option label for a default value', () => {
    render(<Select aria-label="Size" options={options} defaultValue="md" />)

    expect(screen.getByRole('combobox', { name: 'Size' })).toHaveTextContent('Medium')
  })
})

// Opening the listbox is owned by Radix and hangs in jsdom (pointer capture / positioning).
// Phase 1 asserts the composed wiring: accessible name, disabled, selected label.
