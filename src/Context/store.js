const { configureStore } = require("@reduxjs/toolkit");
import usersReducers from './Slice'
import addProjectSlice from './AddNewProjectSlice/addProjectSlice';
// import todoReducer from './todoSlice'
export const store =configureStore({
    reducer:{
        usersData:usersReducers,
        form:addProjectSlice
    }
})