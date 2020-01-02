import React, { useReducer } from "react";
import NameGame from "./Components/NameGame";
import Timer from "./Components/Timer";
import Header from "./Components/Header";
import NumOfResultsSelect from "./Components/NumOfResultsSelect";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Switch, Route } from "react-router-dom";
import { initialScoreState, scoreReducer } from "./Reducers/scoreReducer";
import { initialTimerState, timerReducer } from "./Reducers/timerReducer";

const App: React.FC = props => {
  const [numOfResults, setNumOfResults] = React.useState<number>(5);
  const [scoreState, scoreDispatch] = useReducer(
    scoreReducer,
    initialScoreState
  );
  const [timerState, timerDispatch] = useReducer(
    timerReducer,
    initialTimerState
  );

  return (
    <Box>
      <Header timerDispatch={timerDispatch} timerState={timerState} />
      <Container>
        <NumOfResultsSelect
          numOfResults={numOfResults}
          setNumOfResults={setNumOfResults}
        />
        <Timer timerDispatch={timerDispatch} timerState={timerState} />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <NameGame
                {...props}
                scoreDispatch={scoreDispatch}
                numOfResults={numOfResults}
                gameMode="all"
              />
            )}
          />
          <Route
            path="/current-employees"
            render={props => (
              <NameGame
                {...props}
                scoreDispatch={scoreDispatch}
                numOfResults={numOfResults}
                gameMode="current"
              />
            )}
          />
          <Route
            path="/mat-employees"
            render={props => (
              <NameGame
                {...props}
                scoreDispatch={scoreDispatch}
                numOfResults={numOfResults}
                gameMode="mat"
              />
            )}
          />
        </Switch>
      </Container>
    </Box>
  );
};

export default App;
