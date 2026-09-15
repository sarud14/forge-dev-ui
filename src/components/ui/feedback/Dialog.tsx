'use client'

import * as RadixDialog from '@radix-ui/react-dialog'
import type { JSX } from 'react'
import type { DialogProps } from '../types'
import { Button } from '../core/Button'

/**
 * Wraps Radix Dialog. States: closed, opening, open, submitting, error, closing
 * (requirement/forge-requirements.md §3.5) — submitting/error are the caller's responsibility
 * (pass a footer via `children`); this component owns open/close, focus-trap and dismissal.
 * Accessibility guarantee: focus trapped while open, restored to the trigger on close, Escape
 * and overlay-click dismiss, `role="dialog"` + `aria-modal` (all via Radix — not reimplemented).
 */
export function Dialog({
  trigger,
  title,
  description,
  children,
  open,
  onOpenChange,
}: DialogProps): JSX.Element {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay
          className="fixed inset-0 z-10"
          style={{ background: 'rgba(6, 8, 12, 0.6)' }}
        />
        <RadixDialog.Content
          className="fixed left-1/2 top-1/2 z-10 w-[min(var(--size-dialog),calc(100vw-2*var(--space-3)))] max-w-[calc(100vw-2*var(--space-3))] -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-lg)] border p-[var(--space-4)]"
          style={{ background: 'var(--color-muted)', borderColor: 'var(--color-border)' }}
        >
          <RadixDialog.Title
            style={{
              fontFamily: 'var(--font-serif)',
              fontWeight: 600,
              fontSize: 'var(--text-lg)',
              marginBottom: 10,
              color: 'var(--color-foreground)',
            }}
          >
            {title}
          </RadixDialog.Title>
          {description ? (
            <RadixDialog.Description
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--color-muted-foreground)',
                lineHeight: 1.6,
                marginBottom: 26,
              }}
            >
              {description}
            </RadixDialog.Description>
          ) : null}
          {children ?? (
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <RadixDialog.Close asChild>
                <Button variant="ghost">Cancel</Button>
              </RadixDialog.Close>
              <RadixDialog.Close asChild>
                <Button variant="primary">Confirm</Button>
              </RadixDialog.Close>
            </div>
          )}
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}
