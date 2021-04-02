/*
 * Page to browse through all of the recipe cards on the site.
 * 
 */
import { createStyles, makeStyles, Paper, Theme, CircularProgress } from "@material-ui/core";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getAndLoadRecipes, RecipeLoadingStatus, selectRecipes, selectRecipesLoadingStatus, setRecipesLoadingStatus } from "../../redux/recipesSlice";
import RecipeCard from "../recipe/recipeCard";

const BrowsePage = (): JSX.Element => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: "100%",
        display: "flex",
        backgroundColor: theme.palette.background.paper,
        flexWrap: "wrap",
        flexDirection: "row"
      },
      spinner: {
        alignSelf: "center",
        justifySelf: "center"
      }
    }),
  );

  const classes = useStyles();

  const dispatch = useAppDispatch();

  const recipes = useAppSelector(selectRecipes);
  const recipeLoadingStatus = useAppSelector(selectRecipesLoadingStatus);

  const loadSpinner = <CircularProgress className={classes.spinner}/>;

  const recipeCards = recipes.length > 0 ? recipes.map((recipe) => (
    <RecipeCard
      id={recipe.id}
      title={recipe.title}
      ingredients={recipe.ingredients} 
      instructions={recipe.instructions}
      tags={recipe.tags}
      calories={recipe.calories}
      authorID={recipe.authorID}
      dateAdded={recipe.dateAdded}
      sourceURL={recipe.sourceURL}
      description={recipe.description}
      key={recipe.id}
    />
  )) : null;

  useEffect(() => {
    if (recipeLoadingStatus === RecipeLoadingStatus.NOT_LOADED) {
      dispatch(setRecipesLoadingStatus(RecipeLoadingStatus.LOADING));
      dispatch(getAndLoadRecipes());
    } else if (recipeLoadingStatus === RecipeLoadingStatus.ERROR) {
      console.log("There was an error while trying to fetch the recipe data.");
    }
  }, [recipeLoadingStatus, dispatch]);

  return (
    <Paper className={classes.root}>
      {recipeLoadingStatus === RecipeLoadingStatus.LOADED && recipeCards}
      {recipeLoadingStatus === RecipeLoadingStatus.LOADING && loadSpinner}
    </Paper>
  );
};

export default BrowsePage;