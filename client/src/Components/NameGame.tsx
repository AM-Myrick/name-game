import React, { Dispatch, useEffect, SetStateAction, useState } from "react";
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
  scoreDispatch: Dispatch<{ type: string }>;
  setShouldHide: Dispatch<SetStateAction<boolean>>;
  gameState: IGameState;
  gameDispatch: Dispatch<{ type: string; gameMode?: string | undefined }>;
}

const useStyles = makeStyles(theme => ({
  centerText: {
    textAlign: "center",
    position: "fixed",
    zIndex: 2,
    width: "100%",
    left: 0,
    top: "220px",
    backgroundColor: "white",
    [theme.breakpoints.up(350)]: {
      top: "160px"
    },
    [theme.breakpoints.up(1100)]: {
      position: "unset",
      width: "unset",
      margin: "20px 0"
    }
  },
  stickyQuestion: {
    top: 0
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
  const [answer, setAnswer] = useState<string>("");
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([]);
  const [scrollHeight, setScrollHeight] = useState<number>(window.scrollY);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);
  const {
    setShouldHide,
    gameMode,
    numOfResults,
    gameDispatch,
    scoreDispatch
  } = props;
  const { shouldRestartTimer } = props.timerState;
  const { isGameOver } = props.gameState;
  setShouldHide(false);

  // data is fetched on mount and whenever gameMode or numOfResults changes
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollHeight(window.scrollY);
      setWindowWidth(window.innerWidth);
    });
    getData();
  }, [gameMode, numOfResults]);

  // data is also fetched when shouldRestartTimer is true
  useEffect(() => {
    if (shouldRestartTimer) {
      getData();
    }
  }, [shouldRestartTimer]);

  // set local state to initial values to avoid props being carried over
  const cleanState = () => {
    if (answer || selectedEmployees) {
      setAnswer("");
      setSelectedEmployees([]);
    }
  };

  const getData = async () => {
    gameDispatch({ type: "SWITCH-GAME-MODE", gameMode });
    let response;
    switch (gameMode) {
      case "all":
        response = await axios.get(`/api/all-employees/${numOfResults}`);
        break;
      case "current":
        response = await axios.get(`/api/current-employees/${numOfResults}`);
        break;
      case "mat":
        response = await axios.get(`/api/mat-employees/${numOfResults}`);
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
    const indicatorArray: number[] = Array.from(Array(numOfResults).keys());

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
      <Typography
        variant="h4"
        className={
          scrollHeight > 188 && windowWidth < 1100
            ? `${classes.centerText} ${classes.stickyQuestion}`
            : `${classes.centerText}`
        }
      >
        {`Who is ${answer}?`}
      </Typography>
      <Box className={classes.cardDisplay}>
        {selectedEmployees.map((employee: Employee, index: number) => (
          <EmployeeCard
            key={employee.id + index}
            employee={employee}
            answer={answer}
            startNextRound={getData}
            scoreDispatch={scoreDispatch}
            disabled={isGameOver}
          />
        ))}
      </Box>
    </Box>
  );
};
export default NameGame;
