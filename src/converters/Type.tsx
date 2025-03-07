export type Converter = {
    originalType: Type,
    isType: (file: File) => Boolean,
    getConverters: () => Type[],
    convert: (file: File, type: Type) => Boolean
}

export type Conversion = {
    type: Type,
    dataURL: string,
    extension: string
}

export enum Type {
    PNG,
    JPG,
    WEBP,
    BMP
}
