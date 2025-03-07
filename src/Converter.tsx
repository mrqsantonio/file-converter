import { useState, useEffect } from "react"

enum Type {
  PNG = "PNG",
  JPG = "JPG",
  GIF = "GIF",
  PDF = "PDF"
}

type ConverterProps = {
    file: File,
    removeFile: () => void 
}

export default function Converter({file, removeFile}: ConverterProps) {

    const [conversions, setConversions] = useState<Type[]>([])
    const [selectedConversion, setSelectedConversion] = useState<string>("")

    useEffect(() => {
        if (file) {
        const type = getFileType(file)
        setConversions(getConversions(type))
    }
    }, [file])

    function getFileType(file: File): Type {
        return Type.PNG
    }

    function getConversions(type: Type): Type[] {
        return [Type.JPG]
    }

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold">Available Conversions</h2>
            <select 
                className="mt-2 p-2 border rounded w-full" 
                value={selectedConversion} 
                onChange={(e) => setSelectedConversion(e.target.value)}
            >
                <option value="">Select a conversion</option>
                {conversions.map((conversion, index) => (
                    <option key={index} value={conversion}>{conversion.toString()}</option>
                ))}
            </select>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Convert</button>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={removeFile}>Return</button>
        </div>
    )
}