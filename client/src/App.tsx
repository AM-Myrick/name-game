import React, { useReducer } from "react";
import NameGame from "./Components/NameGame";
import Header from "./Components/Header";
import GameOptions from "./Components/GameOptions";
import GameResults from "./Components/GameResults";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { Switch, Route } from "react-router-dom";
import { initialScoreState, scoreReducer } from "./Reducers/scoreReducer";
import { initialTimerState, timerReducer } from "./Reducers/timerReducer";
import { initialGameState, gameReducer } from "./Reducers/gameReducer";

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
  const [gameState, gameDispatch] = useReducer(gameReducer, initialGameState);

  return (
    <Box>
      <Header
        timerDispatch={timerDispatch}
        timerState={timerState}
        gameDispatch={gameDispatch}
        gameState={gameState}
      />
      <Container>
        <GameOptions
          numOfResults={numOfResults}
          setNumOfResults={setNumOfResults}
          timerDispatch={timerDispatch}
          timerState={timerState}
          gameDispatch={gameDispatch}
          gameState={gameState}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <NameGame
                {...props}
                timerState={timerState}
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
                timerState={timerState}
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
                timerState={timerState}
                scoreDispatch={scoreDispatch}
                numOfResults={numOfResults}
                gameMode="mat"
              />
            )}
          />
        </Switch>
        <GameResults
          scoreState={scoreState}
          scoreDispatch={scoreDispatch}
          timerState={timerState}
          timerDispatch={timerDispatch}
        />
      </Container>
    </Box>
  );
};

export default App;
