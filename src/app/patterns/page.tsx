import type { Metadata } from 'next'
import type { JSX } from 'react'

export const metadata: Metadata = { title: 'Patterns' }

export default function PatternsPage(): JSX.Element {
  return (
    <section>
      <h1>Patterns</h1>
      <p>Form, Search, Data Table, Empty State, Loading State, Error State, Confirmation.</p>
    </section>
  )
}
