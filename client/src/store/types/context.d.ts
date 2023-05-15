import ActionType from "../action";

export interface InitialState {
  showSidebar: boolean;
}

export interface ContextType extends InitialState {
  toggleSidebar: () => void;
  setEditJob: () => void;
  deleteJob: () => void;
}

export interface Action {
  type: ActionType;
  payload?: any;
}
