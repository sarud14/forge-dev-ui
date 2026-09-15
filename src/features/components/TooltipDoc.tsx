'use client'

import { useState, type JSX } from 'react'
import { Button, Tooltip, DEFAULT_TOOLTIP_DELAY_MS } from '@/components/ui'
import type { TooltipSide } from '@/components/ui'

type DocTab = 'preview' | 'code' | 'a11y'

const tabs: readonly { readonly id: DocTab; readonly label: string }[] = [
  { id: 'preview', label: 'Preview' },
  { id: 'code', label: 'Code' },
  { id: 'a11y', label: 'Accessibility' },
]

const sides: readonly TooltipSide[] = ['top', 'right', 'bottom', 'left']

const a11yNotes: readonly string[] = [
  'Content is exposed with role="tooltip" and dismissed with Escape — via Radix, not custom listeners.',
  'The trigger keeps its own semantics (asChild) — typically a Button, never a click-handled div.',
  `delayDuration defaults to ${DEFAULT_TOOLTIP_DELAY_MS}ms (Radix’s own default). Pass 0 in tests and snappy demos.`,
  'Mount TooltipProvider once in the root layout so every tooltip shares delay/skip-delay context.',
]

/**
 * Tooltip documentation: Preview / Code / Accessibility. Client because the preview is a live
 * hover/focus tooltip. delayDuration is 0 in the preview so the demo appears immediately;
 * the Code tab shows the production default (no delayDuration prop).
 */
export function TooltipDoc(): JSX.Element {
  const [activeTab, setActiveTab] = useState<DocTab>('preview')

  return (
    <div>
      <div
        role="tablist"
        aria-label="Tooltip documentation"
        style={{
          display: 'flex',
          gap: 4,
          marginBottom: 'var(--space-4)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 16px',
              fontSize: 'var(--text-sm)',
              fontWeight: 500,
              background: 'transparent',
              border: 'none',
              borderBottom:
                activeTab === tab.id ? '2px solid var(--color-primary)' : '2px solid transparent',
              color: activeTab === tab.id ? 'var(--color-foreground)' : 'var(--color-muted-foreground)',
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'preview' ? (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {sides.map((side) => (
            <Tooltip key={side} content={`Placed on the ${side}`} side={side} delayDuration={0}>
              <Button variant="secondary">{side}</Button>
            </Tooltip>
          ))}
        </div>
      ) : null}

      {activeTab === 'code' ? (
        <pre
          style={{
            background: 'var(--color-muted)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-4)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--text-sm)',
            lineHeight: 'var(--leading-normal)',
            color: 'var(--color-foreground)',
            overflowX: 'auto',
          }}
        >
          {`<Tooltip content="Copy to clipboard"><Button>Hover me</Button></Tooltip>
<Tooltip content="On the right" side="right"><Button>right</Button></Tooltip>`}
        </pre>
      ) : null}

      {activeTab === 'a11y' ? (
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 12, paddingLeft: 20, margin: 0 }}>
          {a11yNotes.map((note) => (
            <li
              key={note}
              style={{
                fontSize: 'var(--text-base)',
                color: 'var(--color-muted-foreground)',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              {note}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
