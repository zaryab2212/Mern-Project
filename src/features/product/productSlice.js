import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProduct,updateProduct,  fetchAllProducts,fetchBrands,fetchCategories,fetchProductById,fetchProductsByFilters } from './productAPI';

const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: 'idle',
  totalItems: 0,
  selectedProduct: null,
};

//  export const fetchAllProductsAsync = createAsyncThunk(   'product/fetchAllProducts',   async () => {
//     const response = await fetchAllProducts();  
//       //  The value we return becomes the `fulfilled` action payload
//     return response.data;
//    }
// );
 export const fetchAllProductByIdAsync = createAsyncThunk(
  'product/fetchProductById',
  async (id) => {
   const response = await fetchProductById(id)
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
 )
export const fetchProductsByFiltersAsync = createAsyncThunk(
  'product/fetchProductsByFilters',
  async ({filter, sort, pagination,admin}) => {
    const response = await fetchProductsByFilters(filter,sort,pagination,admin);
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
export const createProductAsync = createAsyncThunk(
  'product/createProduct',
async (product)=>{
   const reponse = await createProduct(product)
   return reponse.data
}
)
export const updateProductAsync = createAsyncThunk(
  'product/updateProduct',
async (update)=>{
   const reponse = await updateProduct(update)
   return reponse.data
}
)



export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    clearSelectedProduct:(state)=>{
      state.selectedProduct = null
    }
  },
  extraReducers: (builder) => {
    builder
      //  .addCase(fetchAllProductsAsync.pending, (state) => {
      //    state.status = 'loading';
      // })
      //  .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
      //  state.status = 'idle';
      //   state.products = action.payload;
      // })
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
      .addCase(fetchAllProductByIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.selectedProduct = action.payload
      })
      .addCase(fetchAllProductByIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createProductAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products.push(action.payload)
      })
      .addCase(createProductAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        const index =  state.products.findIndex((p)=>p.id ===action.payload.id)
      state.products[index] = action.payload
        state.status = 'idle';
      })
      .addCase(updateProductAsync.pending, (state) => {
        state.status = 'loading';
      })
  },
});

export const { clearSelectedProduct } = productSlice.actions;

export const selectAllProducts = (state) => state.product.products;
export const selecttotalItems = (state) => state.product.totalItems;
export const selectcategories = (state) => state.product.categories;
export const selectBrands = (state) => state.product.brands;
export const selectProductById = (state) => state.product.selectedProduct;

export default productSlice.reducer;
