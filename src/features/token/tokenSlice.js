import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
};

export const tokenSlice = createSlice({
  name: "authToken",
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
    clearAuthToken: (state) => {
      state.token = null;
    },
  },
});

export const { setAuthToken, clearAuthToken } = tokenSlice.actions;
export default tokenSlice.reducer;
