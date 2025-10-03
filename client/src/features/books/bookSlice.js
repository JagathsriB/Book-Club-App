// src/features/books/bookSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://book-club-server-v3ca.onrender.com';

const getConfig = (getState) => {
  const token = getState().auth.token;
  return { headers: { 'x-auth-token': token } };
};

// --- Async Thunks (fetchBooks and addBook are unchanged) ---
export const fetchBooks = createAsyncThunk('books/fetchBooks', async (_, thunkAPI) => {
  try {
    const config = getConfig(thunkAPI.getState);
    const response = await axios.get(API_URL, config);
    return response.data;
  } catch (error) { return thunkAPI.rejectWithValue(error.response.data.msg); }
});

export const addBook = createAsyncThunk('books/addBook', async (bookData, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const config = { headers: { 'Content-Type': 'multipart/form-data', 'x-auth-token': token } };
    const response = await axios.post(API_URL, bookData, config);
    return response.data;
  } catch (error) {
    const message = (error.response?.data?.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// --- NEW: deleteBook Thunk ---
export const deleteBook = createAsyncThunk('books/deleteBook', async (id, thunkAPI) => {
  try {
    const config = getConfig(thunkAPI.getState);
    await axios.delete(`${API_URL}/${id}`, config);
    return id; // Return the id to identify which book to remove
  } catch (error) {
    const message = (error.response?.data?.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// --- NEW: updateBook Thunk ---
export const updateBook = createAsyncThunk('books/updateBook', async (bookData, thunkAPI) => {
  try {
    const { id, ...updateData } = bookData;
    const config = getConfig(thunkAPI.getState);
    const response = await axios.put(`${API_URL}/${id}`, updateData, config);
    return response.data;
  } catch (error) {
    const message = (error.response?.data?.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// --- NEW: fetchPublicBooks Thunk ---
export const fetchPublicBooks = createAsyncThunk('books/fetchPublicBooks', async (_, thunkAPI) => {
  try {
    const response = await axios.get(`${API_URL}/all`);
    return response.data;
  } catch (error) {
    const message = (error.response?.data?.msg) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});


// --- Slice Definition ---
const bookSlice = createSlice({
  name: 'books',
  initialState: {
    items: [], // For the logged-in user's collection
    publicItems: [], // For the community page
    status: 'idle',
    publicStatus: 'idle',
    error: null,
  },
  reducers: {
    resetBooks: (state) => {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      .addCase(addBook.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      // --- NEW: Handle Deletion ---
      .addCase(deleteBook.fulfilled, (state, action) => {
        state.items = state.items.filter((book) => book._id !== action.payload);
      })
      // --- NEW: Handle Update ---
      .addCase(updateBook.fulfilled, (state, action) => {
        const index = state.items.findIndex((book) => book._id === action.payload._id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      // --- NEW: Cases for fetching public books ---
      .addCase(fetchPublicBooks.pending, (state) => {
        state.publicStatus = 'loading';
      })
      .addCase(fetchPublicBooks.fulfilled, (state, action) => {
        state.publicStatus = 'succeeded';
        state.publicItems = action.payload;
      })
      .addCase(fetchPublicBooks.rejected, (state, action) => {
        state.publicStatus = 'failed';
        state.error = action.payload;
      });
  },
});

export const { resetBooks } = bookSlice.actions;
export default bookSlice.reducer;