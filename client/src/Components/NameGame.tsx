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

const useStyles = makeStyles(theme => ({
  centerText: {
    margin: "20px 0",
    textAlign: "center"
  },
  cardDisplay: {
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  progressDisplay: {
    width: "100%",
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    [theme.breakpoints.up(500)]: {
       flexDirection: "unset",
       alignItems: "unset"
    }
  },
  centerProgress: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap"
  },
  progressColor: {
    color: "#1AD9C3"
  },
  progressStyles: {
    marginBottom: "20px",
    [theme.breakpoints.up(500)]: {
       marginLeft: "20%",
       marginRight: "20%"
    },
    [theme.breakpoints.up(700)]: {
      marginLeft: "12%",
      marginRight: "12%"
   },
   [theme.breakpoints.up(1100)]: {
     marginLeft: "7%",
     marginRight: "7%"
  }
  }
}));

const NameGame: React.FC<INameGameProps> = props => {
  const classes = useStyles();
  const [answer, setAnswer] = React.useState<string>("");
  const [selectedEmployees, setSelectedEmployees] = React.useState<Employee[]>(
    []
  );
  props.setShouldHide(false);

  // data is fetched on mount and whenever gameMode or numOfResults changes
  React.useEffect(() => {
    getData();
  }, [props.gameMode, props.numOfResults]);

  // data is also fetched when shouldRestartTimer is true
  React.useEffect(() => {
    if (props.timerState.shouldRestartTimer) {
      getData();
    }
  }, [props.timerState.shouldRestartTimer]);

  // set local state to initial values to avoid props being carried over
  const cleanState = () => {
    if (answer || selectedEmployees) {
      setAnswer("");
      setSelectedEmployees([]);
    }
  };

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
      cleanState();
      const { answer, selectedEmployees } = response.data;
      setAnswer(answer);
      setSelectedEmployees(selectedEmployees);
    } else {
      getData();
    }
  };

  if (answer === "" || selectedEmployees.length === 0) {
    // create an array of the same length as selectedEmployees to iterate over and create progress indicators
    const indicatorArray: number[] = Array.from(
      Array(props.numOfResults).keys()
    );
    
    return (
      <Box className={classes.centerProgress}>
        <CircularProgress className={classes.progressColor} />
        <Box className={`${classes.cardDisplay} ${classes.progressDisplay}`}>
          {indicatorArray.map(indicator => (
            <CircularProgress
              className={`${classes.progressStyles} ${classes.progressColor}`}
              key={indicator}
            />
          ))}
        </Box>
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
