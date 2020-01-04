export interface IScoreState {
  correctAnswers: number,
  incorrectAnswers: number
}

export const initialScoreState = {
  correctAnswers: 0,
  incorrectAnswers: 0
};

export const scoreReducer = (state: IScoreState, action: any) => {
  switch (action.type) {
    case "INCREMENT-CORRECT":
      return { ...state, correctAnswers: state.correctAnswers + 1 };
    case "INCREMENT-INCORRECT":
      return { ...state, incorrectAnswers: state.incorrectAnswers + 1 };
    default:
      return state;
  }
};
