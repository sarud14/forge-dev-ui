import { describe, expect, it } from 'vitest'
import { parseFrontmatter } from './parseFrontmatter'

describe('parseFrontmatter', () => {
  it('reads key/value pairs and the body after the closing fence', () => {
    const parsed = parseFrontmatter(`---
slug: button
title: Button
summary: Trigger for an action
order: 1
---

## When to use

Use Button for actions.
`)

    expect(parsed.data).toEqual({
      slug: 'button',
      title: 'Button',
      summary: 'Trigger for an action',
      order: '1',
    })
    expect(parsed.body).toBe('## When to use\n\nUse Button for actions.')
  })

  it('treats files without a fence as body-only', () => {
    expect(parseFrontmatter('Just a note.')).toEqual({
      data: {},
      body: 'Just a note.',
    })
  })
})
