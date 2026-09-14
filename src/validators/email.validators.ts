import { z } from 'zod'

export const EMAIL_INVALID_MESSAGE = 'Enter a valid email' as const

export const emailFormSchema = z.object({
  email: z.string().email(EMAIL_INVALID_MESSAGE),
})

export type EmailFormValues = z.infer<typeof emailFormSchema>
