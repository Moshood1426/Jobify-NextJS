import { useContext, createContext, useReducer } from "react";
import { Action, ContextType, InitialState } from "./types/context";
import reducer from "./reducer";

const initialState: InitialState = {
  showSidebar: false,
};

const AppContext = createContext<ContextType | null>(null);

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer<
    React.Reducer<typeof initialState, Action>
  >(reducer, initialState);

  return (
    <AppContext.Provider value={{ ...state }}>{children}</AppContext.Provider>
  );
};

const useAppContext = () => {
  return useContext(AppContext) as ContextType;
};

export default useAppContext;
export { AppProvider, initialState };
