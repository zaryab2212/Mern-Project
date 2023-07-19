import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts,fetchBrands,fetchCategories,fetchProductsByFilters } from './productAPI';

const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: 'idle',
  totalItems: 0,
};


export const fetchAllProductsAsync = createAsyncThunk(
  'product/fetchAllProducts',
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({filter, sort, pagination}) => {
    const response = await fetchProductsByFilters(filter,sort,pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);
export const fetchBrandsAsync = createAsyncThunk(
  'product/fetchBrands',
  async () => {
    const response = await fetchBrands();
    return response.data;
  }
);
export const fetchCategoriesAsync = createAsyncThunk(
  'product/fetchCategories',
  async () => {
    const response = await fetchCategories();
    return response.data;
  }
);



export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.brands = action.payload
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategoriesAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.categories = action.payload
      })
      .addCase(fetchCategoriesAsync.pending, (state) => {
        state.status = 'loading';
      })
  },
});

export const { increment } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selecttotalItems = (state) => state.product.totalItems;
export const selectcategories = (state) => state.product.categories;
export const selectBrands = (state) => state.product.brands;

export default productSlice.reducer;
