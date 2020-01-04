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
    initialTime: 10,
    timerType: "DECREMENTAL"
  });
  const { isTimerMode, shouldDisplayTimer, shouldRestartTimer } = props.timerState;
  const { timerDispatch } = props;

  React.useEffect(() => {
    startTimer();
  }, [shouldRestartTimer]);

  const startTimer = () => {
    start();
    timerDispatch({ type: "TIMER-STARTED" });
    timerDispatch({ type: "SHOW-TIMER" });
  };

  if (isTimerMode === false) {
    return null;
  }

  if (time < 0) {
    reset();
    // handle setting score here
    timerDispatch({ type: "TIMER-FINISHED" });
    timerDispatch({ type: "HIDE-TIMER" });
    timerDispatch({ type: "TOGGLE-TIMER-MODE" });
  }

  return shouldDisplayTimer === false ? (
    <Box className={classes.box}>
      <Button variant="outlined" color="primary" onClick={startTimer}>
        Start Timer
      </Button>
    </Box>
  ) : (
    <Box className={classes.timer}>
      <Badge badgeContent={time} color="primary" showZero={true}>
        <AccessAlarmsOutlinedIcon fontSize="large" />
      </Badge>
    </Box>
  );
};

export default Timer;
