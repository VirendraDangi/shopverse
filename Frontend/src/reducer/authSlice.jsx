import { createSlice } from '@reduxjs/toolkit';
const storedUser = JSON.parse(localStorage.getItem("loggedInUser"));

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: storedUser || null,
    isAuthenticated: !!storedUser,
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
