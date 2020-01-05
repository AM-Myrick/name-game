import React, { useReducer, useState } from "react";
import Header from "./Components/Header";
import GameOptions from "./Components/GameOptions";
import GameResults from "./Components/GameResults";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import { initialScoreState, scoreReducer } from "./Reducers/scoreReducer";
import { initialTimerState, timerReducer } from "./Reducers/timerReducer";
import { initialGameState, gameReducer } from "./Reducers/gameReducer";
import RouteComponent from "./Components/Routes";

const App: React.FC = props => {
  const [numOfResults, setNumOfResults] = useState<number>(5);
  const [shouldHide, setShouldHide] = useState<boolean>(true);
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
          shouldHide={shouldHide}
        />
        <RouteComponent
          numOfResults={numOfResults}
          scoreDispatch={scoreDispatch}
          timerState={timerState}
          setShouldHide={setShouldHide}
          gameState={gameState}
          gameDispatch={gameDispatch}
        />
        <GameResults
          scoreState={scoreState}
          timerDispatch={timerDispatch}
          shouldHide={shouldHide}
          gameState={gameState}
        />
      </Container>
    </Box>
  );
};

export default App;
