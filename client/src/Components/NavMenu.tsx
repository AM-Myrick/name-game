import React, { MouseEvent, useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { IHeaderProps } from "./Header";

const NavMenu: React.FC<IHeaderProps> = props => {
  // local state to handle opening and closing menu
  const [anchorEl, setAnchorEl] = useState<null | Element>(null);
  const { gameDispatch, gameState } = props;
  const { shouldDisplayGameOptions } = gameState;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleGameOptions = () => {
    handleClose();
    gameDispatch({ type: "GAME-OPTIONS-TOGGLE" });
  };

  return (
    <div>
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={e => handleClick(e)}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to="/">
          All Employees
        </MenuItem>
        <MenuItem
          onClick={handleClose}
          component={Link}
          to="/current-employees"
        >
          Current Employees
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/mat-employees">
          Mat* Only
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/scores">
          See Scores
        </MenuItem>
        {shouldDisplayGameOptions ? (
          <MenuItem onClick={handleGameOptions}>Hide Game Options</MenuItem>
        ) : (
          <MenuItem onClick={handleGameOptions}>Show Game Options</MenuItem>
        )}
      </Menu>
    </div>
  );
};

export default NavMenu;
