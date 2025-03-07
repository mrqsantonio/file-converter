import "./App.css"

import { useState} from "react"
import FilePicker from "./FilePicker"
import Converter from "./Converter"


export default function App() {
  const [file, setFile] = useState<File | null>(null)


  function removeFile() {
    setFile(null)
  }

  return (
      <div className="container mx-auto p-6">
          <h1 className="text-3xl font-bold text-center mb-6">File Converter 2</h1>
          {
            file == null ?
            <FilePicker setFile={setFile}/>
            :
            <Converter file={file} removeFile={removeFile}/> 
          }
      </div>
  )
}
