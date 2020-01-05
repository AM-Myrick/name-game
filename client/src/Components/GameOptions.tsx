import React, { Dispatch, useReducer, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { ITimerState } from "../Reducers/timerReducer";
import NumOfResultsSelect from "./NumOfResultsSelect";
import Timer from "./Timer";
import Box from "@material-ui/core/Box";

interface IGameOptionProps {
  numOfResults: number;
  setNumOfResults: React.Dispatch<React.SetStateAction<number>>;
  timerDispatch: Dispatch<any>;
  timerState: ITimerState;
  gameDispatch: Dispatch<any>;
  gameState: any;
}

const useStyles = makeStyles(theme => ({
  box: {
    [theme.breakpoints.up(350)]: {
      display: "flex",
      justifyContent: "space-around"
    }
  },
  hide: {
      display: "none"
  }
}));

const GameOptions: React.FC<IGameOptionProps> = props => {
  const classes = useStyles();
  const {shouldDisplayGameOptions} = props.gameState;

  if (shouldDisplayGameOptions === false) {
      return null;
  }

  return (
    <Box className={classes.box}>
      <NumOfResultsSelect
        numOfResults={props.numOfResults}
        setNumOfResults={props.setNumOfResults}
      />
      <Timer
        timerDispatch={props.timerDispatch}
        timerState={props.timerState}
      />
    </Box>
  );
};

export default GameOptions;
