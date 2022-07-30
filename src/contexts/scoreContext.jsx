import React, { createContext, useState } from "react";

export const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState({
    questions: 0,
    correct: 0,
    failed: 0,
    skiped: 0,
  });

  return(
    <ScoreContext.Provider value={[ {score }, setScore]}>
    {children}
  </ScoreContext.Provider>
  )
};
