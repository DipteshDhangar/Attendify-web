import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../components/slices/authslice";
import courseReducer from "../components/slices/courseSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    course: courseReducer,
  },
});

export default store;
