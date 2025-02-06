import { createContext, Dispatch,  useContext,  useState } from 'react'
import ConnectionInterface from '../components/ConnectionInterface'
import { QRCodeScannerModal } from '../components/FullScreenModal'
import { AppContext, AppContextType } from '../App'
import { Toaster } from 'sonner'

export type ConnectToPeerScreenContextType={
    isModalOpen:boolean,
    setIsModalOpen:Dispatch<React.SetStateAction<boolean>>
}

export const ConnectToPeerScreenContext=createContext<ConnectToPeerScreenContextType | null>(null)

const ConnectToPeerScreen = () => {
     const [isModalOpen,setIsModalOpen]=useState(false)
     const {downloadLinkRef}=useContext<AppContextType | null>(AppContext) as AppContextType
  return (
    <ConnectToPeerScreenContext.Provider value={{isModalOpen,setIsModalOpen}}>
        <div>
        <a ref={downloadLinkRef} className='hidden'></a>
        <Toaster />
        <ConnectionInterface />
        <QRCodeScannerModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen}/>
        </div>
    </ConnectToPeerScreenContext.Provider>
  )
}


export default ConnectToPeerScreen