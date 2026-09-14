import type { Metadata } from 'next'
import type { JSX } from 'react'

export const metadata: Metadata = { title: 'Engineering' }

export default function EngineeringPage(): JSX.Element {
  return (
    <section>
      <h1>Engineering</h1>
      <ul>
        <li>
          <a href="/engineering/accessibility">Accessibility</a>
        </li>
        <li>
          <a href="/engineering/performance">Performance</a>
        </li>
        <li>
          <a href="/engineering/testing">Testing</a>
        </li>
        <li>
          <a href="/engineering/decisions">Decisions</a>
        </li>
      </ul>
    </section>
  )
}
