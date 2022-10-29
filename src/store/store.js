import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/apiSlice';
import userSliceReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(apiSlice.middleware),
});
