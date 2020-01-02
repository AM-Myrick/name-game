export interface ITimerState {
  isTimerMode: boolean;
  isTimerDone: boolean;
  shouldDisplayTimer: boolean;
}

export const initialTimerState: ITimerState = {
  isTimerMode: false,
  isTimerDone: false,
  shouldDisplayTimer: false
};

export const timerReducer = (state: ITimerState, action: any) => {
  switch (action.type) {
    case "TOGGLE-TIMER-MODE":
      return { ...state, isTimerMode: !state.isTimerMode };
    case "TIMER-FINISHED":
      return { ...state, isTimerDone: true };
    case "TIMER-STARTED":
      return { ...state, isTimerDone: false };
      case "HIDE-TIMER":
      return { ...state, shouldDisplayTimer: false };
      case "SHOW-TIMER":
      return { ...state, shouldDisplayTimer: true };
    default:
      return state;
  }
};
