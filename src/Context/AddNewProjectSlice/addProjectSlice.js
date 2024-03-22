import { createSlice } from "@reduxjs/toolkit";

const isBrowser = typeof window !== "undefined";


const initialState = {
  name: "",
  description: "",
  department: "",
  start_date: "",
  end_date: "",
  image_url: "",
  id: isBrowser
  ? JSON.parse(localStorage.getItem("ProjectId")) || []
  : [],
  ProjectName:isBrowser
  ? JSON.parse(localStorage.getItem("ProjectName")) || []
  : [],
  ProjectStepperValue:""
};

const addProjectSlice = createSlice({
  name: "addProject",
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      // Update the form data in the state
      console.log(action.payload);
      
      return { ...state, ...action.payload };
      
    },
    updateId: (state, action) => {
      console.log("project d", action.payload);
      state.id = action.payload;

      let setProjectId = JSON.stringify(state.id);
      localStorage.setItem("ProjectId", setProjectId);
    },
    updateProjectName: (state, action) => {
      console.log("project d", action.payload);
      state.ProjectName = action.payload;

      let setProjectName = JSON.stringify(state.ProjectName);
      localStorage.setItem("ProjectName", setProjectName);
    },
    addStepperValue(state, action) {
      state.ProjectStepperValue = action.payload;
    console.log("toggleValue",action.payload)}
  },
});

export const { updateFormData, updateId,updateProjectName,addStepperValue } = addProjectSlice.actions;

export default addProjectSlice.reducer;
