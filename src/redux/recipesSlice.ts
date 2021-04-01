/* eslint-disable sort-imports */
/* eslint-disable no-unused-vars */
/*
 * Redux logic for all of the recipe cards data.
 *
 * See these guides:
 *   https://redux-toolkit.js.org/usage/usage-with-typescript
 *   https://redux-toolkit.js.org/tutorials/typescript
 */

// eslint-disable-next-line no-unused-vars
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { ROOT_URL } from "../services/phoBackend";
import type { RootState } from "../app/store";

export enum RecipeLoadingStatus {
  ERROR = "Error",
  LOADED = "Loaded",
  LOADING = "Loading",
  NOT_LOADED = "Not Loaded",
}

export enum RecipeTags {
  BEEF = "beef",
  CHICK = "chicken",
  DAIRY = "dairy",
  DUCK = "duck",
  FISH = "fish",
  GF = "gluten free",
  HALAL = "halal",
  KOSHER = "kosher",
  PEANUT = "contains peanuts",
  PORK = "pork",
  SOY = "soy",
  TNUT = "contains tree nuts",
  VEGAN = "vegan",
  VEGE = "vegetarian",
  VENISON = "venison",
}

export interface Recipe {
  title: string;
  ingredients: Array<string>;
  instructions: Array<string>;
  tags: Array<RecipeTags>;
  calories: number;
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

export const selectRecipes = (state: RootState): Array<Recipe> =>
  state.recipes.recipes;
export const selectRecipesLoadingStatus = (
  state: RootState
): RecipeLoadingStatus => state.recipes.loadingStatus;

export const getRecipes = async (): Promise<Array<Recipe> | null> => {
  try {
    const res = await axios.get(`${ROOT_URL}/recipes`);
    return res.data as Array<Recipe>;
  } catch (error) {
    console.log(`error: ${error}`);
    return null;
  }
};

export const {
  setRecipes,
  pushRecipes,
  clearRecipes,
  setRecipesLoadingStatus,
} = recipesSlice.actions;

export default recipesSlice.reducer;
