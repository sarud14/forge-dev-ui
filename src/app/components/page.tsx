import type { Metadata } from 'next'
import type { JSX } from 'react'
import { ButtonDoc } from '@/features/components/ButtonDoc'
import { DataTableDoc } from '@/features/components/DataTableDoc'
import { InputDoc } from '@/features/components/InputDoc'
import { SelectDoc } from '@/features/components/SelectDoc'
import { TabsDoc } from '@/features/components/TabsDoc'
import { ToastDoc } from '@/features/components/ToastDoc'
import { TooltipDoc } from '@/features/components/TooltipDoc'

export const metadata: Metadata = { title: 'Components' }

export default function ComponentsPage(): JSX.Element {
  return (
    <div style={{ padding: '64px 56px', maxWidth: 920 }}>
      <div
        style={{
          fontSize: 'var(--text-xs)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--color-primary)',
          fontWeight: 600,
          marginBottom: 'var(--space-2)',
        }}
      >
        Components
      </div>
      <h1
        style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'var(--text-2xl)',
          fontWeight: 600,
          margin: '0 0 var(--space-2)',
        }}
      >
        Components
      </h1>
      <p
        style={{
          fontSize: 'var(--text-base)',
          color: 'var(--color-muted-foreground)',
          lineHeight: 'var(--leading-relaxed)',
          maxWidth: 600,
          margin: '0 0 var(--space-8)',
        }}
      >
        Production-quality primitives with documented states, accessibility notes, and live
        previews. Phase 1 currently ships Button, Input, Select, Tabs, Tooltip, Dialog, Toast, and
        Data Table.
      </p>

      <section aria-labelledby="components-button-heading" style={{ marginBottom: 'var(--space-8)' }}>
        <h2
          id="components-button-heading"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-lg)',
            fontWeight: 600,
            margin: '0 0 var(--space-2)',
          }}
        >
          Button
        </h2>
        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-muted-foreground)',
            lineHeight: 'var(--leading-relaxed)',
            maxWidth: 600,
            margin: '0 0 var(--space-6)',
          }}
        >
          Trigger for an action, built on native button semantics. Four variants, three sizes, and
          default/hover/focus/active/disabled/loading states.
        </p>
        <ButtonDoc />
      </section>

      <section aria-labelledby="components-input-heading" style={{ marginBottom: 'var(--space-8)' }}>
        <h2
          id="components-input-heading"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-lg)',
            fontWeight: 600,
            margin: '0 0 var(--space-2)',
          }}
        >
          Input
        </h2>
        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-muted-foreground)',
            lineHeight: 'var(--leading-relaxed)',
            maxWidth: 600,
            margin: '0 0 var(--space-6)',
          }}
        >
          Native text field with a danger tone and associated error text. React Hook Form and Zod
          bind through standard input props — Input does not import either library.
        </p>
        <InputDoc />
      </section>

      <section aria-labelledby="components-select-heading" style={{ marginBottom: 'var(--space-8)' }}>
        <h2
          id="components-select-heading"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-lg)',
            fontWeight: 600,
            margin: '0 0 var(--space-2)',
          }}
        >
          Select
        </h2>
        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-muted-foreground)',
            lineHeight: 'var(--leading-relaxed)',
            maxWidth: 600,
            margin: '0 0 var(--space-6)',
          }}
        >
          Composed Radix combobox. Pass <code>options</code>, not a hand-assembled Trigger/Content
          tree. Keyboard, typeahead, and listbox roles come from Radix.
        </p>
        <SelectDoc />
      </section>

      <section aria-labelledby="components-tabs-heading" style={{ marginBottom: 'var(--space-8)' }}>
        <h2
          id="components-tabs-heading"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-lg)',
            fontWeight: 600,
            margin: '0 0 var(--space-2)',
          }}
        >
          Tabs
        </h2>
        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-muted-foreground)',
            lineHeight: 'var(--leading-relaxed)',
            maxWidth: 600,
            margin: '0 0 var(--space-6)',
          }}
        >
          Composed Radix tabs. Pass <code>items</code> with value, label, and panel content. Arrow
          keys, Home, and End move between tabs.
        </p>
        <TabsDoc />
      </section>

      <section aria-labelledby="components-tooltip-heading" style={{ marginBottom: 'var(--space-8)' }}>
        <h2
          id="components-tooltip-heading"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-lg)',
            fontWeight: 600,
            margin: '0 0 var(--space-2)',
          }}
        >
          Tooltip
        </h2>
        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-muted-foreground)',
            lineHeight: 'var(--leading-relaxed)',
            maxWidth: 600,
            margin: '0 0 var(--space-6)',
          }}
        >
          Supplementary label on hover and focus. Mount <code>TooltipProvider</code> once in the
          root layout. Dismisses on Escape.
        </p>
        <TooltipDoc />
      </section>

      <section aria-labelledby="components-toast-heading" style={{ marginBottom: 'var(--space-8)' }}>
        <h2
          id="components-toast-heading"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-lg)',
            fontWeight: 600,
            margin: '0 0 var(--space-2)',
          }}
        >
          Toast
        </h2>
        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-muted-foreground)',
            lineHeight: 'var(--leading-relaxed)',
            maxWidth: 600,
            margin: '0 0 var(--space-6)',
          }}
        >
          Transient notification fired with <code>toast()</code> and announced in a live region.
          Mount <code>Toaster</code> once in the root layout.
        </p>
        <ToastDoc />
      </section>

      <section aria-labelledby="components-table-heading">
        <h2
          id="components-table-heading"
          style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'var(--text-lg)',
            fontWeight: 600,
            margin: '0 0 var(--space-2)',
          }}
        >
          Data Table
        </h2>
        <p
          style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-muted-foreground)',
            lineHeight: 'var(--leading-relaxed)',
            maxWidth: 600,
            margin: '0 0 var(--space-6)',
          }}
        >
          Tabular data with per-column sort. Sortable headers are real buttons with accessible
          names; <code>aria-sort</code> exposes the current direction.
        </p>
        <DataTableDoc />
      </section>
    </div>
  )
}
