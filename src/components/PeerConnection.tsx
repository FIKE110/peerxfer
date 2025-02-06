import { ArrowRight, QrCode, User } from "lucide-react"
import { useContext, useState} from "react"
import { ConnectToPeerScreenContext, ConnectToPeerScreenContextType } from "../pages/ConnectToPeerScreen"
import { AppContext, AppContextType } from "../App"

export function PeerConnection() {
    const {isModalOpen,setIsModalOpen}=useContext<ConnectToPeerScreenContextType | null>(ConnectToPeerScreenContext) as ConnectToPeerScreenContextType
    const [inputPeerId,setInputPeerId]=useState("")
    const {connectToPeer}=useContext<AppContextType | null>(AppContext) as AppContextType

  return (
    <div className="w-full p-6 bg-white rounded-xl shadow-md">
      <div className="space-y-6">
        <div className="relative">
          <div className="mt-1 relative rounded-md shadow-sm flex">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              type="text"
              name="peerId"
              id="peerId"
              value={inputPeerId}
              className="focus:ring-indigo-500 p-4 focus:border-indigo-500 block w-full pl-10 focus:outline-1 pr-12 sm:text-sm border-gray-300 rounded-md"
              placeholder="Enter Peer ID"
              onChange={(e)=>setInputPeerId(e.target.value)}
            />
             <button
              type="button"
              onClick={()=>{
                connectToPeer(inputPeerId)
              }}
              className="-ml-px relative inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 text-sm font-medium rounded-r-md text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none "
            >
              <ArrowRight className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <span>Connect</span>
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-white text-sm text-gray-500">OR</span>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={()=>{
                setIsModalOpen(true)
                console.log(isModalOpen)
            }}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <QrCode className="h-5 w-5 mr-2" aria-hidden="true" />
            Scan QR
          </button>
        </div>
      </div>
    </div>
  )
}

