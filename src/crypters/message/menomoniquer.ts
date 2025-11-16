/* Local libraries */
import descriptorsRaw from './descriptors-wl.txt?raw'
import nounsRaw from './nouns-wl.txt?raw'

// 6 characters per byte on average
export const descriptors = descriptorsRaw.split('\n').map(w => w.trim()).filter(Boolean)
export const nouns = nounsRaw.split('\n').map(w => w.trim()).filter(Boolean)

export function bytesToMnemonic(bytes: Uint8Array): string[] {
  if (descriptors.length !== 256) throw new Error('descriptors must have 256 words')
  if (nouns.length !== 256) throw new Error('nouns must have 256 words')

  const result: string[] = []

  let i = 0
  while (i < bytes.length) {
    const b1 = bytes[i]

    if (i + 1 < bytes.length) {
      const b2 = bytes[i + 1]
      const word = `${descriptors[b1]}-${nouns[b2]}`
      result.push(word)
      i += 2
    } else {
      result.push(nouns[b1])
      i += 1
    }
  }

  return result
}

export function mnemonicToBytes(mnemonics: string[]): Uint8Array {
  if (descriptors.length !== 256) throw new Error('descriptors must have 256 words')
  if (nouns.length !== 256) throw new Error('nouns must have 256 words')

  const result: number[] = []

  for (const part of mnemonics) {
    if (part.includes('-')) {
      // composed word: adjective-noun
      const [a, b] = part.split('-')

      const descriptorIndex = descriptors.indexOf(a)
      const nounIndex = nouns.indexOf(b)

      if (descriptorIndex === -1) throw new Error(`Unknown word in listA: ${a}`)
      if (nounIndex === -1) throw new Error(`Unknown word in listB: ${b}`)

      result.push(descriptorIndex)
      result.push(nounIndex)
    } else {
      const nounIndex = nouns.indexOf(part)
      if (nounIndex === -1) throw new Error(`Unknown word in listB: ${part}`)
      result.push(nounIndex)
    }
  }

  return new Uint8Array(result)
}
