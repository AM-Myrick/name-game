import React, { MouseEvent, Dispatch } from 'react';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox'

const NavMenu: React.FC = (props) => {
    const [anchorEl, setAnchorEl] = React.useState<null | Element>(null);

    const handleClick = (event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget);

    const handleClose = () => setAnchorEl(null);

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
            <MenuItem onClick={handleClose}>All Employees</MenuItem>
            <MenuItem onClick={handleClose}>Current Employees</MenuItem>
            <MenuItem onClick={handleClose}>Mat* Only</MenuItem>
            <Checkbox
                value="Timed Mode"
                inputProps={{ 'aria-label': 'Timed Mode' }}
            />
        </Menu>
      </div>
    );
}

export default NavMenu;