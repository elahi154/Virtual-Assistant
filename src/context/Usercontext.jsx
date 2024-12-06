import React, { createContext, useState } from 'react'
import run from '../gemini';
export const datacontext = createContext()
const UserContext = ({children}) => {
  let [speaking , setSpeaking ]=useState(false)

  let [prompt , setPrompt ] = useState("listining..")
  
  let [response, setResponse] = useState(false)


  function speak(text, language='en-GB'){
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume =1;
    text_speak.rate=1;
    text_speak.pitch=1;
    text_speak.lang=language;
    
    const voices = window.speechSynthesis.getVoices();

    const selectedVoice = voices.find(
      voice => voice.lang === language && (voice.name.includes("Female") || voice.name.includes("India"))
     

    );

  
  
    if (selectedVoice) {
      text_speak.voice = selectedVoice;
    } else {
      console.warn(`No voice found for language: ${language}. Using the default voice.`);
    }
    window.speechSynthesis.speak(text_speak);
  }
  async function aiResponse (prompt){
    let text = await run(prompt)
    let newText = text.split("**")&&text.split("*")&&text.replace("google","Manjur Elahi")&&text.replace("Google","Manjur Elahi")
    setPrompt(newText)
    speak(newText)
    setResponse(true)
    setTimeout(()=>{
      setSpeaking(false)
    },5000)
    
  }


  let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  let recognition = new speechRecognition()
  recognition.onresult=(e)=>{
    let currentIndex = e.resultIndex
    let transcript=e.results[currentIndex][0].transcript

    setPrompt(transcript)
    takeCommand(transcript.toLowerCase())
  } 

  function takeCommand(command){
    if (command.includes("hu r u")) {
      // Responds with the desired text
      speak("I am Aish  virtual assistant of  Manzoor Elahi");
      setResponse(true);
      setPrompt("I am Aish virtual assistant of  Manzoor Elahi");
      setTimeout(() => {
        setSpeaking(false);
      },5000);
    }
    else if(command.includes("tum kaun ho")) {
      // Responds with the desired text
      speak("main aish , manzoor ki virtual assistant hu  ");
      setResponse(true);
      setPrompt("main aish , manzoor ki virtual assistant hu ");
      setTimeout(() => {
        setSpeaking(false);
      },5000);
    }


    else if(command.includes("open") && command.includes("youtube")){
    window.open("https://www.youtube.com/","_blank")
    speak("opening Youtube")
    setResponse(true)

    setPrompt("opning Youtube...")
    setTimeout(()=>{
      setSpeaking(false)
    },5000)
  }
  else if(command.includes("open") && command.includes("google")){
    window.open("https://www.google.com/","_blank")
    speak("opening google")
    setResponse(true)

    setPrompt("opning google...")
    setTimeout(()=>{
      setSpeaking(false)
    },5000)
  }
  else if(command.includes("open") && command.includes("instagram")){
    window.open("https://www.instagram.com/","_blank")
    speak("opening instagram")
    setResponse(true)
    setPrompt("opning instagram...")
    setTimeout(()=>{
      setSpeaking(false)
    },5000)
  }
  else if(command.includes("time")){
    let time = new Date().toLocaleString(undefind,
      {hour:"numeric", minute:"numeric"}
    )
    speak(time)
    setResponse(true)
    setPrompt(time)
    setTimeout(()=>{
      setSpeaking(false)
    },5000)
  }
  else if (command.includes("date")){
    let date = new Date().toLocaleString(undefind,
      {day:"numeric", month:"short"}
    )
    speak(date)
    setResponse(true)
    setPrompt(date)

    
    setTimeout(()=>{
      setSpeaking(false)
    },5000)
  }


  else{
    aiResponse(command)
  }
  }

  let value={
   recognition,
   speaking,
   setSpeaking,
   prompt,
   setPrompt,
   response,
   setResponse
  }

  return (
    <div>
      <datacontext.Provider value={value}>
      {children}
      </datacontext.Provider>
      
    </div>
  )
}

export default UserContext;

