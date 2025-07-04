import TaskList from './TaskList.jsx';
import './App.css';
import TaskInput from './TaskInput.jsx';
import TitleComponent from './TitleComponent.jsx';
import SpeechTextComponent from './SpeechTextComponent.jsx';
import DarkModeComponent from './DarkModeComponent.jsx';
import { useSelector} from "react-redux";

function App() {
  const currentTheme = useSelector((state)=>state.currentTheme.theme);

  //add all components to document body 
  return (
    <div className={`${currentTheme ? 'dark':''}  min-h-screen w-full  bg-gradient-to-b 
     from-violet-500 via-violet-300 to-indigo-200  dark:bg-neutral-900
 dark:bg-none `}>
  <DarkModeComponent></DarkModeComponent>
      <div className={`flex flex-col items-center  justify-center mx-auto mt-10 `}>
 <TitleComponent></TitleComponent>
    <div className='flex flex-row items-center justify-center mx-auto space-x-2'> 
    <SpeechTextComponent></SpeechTextComponent>
    <TaskInput></TaskInput>
    </div>
   <TaskList></TaskList>
   </div></div>);
};

export default App;
