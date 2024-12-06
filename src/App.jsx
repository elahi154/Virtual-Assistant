import React, { useContext } from 'react'
import './App.css'
import va from './assets/ai.jpg'
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from './context/Usercontext';
import speakimg from './assets/speak.gif'
import aigif from './assets/aiVoice.gif'
import vaa from './assets/bha.jpg'

const App = () => {
  let {recognition , speaking, setSpeaking,prompt,response ,setPrompt,setResponse} = useContext(datacontext)

  return (
    <div className='main'>
      <img src={va} alt='' id='bhawana'/>
      <span> I'm Aish ,Your Virtual  Assistant</span>
      {!speaking? 
      <button onClick ={()=>{
        setPrompt("listining...")
        setSpeaking(true)
        setResponse(false)
        recognition.start()
      }}>Click-here <CiMicrophoneOn /> 
      </button> 
      :
      <div className='response'>
        {!response? <img src={speakimg} alt="please speak" id='speak'/>
          :
        <img src={aigif} alt='please change' id='aigif'/>
        
        }
        <p>{prompt}</p>
       
      </div>

    }
      
    </div>
  )
}

export default App
