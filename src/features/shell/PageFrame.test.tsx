import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { PageFrame } from './PageFrame'

describe('PageFrame', () => {
  it('renders children', () => {
    render(
      <PageFrame width="doc">
        <p>Body</p>
      </PageFrame>
    )

    expect(screen.getByText('Body')).toBeInTheDocument()
  })
})
