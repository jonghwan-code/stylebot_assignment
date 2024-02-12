import { createSlice } from "@reduxjs/toolkit";
import { ImageProps } from "../types/types";

const initialState: ImageProps[] = [];

export const bookmarkSlice = createSlice({
  name: "bookmark",
  initialState,
  reducers: {
    addBookmark: (state, action) => {
      state.push(action.payload);
    },
    removeBookmark: (state, action) => {
      const index = state.findIndex((img) => img.image_url === action.payload);
      state.splice(index, 1);
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;

export default bookmarkSlice.reducer;
