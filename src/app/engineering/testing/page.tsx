import type { Metadata } from 'next'
import type { JSX } from 'react'
import { EngineeringSectionPage, engineeringSectionMetadata } from '../engineeringSection'

const SLUG = 'testing'

export async function generateMetadata(): Promise<Metadata> {
  return engineeringSectionMetadata(SLUG)
}

export default async function TestingPage(): Promise<JSX.Element> {
  return <EngineeringSectionPage slug={SLUG} />
}
