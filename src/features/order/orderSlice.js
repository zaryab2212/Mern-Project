import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchCount } from './orderAPI';
// import Order from './order';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder: null,
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
    resetOrders: (state)=>{
      state.currentOrder = null
    }
  },

  extraReducers: (builder) => {
    builder
    .addCase(createOrderAsync.fulfilled, (state,action)=>{
        state.status = "idle"
        state.orders.push(action.payload)
        state.currentOrder= action.payload

      })
      .addCase(createOrderAsync.pending,(state,action)=>{
        state.status = "loading"
      })
  },
});

export const { resetOrders } = orderSlice.actions;

export const selectcurrentOrder = (state) => state.order.currentOrder;

export default orderSlice.reducer;
