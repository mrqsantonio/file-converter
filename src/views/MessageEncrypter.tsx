/* Libraries */
import { useState } from "react"

/* Views */
import { SecretInput } from "./SecretInput"

/* Local  modules */
import { rules } from "../crypters/message/passphrase"
import { encryptData } from "../crypters/message/crypter"
import { bytesToMnemonic } from "../crypters/message/menomoniquer"

export function MessageEncrypter() {

    const [message, setMessage] = useState<string>("")
    const [passphrase, setPassphrase] = useState<string>("")
    const [confirmPassphrase, setConfirmPassphrase] = useState<string>("")
    const [error, setError] = useState<string>("")

    const [mnemonics, setMnemonics] = useState<string[] | null>(null)

    async function encrypt() {
        const violation = rules.find((r) => r.enforce(passphrase, confirmPassphrase) == false)?.violation
        if (violation !== undefined) {
            setError(violation)
            return
        }
        setError("")

        const encoder = new TextEncoder()
        const data = encoder.encode(message)
        const encrypted = await encryptData(data, passphrase)
        const mnemonics = bytesToMnemonic(encrypted)
        setMnemonics(mnemonics)
    }

    return (
        <div className="flex-col place-content-center gap-4">
            <h1 className="text-2xl font-bold mb-4">Encrypter</h1>
            <SecretInput placeholder="Message" value={message} onChange={setMessage} />
            <SecretInput placeholder="Passphrase" value={passphrase} onChange={setPassphrase} />
            <SecretInput placeholder="Confirm passphrase" value={confirmPassphrase} onChange={setConfirmPassphrase}/>

            <div className="mt-2 text-red-500 font-medium text-sm text-center">
                {error}
            </div>            

            <button
                className="w-[50%] bg-blue-600 hover:bg-blue-700 text-white rounded py-2 mt-2"
                onClick={encrypt}
            >
                Encrypt
            </button>

            <div className="grid grid-cols-4">
                {mnemonics?.map((word, i) => (
                    <div key={i} className="px-2 py-1 bg-white/80 dark:bg-neutral-800 rounded-xl shadow-sm text-sm font-medium text-center select-text">
                        {word}
                    </div>
                ))}
            </div>
        </div>
    )
}