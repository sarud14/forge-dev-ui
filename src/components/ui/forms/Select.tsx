'use client'

import type { JSX } from 'react'
import * as RadixSelect from '@radix-ui/react-select'
import type { SelectProps } from '../types'
import { cx } from '../helpers'

export const DEFAULT_SELECT_PLACEHOLDER = 'Select…'

/**
 * Wraps Radix Select as a single composed field. Keyboard/ARIA (combobox, listbox, option)
 * come from Radix — Forge only supplies options, value wiring, and Editorial Dark styling
 * (docs/DESIGN_SYSTEM.md). Trigger chrome matches Input so form fields sit on one scale.
 */
export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  disabled,
  placeholder = DEFAULT_SELECT_PLACEHOLDER,
  name,
  'aria-label': ariaLabel,
}: SelectProps): JSX.Element {
  return (
    <RadixSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name}
    >
      <RadixSelect.Trigger
        aria-label={ariaLabel}
        className={cx(
          'flex w-full items-center justify-between gap-[var(--space-1)] border bg-[var(--color-background)] text-left text-[var(--color-foreground)]',
          'px-[12px] py-[10px] text-[length:var(--text-sm)] rounded-[var(--radius-md)]',
          'border-[var(--color-border)]',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
          'disabled:opacity-40 disabled:pointer-events-none',
          'data-[placeholder]:text-[var(--color-muted-foreground)]'
        )}
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon aria-hidden="true">
          <SelectChevron />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          position="popper"
          sideOffset={8}
          className={cx(
            'z-20 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-[var(--radius-md)] border',
            'border-[var(--color-border)] bg-[var(--color-muted)] shadow-[var(--shadow-md)]'
          )}
        >
          <RadixSelect.Viewport className="p-[var(--space-1)]">
            {options.map((option) => (
              <RadixSelect.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className={cx(
                  'relative flex cursor-pointer select-none items-center rounded-[var(--radius-sm)]',
                  'px-[12px] py-[8px] text-[length:var(--text-sm)] text-[var(--color-foreground)]',
                  'outline-none data-[highlighted]:bg-[var(--color-border)]',
                  'data-[disabled]:opacity-40 data-[disabled]:pointer-events-none data-[disabled]:cursor-not-allowed'
                )}
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}

function SelectChevron(): JSX.Element {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
