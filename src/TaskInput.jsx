import { useState } from "react";
import { addTask } from "./reducers/TaskSlice.js";
import { useDispatch, useSelector } from "react-redux";
import ListOptions from './ListOptions.jsx'
import './index.css';
function TaskInput(){
    const tasks = useSelector((state)=>state.taskList.tasks); //want tasks part of initial state

    
    const [newTask,setTask]= useState('');
    //allows us to call/dispatch any action that we have in our store
    const dispatch = useDispatch();
    const handleAddNewTask = ()=>{
        if (newTask){
            dispatch(addTask(newTask));
            setTask('');
        

        }

    }
   const handleNothingEntered=()=>{
    const inputTask=  document.getElementById('task-input').classList;
    const errMsg = document.getElementById('input-err').classList;
    if (newTask.length===0){
        console.log('w')
        inputTask.add('border-dotted','border-red-700', 'border-2','dark:border-dotted','dark:border-rose-700', 'dark:border-2');
        errMsg.remove('hidden');
    }
    else if (inputTask.contains('border-red-700')){
        inputTask.remove('border-dotted','border-red-700', 'border-2','dark:border-dotted','dark:border-rose-700', 'dark:border-2');
        errMsg.add('hidden');

    }

   };


    return(<div className=" flex flex-row items-center justify-between mx-auto w-3xl bg-violet-500 rounded-sm	mb-4 shadow-2xl py-2 px-3 space-x-5 space-y-0 my-3 dark:bg-slate-400">
        
        <div className="flex flex-col w-2xl space-y-0"> <p id='input-err' className=" hidden text-xs text-stone-950 dark:text-rose-950 font-extrabold font-stretch-ultra-condensed animate-pulse">Please Enter a Task Name </p>
        <input  id='task-input' className=" shadow appearance-none border font-light rounded py-3 text-sm px-3 space-y-10  bg-violet-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline dark:bg-zinc-950 dark:text-neutral-400" onChange = {(e)=>{setTask(e.target.value)}} value={newTask} type='text'></input></div>
       
        <button className = "cursor-pointer shadow font-semibold text-sm whitespace-nowrap hover:bg-violet-700  py-3 px-4 bg-violet-300 rounded-sm dark:bg-stone-900 dark:text-slate-400 dark:hover:bg-stone-600 dark:hover:text-white " onClick = {()=>{handleAddNewTask();handleNothingEntered()}}>{'Add Task'}</button>
       
                <ListOptions></ListOptions>

        
      

        



    
    </div>)
}


export default TaskInput;