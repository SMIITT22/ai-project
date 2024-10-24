import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuestionMetadata = createAsyncThunk(
  "questions/fetchQuestionMetadata",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/questions/retrieve_metadata/",
        { withCredentials: true }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "An error occurred");
    }
  }
);
const metadataSlice = createSlice({
  name: "metadata",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchQuestionMetadata.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchQuestionMetadata.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchQuestionMetadata.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default metadataSlice.reducer;
