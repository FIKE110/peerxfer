import { Wifi, WifiOff } from "lucide-react"

interface ConnectionStatusProps {
  isConnected: boolean
}

export default function ConnectionStatus({ isConnected }: ConnectionStatusProps) {
  return (
    <div
      className={`mb-4 p-2 w-full rounded-md flex items-center justify-center ${isConnected ? "bg-green-100" : "bg-red-100"}`}
    >
      {isConnected ? (
        <>
          <Wifi className="text-green-500 mr-2" size={20} />
          <span className="text-green-700">Connected to peer</span>
        </>
      ) : (
        <>
          <WifiOff className="text-red-500 mr-2" size={20} />
          <span className="text-red-700">Not connected</span>
        </>
      )}
    </div>
  )
}

