import type { JSX } from 'react'
import type { ComponentDocPreviewProps } from '@/types/content.types'
import { ButtonDoc } from './ButtonDoc'
import { DataTableDoc } from './DataTableDoc'
import { DialogDoc } from './DialogDoc'
import { InputDoc } from './InputDoc'
import { SelectDoc } from './SelectDoc'
import { TabsDoc } from './TabsDoc'
import { ToastDoc } from './ToastDoc'
import { TooltipDoc } from './TooltipDoc'

/**
 * Maps a content slug to the live Preview/Code/A11y demo. Kept in features/components
 * so lib/content never imports from features (AGENTS.md layering).
 */
export function ComponentDocPreview({ slug }: ComponentDocPreviewProps): JSX.Element | null {
  switch (slug) {
    case 'button':
      return <ButtonDoc />
    case 'input':
      return <InputDoc />
    case 'select':
      return <SelectDoc />
    case 'tabs':
      return <TabsDoc />
    case 'tooltip':
      return <TooltipDoc />
    case 'dialog':
      return <DialogDoc />
    case 'toast':
      return <ToastDoc />
    case 'data-table':
      return <DataTableDoc />
    default:
      return null
  }
}
