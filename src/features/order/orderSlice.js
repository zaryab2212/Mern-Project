import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createOrder, fetchAllOrders, updateOrder} from './orderAPI';
// import Order from './order';

const initialState = {
  orders: [],
  status: 'idle',
  currentOrder: null,
  totalOrders: 0
};



export const createOrderAsync = createAsyncThunk(
  "order/createOrder",
  async (order)=>{
    const response = await createOrder(order);
    return response.data 
  }

)

export const updateOrderAsnyc = createAsyncThunk(
  'order/updateOrder',
  async(order)=>{
    const response = await updateOrder(order)
    return response.data
  }
)

export const fetchAllOrdersAsync = createAsyncThunk(
  "order/fetchAllOrders",
  async (pagination)=>{
    const response = await fetchAllOrders(pagination);
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
    .addCase(fetchAllOrdersAsync.fulfilled, (state,action)=>{
        state.status = "idle"
        state.orders =action.payload.orders
        state.totalOrders =action.payload.totalOrders
   

      })
      .addCase(fetchAllOrdersAsync.pending,(state,action)=>{
        state.status = "loading"
      })
    .addCase(updateOrderAsnyc.fulfilled, (state,action)=>{
      state.status = "idle"
      const index = state.orders.findIndex(order=>order.id === action.payload.id)
      state.orders[index] = action.payload  
      
       
   

      })
      .addCase(updateOrderAsnyc.pending,(state,action)=>{
        state.status = "loading"
      })
  },
});

export const { resetOrders } = orderSlice.actions;

export const selectcurrentOrder = (state) => state.order.currentOrder;
export const selectOrders = (state) => state.order.orders;
export const selecttotalOrder = (state) => state.order.totalOrders;

export default orderSlice.reducer;




