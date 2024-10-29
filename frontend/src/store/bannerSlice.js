// src/store/bannerSlice.js
import { createSlice } from "@reduxjs/toolkit";

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    title: "",
    subtitle: "",
    backgroundImage: "",
  },
  reducers: {
    setBannerData: (state, action) => {
      state.title = action.payload.title;
      state.subtitle = action.payload.subtitle;
      state.backgroundImage = action.payload.backgroundImage;
    },
    clearBannerData: (state) => {
      state.title = "";
      state.subtitle = "";
      state.backgroundImage = "";
    },
  },
});

export const { setBannerData, clearBannerData } = bannerSlice.actions;
export default bannerSlice.reducer;
