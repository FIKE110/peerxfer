import platform from "platform"
import QRCode from "react-qr-code"
import { AppContext, AppContextType } from "../App"
import { useContext } from "react"
import { PeerState } from "./ConnectedStatusComponent"
import { useLocation } from "react-router-dom"
import { PeerConnection } from "./PeerConnection"
import FileUpload from "./FileUploadComponent"
import { toast } from "sonner"

interface DeviceInfoProps {
  peerState: PeerState
}

export type DataSentType={
  type:'metadata' | 'data',
  filename:string,
  mimeType:string,
  size:number
}

export default function DeviceInfo({ peerState}: DeviceInfoProps) {

  const {peer,connected,peerConnectionRef}=useContext<AppContextType | null>(AppContext) as AppContextType
  const location=useLocation()
  const fileHandle=(file:File)=>{
    const reader = new FileReader();
    reader.onload = function(e) {
      const arrayBuffer=e.target?.result
      peerConnectionRef.current?.send({
        filename:file.name,
        mimeType:file.type,
        type:'metadata',
        size:file.size
    } as DataSentType)
     peerConnectionRef.current?.send(arrayBuffer) 
     toast.success("File Sucessfully send to peer")
    }

    reader.readAsArrayBuffer(file)
  }

  return (
    <div className="mt-2 bg-gray-50 p-4 rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Device Information</h2>
      <p>
        <span className="font-medium">Peer ID :</span> {peer ? peer?.id : "No peer currently created"}
      </p>
      <p>
        <span className="font-medium">Platform Os :</span> {platform.os?.toString()}
      </p>
      <p>
        <span className="font-medium">Browser :</span> {platform.name} Browser
      </p>
      <p>
        <span className="font-medium">Full name :</span> {navigator.userAgent}
              </p>
      <p>
        <span className="font-medium">Peer state :</span><span className="font-bold uppercase"> {peerState}</span>
      </p>
      {(peer && !connected && location.state.details==='send') ? 
      <div className="mt-4">
        <h3 className="text-md font-semibold mb-2">Connection QR Code</h3>
        <QRCode value={peer.id} size={140} className="mx-auto" />
      </div> : (peer  && !connected && location.state.details==='receive') ?
      <div className="w-full">
         <PeerConnection /> 
        </div>
     : (peer && connected) ? <FileUpload onFileSelect={fileHandle}/> : null
      }
    </div>
  )
}

