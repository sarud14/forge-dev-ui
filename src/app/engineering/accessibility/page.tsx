import type { Metadata } from 'next'
import type { JSX } from 'react'

export const metadata: Metadata = { title: 'Accessibility' }

export default function AccessibilityPage(): JSX.Element {
  return (
    <section>
      <h1>Accessibility</h1>
      <p>See docs/DESIGN_SYSTEM.md &quot;Accessibility contract&quot; for current guarantees.</p>
    </section>
  )
}
