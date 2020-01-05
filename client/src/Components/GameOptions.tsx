import React, { Dispatch } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ITimerState } from "../Reducers/timerReducer";
import NumOfResultsSelect from "./NumOfResultsSelect";
import Timer from "./Timer";
import Box from "@material-ui/core/Box";
import { IGameState } from "../Reducers/gameReducer";

interface IGameOptionProps {
  numOfResults: number;
  setNumOfResults: React.Dispatch<React.SetStateAction<number>>;
  timerDispatch: Dispatch<{ type: string }>;
  timerState: ITimerState;
  gameDispatch: Dispatch<{ type: string }>;
  gameState: IGameState;
  shouldHide: boolean;
}

const useStyles = makeStyles(theme => ({
  box: {
    [theme.breakpoints.up(350)]: {
      display: "flex",
      justifyContent: "space-around"
    }
  }
}));

const GameOptions: React.FC<IGameOptionProps> = props => {
  const classes = useStyles();
  const { shouldHide, numOfResults, setNumOfResults, timerDispatch, timerState, gameDispatch, gameState } = props;
  const { shouldDisplayGameOptions } = gameState;

  if (shouldDisplayGameOptions === false || shouldHide) {
    return null;
  }

  return (
    <Box className={classes.box}>
      <NumOfResultsSelect
        numOfResults={numOfResults}
        setNumOfResults={setNumOfResults}
        gameState={gameState}
      />
      <Timer
        timerDispatch={timerDispatch}
        timerState={timerState}
        gameDispatch={gameDispatch}
      />
    </Box>
  );
};

export default GameOptions;
