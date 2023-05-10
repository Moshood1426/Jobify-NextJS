import { Action, InitialState } from "./types/context";

const reducer: React.Reducer<InitialState, Action> = (state, action) => {
    
  throw new Error(`no such action : ${action.type}`);
};

export default reducer;
