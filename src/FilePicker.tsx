type FilePickerProps = {
    setFile: React.Dispatch<React.SetStateAction<File | null>>
}

export default function FilePicker({setFile}: FilePickerProps) {

    const onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null
        if (selectedFile) {
            setFile(selectedFile)
        }
    }

    return (
        <label className="border-dashed border-4 border-gray-300 p-10 text-center rounded-lg bg-white cursor-pointer block">
            {/* Drop Zone */}
            <p className="text-lg">Drag & Drop your file here or <span className="text-blue-500">click to upload</span></p>
            <input type="file" className="hidden" onChange={onFileChange} />

            {/* Security Disclaimer */}
            <div className="mt-10 p-4 bg-gray-200 rounded">
                <h2 className="text-lg font-semibold">Security Disclaimer</h2>
                <p className="text-sm">All file processing happens offline. No files are uploaded or stored online.</p>
            </div>
        </label>
    )
}
