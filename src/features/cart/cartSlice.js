import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart,deleteFromCart,fetchItemsByUserId, updateCart } from './cartAPI';

const initialState = {
  value: 0,
  status: 'idle',
  items:[],
};

export const addToCartAsync = createAsyncThunk(
  'cart/addToCart',
  async (userId) => {
    const response = await addToCart(userId);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async(update)=>{
    const response = await updateCart(update);
    return response.data
  }
)

 export const fetchItemsByUserIdAsync = createAsyncThunk(
'cart/fetchItemsByUserId',
async (userId) => {
  const response = await fetchItemsByUserId(userId);
  // The value we return becomes the `fulfilled` action payload
  return response.data;
}

);
export const deleteFromCartAsync = createAsyncThunk(
 'cart/deleteFromCart',
 async(id)=>{
   const response = await deleteFromCart(id);
   return response.data
 }
)

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload);
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
      })
      .addCase(updateCartAsync.fulfilled, (state,action) => {
        state.status = "idle"
        const index = state.items.findIndex(item=> item.id === action.payload.id)
        state.items[index] = action.payload
      })
      .addCase(updateCartAsync.pending,(state,action)=>{
        state.status = "loading";
        
      })
      .addCase(deleteFromCartAsync,(state,action)=>{
        state.status = "loading"
      })
      .addCase(deleteFromCartAsync.fulfilled, (state,action)=>{
       const index = state.items.findIndex((e)=> e.id ===action.payload)

        state.items.splice(index,1)
      })
  },
});

export const { increment } = cartSlice.actions;

export const selectitems = (state) => state.cart.items;

export default cartSlice.reducer;
