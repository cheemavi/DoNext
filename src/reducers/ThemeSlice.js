import {createSlice} from '@reduxjs/toolkit';

//initial state of the application's theme:
const initialState = {
    theme:'',
};

//initialize redux slice for managing app's theme
const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        //update store to reflect selected theme for application
        changeTheme:(state,action)=>{
                    state.theme=action.payload;
        },
    }});
export const {changeTheme} = themeSlice.actions;
export default themeSlice.reducer;