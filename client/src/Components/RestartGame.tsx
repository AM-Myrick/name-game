import React, { Dispatch } from "react";
import Button from "@material-ui/core/Button";

export interface IRestartGameProps {
  timerDispatch: Dispatch<any>;
}

const RestartGame: React.FC<IRestartGameProps> = props => {
  const restartGame = () => props.timerDispatch({ type: "RESTART-TIMER" });

  return (
    <Button variant="contained" onClick={restartGame}>
      Restart Game
    </Button>
  );
};

export default RestartGame;
