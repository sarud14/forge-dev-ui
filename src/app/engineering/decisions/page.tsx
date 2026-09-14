import type { Metadata } from 'next'
import type { JSX } from 'react'

export const metadata: Metadata = { title: 'Decisions' }

export default function DecisionsPage(): JSX.Element {
  return (
    <section>
      <h1>Decisions</h1>
      <p>Architecture decisions and rationale — see requirement/forge-requirements.md §3.</p>
    </section>
  )
}
