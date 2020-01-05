import React, { Dispatch } from "react";
import Button from "@material-ui/core/Button";

export interface IRestartGameProps {
  timerDispatch: Dispatch<{ type: string }>;
}

const RestartGame: React.FC<IRestartGameProps> = props => {
  const { timerDispatch } = props;
  const restartGame = () => timerDispatch({ type: "RESTART-TIMER" });

  return (
    <Button variant="outlined" color="primary" onClick={restartGame}>
      Restart Game
    </Button>
  );
};

export default RestartGame;
