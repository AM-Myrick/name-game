import React from "react";
import NameGame from "./Components/NameGame";
import Timer from "./Components/Timer";
import Header from "./Components/Header";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Switch, Route } from "react-router-dom";

const App: React.FC = props => {
  const [isTimerMode, setIsTimerMode] = React.useState<boolean>(false);

  return (
    <Box>
      <Header toggleTimerMode={setIsTimerMode} isTimerMode={isTimerMode} />
      <Container>
        <Timer isTimerMode={isTimerMode} />
        <Switch>
          <Route
            exact
            path="/"
            render={props => <NameGame {...props} gameMode="all" />}
          />
          <Route
            path="/current-employees"
            render={props => <NameGame {...props} gameMode="current" />}
          />
          <Route
            path="/mat-employees"
            render={props => <NameGame {...props} gameMode="mat" />}
          />
        </Switch>
      </Container>
    </Box>
  );
};

export default App;
