import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../auth/authSlice";
import questionsReducer from "../components/Hero/redux/questionsSlice";
import metadataReducer from "../components/ProfileMenuItems/Genrations/redux/questionsMetaDataSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    questions: questionsReducer,
    metadata: metadataReducer,
  },
});

export default store;
