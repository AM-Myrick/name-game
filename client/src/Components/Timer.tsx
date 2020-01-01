import React from "react";
import Box from "@material-ui/core/Box";
import { useTimer } from "use-timer";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AccessAlarmsOutlinedIcon from "@material-ui/icons/AccessAlarmsOutlined";
import Badge from "@material-ui/core/Badge";

interface ITimerProps {
  isTimerMode: boolean;
  //   initialTime: number;
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
  const [displayTimer, setDisplayTimer] = React.useState<boolean>(false);
  const { time, start, reset } = useTimer({
    // initialTime: props.initialTime,
    initialTime: 60,
    timerType: "DECREMENTAL"
  });

  const startTimer = () => {
    start();
    setDisplayTimer(true);
  };

  if (props.isTimerMode === false) {
    return null;
  }

  if (time < 0) {
    reset();
    // handle setting score here
    setDisplayTimer(false);
  }

  return displayTimer === false ? (
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
