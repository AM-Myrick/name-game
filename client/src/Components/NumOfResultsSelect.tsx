import React, { ChangeEvent, useEffect, Dispatch, SetStateAction } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { IGameState } from "../Reducers/gameReducer";
import MatResultsSelect from "./MatResultsSelect";

export interface IResultsProps {
  numOfResults: number;
  setNumOfResults: Dispatch<SetStateAction<number>>;
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
  const handleChange = (event: ChangeEvent<any>) => setNumOfResults(event.target.value);

  useEffect(() => {
    if (numOfResults === 12 && gameState.gameMode !== "mat") {
      setNumOfResults(5);
    }
    if (numOfResults > 12 && gameState.gameMode === "mat") {
      setNumOfResults(5);
    }
  });

  if (gameState.gameMode === "mat") {
    return (
      <MatResultsSelect
        classes={classes}
        numOfResults={numOfResults}
        handleChange={handleChange}
      />
    );
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
