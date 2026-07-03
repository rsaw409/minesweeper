import React, { useEffect, useReducer, createContext } from "react";
import Board from "./components/board";
import Header from "./components/header";
import reducerFn, { initStateFn } from "./utilFunctions/reducer";
import { useMediaQuery } from "@mui/material";
import "./App.css";

const StateContext = createContext();

const App = () => {
  const [state, dispatch] = useReducer(reducerFn, "Hard", initStateFn);
  const isMobile = useMediaQuery("(max-width:720px)");

  useEffect(() => {
    dispatch({
      type: "reloadState",
      payload: { level: state.level },
    });
  }, [isMobile, state.level]);

  return (
    <StateContext.Provider value={[state, dispatch, isMobile]}>
      <div className="app-shell">
        <div className="app-container">
          <Header />
          <Board />
        </div>
      </div>
    </StateContext.Provider>
  );
};

export { StateContext };
export default App;
