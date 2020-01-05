import React, { Dispatch } from "react";
import Box from "@material-ui/core/Box";
import { useTimer } from "use-timer";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AccessAlarmsOutlinedIcon from "@material-ui/icons/AccessAlarmsOutlined";
import Badge from "@material-ui/core/Badge";
import { ITimerState } from "../Reducers/timerReducer";

interface ITimerProps {
  timerState: ITimerState;
  timerDispatch: Dispatch<any>;
  gameDispatch: Dispatch<any>;
}

const useStyles = makeStyles({
  box: {
    display: "flex",
    justifyContent: "center",
    margin: "20px 0"
  },
  timer: {
    position: "fixed",
    margin: "45px 0",
    zIndex: 3,
    top: -32,
    right: 20
  }
});

const Timer: React.FC<ITimerProps> = props => {
  const classes = useStyles();
  const { time, start, reset } = useTimer({
    initialTime: 60,
    timerType: "DECREMENTAL"
  });

  const { shouldDisplayTimer, shouldRestartTimer } = props.timerState;
  const { timerDispatch, gameDispatch } = props;

  // avoids timer starting on component mount, but allows it to restart when needed
  React.useEffect(() => {
    if (shouldRestartTimer) {
      startTimer();
    }
  }, [shouldRestartTimer]);

  // starts timer and changes view to a ticking clock
  const startTimer = () => {
    start();
    if (shouldRestartTimer) {
      timerDispatch({ type: "DONT-RESTART-TIMER" });
    }
    gameDispatch({ type: "GAME-RESET" });
    timerDispatch({ type: "TIMER-STARTED" });
    timerDispatch({ type: "SHOW-TIMER" });
  };

  // ends timer and changes view back to start button
  if (time < 0) {
    reset();
    gameDispatch({ type: "GAME-OVER" });
    timerDispatch({ type: "TIMER-FINISHED" });
    timerDispatch({ type: "HIDE-TIMER" });
    timerDispatch({ type: "TOGGLE-TIMER-MODE" });
  }

  if (shouldDisplayTimer) {
    return (
      <Box className={classes.timer}>
        <Badge badgeContent={time} color="primary" showZero={true}>
          <AccessAlarmsOutlinedIcon fontSize="large" />
        </Badge>
      </Box>
    );
  }

  return (
    <Box className={classes.box}>
      <Button variant="outlined" color="primary" onClick={startTimer}>
        Start Timer
      </Button>
    </Box>
  );
};

export default Timer;
