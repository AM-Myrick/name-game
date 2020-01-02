export const initialState = {
  name: "",
  correctAnswers: 0,
  incorrectAnswers: 0
};

export const scoreReducer = (state: any, action: any) => {
  switch (action.type) {
    case "INCREMENT-CORRECT":
      return { ...state, correctAnswers: state.correctAnswers + 1 };
    case "INCREMENT-INCORRECT":
      return { ...state, incorrectAnswers: state.incorrectAnswers + 1 };
    case "SET-NAME":
      return { ...state, name: action.name };
    default:
      return state;
  }
};
