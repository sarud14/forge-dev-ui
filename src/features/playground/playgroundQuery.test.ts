import { describe, expect, it } from 'vitest'
import { EMAIL_INVALID_MESSAGE } from '@/validators/email.validators'
import {
  generateButtonCode,
  generateInputCode,
  generateSelectCode,
  generateTabsCode,
  generateToastCode,
  generateTooltipCode,
  isButtonVariant,
  isInputTone,
  isPlaygroundTabValue,
  isSize,
  isToastTone,
  isTooltipSide,
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

describe('generateToastCode', () => {
  it('omits default tone and empty description', () => {
    expect(generateToastCode({ tone: 'neutral', title: 'Saved', description: '' })).toBe(
      "toast({ title: 'Saved' })"
    )
  })

  it('includes tone and description when set', () => {
    expect(
      generateToastCode({
        tone: 'danger',
        title: 'Could not save',
        description: 'Try again.',
      })
    ).toBe("toast({ tone: 'danger', title: 'Could not save', description: 'Try again.' })")
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
    expect(isToastTone('success')).toBe(true)
    expect(isToastTone('brand')).toBe(false)
    expect(isTooltipSide('right')).toBe(true)
    expect(isTooltipSide('start')).toBe(false)
    expect(isPlaygroundTabValue('usage')).toBe(true)
    expect(isPlaygroundTabValue('preview')).toBe(false)
  })
})

describe('generateSelectCode', () => {
  it('includes the selected value and omits disabled by default', () => {
    expect(generateSelectCode({ value: 'md', disabled: false })).toBe(
      '<Select aria-label="Select size" options={sizeOptions} value="md" />'
    )
  })

  it('includes disabled when set', () => {
    expect(generateSelectCode({ value: 'lg', disabled: true })).toBe(
      '<Select aria-label="Select size" options={sizeOptions} value="lg" disabled />'
    )
  })
})

describe('generateTabsCode', () => {
  it('emits the controlled value', () => {
    expect(generateTabsCode({ value: 'a11y' })).toBe('<Tabs value="a11y" items={tabItems} />')
  })
})

describe('generateTooltipCode', () => {
  it('omits default side', () => {
    expect(generateTooltipCode({ content: 'Copy to clipboard', side: 'top' })).toBe(
      '<Tooltip content="Copy to clipboard"><Button>Hover me</Button></Tooltip>'
    )
  })

  it('includes a non-default side', () => {
    expect(generateTooltipCode({ content: 'On the right', side: 'right' })).toBe(
      '<Tooltip content="On the right" side="right"><Button>Hover me</Button></Tooltip>'
    )
  })
})
