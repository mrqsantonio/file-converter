import { Converter, Conversion, Type } from '../../Type'
import { basicConverter } from '../common'

const conversions: Conversion[] = [
	{
		type: Type.PNG,
		dataURL: 'image/png',
		extension: 'png'
	},
	{
		type: Type.JPG,
		dataURL: 'image/jpeg',
		extension: 'jpg'
	},
	{
		type: Type.WEBP,
		dataURL: 'image/webp',
		extension: 'webp'
	}
]

function getConversion(type: Type): Conversion | undefined {
	return conversions.find((conversion) => { return Type[type] as unknown == conversion.type })
}

function isType(file: File): Boolean {
    return file.name.endsWith(".bmp")
}

function getConverters(): Type[] {
    return conversions.map((conversion) => { return conversion.type})
}

function convert(file: File, type: Type) {
	const conversion = getConversion(type)
	if (conversion) {
		basicConverter(file, conversion)
		return true
	}
	console.error(`Unable to convert to: ${type}`)
	return false
}

const bmpConverter: Converter = {
    originalType: Type.BMP,
    isType,
    getConverters,
    convert
}

export default bmpConverter
