import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../lib/axios';

export const isLoggedIn = createAsyncThunk('user/isLoggedIn', async (_, { rejectWithValue }) => {
  try {
    const response = await api.get('auth/isLoggedIn');
    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue('');
  }
});

export const logOut = createAsyncThunk('user/logOut', async () => {
  try {
    const response = await api.post('auth/logout');

    // return response.data;
  } catch (error) {
    console.log(error)
    return rejectWithValue('');
  }
})
