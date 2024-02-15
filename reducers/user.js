import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { isConnected: null, username: null },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.value.isConnected = action.payload.isConnected;
      state.value.username = action.payload.username;
    },
    logout: (state) => {
      state.value.isConnected = null;
      state.value.username = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
