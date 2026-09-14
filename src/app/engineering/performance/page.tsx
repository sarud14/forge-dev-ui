import type { Metadata } from 'next'
import type { JSX } from 'react'

export const metadata: Metadata = { title: 'Performance' }

export default function PerformancePage(): JSX.Element {
  return (
    <section>
      <h1>Performance</h1>
      <p>Bundle size tracking and Web Vitals reporting are Phase 4 (see requirement doc §9).</p>
    </section>
  )
}
