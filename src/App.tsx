import React from 'react';
import NameGame from './Components/NameGame';
import './App.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

const App: React.FC = () => {
  return (
    <Box>
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
      <Container>
        <NameGame />
      </Container>
    </Box>
  );
}

export default App;
