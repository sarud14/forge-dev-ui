import type { ComponentDocMeta, PatternDocMeta, DecisionDocMeta } from '@/types/content.types'

/**
 * Single content-read abstraction — every route/component reads through here,
 * never by importing filesystem/MDX loading directly (AGENTS.md "Content / Data Layer",
 * requirement/forge-requirements.md §4).
 *
 * Phase 1 stub: returns an empty list until content/components/*.mdx exists and a real
 * MDX loader (e.g. gray-matter + fs, or contentlayer-style codegen) is wired in during
 * Build Order step 6 (Foundations documentation).
 */
export async function getComponentDocs(): Promise<readonly ComponentDocMeta[]> {
  return []
}

export async function getComponentDoc(_slug: string): Promise<ComponentDocMeta | null> {
  return null
}

export async function getPatternDocs(): Promise<readonly PatternDocMeta[]> {
  return []
}

export async function getDecisionDocs(): Promise<readonly DecisionDocMeta[]> {
  return []
}
