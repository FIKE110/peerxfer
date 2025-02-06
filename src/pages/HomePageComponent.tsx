import type React from "react"
import { useContext, useEffect, useRef, useState } from "react"
import platform from 'platform'
import { toast, Toaster } from "sonner"
import Peer from "peerjs"
import { useLocation, useNavigate } from "react-router-dom"
import { AppContext, AppContextType, processDataConnectionData } from "../App"

interface PeerFormData {
  peerName: string
  deviceName: string
  deviceInfo: string
}

const peerConfig={
	config: {'iceServers': [
    { urls: "stun:stun.l.google.com:19302" },
    { urls: "stun:stun.l.google.com:5349" },
    { urls: "stun:stun1.l.google.com:3478" },
    { urls: "stun:stun1.l.google.com:5349" },
    { urls: "stun:stun2.l.google.com:19302" },
    { urls: "stun:stun2.l.google.com:5349" },
    { urls: "stun:stun3.l.google.com:3478" },
    { urls: "stun:stun3.l.google.com:5349" },
    { urls: "stun:stun4.l.google.com:19302" },
    { urls: "stun:stun4.l.google.com:5349" }
	]} 
}

export default function HomePageComponent() {
  const location=useLocation()
  const {peer:userPeer,currentMetaData,downloadLinkRef,peerConnectionRef,setRemotePeer,setConnected,setPeer}=useContext<AppContextType | null>(AppContext) as AppContextType
  const navigate=useNavigate()
  const [formData, setFormData] = useState<PeerFormData>({
    peerName: "",
    deviceName: "Default Device",
    deviceInfo: "No additional info",
  })
  const [useCustomPeerName,setUseCustomPeerName]=useState(false)
  const toastRef=useRef<string | number>()
  const submitButtonRef=useRef<HTMLButtonElement | null>()
  useEffect(()=>{
    if(!location.state?.details){
      navigate("/transfer")
    }
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const createNewPeer=(peername:string,formData:PeerFormData)=>{
    setPeer(null)
    setConnected(false)
    const peer=useCustomPeerName ? new Peer(peername,peerConfig) : new Peer(peerConfig);
      peer.on('open',id=>{
        console.log(`Peer with id ${id} was created`)
        if(toastRef.current) toast.dismiss(toastRef.current);
        toast.success(`Peer with id ${id} was successfully created`)
        setTimeout(()=>{
          navigate("/transfer",{
            state:{
              formData:{...formData,peerName:id},
              details:location.state.details
            }
          })
        },1500)

      })
      peer.on('connection',conn=>{
        peerConnectionRef.current=conn
        conn.on('data',data=>processDataConnectionData(data,currentMetaData,downloadLinkRef))
        setConnected(true)
        setRemotePeer({platform:'',id:conn.peer})
        toast.success("Connection Established")
      })
      
      peer.on('error',(error)=>{
        toast.error(error.type)
       if(error.type==='disconnected'){
        toast.error("Connection with signaling server has been lost")
        return
      }
        if(toastRef.current) toast.dismiss(toastRef.current);
        toast.error("Could not create peer, Either PeerId has already been used or client does not have Stable Internet Connection")
        console.log(error)
        if(submitButtonRef.current) submitButtonRef.current.disabled=false
        // setConnected(false)
        // setPeer(null)
        // setRemotePeer(null)
        // peerConnectionRef.current=undefined
      })

      peer.on('close',()=>{
        // setConnected(false)
        // setPeer(null)
        // setRemotePeer(null)
        // peerConnectionRef.current=undefined
      })

      peer.on('disconnected',()=>{
        toast.error("Connection with signaling server has been lost")
      })

      setPeer(peer)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if(submitButtonRef.current) submitButtonRef.current.disabled=true
    e.preventDefault()
    console.log("Form submitted:", formData)
    toastRef.current=useCustomPeerName ? toast.loading(`Creating your Peer with id of ${formData.peerName}`):
    toast.loading("Creating peer with auto generated ID")
    createNewPeer(formData.peerName,formData)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
       <Toaster />
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">Peer Information</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="peerName" className="block text-sm font-medium text-gray-700">
              Peer Name
            </label>
            <input
              type="text"
              id="peerName"
              name="peerName"
              value={useCustomPeerName ? formData.peerName : "PeerID will be auto generated"}
              onChange={handleChange}
              disabled={!useCustomPeerName}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="flex pt-2 justify-start items-center">
            <input 
            type="checkbox"
            onChange={e=>setUseCustomPeerName(e.target.checked)}
            />
            <p className="text-xs pl-2">use custom peer name</p>
            </div>
           
          </div>
          <div>
            <label htmlFor="deviceName" className="block text-sm font-medium text-gray-700">
              Broswer Name
            </label>
            <input
              type="text"
              id="deviceName"
              name="deviceName"
              value={platform.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label htmlFor="deviceName" className="block text-sm font-medium text-gray-700">
              Device Os
            </label>
            <input
              type="text"
              id="deviceOs"
              name="deviceOs"
              value={platform.os?.family}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
          ref={submitButtonRef}
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  )
}

