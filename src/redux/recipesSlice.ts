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
import { PHO_URL } from "../services/phoBackend";

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

export interface createRecipePayload {
  accessToken: string;
  recipe: Recipe;
}

export interface editRecipePayload {
  accessToken: string;
  recipeID: string;
  newRecipe: Recipe;
}

export interface deleteRecipePayload {
  accessToken: string;
  recipeID: string;
}

const initialState: RecipesState = {
  recipes: [],
  loadingStatus: RecipeLoadingStatus.NOT_LOADED,
};

//----------- Thunk functions (async functions) see redux-thunk -----------//
// Get's all recipe data from the database and loads it into redux states
export const loadRecipes = createAsyncThunk("recipes/loadRecipes", async () => {
  try {
    const res = await axios.get(`${PHO_URL}recipes`);
    return res.data as Array<Recipe>;
  } catch (error) {
    console.log(`error: ${error}`);
    return Promise.reject(error);
  }
});

// Create a new recipe in the database and add to the redux state
export const createRecipe = createAsyncThunk(
  "recipes/createRecipe",
  async (payload: createRecipePayload) => {
    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${payload.accessToken}`,
          timeout: 30000,
          returnRejectedPromiseOnError: true,
        },
      };
      const res = await axios.post(
        `${PHO_URL}recipes`,
        payload.recipe,
        axiosConfig
      );
      console.log(res.status);
      return payload.recipe;
    } catch (error) {
      console.log(`error: ${error}`);
      return Promise.reject(error);
    }
  }
);

// Edit a recipe in the database and edit the redux state
export const editRecipe = createAsyncThunk(
  "recipes/editRecipe",
  async (payload: editRecipePayload) => {
    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${payload.accessToken}`,
          timeout: 30000,
          returnRejectedPromiseOnError: true,
        },
      };
      const res = await axios.put(
        `${PHO_URL}recipes/${payload.recipeID}`,
        payload.newRecipe,
        axiosConfig
      );
      console.log(res.status);
      return payload;
    } catch (error) {
      console.log(`error: ${error}`);
      return Promise.reject(error);
    }
  }
);

// Delete a recipe in the database and edit the redux state
export const deleteRecipe = createAsyncThunk(
  "recipes/deleteRecipe",
  async (payload: deleteRecipePayload) => {
    try {
      const axiosConfig = {
        headers: {
          Authorization: `Bearer ${payload.accessToken}`,
          timeout: 30000,
          returnRejectedPromiseOnError: true,
        },
      };
      const res = await axios.delete(
        `${PHO_URL}recipes/${payload.recipeID}`,
        axiosConfig
      );
      console.log(res.status);
      return payload;
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
    // loadRecipes
    builder.addCase(loadRecipes.fulfilled, (state, { payload }) => {
      state.recipes = payload;
      state.loadingStatus = RecipeLoadingStatus.LOADED;
    });
    builder.addCase(loadRecipes.rejected, (state) => {
      state.loadingStatus = RecipeLoadingStatus.ERROR;
    });
    // createRecipe
    builder.addCase(createRecipe.fulfilled, (state, { payload }) => {
      state.recipes.push(payload);
    });
    // editRecipe
    builder.addCase(editRecipe.fulfilled, (state, { payload }) => {
      state.recipes[
        state.recipes.findIndex((el) => el.id === payload.recipeID)
      ] = payload.newRecipe;
    });
    // deleteRecipe
    builder.addCase(deleteRecipe.fulfilled, (state, { payload }) => {
      const index = state.recipes.findIndex((el) => el.id === payload.recipeID);
      if (index > -1) {
        state.recipes.splice(index, 1);
      }
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
  clearRecipes,
  setRecipesLoadingStatus,
} = recipesSlice.actions;

export default recipesSlice.reducer;
