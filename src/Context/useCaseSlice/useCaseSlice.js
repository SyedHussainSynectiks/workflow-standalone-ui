import { createSlice } from "@reduxjs/toolkit";
const isBrowser = typeof window !== 'undefined';
const initialState = {
  useCaseId: isBrowser ? JSON.parse(localStorage.getItem("useCaseId")) || [] : [],
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
  },
});

export default useCaseSlice.reducer;
export const { addUsecaseId } = useCaseSlice.actions;
