/* Libraries */
import { useState } from "react"

/* Views */
import { SecretInput } from "./SecretInput"
import { SecretOutput } from "./SecretOutput"

/* Local libraries */
import { decryptData } from "../crypters/message/crypter"
import { mnemonicToBytes } from "../crypters/message/menomoniquer"

export function MessageDecrypter() {

    const [mnemonics, setMnemonics] = useState<string>("")
    const [passphrase, setPassphrase] = useState<string>("")
    const [message, setMessage] = useState<string>("")

    function clear() {
        setMnemonics("")
        setPassphrase("")
        setMessage("")
    }

    async function decrypt() {
        if (passphrase == null) {
            alert("No password provided.")
            return
        }
        if (mnemonics == null) {
            alert("No mnemonics provided.")
            return
        }
        try {
            const chunkBytes = mnemonicToBytes(mnemonics.split(" "))
            const decrypted = await decryptData(chunkBytes, passphrase)
            const decoder = new TextDecoder()
            setMessage(decoder.decode(decrypted))
        } catch (e) {
            alert('Decryption failed')
        }
    }
    return (
        <div className="flex-column justify-center w-full">
            <h1 className="text-3xl font-bold text-center mb-6">Decrypter</h1>
            <div className="flex flex-column justify-center">
                <textarea
                    className="w-[80%] bg-transparent text-white rounded p-2 resize-y focus:outline-none focus:ring-2 focus:ring-blue-500 whitespace-pre-wrap"
                    value={mnemonics}
                    placeholder="Type here..."
                    onChange={e => setMnemonics(e.target.value.replace(/\n/g, " "))}
                ></textarea>
            </div>
            <SecretInput placeholder="Passphrase" value={passphrase} onChange={setPassphrase} />
            <div className="flex flex-row">
            <button
                className="w-[50%] bg-blue-600 hover:bg-blue-700 text-white rounded py-2 mt-2"
                onClick={decrypt}
            >
                Decrypt
            </button>
            <button
                className="w-[50%] bg-blue-600 hover:bg-blue-700 text-white rounded py-2 mt-2"
                onClick={clear}
            >
                Clear
            </button>
            </div>
            <SecretOutput value={message}/>
        </div>
    )
}