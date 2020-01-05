export interface IGameState {
  isGameOver: boolean;
  shouldDisplayGameOptions: boolean;
}

export const initialGameState: IGameState = {
  isGameOver: false,
  shouldDisplayGameOptions: true
};

export const gameReducer = (state: IGameState, action: any) => {
  switch (action.type) {
    case "GAME-OVER":
      return { ...state, isGameOver: true };
    case "GAME-RESET":
      return { ...state, isGameOver: false };
    case "GAME-OPTIONS-TOGGLE":
      return {
        ...state,
        shouldDisplayGameOptions: !state.shouldDisplayGameOptions
      };
    case "RESET-GAME-STATE":
      return { ...initialGameState };
    default:
      return state;
  }
};
