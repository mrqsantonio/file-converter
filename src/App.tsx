import "./App.css"

import { useState } from "react"
import FilePicker from "./FilePicker"
import OpPicker from "./OpPicker"
import { CryptMode } from "./crypters/CryptMode"
import MessageCrypter from "./MessageCrypter"


export default function App() {
  const [file, setFile] = useState<File | null>(null)

  const [cryptMode, setCryptMode] = useState<CryptMode>(CryptMode.ENCRYPT);

  function removeFile() {
    setFile(null)
  }

  return (
      <div className="container mx-auto p-6">
        <div>
            <h1 className="text-3xl font-bold text-center mb-6">File Converter 2</h1>
            {
              file == null ?
              <FilePicker setFile={setFile}/>
              :
              <OpPicker file={file} removeFile={removeFile}/>
            }
        </div>
        <h1>-- OR --</h1>
        <MessageCrypter />
      </div>
  )
}
