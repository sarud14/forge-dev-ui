import type { CSSProperties, JSX } from 'react'
import { TOKEN_SWATCH_GRID_CLASS } from '@/components/ui'
import type { ComponentDocPreviewProps } from '@/types/content.types'
import {
  FOUNDATION_BREAKPOINT_ROWS,
  FOUNDATION_COLOR_TOKENS,
  FOUNDATION_RADIUS_TOKENS,
  FOUNDATION_SIZE_TOKENS,
  FOUNDATION_SPACE_TOKENS,
} from './foundationTokens'

const SECTION_LABEL_STYLE: CSSProperties = {
  fontSize: 'var(--text-xs)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  fontWeight: 600,
  color: 'var(--color-muted-foreground)',
  marginBottom: 'var(--space-2)',
}

const MUTED_PANEL_STYLE: CSSProperties = {
  display: 'flex',
  gap: 'var(--space-3)',
  background: 'var(--color-muted)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-4)',
  marginBottom: 'var(--space-8)',
  border: '1px solid var(--color-border)',
  overflowX: 'auto',
}

function TokenName({ name }: { readonly name: string }): JSX.Element {
  return (
    <code style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--text-2xs)' }}>{name}</code>
  )
}

function TokensPreview(): JSX.Element {
  return (
    <div>
      <div style={SECTION_LABEL_STYLE} id="foundation-color-heading">
        Color
      </div>
      <div className={TOKEN_SWATCH_GRID_CLASS} aria-labelledby="foundation-color-heading">
        {FOUNDATION_COLOR_TOKENS.map((name) => (
          <div
            key={name}
            style={{
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid var(--color-border)',
            }}
          >
            <div
              role="img"
              aria-label={`${name} swatch`}
              style={{ height: 'var(--space-8)', background: `var(${name})` }}
            />
            <div style={{ padding: 'var(--space-2)', background: 'var(--color-muted)' }}>
              <TokenName name={name} />
            </div>
          </div>
        ))}
      </div>

      <div style={SECTION_LABEL_STYLE} id="foundation-space-heading">
        Spacing scale
      </div>
      <div
        style={{ ...MUTED_PANEL_STYLE, alignItems: 'flex-end' }}
        aria-labelledby="foundation-space-heading"
      >
        {FOUNDATION_SPACE_TOKENS.map((name) => (
          <div
            key={name}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}
          >
            <div
              aria-hidden="true"
              style={{
                width: 'var(--space-4)',
                height: `var(${name})`,
                borderRadius: 'var(--radius-sm)',
                background: 'var(--color-primary)',
              }}
            />
            <TokenName name={name} />
          </div>
        ))}
      </div>

      <div style={SECTION_LABEL_STYLE} id="foundation-radius-heading">
        Radius scale
      </div>
      <div style={{ ...MUTED_PANEL_STYLE, marginBottom: 0 }} aria-labelledby="foundation-radius-heading">
        {FOUNDATION_RADIUS_TOKENS.map((name) => (
          <div
            key={name}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}
          >
            <div
              role="img"
              aria-label={`${name} swatch`}
              style={{
                width: 'var(--space-8)',
                height: 'var(--space-8)',
                background: 'var(--color-background)',
                border: '1px solid var(--color-border)',
                borderRadius: `var(${name})`,
              }}
            />
            <TokenName name={name} />
          </div>
        ))}
      </div>
    </div>
  )
}

function LayoutPreview(): JSX.Element {
  return (
    <div>
      <div style={SECTION_LABEL_STYLE} id="foundation-breakpoint-heading">
        Breakpoints
      </div>
      <ul
        aria-labelledby="foundation-breakpoint-heading"
        style={{
          margin: '0 0 var(--space-8)',
          paddingLeft: 'var(--space-3)',
          color: 'var(--color-muted-foreground)',
          lineHeight: 'var(--leading-relaxed)',
        }}
      >
        {FOUNDATION_BREAKPOINT_ROWS.map((row) => (
          <li key={row.token}>
            <TokenName name={row.token} /> · {row.label}
          </li>
        ))}
      </ul>

      <div style={SECTION_LABEL_STYLE} id="foundation-size-heading">
        Content widths
      </div>
      <ul
        aria-labelledby="foundation-size-heading"
        style={{
          margin: 0,
          paddingLeft: 'var(--space-3)',
          color: 'var(--color-muted-foreground)',
          lineHeight: 'var(--leading-relaxed)',
        }}
      >
        {FOUNDATION_SIZE_TOKENS.map((name) => (
          <li key={name}>
            <TokenName name={name} />
          </li>
        ))}
      </ul>
    </div>
  )
}

/**
 * Live token/layout samples for foundation slugs. Lives in features/foundations so
 * features/documentation never imports this folder.
 */
export function FoundationPreview({ slug }: ComponentDocPreviewProps): JSX.Element | null {
  switch (slug) {
    case 'tokens':
      return <TokensPreview />
    case 'layout':
      return <LayoutPreview />
    default:
      return null
  }
}
