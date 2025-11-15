declare module 'fast-levenshtein' {
  interface Levenshtein {
    get(a: string, b: string): number
  }
  const levenshtein: Levenshtein
  export default levenshtein
}