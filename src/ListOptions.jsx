import { useState } from "react";
import { saveAs } from "file-saver";
import {clearList } from "./reducers/TaskSlice.js";
import { useDispatch, useSelector } from "react-redux";

function ListOptions(){
    //fetch task list from store
    const tasks = useSelector((state)=>state.taskList.tasks); 

    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);

    //toggle task list option's menu
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    //dispatch clearList action to clear task list
    const handleClearList = ()=>{
        dispatch(clearList());
    };

    //
    const handleDownloadList = ()=>{
        if(tasks.length===0){
            return;
        }
        
        //get current date for task list's title
        const currentDate = new Date().toString().slice(0, 15);

        //construct task list formatted string
        let listOfTasks=`What You Did On: ${currentDate}\n`;
        let currentTask;
        for ( const task of tasks) {
            //format each task into a string and add it to the taskList string
            currentTask = `Task ${task.id}: ${task.taskName}\nStatus: ${task.status}\nPriority: ${task.isPriority}\n`;
            listOfTasks+=('-----------------------------------\n'+currentTask)};

        //download text file of formatted list of tasks string
        const blob = new Blob([listOfTasks], { type: "text/plain;charset=utf-8" });
        saveAs(blob, `What You Did On: ${currentDate}.txt`);
    };

    /** assemble and return component for application's hamburger drop down menu for
     * actions to do with your task list*/
    return( <div className=" flex flex-col">
                {/**hamburger drop down menu button */}
                <button
                    onClick={toggleDropdown}
                    className="cursor-pointer shadow font-semibold text-sm whitespace-nowrap relative
                     hover:bg-violet-700  py-3 px-4 bg-violet-300 rounded-sm dark:bg-stone-900
                      dark:text-slate-400 dark:hover:bg-stone-600 dark:hover:text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                    </svg></button>

                {/**drop down menu when open */}
                {isOpen && (
                <div
                    className="origin-top-right absolute  top-35 mt-2 w-15 right-64 
                    rounded-md shadow-lg bg-violet-300 ring-1 ring-indigo-700 ring-opacity-5
                    focus:outline-none dark:bg-slate-400 dark:ring-cyan-950 "
                    role="menu">
                    <div className="py-0 space-y-0.5" role="none">
                        {/**clear list button and toggle dropdown off*/}
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 
                            hover:bg-violet-700 w-15  dark:hover:bg-stone-600
                            dark:hover:text-white"
                            role="menuitem"
                            onClick = {()=>{handleClearList();toggleDropdown();}} >
                            <svg className="h-8 w-8 text-stone-800 dark:text-gray-900
                            dark:hover:text-white"  width="24" height="24" viewBox="0 0 24 24"
                           strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" 
                           strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/> 
                            <line x1="4" y1="7" x2="20" y2="7" />  <line x1="10" y1="11" x2="10" y2="17" />
                            <line x1="14" y1="11" x2="14" y2="17" />  
                            <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />  
                            <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
                        </a>

                        {/**download list button and toggle dropdown off*/}
                        <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700
                            hover:bg-violet-700 dark:hover:bg-stone-600 dark:hover:text-white"
                            role="menuitem"
                            onClick =  {()=>{handleDownloadList();toggleDropdown();}}>
                            <svg className="h-8 w-8 text-stone-800 dark:text-gray-900 
                             dark:hover:text-white"  width="24" height="24" viewBox="0 0 24 24" 
                            strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round"
                            strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  
                            <path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />
                            <line x1="12" y1="11" x2="12" y2="17" /><polyline points="9 14 12 17 15 14" /></svg>                        
                        </a>
                    </div>
                </div>
            )}
            </div>);
            }
export default ListOptions;