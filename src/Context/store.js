const { configureStore } = require("@reduxjs/toolkit");
import addProjectReducer from './AddNewProjectSlice/addProjectSlice';
// import todoReducer from './todoSlice'
export const store =configureStore({
    reducer:{
        addProject:addProjectReducer,
    }
})