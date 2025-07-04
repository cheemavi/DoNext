import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useState } from "react"; 
import { useDispatch} from "react-redux";
import { addTask } from "./reducers/TaskSlice.js";
function SpeechTextComponent(){
  const [isRecording, setisRecording] = useState(false);
  const dispatch = useDispatch();

  //destructure and store speech recognition properties in object
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  //return disabled mic button if browser not compatible 
  if (!browserSupportsSpeechRecognition) {
    return   <div>
      <button id='speech-text-btn' className='cursor-not-allowed shadow font-semibold text-sm 
      whitespace-nowrap  py-3 px-4 bg-violet-300 rounded-sm dark:bg-pink-400 dark:text-gray-900
       dark:hover:bg-pink-700 dark:hover:text-slate-900' disabled={true}>
      <svg className="h-8 w-8 text-red-400"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"
      strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <line x1="1" y1="1" x2="23" y2="23" /> 
      <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />  
      <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" /><line x1="12" y1="19" x2="12" y2="23"/>
      <line x1="8" y1="23" x2="16" y2="23" /></svg>
      </button>
    </div>}

//dispatch addTask action to add new task to store
const handleNewT = (t)=>{
    //reflect speech not picked up properly
    if(t.length==0){
         dispatch(addTask('<audio not picked up>'));
    } else{
         dispatch(addTask(t));
    }
};

//handle toggling button svg and speech recording + task creating 
const handleSpeechText = (t)=>{
  const toggleButton = document.getElementById('speech-text-btn');
  const newSvg= document.createElement('svg');
       
  if (isRecording && toggleButton.hasChildNodes){
    //remove the recording button svg
    toggleButton.removeChild(toggleButton.firstChild);

    //create and append not recording button svg
    newSvg.innerHTML = '<svg class="h-8 w-8 text-stone-800  dark:text-gray-900 "  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <line x1="1" y1="1" x2="23" y2="23" />  <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />  <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />  <line x1="12" y1="19" x2="12" y2="23" />  <line x1="8" y1="23" x2="16" y2="23" /></svg>';
    toggleButton.append(newSvg);
    
    //stop speech-to-text listening recording and create new task
    SpeechRecognition.stopListening();
    setisRecording(false);
    handleNewT(t);

    } else{
    //remove the not recording svg
    toggleButton.removeChild(toggleButton.firstChild);

    //create and append recording button svg
    newSvg.innerHTML='<svg class="h-8 w-8 animate-pulse text-stone-800  dark:text-gray-900 "  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />  <path d="M19 10v2a7 7 0 0 1-14 0v-2" />  <line x1="12" y1="19" x2="12" y2="23" />  <line x1="8" y1="23" x2="16" y2="23" /></svg>'
    toggleButton.appendChild(newSvg);

    //start speech-to-text recording
    setisRecording(true);
    SpeechRecognition.startListening();
  }
};

/**return component for application's speech-to-text feature 
 * for creating a new task                                 */
return( <div className='flex flex-row space-x-2'>
    <button id='speech-text-btn' className='cursor-pointer shadow font-semibold text-sm whitespace-nowrap hover:bg-violet-700  py-3 px-4 bg-violet-300 rounded-sm dark:bg-pink-400 dark:text-gray-900 dark:hover:bg-pink-700 dark:hover:text-white' onClick={()=>{ handleSpeechText(transcript)}}>
    <svg className="h-8 w-8 text-stone-800  dark:text-slate-700 "  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round">  <line x1="1" y1="1" x2="23" y2="23" />  <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />  <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />  <line x1="12" y1="19" x2="12" y2="23" />  <line x1="8" y1="23" x2="16" y2="23" /></svg>
    </button></div>);
  };
export default SpeechTextComponent