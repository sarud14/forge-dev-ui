'use client'

import type { JSX } from 'react'
import * as RadixTabs from '@radix-ui/react-tabs'
import type { TabsProps } from '../types'
import { cx } from '../helpers'

/**
 * Wraps Radix Tabs as a single composed control. Arrow/Home/End keyboard navigation and
 * tab/tabpanel roles come from Radix (docs/DESIGN_SYSTEM.md) — not reimplemented. `items`
 * mirrors Select's `options` so Phase 1 callers do not assemble Trigger/Content by hand.
 */
export function Tabs({
  items,
  defaultValue,
  value,
  onValueChange,
  'aria-label': ariaLabel,
}: TabsProps): JSX.Element {
  const firstValue = items[0]?.value
  const uncontrolledDefault = value === undefined ? (defaultValue ?? firstValue) : undefined

  return (
    <RadixTabs.Root
      value={value}
      defaultValue={uncontrolledDefault}
      onValueChange={onValueChange}
    >
      <RadixTabs.List
        aria-label={ariaLabel}
        className="flex gap-[4px] border-b border-[var(--color-border)]"
      >
        {items.map((item) => (
          <RadixTabs.Trigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            className={cx(
              'border-0 border-b-2 border-transparent bg-transparent px-[16px] py-[10px]',
              'text-[length:var(--text-sm)] font-medium text-[var(--color-muted-foreground)]',
              'data-[state=active]:border-[var(--color-primary)] data-[state=active]:text-[var(--color-foreground)]',
              'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary)]',
              'disabled:opacity-40 disabled:pointer-events-none'
            )}
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {item.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {items.map((item) => (
        <RadixTabs.Content
          key={item.value}
          value={item.value}
          className="pt-[var(--space-4)] text-[length:var(--text-base)] leading-[var(--leading-relaxed)] text-[var(--color-muted-foreground)]"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {item.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  )
}
