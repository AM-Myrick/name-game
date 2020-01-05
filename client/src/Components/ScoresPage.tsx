import React, { Dispatch } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import { IGameState } from "../Reducers/gameReducer";

interface IScoresPageProps {
  setShouldHide: React.Dispatch<React.SetStateAction<boolean>>;
  gameDispatch: Dispatch<any>;
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
  let scores = localStorage.getItem("wtQuizScores");
  React.useEffect(() => {
    props.gameDispatch({ type: "RESET-GAME-STATE" });
  }, []);
  props.setShouldHide(true);

  if (scores) {
    const scoreArray: any[] = JSON.parse(scores);
    // sort scores in descending order by correct answers
    scoreArray.sort((a, b) => b.correctAnswers - a.correctAnswers);

    return (
      <Box className={classes.box}>
        <TableContainer component={Paper}>
          <Table aria-label="score table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell align="right">Correct Answers</TableCell>
                <TableCell align="right">Incorrect Answers</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {scoreArray.map((score, index: number) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="score">
                    {score.name}
                  </TableCell>
                  <TableCell align="right">{score.correctAnswers}</TableCell>
                  <TableCell align="right">{score.incorrectAnswers}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    );
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
