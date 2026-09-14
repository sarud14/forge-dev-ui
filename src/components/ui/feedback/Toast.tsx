'use client'

import type { JSX } from 'react'
import * as RadixToast from '@radix-ui/react-toast'
import type { ToastRecord } from '../types'
import { cx, getToneClassName } from '../helpers'
import { dismissToast } from './toastStore'

/**
 * Single toast item. Lives in a Radix live region (`role="status"`) so it is announced
 * without stealing focus (docs/DESIGN_SYSTEM.md accessibility contract).
 */
export function Toast({ id, tone, title, description, duration }: ToastRecord): JSX.Element {
  return (
    <RadixToast.Root
      duration={duration}
      data-tone={tone}
      onOpenChange={(open) => {
        if (!open) {
          dismissToast(id)
        }
      }}
      className={cx(
        'rounded-[var(--radius-md)] border border-[var(--color-border)] p-[var(--space-2)]',
        'shadow-[var(--shadow-md)]',
        getToneClassName(tone)
      )}
      style={{ fontFamily: 'var(--font-sans)' }}
    >
      <RadixToast.Title
        style={{
          fontWeight: 600,
          fontSize: 'var(--text-sm)',
          margin: 0,
        }}
      >
        {title}
      </RadixToast.Title>
      {description !== undefined && description !== '' ? (
        <RadixToast.Description
          style={{
            fontSize: 'var(--text-xs)',
            lineHeight: 'var(--leading-normal)',
            margin: '6px 0 0',
          }}
        >
          {description}
        </RadixToast.Description>
      ) : null}
      <RadixToast.Close
        aria-label="Dismiss"
        className="mt-[var(--space-1)] text-[length:var(--text-xs)] underline-offset-2 hover:underline"
        style={{
          background: 'transparent',
          border: 'none',
          padding: 0,
          color: 'inherit',
          cursor: 'pointer',
          fontFamily: 'var(--font-sans)',
        }}
      >
        Dismiss
      </RadixToast.Close>
    </RadixToast.Root>
  )
}
