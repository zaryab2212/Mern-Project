import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {  checkUser, createUser} from './authAPI';
import { updateUser } from '../user/userAPI';
const initialState = {
  loggedInUser: null,
  value: 0,
  status: 'idle',
  error:null,

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
  async (userData) => {
    const response = await createUser(userData);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const updateUserAsync = createAsyncThunk(
  "user/updateUser",
  async (update)=>{
    const response =await updateUser(update)
    return response.data
  }
)

export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.loggedInUser = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(updateUserAsync.fulfilled,(state,action) => {
        state.status = "idle"
        state.loggedInUser = action.payload;
      })
      .addCase(updateUserAsync,(state,action) => {
        state.status = "loading"
        
      })
  },
});

export const { increment  } = authSlice.actions;

export const selectLogedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
