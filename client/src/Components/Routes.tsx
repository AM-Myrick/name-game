import React, { Dispatch, SetStateAction } from "react";
import NameGame from "./NameGame";
import { Switch, Route } from "react-router-dom";
import ScoresPage from "./ScoresPage";
import { ITimerState } from "../Reducers/timerReducer";
import { IGameState } from "../Reducers/gameReducer";

interface IRouteComponentProps {
  numOfResults: number;
  timerState: ITimerState;
  scoreDispatch: Dispatch<{ type: string }>;
  setShouldHide: Dispatch<SetStateAction<boolean>>;
  gameState: IGameState;
  gameDispatch: Dispatch<{ type: string }>;
}

const RouteComponent: React.FC<IRouteComponentProps> = props => {
  const {
    numOfResults,
    timerState,
    scoreDispatch,
    setShouldHide,
    gameState,
    gameDispatch
  } = props;

  return (
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
            setShouldHide={setShouldHide}
            gameState={gameState}
            gameDispatch={gameDispatch}
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
            setShouldHide={setShouldHide}
            gameState={gameState}
            gameDispatch={gameDispatch}
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
            setShouldHide={setShouldHide}
            gameState={gameState}
            gameDispatch={gameDispatch}
            gameMode="mat"
          />
        )}
      />
      <Route
        path="/scores"
        render={props => (
          <ScoresPage
            {...props}
            setShouldHide={setShouldHide}
            gameState={gameState}
            gameDispatch={gameDispatch}
          />
        )}
      />
    </Switch>
  );
};

export default RouteComponent;
