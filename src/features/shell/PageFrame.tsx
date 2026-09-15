import type { JSX } from 'react'
import { PAGE_FRAME_DOC_CLASS, PAGE_FRAME_WIDE_CLASS } from '@/components/ui'
import type { PageFrameProps } from '@/types/shell.types'

export function PageFrame({ children, width }: PageFrameProps): JSX.Element {
  const className = width === 'wide' ? PAGE_FRAME_WIDE_CLASS : PAGE_FRAME_DOC_CLASS
  return <div className={className}>{children}</div>
}
