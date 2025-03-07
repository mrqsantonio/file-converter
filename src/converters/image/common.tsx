import { Conversion } from "../Type"

export function basicConverter(file: File, conversion: Conversion) {
    const reader = new FileReader()
    reader.onload = () => {
        const img = new Image()
        img.src = reader.result as string

        img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            if (ctx) {
                canvas.width = img.width
                canvas.height = img.height

                ctx.drawImage(img, 0, 0)

                canvas.toBlob((blob) => {
                    if (blob) {
                    const url = URL.createObjectURL(blob)

                    const link = document.createElement('a')
                    link.href = url
                    link.download = `${file.name.replace(/\.[^/.]+$/, '')}.${conversion.extension}`
                    link.click()

                    URL.revokeObjectURL(url)
                    }
                }, conversion.dataURL)
            }
        }
    }
    reader.readAsDataURL(file)
}
