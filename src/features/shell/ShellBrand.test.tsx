import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'
import { SITE_NAME } from '@/constants/seo'
import { ShellBrand } from './ShellBrand'

describe('ShellBrand', () => {
  it('exposes the forge.dev wordmark as the home link', () => {
    render(<ShellBrand />)

    expect(screen.getByRole('link', { name: SITE_NAME })).toHaveAttribute('href', '/')
  })
})
