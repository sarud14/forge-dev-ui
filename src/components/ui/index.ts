// Barrel — always import from here (`@/components/ui`), never a component's own file path.
export { Button } from './core/Button'
export { Input } from './forms/Input'
export { Dialog } from './feedback/Dialog'
export { Toast } from './feedback/Toast'
export { Toaster } from './feedback/Toaster'
export { toast, clearToasts, DEFAULT_TOAST_DURATION_MS } from './feedback/toastStore'

export type {
  Size,
  Tone,
  ButtonVariant,
  ButtonProps,
  InputSize,
  InputTone,
  InputProps,
  DialogProps,
  ToastTone,
  ToastInput,
  ToastRecord,
} from './types'
