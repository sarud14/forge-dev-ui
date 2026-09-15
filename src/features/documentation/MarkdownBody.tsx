import type { JSX } from 'react'
import { parseMarkdownBlocks } from '@/lib/content/parseMarkdown'
import type { MarkdownBodyProps } from '@/types/content.types'

function InlineText({ text }: { readonly text: string }): JSX.Element {
  const parts = text.split(/(`[^`]+`)/g)

  return (
    <>
      {parts.map((part, index) => {
        if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
          return (
            <code
              key={`${part}-${String(index)}`}
              style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-sm)' }}
            >
              {part.slice(1, -1)}
            </code>
          )
        }

        return <span key={`${part}-${String(index)}`}>{part}</span>
      })}
    </>
  )
}

/**
 * Renders the Phase 1 markdown subset produced by parseMarkdownBlocks. Lives in
 * features/documentation so MDX compilation is not required yet.
 */
export function MarkdownBody({ source }: MarkdownBodyProps): JSX.Element {
  const blocks = parseMarkdownBlocks(source)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      {blocks.map((block, index) => {
        if (block.type === 'heading') {
          return (
            <h2
              key={`${block.text}-${String(index)}`}
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'var(--text-lg)',
                fontWeight: 600,
                margin: 0,
              }}
            >
              {block.text}
            </h2>
          )
        }

        if (block.type === 'list') {
          return (
            <ul
              key={`list-${String(index)}`}
              style={{
                margin: 0,
                paddingLeft: 20,
                color: 'var(--color-muted-foreground)',
                lineHeight: 'var(--leading-relaxed)',
              }}
            >
              {block.items.map((item) => (
                <li key={item}>
                  <InlineText text={item} />
                </li>
              ))}
            </ul>
          )
        }

        return (
          <p
            key={`${block.text}-${String(index)}`}
            style={{
              margin: 0,
              fontSize: 'var(--text-base)',
              color: 'var(--color-muted-foreground)',
              lineHeight: 'var(--leading-relaxed)',
            }}
          >
            <InlineText text={block.text} />
          </p>
        )
      })}
    </div>
  )
}
