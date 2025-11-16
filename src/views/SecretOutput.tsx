import { useState } from "react"

export type SecretOutputProps = {
    placeholder?: string,
    value?: string
}

export function SecretOutput({value, placeholder}: SecretOutputProps) {

    const [showSecret, setShowSecret] = useState<boolean>(false)

    return (
        <div className="flex flex-row w-[80%] mx-auto">
            <input
                className="w-[80%] mb-2 p-2 border rounded"
                placeholder={placeholder}
                type={showSecret ? 'text' : 'password'}
                value={value}
                readOnly={true}
            ></input>
            <button
                className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100"
                type="button"
                onClick={() => setShowSecret(!showSecret)}
            >
                {showSecret ? '🙈' : '👁️'}
            </button>
            <button
                className="text-gray-500 hover:text-gray-900 dark:hover:text-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                type="button"
                disabled={value == null || value.length <= 0}
                onClick={() => navigator.clipboard.writeText(value!)}
            >
                📋
            </button>
        </div>
    )
}