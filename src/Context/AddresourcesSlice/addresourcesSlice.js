"use client";
import { createSlice } from "@reduxjs/toolkit";
const addresourcesSlice = createSlice({
  name: "addResource",
  initialState: {
    id: [],
    // UIUXDeveloper: [],
    // FrontEndDeveloper: [],
    // BackendDeveloper: [],
    // SRE: [],
    // DevOpsEngineer: [],
    // AutomationTester: [],
    // ProjectManager: [],
    // UXDesigner: [],
    // UIDeveloper: [],
    // APIDeveloper: [],
    Tester: [],
    // UXResearcher: [],
    // CICDSpecialist: [],
  },

  reducers: {
    // addResources: (state, action) => {
    //   state.Tester.push(action.payload.id); // Pushing the payload ID to the id array
    // //   state.Tester = action.payload.Tester;
    //   console.log(action.payload.Tester) // Updating the Tester array with the payload Tester data
    // },
    addResources: (state, action) => {
      const { id } = action.payload;
      // Check if the id already exists in the array

      state.Tester.push(id);

      console.log(action.payload);
    },

    removeResources: (state, action) => {
      // Removing the specified ID from the id array
      state.id = state.id.filter((id) => id !== action.payload.id);
      // Clearing the Tester array
      state.Tester = [];
      console.log(action.payload.Tester);
    },
  },
});

export const { addResources, removeResources } = addresourcesSlice.actions;
export default addresourcesSlice.reducer;
