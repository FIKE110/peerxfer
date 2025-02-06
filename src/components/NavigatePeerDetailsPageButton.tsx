import React from 'react'
import { useNavigate } from 'react-router-dom'

const NavigatePeerDetailsPageButton = ({text,details}:{text:string,details:"send" | "receive"}) => {
  const navigate=useNavigate()

  const navigateToPeerDetailsPage=()=>{
    navigate("/transfer/submit-details",{state:{
      details
    }})
  }
  
  return (
      <button className="bg-white rounded-2xl w-full p-2 font-semibold" onClick={()=>navigateToPeerDetailsPage()}>
              {text}
          </button>
  )
}

export default NavigatePeerDetailsPageButton