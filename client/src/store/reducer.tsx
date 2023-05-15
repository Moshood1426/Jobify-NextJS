import ActionType from "./action";
import { Action, InitialState } from "./types/context";

const reducer: React.Reducer<InitialState, Action> = (state, action) => {
  if (action.type === ActionType.TOGGLE_SIDE_BAR) {
    return { ...state, showSidebar: !state.showSidebar };
  }

  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
