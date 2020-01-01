import React from "react";
import NameGame from "./Components/NameGame";
import Timer from "./Components/Timer";
import Header from "./Components/Header";
import NumOfResultsSelect from "./Components/NumOfResultsSelect";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Switch, Route } from "react-router-dom";

const App: React.FC = props => {
  const [isTimerMode, setIsTimerMode] = React.useState<boolean>(false);
  const [numOfResults, setNumOfResults] = React.useState<number>(5);

  return (
    <Box>
      <Header toggleTimerMode={setIsTimerMode} isTimerMode={isTimerMode} />
      <Container>
        <NumOfResultsSelect
          numOfResults={numOfResults}
          setNumOfResults={setNumOfResults}
        />
        <Timer isTimerMode={isTimerMode} />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <NameGame {...props} numOfResults={numOfResults} gameMode="all" />
            )}
          />
          <Route
            path="/current-employees"
            render={props => (
              <NameGame
                {...props}
                numOfResults={numOfResults}
                gameMode="current"
              />
            )}
          />
          <Route
            path="/mat-employees"
            render={props => (
              <NameGame {...props} numOfResults={numOfResults} gameMode="mat" />
            )}
          />
        </Switch>
      </Container>
    </Box>
  );
};

export default App;
