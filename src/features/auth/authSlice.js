import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  checkUser, createUser} from './authAPI';

const initialState = {
  loggedIn: null,
  value: 0,
  status: 'idle',
  error:null
};

export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (logininfo) => {
    const response = await checkUser(logininfo);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (c) => {
    const response = await createUser(c);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.loggedIn = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedIn = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.loggedIn = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedIn = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
  },
});

export const { increment  } = authSlice.actions;

export const selectLogedInUser = (state) => state.auth.loggedIn;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
