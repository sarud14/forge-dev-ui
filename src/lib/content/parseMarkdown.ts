export type MarkdownBlock =
  | { readonly type: 'heading'; readonly text: string }
  | { readonly type: 'paragraph'; readonly text: string }
  | { readonly type: 'list'; readonly items: readonly string[] }

/**
 * Phase 1 markdown subset: `##` headings, `- ` lists, and paragraphs.
 * Full MDX/JSX is deferred until a compiler is an approved dependency.
 */
export function parseMarkdownBlocks(body: string): readonly MarkdownBlock[] {
  const blocks: MarkdownBlock[] = []
  const chunks = body.split(/\n{2,}/)

  for (const chunk of chunks) {
    const trimmed = chunk.trim()
    if (trimmed === '') {
      continue
    }

    if (trimmed.startsWith('## ')) {
      blocks.push({ type: 'heading', text: trimmed.slice(3).trim() })
      continue
    }

    const listLines = trimmed.split('\n')
    if (listLines.every((line) => line.startsWith('- '))) {
      blocks.push({
        type: 'list',
        items: listLines.map((line) => line.slice(2).trim()),
      })
      continue
    }

    blocks.push({ type: 'paragraph', text: trimmed.replace(/\n/g, ' ') })
  }

  return blocks
}
