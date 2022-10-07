import { createSlice } from '@reduxjs/toolkit';
import { isLoggedIn, logOut } from '../thunks/userThunk';

const initialState = {
  loading: false,
  loggedIn: false,
  userData: null,
  pageSize: JSON.parse(localStorage.getItem('pageSize')) || 5,  
  watchedTags: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.loggedIn = true;
      state.userData = action.payload;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload.pageSize;
    },
  },
  extraReducers: {
    [isLoggedIn.pending]: (state) => {
      state.loading = true;
    },
    [isLoggedIn.fulfilled]: (state, action) => {
      state.loggedIn = action.payload.success;
      state.userData = action.payload.user;
      state.loading = false;
    },
    [isLoggedIn.rejected]: (state) => {
      state.loggedIn = false;
      state.userData = null;
      state.loading = false;
    },
    [logOut.pending]: (state) => {
      state.loading = true;
    },
    [logOut.fulfilled]: (state, action) => {
      state.loggedIn = false;
      state.userData = null;
      state.loading = false;
    },
    [logOut.rejected]: (state) => {
      state.loading = false;
    },
  },
});

export default userSlice.reducer;
