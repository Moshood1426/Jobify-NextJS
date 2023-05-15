'use client';

import { useContext, createContext, useReducer } from "react";
import { Action, ContextType, InitialState } from "./types/context";
import reducer from "./reducer";
import ActionType from "./action";

const initialState: InitialState = {
  showSidebar: false,
};

const AppContext = createContext<ContextType | null>(null);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer<
    React.Reducer<typeof initialState, Action>
  >(reducer, initialState);

  const toggleSidebar = () => {
    dispatch({ type: ActionType.TOGGLE_SIDE_BAR });
  };

  return (
    <AppContext.Provider value={{ ...state, toggleSidebar }}>{children}</AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext) as ContextType;
};

export default useAppContext;
export { AppProvider, initialState };
