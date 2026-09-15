import { describe, expect, it, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Toaster, TooltipProvider, clearToasts } from '@/components/ui'
import { PlaygroundControls } from './PlaygroundControls'

function renderPlayground(): void {
  render(
    <TooltipProvider delayDuration={0} skipDelayDuration={0}>
      <Toaster />
      <PlaygroundControls />
    </TooltipProvider>
  )
}

describe('PlaygroundControls', () => {
  beforeEach(() => {
    clearToasts()
  })

  it('renders the default preview and generated code', () => {
    renderPlayground()

    expect(screen.getByRole('button', { name: 'Button' })).toBeInTheDocument()
    expect(screen.getByText('<Button>Button</Button>')).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: 'Preview input' })).toBeInTheDocument()
    expect(screen.getByText('<Input placeholder="you@example.com" />')).toBeInTheDocument()
    expect(screen.getByText("toast({ tone: 'success', title: 'Saved' })")).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Select size' })).toHaveTextContent('Medium')
    expect(
      screen.getByText('<Select aria-label="Select size" options={sizeOptions} value="md" />')
    ).toBeInTheDocument()
    expect(screen.getByRole('tablist', { name: 'Playground example' })).toBeInTheDocument()
    expect(screen.getByText('<Tabs value="usage" items={tabItems} />')).toBeInTheDocument()
    expect(
      screen.getByText('<Tooltip content="Copy to clipboard"><Button>Hover me</Button></Tooltip>')
    ).toBeInTheDocument()
  })

  it('updates the preview and generated code when the label changes', async () => {
    const user = userEvent.setup()
    renderPlayground()

    const labelInput = screen.getByLabelText('Label')
    await user.clear(labelInput)
    await user.type(labelInput, 'Ship it')

    expect(screen.getByRole('button', { name: 'Ship it' })).toBeInTheDocument()
    expect(screen.getByText('<Button>Ship it</Button>')).toBeInTheDocument()
  })

  it('updates the generated code when variant and size change', async () => {
    const user = userEvent.setup()
    renderPlayground()

    await user.selectOptions(screen.getByLabelText('Variant'), 'destructive')
    await user.selectOptions(screen.getByLabelText('Size'), 'lg')

    expect(screen.getByText('<Button variant="destructive" size="lg">Button</Button>')).toBeInTheDocument()
  })

  it('toggles disabled and loading into the generated code', async () => {
    const user = userEvent.setup()
    renderPlayground()

    await user.click(screen.getByLabelText('Disabled'))
    await user.click(screen.getByLabelText('Loading'))

    expect(screen.getByText('<Button disabled isLoading>Button</Button>')).toBeInTheDocument()
  })

  it('updates the generated Input code when tone, disabled, and error change', async () => {
    const user = userEvent.setup()
    renderPlayground()

    await user.selectOptions(screen.getByLabelText('Tone'), 'danger')
    await user.click(screen.getByLabelText('Input disabled'))
    await user.click(screen.getByLabelText('Show error'))

    expect(
      screen.getByText(
        '<Input tone="danger" disabled errorMessage="Enter a valid email" placeholder="you@example.com" />'
      )
    ).toBeInTheDocument()
  })

  it('opens the dialog demo from the trigger button', async () => {
    const user = userEvent.setup()
    renderPlayground()

    await user.click(screen.getByRole('button', { name: 'Open dialog demo' }))

    expect(screen.getByRole('dialog', { name: 'Delete component?' })).toBeInTheDocument()
  })

  it('updates the generated toast() snippet and fires a toast', async () => {
    const user = userEvent.setup()
    renderPlayground()

    await user.selectOptions(screen.getByLabelText('Toast tone'), 'danger')
    await user.clear(screen.getByLabelText('Toast title'))
    await user.type(screen.getByLabelText('Toast title'), 'Could not save')
    await user.type(screen.getByLabelText('Toast description'), 'Try again.')

    expect(
      screen.getByText("toast({ tone: 'danger', title: 'Could not save', description: 'Try again.' })")
    ).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Show toast' }))

    expect(screen.getByText('Could not save')).toBeInTheDocument()
    expect(screen.getByText('Try again.')).toBeInTheDocument()
  })

  it('toggles Select disabled into the generated code', async () => {
    const user = userEvent.setup()
    renderPlayground()

    await user.click(screen.getByLabelText('Select disabled'))

    expect(
      screen.getByText('<Select aria-label="Select size" options={sizeOptions} value="md" disabled />')
    ).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: 'Select size' })).toBeDisabled()
  })

  it('updates the generated Tabs snippet when the active tab changes', async () => {
    const user = userEvent.setup()
    renderPlayground()

    await user.click(screen.getByRole('tab', { name: 'Accessibility' }))

    expect(screen.getByText('<Tabs value="a11y" items={tabItems} />')).toBeInTheDocument()
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Arrow keys move between tabs.')
  })

  it('updates the generated Tooltip snippet when side and content change', async () => {
    const user = userEvent.setup()
    renderPlayground()

    await user.selectOptions(screen.getByLabelText('Side'), 'right')
    await user.clear(screen.getByLabelText('Content'))
    await user.type(screen.getByLabelText('Content'), 'On the right')

    expect(
      screen.getByText(
        '<Tooltip content="On the right" side="right"><Button>Hover me</Button></Tooltip>'
      )
    ).toBeInTheDocument()
  })
})
