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
import { PayloadAction, createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import axios from "axios";
import { ROOT_URL } from "../services/phoBackend";

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
  id: string;
  title: string;
  ingredients: {
    section1: {
      header: string;
      ingredients: Array<string>;
    };
    section2: {
      header: string;
      ingredients: Array<string>;
    };
    section3: {
      header: string;
      ingredients: Array<string>;
    };
    section4: {
      header: string;
      ingredients: Array<string>;
    };
    section5: {
      header: string;
      ingredients: Array<string>;
    };
  };
  instructions: {
    section1: {
      header: string;
      instructions: Array<string>;
    };
    section2: {
      header: string;
      instructions: Array<string>;
    };
    section3: {
      header: string;
      instructions: Array<string>;
    };
    section4: {
      header: string;
      instructions: Array<string>;
    };
    section5: {
      header: string;
      instructions: Array<string>;
    };
  };
  tags: Array<RecipeTags>;
  calories: number;
  authorID: string; // mongo object ID of the user who added this recipe
  dateAdded: Date;
  sourceURL: string;
  description: string;
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

// Thunk functions (async functions) see redux-thunk
// Get's all recipe data from the database and loads it into redux states
// returns true if successful, false if an error occurred.
export const getAndLoadRecipes = createAsyncThunk(
  "recipes/getAndLoadRecipes",
  async () => {
    try {
      const res = await axios.get(`${ROOT_URL}/recipes`);
      return res.data as Array<Recipe>;
    } catch (error) {
      console.log(`error: ${error}`);
      return Promise.reject(error);
    }
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(getAndLoadRecipes.fulfilled, (state, { payload }) => {
      state.recipes = payload;
      state.loadingStatus = RecipeLoadingStatus.LOADED;
    });
    builder.addCase(getAndLoadRecipes.rejected, (state) => {
      state.loadingStatus = RecipeLoadingStatus.ERROR;
    });
  },
});

export const selectRecipes = (state: RootState): Array<Recipe> =>
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
