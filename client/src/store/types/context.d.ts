import ActionType from "../action";

export interface InitialState {
  showSidebar: boolean;
}

export interface ContextType extends InitialState {
  toggleSidebar: () => void;
  setEditJob: (id: string) => void;
  deleteJob: (id: string) => void;
}

export interface Action {
  type: ActionType;
  payload?: any;
}
