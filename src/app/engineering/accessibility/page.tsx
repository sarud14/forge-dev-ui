import type { Metadata } from 'next'
import type { JSX } from 'react'
import { EngineeringSectionPage, engineeringSectionMetadata } from '../engineeringSection'

const SLUG = 'accessibility'

export async function generateMetadata(): Promise<Metadata> {
  return engineeringSectionMetadata(SLUG)
}

export default async function AccessibilityPage(): Promise<JSX.Element> {
  return <EngineeringSectionPage slug={SLUG} />
}
