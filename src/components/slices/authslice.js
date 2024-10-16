// src/store/authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null, // Change this to store the entire user object
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload; // Store the entire user object
    },
    clearUser: (state) => {
      state.user = null; // Clear the user object
    },
  },
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
