import type { Metadata } from 'next'
import type { JSX } from 'react'

export const metadata: Metadata = { title: 'Testing' }

export default function TestingPage(): JSX.Element {
  return (
    <section>
      <h1>Testing</h1>
      <p>Vitest + Testing Library for unit/component, Playwright + axe-core for E2E and a11y.</p>
    </section>
  )
}
