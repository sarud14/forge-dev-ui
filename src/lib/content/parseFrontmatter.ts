export interface ParsedFrontmatter {
  readonly data: Readonly<Record<string, string>>
  readonly body: string
}

/**
 * Minimal YAML-like frontmatter parser so Phase 1 does not take a gray-matter dependency
 * (AGENTS.md "Ask First" on new packages). Keys are `key: value` lines; values may be quoted.
 * Nested YAML is out of scope.
 */
export function parseFrontmatter(raw: string): ParsedFrontmatter {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw)
  if (match === null || match[1] === undefined || match[2] === undefined) {
    return { data: {}, body: raw.trim() }
  }

  const data: Record<string, string> = {}
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(':')
    if (separator === -1) {
      continue
    }

    const key = line.slice(0, separator).trim()
    if (key === '') {
      continue
    }

    const value = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, '')
    data[key] = value
  }

  return { data, body: match[2].trim() }
}
