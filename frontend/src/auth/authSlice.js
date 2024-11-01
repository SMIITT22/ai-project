import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  isSubscribed: false,
  freeGenerationCount: 0,
  status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed'
  loading: true,
  error: null,
};

export const signupUser = createAsyncThunk(
  "auth/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/signup",
        userData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/auth/login",
        userData,
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post(
        "http://127.0.0.1:8000/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const checkUserStatus = createAsyncThunk(
  "auth/checkUserStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/auth/status", {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Unable to authenticate user"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isSubscribed = false;
      state.freeGenerationCount = 0;
      state.status = "idle";
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signupUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.status = "succeeded";
        state.loading = false;
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.detail || action.error.message;
        state.loading = false;
      })
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isSubscribed = action.payload.user.is_subscribed;
        state.freeGenerationCount = action.payload.user.free_generation_count;
        state.status = "succeeded";
        state.loading = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.detail || action.error.message;
        state.loading = false;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isSubscribed = false;
        state.freeGenerationCount = 0;
        state.status = "idle";
        state.loading = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload?.detail || action.error.message;
        state.loading = false;
      })
      .addCase(checkUserStatus.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(checkUserStatus.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isSubscribed = action.payload.user.is_subscribed;
        state.freeGenerationCount = action.payload.user.free_generation_count;
        state.status = "succeeded";
        state.loading = false;
      })
      .addCase(checkUserStatus.rejected, (state) => {
        state.status = "idle";
        state.user = null;
        state.isSubscribed = false;
        state.freeGenerationCount = 0;
        state.loading = false;
      });
  },
});

export const selectIsAuthenticated = createSelector(
  (state) => state.auth.user,
  (user) => user !== null
);
export const selectLoading = (state) => state.auth.loading;
export const selectUser = (state) => state.auth.user;
export const selectIsSubscribed = (state) => state.auth.isSubscribed;
export const selectFreeGenerationCount = (state) =>
  state.auth.freeGenerationCount;

export const { logout } = authSlice.actions;
export default authSlice.reducer;
