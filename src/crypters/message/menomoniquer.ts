import wordlistRaw from './wordlist.txt?raw'

export const wordlist: string[] = wordlistRaw.split('\n').map(w => w.trim()).filter(Boolean)

export function bytesToMnemonic(bytes: Uint8Array): string {
  let bits = ''
  for (const b of bytes) {
    bits += b.toString(2).padStart(8, '0')
  }

  // split into 11-bit chunks
  const chunks: number[] = []
  for (let i = 0; i < bits.length; i += 11) {
    const chunk = bits.slice(i, i + 11).padEnd(11, '0') // pad last chunk
    chunks.push(parseInt(chunk, 2))
  }

  // map to words
  return chunks.map(i => wordlist[i % wordlist.length]).join(' ')
}

export function mnemonicToBytes(mnemonic: string): Uint8Array {
  const words = mnemonic.trim().split(/\s+/)
  let bits = ''

  for (const word of words) {
    const index = wordlist.indexOf(word)
    if (index === -1) throw new Error(`Unknown word: ${word}`)
    bits += index.toString(2).padStart(11, '0')
  }

  // Convert bits → bytes
  const bytes: number[] = []
  for (let i = 0; i < bits.length; i += 8) {
    const byteBits = bits.slice(i, i + 8)
    if (byteBits.length === 8) {
      bytes.push(parseInt(byteBits, 2))
    }
  }

  return new Uint8Array(bytes)
}
