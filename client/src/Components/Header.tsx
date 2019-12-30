import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import NavMenu from './NavMenu';
import '../Styles/Header.css';

const Header: React.FC = (props) => {
    return (
        <AppBar position="static">
            <Toolbar className="Toolbar">
            <NavMenu />
            <Typography variant="h4">
                Name Game
            </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;