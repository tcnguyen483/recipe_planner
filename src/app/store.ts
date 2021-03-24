/*
 * Redux store for the app.
 * Import and list all redux reducers for the app here.
 *
 * Followed this guide:
 *   https://redux-toolkit.js.org/tutorials/typescript
 */
import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "../redux/recipesSlice";

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
