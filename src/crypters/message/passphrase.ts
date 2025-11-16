
export type PassphraseRule = {
    enforce: (passphrase: string, confirmPassphrase: string) => boolean
    violation: string
}

export const rules: PassphraseRule[] = [
    {
        enforce: (p: string, _: string) => {
            return p !== null && p !== undefined && typeof p === "string" && p.length > 0
        },
        violation: "No passphrase was provided."
    },
    {
        enforce: (p: string, _: string) => {
            return p.length >= 8
        },
        violation: "Passphrase must be at least 8 characters long."
    },
    {
        enforce: (p: string, c: string) => {
            return p === c
        },
        violation: "Passphrases don't match."
    }
]