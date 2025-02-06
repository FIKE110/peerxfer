import { Send } from "lucide-react"

interface SendButtonProps {
  onClick: () => void
}

export default function SendButton({ onClick }: SendButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded flex items-center"
    >
      <Send className="mr-2" size={20} />
      Send
    </button>
  )
}

