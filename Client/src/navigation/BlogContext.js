// BlogContext.js
import React, { createContext, useContext, useReducer } from "react";

const BlogContext = createContext();

export const useBlogContext = () => {
  return useContext(BlogContext);
};

const initialState = {
  favoriteBlogs: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_FAVORITE":
      const { blog } = action.payload;
      const isFavorite = state.favoriteBlogs.some((b) => b.id === blog.id);
      return {
        ...state,
        favoriteBlogs: isFavorite
          ? state.favoriteBlogs.filter((b) => b.id !== blog.id)
          : [...state.favoriteBlogs, blog],
      };
    default:
      return state;
  }
};

export const BlogProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <BlogContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
};
