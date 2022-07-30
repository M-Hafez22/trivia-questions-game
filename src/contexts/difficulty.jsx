import React,{ createContext, useState } from "react";

export const ChosenDifficultyContext = createContext();

export const ChosenDifficultyProvider = ({children}) => {
    const [chosenDifficulty, setChosenDifficulty] = useState('easy')

    return (
        <ChosenDifficultyContext.Provider value={[ {chosenDifficulty }, setChosenDifficulty]}>
          {children}
        </ChosenDifficultyContext.Provider>
      );
}