import ActionType from "../action";

export interface InitialState {
  showSidebar: boolean;
}

export interface ContextType extends InitialState {}

export interface Action {
  type: ActionType;
  payload?: any;
}
