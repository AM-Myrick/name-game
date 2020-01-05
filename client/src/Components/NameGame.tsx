import React, { Dispatch } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Employee from "../Models/Employee";
import Box from "@material-ui/core/Box";
import EmployeeCard from "./EmployeeCard";
import Typography from "@material-ui/core/Typography";
import { ITimerState } from "../Reducers/timerReducer";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9001"
    : "https://nameless-cliffs-24621.herokuapp.com";

interface INameGameProps {
  gameMode: string;
  numOfResults: number;
  timerState: ITimerState;
  scoreDispatch: Dispatch<any>;
}

const useStyles = makeStyles({
  center: {
    margin: "20px 0",
    textAlign: "center"
  },
  cardDisplay: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap"
  }
});

const NameGame: React.FC<INameGameProps> = props => {
  const classes = useStyles();
  const [answer, setAnswer] = React.useState<string>("");
  const [selectedEmployees, setSelectedEmployees] = React.useState<Employee[]>(
    []
  );

  React.useEffect(() => {
    getData();
  }, [props.gameMode, props.numOfResults, props.timerState.shouldRestartTimer]);

  const getData = async () => {
    let response;
    switch (props.gameMode) {
      case "all":
        response = await axios.get(`/api/all-employees/${props.numOfResults}`);
        break;
      case "current":
        response = await axios.get(
          `/api/current-employees/${props.numOfResults}`
        );
        break;
      case "mat":
        response = await axios.get(`/api/mat-employees/${props.numOfResults}`);
        break;
    }
    if (response) {
      const { answer, selectedEmployees } = response.data;
      setAnswer(answer);
      setSelectedEmployees(selectedEmployees);
    } else {
        getData();
    }
  };

  return (
    <Box>
      <Typography variant="h4" className={classes.center}>
        {`Who is ${answer}?`}
      </Typography>
      <Box className={classes.cardDisplay}>
        {selectedEmployees.map((employee: Employee, index: number) => (
          <EmployeeCard
            index={index}
            tabIndex={index}
            key={employee.id}
            employee={employee}
            answer={answer}
            startNextRound={getData}
            scoreDispatch={props.scoreDispatch}
            disabled={props.timerState.isTimerDone}
          />
        ))}
      </Box>
    </Box>
  );
};
export default NameGame;
