import React, { Dispatch, MouseEvent, ChangeEvent } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { IScoreState } from "../Reducers/scoreReducer";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

export interface ISaveScoreProps {
  scoreState: IScoreState;
  scoreDispatch: Dispatch<any>;
}

const SaveScore: React.FC<ISaveScoreProps> = props => {
  const [textFieldValue, setTextFieldValue] = React.useState<string>("");
  const [savedScore, setSavedScore] = React.useState<boolean>(false);

  const handleChange = (e: ChangeEvent<any>) =>
    setTextFieldValue(e.target.value);

  const storeScore = (e: any) => {
    e.preventDefault();
    const { correctAnswers, incorrectAnswers } = props.scoreState;
    let quizScores = localStorage.getItem("wtQuizScores");
    if (quizScores) {
      const oldScores = JSON.parse(quizScores);
      const newScores = JSON.stringify([
        ...oldScores,
        { name: textFieldValue, correctAnswers, incorrectAnswers }
      ]);
      localStorage.setItem("wtQuizScores", newScores);
    } else {
      let newScore = [
        { name: textFieldValue, correctAnswers, incorrectAnswers }
      ];
      localStorage.setItem("wtQuizScores", JSON.stringify(newScore));
    }
    setSavedScore(true);
  };

  if (savedScore) {
    return (
      <Button variant="contained" component={Link} to="/scores">
        See Your Score
      </Button>
    );
  }
  
  return (
    <form noValidate autoComplete="off" onSubmit={e => storeScore(e)}>
      <TextField
        id="outlined-basic"
        label="What's your name?"
        name="name"
        variant="outlined"
        onChange={e => handleChange(e)}
        value={textFieldValue}
      />
      <Button variant="contained" onClick={e => storeScore(e)}>
        Save Score
      </Button>
    </form>
  );
};

export default SaveScore;
