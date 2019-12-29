import React, { Component } from 'react';
import NameGame from './Components/NameGame';
import Header from './Components/Header';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';

export default class App extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      isCurrentMode: false,
      isMatMode: false,
      isTimed: false,
    };
  }

  render() {
    return (
      <Box>
        <Header />
        <Container>
          <NameGame />
        </Container>
      </Box>
    );
  }
}
