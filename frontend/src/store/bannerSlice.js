import { createSlice } from "@reduxjs/toolkit";

const bannerSlice = createSlice({
  name: "banner",
  initialState: {
    title: "",
  },
  reducers: {
    setBannerData: (state, action) => {
      state.title = action.payload.title;
    },
    clearBannerData: (state) => {
      state.title = "";
    },
  },
});

export const { setBannerData, clearBannerData } = bannerSlice.actions;
export default bannerSlice.reducer;
