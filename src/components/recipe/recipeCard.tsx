/*
 * Recipe card displays data about one recipe.
 * 
 * Bootstrapped from: 
 * https://material-ui.com/components/cards/#RecipeReviewCard.tsx
 */

import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  createStyles, IconButton,
  Link,
  ListItem,
  ListItemText,
  makeStyles, Theme,
  Typography
} from "@material-ui/core";
import { ExpandMore, Favorite } from "@material-ui/icons";
import clsx from "clsx";
import React, { useState, FC, ReactElement } from "react";
import { Recipe } from "../../redux/recipesSlice";

const RecipeCard: FC<Recipe> = (props: Recipe): ReactElement => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: 345,
        margin: 8,
        height: "min-content",
      },
      media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
      },
      expand: {
        transform: "rotate(0deg)",
        marginLeft: "auto",
        transition: theme.transitions.create("transform", {
          duration: theme.transitions.duration.shortest,
        }),
      },
      expandOpen: {
        transform: "rotate(180deg)",
      },
      link: {
        cursor: "pointer"
      }
    }),
  );

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

  const ingredientSections = Object.values(props.ingredients).map((section) => {
    const { header, ingredients } = section;
    const ingredientList = ingredients.map((name) => (
      <ListItem key={name}>
        <ListItemText primary={name} /> 
      </ListItem>)
    );
    return (
      <div key={header}>
        <Typography paragraph>{header}</Typography>
        {ingredientList}
      </div>
    );
  }); 

  const instructionSections = Object.values(props.instructions).map((section) => {
    const { header, instructions } = section;
    const instructionsList = instructions.map((ins) => (
      <ListItem key={ins}>
        <ListItemText primary={ins} /> 
      </ListItem>)
    );
    return (
      <div key={header}>
        <Typography paragraph >{header}</Typography>
        {instructionsList}
      </div>
    );
  }); 

  const dateAddedString = (new Date(props.dateAdded)).toDateString();

  const description = props.description ? (
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        {props.description}
      </Typography>
    </CardContent>
  ) : null;

  const originalSourceLink = props.sourceURL ? (
    <Link 
      href={props.sourceURL} 
      rel="noreferrer" 
      target="_blank"
      aria-label="link to recipe source"
      className={classes.link}
    >
      Original Recipe
    </Link>) : null;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title={props.title}
        subheader={originalSourceLink}
      />
      {props.description && description}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMore />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body1" component="p" >
            {dateAddedString}
          </Typography>
          {ingredientSections}
          {instructionSections}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default RecipeCard;