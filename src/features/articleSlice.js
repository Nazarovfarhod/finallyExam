import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  articles: null,
  allArticles: null,
  totalArticles: 0,
  filtredArticle: null,
};

export const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    setArticle: (state, { payload }) => {
      state.articles = payload;
    },
    setTotalArticles: (state, { payload }) => {
      state.totalArticles = payload;
    },
    setAllArticles: (state, { payload }) => {
      state.allArticles = payload;
    },
    setFiltredArticle: (state, { payload }) => {
      state.filtredArticle = payload;
    },
  },
});

export const {
  setArticle,
  setTotalArticles,
  setAllArticles,
  setFiltredArticle,
} = articleSlice.actions;
export default articleSlice.reducer;
