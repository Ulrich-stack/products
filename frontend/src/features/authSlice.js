import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const login = createAsyncThunk('auth/login', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/login', userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
});

export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.post('http://localhost:5000/api/auth/register', userData);
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      return rejectWithValue(error.response.data);
    } else {
      return rejectWithValue({ message: 'An unknown error occurred' });
    }
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    error: null,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload.message : 'An unknown error occurred';
    },
    [registerUser.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload ? action.payload.message : 'An unknown error occurred';
    },
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
