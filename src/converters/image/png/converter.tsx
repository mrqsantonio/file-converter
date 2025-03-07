import { Converter, Conversion, Type } from '../../Type'
import { basicConverter } from '../common'

const conversions: Conversion[] = [
	{
		type: Type.JPG,
		dataURL: 'image/jpeg',
		extension: 'jpg'
	},
	{
		type: Type.WEBP,
		dataURL: 'image/webp',
		extension: 'webp'
	},
	{
		type: Type.BMP,
		dataURL: 'image/bmp',
		extension: 'bmp'
	}
]

function getConversion(type: Type): Conversion | undefined {
	return conversions.find((conversion) => {
		// console.log(`Evaluating conversions => type: ${Type[type]} == conversion.type: ${conversion.type}: ${Type[type] as unknown == conversion.type}`)
		return Type[type] as unknown == conversion.type
	})
}

// TODO: Find the file type based on file headers
function isType(file: File): Boolean {
    return file.name.endsWith(".png")
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

const pngConverter: Converter = {
    originalType: Type.PNG,
    isType,
    getConverters,
    convert
}

export default pngConverter
