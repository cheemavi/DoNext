import { useSelector,useDispatch} from "react-redux";
import { editPriority,changeProgress,deleteTask,
        handleNameChange,markEdit} from "./reducers/TaskSlice.js";
import { useState } from "react";
function TaskList(){
       //temporarily maintain state of status and priority before updating it in store
       const [taskStatus,setTaskStatus] = useState('');
       const [taskPriority,setTaskPriority] = useState('');

       //fetch task list and index of currently edited task from store
       const tasks = useSelector((state)=>state.taskList.tasks); 
       const edita = useSelector((state)=>state.taskList.currentlyEdited); 

       const dispatch = useDispatch();

       //temporary state handling of priority and status properties
       const handlePriorityTempChange = (event)=>{setTaskPriority(event.target.value)};
       const handleTaskStatusChange = (event)=>{setTaskStatus(event.target.value)};

       //dispatch action to make changes to task in store
       const handlePriorityChange = (t)=>{dispatch(editPriority(t))};
       const handleProgressChange = (t)=>{dispatch(changeProgress(t))};
       const handleMarkEdited = (t)=>{dispatch(markEdit(t))};
       const handleTaskNewwName = (t)=>{dispatch(handleNameChange(t))};

       //dispatch delete action to delete task from store
       const handleDeleteTask = (t)=>{dispatch(deleteTask(t))};

       /*set task box's shadow based on priority
       -high priority = red shadow
       -low priority = indigo shadow
       -default +(in case of issue) = indigo shadow */
       const handlePriorityShadow = (pShadow)=>{
       switch(pShadow){ 
              case 'low':
                     return 'shadow-indigo-500/40 dark:shadow-indigo-800/40';
              case 'high':
                     return 'shadow-rose-500/60 dark:shadow-red-500/40';
              default:
                     return 'shadow-indigo-500/40 dark:shadow-indigo-800/40 ';
       }
       };

       /* set task's status styling depending on its status 
       * -not started = red text
       * -in progress = black text
       * -completed = green text
       */
       const handleStatusStyling = (s)=>{
       switch(s){
              case 'Not Started':
                     return 'text-sm font-extrabold py-2 text-red-800 pl-5 dark:text-rose-950';
              case 'In Progress':
                     return 'text-sm font-extrabold py-2 pl-5 dark:text-stone-900';
              case 'Completed':
                     return 'text-sm font-extrabold text-emerald-800 py-2 pl-5 dark:text-emerald-900';
       }
       };


       //handle 
       function editingNow(formData){
              //grab task's updated values after edit form submitted
              const id = formData.get('sub');
              const newName = formData.get('changingTaskName');
              const progressOption = formData.get('status');
              const priorityOption = formData.get('priority');

              //get original vals if default:
              if (progressOption){
                     //update status
                     handleProgressChange([id,progressOption]);
              }
              if (priorityOption){
                     //update priority
                     handlePriorityChange([id,priorityOption]);
              }
              if(newName){
              handleTaskNewwName([id,newName]);   
              }

              //reset isEdited in state 
              handleMarkEdited(-1);
       };

    return(<div className=" w-3xl mb-4  py-3 px-3 space-x-5 space-y-0 my-3 ml-18 mr-5 rounded items-center justify-between ">
      
  
       {tasks.map(t=>
       //get status and the shadow
       <div key={t.id} className={`mt-0 space-y-0 ${handleStatusStyling(t.isPriority)}`}>
       {/*task label*/ }
       {//if not editable: 
       ( t.id===edita)? 
       
       //if editable then have these options
       <form action={editingNow} className="flex flex-col w-3xl mb-4  bg-violet-300 py-6 px-3 space-x-5 space-y-0 my-2 mt-4 rounded items-center justify-between shadow-lg shadow-indigo-500/40 dark:bg-slate-400 dark:shadow-indigo-800/40 ">
             <div className='flex flex-row'><label className="block text-gray-500 font-bold md:text-right mb-1 ml-25 md:mb-0 pr-4 text-md mt-3 dark:text-neutral-900">Rename Task:</label>
              <input className="shadow appearance-none border font-light rounded w-sm py-3 text-sm px-3 space-y-5 bg-violet-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-slate-600 dark:text-white" name='changingTaskName' defaultValue={t.taskName}></input> <br></br></div> 
              <div className="flex flex-row space-x-0 ml-20">
              <label className='block text-gray-500 font-bold md:text-right mb-1 md:mb-0 mx-auto mr-13  text-md mt-3 px-3 dark:text-neutral-900'>Task Status:</label>
            
              <input type="radio" className=" cursor-pointer w-4 h-4 mt-4  " id="not-started" name="status" value="Not Started"  checked={taskStatus==='Not Started'} onChange={handleTaskStatusChange}></input>
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 text-sm mt-4 space-x-3 mx-1 dark:text-neutral-950">Not Started</label>

              <input  type="radio" className="cursor-pointer w-4 h-4 mt-4  " id="in-progress" name="status" value="In Progress" checked={taskStatus==='In Progress'} onChange={handleTaskStatusChange}></input>
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 text-sm mt-4 space-x-3 mx-1 dark:text-neutral-950">In Progress</label>

              <input type="radio" className=" cursor-pointer w-4 h-4 mt-4" id="completed" name="status" value="Completed" checked={taskStatus==='Completed'} onChange={handleTaskStatusChange}></input>
              <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 text-sm mt-4 space-x-3 mx-1 dark:text-neutral-950">Completed</label>
              </div>
             
      
              <div className="flex flex-row justify-center items-center mx-auto space-y-0"><label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 mx-auto  text-md mt-3 px-3 mr-11 dark:text-neutral-900">Priority:</label>
               <div className="flex flex-row mr-16 ml-28">
                     <input type="radio" className="cursor-pointer w-4 h-4 mt-4  " id="low" name="priority" value="low"  checked={taskPriority==='low'} onChange={handlePriorityTempChange}></input>
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 text-sm mt-4 space-x-3 mx-1 dark:text-neutral-950">Low</label>
                  <input type="radio" className="cursor-pointer w-4 h-4 mt-4  "id="high" name="priority" value="high"  checked={taskPriority==='high'} onChange={handlePriorityTempChange}></input>
                <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4 text-sm mt-4 space-x-3 mx-1 dark:text-neutral-950">High</label>

               </div>
               
</div>
              

              <button className='cursor-pointer  shadow whitespace-nowrap hover:bg-violet-700 mt-8 font-semibold ml-40 text-lg py-3 px-5 bg-violet-400 rounded-sm dark:bg-stone-900 dark:text-slate-400 dark:hover:bg-stone-600 dark:hover:text-white  ' value = {t.id} type='submit' name='sub'>{'SAVE'}</button>






              
        



           

              


       </form>
       :

       //if not editable then have these options
       <div id="task-container" className={`flex flex-row space-x-50 relative w-3xl justify-center items-center bg-violet-300 shadow-lg  my-0 ${handlePriorityShadow(t.isPriority)} px-15 py-5 dark:bg-slate-400`}>
             {/**task and progress labels */}
       {/**check what is the task status and change how its displayed for its label */
       
       } <div className="flex-flex-row py-5 ">
              <div className="flex flex-col absolute left-5 top-3">
              <label className='text-md font-bold text-gray-700 dark:text-stone-900'>{`${t.taskName}`}</label>
              <div className="flex flex-row mx-auto ">
                     <label className="text-sm font-light py-2 pl-5 dark:text-stone-900">{`Status:`}</label>
              <label className={handleStatusStyling(t.status)}>{`${t.status}`}</label><br></br>
              </div>
              
              </div>
              {(t.isPriority==='high')?
              <div className="relative bottom-1 left-60 ml-5 contrast-200 dark:shadow-lg dark:shadow-rose-950/50 dark:rounded-lg">   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ff3000" strokeWidth="2" strokeLinecap="round" strokeinejoin="round"><path d="M7 18v-6a5 5 0 1 1 10 0v6"></path><path d="M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z"></path><path d="M21 12h1"></path><path d="M18.5 4.5 18 5"></path><path d="M2 12h1"></path><path d="M12 2v1"></path><path d="m4.929 4.929.707.707"></path><path d="M12 12v6"></path></svg>
</div>: <></>
              }
              
 
              
       </div>
             
              {(edita===-1)?
                                          <div className={`flex flex-row space-x-2 absolute right-10 ${handleStatusStyling(t.isPriority)}`}>
                                                  <button className='cursor-pointer shadow font-semibold text-sm whitespace-nowrap hover:bg-violet-700  py-3 px-4 bg-violet-400 rounded-sm dark:bg-stone-900 dark:text-slate-400 dark:hover:bg-stone-600 dark:hover:text-white  ' onClick={()=>{handleMarkEdited(t.id)}}>{'EDIT'}</button>
                                                 <button className="cursor-pointer shadow font-semibold text-sm whitespace-nowrap hover:bg-violet-700  py-3 px-4 bg-violet-400 rounded-sm dark:bg-stone-900 dark:text-slate-400 dark:hover:bg-stone-600 dark:hover:text-white  " onClick={()=>handleDeleteTask(t.id)}>DELETE</button>

                                          </div>
                                         :
                                          <div></div>

              
       
       }
                            


       </div>

    
      
   



       }
       
<br></br>
<br></br>



       </div>
)}
       
       
    </div>)
   

}
export default TaskList;