import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ComponentDocArticle } from './ComponentDocArticle'

describe('ComponentDocArticle', () => {
  it('renders title, summary, markdown body, preview, and a back link', () => {
    render(
      <ComponentDocArticle
        title="Button"
        summary="Trigger for an action."
        body={`## When to use

Use Button for actions.
`}
        preview={<div>Live preview</div>}
        backHref="/components"
        backLabel="← Components"
      />
    )

    expect(screen.getByRole('link', { name: '← Components' })).toHaveAttribute('href', '/components')
    expect(screen.getByRole('heading', { level: 1, name: 'Button' })).toBeInTheDocument()
    expect(screen.getByText('Trigger for an action.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 2, name: 'When to use' })).toBeInTheDocument()
    expect(screen.getByText('Live preview')).toBeInTheDocument()
  })
})
