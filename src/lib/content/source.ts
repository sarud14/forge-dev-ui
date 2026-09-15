import { readdir, readFile } from 'node:fs/promises'
import path from 'node:path'
import type { ComponentDoc, ComponentDocMeta, DecisionDocMeta, PatternDocMeta } from '@/types/content.types'
import { isSafeContentSlug, parseComponentDocMeta } from '@/validators/content.validators'
import { parseFrontmatter } from './parseFrontmatter'

const COMPONENTS_DIR = path.join(process.cwd(), 'content', 'components')

async function readComponentDocs(): Promise<readonly ComponentDoc[]> {
  let names: readonly string[]
  try {
    names = await readdir(COMPONENTS_DIR)
  } catch {
    return []
  }

  const docs: ComponentDoc[] = []
  for (const name of names) {
    if (!name.endsWith('.mdx')) {
      continue
    }

    const raw = await readFile(path.join(COMPONENTS_DIR, name), 'utf8')
    const parsed = parseFrontmatter(raw)
    const meta = parseComponentDocMeta(parsed.data)
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
  const docs = await readComponentDocs()
  return docs.map(({ slug, title, summary, order }) => ({ slug, title, summary, order }))
}

export function componentDocHref(slug: string): string {
  return `/components/${slug}`
}

export async function getComponentDoc(slug: string): Promise<ComponentDoc | null> {
  if (!isSafeContentSlug(slug)) {
    return null
  }

  const docs = await readComponentDocs()
  return docs.find((doc) => doc.slug === slug) ?? null
}

export async function getPatternDocs(): Promise<readonly PatternDocMeta[]> {
  return []
}

export async function getDecisionDocs(): Promise<readonly DecisionDocMeta[]> {
  return []
}
