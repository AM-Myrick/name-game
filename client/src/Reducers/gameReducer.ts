export interface IGameState {
  isGameOver: boolean;
  shouldDisplayGameOptions: boolean;
  gameMode: "mat" | "all" | "current" | null;
}

export const initialGameState: IGameState = {
  isGameOver: false,
  shouldDisplayGameOptions: true,
  gameMode: null
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
    case "SWITCH-GAME-MODE":
      return { ...state, gameMode: action.gameMode };
    default:
      return state;
  }
};
