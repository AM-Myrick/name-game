import React, { ChangeEvent } from "react";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";

export interface IMatResultsProps {
  handleChange: (event: ChangeEvent<any>) => void;
  classes: Record<"box", string>;
  numOfResults: number;
}

const MatResultsSelect: React.FC<IMatResultsProps> = props => {
  const { handleChange, classes, numOfResults } = props;

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
};

export default MatResultsSelect;
