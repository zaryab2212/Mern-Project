import {
  createAsyncThunk,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import {  checkAuth, createUser,loginUser,signOut } from "./authAPI";
import { updateUser } from "../user/userAPI";
const initialState = {
  loggedInUserToken: null,
  value: 0,
  status: "idle",
  error: null,
  userChecked: false
};

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (logininfo, { isRejectedWithValue }) => {
    try {
      const response = await loginUser(logininfo);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch (error) {
      console.log(error);
      return isRejectedWithValue(error);
    }
  }
);
export const checkAuthAsync = createAsyncThunk(
  "user/checkAuth",
  async () => {
    try {
      const response = await checkAuth()
   
      return response.data;
    } catch (error) {
      console.log(error);
     
    }
  }
);



export const createUserAsync = createAsyncThunk(
  "user/createUser",
  async (userData) => {
    const response = await createUser(userData);

    return response.data;
  }
);
// export const updateUserAsync = createAsyncThunk(
//   "user/updateUser",
//   async (update)=>{
//     const response =await updateUser(update)
//     return response.data
//   }

export const signOutAsync = createAsyncThunk("user/signOut", async (userId) => {
  const response = await signOut(userId);
  return response.data;
});

export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.loggedInUserToken = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      // .addCase(updateUserAsync.fulfilled,(state,action) => {
      //   state.status = "idle"
      //   state.loggedInUserToken = action.payload;
      // })
      // .addCase(updateUserAsync,(state,action) => {
      //   state.status = "loading"

      // })
      .addCase(signOutAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = null;
      })
      .addCase(signOutAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUserToken = action.payload;
        state.userChecked = true
      })
      .addCase(checkAuthAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userChecked= true
      });
  },
});

export const { increment } = authSlice.actions;
export const selectUserChecked = (state)=> state.auth.userChecked;

export const selectLogedInUser = (state) => state.auth.loggedInUserToken;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
