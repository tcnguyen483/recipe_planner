/*
 * Redux store for the app.
 * Import and list all redux reducers for the app here.
 *
 * Followed this guide:
 *   https://redux-toolkit.js.org/tutorials/typescript
 */
import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "../redux/recipesSlice";
import userCollectionReducer from "../redux/userCollectionSlice";

const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    userCollection: userCollectionReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
