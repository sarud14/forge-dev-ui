import { describe, expect, it } from 'vitest'
import { EMAIL_INVALID_MESSAGE, emailFormSchema } from './email.validators'

describe('emailFormSchema', () => {
  it('accepts a well-formed email', () => {
    expect(emailFormSchema.parse({ email: 'you@example.com' })).toEqual({
      email: 'you@example.com',
    })
  })

  it('rejects an invalid email with the shared message', () => {
    const result = emailFormSchema.safeParse({ email: 'not-an-email' })

    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0]?.message).toBe(EMAIL_INVALID_MESSAGE)
    }
  })
})
