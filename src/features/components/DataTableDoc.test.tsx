import { describe, expect, it } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DEFAULT_EMPTY_STATE } from '@/components/ui'
import { DataTableDoc } from './DataTableDoc'

describe('DataTableDoc', () => {
  it('shows the Preview tab with a populated table and an empty example', () => {
    render(<DataTableDoc />)

    expect(screen.getByRole('tab', { name: 'Preview' })).toHaveAttribute('aria-selected', 'true')
    expect(screen.getByRole('table', { name: 'Components' })).toBeInTheDocument()
    expect(
      within(screen.getByRole('table', { name: 'Components' })).getByRole('button', { name: 'Name' })
    ).toBeInTheDocument()
    expect(screen.getByRole('table', { name: 'Empty components' })).toBeInTheDocument()
    expect(screen.getByText(DEFAULT_EMPTY_STATE)).toBeInTheDocument()
  })

  it('switches to the Code tab and shows DataTable snippets', async () => {
    const user = userEvent.setup()
    render(<DataTableDoc />)

    await user.click(screen.getByRole('tab', { name: 'Code' }))

    expect(screen.getByText(/getRowId=\{\(row\) => row.id\}/)).toBeInTheDocument()
    expect(screen.getByText(/data=\{\[\]\}/)).toBeInTheDocument()
  })

  it('switches to the Accessibility tab and lists the a11y notes', async () => {
    const user = userEvent.setup()
    render(<DataTableDoc />)

    await user.click(screen.getByRole('tab', { name: 'Accessibility' }))

    expect(screen.getByText(/native <table>/)).toBeInTheDocument()
    expect(screen.getByText(/aria-sort/)).toBeInTheDocument()
  })
})
