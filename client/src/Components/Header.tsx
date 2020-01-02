import React, { Dispatch } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import NavMenu from "./NavMenu";
import "../Styles/Header.css";

export interface IHeaderProps {
  timerDispatch: Dispatch<any>;
  timerState: any;
}

const Header: React.FC<IHeaderProps> = props => {
  return (
    <AppBar position="static">
      <Toolbar className="Toolbar">
        <NavMenu
          timerDispatch={props.timerDispatch}
          timerState={props.timerState}
        />
        <Typography variant="h4">Name Game</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
