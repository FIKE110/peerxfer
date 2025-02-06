import type React from "react"
import { Dispatch} from "react"
import { X } from "lucide-react"
import QRCodeScanner from "./QrScaner"

interface FullScreenModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export const FullScreenModal: React.FC<FullScreenModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white w-full h-full overflow-auto p-6 relative flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        <div className="mt-8 flex-grow">{children}</div>
        <div className="mt-2 flex justify-center">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export const QRCodeScannerModal: React.FC<{
  isModalOpen:boolean,
  setIsModalOpen:Dispatch<React.SetStateAction<boolean>>
}> = ({isModalOpen,setIsModalOpen}) => {

  return (
      <FullScreenModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <QRCodeScanner setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}/>
      </FullScreenModal>
  )
}

