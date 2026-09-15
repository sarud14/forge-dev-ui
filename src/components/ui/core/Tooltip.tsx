'use client'

import type { JSX } from 'react'
import * as RadixTooltip from '@radix-ui/react-tooltip'
import type { TooltipProps, TooltipProviderProps } from '../types'
import { cx } from '../helpers'
import { DEFAULT_TOOLTIP_DELAY_MS } from './tooltipDelay'

/**
 * App-wide delay/skip-delay context. Mount once in the root layout next to `Toaster`
 * (docs/DESIGN_SYSTEM.md). Individual `Tooltip`s may still override `delayDuration`.
 */
export function TooltipProvider({
  children,
  delayDuration = DEFAULT_TOOLTIP_DELAY_MS,
  skipDelayDuration,
}: TooltipProviderProps): JSX.Element {
  return (
    <RadixTooltip.Provider delayDuration={delayDuration} skipDelayDuration={skipDelayDuration}>
      {children}
    </RadixTooltip.Provider>
  )
}

/**
 * Wraps Radix Tooltip. Dismisses on Escape; `side` is collision-aware via Radix placement.
 * `children` must be a single element (asChild) so the trigger keeps its own semantics —
 * typically a `Button`. Pass `delayDuration={0}` in tests and live demos that should appear
 * immediately; the provider default is `DEFAULT_TOOLTIP_DELAY_MS`. `open` / `defaultOpen`
 * exist so tests and controlled callers do not have to simulate hover in jsdom.
 */
export function Tooltip({
  children,
  content,
  side = 'top',
  delayDuration,
  open,
  defaultOpen,
  onOpenChange,
}: TooltipProps): JSX.Element {
  return (
    <RadixTooltip.Root
      delayDuration={delayDuration}
      open={open}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          side={side}
          sideOffset={8}
          className={cx(
            'z-20 max-w-[240px] rounded-[var(--radius-sm)] border border-[var(--color-border)]',
            'bg-[var(--color-muted)] px-[12px] py-[8px] text-[length:var(--text-xs)] text-[var(--color-foreground)]',
            'shadow-[var(--shadow-md)]'
          )}
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {content}
          <RadixTooltip.Arrow className="fill-[var(--color-muted)]" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  )
}
