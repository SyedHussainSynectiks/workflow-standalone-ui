import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: "",
  description: "",
  department: "",
  start_date: "",
  end_date: "",
  image_url: "https://i.imgur.com/PujQY5Y.png"
};

const addProjectSlice = createSlice({
  name: 'addProject',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      // Update the form data in the state
   console.log(action.payload)
      return { ...state, ...action.payload }
      ;
      
    },
    
  }
  
});

export const { updateFormData} = addProjectSlice.actions;

export default addProjectSlice.reducer;
