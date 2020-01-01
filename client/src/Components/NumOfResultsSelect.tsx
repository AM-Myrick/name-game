import React, { Dispatch, SetStateAction } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";

export interface IResultsProps {
  numOfResults: number;
  setNumOfResults: React.Dispatch<React.SetStateAction<number>>;
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
  const handleChange = (event: any) =>
    props.setNumOfResults(event.target.value);

  return (
    <Box className={classes.box}>
      <FormControl variant="outlined">
        <InputLabel>Number of Results</InputLabel>
        <Select
          value={props.numOfResults}
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
