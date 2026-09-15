import type { ReactNode } from 'react'

export interface AppShellProps {
  readonly children: ReactNode
}

export interface PageFrameProps {
  readonly children: ReactNode
  readonly width: 'doc' | 'wide'
}

export interface NavLinksProps {
  readonly onNavigate?: () => void
}
