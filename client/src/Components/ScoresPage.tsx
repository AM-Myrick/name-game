import React, { Dispatch, useEffect, SetStateAction } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { IGameState } from "../Reducers/gameReducer";
import ScoresTable from "./ScoresTable";
import Scores from "../Models/Scores";

interface IScoresPageProps {
  setShouldHide: Dispatch<SetStateAction<boolean>>;
  gameDispatch: Dispatch<{ type: string }>;
  gameState: IGameState;
}

const useStyles = makeStyles(theme => ({
  box: {
    marginTop: "20px"
  },
  centerBox: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "20px"
  },
  centerText: {
    width: "100%",
    textAlign: "center"
  }
}));

const ScoresPage: React.FC<IScoresPageProps> = props => {
  const classes = useStyles();
  const { gameDispatch, setShouldHide } = props;
  let scores = localStorage.getItem("wtQuizScores");

  useEffect(() => {
    gameDispatch({ type: "RESET-GAME-STATE" });
  }, []);
  setShouldHide(true);

  if (scores) {
    const scoreArray: Scores[] = JSON.parse(scores);
    // sort scores in descending order by correct answers
    scoreArray.sort((a, b) => b.correctAnswers - a.correctAnswers);

    return <ScoresTable classes={classes} scoreArray={scoreArray} />;
  }

  return (
    <Box className={classes.centerBox}>
      <Typography className={classes.centerText} variant="h5" component="h2">
        You don't have any scores yet.
      </Typography>
      <Button variant="outlined" color="primary" component={Link} to="/">
        Play the Name Game
      </Button>
    </Box>
  );
};

export default ScoresPage;
