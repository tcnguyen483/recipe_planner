/*
 * App
 *
 * Container component for the main application.
 */

import React from "react";
import RecipeCard from "./recipe/recipeCard";

const testIngredients = ["ing1", "ing2", "ing3", "ing4"];
const testInstructions = ["ins1", "ins2", "ins3", "ins4"];

const App = (): JSX.Element => {
  return <RecipeCard title="test title" ingredients={testIngredients} instructions={testInstructions}/>;
};

export default App;