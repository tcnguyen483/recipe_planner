// no data error screen

import { AppBar, Button, Toolbar, IconButton, createStyles, makeStyles, Theme, Typography } from "@material-ui/core";
import { Home } from "@material-ui/icons";
import React, { FC, ReactElement } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

type HeaderProps = RouteComponentProps

const Header: FC<HeaderProps> = ({ history }): ReactElement => {
  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      appBar: {
        height: 50,
        justifyContent: "center",
        boxShadow: "none"
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

  const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0();

  const loginButton = (
    <Button 
      color="inherit"
      onClick={() => loginWithRedirect()}
    >
      Login
    </Button>
  );

  const logoutButton = (
    <Button 
      color="inherit"
      onClick={() => logout({ returnTo: "http://localhost:8080" })}
    >
      Logout
    </Button>
  );

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
          <Button 
            color="inherit"
            onClick={() => history.push("/recipeBook")}
          >
            Recipe Book
          </Button>
          {!isLoading && isAuthenticated ? logoutButton : loginButton}
        </Toolbar>
    </AppBar>
  );
};

export default withRouter(Header);
