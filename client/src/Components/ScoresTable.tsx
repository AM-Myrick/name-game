import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Scores from "../Models/Scores";

interface IScoresTableProps {
  classes: Record<"box" | "centerBox" | "centerText", string>;
  scoreArray: Scores[];
}

const ScoresTable: React.FC<IScoresTableProps> = props => {
  const { classes, scoreArray } = props;

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
};

export default ScoresTable;
