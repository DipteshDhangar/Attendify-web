// redux/slices/courseSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCourseId: null,
};

export const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    setSelectedCourseId: (state, action) => {
      state.selectedCourseId = action.payload;
    },
    clearSelectedCourseId: (state) => {
      state.selectedCourseId = null;
    },
  },
});

export const { setSelectedCourseId, clearSelectedCourseId } =
  courseSlice.actions;

export default courseSlice.reducer;
