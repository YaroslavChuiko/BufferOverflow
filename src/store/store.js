import { configureStore } from '@reduxjs/toolkit';
import userSliceReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
  },
})