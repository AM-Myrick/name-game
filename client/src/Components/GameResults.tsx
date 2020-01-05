import React, { Dispatch } from "react";
import SaveScore from "./SaveScore";
import { makeStyles } from "@material-ui/core/styles";
import { IScoreState } from "../Reducers/scoreReducer";
import Box from "@material-ui/core/Box";
import RestartGame from "./RestartGame";
import { IGameState } from "../Reducers/gameReducer";

export interface IGameResultsProps {
  scoreState: IScoreState;
  timerDispatch: Dispatch<any>;
  shouldHide: boolean;
  gameState: IGameState;
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
  const { shouldHide, scoreState, timerDispatch } = props;
  const { isGameOver } = props.gameState;

  if (shouldHide || isGameOver === false) {
    return null;
  }

  return (
    <Box className={classes.box}>
      <SaveScore scoreState={scoreState} />
      <RestartGame timerDispatch={timerDispatch} />
    </Box>
  );
};

export default GameResults;
