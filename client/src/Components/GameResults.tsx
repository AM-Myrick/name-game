import React, { Dispatch } from "react";
import SaveScore from "./SaveScore";
import { makeStyles } from "@material-ui/core/styles";
import { IScoreState } from "../Reducers/scoreReducer";
import { ITimerState } from "../Reducers/timerReducer";
import Box from "@material-ui/core/Box";
import RestartGame from "./RestartGame";
import { IGameState } from "../Reducers/gameReducer";

export interface IGameResultsProps {
  scoreState: IScoreState;
  scoreDispatch: Dispatch<any>;
  timerState: ITimerState;
  timerDispatch: Dispatch<any>;
  shouldHide: boolean;
  setShouldHide: React.Dispatch<React.SetStateAction<boolean>>;
  gameState: IGameState;
  gameDispatch: Dispatch<any>;
}

const useStyles = makeStyles(theme => ({
  box: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0",
    flexWrap: "wrap",
    [theme.breakpoints.up(533)]: {
      justifyContent: "space-around",
      alignItems: "center"
    }
  }
}));

const GameResults: React.FC<IGameResultsProps> = props => {
  const classes = useStyles();
  const { shouldHide } = props;

  if (shouldHide) {
    return null;
  }
  
  return props.gameState.isGameOver ? (
    <Box className={classes.box}>
      <SaveScore
        scoreState={props.scoreState}
        scoreDispatch={props.scoreDispatch}
        timerDispatch={props.timerDispatch}
      />
      <RestartGame timerDispatch={props.timerDispatch} />
    </Box>
  ) : null;
};

export default GameResults;
