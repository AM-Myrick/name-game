import React, { Dispatch, SetStateAction } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import NavMenu from "./NavMenu";
import "../Styles/Header.css";

export interface IHeaderProps {
  toggleTimerMode: Dispatch<SetStateAction<boolean>>;
  isTimerMode: boolean;
}

const Header: React.FC<IHeaderProps> = props => {
  return (
    <AppBar position="static">
      <Toolbar className="Toolbar">
        <NavMenu
          toggleTimerMode={props.toggleTimerMode}
          isTimerMode={props.isTimerMode}
        />
        <Typography variant="h4">Name Game</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
