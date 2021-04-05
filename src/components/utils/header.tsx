// no data error screen

import { AppBar, Button, Toolbar, IconButton, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";

type HeaderProps = RouteComponentProps

const Header: React.FC<HeaderProps> = ({ history }) => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      appBar: {
        height: 50,
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      title: {
        flexGrow: 1,
      },
    }),
  );

  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <IconButton 
            edge="start" 
            className={classes.menuButton} 
            color="inherit" 
            aria-label="home"
            onClick={() => history.push("/")}
          >
            <Home />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button 
            color="inherit"
            onClick={() => history.push("/browse")}
          >
            Browse
          </Button>
        </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
