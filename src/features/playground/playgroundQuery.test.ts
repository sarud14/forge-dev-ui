import { describe, expect, it } from 'vitest'
import { EMAIL_INVALID_MESSAGE } from '@/validators/email.validators'
import {
  generateButtonCode,
  generateInputCode,
  isButtonVariant,
  isInputTone,
  isSize,
} from './playgroundQuery'

describe('generateButtonCode', () => {
  it('omits default variant and size', () => {
    expect(
      generateButtonCode({
        variant: 'primary',
        size: 'md',
        label: 'Button',
        disabled: false,
        isLoading: false,
      })
    ).toBe('<Button>Button</Button>')
  })

  it('includes non-default props', () => {
    expect(
      generateButtonCode({
        variant: 'destructive',
        size: 'lg',
        label: 'Ship it',
        disabled: true,
        isLoading: true,
      })
    ).toBe('<Button variant="destructive" size="lg" disabled isLoading>Ship it</Button>')
  })
})

describe('generateInputCode', () => {
  it('omits default tone when there is no error', () => {
    expect(
      generateInputCode({ tone: 'neutral', disabled: false, errorMessage: undefined })
    ).toBe('<Input placeholder="you@example.com" />')
  })

  it('includes tone, disabled, and errorMessage when set', () => {
    expect(
      generateInputCode({
        tone: 'danger',
        disabled: true,
        errorMessage: EMAIL_INVALID_MESSAGE,
      })
    ).toBe(
      `<Input tone="danger" disabled errorMessage="${EMAIL_INVALID_MESSAGE}" placeholder="you@example.com" />`
    )
  })
})

describe('playground union guards', () => {
  it('accepts known Button variants and rejects others', () => {
    expect(isButtonVariant('ghost')).toBe(true)
    expect(isButtonVariant('link')).toBe(false)
  })

  it('accepts known sizes and Input tones', () => {
    expect(isSize('md')).toBe(true)
    expect(isSize('xl')).toBe(false)
    expect(isInputTone('danger')).toBe(true)
    expect(isInputTone('success')).toBe(false)
  })
})
