"use client"

import { useContext, useEffect, useState } from "react"
import DeviceInfo from "./DeviceInfo"
import { ConnectedStatusComponent, getColorForState, PeerState } from "./ConnectedStatusComponent"
import SendCard from "./SendCard"
import ReceiveCard from "./ReceiveCard"
import { Power } from "lucide-react"
import { AppContext, AppContextType } from "../App"

export default function ConnectionInterface() {

  const [peerState,setPeerState]=useState<PeerState>('offline')
    const {peerConnectionRef,setRemotePeer,connected,remotePeer,peer,setConnected,setPeer}=useContext<AppContextType | null>(AppContext) as AppContextType
  
      useEffect(()=>{
          if(peer && connected){
              setPeerState('connected')
          }
          else if(peer){
              setPeerState('ready')
          }
          else{
              setPeerState('offline')
          }
      },[connected,peer])




  return (
    <main className="min-h-dvh bg-gray-100 md:p-8 flex items-center justify-center">
      <div className="max-w-md min-h-[500px] mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-6 flex flex-col">
          <div className="flex items-center justify-between">
          <div>
          {remotePeer && 
            <span>Connected to Peer({remotePeer.id})</span>
          }
          </div>
          <div className={`${getColorForState(peerState)} flex w-fit rounded-full self-end items-end justify-self-end p-3 mb-2`}>
          <Power color="white" size={15}/>
        </div>
          </div>

          {/* <h1 className="text-2xl font-bold mb-6 text-center">Peer Connection Interface</h1> */}
          <div>
            <ConnectedStatusComponent />
        </div>
        <div className='flex items-center justify-center space-x-5'>
           {peerState==='offline' ?(<>
            <SendCard />
            <ReceiveCard /></>)
            : <button
            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75 transition duration-300 ease-in-out"
            onClick={() => {
              peer?.disconnect()
              peer?.destroy()
              setPeer(null)
              setConnected(false)
              setRemotePeer(null)
              peerConnectionRef.current=undefined
            }}
          >
            Destroy peer
          </button>
            }
        </div>
          <DeviceInfo  peerState={peerState}/>
        </div>
      </div>
    </main>
  )
}

