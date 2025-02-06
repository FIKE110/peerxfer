import { useNavigate } from "react-router-dom"
import SendButton from "./SendButton"

const SendCard = () => {
    const navigate=useNavigate()

    const navigateToPeerDetailsPage=()=>{
      navigate("/transfer/submit-details",{state:{
        details:'send'
      }})
    }
  return (
    <SendButton onClick={()=>navigateToPeerDetailsPage()}/>
  )
}

export default SendCard