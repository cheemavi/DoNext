import {createSlice} from '@reduxjs/toolkit';
//initial state of the store:
const initialState = {
    theme:'',
};

const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
                 changeTheme:(state,action)=>{
                    state.theme=action.payload;

                 }


    }
});
export const {changeTheme} = themeSlice.actions;
export default themeSlice.reducer;