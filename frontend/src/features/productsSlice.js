import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await axios.get('/products');
  return response.data;
});

export const addProduct = createAsyncThunk('products/addProduct', async (product) => {
  const response = await axios.post('/products', product);
  return response.data;
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (product) => {
  const response = await axios.put(`/products/${product._id}`, product);
  return response.data;
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId) => {
  await axios.delete(`/products/${productId}`);
  return productId;
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
    types: [],
  },
  reducers: {
    initializeTypes: (state) => {
      const types = state.items.map((item) => item.type);
      state.types = [...new Set(types)];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        const types = state.items.map((item) => item.type);
        state.types = [...new Set(types)];
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.items.push(action.payload);
        const types = state.items.map((item) => item.type);
        state.types = [...new Set(types)];
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const index = state.items.findIndex((product) => product._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
        const types = state.items.map((item) => item.type);
        state.types = [...new Set(types)];
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.items = state.items.filter((product) => product._id !== action.payload);
        const types = state.items.map((item) => item.type);
        state.types = [...new Set(types)];
      });
  },
});

export const { initializeTypes } = productsSlice.actions;

export const selectItems = (state) => state.products.items;
export const selectTypes = (state) => state.products.types;

export default productsSlice.reducer;
