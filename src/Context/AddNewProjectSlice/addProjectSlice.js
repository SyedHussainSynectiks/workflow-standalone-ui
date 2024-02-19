import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projectName: '',
  projectDescription: '',
  projectDepartment: '',
  startDate: '',
  endDate: '',
};

const addProjectSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateFormData: (state, action) => {
      return { ...state, ...action.payload };
      console.log(state)
    },
    resetFormData: (state) => initialState,
  },
});

export const { updateFormData, resetFormData } = addProjectSlice.actions;
export default addProjectSlice.reducer;