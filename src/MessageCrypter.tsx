
import { useState } from "react"
import { encryptChunk, decryptChunk } from "./crypters/message/crypter"
import { bytesToMnemonic, mnemonicToBytes, wordlist } from "./crypters/message/menomoniquer"
import { autocorrectWord } from "./crypters/message/corretor"


function Encrypter() {

    const [message, setMessage] = useState<string>("")
    const [mnemonics, setMnemonics] = useState<string[] | null>(null)

    async function encrypt() {
        const passphrase = prompt("Enter passphrase:")
        if (passphrase == null) {
            alert("No password provided.")
            return
        }

        const encoder = new TextEncoder()
        const data = encoder.encode(message)
        const encrypted = await encryptChunk(data, passphrase)
        setMnemonics(bytesToMnemonic(encrypted).split(" "))
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-6">Encrypter</h1>
            <input
                placeholder="Message"
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyDown={e => e.key == 'Enter' ? encrypt() : null}
            ></input>
            <div onClick={encrypt}>Encrypt</div>

            <div className="grid grid-cols-[repeat(auto-fit,minmax(90px,1fr))] gap-2 mt-4">
                {
                mnemonics == null ? 
                    <></>
                : 
                    mnemonics.map((word, i) => {
                        return(
                            <div key={i} className="px-2 py-1 bg-white/80 dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-300 dark:border-neutral-700 text-sm font-medium text-neutral-700 dark:text-neutral-200 text-center select-text">
                                {word}
                            </div>
                        )  
                    })
                }
            </div>
        </div>
    )
}

function Decrypter() {

    const FORMATTER = "_"

    const [currentMnemonic, setCurrentMnemonic] = useState<string>("")
    const [mnemonics, setMnemonics] = useState<string[]>([])
    const [message, setMessage] = useState<string>("")

    function addMnemonic(key: string) {
        if(key === 'Enter' || key === ' ') {
            const formattedMnemonics = currentMnemonic.split(" ").map(mnemonic => {
                    const closestMnemonic = autocorrectWord(mnemonic, wordlist)
                    return mnemonic != closestMnemonic ?
                    `${FORMATTER}${closestMnemonic}${FORMATTER}` : closestMnemonic
            })
            setMnemonics(mnemonics.concat(formattedMnemonics))
            setCurrentMnemonic("")
        }
    }

    function updateMnemonic(e: React.ChangeEvent<HTMLInputElement>, index: number) {
        const value = e.target.value

        setMnemonics([
            ...mnemonics.slice(0, index),
            value,
            ...mnemonics.slice(index + 1)
        ])
    }

    async function decrypt() {
        const passphrase = prompt("Enter passphrase:")
        if (passphrase == null) {
            alert("No password provided.")
            return
        }
        if (mnemonics == null) {
            alert("No mnemonics provided.")
            return
        }
        try {
            const correctedMnemonics = mnemonics.map(w => autocorrectWord(w.replace(FORMATTER, ""), wordlist)).join(' ')
            const chunkBytes = mnemonicToBytes(correctedMnemonics)
            const decrypted = await decryptChunk(chunkBytes, passphrase)
            const decoder = new TextDecoder()
            setMessage(decoder.decode(decrypted))
        } catch (e) {
            alert('Decryption failed')
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-6">Message Crypter</h1>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(90px,1fr))] gap-2 mt-4">
                {
                    mnemonics.map((word, i) => {
                        return(
                            <input
                                key={i}
                                className="px-2 py-1 bg-white/80 dark:bg-neutral-800 rounded-xl shadow-sm border border-neutral-300 dark:border-neutral-700 text-sm font-medium text-neutral-700 dark:text-neutral-200 text-center select-text"
                                value={word}
                                onChange={(e) => updateMnemonic(e, i)}
                            ></input>
                        )    
                    })
                }
                <input
                    value={currentMnemonic}
                    onChange={e => setCurrentMnemonic(e.target.value)}
                    onKeyDown={e => addMnemonic(e.key)}
                ></input>
            </div>
            <div onClick={decrypt}>Decrypt</div>
            <h2>{message}</h2>
        </div>
    )
}

export default function MessageCrypter() {

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mb-6">Message Crypter</h1>
            <div>
                <Encrypter/>
                <Decrypter/>
            </div>
        </div>
    )
}