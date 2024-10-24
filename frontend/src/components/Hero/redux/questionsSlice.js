import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to generate questions
export const generateQuestions = createAsyncThunk(
  "questions/generateQuestions",
  async (requestData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/questions/generate",
        requestData,
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

export const fetchLatestGeneratedQuestions = createAsyncThunk(
  "questions/fetchLatestGeneratedQuestions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/questions/retrieve_latest/latest",
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);

const questionsSlice = createSlice({
  name: "questions",
  initialState: {
    questions: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(generateQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(generateQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload.questions;
      })
      .addCase(generateQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.detail || action.error.message;
      });

    builder
      .addCase(fetchLatestGeneratedQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLatestGeneratedQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(fetchLatestGeneratedQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.detail || action.error.message;
      });
  },
});

export const selectQuestions = (state) => state.questions.questions;
export const selectLoading = (state) => state.questions.loading;
export const selectError = (state) => state.questions.error;

export default questionsSlice.reducer;
