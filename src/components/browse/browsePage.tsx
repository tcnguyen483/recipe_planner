/*
 * Page to browse through all of the recipe cards on the site.
 * 
 */
import { Paper, Theme, createStyles, makeStyles } from "@material-ui/core";
import { selectRecipes, selectRecipesLoadingStatus} from "../../redux/recipesSlice";
import React from "react";
import RecipeCard from "../recipe/recipeCard";
import { useAppSelector } from "../../app/hooks";

const BrowsePage = (): JSX.Element => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        flexWrap: "wrap"
      }
    }),
  );

  const classes = useStyles();

  const recipes = useAppSelector(selectRecipes);
  const recipeLoadingStatus = useAppSelector(selectRecipesLoadingStatus);

  const recipeCards = recipes.length > 0 ? recipes.map((recipe) => (
    <RecipeCard 
      title={recipe.title}
      ingredients={recipe.ingredients} 
      instructions={recipe.instructions}
      dateAdded={recipe.dateAdded}
      sourceURL={recipe.sourceURL}
      key={recipe.title}
    />
  )) : null;

  return (
    <Paper className={classes.root}>
      {recipeCards}
    </Paper>
  );
};

export default BrowsePage;