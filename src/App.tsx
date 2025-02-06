import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePageComponent from "./pages/HomePageComponent";
import ClientPageComponent from "./pages/ClientPageComponent";
import ConnectToPeerScreen from "./pages/ConnectToPeerScreen";
import { createContext, Dispatch, MutableRefObject, SetStateAction, useRef, useState } from "react";
import Peer, { DataConnection } from "peerjs";
import platform from "platform";
import { DataSentType } from "./components/DeviceInfo";
import { toast } from "sonner";

export type RemotePeerType={
  platform:string,
  id:string
}

export type AppContextType={
  peer:Peer | null,
  setPeer:Dispatch<SetStateAction<Peer | null>>,
  connected:boolean,
  setConnected:Dispatch<SetStateAction<boolean>>,
  connectToPeer:(peerId:string)=>void,
  remotePeer:RemotePeerType | null,
  setRemotePeer:Dispatch<SetStateAction<RemotePeerType | null>>,
  peerConnectionRef:MutableRefObject<DataConnection | undefined>,
  currentMetaData:MutableRefObject<DataSentType | undefined>,
  downloadLinkRef:MutableRefObject<HTMLAnchorElement >
}

export const AppContext=createContext<AppContextType | null>(null)

export function processDataConnectionData(data:unknown,currentMetaData:MutableRefObject<DataSentType | undefined>,downloadLinkRef:MutableRefObject<HTMLAnchorElement>){
  if(data instanceof ArrayBuffer){
    console.log(data)
   if(currentMetaData.current){
    const fileBlob=new Blob([data],{type:currentMetaData.current.mimeType ? currentMetaData.current?.mimeType :'text/plain'})
    console.log(fileBlob)
    const url=URL.createObjectURL(fileBlob)
    downloadLinkRef.current.href=url
    downloadLinkRef.current.download=currentMetaData.current.filename
    downloadLinkRef.current.click()
    toast("File received")
  }
   currentMetaData.current=undefined
  }
  else if(data instanceof Object){
    const metaData=data as DataSentType
    console.log(metaData)
    currentMetaData.current=metaData
}
}

export default function App(){
  const [peer,setPeer]=useState<Peer | null>(null)
  const [remotePeer,setRemotePeer]=useState<RemotePeerType | null>(null)
  const [connected,setConnected]=useState<boolean>(false)
  const peerConnectionRef=useRef<DataConnection>()
  const currentMetaData=useRef<DataSentType>()
  const downloadLinkRef=useRef<HTMLAnchorElement>()



  function connectToPeer(peerId:string){
    const conn=peer?.connect(peerId,{metadata:{
      platform: platform.os+" "+platform.name
    }})
    conn?.on('open',()=>{
      toast.success("Connection Established")
      setConnected(true)
      setRemotePeer({platform:'',id:peerId})
      console.log("Connected to peer")
      peerConnectionRef.current=conn
    })

    conn?.on('data',(data)=>processDataConnectionData(data,currentMetaData,downloadLinkRef))
  }

  return (
    <AppContext.Provider value={{downloadLinkRef,currentMetaData,peerConnectionRef,peer,setPeer,connected,setConnected,connectToPeer,remotePeer,setRemotePeer}}>
       <BrowserRouter>
      <Routes>
          <Route path="/transfer/submit-details" element={<HomePageComponent />} />
          <Route path="/client" element={<ClientPageComponent />} />
          <Route path="/transfer" element={<ConnectToPeerScreen />} />
      </Routes>
    </BrowserRouter>
    </AppContext.Provider>
  );
}