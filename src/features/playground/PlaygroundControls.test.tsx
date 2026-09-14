import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PlaygroundControls } from './PlaygroundControls'

describe('PlaygroundControls', () => {
  it('renders the default preview and generated code', () => {
    render(<PlaygroundControls />)

    expect(screen.getByRole('button', { name: 'Button' })).toBeInTheDocument()
    expect(screen.getByText('<Button>Button</Button>')).toBeInTheDocument()
  })

  it('updates the preview and generated code when the label changes', async () => {
    const user = userEvent.setup()
    render(<PlaygroundControls />)

    const labelInput = screen.getByLabelText('Label')
    await user.clear(labelInput)
    await user.type(labelInput, 'Ship it')

    expect(screen.getByRole('button', { name: 'Ship it' })).toBeInTheDocument()
    expect(screen.getByText('<Button>Ship it</Button>')).toBeInTheDocument()
  })

  it('updates the generated code when variant and size change', async () => {
    const user = userEvent.setup()
    render(<PlaygroundControls />)

    await user.selectOptions(screen.getByLabelText('Variant'), 'destructive')
    await user.selectOptions(screen.getByLabelText('Size'), 'lg')

    expect(screen.getByText('<Button variant="destructive" size="lg">Button</Button>')).toBeInTheDocument()
  })

  it('toggles disabled and loading into the generated code', async () => {
    const user = userEvent.setup()
    render(<PlaygroundControls />)

    await user.click(screen.getByLabelText('Disabled'))
    await user.click(screen.getByLabelText('Loading'))

    expect(screen.getByText('<Button disabled isLoading>Button</Button>')).toBeInTheDocument()
  })

  it('opens the dialog demo from the trigger button', async () => {
    const user = userEvent.setup()
    render(<PlaygroundControls />)

    await user.click(screen.getByRole('button', { name: 'Open dialog demo' }))

    expect(screen.getByRole('dialog', { name: 'Delete component?' })).toBeInTheDocument()
  })
})
