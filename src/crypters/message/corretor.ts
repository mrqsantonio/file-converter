/* Libraries */
import levenshtein from 'fast-levenshtein'

export function measureDistance(wordlist: string[]) {
  return wordlist.map((word) => {
    let closest = "[UNIQUE]"
    let minDist = Infinity
    for (const w of wordlist) {
      if (word === w) continue
      const dist = levenshtein.get(word, w)
      if (dist < minDist) {
        minDist = dist
        closest = w
      }
    }
    return {
      word,
      distance: minDist,
      from: closest
    }
  })
}

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