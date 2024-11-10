import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import articleSlice from "./features/articleSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    article: articleSlice,
  },
});
