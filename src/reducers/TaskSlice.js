import {createSlice} from '@reduxjs/toolkit';
//initial state of the store:
const initialState = {
    tasks: [
    ],
    currentlyEdited:-1,
};

//A redux slice, is a dedicated portion of your state to a certain 
// feature and you group its related reducer and actions
const tasksSlice = createSlice({
    name:'tasks',
    initialState,
    reducers:{
        //all fcns that we want for our store's state
        //change priority
         editPriority:(state,action)=>{
            //update priority:
            const indexChanged = action.payload[0];
            const newPriority = action.payload[1];
            console.log(state.tasks[0].id)
            state.tasks[indexChanged-1].isPriority =newPriority;
  
        },
       
        //change progress status
        changeProgress:(state,action)=>{
            state.tasks[action.payload[0]-1].status = action.payload[1];
        },
        //delete task
        deleteTask:(state,action)=>{
            
             state.tasks = state.tasks.filter(t=> t.id!=action.payload).map((item, index) => ({ ...item, id: index + 1 }))

        },
        //rename task name
        renameTask:(state,action)=>{
            state.tasks[action.payload-1].isEditable = !state.tasks[action.payload-1].isEditable ;
            //console.log( state.tasks[action.payload-1].isEditable)

        },
          //handle renaming task name
        handleNameChange:(state,action)=>{
            const idChange = action.payload[0];
            const n = action.payload[1];
            state.tasks[idChange-1].taskName =n;


           

        },
            addTask:(state,action)=>{
                //state.movies[state.movies.length-1] + 1
            const newlyMadeTask={id:state.tasks.length +1 , taskName:action.payload, status:'Not Started', isPriority:false, isEditable:false};
           state.tasks.push(newlyMadeTask);


        },
         clearList:(state,_)=>{
                state.tasks=[];


        },
        markEdit:(state,action)=>{
           //console.log(action.payload)
           //check if editable
           //console.log(action.payload+'wwwwwwww')
          // if(state.currentlyEdited===action.payload){
           // state.currentlyEdited=-1;
          // }
          // else{
                       //    state.currentlyEdited = action.payload

          // }
          
          state.currentlyEdited = action.payload
           console.log("current:"+state.currentlyEdited+"\nwhats edited:"+action.payload)
        }

    }
}

);

export const {editPriority,changeProgress,deleteTask,renameTask,handleNameChange,addTask,clearList,markEdit} = tasksSlice.actions;
export default tasksSlice.reducer;
