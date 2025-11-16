import { useState } from "react"

export type SecretInputProps = {
    placeholder?: string,
    value?: string,
    onChange?: (value: string) => void,
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

export function SecretInput({value, onChange, placeholder, onKeyDown}: SecretInputProps) {

    const [showSecret, setShowSecret] = useState<boolean>(false)

    return (
        <div className="flex flex-row w-[80%] mx-auto">
            <input
                className="w-[80%] mb-2 p-2 border rounded"
                placeholder={placeholder}
                type={showSecret ? 'text' : 'password'}
                value={value}
                onChange={e => onChange !== undefined ? onChange(e.target.value): ''}
                onKeyDown={onKeyDown}
            ></input>
            <button
                className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                type="button"
                onClick={() => setShowSecret(!showSecret)}
            >
                {showSecret ? '🙈' : '👁️'}
            </button>
        </div>
    )
}