import React, { Dispatch, SetStateAction } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { IGameState } from "../Reducers/gameReducer";

export interface IResultsProps {
  numOfResults: number;
  setNumOfResults: React.Dispatch<React.SetStateAction<number>>;
  gameState: IGameState;
}

const useStyles = makeStyles({
  box: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0"
  }
});

const NumOfResultsSelect: React.FC<IResultsProps> = props => {
  const classes = useStyles();
  const { numOfResults, setNumOfResults, gameState } = props;
  const handleChange = (event: any) => setNumOfResults(event.target.value);

  if (gameState.gameMode === "mat") {
    return (
      <Box className={classes.box}>
        <FormControl variant="outlined">
          <InputLabel id="results">Number of Results</InputLabel>
          <Select
            labelId="results"
            value={numOfResults}
            onChange={event => handleChange(event)}
          >
            <MenuItem value={5}>Five Employees</MenuItem>
            <MenuItem value={10}>Ten Employees</MenuItem>
            <MenuItem value={12}>All Mat* Employees</MenuItem>
          </Select>
        </FormControl>
      </Box>
    );
  } else {
    setNumOfResults(5);
  }

  return (
    <Box className={classes.box}>
      <FormControl variant="outlined">
        <InputLabel id="results">Number of Results</InputLabel>
        <Select
          labelId="results"
          value={numOfResults}
          onChange={event => handleChange(event)}
        >
          <MenuItem value={5}>Five Employees</MenuItem>
          <MenuItem value={10}>Ten Employees</MenuItem>
          <MenuItem value={15}>Fifteen Employees</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default NumOfResultsSelect;
