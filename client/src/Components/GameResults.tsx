import React, { Dispatch } from "react";
import SaveScore from "./SaveScore";
import { makeStyles } from "@material-ui/core/styles";
import { IScoreState } from "../Reducers/scoreReducer";
import { ITimerState } from "../Reducers/timerReducer";
import Box from "@material-ui/core/Box";
import RestartGame from "./RestartGame";

export interface IGameResultsProps {
  scoreState: IScoreState;
  scoreDispatch: Dispatch<any>;
  timerState: ITimerState;
  timerDispatch: Dispatch<any>;
}

const GameResults: React.FC<IGameResultsProps> = props => {
  return props.timerState.isTimerDone === true ? (
    <Box>
      <SaveScore scoreState={props.scoreState} scoreDispatch={props.scoreDispatch} />
      <RestartGame timerDispatch={props.timerDispatch} />
    </Box>
  ) : null;
};

export default GameResults;
