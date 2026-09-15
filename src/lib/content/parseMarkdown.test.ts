import { describe, expect, it } from 'vitest'
import { parseMarkdownBlocks } from './parseMarkdown'

describe('parseMarkdownBlocks', () => {
  it('splits headings, paragraphs, and lists', () => {
    expect(
      parseMarkdownBlocks(`## When to use

Use Button for actions.

- Keep labels short
- Prefer verbs
`)
    ).toEqual([
      { type: 'heading', text: 'When to use' },
      { type: 'paragraph', text: 'Use Button for actions.' },
      { type: 'list', items: ['Keep labels short', 'Prefer verbs'] },
    ])
  })
})
