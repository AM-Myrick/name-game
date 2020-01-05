import React, { Dispatch } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import NavMenu from "./NavMenu";

export interface IHeaderProps {
  gameDispatch: Dispatch<any>;
  gameState: any;
}

const useStyles = makeStyles(theme => ({
  toolbar: {
    backgroundColor: "#1AD9C3"
  }
}));

const Header: React.FC<IHeaderProps> = props => {
  const classes = useStyles();
  const { gameDispatch, gameState } = props;

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        <NavMenu gameDispatch={gameDispatch} gameState={gameState} />
        <Typography variant="h4">Name Game</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
