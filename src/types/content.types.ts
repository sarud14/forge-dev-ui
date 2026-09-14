/**
 * Content frontmatter shapes for MDX docs under content/ — see
 * docs/ARCHITECTURE.md "Data & derivations" and requirement/forge-requirements.md §4.
 */
export interface ComponentDocMeta {
  readonly slug: string
  readonly title: string
  readonly summary: string
}

export interface PatternDocMeta {
  readonly slug: string
  readonly title: string
  readonly summary: string
}

export interface DecisionDocMeta {
  readonly slug: string
  readonly title: string
  readonly summary: string
}
