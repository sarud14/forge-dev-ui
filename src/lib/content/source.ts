import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import type {
  ComponentDoc,
  ComponentDocMeta,
  DecisionDocMeta,
  EngineeringDoc,
  EngineeringDocMeta,
  PatternDoc,
  PatternDocMeta,
} from '@/types/content.types'
import { isSafeContentSlug, parseContentDocMeta } from '@/validators/content.validators'
import { parseFrontmatter } from './parseFrontmatter'

const COMPONENTS_DIR = path.join(process.cwd(), 'content', 'components')
const PATTERNS_DIR = path.join(process.cwd(), 'content', 'patterns')
const ENGINEERING_DIR = path.join(process.cwd(), 'content', 'engineering')

async function readOrderedDocs(dir: string): Promise<readonly ComponentDoc[]> {
  let names: readonly string[]
  try {
    names = await readdir(dir)
  } catch {
    return []
  }

  const docs: ComponentDoc[] = []
  for (const name of names) {
    if (!name.endsWith('.mdx')) {
      continue
    }

    const raw = await readFile(path.join(dir, name), 'utf8')
    const parsed = parseFrontmatter(raw)
    const meta = parseContentDocMeta(parsed.data)
    if (meta === null) {
      continue
    }

    docs.push({ ...meta, body: parsed.body })
  }

  return [...docs].sort((left, right) => left.order - right.order)
}

/**
 * Single content-read abstraction — every route/component reads through here,
 * never by importing filesystem/MDX loading directly (AGENTS.md "Content / Data Layer",
 * requirement/forge-requirements.md §4).
 *
 * Frontmatter is parsed locally rather than via gray-matter so Phase 1 does not add a
 * package (AGENTS.md "Ask First"). MDX files currently contain the markdown subset in
 * parseMarkdown.ts — JSX in content is not compiled yet.
 */
export async function getComponentDocs(): Promise<readonly ComponentDocMeta[]> {
  const docs = await readOrderedDocs(COMPONENTS_DIR)
  return docs.map(({ slug, title, summary, order }) => ({ slug, title, summary, order }))
}

export function componentDocHref(slug: string): string {
  return `/components/${slug}`
}

export async function getComponentDoc(slug: string): Promise<ComponentDoc | null> {
  if (!isSafeContentSlug(slug)) {
    return null
  }

  const docs = await readOrderedDocs(COMPONENTS_DIR)
  return docs.find((doc) => doc.slug === slug) ?? null
}

export async function getPatternDocs(): Promise<readonly PatternDocMeta[]> {
  const docs = await readOrderedDocs(PATTERNS_DIR)
  return docs.map(({ slug, title, summary, order }) => ({ slug, title, summary, order }))
}

export function patternDocHref(slug: string): string {
  return `/patterns/${slug}`
}

export async function getPatternDoc(slug: string): Promise<PatternDoc | null> {
  if (!isSafeContentSlug(slug)) {
    return null
  }

  const docs = await readOrderedDocs(PATTERNS_DIR)
  return docs.find((doc) => doc.slug === slug) ?? null
}

export async function getEngineeringDocs(): Promise<readonly EngineeringDocMeta[]> {
  const docs = await readOrderedDocs(ENGINEERING_DIR)
  return docs.map(({ slug, title, summary, order }) => ({ slug, title, summary, order }))
}

export function engineeringDocHref(slug: string): string {
  return `/engineering/${slug}`
}

export async function getEngineeringDoc(slug: string): Promise<EngineeringDoc | null> {
  if (!isSafeContentSlug(slug)) {
    return null
  }

  const docs = await readOrderedDocs(ENGINEERING_DIR)
  return docs.find((doc) => doc.slug === slug) ?? null
}

export async function getDecisionDocs(): Promise<readonly DecisionDocMeta[]> {
  return []
}
