/**
 * Content frontmatter shapes for MDX docs under content/ — see
 * docs/ARCHITECTURE.md "Data & derivations" and requirement/forge-requirements.md §4.
 */
export interface ContentDocMeta {
  readonly slug: string
  readonly title: string
  readonly summary: string
  readonly order: number
}

export type ComponentDocMeta = ContentDocMeta

export type PatternDocMeta = ContentDocMeta

export interface ComponentDoc extends ContentDocMeta {
  readonly body: string
}

export interface PatternDoc extends ContentDocMeta {
  readonly body: string
}

export type EngineeringDocMeta = ContentDocMeta

export interface EngineeringDoc extends ContentDocMeta {
  readonly body: string
}

export type FoundationDocMeta = ContentDocMeta

export interface FoundationDoc extends ContentDocMeta {
  readonly body: string
}

export interface DecisionDocMeta {
  readonly slug: string
  readonly title: string
  readonly summary: string
}

export interface MarkdownBodyProps {
  readonly source: string
}

export interface ComponentDocPreviewProps {
  readonly slug: string
}

export interface ContentSlugPageProps {
  readonly params: Promise<{ readonly slug: string }>
}

export interface EngineeringSectionPageProps {
  readonly slug: string
}
