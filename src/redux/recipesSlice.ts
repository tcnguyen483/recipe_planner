/*
 * Redux logic for all of the recipe cards data.
 *
 * See these guides:
 *   https://redux-toolkit.js.org/usage/usage-with-typescript
 *   https://redux-toolkit.js.org/tutorials/typescript
 */

// eslint-disable-next-line no-unused-vars
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";

export enum RecipeLoadingStatus {
  NOT_LOADED = "Not Loaded", // eslint-disable-line no-unused-vars
  LOADING = "Loading", // eslint-disable-line no-unused-vars
  LOADED = "Loaded", // eslint-disable-line no-unused-vars
  ERROR = "Error", // eslint-disable-line no-unused-vars
}

export interface Recipe {
  title: string;
  ingredients: Array<string>;
  instructions: Array<string>;
  dateAdded: Date;
  sourceURL: string;
  description?: string;
}

// define a type for the slice states
interface RecipesState {
  recipes: Array<Recipe>;
  loadingStatus: RecipeLoadingStatus;
}

const initialState: RecipesState = {
  recipes: [],
  loadingStatus: RecipeLoadingStatus.NOT_LOADED,
};

const recipesSlice = createSlice({
  name: "recipes",
  initialState: initialState,
  reducers: {
    setRecipes: (state, action: PayloadAction<Array<Recipe>>) => {
      state.recipes = action.payload;
    },
    pushRecipes: (state, action: PayloadAction<Recipe>) => {
      state.recipes.push(action.payload);
    },
    clearRecipes: (state) => {
      state.recipes = [];
      state.loadingStatus = RecipeLoadingStatus.NOT_LOADED;
    },
    setRecipesLoadingStatus: (
      state,
      action: PayloadAction<RecipeLoadingStatus>
    ) => {
      state.loadingStatus = action.payload;
    },
  },
});

export const selectData = (state: RootState): Array<Recipe> =>
  state.recipes.recipes;
export const selectRecipesLoadingStatus = (
  state: RootState
): RecipeLoadingStatus => state.recipes.loadingStatus;

export const {
  setRecipes,
  pushRecipes,
  clearRecipes,
  setRecipesLoadingStatus,
} = recipesSlice.actions;

export default recipesSlice.reducer;
