import {createSlice} from '@reduxjs/toolkit';

//initial state of the application's task list
const initialState = {
    tasks: [],
    currentlyEdited:-1};

/*NOTE: members of the 'tasks' list are objects
These objects can have the following Default Properties:
         status:'Not Started',
         isPriority: 'false',
         isEditable: 'false'*/

//initialize redux slice for managing tasks
const tasksSlice = createSlice({
    name:'tasks',
    initialState,
    reducers:{
        //update store to reflect selected task's new priority 
        editPriority:(state,action)=>{
            const indexChanged = action.payload[0];
            const newPriority = action.payload[1];
            state.tasks[indexChanged-1].isPriority =newPriority;
        },

        //update store to reflect selected task's new progress status 
        changeProgress:(state,action)=>{
            state.tasks[action.payload[0]-1].status = action.payload[1];
        },

        //update store to reflect selected task's deletion 
        deleteTask:(state,action)=>{
            state.tasks = state.tasks.filter(t=> t.id!=action.payload).
            map((item, index) => ({ ...item, id: index + 1 }));
        },

        //update store to reflect selected task's new name 
        handleNameChange:(state,action)=>{
            const idChange = action.payload[0];
            const n = action.payload[1];
            state.tasks[idChange-1].taskName =n;  
        },
        
        //update store to reflect adding a new task  
        addTask:(state,action)=>{
            //create task with default properties
            const newlyMadeTask={id:state.tasks.length +1 , taskName:action.payload,
            status:'Not Started', isPriority:false, isEditable:false};
            //add object representing new task to taskList in store
            state.tasks.push(newlyMadeTask);
        },

        //update store to reflect deleting all tasks from task list
        clearList:(state,_)=>{
            state.tasks=[];
        },

        //update store to reflect task currently in 'edit' mode
        markEdit:(state,action)=>{
          state.currentlyEdited = action.payload;
        },
    }});

export const {editPriority,changeProgress,deleteTask,handleNameChange,addTask,clearList,markEdit} = tasksSlice.actions;
export default tasksSlice.reducer;
