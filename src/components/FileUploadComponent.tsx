import { useState, useRef} from "react"
import { Upload, Check, X } from "lucide-react"


interface FileUploadProps {
  onFileSelect: (file: File) => void
}

export default function FileUpload({ onFileSelect }: FileUploadProps) {
  const [fileName, setFileName] = useState<string | null>(null)
  const [file,setFile]=useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    console.log(file?.type)
    if (file) {
      setFileName(file.name)
      //onFileSelect(file)
      setFile(file)
    }
  }

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="mt-6  flex items-center justify-center flex-col">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
      <div className="flex items-center space-x-3">
      <button
        onClick={handleButtonClick}
        className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-6 rounded-lg flex items-center transition duration-300"
      >
        <Upload className="mr-2" size={24} />
        Select File
      </button>
      {fileName && <div className="flex items-center justify-center space-x-3">
        <button className="p-2 bg-gray-100 shadow-md rounded-md" onClick={()=>{
           if(file) onFileSelect(file)
            if(fileInputRef.current) fileInputRef.current.value=''
           setFileName("")
           setFile(null)
        }}>
            <Check color="green"/>
        </button>
        <button className="p-2 bg-gray-100 shadow-md rounded-md" onClick={()=>{
           if(fileInputRef.current) fileInputRef.current.value=''
           setFileName("")
           setFile(null)
        }}>
            <X color="red"/>
        </button>
      </div>}
      </div>      
      {fileName && <p className="mt-2 text-sm text-gray-600">Selected file: {fileName}</p>}
    </div>
  )
}

