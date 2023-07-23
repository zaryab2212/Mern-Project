import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchCount } from './orderAPI';
// import Order from './order';

const initialState = {
  orders: [],
  status: 'idle',
};



export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order)=>{
    const response = await createOrder(order);
    return response.data 
  }

)

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(createOrderAsync.fulfilled, (state,action)=>{
        state.status = "idle"
        state.orders.push(action.payload)

      })
      .addCase(createOrderAsync.pending,(state,action)=>{
        state.status = "loading"
      })
  },
});

export const { increment } = orderSlice.actions;

export const selectCount = (state) => state.counter.value;

export default orderSlice.reducer;
