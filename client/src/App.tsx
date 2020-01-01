import React from 'react';
import NameGame from './Components/NameGame';
import Header from './Components/Header';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import { Switch, Route } from 'react-router-dom';

const App: React.FC = (props) => {
  return (
    <Box>
      <Header />
      <Container>
        <Switch>
          <Route exact path='/' 
            render={props => (
              <NameGame {...props} gameMode='all' />
            )}
          />
          <Route path='/current-employees' 
            render={props => (
              <NameGame {...props} gameMode='current' />
            )}
          />
          <Route path='/mat-employees' 
            render={props => (
              <NameGame {...props} gameMode='mat' />
            )}
          />
        </Switch>
      </Container>
    </Box>
  );
}

export default App;