import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react';



const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    userId: localStorage.getItem('userId') || null
  },
  reducers: {
    setCredentials: (state, action) => {
      console.log("Setting credentials:", action.payload);
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.userId = action.payload.user.sub;
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', state.token);
      localStorage.setItem('userId', action.payload.user.sub);
    }, 
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.userId = null;
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
    }
}
});

export const { setCredentials, logout } = authSlice.actions
export default authSlice.reducer