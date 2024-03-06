import { createSlice } from "@reduxjs/toolkit";

const isBrowser = typeof window !== 'undefined';
const initialState = {
  useCaseId:isBrowser ? JSON.parse(localStorage.getItem("useCaseId")) || [] : [],
  StagesNames:""
};

const useCaseSlice = createSlice({
  name: "useCaseSlice",
  initialState,
  reducers: {
    addUsecaseId(state, action) {
      state.useCaseId = action.payload;
      

      let setUseCaseId = JSON.stringify(state.useCaseId);
      localStorage.setItem("useCaseId", setUseCaseId);
    },
    addStagesName(state, action) {
      state.StagesNames = action.payload;
    console.log(action.payload)}
  },
});

export default useCaseSlice.reducer;
export const { addUsecaseId,addStagesName } = useCaseSlice.actions;
