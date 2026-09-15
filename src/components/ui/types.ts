import type { ButtonHTMLAttributes, InputHTMLAttributes, ReactElement, ReactNode } from 'react'

/** Every shared prop interface/union for the design system lives here — never inline. */
export type Size = 'sm' | 'md' | 'lg'

/**
 * Semantic feedback tone. Input consumes the `neutral`/`danger` subset via `InputTone`.
 * Toast consumes `neutral`/`success`/`danger` via `ToastTone`. Button uses `variant`
 * instead of `tone`. Remaining `Tone` values stay reserved for later feedback surfaces.
 */
export type Tone = 'neutral' | 'success' | 'info' | 'warning' | 'danger' | 'brand'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive'

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
  readonly size?: Size
  readonly variant?: ButtonVariant
  readonly isLoading?: boolean
}

export interface TabsItem {
  readonly value: string
  readonly label: string
  readonly content: ReactNode
  readonly disabled?: boolean
}

/**
 * Composed Radix Tabs. `items` is the Phase 1 API so callers do not assemble Trigger/Content
 * by hand (same shape as Select's `options`). `aria-label` names the tablist.
 */
export interface TabsProps {
  readonly items: readonly TabsItem[]
  readonly defaultValue?: string
  readonly value?: string
  readonly onValueChange?: (value: string) => void
  readonly 'aria-label'?: string
}

export type TooltipSide = 'top' | 'right' | 'bottom' | 'left'

export interface TooltipProps {
  readonly children: ReactElement
  readonly content: ReactNode
  readonly side?: TooltipSide
  readonly delayDuration?: number
  readonly open?: boolean
  readonly defaultOpen?: boolean
  readonly onOpenChange?: (open: boolean) => void
}

export interface TooltipProviderProps {
  readonly children: ReactNode
  readonly delayDuration?: number
  readonly skipDelayDuration?: number
}

/** Input only ships `md` in Phase 1 — the union is closed so a later size is an explicit API change. */
export type InputSize = Extract<Size, 'md'>

/** Visual/validation tone for Input — a closed subset of `Tone`, not a parallel palette. */
export type InputTone = Extract<Tone, 'neutral' | 'danger'>

/**
 * Native text input. `size` is omitted from the HTML attribute set because the HTML `size`
 * attribute is a character-width number, not Forge's token size. `errorMessage` is Forge-only
 * and must not be forwarded to the DOM.
 */
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className' | 'size'> {
  readonly size?: InputSize
  readonly tone?: InputTone
  readonly errorMessage?: string
}

export interface SelectOption {
  readonly value: string
  readonly label: string
  readonly disabled?: boolean
}

/**
 * Composed Radix Select. `aria-label` names the combobox when there is no visible <label>.
 * `placeholder` is shown while no value is selected.
 */
export interface SelectProps {
  readonly options: readonly SelectOption[]
  readonly value?: string
  readonly defaultValue?: string
  readonly onValueChange?: (value: string) => void
  readonly disabled?: boolean
  readonly placeholder?: string
  readonly 'aria-label'?: string
  readonly name?: string
}

export interface DialogProps {
  readonly trigger: ReactNode
  readonly title: string
  readonly description?: string
  readonly children?: ReactNode
  readonly open?: boolean
  readonly onOpenChange?: (open: boolean) => void
}

/** Toast tones from DESIGN_SYSTEM.md — a closed subset of `Tone`, not a parallel palette. */
export type ToastTone = Extract<Tone, 'neutral' | 'success' | 'danger'>

/** Arguments for the imperative `toast()` helper. */
export interface ToastInput {
  readonly tone?: ToastTone
  readonly title: string
  readonly description?: string
  readonly duration?: number
}

/** Queued toast as rendered by `Toaster`. */
export interface ToastRecord {
  readonly id: string
  readonly tone: ToastTone
  readonly title: string
  readonly description?: string
  readonly duration: number
}

export type DataTableSortDirection = 'asc' | 'desc'

export interface DataTableSort {
  readonly columnId: string
  readonly direction: DataTableSortDirection
}

/**
 * Column definition. `sortable: true` requires `sortValue` so ordering is independent of
 * whatever ReactNode `cell` returns.
 */
export interface DataTableColumn<T> {
  readonly id: string
  readonly header: string
  readonly cell: (row: T) => ReactNode
  readonly sortable?: boolean
  readonly sortValue?: (row: T) => string | number
}

/**
 * Tabular data display. Sortable headers are real buttons (docs/DESIGN_SYSTEM.md).
 * `getRowId` is required so row keys are explicit, not inferred from an `id` field.
 */
export interface DataTableProps<T> {
  readonly columns: readonly DataTableColumn<T>[]
  readonly data: readonly T[]
  readonly getRowId: (row: T) => string
  readonly emptyState?: ReactNode
  readonly caption?: string
  readonly 'aria-label'?: string
  readonly sort?: DataTableSort
  readonly defaultSort?: DataTableSort
  readonly onSortChange?: (sort: DataTableSort) => void
}
