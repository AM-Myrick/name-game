import React, { Dispatch } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import NavMenu from "./NavMenu";
import "../Styles/Header.css";

export interface IHeaderProps {
  gameDispatch: Dispatch<any>;
  gameState: any;
}

const Header: React.FC<IHeaderProps> = props => {
  return (
    <AppBar position="static">
      <Toolbar className="Toolbar">
        <NavMenu
          gameDispatch={props.gameDispatch}
          gameState={props.gameState}
        />
        <Typography variant="h4">Name Game</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
