import React, { Dispatch } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Employee from "../Models/Employee";
import Box from "@material-ui/core/Box";
import EmployeeCard from "./EmployeeCard";
import Typography from "@material-ui/core/Typography";
import { ITimerState } from "../Reducers/timerReducer";
import CircularProgress from "@material-ui/core/CircularProgress";
import { IGameState } from "../Reducers/gameReducer";

axios.defaults.baseURL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:9001"
    : "https://nameless-cliffs-24621.herokuapp.com";

interface INameGameProps {
  gameMode: string;
  numOfResults: number;
  timerState: ITimerState;
  scoreDispatch: Dispatch<any>;
  setShouldHide: React.Dispatch<React.SetStateAction<boolean>>;
  gameState: IGameState;
}

const useStyles = makeStyles({
  centerText: {
    margin: "20px 0",
    textAlign: "center"
  },
  cardDisplay: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  centerLoader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }
});

const NameGame: React.FC<INameGameProps> = props => {
  const classes = useStyles();
  const [answer, setAnswer] = React.useState<string>("");
  const [selectedEmployees, setSelectedEmployees] = React.useState<Employee[]>(
    []
  );

  props.setShouldHide(false);
  // data is fetched on mount and whenever gameMode, numOfResults, or shouldRestartTimer changes
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

  if (answer === "") {
    return (
      <Box className={classes.centerLoader}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" className={classes.centerText}>
        {`Who is ${answer}?`}
      </Typography>
      <Box className={classes.cardDisplay}>
        {selectedEmployees.map((employee: Employee, index: number) => (
          <EmployeeCard
            key={employee.id + index}
            employee={employee}
            answer={answer}
            startNextRound={getData}
            scoreDispatch={props.scoreDispatch}
            disabled={props.gameState.isGameOver}
          />
        ))}
      </Box>
    </Box>
  );
};
export default NameGame;
