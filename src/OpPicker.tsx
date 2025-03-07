import { useState, useEffect } from "react"
import { Converter, Type } from "./converters/Type"
import bmpConverter from "./converters/image/bmp/converter"
import jpgConverter from "./converters/image/jpg/converter"
import pngConverter from "./converters/image/png/converter"
import webpConverter from "./converters/image/webp/converter"

type OpPickerProps = {
    file: File,
    removeFile: () => void 
}

export default function OpPicker({file, removeFile}: OpPickerProps) {

    const converters: Converter[] = [ bmpConverter, jpgConverter, pngConverter, webpConverter ]

    const [conversions, setConversions] = useState<Type[]>([])
    const [selectedConversion, setSelectedConversion] = useState<string>()
    const [converter, setConverter] = useState<Converter>()

    useEffect(() => {
        if (file) {
            const converter = converters.find((converter) => { return converter.isType(file) })
            if (converter) {
                console.log(`Setting conversions list for ${Type[converter.originalType]}`)
                setConverter(converter)
                setConversions(converter.getConverters())
            }
        }
    }, [file])

    function onConvert() {
        const type: Type = Type[selectedConversion as keyof typeof Type]
        if (converter) {
            converter.convert(file, type)
        }
    }

    return (
        <div className="mt-6">
            <h2 className="text-xl font-semibold">Available Conversions</h2>
            <select 
                className="mt-2 p-2 border rounded w-full" 
                value={selectedConversion}
                onChange={(e) => {console.log(e.target.value); setSelectedConversion(e.target.value)}}
            >
                <option value="">Select a conversion</option>
                {conversions.map((conversion, index) => (
                    <option key={index} value={conversion}>{Type[conversion]}</option>
                ))}
            </select>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={onConvert}>Convert</button>
            <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={removeFile}>Return</button>
        </div>
    )
}
