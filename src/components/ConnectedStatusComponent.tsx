import { Power} from "lucide-react"
import { useContext, useEffect, useState } from "react"
import { AppContext, AppContextType } from "../App"
import ConnectionStatus from "./ConnectionStatus"

export type PeerState='offline' | 'ready' | 'connected'

export function getColorForState(state:PeerState):string{
   return  state==='connected'? "bg-[#4CAF50]" : state ==='offline' ? "bg-[#FF4C4C]" : "bg-[#FFEB3B]"
}


export const ConnectedStatusComponent = () => {
    const [peerState,setPeerState]=useState<PeerState>('offline')
    const {connected,peer}=useContext<AppContextType | null>(AppContext) as AppContextType

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
    <div className="flex items-center text-center w-full justify-between p-2">
       {/* <div className={`${getColorForState(peerState)} w-fit rounded-full flex items-center justify-center p-2`}>
        <Power color="white" size={30}/>
    </div>  */}
    <div className="w-full">
    <ConnectionStatus isConnected={connected} />
    </div>
    </div>
    
  )
}
