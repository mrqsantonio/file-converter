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
		type: Type.BMP,
		dataURL: 'image/bmp',
		extension: 'bmp'
	}
]

function getConversion(type: Type): Conversion | undefined {
	return conversions.find((conversion) => {return Type[type] as unknown == conversion.type })
}

function isType(file: File): Boolean {
    return file.name.endsWith(".webp")
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

const webpConverter: Converter = {
    originalType: Type.WEBP,
    isType,
    getConverters,
    convert
}

export default webpConverter
