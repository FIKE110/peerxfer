
import { useNavigate } from "react-router-dom"
import ReceiveButton from "./ReceiveButton"

const ReceiveCard = () => {
    const navigate=useNavigate()

    const navigateToPeerDetailsPage=()=>{
      navigate("/transfer/submit-details",{state:{
        details:"receive"
      }})
    }
  return (
    <ReceiveButton onClick={()=>navigateToPeerDetailsPage()}/>
  )
}

export default ReceiveCard