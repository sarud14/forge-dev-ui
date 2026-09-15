import type { ButtonVariant, InputTone, SelectOption, Size, ToastTone, TooltipSide } from '@/components/ui'
import { EMAIL_INVALID_MESSAGE } from '@/validators/email.validators'

const BUTTON_VARIANTS: readonly ButtonVariant[] = ['primary', 'secondary', 'ghost', 'destructive']
const SIZES: readonly Size[] = ['sm', 'md', 'lg']
const INPUT_TONES: readonly InputTone[] = ['neutral', 'danger']
const TOAST_TONES: readonly ToastTone[] = ['neutral', 'success', 'danger']
const TOOLTIP_SIDES: readonly TooltipSide[] = ['top', 'right', 'bottom', 'left']
const TAB_VALUES = ['usage', 'a11y'] as const
const SELECT_SIZE_OPTIONS: readonly SelectOption[] = [
  { value: 'sm', label: 'Small' },
  { value: 'md', label: 'Medium' },
  { value: 'lg', label: 'Large' },
]

export type PlaygroundTabValue = (typeof TAB_VALUES)[number]

export function isButtonVariant(value: string): value is ButtonVariant {
  return BUTTON_VARIANTS.some((variant) => variant === value)
}

export function isSize(value: string): value is Size {
  return SIZES.some((size) => size === value)
}

export function isInputTone(value: string): value is InputTone {
  return INPUT_TONES.some((tone) => tone === value)
}

export function isToastTone(value: string): value is ToastTone {
  return TOAST_TONES.some((tone) => tone === value)
}

export function isTooltipSide(value: string): value is TooltipSide {
  return TOOLTIP_SIDES.some((side) => side === value)
}

export function isPlaygroundTabValue(value: string): value is PlaygroundTabValue {
  return TAB_VALUES.some((tab) => tab === value)
}

export function generateButtonCode(props: {
  readonly variant: ButtonVariant
  readonly size: Size
  readonly label: string
  readonly disabled: boolean
  readonly isLoading: boolean
}): string {
  const attrs = [
    props.variant !== 'primary' ? `variant="${props.variant}"` : null,
    props.size !== 'md' ? `size="${props.size}"` : null,
    props.disabled ? 'disabled' : null,
    props.isLoading ? 'isLoading' : null,
  ].filter((attr): attr is string => attr !== null)

  const attrString = attrs.length > 0 ? ` ${attrs.join(' ')}` : ''
  return `<Button${attrString}>${props.label}</Button>`
}

export function generateInputCode(props: {
  readonly tone: InputTone
  readonly disabled: boolean
  readonly errorMessage: string | undefined
}): string {
  const attrs = [
    props.tone !== 'neutral' ? `tone="${props.tone}"` : null,
    props.disabled ? 'disabled' : null,
    props.errorMessage !== undefined ? `errorMessage="${props.errorMessage}"` : null,
  ].filter((attr): attr is string => attr !== null)

  const attrString = attrs.length > 0 ? ` ${attrs.join(' ')}` : ''
  return `<Input${attrString} placeholder="you@example.com" />`
}

export function generateToastCode(props: {
  readonly tone: ToastTone
  readonly title: string
  readonly description: string
}): string {
  const fields = [
    props.tone !== 'neutral' ? `tone: '${props.tone}'` : null,
    `title: '${props.title}'`,
    props.description !== '' ? `description: '${props.description}'` : null,
  ].filter((field): field is string => field !== null)

  return `toast({ ${fields.join(', ')} })`
}

export function generateSelectCode(props: {
  readonly value: string
  readonly disabled: boolean
}): string {
  const attrs = [
    'aria-label="Select size"',
    'options={sizeOptions}',
    `value="${props.value}"`,
    props.disabled ? 'disabled' : null,
  ].filter((attr): attr is string => attr !== null)

  return `<Select ${attrs.join(' ')} />`
}

export function generateTabsCode(props: { readonly value: string }): string {
  return `<Tabs value="${props.value}" items={tabItems} />`
}

export function generateTooltipCode(props: {
  readonly content: string
  readonly side: TooltipSide
}): string {
  const attrs = [
    `content="${props.content}"`,
    props.side !== 'top' ? `side="${props.side}"` : null,
  ].filter((attr): attr is string => attr !== null)

  return `<Tooltip ${attrs.join(' ')}><Button>Hover me</Button></Tooltip>`
}

export {
  BUTTON_VARIANTS,
  SIZES,
  INPUT_TONES,
  TOAST_TONES,
  TOOLTIP_SIDES,
  TAB_VALUES,
  SELECT_SIZE_OPTIONS,
  EMAIL_INVALID_MESSAGE,
}
