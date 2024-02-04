import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  praimaryColor: "#92C7CF",
  secondaryColor: "#AAD7D9",
  textColor: "#FBF9F1",
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setPraimaryColor: (state, action) => {
      state.praimaryColor = action.payload;
    },
    setSecondaryColor: (state, action) => {
      state.secondaryColor = action.payload;
    },
    setTextColor: (state, action) => {
      state.textColor = action.payload;
    },
  },
});

export const { setPraimaryColor, setSecondaryColor, setTextColor } =
  themeSlice.actions;
export default themeSlice.reducer;
