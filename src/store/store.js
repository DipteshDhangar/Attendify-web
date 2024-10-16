import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../components/slices/authslice";

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
