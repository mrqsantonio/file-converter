import { wordlists as wl } from 'bip39'
import levenshtein from 'fast-levenshtein'

// This wordlist as an average of 8 characters per word
// Meaning that each 2 bytes require 8 characters to be written
// This should make the mnemonic version of the secret 4x bigger
export const wordlists = wl

export function autocorrectWord(word: string, wordlist: string[]) {
  if (wordlist.includes(word)) return word

  let closest = wordlist[0]
  let minDist = Infinity

  for (const w of wordlist) {
    const dist = levenshtein.get(word, w)
    if (dist < minDist) {
      minDist = dist
      closest = w
      if (dist === 1) break // stop early
    }
  }
  return closest
}