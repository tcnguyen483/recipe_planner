/* eslint-disable no-unused-vars */
/*
 * Code related to the recipe planner backend which handles changes to the mongo database.
 */

// export const PHO_URL = "http://localhost:9090"; // FOR DEV ONLY
export const PHO_URL = "https://recipe-planner-pho.herokuapp.com/";

export enum Meal {
  BREAKFAST = "Breakfast",
  LUNCH = "Lunch",
  DINNER = "Dinner",
  DESSERT = "Dessert",
  SNACK = "Snack",
}

export interface PhoUserData {
  auth0ID: string;
  savedRecipeIDs: Array<string>;
  recipeHistory: Array<RecordedRecipe>;
}

export interface RecordedRecipe {
  recipeID: string;
  date: Date;
  meal: Meal;
}

export enum PhoScopes {
  READ_ALL_USERS = "read:all_users",
  CREATE_USER = "create:user",
  DELETE_USER = "delete:user",
  READ_CURRENT_USER = "read:current_user",
  UPDATE_CURRENT_USER = "update:current_user",
  DELETE_RECIPE = "delete:recipe",
  UPDATE_RECIPE = "update:recipe",
}
