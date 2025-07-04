import { useSelector,useDispatch} from "react-redux";
import { changeTheme } from "./reducers/ThemeSlice.js";
function DarkModeComponent(){
    //fetch application's current theme from store
    const currentTheme = useSelector((state)=>state.currentTheme.theme); 

    const dispatch = useDispatch();

    /**return component for application's light/dark themes
     * -dispatch 'changeTheme' action to change theme in redux store 
     */
    return( <div className='flex flex-row ml-300 space-x-1 '>
     <button className='cursor-pointer  px-1 py-1 shadow font-semibold text-sm whitespace-nowrap
     hover:bg-violet-700 bg-violet-400 rounded-sm dark:bg-pink-400 dark:text-gray-900
      dark:hover:bg-pink-900 dark:hover:text-white mt-10' onClick={()=>{dispatch(changeTheme(''));}
      }><svg className="" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#44403c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></svg></button> <br></br> <br></br>
      <button className=" px-1 py-1 mt-10 cursor-pointer shadow font-semibold text-sm whitespace-nowrap
       hover:bg-violet-700 bg-violet-400 rounded-sm dark:bg-pink-400 dark:text-gray-900
      dark:hover:bg-pink-900 dark:hover:text-white"onClick={()=>{dispatch(changeTheme('dark'))}}><svg  
      className="" xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" 
      fill="none" stroke="#44403c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></svg></button>
  </div>);
};
export default DarkModeComponent;