import { createSlice } from '@reduxjs/toolkit';

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
    unsetUser: (state, action) => {
      state.loggedIn = false;
      state.userData = null;
    },
    checkIsLoggedIn: (state, action) => {
      state.loggedIn = action.payload.success;
      state.userData = action.payload.user;
    },
    setPageSize: (state, action) => {
      state.pageSize = action.payload.pageSize;
    },
  },
});

export default userSlice.reducer;
