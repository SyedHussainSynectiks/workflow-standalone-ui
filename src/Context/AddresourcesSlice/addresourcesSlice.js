"use client";
import {createSlice} from "@reduxjs/toolkit"
const addresourcesSlice = createSlice({
    name:"addResource",
    initialState:{id:null},
    reducers:{
        addResources: (state, action) => {
            state.id = action.payload;
          
        },
        // console.log(action.title)
        removeResources(state,action){
            return state.filter((item)=>item.id !== action.payload);
        }
    }
})

export const {addResources,removeResources} =addresourcesSlice.actions;
export default addresourcesSlice.reducer;