import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import '../Styles/Header.css';

const Header: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar className="Toolbar">
            <IconButton edge="start" color="inherit" aria-label="menu">
                <MenuIcon />
            </IconButton>
            <Typography variant="h4">
                Name Game
            </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;