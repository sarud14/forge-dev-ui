import type { Metadata } from 'next'
import type { JSX } from 'react'
import { EngineeringSectionPage, engineeringSectionMetadata } from '../engineeringSection'

const SLUG = 'performance'

export async function generateMetadata(): Promise<Metadata> {
  return engineeringSectionMetadata(SLUG)
}

export default async function PerformancePage(): Promise<JSX.Element> {
  return <EngineeringSectionPage slug={SLUG} />
}
