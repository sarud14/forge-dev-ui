import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Dialog } from './Dialog'
import { Button } from '../core/Button'

describe('Dialog', () => {
  it('is closed until the trigger is activated', () => {
    render(
      <Dialog trigger={<Button>Delete component</Button>} title="Delete component?">
        content
      </Dialog>
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('opens on trigger click, shows the title, and closes on Escape', async () => {
    const user = userEvent.setup()
    render(
      <Dialog
        trigger={<Button>Delete component</Button>}
        title="Delete component?"
        description="This demonstrates Dialog's focus-trap and dismissal behavior."
      />
    )

    await user.click(screen.getByRole('button', { name: 'Delete component' }))
    expect(screen.getByRole('dialog', { name: 'Delete component?' })).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})
