import { Download } from "lucide-react"

interface ReceiveButtonProps {
  onClick: () => void
}

export default function ReceiveButton({ onClick }: ReceiveButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded flex items-center"
    >
      <Download className="mr-2" size={20} />
      Receive
    </button>
  )
}

