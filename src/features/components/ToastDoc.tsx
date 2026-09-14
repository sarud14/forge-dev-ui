'use client'

import { useState, type JSX } from 'react'
import { Button, toast, DEFAULT_TOAST_DURATION_MS } from '@/components/ui'
import type { ToastTone } from '@/components/ui'

type DocTab = 'preview' | 'code' | 'a11y'

const tabs: readonly { readonly id: DocTab; readonly label: string }[] = [
  { id: 'preview', label: 'Preview' },
  { id: 'code', label: 'Code' },
  { id: 'a11y', label: 'Accessibility' },
]

const tones: readonly ToastTone[] = ['neutral', 'success', 'danger']

const a11yNotes: readonly string[] = [
  'Toasts render in a Radix live region so they are announced without moving keyboard focus.',
  'Each toast exposes data-tone so tests and assistive tooling can read success vs danger without inspecting styles.',
  'Dismiss is a real button with an accessible name, not a click-handled icon div.',
  `duration defaults to ${DEFAULT_TOAST_DURATION_MS}ms (Radix’s own default). Pass Infinity to keep a toast until Dismiss.`,
]

function codeForTone(tone: ToastTone): string {
  if (tone === 'danger') {
    return `toast({ tone: "danger", title: "Could not save", description: "Try again." })`
  }
  if (tone === 'success') {
    return `toast({ tone: "success", title: "Saved" })`
  }
  return `toast({ title: "Saved" })`
}

/**
 * Toast documentation: Preview / Code / Accessibility. Client because the preview fires
 * the imperative `toast()` helper (requirement/forge-requirements.md §3.5).
 */
export function ToastDoc(): JSX.Element {
  const [activeTab, setActiveTab] = useState<DocTab>('preview')

  return (
    <div>
      <div
        role="tablist"
        aria-label="Toast documentation"
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
          {tones.map((tone) => (
            <Button
              key={tone}
              variant={tone === 'danger' ? 'destructive' : tone === 'success' ? 'primary' : 'secondary'}
              onClick={() => {
                if (tone === 'danger') {
                  toast({
                    tone,
                    title: 'Could not save',
                    description: 'Try again.',
                    duration: Number.POSITIVE_INFINITY,
                  })
                  return
                }
                toast({
                  tone,
                  title: 'Saved',
                  duration: Number.POSITIVE_INFINITY,
                })
              }}
            >
              Show {tone}
            </Button>
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
          {tones.map(codeForTone).join('\n')}
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
