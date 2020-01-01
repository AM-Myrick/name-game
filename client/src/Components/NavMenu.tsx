import React, { MouseEvent } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import { Link } from 'react-router-dom';
import { IHeaderProps } from './Header';

const NavMenu: React.FC<IHeaderProps> = (props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | Element>(null);
    const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleCheckbox = () => {
        setAnchorEl(null);
        props.toggleTimerMode(!props.isTimerMode);
    }

    return (
        <div>
            <IconButton 
                edge="start"
                color="inherit"
                aria-label="menu"
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={(e) => handleClick(e)}
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
            <MenuItem onClick={handleClose} component={Link} to="/">All Employees</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/current-employees">Current Employees</MenuItem>
            <MenuItem onClick={handleClose} component={Link} to="/mat-employees">Mat* Only</MenuItem>
            <Checkbox
                value="Timed Mode"
                inputProps={{ 'aria-label': 'Timed Mode' }}
                onClick={handleCheckbox}
            />
        </Menu>
      </div>
    );
}

export default NavMenu;