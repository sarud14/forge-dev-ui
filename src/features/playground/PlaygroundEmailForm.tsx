'use client'

import { useState, type JSX } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@/components/ui'
import { emailFormSchema, type EmailFormValues } from '@/validators/email.validators'

/**
 * Playground-only composition demo: Input stays a native primitive; React Hook Form + Zod
 * bind through standard input props (requirement/forge-requirements.md core stack).
 */
export function PlaygroundEmailForm(): JSX.Element {
  const [acceptedEmail, setAcceptedEmail] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: { email: '' },
  })

  function onSubmit(values: EmailFormValues): void {
    setAcceptedEmail(values.email)
  }

  // noValidate: native type="email" constraint validation would block submit before
  // Zod runs — this demo exists to show RHF + Zod composed onto Input.

  return (
    <form
      aria-label="Email validation demo"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}
    >
      <div>
        <label htmlFor="playground-demo-email" style={labelStyle}>
          Email
        </label>
        <Input
          id="playground-demo-email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          {...register('email')}
          errorMessage={errors.email?.message}
        />
      </div>
      <Button type="submit">Validate</Button>
      {acceptedEmail !== null ? (
        <p
          style={{
            margin: 0,
            fontSize: 'var(--text-sm)',
            color: 'var(--color-muted-foreground)',
          }}
        >
          Accepted {acceptedEmail}
        </p>
      ) : null}
    </form>
  )
}

const labelStyle = {
  display: 'block',
  fontSize: 'var(--text-xs)',
  fontWeight: 500,
  color: 'var(--color-muted-foreground)',
  marginBottom: 6,
} as const
