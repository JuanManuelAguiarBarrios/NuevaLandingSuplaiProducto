const HYPHEN = /-/g
const NON_BREAKING_HYPHEN = '‑'

/** Evita que un código como AND-1042 se parta en dos líneas por el guion. */
export function keepCodesTogether(text: string): string {
  return text.replace(HYPHEN, NON_BREAKING_HYPHEN)
}
