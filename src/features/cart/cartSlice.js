import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart,deleteFromCart,fetchItemsByUserId, resetCart, updateCart } from './cartAPI';

const initialState = {
  value: 0,
  status: 'idle',
  items:[],
  cartChecked : false,
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
async () => {
  const response = await fetchItemsByUserId();
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
export const resetCartAsync = createAsyncThunk(
  "cart/restCart",
  async()=>{
    const response = await resetCart()
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
        state.cartChecked = false
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload;
        state.cartChecked = true
      })
      .addCase(fetchItemsByUserIdAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.cartChecked = true
      })
      .addCase(updateCartAsync.fulfilled, (state,action) => {
        state.status = "idle"
        const index = state.items?.findIndex(item=> item.id === action.payload.id)
        state.items[index] = action.payload
      })
      .addCase(updateCartAsync.pending,(state,action)=>{
        state.status = "loading";
        
      })
      .addCase(deleteFromCartAsync,(state,action)=>{
        state.status = "loading"
      })
      .addCase(deleteFromCartAsync.fulfilled, (state,action)=>{
       const index = state.items.findIndex((e)=> e.id ===action.payload.id)

        state.items.splice(index,1)
      })
      .addCase(resetCartAsync.fulfilled,(state,action)=>{
        state.items = []
        state.status = "idle"
      }
      )
      .addCase(resetCartAsync.pending,(state,action)=>{
        
        state.status = "loading"
      }
      )
  },
});

export const { increment } = cartSlice.actions;

export const selectitems = (state) => state.cart.items;
export const selectCartLoaded = (state) => state.cart.cartChecked

export default cartSlice.reducer;
