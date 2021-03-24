/*
 * Container component for the main application.
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
  IconButton, 
  ListItem,
  ListItemText,
  Theme,
  Typography,
  createStyles,
  makeStyles 
} from "@material-ui/core";
import { Create, ExpandMore, Favorite, Share } from "@material-ui/icons";
import React from "react";
import clsx from "clsx";
import { red } from "@material-ui/core/colors";
import { useState } from "react";

export interface RecipeCardProps {
  title: string;
  ingredients: Array<string>;
  instructions: Array<string>;
  dateAdded: Date;
  description?: string;
}

const RecipeCard = (props: RecipeCardProps): JSX.Element => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        maxWidth: 345,
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
      avatar: {
        backgroundColor: red[500],
      },
    }),
  );

  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);

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

  const dateAdded = props.dateAdded.toLocaleDateString();

  const description = props.description ? (
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        {props.description}
      </Typography>
    </CardContent>
  ) : null;

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <IconButton aria-label="edit">
            <Create />
          </IconButton>
        }
        title={props.title}
        subheader={dateAdded}
      />
      {props.description && description}
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Favorite />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
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
          <Typography paragraph>Ingredients:</Typography>
          {ingredients}
          <Typography paragraph>Instructions:</Typography>
          {instructions}
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default RecipeCard;