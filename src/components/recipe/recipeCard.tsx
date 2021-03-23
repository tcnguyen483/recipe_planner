/*
 * App
 *
 * Container component for the main application.
 */

import React from "react";
import { Card, Typography, List, ListItem, ListItemText } from "@material-ui/core";

export interface RecipeCardProps {
  title: string;
  ingredients: Array<string>;
  instructions: Array<string>;
}

const RecipeCard = (props: RecipeCardProps): JSX.Element => {
  const ingredients = props.ingredients.map((name) => (
    <ListItem key={name}>
      <ListItemText primary={name} /> 
    </ListItem>)
  );

  const instructions = props.instructions.map((ins) => (
    <ListItem key={ins}>
      <ListItemText primary={ins} /> 
    </ListItem>)
  );

  return (
    <Card>
      <Typography variant="h3">{props.title}</Typography>
      <List component="nav" aria-label="ingredients list">
        {ingredients}
      </List>
      <List component="nav" aria-label="instructions numbered list">
        {instructions}
      </List>
    </Card>
  );
};

export default RecipeCard;