import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";
import questionsReducer from "../components/Hero/redux/questionsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionsReducer,
  },
});

export default store;
