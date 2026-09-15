import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MarkdownBody } from './MarkdownBody'

describe('MarkdownBody', () => {
  it('renders headings, paragraphs, lists, and inline code', () => {
    render(
      <MarkdownBody
        source={`## When to use

Use \`Button\` for actions.

- Keep labels short
`}
      />
    )

    expect(screen.getByRole('heading', { level: 2, name: 'When to use' })).toBeInTheDocument()
    expect(screen.getByText('Button')).toBeInTheDocument()
    expect(screen.getByText('Keep labels short')).toBeInTheDocument()
  })
})
