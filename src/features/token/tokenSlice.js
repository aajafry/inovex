import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    token: {},
};

export const tokenSlice = createSlice({
  name: "authToken",
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.token = action.payload;
    },
  },
});

export const { setAuthToken } =
tokenSlice.actions;
export default tokenSlice.reducer;